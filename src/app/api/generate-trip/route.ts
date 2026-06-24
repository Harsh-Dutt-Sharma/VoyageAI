import { NextResponse } from "next/server";
import { tripPlannerSchema } from "@/lib/trip-planner-schema";
import {
  FoundryServiceError,
  generateTripWithFoundry,
} from "@/services/foundry-service";

export const runtime = "nodejs";
export const maxDuration = 70;

export async function POST(request: Request) {
  const correlationId =
    request.headers.get("x-request-id") ?? crypto.randomUUID();
  const startedAt = Date.now();

  try {
    let body: unknown;

    try {
      body = await request.json();
    } catch {
      return apiError(
        "INVALID_JSON",
        "The request body must be valid JSON.",
        400,
        correlationId,
      );
    }

    const parsed = tripPlannerSchema.safeParse(body);
    if (!parsed.success) {
      console.warn(
        JSON.stringify({
          level: "warn",
          event: "trip.validation.failed",
          correlationId,
          timestamp: new Date().toISOString(),
          fields: Object.keys(parsed.error.flatten().fieldErrors),
        }),
      );

      return NextResponse.json(
        {
          error: {
            code: "VALIDATION_ERROR",
            message: "Please check your trip details.",
            fields: parsed.error.flatten().fieldErrors,
          },
          correlationId,
        },
        { status: 422 },
      );
    }

    const trip = await generateTripWithFoundry(parsed.data, correlationId);

    console.info(
      JSON.stringify({
        level: "info",
        event: "trip.generated",
        correlationId,
        durationMs: Date.now() - startedAt,
        itineraryDays: trip.dailyItinerary.length,
        timestamp: new Date().toISOString(),
      }),
    );

    return NextResponse.json(
      { data: trip, correlationId },
      {
        status: 200,
        headers: { "Cache-Control": "no-store" },
      },
    );
  } catch (error) {
    if (error instanceof FoundryServiceError) {
      return apiError(
        error.code,
        publicErrorMessage(error),
        error.status,
        correlationId,
      );
    }

    console.error(
      JSON.stringify({
        level: "error",
        event: "trip.generation.unhandled_error",
        correlationId,
        durationMs: Date.now() - startedAt,
        timestamp: new Date().toISOString(),
      }),
    );

    return apiError(
      "INTERNAL_ERROR",
      "We could not create your trip right now. Please try again.",
      500,
      correlationId,
    );
  }
}

function publicErrorMessage(error: FoundryServiceError): string {
  if (error.code === "CONFIGURATION_ERROR") {
    return "Trip generation is not configured yet. Please contact support.";
  }

  if (error.code === "AUTHENTICATION_ERROR") {
    return "Trip generation is temporarily unavailable. Please contact support.";
  }

  return error.message;
}

function apiError(
  code: string,
  message: string,
  status: number,
  correlationId: string,
) {
  return NextResponse.json(
    {
      error: { code, message },
      correlationId,
    },
    {
      status,
      headers: { "Cache-Control": "no-store" },
    },
  );
}
