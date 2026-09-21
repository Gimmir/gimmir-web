import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og-card";
import { OFFERS, formatPrice } from "@/lib/offers";

export const alt = "Gimmir pricing: fixed, public prices";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogCard({
    line1: "Pricing",
    line2: "fixed prices, in public",
    footer: `Free calls · ${formatPrice(OFFERS.teardown)} diagnostics · builds fixed by milestone`,
    faces: ["nazar", "oleh"],
  });
}
