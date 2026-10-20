/**
 * Copy for /franchise/numbers, the HQ income calculator (Oleh's offer plan,
 * pages 11 to 13). Numbers come from `content/offer.ts`, `content/proof.ts`
 * and `lib/franchise-calc.ts`; only words live here.
 */

import { OFFER } from "@/content/offer";
import { shown, UN1T } from "@/content/proof";
import { formatMoney } from "@/lib/franchise-calc";

export const UNIT_WORDS = [
  { plural: "studios", singular: "studio" },
  { plural: "clubs", singular: "club" },
  { plural: "gyms", singular: "gym" },
  { plural: "schools", singular: "school" },
  { plural: "venues", singular: "venue" },
  { plural: "franchisees", singular: "franchisee" },
] as const;

export const PLATFORMS = [
  "Mindbody",
  "Glofox",
  "Mariana Tek",
  "TeamUp",
  "ClassForKids",
  "Other",
] as const;

const glofoxFee = shown(UN1T.platformFeePerStudio);

export const calculator = {
  meta: {
    title: "HQ income calculator: what your own app would earn",
    description:
      "5 numbers, 2 minutes: what your franchise HQ would earn from a tech fee and a fee on every payment with its own app.",
  },
  hero: {
    headline: "What would HQ earn from its own app?",
    sub: "5 numbers, 2 minutes. Your figures stay private.",
  },
  fields: {
    units: {
      label: "How many studios (clubs, schools) in your network?",
      note: `Built for networks of ${OFFER.minUnits}+; under that, renting usually makes sense.`,
      range: (min: number, max: number, used: number) =>
        `Between ${min} and ${max}. Using ${used}.`,
    },
    unitWord: { label: "What do you call them?" },
    platformFee: {
      label: "What does each one pay its platform a month?",
      hint: glofoxFee === null ? null : `UN1T’s studios paid Glofox about £${glofoxFee}`,
    },
    platform: { label: "Which platform is it? (optional)", none: "Choose one" },
    techFee: {
      label: "Tech fee each would pay HQ a month",
      hint: "You set it. Start below what they pay today.",
    },
    members: {
      label: "Members (or families) per site",
      hint: "UN1T’s average is 300",
    },
    avgPayment: { label: "Average a member pays a month" },
    feeRate: { label: "Fee on every payment" },
  },
  result: {
    heading: "HQ’s new income",
    empty: "Fill in every number to see HQ’s income.",
    perMonth: "a month",
    perYear: "a year",
    lines: {
      techFee: "Tech fee",
      paymentFee: "Fee on every payment",
      plan: "Grow plan, founding rate",
    },
    payback: (months: string) =>
      `The ${formatMoney(OFFER.setupFee)} set-up comes back in about ${months} months.`,
    noPayback: "Doesn’t pay back at these numbers",
    techFeeYear: (year: string) =>
      `A year of the tech fee: ${year}, against the ${formatMoney(OFFER.setupFee)} set-up.`,
    perUnit: {
      less: (unit: string, amount: string) =>
        `Each ${unit} pays ${amount} less a month than today.`,
      more: (unit: string, amount: string) =>
        `Each ${unit} pays ${amount} more a month; HQ’s choice.`,
      same: (unit: string) => `Each ${unit} pays the same as today.`,
    },
    condition: "This works once your franchisees pay HQ the tech fee.",
  },
  next: {
    back: "Back to the offer",
  },
} as const;
