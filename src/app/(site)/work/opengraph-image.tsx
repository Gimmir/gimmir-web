import { work } from "@/content/work";
import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og-card";

export const alt = "Our work: nine products shipped, four in fitness. Two you can see: UN1T and Jimmy Coach.";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogCard({
    label: "Our work",
    // the H1 without its inline icons: the tiles beside it are the icons
    headline: work.hero.headline.filter((t) => typeof t === "string" || "mark" in t),
    voice: "Two you can see: UN1T and Jimmy Coach.",
    picture: { apps: ["un1t", "jimmy"], locked: 2 },
  });
}
