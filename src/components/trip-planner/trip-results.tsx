import {
  ArrowRight,
  Banknote,
  BedDouble,
  Check,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  Coffee,
  Compass,
  Lightbulb,
  Luggage,
  MapPin,
  Navigation,
  RotateCcw,
  ShieldCheck,
  Shirt,
  Sparkles,
  UtensilsCrossed,
  WalletCards,
} from "lucide-react";
import type {
  BudgetBreakdown,
  ItineraryPeriod,
  TripResponse,
} from "@/types/trip";

export function TripResults({
  trip,
  onStartOver,
}: {
  trip: TripResponse;
  onStartOver: () => void;
}) {
  const { tripOverview } = trip;

  return (
    <section
      id="trip-result"
      className="scroll-mt-8 pt-16 animate-[fadeIn_.5s_ease-out]"
      aria-live="polite"
    >
      <div className="noise relative overflow-hidden rounded-[2.25rem] bg-navy p-7 text-white shadow-soft sm:p-10 lg:p-12">
        <div className="absolute -right-16 -top-32 size-96 rounded-full bg-mint/15 blur-3xl" />
        <div className="absolute -bottom-40 -left-20 size-96 rounded-full bg-coral/20 blur-3xl" />
        <div className="relative">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[.18em] text-mint">
                <Check className="size-4" />
                Your VoyageAI itinerary
              </div>
              <h2 className="font-display mt-5 text-4xl leading-tight tracking-tight sm:text-6xl">
                {tripOverview.title}
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-white/65">
                {tripOverview.summary}
              </p>
            </div>
            <button
              type="button"
              onClick={onStartOver}
              className="inline-flex h-11 shrink-0 items-center justify-center gap-2 self-start rounded-full border border-white/15 bg-white/10 px-5 text-sm font-semibold text-white transition hover:bg-white/15 lg:self-auto"
            >
              <RotateCcw className="size-4" />
              Plan another trip
            </button>
          </div>

          <div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <OverviewStat icon={MapPin} label="Destination" value={tripOverview.destination} />
            <OverviewStat icon={Clock3} label="Duration" value={tripOverview.duration} />
            <OverviewStat icon={Compass} label="Travel style" value={tripOverview.travelStyle} />
            <OverviewStat
              icon={Banknote}
              label="Estimated total"
              value={formatMoney(tripOverview.estimatedTotalCost, tripOverview.currency)}
            />
          </div>
          <p className="mt-5 text-xs text-white/42">
            Best time to visit: {tripOverview.bestTimeToVisit}. Prices and operating
            details are estimates—verify them before booking.
          </p>
        </div>
      </div>

      <SectionHeading
        eyebrow="Day by day"
        title="Your journey, beautifully paced"
        description="A complete rhythm for each day, with enough structure to feel effortless and enough space to wander."
      />
      <div className="space-y-5">
        {trip.dailyItinerary.map((day) => (
          <article
            key={day.day}
            className="overflow-hidden rounded-[1.75rem] border border-ink/[.07] bg-white shadow-card transition duration-300 hover:shadow-soft"
          >
            <div className="grid lg:grid-cols-[220px_1fr]">
              <div className="flex flex-col justify-between bg-mint/50 p-6 sm:p-7">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[.18em] text-coral">
                    Day {day.day}
                  </p>
                  <h3 className="font-display mt-3 text-2xl font-semibold leading-tight">
                    {day.title}
                  </h3>
                  <p className="mt-2 text-sm text-ink/50">{day.theme}</p>
                </div>
                <div className="mt-6 border-t border-ink/10 pt-4">
                  <p className="text-[10px] font-bold uppercase tracking-[.16em] text-ink/35">
                    Estimated day
                  </p>
                  <p className="mt-1 font-semibold">
                    {formatMoney(day.estimatedDailyCost, tripOverview.currency)}
                  </p>
                </div>
              </div>
              <div className="p-6 sm:p-7">
                <div className="grid gap-6 md:grid-cols-3">
                  <PeriodCard label="Morning" period={day.morning} />
                  <PeriodCard label="Afternoon" period={day.afternoon} />
                  <PeriodCard label="Evening" period={day.evening} />
                </div>
                <div className="mt-6 flex gap-3 rounded-2xl bg-cream px-4 py-3">
                  <Lightbulb className="mt-0.5 size-4 shrink-0 text-coral" />
                  <p className="text-xs leading-5 text-ink/55">
                    <span className="font-bold text-ink">Local note:</span> {day.localTip}
                  </p>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <SectionHeading
        eyebrow="The practical bits"
        title="A budget with breathing room"
        description="A planning estimate across the essentials, shaped to stay within your stated total."
      />
      <BudgetCard budget={trip.budgetBreakdown} />

      <div className="mt-14 grid gap-7 lg:grid-cols-2">
        <RecommendationSection
          icon={BedDouble}
          eyebrow="Where to stay"
          title="Hotel recommendations"
        >
          {trip.hotelRecommendations.map((hotel) => (
            <div key={`${hotel.name}-${hotel.area}`} className="border-t border-ink/8 py-5 first:border-0 first:pt-0 last:pb-0">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h4 className="font-display text-xl font-semibold">{hotel.name}</h4>
                  <p className="mt-1 flex items-center gap-1.5 text-xs font-medium text-coral">
                    <MapPin className="size-3.5" /> {hotel.area}
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-cream px-3 py-1 text-xs font-bold text-ink/55">
                  {hotel.priceRange}
                </span>
              </div>
              <p className="mt-3 text-sm leading-6 text-ink/55">{hotel.description}</p>
              <p className="mt-2 text-xs leading-5 text-ink/42">
                <span className="font-bold text-ink/60">Why it fits:</span> {hotel.whyItFits}
              </p>
            </div>
          ))}
        </RecommendationSection>

        <RecommendationSection
          icon={UtensilsCrossed}
          eyebrow="What to taste"
          title="Restaurant recommendations"
        >
          {trip.restaurantRecommendations.map((restaurant) => (
            <div key={`${restaurant.name}-${restaurant.area}`} className="border-t border-ink/8 py-5 first:border-0 first:pt-0 last:pb-0">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h4 className="font-display text-xl font-semibold">{restaurant.name}</h4>
                  <p className="mt-1 text-xs font-medium text-coral">
                    {restaurant.cuisine} · {restaurant.area}
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-cream px-3 py-1 text-xs font-bold text-ink/55">
                  {restaurant.priceRange}
                </span>
              </div>
              <p className="mt-3 text-sm leading-6 text-ink/55">{restaurant.description}</p>
            </div>
          ))}
        </RecommendationSection>
      </div>

      <div className="mt-14 grid gap-7 lg:grid-cols-2">
        <ChecklistCard trip={trip} />
        <TravelTipsCard trip={trip} />
      </div>

      <div className="mt-8 flex flex-col items-center justify-between gap-5 rounded-[1.75rem] bg-coral p-6 text-white shadow-[0_16px_40px_rgba(240,111,84,.22)] sm:flex-row sm:p-8">
        <div>
          <p className="font-display text-2xl">Your adventure has a shape now.</p>
          <p className="mt-1 text-sm text-white/70">
            Save it, refine it, and make every detail yours.
          </p>
        </div>
        <button
          type="button"
          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-bold text-coral transition hover:bg-cream sm:w-auto"
        >
          Save this itinerary <ArrowRight className="size-4" />
        </button>
      </div>
    </section>
  );
}

function OverviewStat({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof MapPin;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[.07] p-4 backdrop-blur">
      <Icon className="size-4 text-mint" />
      <p className="mt-4 text-[10px] font-bold uppercase tracking-[.16em] text-white/38">
        {label}
      </p>
      <p className="mt-1 truncate text-sm font-semibold">{value}</p>
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-8 mt-16 max-w-3xl">
      <p className="text-xs font-bold uppercase tracking-[.2em] text-coral">{eyebrow}</p>
      <h2 className="font-display mt-3 text-3xl tracking-tight sm:text-4xl">{title}</h2>
      <p className="mt-3 leading-7 text-ink/52">{description}</p>
    </div>
  );
}

function PeriodCard({ label, period }: { label: string; period: ItineraryPeriod }) {
  return (
    <div>
      <p className="text-[10px] font-bold uppercase tracking-[.17em] text-coral">{label}</p>
      <h4 className="mt-2 text-sm font-bold leading-5">{period.title}</h4>
      <p className="mt-2 text-xs leading-5 text-ink/50">{period.description}</p>
      <div className="mt-3 flex items-center justify-between gap-2 text-[11px] text-ink/40">
        <span className="flex min-w-0 items-center gap-1">
          <MapPin className="size-3 shrink-0" />
          <span className="truncate">{period.location}</span>
        </span>
        <span className="shrink-0">${Math.round(period.estimatedCost)}</span>
      </div>
    </div>
  );
}

function BudgetCard({ budget }: { budget: BudgetBreakdown }) {
  const categories = [
    ["Accommodation", budget.accommodation, "bg-navy"],
    ["Food", budget.food, "bg-coral"],
    ["Local transport", budget.localTransport, "bg-[#e7c98e]"],
    ["Activities", budget.activities, "bg-[#77b89f]"],
    ["Contingency", budget.contingency, "bg-ink/25"],
  ] as const;

  return (
    <div className="grid overflow-hidden rounded-[1.75rem] border border-ink/[.07] bg-white shadow-card lg:grid-cols-[.68fr_1.32fr]">
      <div className="bg-mint/55 p-7 sm:p-8">
        <CircleDollarSign className="size-7 text-navy" />
        <p className="mt-6 text-xs font-bold uppercase tracking-[.17em] text-ink/40">
          Estimated total
        </p>
        <p className="font-display mt-2 text-5xl">
          {formatMoney(budget.total, budget.currency)}
        </p>
        <div className="mt-6 space-y-2">
          {budget.notes.map((note) => (
            <p key={note} className="flex gap-2 text-xs leading-5 text-ink/50">
              <ChevronRight className="mt-0.5 size-3.5 shrink-0 text-coral" />
              {note}
            </p>
          ))}
        </div>
      </div>
      <div className="p-7 sm:p-8">
        <div className="space-y-5">
          {categories.map(([label, amount, color]) => {
            const width = budget.total > 0 ? Math.min(100, (amount / budget.total) * 100) : 0;
            return (
              <div key={label}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium text-ink/60">{label}</span>
                  <span className="font-bold">{formatMoney(amount, budget.currency)}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-cream">
                  <div className={`h-full rounded-full ${color}`} style={{ width: `${width}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function RecommendationSection({
  icon: Icon,
  eyebrow,
  title,
  children,
}: {
  icon: typeof BedDouble;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-[1.75rem] border border-ink/[.07] bg-white p-6 shadow-card sm:p-7">
      <div className="mb-6 flex items-center gap-4">
        <div className="grid size-11 place-items-center rounded-2xl bg-navy text-white">
          <Icon className="size-5" />
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[.17em] text-coral">{eyebrow}</p>
          <h3 className="font-display mt-1 text-2xl">{title}</h3>
        </div>
      </div>
      {children}
    </section>
  );
}

function ChecklistCard({ trip }: { trip: TripResponse }) {
  const groups = [
    [Luggage, "Essentials", trip.packingChecklist.essentials],
    [Shirt, "Clothing", trip.packingChecklist.clothing],
    [Sparkles, "Destination-specific", trip.packingChecklist.destinationSpecific],
  ] as const;

  return (
    <section className="rounded-[1.75rem] bg-navy p-7 text-white shadow-soft">
      <p className="text-xs font-bold uppercase tracking-[.18em] text-mint">Pack thoughtfully</p>
      <h3 className="font-display mt-2 text-3xl">Packing checklist</h3>
      <div className="mt-7 space-y-7">
        {groups.map(([Icon, title, items]) => (
          <div key={title}>
            <div className="mb-3 flex items-center gap-2">
              <Icon className="size-4 text-mint" />
              <p className="text-sm font-semibold">{title}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {items.map((item) => (
                <span key={item} className="rounded-full border border-white/10 bg-white/[.07] px-3 py-1.5 text-xs text-white/65">
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function TravelTipsCard({ trip }: { trip: TripResponse }) {
  const groups = [
    [Navigation, "Getting around", trip.travelTips.gettingAround],
    [Coffee, "Local etiquette", trip.travelTips.localEtiquette],
    [ShieldCheck, "Safety", trip.travelTips.safety],
    [WalletCards, "Money", trip.travelTips.money],
  ] as const;

  return (
    <section className="rounded-[1.75rem] border border-ink/[.07] bg-white p-7 shadow-card">
      <p className="text-xs font-bold uppercase tracking-[.18em] text-coral">Good to know</p>
      <h3 className="font-display mt-2 text-3xl">Travel tips</h3>
      <div className="mt-7 grid gap-6 sm:grid-cols-2">
        {groups.map(([Icon, title, items]) => (
          <div key={title}>
            <div className="flex items-center gap-2">
              <Icon className="size-4 text-coral" />
              <p className="text-sm font-bold">{title}</p>
            </div>
            <ul className="mt-3 space-y-2">
              {items.map((item) => (
                <li key={item} className="flex gap-2 text-xs leading-5 text-ink/50">
                  <span className="mt-2 size-1 shrink-0 rounded-full bg-mint" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

function formatMoney(amount: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}
