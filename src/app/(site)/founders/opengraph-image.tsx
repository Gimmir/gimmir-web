import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og-card";

export const alt = "Nazar & Oleh, the founders who build your platform";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogCard({
    line1: "Nazar & Oleh",
    line2: "you work with us directly",
    footer: "UN1T's engineering partner · Jimmy Coach co-owners",
    faces: ["nazar", "oleh"],
  });
}
