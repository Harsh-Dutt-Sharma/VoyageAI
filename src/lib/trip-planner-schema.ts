import { z } from "zod";

export const travelStyles = [
  "Relaxed",
  "Balanced",
  "Fast-paced",
  "Luxury",
  "Budget explorer",
] as const;

export const interestOptions = [
  "Food & drink",
  "Culture",
  "Nature",
  "Adventure",
  "History",
  "Nightlife",
  "Wellness",
  "Shopping",
] as const;

export const tripPlannerSchema = z.object({
  destination: z
    .string()
    .trim()
    .min(2, "Tell us where you would like to go.")
    .max(80, "Destination must be 80 characters or fewer."),
  budget: z.coerce
    .number<number>()
    .min(100, "Budget must be at least $100.")
    .max(1_000_000, "Budget must be below $1,000,000."),
  days: z.coerce
    .number<number>()
    .int("Number of days must be a whole number.")
    .min(1, "Plan at least one day.")
    .max(60, "Trips can be up to 60 days."),
  travelStyle: z.enum(travelStyles, {
    message: "Choose a travel style.",
  }),
  interests: z
    .array(z.enum(interestOptions))
    .min(1, "Choose at least one interest.")
    .max(5, "Choose up to five interests."),
});

export type TripPlannerValues = z.infer<typeof tripPlannerSchema>;

export type GeneratedTrip = {
  id: string;
  destination: string;
  title: string;
  summary: string;
  dailyBudget: number;
  highlights: string[];
  days: Array<{
    day: number;
    title: string;
    description: string;
    accent: string;
  }>;
};
