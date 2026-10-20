/**
 * The two bookable calls and which one each page offers. Every signed CTA
 * label and Cal.com link lives here, so moving a call to another host (e.g.
 * Oleh's own calendar) is a one-line change.
 */

import type { FounderId } from "@/lib/founders";

export type BookingId = "franchiseCall" | "founderReview";

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
  franchiseCall: {
    id: "franchiseCall",
    // Oleh's own event ("Your numbers + UN1T live, 30 min, Oleh") replaces
    // this link once it exists in Cal.com (Nazar, 20 Oct 2026).
    calLink: "nazarmoroze/founder-review",
    hosts: ["oleh"],
    minutes: 30,
    label: "Book 30 minutes with Oleh",
    short: "Book 30 minutes with Oleh",
    header: "Book with Oleh",
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
  ["/franchise", "franchiseCall"],
  ["/kids-activity", "franchiseCall"],
  ["/work/un1t", "franchiseCall"],
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
