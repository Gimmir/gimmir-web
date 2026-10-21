import { OFFER } from "@/content/offer";
import { formatMoney } from "@/lib/franchise-calc";

/**
 * Copy for /franchise chapters 07 (founding offer) and 09 (book), from
 * Oleh's landing artboard (21 Oct 2026). Prices, plans and the founding
 * terms come from `@/content/offer`, never typed here.
 */

const setup = formatMoney(OFFER.setupFee);
const parts = OFFER.payments.length;

export const OFFER_COPY = {
  kicker: "07 · Founding offer",
  title: `${setup} once. Paid in ${parts} parts.`,
  lead: "Less than one year of the tech fee your studios pay you. Founding partners build the core with us and lock their terms.",
  holdSlot: "Hold a slot",
  noNumbers: `Haven’t run your numbers yet? It takes ${parts} short steps.`,
  runNumbers: "Run my numbers",
  noPayback: "Set a tech fee or a fee on payments to see the payback.",
  /** "The £12,000 set-up comes back in about N months." */
  payback: (months: string) =>
    `The ${setup} set-up comes back in about ${months} months.`,
  counters: {
    days: "days until the founding terms close",
    slots: "founding slots, built with us",
    ready: "your app ready, if you start this week",
  },
  price: {
    label: "Founding set-up, fixed",
    /** One label per `OFFER.payments` entry, in order. */
    rows: ["To hold your slot", "When it’s ready", "Once your fee is flowing"],
    returnLead: "In return:",
    cta: "Talk about a slot",
  },
  guarantees: {
    title: "Guarantees",
    items: [
      { bold: "One fixed price.", rest: "No hours, no extras." },
      {
        bold: `Ready in ${OFFER.readyWeeks} weeks, in writing.`,
        rest: "Late on our side? We keep working for free.",
      },
      {
        bold: "We move every member.",
        rest: "Can’t log in? Fixed the same day.",
      },
      {
        bold: "Your fee works from the first payment.",
        rest: "Or we fix it before you pay the last part.",
      },
    ],
  },
  support: {
    title: "After launch: support you can switch",
    note: "Move between them any month as your needs change.",
    price: "Price on the call",
    /** The plan drawn with the ink outline. */
    featured: "grow",
  },
  bridge: { lead: "Still deciding?", mark: "Straight answers.", node: "08" },
} as const;

export const FAQ_BRIDGE = {
  lead: "30 minutes.",
  mark: "Your numbers, in writing.",
  node: "09",
} as const;

export const BOOK_COPY = {
  title: "30 minutes. Your numbers. UN1T’s app live.",
  lead: "Pick a time with Oleh and Nazar. You leave with your numbers in writing, whatever you decide.",
  founders: "Oleh and Nazar, founders",
  card: "Franchise call · 30 min",
  fallbackLead: "Rather start in writing?",
  fallbackLink: "Email us your brand and studio count",
  email: "hello@gimmir.com",
  emailSubject: "Founding partner enquiry",
  button: "Book 30 minutes",
} as const;
