import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og-card";

export const alt = "Gimmir — Privacy Policy";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogCard({
    line1: "Privacy Policy",
    line2: "how we handle your data",
    footer: "Analytics, booking and contact data — nothing sold",
  });
}
