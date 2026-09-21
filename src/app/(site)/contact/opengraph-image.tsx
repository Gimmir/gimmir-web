import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og-card";
import { BOOKINGS } from "@/lib/booking";

export const alt = "Book a call with Gimmir's founders";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  const minutes = [
    BOOKINGS.costCheck.minutes,
    BOOKINGS.founderReview.minutes,
  ].sort((a, b) => a - b);

  return ogCard({
    line1: "Book a call",
    line2: "talk to the people who build it",
    footer: `${minutes[0]} to ${minutes[1]} minutes · no pitch deck`,
    faces: ["nazar", "oleh"],
  });
}
