import { Header } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";
import { LandingSections } from "@/components/landing/sections";

export default function HomePage() {
  return (
    <main>
      <Header />
      <Hero />
      <LandingSections />
    </main>
  );
}
