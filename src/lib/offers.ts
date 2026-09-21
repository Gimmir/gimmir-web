import { BOOKINGS, type BookingId } from "@/lib/booking";

/**
 * Single source of truth for every offer and price on the site: pages,
 * the pricing tables, share cards and schema.org all read from here, so a
 * price never drifts between places. All prices are in euros.
 */

export const CURRENCY = "EUR";

export type OfferId =
  | "costCheck"
  | "teardown"
  | "blueprint"
  | "build"
  | "reviewCall"
  | "review"
  | "fixSprint"
  | "care";

export type Offer = {
  id: OfferId;
  name: string;
  /** 0 = free; a pair = a range. */
  price: number | readonly [min: number, max: number];
  per?: "month";
  duration: string;
  /** One line for pricing tables and ladders. */
  summary: string;
  guarantee?: string;
  credit?: string;
  /** Free calls are booked straight from the offer. */
  booking?: BookingId;
};

export const OFFERS: Record<OfferId, Offer> = {
  costCheck: {
    id: "costCheck",
    name: "Platform cost check",
    price: 0,
    duration: `${BOOKINGS.costCheck.minutes} min`,
    summary: "A founder tells you if there's real money to save.",
    booking: "costCheck",
  },
  teardown: {
    id: "teardown",
    name: "Platform Fee Teardown",
    price: 2500,
    duration: "5 working days",
    summary:
      "A written breakdown of what you pay now and what you'd save owning your platform.",
    guarantee:
      "If we can't find at least €2,500 a year in savings, you get your €2,500 back.",
  },
  blueprint: {
    id: "blueprint",
    name: "Migration Blueprint",
    price: 12000,
    duration: "3 weeks",
    summary: "The full migration and build plan, with a fixed build quote.",
    credit: "Credited to your build.",
  },
  build: {
    id: "build",
    name: "V1 Build / full platform",
    price: [75000, 200000],
    duration: "Fixed by milestone",
    summary: "Your own platform, delivered milestone by milestone.",
  },
  reviewCall: {
    id: "reviewCall",
    name: "Founder review call",
    price: 0,
    duration: `${BOOKINGS.founderReview.minutes} min`,
    summary: "A CTO-level first look at your product.",
    booking: "founderReview",
  },
  review: {
    id: "review",
    name: "The Review",
    price: 2500,
    duration: "1–2 weeks",
    summary: "Architecture, code and plan review, with a written report.",
    credit: "Credited toward your first invoice if you build with us.",
  },
  fixSprint: {
    id: "fixSprint",
    name: "Fix Sprint",
    price: 9000,
    duration: "2 weeks",
    summary: "We fix the highest-risk issues ourselves.",
  },
  care: {
    id: "care",
    name: "Platform Care + Roadmap",
    price: [4000, 8000],
    per: "month",
    duration: "Monthly",
    summary: "Ongoing build and maintenance once you're live.",
  },
};

/** The paths each audience climbs, in order. */
export const OPERATOR_LADDER: OfferId[] = [
  "costCheck",
  "teardown",
  "blueprint",
  "build",
];
export const FOUNDER_LADDER: OfferId[] = [
  "reviewCall",
  "review",
  "fixSprint",
  "build",
];
export const ONGOING: OfferId[] = ["care"];

const euro = (n: number) => `€${n.toLocaleString("en-US")}`;
const thousands = (n: number) => `${n / 1000}`;

/**
 * Display price: "Free", "€2,500", "€75–200k", "€4–8k/month".
 * Pass `{ per: false }` to drop the "/month" suffix.
 */
export function formatPrice(offer: Offer, { per = true } = {}): string {
  const { price } = offer;
  let text: string;
  if (typeof price === "number") {
    text = price === 0 ? "Free" : euro(price);
  } else {
    const [min, max] = price;
    const inK = min % 1000 === 0 && max % 1000 === 0;
    text = inK
      ? `€${thousands(min)}–${thousands(max)}k`
      : `${euro(min)}–${euro(max).slice(1)}`;
  }
  return per && offer.per ? `${text}/${offer.per}` : text;
}
