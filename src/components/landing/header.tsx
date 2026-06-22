import { Menu } from "lucide-react";
import { Logo } from "@/components/logo";
import { ButtonLink } from "@/components/ui/button";

export function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-8">
        <Logo light />
        <nav className="hidden items-center gap-8 text-sm font-medium text-white/75 md:flex">
          <a className="transition hover:text-white" href="#features">How it works</a>
          <a className="transition hover:text-white" href="#destinations">Destinations</a>
          <a className="transition hover:text-white" href="#stories">Stories</a>
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <ButtonLink href="/dashboard" variant="ghost" className="text-white hover:bg-white/10">
            Sign in
          </ButtonLink>
          <ButtonLink href="/plan-trip" className="bg-white text-ink shadow-none hover:bg-cream">
            Start planning
          </ButtonLink>
        </div>
        <button className="grid size-10 place-items-center rounded-full bg-white/10 text-white md:hidden" aria-label="Open menu">
          <Menu className="size-5" />
        </button>
      </div>
    </header>
  );
}
