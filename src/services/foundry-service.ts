import { tripResponseSchema } from "@/lib/trip-planner-schema";
import type { TripRequest, TripResponse } from "@/types/trip";

const FOUNDRY_API_VERSION = "2024-10-21";
const REQUEST_TIMEOUT_MS = 60_000;

type FoundryConfig = {
  endpoint: string;
  apiKey: string;
  deploymentName: string;
};

type FoundryChatResponse = {
  choices?: Array<{
    finish_reason?: string | null;
    message?: {
      content?: string | null;
    };
  }>;
  error?: {
    code?: string;
    message?: string;
  };
};

export type FoundryErrorCode =
  | "CONFIGURATION_ERROR"
  | "RATE_LIMITED"
  | "TIMEOUT"
  | "INVALID_RESPONSE"
  | "AUTHENTICATION_ERROR"
  | "SERVICE_UNAVAILABLE"
  | "FOUNDRY_ERROR";

export class FoundryServiceError extends Error {
  constructor(
    public readonly code: FoundryErrorCode,
    message: string,
    public readonly status: number = 500,
    options?: ErrorOptions,
  ) {
    super(message, options);
    this.name = "FoundryServiceError";
  }
}

/**
 * Generates a complete travel plan through Microsoft Foundry's direct REST API.
 * This function is server-only because it reads the Foundry API key.
 */
export async function generateTripWithFoundry(
  request: TripRequest,
  correlationId: string,
): Promise<TripResponse> {
  const config = getFoundryConfig();
  const { url, usesV1Api } = buildFoundryUrl(config);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  const startedAt = Date.now();

  logFoundryEvent("foundry.request.started", {
    correlationId,
    deployment: config.deploymentName,
    days: request.days,
  });

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": config.apiKey,
        "x-ms-client-request-id": correlationId,
      },
      body: JSON.stringify({
        ...(usesV1Api ? { model: config.deploymentName } : {}),
        messages: [
          {
            role: "system",
            content: SYSTEM_PROMPT,
          },
          {
            role: "user",
            content: buildTravelPlanningPrompt(request),
          },
        ],
        temperature: 0.45,
        max_tokens: 8_000,
        response_format: { type: "json_object" },
      }),
      cache: "no-store",
      signal: controller.signal,
    });

    const payload = await readFoundryPayload(response);

    if (!response.ok) {
      throw mapFoundryHttpError(response.status, payload);
    }

    const content = payload.choices?.[0]?.message?.content;
    const finishReason = payload.choices?.[0]?.finish_reason;

    if (!content) {
      throw new FoundryServiceError(
        "INVALID_RESPONSE",
        "Microsoft Foundry returned an empty travel plan.",
        502,
      );
    }

    if (finishReason === "length") {
      throw new FoundryServiceError(
        "INVALID_RESPONSE",
        "The generated itinerary was incomplete. Try fewer days or interests.",
        502,
      );
    }

    const result = parseTripResponse(content);

    if (result.dailyItinerary.length !== request.days) {
      throw new FoundryServiceError(
        "INVALID_RESPONSE",
        "The generated itinerary did not include every requested day.",
        502,
      );
    }

    logFoundryEvent("foundry.request.completed", {
      correlationId,
      deployment: config.deploymentName,
      durationMs: Date.now() - startedAt,
      itineraryDays: result.dailyItinerary.length,
    });

    return result;
  } catch (error) {
    if (error instanceof FoundryServiceError) {
      logFoundryEvent("foundry.request.failed", {
        correlationId,
        code: error.code,
        status: error.status,
        durationMs: Date.now() - startedAt,
      });
      throw error;
    }

    if (error instanceof Error && error.name === "AbortError") {
      const timeoutError = new FoundryServiceError(
        "TIMEOUT",
        "Trip generation took too long. Please try again.",
        504,
        { cause: error },
      );
      logFoundryEvent("foundry.request.failed", {
        correlationId,
        code: timeoutError.code,
        status: timeoutError.status,
        durationMs: Date.now() - startedAt,
      });
      throw timeoutError;
    }

    logFoundryEvent("foundry.request.failed", {
      correlationId,
      code: "FOUNDRY_ERROR",
      status: 502,
      durationMs: Date.now() - startedAt,
    });

    throw new FoundryServiceError(
      "FOUNDRY_ERROR",
      "Microsoft Foundry is temporarily unavailable. Please try again.",
      502,
      { cause: error },
    );
  } finally {
    clearTimeout(timeout);
  }
}

