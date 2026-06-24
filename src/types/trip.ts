export type TravelStyle =
  | "Relaxed"
  | "Balanced"
  | "Fast-paced"
  | "Luxury"
  | "Budget explorer";

export type TripRequest = {
  destination: string;
  budget: number;
  days: number;
  travelStyle: TravelStyle;
  interests: string[];
};

export type TripOverview = {
  title: string;
  destination: string;
  duration: string;
  travelStyle: string;
  summary: string;
  bestTimeToVisit: string;
  estimatedTotalCost: number;
  currency: string;
};

export type BudgetBreakdown = {
  currency: string;
  total: number;
  accommodation: number;
  food: number;
  localTransport: number;
  activities: number;
  contingency: number;
  notes: string[];
};

export type ItineraryPeriod = {
  title: string;
  description: string;
  location: string;
  estimatedCost: number;
};

export type DailyItinerary = {
  day: number;
  title: string;
  theme: string;
  morning: ItineraryPeriod;
  afternoon: ItineraryPeriod;
  evening: ItineraryPeriod;
  estimatedDailyCost: number;
  localTip: string;
};

export type HotelRecommendation = {
  name: string;
  area: string;
  priceRange: string;
  description: string;
  whyItFits: string;
};

export type RestaurantRecommendation = {
  name: string;
  cuisine: string;
  area: string;
  priceRange: string;
  description: string;
};

export type PackingChecklist = {
  essentials: string[];
  clothing: string[];
  destinationSpecific: string[];
};

export type TravelTips = {
  gettingAround: string[];
  localEtiquette: string[];
  safety: string[];
  money: string[];
};

export type TripResponse = {
  tripOverview: TripOverview;
  dailyItinerary: DailyItinerary[];
  budgetBreakdown: BudgetBreakdown;
  hotelRecommendations: HotelRecommendation[];
  restaurantRecommendations: RestaurantRecommendation[];
  packingChecklist: PackingChecklist;
  travelTips: TravelTips;
};
