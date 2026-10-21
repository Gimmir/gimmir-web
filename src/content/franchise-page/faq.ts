import { FOUNDING, OFFER } from "@/content/offer";

/**
 * The seven hard questions on /franchise (Oleh's landing artboard, 21 Oct
 * 2026). The page reuses the same list for FAQPage JSON-LD.
 */
export type FaqItem = { key: string; question: string; answer: string };

export const FAQ_ITEMS: readonly FaqItem[] = [
  {
    key: "template",
    question: "Is it a template?",
    answer:
      "No. Every partner gets the same tested core, so it works from day one. Then we shape it to your network: your plans, your rules, and features built on your request at a fixed price agreed before we start.",
  },
  {
    key: "tech-fee",
    question: "What if franchisees refuse to pay HQ a tech fee?",
    answer:
      "HQ sets it. Start at what they pay their platform today, so nothing changes for them, or go lower and they keep the difference. Franchisees who don’t pay are locked out automatically.",
  },
  {
    key: "product",
    question: "Is there a product I can see today?",
    answer: `UN1T’s app is live on the App Store, and on the call we show it working. The core is built together with ${FOUNDING.slots} founding partners, which is why there are only ${FOUNDING.slots} slots.`,
  },
  {
    key: "ownership",
    question: "Who owns the code and the data?",
    answer: `Your brand, your members’ data, every franchisee’s Stripe account and your store listings are yours. The core is licensed while you are on a support plan, and you can buy the code out at ${OFFER.buyoutMultiple}× the set-up fee.`,
  },
  {
    key: "members",
    question: "How do our members move over?",
    answer:
      "We move every member. Anyone who can’t log in is fixed the same day.",
  },
  {
    key: "late",
    question: "What happens if you are late?",
    answer: `Ready in ${OFFER.readyWeeks} weeks is written into the contract. If we are late, we keep working for free until it is ready.`,
  },
  {
    key: "after-setup",
    question: "What does it cost after set-up?",
    answer:
      "A monthly support plan you can switch any month: Support, Support + Grow with 40 hours of building a month, or Support + Scale with 120+ hours a month at a lower hourly rate. We agree the price on the call.",
  },
];

export const FAQ_COPY = {
  kicker: "08 · Questions",
  title: "The hard questions, answered.",
  quote: "“Book a call with us, not a sales rep.”",
} as const;
