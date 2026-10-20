/**
 * /franchise, the offer page (Oleh's website plan, 20 Oct 2026, pages 7 to
 * 11), as copy. Every price, plan figure, slot count, date and UN1T figure
 * is read from `offer.ts` and `proof.ts`; none is typed here. The sums
 * live in the calculators (`content/calculator.ts`). Overrides decided by
 * Nazar on 20 Oct 2026: the target is 3+ units (not 7+), the plans line,
 * the set-up line, "Is it for us?" and one new FAQ item.
 */

import {
  FOUNDING,
  FOUNDING_PLAN,
  OFFER,
  PLANS,
  VERSUS_EXAMPLE,
} from "@/content/offer";
import { UN1T, shown, type Claim } from "@/content/proof";
import { BOOKINGS } from "@/lib/booking";

const POUNDS = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  maximumFractionDigits: 0,
});

/** A price as set in the offer, exact ("£59"); sums use `formatMoney`. */
export const gbp = (value: number) => POUNDS.format(value);

/** "1 Dec 2026" from an ISO date. */
export const formatDate = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });

/** A UN1T claim's value. A pending claim must not render, so fail the build. */
function approved<T>(claim: Claim<T>): T {
  const value = shown(claim);
  if (value === null) throw new Error("A claim /franchise needs is pending");
  return value;
}

const setup = gbp(OFFER.setupFee);
const [deposit, onReady, onFlowing] = OFFER.payments;
const grow = PLANS.find((p) => p.id === "grow");
if (!grow) throw new Error("Grow must be in PLANS");
const { units, techFee } = VERSUS_EXAMPLE;
const studios = approved(UN1T.studios);
const memberCount = approved(UN1T.members);
const platformFee = approved(UN1T.platformFeePerStudio);
const quote = approved(UN1T.quote);

