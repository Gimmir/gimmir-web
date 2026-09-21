/**
 * The two bookable calls and which one each page offers. Every signed CTA
 * label and Cal.com link lives here, so moving a call to another host (e.g.
 * Oleh's own calendar) is a one-line change.
 */

import type { FounderId } from "@/lib/founders";

export type BookingId = "costCheck" | "founderReview";

export type Booking = {
  id: BookingId;
  /** Cal.com event path, `user/event`. */
  calLink: string;
  /** Founders on the call, in the order they're named. */
  hosts: FounderId[];
  minutes: number;
  /** Full signed CTA label. */
  label: string;
  /** Compact label for mobile. */
  short: string;
  /** Header button label. */
  header: string;
};

export const BOOKINGS: Record<BookingId, Booking> = {
  costCheck: {
    id: "costCheck",
    // Swap to "nazarmoroze/platform-cost-check" once that event exists in Cal.com.
    calLink: "nazarmoroze/founder-review",
    hosts: ["nazar"],
    minutes: 20,
    label: "Book your free cost check with Nazar",
    short: "Book 20 minutes with Nazar",
    header: "Book with Nazar",
  },
  founderReview: {
    id: "founderReview",
    calLink: "nazarmoroze/founder-review",
    hosts: ["nazar", "oleh"],
    minutes: 30,
    label: "Book a founder review call with Nazar & Oleh",
    short: "Book with Nazar & Oleh",
    header: "Book with Nazar & Oleh",
  },
};

/** Route prefixes whose visitors get a specific call; first match wins. */
const ROUTE_BOOKINGS: Array<[prefix: string, BookingId]> = [
  ["/operators", "costCheck"],
  ["/work/un1t", "costCheck"],
  ["/the-review", "founderReview"],
  ["/health", "founderReview"],
  ["/work/jimmy-coach", "founderReview"],
];

/**
 * The call a page should offer, or null on pages that serve both audiences
 * (those send the visitor to /contact to choose).
 */
export function bookingForPath(pathname: string): BookingId | null {
  const match = ROUTE_BOOKINGS.find(
    ([prefix]) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
  return match ? match[1] : null;
}
