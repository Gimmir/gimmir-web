import { calculator } from "@/content/calculator";
import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og-card";

export const alt = calculator.hero.headline;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogCard({
    label: "HQ income calculator",
    headline: [calculator.hero.headline],
    voice: calculator.hero.sub,
  });
}
