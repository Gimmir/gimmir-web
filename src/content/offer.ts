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
  /** What founding partners give. */
  commitMonths: 12,
  /** How long the founding rate is locked. */
  lockedMonths: 24,
  planId: "grow",
} as const;

export type PlanId = "run" | "grow" | "scale";

export type Plan = {
  id: PlanId;
  name: string;
  /** £ a unit a month. */
  perUnit: number;
  /** £ minimum a month. */
  minimum: number;
  /** Founding rate, Grow only. */
  founding?: { perUnit: number; minimum: number };
  includes: string;
};

export const PLANS: Plan[] = [
  {
    id: "run",
    name: "Run",
    perUnit: 49,
    minimum: 490,
    includes:
      "Hosting, app stores, fixes, security, payment monitoring",
  },
  {
    id: "grow",
    name: "Grow",
    perUnit: 79,
    minimum: 790,
    founding: { perUnit: 59, minimum: 590 },
    includes:
      "Run + every core update + 10 hours a month of features + a quarterly retention review",
  },
  {
    id: "scale",
    name: "Scale",
    perUnit: 119,
    minimum: 1_500,
    includes:
      "Grow + 25 hours a month, same-day priority, API and integrations, your own roadmap",
  },
];

/** Grow at the founding rate: the plan both calculators charge while founding slots are open. */
export const FOUNDING_PLAN = (() => {
  const grow = PLANS.find((p) => p.id === "grow");
  if (!grow?.founding) throw new Error("Grow must carry a founding rate");
  return grow.founding;
})();

/** The systems a network may run on today. Only Glofox's price is our own data (UN1T); for the rest the visitor enters theirs. */
export const SYSTEMS = [
  { id: "mindbody", name: "Mindbody", costPerUnit: null },
  { id: "mariana", name: "Mariana Tek", costPerUnit: null },
  { id: "glofox", name: "Glofox", costPerUnit: 250 },
  { id: "momence", name: "Momence", costPerUnit: null },
  { id: "teamup", name: "TeamUp", costPerUnit: null },
  { id: "classforkids", name: "ClassForKids", costPerUnit: null },
  { id: "other", name: "Other", costPerUnit: null },
] as const;

export type SystemId = (typeof SYSTEMS)[number]["id"];

/**
 * Calculator defaults (Oleh's landing calculators, 20 Oct 2026, with
 * Nazar's picks: start at 3 units, a 1% fee on every payment).
 */
export const CALC_DEFAULTS = {
  system: "glofox" as SystemId,
  units: 3,
  /** £ card payments per unit a month: 300 members × £60. */
  cardVolumePerUnit: 18_000,
  otherTech: 0,
  members: 300,
  bill: 60,
  feeOn: true,
  feeRate: 0.01,
  royalty: 0.07,
  retention: 0.6,
  uplift: 0.05,
} as const;

export const CALC_LIMITS = {
  units: { min: 1, max: 150 },
  techFee: { min: 0, max: 500, step: 10 },
  feeRate: { min: 0.005, max: 0.05 },
  retention: { min: 0.2, max: 0.95 },
  uplifts: [0.03, 0.05, 0.1, 0.15],
} as const;

/** The set-up against a year of the tech fee: a 7-studio franchise at £150. */
export const VERSUS_EXAMPLE = { units: 7, techFee: 150 } as const;

// ── Oleh's landing artboard (21 Oct 2026), the page /franchise moves to ──

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
