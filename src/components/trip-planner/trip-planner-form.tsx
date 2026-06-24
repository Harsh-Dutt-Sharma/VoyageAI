"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowRight,
  Banknote,
  CalendarDays,
  Check,
  ChevronDown,
  CircleAlert,
  Clock3,
  Compass,
  MapPin,
  Sparkles,
  WandSparkles,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { TripResults } from "@/components/trip-planner/trip-results";
import { cn } from "@/lib/utils";
import {
  interestOptions,
  travelStyles,
  tripPlannerSchema,
  type TripPlannerValues,
} from "@/lib/trip-planner-schema";
import type { TripResponse } from "@/types/trip";

const fieldClass =
  "h-14 w-full rounded-2xl border bg-white px-12 text-[15px] text-ink outline-none transition placeholder:text-ink/30 focus:border-navy focus:ring-4 focus:ring-mint/35";

export function TripPlannerForm() {
  const [result, setResult] = useState<TripResponse | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TripPlannerValues>({
    resolver: zodResolver(tripPlannerSchema),
    defaultValues: {
      destination: "",
      budget: 2500,
      days: 7,
      travelStyle: "Balanced",
      interests: ["Food & drink", "Culture"],
    },
  });

  const selectedInterests = watch("interests") ?? [];

  function toggleInterest(interest: (typeof interestOptions)[number]) {
    const next = selectedInterests.includes(interest)
      ? selectedInterests.filter((item) => item !== interest)
      : [...selectedInterests, interest];

    if (next.length <= 5) {
      setValue("interests", next, { shouldValidate: true, shouldDirty: true });
    }
  }

  async function onSubmit(values: TripPlannerValues) {
    setApiError(null);
    setResult(null);

    try {
      const response = await fetch("/api/generate-trip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const payload = (await response.json()) as {
        data?: TripResponse;
        error?: { code?: string; message?: string };
        correlationId?: string;
      };

      if (!response.ok || !payload.data) {
        throw new Error(
          payload.error?.message ?? "We could not generate your trip.",
        );
      }

      setResult(payload.data);
      requestAnimationFrame(() => {
        document.getElementById("trip-result")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    } catch (error) {
      setApiError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    }
  }

  function startOver() {
    reset();
    setResult(null);
    setApiError(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="mx-auto max-w-7xl px-5 pb-20 pt-10 sm:px-8 lg:pb-28 lg:pt-14">
      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.12fr)_minmax(340px,.68fr)] lg:gap-12">
        <section>
          <div className="mb-8">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-mint/55 px-4 py-2 text-xs font-bold uppercase tracking-[.16em] text-navy">
              <Sparkles className="size-4" />
              AI trip designer
            </div>
            <h1 className="font-display max-w-3xl text-4xl leading-[1.08] tracking-[-0.035em] text-ink sm:text-6xl">
              Let&apos;s shape your
              <span className="italic text-coral"> next story.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-ink/55 sm:text-lg">
              A few details are all we need. We&apos;ll build a thoughtful,
              beautifully paced itinerary around the way you love to travel.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="rounded-[2rem] border border-ink/[.07] bg-white p-5 shadow-card sm:p-8"
            noValidate
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <Field
                label="Where would you like to go?"
                error={errors.destination?.message}
                className="sm:col-span-2"
              >
                <MapPin className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-coral" />
                <input
                  {...register("destination")}
                  className={cn(fieldClass, errors.destination && "border-red-400")}
                  placeholder="e.g. Kyoto, Japan"
                  autoComplete="off"
                />
              </Field>

              <Field label="Total budget" error={errors.budget?.message}>
                <Banknote className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-coral" />
                <input
                  {...register("budget")}
                  type="number"
                  min={100}
                  step={50}
                  className={cn(fieldClass, errors.budget && "border-red-400")}
                  aria-label="Total budget in US dollars"
                />
                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-ink/35">
                  USD
                </span>
              </Field>

              <Field label="Number of days" error={errors.days?.message}>
                <CalendarDays className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-coral" />
                <input
                  {...register("days")}
                  type="number"
                  min={1}
                  max={60}
                  className={cn(fieldClass, errors.days && "border-red-400")}
                  aria-label="Number of days"
                />
                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-ink/35">
                  DAYS
                </span>
              </Field>

              <Field
                label="How do you like to travel?"
                error={errors.travelStyle?.message}
                className="sm:col-span-2"
              >
                <Compass className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-coral" />
                <select
                  {...register("travelStyle")}
                  className={cn(
                    fieldClass,
                    "appearance-none pr-12",
                    errors.travelStyle && "border-red-400",
                  )}
                >
                  {travelStyles.map((style) => (
                    <option key={style}>{style}</option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-ink/35" />
              </Field>
            </div>

            <fieldset className="mt-7">
              <div className="flex items-baseline justify-between gap-4">
                <legend className="text-sm font-bold text-ink">What are you into?</legend>
                <span className="text-xs text-ink/40">Choose up to 5</span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2.5">
                {interestOptions.map((interest) => {
                  const selected = selectedInterests.includes(interest);
                  return (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => toggleInterest(interest)}
                      aria-pressed={selected}
                      className={cn(
                        "inline-flex h-11 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-all duration-200",
                        selected
                          ? "border-navy bg-navy text-white shadow-sm"
                          : "border-ink/10 bg-cream/55 text-ink/65 hover:-translate-y-0.5 hover:border-ink/25 hover:bg-white",
                      )}
                    >
                      {selected && <Check className="size-3.5" />}
                      {interest}
                    </button>
                  );
                })}
              </div>
              {errors.interests?.message && (
                <ErrorMessage message={errors.interests.message} />
              )}
            </fieldset>

            {apiError && (
              <div
                role="alert"
                className="mt-6 flex gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
              >
                <CircleAlert className="mt-0.5 size-4 shrink-0" />
                {apiError}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative mt-8 flex h-14 w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-coral px-6 text-sm font-bold text-white shadow-[0_12px_30px_rgba(240,111,84,.28)] transition hover:-translate-y-0.5 hover:bg-[#df624a] disabled:translate-y-0 disabled:cursor-wait disabled:bg-coral"
            >
              {isSubmitting ? (
                <>
                  <span className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                  <span className="size-5 animate-spin rounded-full border-2 border-white/35 border-t-white" />
                  <span>Designing your journey…</span>
                </>
              ) : (
                <>
                  <WandSparkles className="size-5" />
                  Generate my trip
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>

            <p className="mt-4 text-center text-xs text-ink/35">
              Your first itinerary is free. No card needed.
            </p>
          </form>
        </section>

        <aside className="lg:sticky lg:top-8">
          <div className="noise relative overflow-hidden rounded-[2rem] bg-navy p-7 text-white shadow-soft sm:p-9">
            <div className="absolute -right-20 -top-20 size-64 rounded-full bg-mint/15 blur-3xl" />
            <div className="absolute -bottom-24 -left-16 size-64 rounded-full bg-coral/20 blur-3xl" />
            <div className="relative">
              <div className="grid size-12 place-items-center rounded-2xl bg-white/10">
                <Sparkles className="size-5 text-mint" />
              </div>
              <h2 className="font-display mt-7 text-3xl leading-tight">
                A plan that feels
                <span className="italic text-mint"> like you.</span>
              </h2>
              <p className="mt-4 text-sm leading-7 text-white/62">
                VoyageAI balances must-see places with breathing room, local
                discoveries, and the practical details that make a trip flow.
              </p>
              <div className="mt-8 space-y-5">
                {[
                  [Clock3, "Paced to your style", "No rushed mornings unless you want them."],
                  [MapPin, "Smart local routing", "Less backtracking, more time exploring."],
                  [Sparkles, "Made around your interests", "Every suggestion earns its place."],
                ].map(([Icon, title, text]) => {
                  const FeatureIcon = Icon as typeof Clock3;
                  return (
                    <div key={title as string} className="flex gap-4">
                      <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/10">
                        <FeatureIcon className="size-[18px] text-mint" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{title as string}</p>
                        <p className="mt-1 text-xs leading-5 text-white/48">{text as string}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </aside>
      </div>

      {result && <TripResults trip={result} onStartOver={startOver} />}
    </div>
  );
}

function Field({
  label,
  error,
  className,
  children,
}: {
  label: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-2.5 block text-sm font-bold text-ink">{label}</span>
      <span className="relative block">{children}</span>
      {error && <ErrorMessage message={error} />}
    </label>
  );
}

function ErrorMessage({ message }: { message: string }) {
  return (
    <span className="mt-2 flex items-center gap-1.5 text-xs font-medium text-red-600">
      <CircleAlert className="size-3.5" />
      {message}
    </span>
  );
}
