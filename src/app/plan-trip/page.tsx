import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Logo } from "@/components/logo";
import { TripPlannerForm } from "@/components/trip-planner/trip-planner-form";

export const metadata = {
  title: "Plan your trip — VoyageAI",
  description: "Create a thoughtful AI-powered travel itinerary in minutes.",
};

export default function PlanTripPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-cream">
      <header className="border-b border-ink/[.07] bg-cream/90 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
          <Logo />
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-ink/55 transition hover:bg-white hover:text-ink"
          >
            <ArrowLeft className="size-4" />
            <span className="hidden sm:inline">Back to home</span>
          </Link>
        </div>
      </header>
      <TripPlannerForm />
    </main>
  );
}
