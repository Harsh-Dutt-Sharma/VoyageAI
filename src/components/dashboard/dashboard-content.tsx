import Image from "next/image";
import { ArrowRight, Bell, CalendarDays, ChevronRight, CloudSun, MapPin, Menu, MoreHorizontal, Plus, Sparkles, Sun, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const suggestions = [
  { city: "Lisbon", tag: "Food & culture", image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=700&q=85" },
  { city: "Bali", tag: "Slow & soulful", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=700&q=85" },
  { city: "Iceland", tag: "Wild & scenic", image: "https://images.unsplash.com/photo-1504829857797-ddff29c27927?auto=format&fit=crop&w=700&q=85" },
];

export function DashboardContent() {
  return (
    <main className="min-h-screen bg-[#f6f4ee] lg:ml-[250px]">
      <header className="flex h-20 items-center justify-between border-b border-ink/8 bg-[#f6f4ee]/90 px-5 backdrop-blur-md sm:px-8">
        <button className="grid size-10 place-items-center rounded-full bg-white text-ink shadow-sm lg:hidden" aria-label="Open navigation"><Menu className="size-5" /></button>
        <div className="hidden lg:block">
          <p className="text-xs font-medium text-ink/45">Sunday, June 22</p>
          <p className="mt-0.5 text-sm font-semibold">Your travel space</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="relative grid size-10 place-items-center rounded-full border border-ink/10 bg-white text-ink/65">
            <Bell className="size-[18px]" /><span className="absolute right-2.5 top-2.5 size-1.5 rounded-full bg-coral" />
          </button>
          <Button className="h-10 px-4"><Plus className="size-4" /> <span className="hidden sm:inline">New trip</span></Button>
        </div>
      </header>

      <div className="mx-auto max-w-[1500px] px-5 py-8 sm:px-8 lg:py-10">
        <section className="flex flex-col justify-between gap-6 xl:flex-row xl:items-end">
          <div>
            <p className="text-sm text-ink/45">Good morning, Alex</p>
            <h1 className="font-display mt-2 text-4xl tracking-tight sm:text-5xl">Where to next?</h1>
            <p className="mt-3 max-w-xl text-ink/55">Your next chapter is 38 days away. Here’s everything coming together.</p>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-ink/8 bg-white px-4 py-3 shadow-sm">
            <div className="grid size-9 place-items-center rounded-xl bg-[#fff1da] text-[#d88419]"><Sun className="size-5" /></div>
            <div>
              <p className="text-xs text-ink/45">At home in London</p>
              <p className="text-sm font-semibold">21°C · Mostly sunny</p>
            </div>
          </div>
        </section>

        <section className="mt-9 grid gap-6 xl:grid-cols-[1.55fr_.8fr]">
          <article className="relative min-h-[390px] overflow-hidden rounded-[2rem] bg-navy text-white shadow-soft">
            <Image src="https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=1400&q=88" alt="Venice canal at sunset" fill className="object-cover" priority />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,39,42,.92),rgba(8,39,42,.5)_52%,rgba(8,39,42,.08))]" />
            <div className="relative flex min-h-[390px] flex-col justify-between p-7 sm:p-9">
              <div className="flex items-start justify-between">
                <span className="rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold backdrop-blur">UPCOMING TRIP</span>
                <button className="grid size-9 place-items-center rounded-full bg-black/15 backdrop-blur"><MoreHorizontal className="size-5" /></button>
              </div>
              <div>
                <p className="text-sm text-white/65">August 1 — 9, 2026</p>
                <h2 className="font-display mt-2 text-4xl sm:text-5xl">Italian summer</h2>
                <p className="mt-2 flex items-center gap-2 text-sm text-white/70"><MapPin className="size-4 text-mint" /> Venice · Florence · Rome</p>
                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <Button className="h-10 bg-white text-ink shadow-none hover:bg-cream">View itinerary <ArrowRight className="size-4" /></Button>
                  <div className="flex -space-x-2">
                    {["AM","JT","SL"].map((person, i) => <span key={person} className={`grid size-9 place-items-center rounded-full border-2 border-white/70 text-[10px] font-bold ${["bg-coral","bg-mint text-ink","bg-[#e9c48c] text-ink"][i]}`}>{person}</span>)}
                  </div>
                  <span className="text-xs text-white/60">3 travelers</span>
                </div>
              </div>
            </div>
          </article>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-1">
            <article className="rounded-[2rem] bg-mint/65 p-6">
              <div className="flex items-start justify-between">
                <div className="grid size-11 place-items-center rounded-2xl bg-white text-navy shadow-sm"><Sparkles className="size-5" /></div>
                <span className="text-xs font-semibold text-ink/45">AI TRAVEL NOTE</span>
              </div>
              <h3 className="font-display mt-7 text-2xl">A quieter Venice?</h3>
              <p className="mt-2 text-sm leading-6 text-ink/60">I found a lovely sunrise walk through Cannaregio before the crowds arrive.</p>
              <button className="mt-5 flex items-center gap-1 text-sm font-bold text-navy">Add to trip <ChevronRight className="size-4" /></button>
            </article>
            <article className="rounded-[2rem] bg-white p-6 shadow-card">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold uppercase tracking-[.16em] text-ink/40">Trip readiness</p>
                <span className="text-sm font-bold text-coral">72%</span>
              </div>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-ink/8"><div className="h-full w-[72%] rounded-full bg-coral" /></div>
              <div className="mt-5 space-y-3 text-sm">
                <div className="flex items-center justify-between"><span className="text-ink/55">Flights</span><span className="font-semibold text-[#4b896d]">Booked</span></div>
                <div className="flex items-center justify-between"><span className="text-ink/55">Stays</span><span className="font-semibold text-[#4b896d]">Booked</span></div>
                <div className="flex items-center justify-between"><span className="text-ink/55">Activities</span><span className="font-semibold text-coral">4 to choose</span></div>
              </div>
            </article>
          </div>
        </section>

        <section className="mt-10 grid gap-8 xl:grid-cols-[1.35fr_.65fr]">
          <div>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[.18em] text-coral">Picked for you</p>
                <h2 className="font-display mt-2 text-3xl">A little inspiration</h2>
              </div>
              <button className="text-sm font-semibold text-navy">See all</button>
            </div>
            <div className="scrollbar-hide mt-5 flex gap-4 overflow-x-auto pb-3">
              {suggestions.map((item) => (
                <article key={item.city} className="group min-w-[215px] flex-1 overflow-hidden rounded-2xl bg-white shadow-card">
                  <div className="relative aspect-[1.45] overflow-hidden">
                    <Image src={item.image} alt={item.city} fill className="object-cover transition duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-4">
                    <p className="text-xs font-medium text-coral">{item.tag}</p>
                    <div className="mt-1 flex items-center justify-between"><h3 className="font-display text-xl font-semibold">{item.city}</h3><ArrowRight className="size-4 text-ink/35" /></div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[.18em] text-coral">Next up</p>
                <h2 className="font-display mt-2 text-3xl">Your week</h2>
              </div>
              <CalendarDays className="size-5 text-ink/30" />
            </div>
            <div className="mt-5 rounded-2xl bg-white p-5 shadow-card">
              {[
                { day: "24", mon: "JUN", icon: CloudSun, title: "Check Venice forecast", sub: "Weather outlook is ready" },
                { day: "28", mon: "JUN", icon: Users, title: "Plan with Jamie", sub: "Shared trip session · 7:00 PM" },
                { day: "01", mon: "JUL", icon: MapPin, title: "Book Florence stay", sub: "3 saved places to review" },
              ].map((item, i) => (
                <div key={item.title} className={`flex gap-4 py-4 ${i !== 0 ? "border-t border-ink/8" : "pt-0"} ${i === 2 ? "pb-0" : ""}`}>
                  <div className="w-10 text-center"><p className="text-lg font-bold">{item.day}</p><p className="text-[9px] font-bold tracking-wider text-ink/35">{item.mon}</p></div>
                  <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-cream text-navy"><item.icon className="size-[18px]" /></div>
                  <div className="min-w-0"><p className="truncate text-sm font-semibold">{item.title}</p><p className="mt-1 truncate text-xs text-ink/45">{item.sub}</p></div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
