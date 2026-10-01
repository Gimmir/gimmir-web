import { about } from "@/content/about";
import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og-card";

export const alt = "Nazar & Oleh: two founders who build SaaS as owners, not by the hour.";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogCard({
    label: about.hero.label,
    headline: [about.hero.title],
    voice: "Two founders who build SaaS as owners, not by the hour.",
    picture: { people: about.hero.people },
  });
}
