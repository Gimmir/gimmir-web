import { FOUNDING, OFFER, SUPPORT } from "@/content/offer";

/**
 * The ten questions on /franchise (Oleh's landing artboard, 2 Nov 2026).
 * The page reuses the same list for FAQPage JSON-LD.
 */
export type FaqItem = { key: string; question: string; answer: string };

const { grow, scale } = SUPPORT;

/** Exact pounds ("£35"); formatMoney rounds to the nearest £10. */
const formatMoney = (n: number) => `£${n.toLocaleString("en-GB")}`;

export const FAQ_ITEMS: readonly FaqItem[] = [
  {
    key: "template",
    question: "Is it a template?",
    answer:
      "No. Every founding partner gets the same core, built and tested with them, so it works from day one. Then it’s shaped to your network: your plans, your rules, and anything only you need, at a fixed price agreed before we start. Running kids’ classes? Parent accounts with more than one child, term bookings and age groups.",
  },
  {
    key: "app-fee",
    question: "What if my franchisees won’t pay me for the app?",
    answer:
      "You own the software, so you set the price. Charge less than they pay their platform today and they save. Charge more and you earn more. To them it’s one app across the network, run by you. Studios that don’t pay get locked out.",
  },
  {
    key: "renewal",
    question: "Our platform contract is up for renewal. What now?",
    answer:
      "Talk to us before you sign for 1 year or 3. A shorter term keeps your options open while your own app is built.",
  },
  {
    key: "product",
    question: "Is there a product I can see today?",
    answer: `Yes. UN1T’s app is live on the App Store: download it now. On the call we show it working and walk through your numbers. There are only ${FOUNDING.slots} founding places because the core is built with them.`,
  },
  {
    key: "spec",
    question: "Do we have to write a spec?",
    answer:
      "No. We go through what you run today, with your logins, and quote one fixed price for exactly that. Anything you have today that we missed is ours to build. No change orders.",
  },
  {
    key: "switch",
    question: "Do we switch everything off on day one?",
    answer:
      "No. One site first, your old system running alongside until the last one moves. We move every member, and anyone who can’t log in is fixed the same day.",
  },
  {
    key: "ownership",
    question: "Who owns the code and the data?",
    answer: `Franchises: your brand, your members’ data, every studio’s Stripe account and your App Store listings are yours. The core is licensed while you’re on a plan, and you can buy the code out at ${OFFER.buyoutMultiple}× the set-up fee. Groups that own their sites get the full source and the right to run and change it for good.`,
  },
  {
    key: "late",
    question: "What if you’re late?",
    answer: `We keep working for free until it’s live. The ${OFFER.readyWeeks} weeks are written into the contract.`,
  },
  {
    key: "after-launch",
    question: "What does it cost after launch?",
    answer: `Support is ${formatMoney(SUPPORT.monthly)} a month, flat, not per studio. From 7 studios, what they pay you for the app covers it. Support + Grow adds ${grow.hours} hours of new features at ${formatMoney(grow.rate)} an hour (${formatMoney(grow.monthly)} a month). Support + Scale adds ${scale.hoursFrom} or more hours at ${formatMoney(scale.rate)} (from ${formatMoney(scale.monthlyFrom)} a month). Everyone keeps Support for at least ${SUPPORT.minMonths} months.`,
  },
  {
    key: "requests",
    question: "How do we ask for a feature or report a bug?",
    answer:
      "In a shared Slack channel. The Grow and Scale hours are a developer on your requests every month, not a ticket queue behind other clients.",
  },
];

export const FAQ_COPY = {
  kicker: "Questions",
  title: "Straight answers.",
  quote: "“Book a call with us, not a sales rep.”",
  more: "Something else?",
  moreLink: "Email Oleh",
  email: "hello@gimmir.com",
} as const;
