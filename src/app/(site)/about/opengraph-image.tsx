import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og-card";

export const alt = "Nazar & Oleh.";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogCard({
    line1: "Nazar & Oleh.",
    line2:
      "Two founders who build SaaS as owners. Fitness is where we go deepest.",
    footer: "UN1T's engineering partner · Jimmy Coach co-owners",
    faces: ["nazar", "oleh"],
  });
}
