/**
 * The two bookable calls and which one each page offers. Every signed CTA
 * label and Cal.com link lives here, so moving a call to another host (e.g.
 * Oleh's own calendar) is a one-line change.
 */

export type BookingId = "costCheck" | "founderReview";

export type Booking = {
  id: BookingId;
  /** Cal.com event path, `user/event`. */
  calLink: string;
  /** Who the visitor meets, as named in the CTA. */
  host: string;
  minutes: number;
  /** Full signed CTA label. */
  label: string;
  /** Compact label for tight spots (header, mobile). */
  short: string;
};

export const BOOKINGS: Record<BookingId, Booking> = {
  costCheck: {
    id: "costCheck",
    // Swap to "nazarmoroze/platform-cost-check" once that event exists in Cal.com.
    calLink: "nazarmoroze/founder-review",
    host: "Nazar",
    minutes: 20,
    label: "Book your free 20-min platform cost check with Nazar",
    short: "Book 20 minutes with Nazar",
  },
  founderReview: {
    id: "founderReview",
    calLink: "nazarmoroze/founder-review",
    host: "Nazar & Oleh",
    minutes: 20,
    label: "Book a founder review call with Nazar & Oleh",
    short: "Book with Nazar & Oleh",
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
