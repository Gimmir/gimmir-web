/**
 * The founding offer for franchise HQs (Oleh's offer plan, 20 Oct 2026), as
 * data. Prices, plans, guarantees and the founding terms live here and
 * nowhere else; /franchise, the calculator, JSON-LD and the share cards
 * read them.
 *
 * Target: franchise HQs with 3+ units (Nazar, 20 Oct 2026; the plan said
 * 7+). Prices are in pounds and never change per visitor.
 */

export const OFFER = {
  currency: "GBP",
  /** Fixed set-up for a founding partner. */
  setupFee: 12_000,
  /** The set-up, paid in 3 parts. */
  payments: [
    { amount: 4_000, when: "holds your slot" },
    { amount: 4_000, when: "when it’s ready" },
    { amount: 4_000, when: "once your fee is flowing" },
  ],
  readyWeeks: 12,
  /** If they leave, they can buy the code for this multiple of the set-up. */
  buyoutMultiple: 2,
  /** Smallest network the offer is built for. */
  minUnits: 3,
  regions: "the UK and Ireland",
} as const;

/** Founding partners. The live count comes from `offerSettings` in Sanity once it exists. */
export const FOUNDING = {
  slots: 3,
  /** Founding terms close on this date (Oleh, 20 Oct 2026). */
  termsClose: "2026-12-01",
} as const;

// ── Oleh's landing artboard (21 Oct 2026) ──

/**
 * Support after launch, switchable any month. Prices are agreed on the
 * call until Nazar sets them (null shows "Price on the call"), so the
 * calculator shows HQ's income before the support plan.
 */
export type SupportPlan = {
  id: "support" | "grow" | "scale";
  name: string;
  includes: string;
  /** £ a month; null until set. */
  price: number | null;
};

export const SUPPORT_PLANS: SupportPlan[] = [
  {
    id: "support",
    name: "Support",
    includes: "Hosting, app stores, fixes, security and payment monitoring.",
    price: null,
  },
  {
    id: "grow",
    name: "Support + Grow",
    includes: "Everything in Support, plus 40 hours a month of building.",
    price: null,
  },
  {
    id: "scale",
    name: "Support + Scale",
    includes:
      "Everything in Support, plus 120+ hours a month of building at a lower hourly rate.",
    price: null,
  },
];

/** What founding partners give in return for the founding terms. */
export const FOUNDING_RETURN = [
  "a 12-month support plan",
  "a case study",
  "a monthly feedback call while we build the core together",
] as const;

/**
 * The three-step model's defaults and answer options. Units start at 3
 * (Nazar, 20 Oct 2026); the rest are the artboard's. Fractions, not %.
 */
export const NETWORK_DEFAULTS = {
  units: 3,
  costPerUnit: 250,
  members: 300,
  bill: 60,
  feeRate: 0.01,
  churn: 0.05,
  cut: 0.2,
} as const;

export const NETWORK_OPTIONS = {
  units: { min: 3, max: 100 },
  costPerUnit: { min: 100, max: 600, step: 10 },
  techFee: { min: 0, max: 500, step: 10 },
  members: [100, 200, 300, 500],
  bill: [40, 60, 90, 120],
  feeRate: [0.005, 0.01, 0.02, 0.03],
  churn: [0.03, 0.05, 0.07, 0.1],
  cut: [0.1, 0.2, 0.3],
} as const;
