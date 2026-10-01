import { operators } from "@/content/operators";
import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og-card";

export const alt = "Your network runs on a platform you rent. Let’s make it yours. For franchises and chains with 8+ locations.";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogCard({
    label: "For brands",
    headline: operators.hero.headline,
    voice: operators.hero.sub,
    // the page's call is with Nazar
    picture: { people: ["nazar"] },
  });
}
