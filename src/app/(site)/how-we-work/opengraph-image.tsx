import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og-card";

export const alt = "How we work: fixed prices, your code from day one";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogCard({
    line1: "How we work",
    line2: "fixed prices, your code from day one",
    footer: "Founders on every call · runbooks as standard",
    faces: ["nazar", "oleh"],
  });
}
