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
    { amount: 4_000, label: "At signing", when: "Holds your slot", week: 1 },
    {
      amount: 4_000,
      label: "Mid-build, week 6",
      when: "Once you’ve seen the app on your phone",
      week: 6,
    },
    {
      amount: 4_000,
      label: "At release",
      when: "When your apps are live in the stores",
      week: 12,
    },
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

// ── Oleh's landing artboard (2 Nov 2026) ──

/**
 * Support after launch: one flat price for the network, not per studio
 * (Nazar, 2 Nov 2026). Grow and Scale add building hours on top.
 */
export const SUPPORT = {
  /** £ a month, flat. */
  monthly: 980,
  /** Founding partners keep Support at least this long. */
  minMonths: 6,
  grow: { hours: 40, rate: 35, monthly: 1_400 },
  scale: { hoursFrom: 80, rate: 30, monthlyFrom: 2_400 },
} as const;

/** What founding partners give in return for the founding terms. */
export const FOUNDING_RETURN = [
  "a case study",
  "a monthly feedback call",
  `Support for at least ${SUPPORT.minMonths} months`,
] as const;

/**
 * Gym groups that own their sites (5 to 50): we rebuild their platform and
 * member app as one system, and they get the code. No public price.
 */
export const GROUPS = {
  minSites: 5,
  maxSites: 50,
  regions: "UK and US",
} as const;

/**
 * The three-step model's defaults and answer options. Units start at 3
 * (Nazar, 20 Oct 2026, kept on 2 Nov); the rest are the artboard's.
 * Fractions, not %; `drop` is in points off monthly churn.
 */
export const NETWORK_DEFAULTS = {
  units: 3,
  costPerUnit: 250,
  members: 300,
  bill: 100,
  feeRate: 0.01,
  churn: 0.05,
  drop: 0.01,
} as const;

export const NETWORK_OPTIONS = {
  units: { min: 3, max: 100 },
  costPerUnit: { min: 100, max: 600, step: 10 },
  techFee: { min: 0, max: 500, step: 10 },
  members: [100, 200, 300, 500],
  bill: [50, 75, 100, 150, 200, 250],
  feeRate: [0, 0.005, 0.01, 0.02, 0.03],
  churn: [0.03, 0.05, 0.07, 0.1],
  /** Points off churn; options that would take it under 1% are hidden. */
  drop: [0.01, 0.02, 0.03],
} as const;
