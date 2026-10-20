import { track } from "@vercel/analytics";

import type { BookingId } from "@/lib/booking";

type Gtag = (...args: unknown[]) => void;

/**
 * Records a completed Cal.com booking: always as a cookieless Vercel
 * Analytics event, and as the GA4 key event `call_booked` only when
 * analytics cookies were accepted (gtag exists only then). It never sends
 * who booked, only which call and the page it was booked from.
 */
export function recordBooking(
  booking: BookingId | "unknown",
  source: "popup" | "contact",
) {
  track("booking_completed", { booking, source });
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  gtag?.("event", "call_booked", {
    booking,
    source,
    source_page: window.location.pathname,
  });
}
