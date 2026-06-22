import Image from "next/image";
import { ArrowRight, CalendarDays, MapPin, Sparkles, Users } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="noise relative min-h-[780px] overflow-hidden bg-navy text-white">
      <Image
        src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2200&q=88"
        alt="Traveler looking across a dramatic mountain valley"
        fill
        priority
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,38,41,.93)_0%,rgba(10,38,41,.78)_43%,rgba(10,38,41,.2)_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-navy/25" />

      <div className="relative z-10 mx-auto flex min-h-[780px] max-w-7xl items-center px-6 pb-24 pt-36 lg:px-8">
        <div className="max-w-3xl">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/85 backdrop-blur-md">
            <Sparkles className="size-4 text-[#ffd4a8]" />
            AI-powered journeys, thoughtfully made
          </div>
          <h1 className="font-display text-5xl leading-[1.04] tracking-[-0.04em] sm:text-7xl lg:text-[84px]">
            Go further.
            <br />
            <span className="italic text-mint">Plan less.</span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-white/72">
            Tell us what moves you. VoyageAI turns your ideas into a beautifully
            paced trip—with local gems, live weather, and every detail in one place.
          </p>

          <div className="mt-10 rounded-3xl border border-white/15 bg-white/95 p-3 text-ink shadow-2xl backdrop-blur-xl sm:flex sm:items-center">
            <div className="flex flex-1 items-center gap-3 border-b border-ink/10 px-3 py-3 sm:border-b-0 sm:border-r">
              <MapPin className="size-5 shrink-0 text-coral" />
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[.16em] text-ink/45">Where to?</p>
                <p className="mt-0.5 text-sm font-medium">Kyoto, Japan</p>
              </div>
            </div>
            <div className="flex flex-1 items-center gap-3 border-b border-ink/10 px-3 py-3 sm:border-b-0 sm:border-r">
              <CalendarDays className="size-5 shrink-0 text-coral" />
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[.16em] text-ink/45">When?</p>
                <p className="mt-0.5 text-sm font-medium">Oct 12 — 19</p>
              </div>
            </div>
            <div className="flex items-center gap-3 px-3 py-3 sm:w-36">
              <Users className="size-5 shrink-0 text-coral" />
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[.16em] text-ink/45">Travelers</p>
                <p className="mt-0.5 text-sm font-medium">2 people</p>
              </div>
            </div>
            <ButtonLink href="/plan-trip" className="h-14 w-full rounded-2xl px-6 sm:w-auto">
              Plan my trip <ArrowRight className="size-4" />
            </ButtonLink>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm text-white/62">
            <span>✓ Free to start</span>
            <span>✓ Plans in under 2 minutes</span>
            <span>✓ Built around your travel style</span>
          </div>
        </div>
      </div>
    </section>
  );
}
