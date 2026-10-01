import { how } from "@/content/how";
import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og-card";

export const alt = "No black box: how a build runs, how we price it, and what stays yours.";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogCard({
    label: how.hero.label,
    headline: [how.hero.title],
    voice: "How a build runs, how we price it, and what stays yours.",
    picture: { people: ["nazar", "oleh"] },
  });
}
