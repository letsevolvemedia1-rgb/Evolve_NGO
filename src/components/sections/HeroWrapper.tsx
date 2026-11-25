import { readAllContent } from "@/lib/content";
import { Hero } from "./Hero";

export async function HeroWrapper() {
  const all = readAllContent();
  const slides = ["home.hero.slide1", "home.hero.slide2", "home.hero.slide3", "home.hero.slide4"]
    .map((key) => all.find((e) => e.key === key)?.value)
    .filter(Boolean) as string[];

  return <Hero slides={slides} />;
}