export function buildTravelPlanningPrompt(request: TripRequest): string {
  return `
Create a practical, personalized travel plan using the exact traveler constraints below.

TRAVELER REQUEST
- Destination: ${request.destination}
- Total budget: USD ${request.budget}
- Number of days: ${request.days}
- Travel style: ${request.travelStyle}
- Interests: ${request.interests.join(", ")}

PLANNING REQUIREMENTS
1. Produce exactly ${request.days} entries in dailyItinerary, numbered sequentially from 1.
2. Keep the estimated total cost at or below USD ${request.budget}. Use realistic estimates, not invented booking prices.
3. Balance major highlights with locally distinctive experiences and realistic travel time.
4. Match the requested travel style and interests throughout the itinerary.
5. Recommend 3 hotels and 4 restaurants across useful price points when possible.
6. State costs as numeric USD estimates. The budget categories should add up approximately to the total.
7. Do not claim live availability, current opening hours, guaranteed safety, or confirmed prices.
8. If current facts are uncertain, word the recommendation as something the traveler should verify.
9. Return JSON only. Do not include markdown fences or commentary.

Return one JSON object with exactly this shape:
{
  "tripOverview": {
    "title": "string",
    "destination": "string",
    "duration": "string",
    "travelStyle": "string",
    "summary": "string",
    "bestTimeToVisit": "string",
    "estimatedTotalCost": 0,
    "currency": "USD"
  },
  "dailyItinerary": [
    {
      "day": 1,
      "title": "string",
      "theme": "string",
      "morning": {
        "title": "string",
        "description": "string",
        "location": "string",
        "estimatedCost": 0
      },
      "afternoon": {
        "title": "string",
        "description": "string",
        "location": "string",
        "estimatedCost": 0
      },
      "evening": {
        "title": "string",
        "description": "string",
        "location": "string",
        "estimatedCost": 0
      },
      "estimatedDailyCost": 0,
      "localTip": "string"
    }
  ],
  "budgetBreakdown": {
    "currency": "USD",
    "total": 0,
    "accommodation": 0,
    "food": 0,
    "localTransport": 0,
    "activities": 0,
    "contingency": 0,
    "notes": ["string"]
  },
  "hotelRecommendations": [
    {
      "name": "string",
      "area": "string",
      "priceRange": "string",
      "description": "string",
      "whyItFits": "string"
    }
  ],
  "restaurantRecommendations": [
    {
      "name": "string",
      "cuisine": "string",
      "area": "string",
      "priceRange": "string",
      "description": "string"
    }
  ],
  "packingChecklist": {
    "essentials": ["string"],
    "clothing": ["string"],
    "destinationSpecific": ["string"]
  },
  "travelTips": {
    "gettingAround": ["string"],
    "localEtiquette": ["string"],
    "safety": ["string"],
    "money": ["string"]
  }
}`.trim();
}

const SYSTEM_PROMPT = `
You are VoyageAI, a meticulous senior travel planner. Create useful, culturally
respectful, logistically realistic itineraries. Follow the user's constraints,
avoid unsupported claims, and return only valid JSON matching the requested
schema. All prices are planning estimates and should fit the stated total budget.
`.trim();

function getFoundryConfig(): FoundryConfig {
  const endpoint = process.env.FOUNDRY_ENDPOINT?.trim();
  const apiKey = process.env.FOUNDRY_API_KEY?.trim();
  const deploymentName = process.env.FOUNDRY_DEPLOYMENT_NAME?.trim();
  const missing = [
    !endpoint && "FOUNDRY_ENDPOINT",
    !apiKey && "FOUNDRY_API_KEY",
    !deploymentName && "FOUNDRY_DEPLOYMENT_NAME",
  ].filter(Boolean);

  if (missing.length > 0) {
    throw new FoundryServiceError(
      "CONFIGURATION_ERROR",
      `Microsoft Foundry is not configured. Missing: ${missing.join(", ")}.`,
      503,
    );
  }

  // The explicit guard gives TypeScript a sound non-optional configuration
  // boundary after the diagnostic list above has been assembled.
  if (!endpoint || !apiKey || !deploymentName) {
    throw new FoundryServiceError(
      "CONFIGURATION_ERROR",
      "Microsoft Foundry configuration is incomplete.",
      503,
    );
  }

  let parsedEndpoint: URL;
  try {
    parsedEndpoint = new URL(endpoint);
  } catch {
    throw new FoundryServiceError(
      "CONFIGURATION_ERROR",
      "FOUNDRY_ENDPOINT must be a valid HTTPS URL.",
      503,
    );
  }

  if (parsedEndpoint.protocol !== "https:") {
    throw new FoundryServiceError(
      "CONFIGURATION_ERROR",
      "FOUNDRY_ENDPOINT must use HTTPS.",
      503,
    );
  }

  return { endpoint, apiKey, deploymentName };
}

