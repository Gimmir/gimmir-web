import { OFFERS, formatPrice } from "@/lib/offers";
import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og-card";

export const alt =
  "The Review: technical due diligence for fitness and health apps";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  const review = OFFERS.review;
  return ogCard({
    line1: "The Review",
    line2: "technical due diligence for fitness & health apps",
    footer: `${review.duration} · ${formatPrice(review)} fixed, credited to your build`,
    faces: ["oleh", "nazar"],
  });
}
