import { NextResponse } from "next/server";
import { tripPlannerSchema, type GeneratedTrip } from "@/lib/trip-planner-schema";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { message: "The request body must be valid JSON." },
      { status: 400 },
    );
  }

  const parsed = tripPlannerSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        message: "Please check your trip details.",
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 422 },
    );
  }

  await new Promise((resolve) => setTimeout(resolve, 1600));

  const { destination, budget, days, travelStyle, interests } = parsed.data;
  const previewDays = Math.min(days, 3);
  const dayThemes = [
    ["Arrive & find your rhythm", "A gentle first look at the neighborhood, a local lunch, and a golden-hour walk."],
    ["The heart of the place", `A ${travelStyle.toLowerCase()} day shaped around ${interests[0].toLowerCase()} and hidden local favorites.`],
    ["A little further", `Step beyond the obvious with a day inspired by ${interests[1]?.toLowerCase() ?? interests[0].toLowerCase()}.`],
  ];

  const trip: GeneratedTrip = {
    id: crypto.randomUUID(),
    destination,
    title: `${days} days in ${destination}`,
    summary: `A ${travelStyle.toLowerCase()} escape with room for discovery, designed around ${interests.slice(0, 3).join(", ").toLowerCase()}.`,
    dailyBudget: Math.round(budget / days),
    highlights: interests.slice(0, 4),
    days: Array.from({ length: previewDays }, (_, index) => ({
      day: index + 1,
      title: dayThemes[index][0],
      description: dayThemes[index][1],
      accent: ["bg-coral", "bg-mint", "bg-[#e7c98e]"][index],
    })),
  };

  return NextResponse.json({ data: trip }, { status: 200 });
}
