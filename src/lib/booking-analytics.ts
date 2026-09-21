import { track } from "@vercel/analytics";

import type { BookingId } from "@/lib/booking";

type Gtag = (...args: unknown[]) => void;

/**
 * Records a completed Cal.com booking: always as a cookieless Vercel
 * Analytics event, and as a GA4 `generate_lead` only when analytics cookies
 * were accepted (gtag exists only then). It never sends who booked, only
 * which call and where it was booked from.
 */
export function recordBooking(
  booking: BookingId | "unknown",
  source: "popup" | "contact",
) {
  track("booking_completed", { booking, source });
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  gtag?.("event", "generate_lead", { booking, source });
}
