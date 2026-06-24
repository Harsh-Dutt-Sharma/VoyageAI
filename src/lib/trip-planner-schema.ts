import { z } from "zod";
import type { TripResponse } from "@/types/trip";

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

const itineraryPeriodSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  location: z.string().min(1),
  estimatedCost: z.number().nonnegative(),
});

export const tripResponseSchema: z.ZodType<TripResponse> = z.object({
  tripOverview: z.object({
    title: z.string().min(1),
    destination: z.string().min(1),
    duration: z.string().min(1),
    travelStyle: z.string().min(1),
    summary: z.string().min(1),
    bestTimeToVisit: z.string().min(1),
    estimatedTotalCost: z.number().nonnegative(),
    currency: z.string().length(3),
  }),
  dailyItinerary: z
    .array(
      z.object({
        day: z.number().int().positive(),
        title: z.string().min(1),
        theme: z.string().min(1),
        morning: itineraryPeriodSchema,
        afternoon: itineraryPeriodSchema,
        evening: itineraryPeriodSchema,
        estimatedDailyCost: z.number().nonnegative(),
        localTip: z.string().min(1),
      }),
    )
    .min(1)
    .max(60),
  budgetBreakdown: z.object({
    currency: z.string().length(3),
    total: z.number().nonnegative(),
    accommodation: z.number().nonnegative(),
    food: z.number().nonnegative(),
    localTransport: z.number().nonnegative(),
    activities: z.number().nonnegative(),
    contingency: z.number().nonnegative(),
    notes: z.array(z.string()).max(8),
  }),
  hotelRecommendations: z
    .array(
      z.object({
        name: z.string().min(1),
        area: z.string().min(1),
        priceRange: z.string().min(1),
        description: z.string().min(1),
        whyItFits: z.string().min(1),
      }),
    )
    .min(1)
    .max(6),
  restaurantRecommendations: z
    .array(
      z.object({
        name: z.string().min(1),
        cuisine: z.string().min(1),
        area: z.string().min(1),
        priceRange: z.string().min(1),
        description: z.string().min(1),
      }),
    )
    .min(1)
    .max(8),
  packingChecklist: z.object({
    essentials: z.array(z.string()).min(1).max(20),
    clothing: z.array(z.string()).min(1).max(20),
    destinationSpecific: z.array(z.string()).min(1).max(20),
  }),
  travelTips: z.object({
    gettingAround: z.array(z.string()).min(1).max(10),
    localEtiquette: z.array(z.string()).min(1).max(10),
    safety: z.array(z.string()).min(1).max(10),
    money: z.array(z.string()).min(1).max(10),
  }),
});
