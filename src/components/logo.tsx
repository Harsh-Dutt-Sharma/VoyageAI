import Link from "next/link";
import { Compass } from "lucide-react";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label="VoyageAI home">
      <span
        className={`grid size-9 place-items-center rounded-full ${
          light ? "bg-white/12 text-white" : "bg-navy text-white"
        }`}
      >
        <Compass className="size-5" strokeWidth={1.8} />
      </span>
      <span className={`text-xl font-semibold tracking-tight ${light ? "text-white" : "text-ink"}`}>
        Voyage<span className="text-coral">AI</span>
      </span>
    </Link>
  );
}
