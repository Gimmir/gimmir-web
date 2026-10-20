/**
 * Copy for the two calculators on /franchise (Oleh's "Franchise HQ system:
 * features and landing calculators", 20 Oct 2026, with Nazar's flow):
 * ① what the network pays today and the payback, with the tech fee HQ sets;
 * ② what keeping members longer adds, in an accordion under it.
 * Numbers come from `content/offer.ts` and `lib/franchise-calc.ts`; only
 * words live here.
 */

import { OFFER } from "@/content/offer";
import { formatMoney } from "@/lib/franchise-calc";

export const UNIT_WORDS = [
  { id: "studios", one: "studio", many: "studios" },
  { id: "clubs", one: "club", many: "clubs" },
  { id: "schools", one: "school", many: "schools" },
] as const;

export type UnitWord = (typeof UNIT_WORDS)[number];

const setup = formatMoney(OFFER.setupFee);

export const calculator = {
  cost: {
    eyebrow: "Your numbers",
    title: "What does your current system cost you a year?",
    bridge:
      "Your franchisees pay HQ instead of a platform, and HQ takes a small fee on every payment. Here’s what that is for your network.",
    lead: "6 answers, 2 minutes. Nothing you type leaves this page.",
    steps: {
      system: "Your current system",
      units: (u: UnitWord) => `How many ${u.many} in your network?`,
      unitWord: "We call them",
      cost: (u: UnitWord, system: string) =>
        `What does each ${u.one} pay ${system} a month?`,
      costHint: "UN1T’s studios paid Glofox about £250.",
      costEmpty: "Enter yours",
      fee: "Payment fee you pay now",
      feeStripe: "1.5% + 20p, Stripe’s standard UK rate",
      feeMore: "My system charges more",
      feeBack: "Back to Stripe’s rate",
      volume: (u: UnitWord) => `Card payments per ${u.one} a month`,
      volumeHint: "300 members × £60 is £18,000.",
      other: "Other tech you pay each month",
      otherHint: "A branded app add-on, marketing tools, integrations.",
    },
    receipt: {
      label: "A year",
      leaves: (system: string) => `leaves your network for ${system}.`,
      system: (amount: string) =>
        `Your own system: ${amount} a year, with every update and 10 hours a month of new features.`,
      rows: {
        today: (system: string) => `Today, ${system}`,
        system: "Your own system",
        stays: "Stays with you",
      },
      hq: {
        label: "What HQ earns a year",
        techFee: (fee: string) => `Tech fee at ${fee}, after the plan`,
        paymentFee: (rate: string) => `Fee on every payment, ${rate}`,
        total: "HQ’s income",
        line: (amount: string) => `HQ earns ${amount} a year`,
        payback: (months: string) => `, and the ${setup} set-up is back in ${months} months.`,
        noPayback: `. At these numbers that doesn’t pay back the ${setup} yet.`,
        note: (members: string, bill: string, u: UnitWord) =>
          `The fee on every payment uses ${members} members × ${bill} a ${u.one}. Change them below.`,
      },
      line: (system: string) =>
        `No new members, no price changes. Charge franchisees what they pay ${system} today and it becomes HQ’s income. Charge less and they keep the difference. Your choice.`,
      empty: (u: UnitWord, system: string) =>
        `Enter what each ${u.one} pays ${system} to see your numbers.`,
    },
    split: {
      title: "What will each franchisee pay HQ a month?",
      hq: "HQ earns",
      franchisees: "Franchisees save",
      franchiseesMore: "Franchisees pay more",
      same: "Same as they pay today",
      moreLine: (amount: string) =>
        `Franchisees pay ${amount} more a year, and HQ earns it.`,
      paybackLabel: "Set-up back in",
      months: (months: string) => `${months} months`,
      noPayback: "Not from the tech fee alone",
      perYear: "a year",
    },
    writing: "Get these numbers in writing",
  },

  retention: {
    bar: {
      title: "And what it adds to your profit",
      live: (amount: string) =>
        `about ${amount} a year more for HQ if members stay longer`,
      open: "Show how",
      close: "Hide",
    },
    steps: {
      members: (u: UnitWord) => `Members per ${u.one}, on average`,
      membersHint: "UN1T’s average is 300.",
      retention: "Members still with you after 12 months",
      bill: "Average monthly bill per member",
      fee: "Fee on every payment to HQ",
      feeOn: "On",
      royalty: "Your royalty on franchisee revenue",
      royaltyHint: "Optional. Leave it at 0 if you charge a flat royalty.",
      uplift: "Retention with your own app",
    },
    results: {
      gain: "a year more to HQ from members who stay (royalty + fee).",
      kept: (members: string, revenue: string) =>
        `${members} more members kept, ${revenue} more revenue for your franchisees.`,
      total: (amount: string) => `All together: ${amount} a year for HQ`,
      payback: (months: string) => `, set-up back in ${months} months.`,
      noPayback: ".",
      small:
        "The retention buttons show what if, not a promise. On the call we use your real numbers. The fee on every payment goes on top of Stripe’s fee, and the franchisee pays it.",
    },
  },

  mobileBar: {
    leaves: "a year leaves your network",
    hq: (amount: string) => `HQ could earn ${amount}`,
    see: "See it",
  },

  engine: {
    open: "Show the list",
    close: "Hide the list",
  },

  mail: {
    to: "hello@gimmir.com",
    subject: "My numbers from gimmir.com",
  },
} as const;
