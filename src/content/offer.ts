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

/** The plan the calculator and the worked example charge: Grow at the founding rate. */
export const FOUNDING_PLAN = (() => {
  const grow = PLANS.find((p) => p.id === "grow");
  if (!grow?.founding) throw new Error("Grow must carry a founding rate");
  return grow.founding;
})();

/** Calculator defaults (Nazar, 20 Oct 2026: start at 3 units). */
export const CALC_DEFAULTS = {
  units: 3,
  platformFee: 250,
  techFee: 150,
  members: 300,
  avgPayment: 60,
  /** 1%, as a fraction. */
  feeRate: 0.01,
} as const;

/** The worked example on /franchise: a 7-studio franchise. */
export const WORKED_EXAMPLE = {
  units: 7,
  techFee: 150,
  members: 300,
  avgPayment: 60,
  feeRate: 0.01,
} as const;
