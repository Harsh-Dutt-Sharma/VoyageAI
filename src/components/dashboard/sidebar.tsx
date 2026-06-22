import Link from "next/link";
import { Bell, Compass, Heart, LayoutDashboard, Luggage, Settings, Sparkles } from "lucide-react";
import { Logo } from "@/components/logo";

const links = [
  { label: "Overview", icon: LayoutDashboard, active: true },
  { label: "My trips", icon: Luggage },
  { label: "Explore", icon: Compass },
  { label: "Saved places", icon: Heart },
];

export function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-[250px] flex-col border-r border-ink/8 bg-[#fbfaf6] p-5 lg:flex">
      <div className="px-2 py-2"><Logo /></div>
      <nav className="mt-10 space-y-1">
        {links.map((link) => (
          <Link
            key={link.label}
            href="#"
            className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
              link.active ? "bg-navy text-white shadow-sm" : "text-ink/55 hover:bg-ink/5 hover:text-ink"
            }`}
          >
            <link.icon className="size-[18px]" strokeWidth={1.8} />
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="mt-auto">
        <div className="mb-5 rounded-2xl bg-mint/45 p-4">
          <div className="grid size-9 place-items-center rounded-xl bg-white text-navy"><Sparkles className="size-4" /></div>
          <p className="mt-3 text-sm font-semibold">Plan something new</p>
          <p className="mt-1 text-xs leading-5 text-ink/55">Let AI turn your next idea into a trip.</p>
          <button className="mt-3 text-xs font-bold text-coral">Start planning →</button>
        </div>
        <div className="space-y-1">
          <a href="#" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-ink/55 hover:bg-ink/5"><Bell className="size-[18px]" /> Notifications</a>
          <a href="#" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-ink/55 hover:bg-ink/5"><Settings className="size-[18px]" /> Settings</a>
        </div>
        <div className="mt-5 flex items-center gap-3 border-t border-ink/8 px-2 pt-5">
          <div className="grid size-10 place-items-center rounded-full bg-coral text-sm font-bold text-white">AM</div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">Alex Morgan</p>
            <p className="truncate text-xs text-ink/45">alex@example.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
