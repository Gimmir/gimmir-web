import { FOUNDING, OFFER, PRICES_PUBLIC } from "@/content/offer";
import { formatMoney } from "@/lib/franchise-calc";

/**
 * Copy for /franchise chapters "offer" and "book", from Oleh's landing
 * artboard (2 Nov 2026). Prices and the founding terms come from
 * `@/content/offer`, never typed here.
 */

export const OFFER_COPY = {
  /** The days are appended on the client: "The founding offer · 24 days left". */
  kicker: "The founding offer",
  title: {
    lead: `${FOUNDING.slots} founding places.`,
    mark: PRICES_PUBLIC
      ? `${formatMoney(OFFER.setupFee)}, fixed.`
      : "One fixed price.",
  },
  /**
   * The artboard said "Less than a year of what 7 studios would pay you for
   * the app"; the lead states the visitor's own figure instead.
   */
  leadVersus: (months: string, units: number) =>
    `That's ${months} months of the app fee your ${units} studios pay you.`,
  lead: "Founding partners build the core with us and lock their terms.",
  price: {
    label: PRICES_PUBLIC ? "Founding set-up, fixed" : "Founding set-up",
    /** Stands in for the figure while prices are off the site. */
    hidden: "Private",
    /** Stands in for each payment amount while prices are off the site. */
    amountHidden: "Private",
    hiddenNote:
      "Our price is private for now. One fixed price, paid in three parts.",
    checks: [
      "Your app, in your brand",
      "Each studio’s own Stripe",
      "Your income collected",
      "Every member moved",
    ],
    cta: "Talk about a slot",
  },
  guarantees: {
    title: "Our risk, not yours",
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
        rest: "Or we fix it free.",
      },
    ],
  },
  note: {
    before: "Start this week and your app is live by",
    after: "In return:",
  },
} as const;

export const BOOK_COPY = {
  title: "30 minutes. Your numbers.",
  mark: "UN1T’s app live.",
  lead: "Pick a time with Oleh and Nazar. You leave with your numbers in writing, whatever you decide. No sales rep. If it’s not a fit, we’ll tell you.",
  founders: "Oleh and Nazar, founders",
  card: "Intro call · 30 min",
  tag: "Google Meet",
  fallbackLead: "Rather start in writing?",
  fallbackLink: "Email us your brand and number of sites",
  email: "hello@gimmir.com",
  emailSubject: "Founding partner enquiry",
  button: "Book 30 minutes",
} as const;