function buildFoundryUrl(config: FoundryConfig): {
  url: string;
  usesV1Api: boolean;
} {
  const endpoint = config.endpoint.replace(/\/+$/, "");
  const isFullChatUrl = /\/chat\/completions(?:\?|$)/.test(endpoint);
  const usesV1Api = endpoint.includes("/openai/v1");

  if (isFullChatUrl) {
    const url = new URL(endpoint);
    if (!usesV1Api && !url.searchParams.has("api-version")) {
      url.searchParams.set("api-version", FOUNDRY_API_VERSION);
    }
    return { url: url.toString(), usesV1Api };
  }

  if (usesV1Api) {
    return {
      url: `${endpoint}/chat/completions`,
      usesV1Api: true,
    };
  }

  return {
    url: `${endpoint}/openai/deployments/${encodeURIComponent(
      config.deploymentName,
    )}/chat/completions?api-version=${FOUNDRY_API_VERSION}`,
    usesV1Api: false,
  };
}

async function readFoundryPayload(
  response: Response,
): Promise<FoundryChatResponse> {
  try {
    return (await response.json()) as FoundryChatResponse;
  } catch (error) {
    throw new FoundryServiceError(
      "INVALID_RESPONSE",
      "Microsoft Foundry returned a response that could not be read.",
      502,
      { cause: error },
    );
  }
}

function parseTripResponse(content: string): TripResponse {
  const normalized = content
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/, "");

  let value: unknown;
  try {
    value = JSON.parse(normalized);
  } catch (error) {
    throw new FoundryServiceError(
      "INVALID_RESPONSE",
      "Microsoft Foundry returned an invalid itinerary format.",
      502,
      { cause: error },
    );
  }

  const parsed = tripResponseSchema.safeParse(value);
  if (!parsed.success) {
    throw new FoundryServiceError(
      "INVALID_RESPONSE",
      "Microsoft Foundry returned an incomplete itinerary.",
      502,
      { cause: parsed.error },
    );
  }

  return parsed.data;
}

function mapFoundryHttpError(
  status: number,
  payload: FoundryChatResponse,
): FoundryServiceError {
  if (status === 401 || status === 403) {
    return new FoundryServiceError(
      "AUTHENTICATION_ERROR",
      "Microsoft Foundry credentials or permissions are invalid.",
      502,
    );
  }

  if (status === 429) {
    return new FoundryServiceError(
      "RATE_LIMITED",
      "VoyageAI is receiving many planning requests. Please wait a moment and try again.",
      429,
    );
  }

  if (status === 408 || status === 504) {
    return new FoundryServiceError(
      "TIMEOUT",
      "Trip generation took too long. Please try again.",
      504,
    );
  }

  if (status >= 500) {
    return new FoundryServiceError(
      "SERVICE_UNAVAILABLE",
      "Microsoft Foundry is temporarily unavailable. Please try again.",
      503,
    );
  }

  return new FoundryServiceError(
    "FOUNDRY_ERROR",
    payload.error?.message
      ? "Microsoft Foundry could not generate this itinerary."
      : "The itinerary request could not be completed.",
    502,
  );
}

function logFoundryEvent(
  event: string,
  metadata: Record<string, string | number>,
) {
  console.info(
    JSON.stringify({
      level: event.endsWith("failed") ? "error" : "info",
      event,
      timestamp: new Date().toISOString(),
      ...metadata,
    }),
  );
}