export const franchise = {
  meta: {
    // the layout's title template adds "· Gimmir"
    title: "Your franchise app: turn platform fees into HQ income",
    description: `Franchisees pay Mindbody or Glofox every month. With your own app that money comes to HQ, plus a fee on every payment. ${setup} fixed, ready in ${OFFER.readyWeeks} weeks.`,
  },

  cta: {
    numbers: { label: "Work out my numbers", href: "#calculator" },
    call: { label: BOOKINGS.franchiseCall.label },
  },

  hero: {
    headline: "Your franchisees pay Mindbody every month. Make it HQ’s income.",
    sub: `With your own app, what each studio pays its platform comes to HQ as a tech fee, plus a small fee on every payment your members make. Built for franchise HQs with ${OFFER.minUnits}+ units.`,
    proof: {
      name: UN1T.name,
      facts: [
        `${studios} studios`,
        `${memberCount} members`,
        "its own app on the App Store",
      ],
    },
  },

  proof: {
    title: `We built this for ${UN1T.name}, a ${studios}-studio franchise.`,
    story: `${UN1T.name} ran ${studios} studios on Glofox at about ${gbp(platformFee)} a studio a month. Now they have their own member app, booking and payments, and HQ earns a fee on every studio payment.`,
    quote,
    appStore: {
      label: "See UN1T’s app on the App Store",
      href: UN1T.appStore.url,
    },
    read: { label: "Read the case", href: "/work/un1t" },
    yours: "Yours looks like this, in your brand. On the call, we show it live.",
  },

  own: {
    title: "What you own",
    items: [
      "Your brand",
      "Your members’ data",
      "Every franchisee’s Stripe account",
      "Your app store listings",
    ],
    fee: "Every penny of the fee on payments is yours: Gimmir takes no cut.",
    code: `The core is licensed while you’re on a plan. If you ever leave, you can buy the code for ${OFFER.buyoutMultiple}× the set-up fee, so it’s yours either way.`,
  },

  guarantees: {
    title: "Our guarantees",
    items: [
      {
        id: "price",
        title: "One fixed price.",
        body: "No hours, no extras.",
      },
      {
        id: "weeks",
        title: `Ready in ${OFFER.readyWeeks} weeks, in writing.`,
        body: `If we’re late, we keep working for free until it’s ready. Ready means built, tested and sent to the app stores; Apple’s and Google’s review time isn’t in the ${OFFER.readyWeeks} weeks.`,
      },
      {
        id: "members",
        title: "We move every member.",
        body: "Can’t log in? Fixed the same day.",
      },
      {
        id: "fee",
        title: "Your fee works from the first payment,",
        body: "or we fix it before you pay the last stage.",
      },
    ],
  },

  founding: {
    title: `${FOUNDING.slots} founding partners.`,
    price: `${setup} fixed to set your brand up on the core.`,
    payments: `Paid in ${OFFER.payments.length} parts: ${gbp(deposit.amount)} ${deposit.when}, ${gbp(onReady.amount)} ${onReady.when}, ${gbp(onFlowing.amount)} ${onFlowing.when}.`,
    // Nazar, 20 Oct 2026: the sum is for a 7-studio franchise
    versus: `For a ${units}-studio franchise, the set-up costs less than a year of the tech fee your franchisees pay you (${units} × ${gbp(techFee)} × 12 = ${gbp(units * techFee * 12)}).`,
    give: {
      title: "What founding partners give",
      items: [
        `${FOUNDING.commitMonths} months minimum on ${grow.name}`,
        "A case study",
        "A monthly feedback call",
      ],
    },
    get: {
      title: "What they get",
      items: [
        `${grow.name} locked at ${gbp(FOUNDING_PLAN.perUnit)} a unit (minimum ${gbp(FOUNDING_PLAN.minimum)}) for ${FOUNDING.lockedMonths} months`,
      ],
    },
    why: "We build the core together with you. That’s why there’s no product to sign up to yet: UN1T’s app is the working proof.",
  },

  plans: {
    title: "Plans",
    unit: "a unit a month",
    minimum: "minimum a month",
    foundingTag: "Founding plan",
    foundingRate: "founding rate",
    standard: "standard",
    // Nazar, 20 Oct 2026: replaces "Your franchisees' tech fee covers the plan."
    note: "From 4 units, the tech fee alone covers the plan. Below that, the fee on payments covers the rest. Run is the floor; everything above it is optional.",
  },

  how: {
    title: "How it works",
    steps: [
      {
        title: "Your numbers, in writing.",
        body: "Units, what they pay today, your members. Free, same day.",
      },
      {
        title: "30 minutes with Oleh.",
        body: "Your numbers, UN1T’s app live, the founding terms.",
      },
      {
        title: `${gbp(deposit.amount)} holds your slot.`,
        body: `Ready in ${OFFER.readyWeeks} weeks from there.`,
      },
    ],
  },

  faq: {
    title: "Questions",
    items: [
      {
        key: "fee",
        question: "My franchisees won’t accept a new fee.",
        answer:
          "UN1T’s franchisees pay HQ a royalty and a fee on every payment on top. You decide what they pay: less than their platform today, or more. HQ owns the software, so HQ sets the price.",
      },
      {
        key: "contract",
        question: "We’re under contract with Glofox or Mindbody.",
        answer: `Tell us when it ends. We plan the ${OFFER.readyWeeks} weeks around your renewal date, so you’re not paying for both for long.`,
      },
      {
        key: "members",
        question: "Will we lose members in the move?",
        answer:
          "We move every member. Anyone who can’t log in is fixed the same day.",
      },
      {
        key: "fit",
        question: "Is it for us?",
        answer: `Built for franchise HQs with ${OFFER.minUnits}+ units in ${OFFER.regions}, fitness or kids’ activities. We cost more than renting a platform: the app is yours, built around how you run. With 1 or 2 sites, renting usually makes sense.`,
      },
      // DRAFT: Nazar/Oleh to confirm wording
      {
        key: "cost",
        question: "Why does it cost more than renting a platform?",
        answer:
          "Because it’s service as software. We build your app around how your network runs, keep it running, and keep adding what you ask for on your plan. A rented platform is the same product for every brand on it.",
      },
      {
        key: "disappear",
        question: "What if Gimmir disappears?",
        answer: `Your brand, data, Stripe accounts and store listings are in your name. You can buy the code for ${OFFER.buyoutMultiple}× the set-up fee.`,
      },
      {
        key: "cut",
        question: "Does Gimmir take a cut of payments?",
        answer:
          "No. Every penny of the fee is yours. You pay the plan, that’s all.",
      },
      {
        key: "demo",
        question: "Why is there no demo account?",
        answer: `The core is built with the ${FOUNDING.slots} founding partners. UN1T’s app is the working proof, and we show it live on the call.`,
      },
    ],
  },

  close: {
    title: "Find out what HQ would earn in a year.",
    email: { lead: "Prefer email?", address: "hello@gimmir.com" },
  },
} as const;
