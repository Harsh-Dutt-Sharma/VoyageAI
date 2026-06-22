import Image from "next/image";
import { ArrowRight, CloudSun, Compass, Map, Sparkles, Star, WandSparkles } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";

const destinations = [
  {
    city: "Amalfi Coast",
    country: "Italy",
    note: "Coastal calm",
    image: "https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?auto=format&fit=crop&w=900&q=85",
  },
  {
    city: "Kyoto",
    country: "Japan",
    note: "Quiet wonder",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=900&q=85",
  },
  {
    city: "Marrakech",
    country: "Morocco",
    note: "Color & soul",
    image: "https://images.unsplash.com/photo-1597212618440-806262de4f6b?auto=format&fit=crop&w=900&q=85",
  },
];

export function LandingSections() {
  return (
    <>
      <section id="features" className="bg-cream px-6 py-24 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[.22em] text-coral">The smarter way to wander</p>
            <h2 className="font-display mt-5 text-4xl leading-tight tracking-tight sm:text-5xl">
              Your trip, with all the good parts
              <span className="italic text-coral"> already figured out.</span>
            </h2>
          </div>
          <div className="mt-16 grid gap-5 md:grid-cols-3">
            {[
              { icon: WandSparkles, title: "Made for you", text: "Plans shaped around your pace, tastes, budget, and the tiny details that make a trip yours." },
              { icon: CloudSun, title: "Ready for real life", text: "Live weather and smart timing keep your itinerary flexible when the world changes its mind." },
              { icon: Map, title: "Everything together", text: "Ideas, bookings, places, notes, and shared plans—all clear, calm, and easy to find." },
            ].map((item, index) => (
              <div key={item.title} className={`rounded-[2rem] p-8 ${index === 1 ? "bg-mint/60" : "bg-white"} shadow-card`}>
                <div className="grid size-12 place-items-center rounded-2xl bg-navy text-white">
                  <item.icon className="size-5" strokeWidth={1.7} />
                </div>
                <p className="mt-7 text-xs font-bold text-coral">0{index + 1}</p>
                <h3 className="font-display mt-2 text-2xl font-semibold">{item.title}</h3>
                <p className="mt-3 leading-7 text-ink/60">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="destinations" className="bg-white px-6 py-24 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[.22em] text-coral">A little inspiration</p>
              <h2 className="font-display mt-4 text-4xl tracking-tight sm:text-5xl">Where will you go next?</h2>
            </div>
            <a href="#" className="group flex items-center gap-2 text-sm font-semibold text-navy">
              Explore all destinations <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {destinations.map((destination, index) => (
              <article key={destination.city} className={`group relative overflow-hidden rounded-[2rem] ${index === 1 ? "md:translate-y-8" : ""}`}>
                <div className="relative aspect-[4/5]">
                  <Image src={destination.image} alt={destination.city} fill className="object-cover transition duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-7 text-white">
                    <p className="text-xs font-semibold uppercase tracking-[.18em] text-white/65">{destination.note}</p>
                    <h3 className="font-display mt-2 text-3xl">{destination.city}</h3>
                    <p className="mt-1 text-sm text-white/70">{destination.country}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="stories" className="bg-navy px-6 py-24 text-white lg:px-8 lg:py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[.9fr_1.1fr]">
          <div className="relative mx-auto w-full max-w-md">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem]">
              <Image src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=1000&q=85" alt="Friends enjoying a trip together" fill className="object-cover" />
            </div>
            <div className="animate-float absolute -bottom-8 -right-4 max-w-[230px] rounded-2xl bg-white p-5 text-ink shadow-soft sm:-right-14">
              <div className="flex gap-1 text-[#e7a53f]">{[1,2,3,4,5].map((n) => <Star key={n} className="size-4 fill-current" />)}</div>
              <p className="mt-3 text-sm font-medium leading-6">“It somehow felt like we’d planned it for months.”</p>
              <p className="mt-2 text-xs text-ink/45">— Maya & Theo, Portugal</p>
            </div>
          </div>
          <div className="lg:pl-10">
            <Sparkles className="size-7 text-mint" />
            <blockquote className="font-display mt-7 text-4xl leading-tight tracking-tight sm:text-5xl">
              Less spreadsheet.
              <br />
              More <span className="italic text-mint">serendipity.</span>
            </blockquote>
            <p className="mt-7 max-w-xl text-lg leading-8 text-white/65">
              VoyageAI handles the puzzle pieces so you can stay open to the moments
              no itinerary could ever predict.
            </p>
            <ButtonLink href="/plan-trip" className="mt-9">
              Create your first trip <ArrowRight className="size-4" />
            </ButtonLink>
          </div>
        </div>
      </section>

      <footer className="bg-[#0d2d30] px-6 py-10 text-white/60 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 sm:flex-row">
          <div className="flex items-center gap-2 text-white">
            <Compass className="size-5 text-coral" /> <span className="font-semibold">VoyageAI</span>
          </div>
          <p className="text-sm">Thoughtful journeys, beautifully planned.</p>
          <p className="text-xs">© 2026 VoyageAI</p>
        </div>
      </footer>
    </>
  );
}
