/**
 * The two calculators on /franchise (Oleh's "Franchise HQ system: features
 * and landing calculators", 20 Oct 2026), as pure sums so the page, the
 * tests and the server that re-checks a submitted result agree.
 *
 * Calculator 1, what the network pays today and the payback:
 *   cost today a year   = 12·(U·C + E) + 12·U·T·(r − s)
 *   your system a year  = 12·max(planPerUnit·U, planMinimum)
 *   HQ income a year    = 12·U·F − your system      (F = tech fee HQ sets)
 *   franchisees save    = 12·U·(C − F)
 *
 * Calculator 2, what keeping members longer adds:
 *   fee income a year       = 12·U·M·B·f
 *   members kept            = U·M·Δ
 *   extra network revenue   = members kept · B · 6
 *   HQ gain from retention  = extra revenue · (k + f)
 *
 * The 6: a member who would have left during the year stays, on average,
 * half a year longer within that year.
 */

import { FOUNDING_PLAN, OFFER, PLANS } from "@/content/offer";

/** Stripe's standard UK card rate, the percentage part (1.5% + 20p). */
export const STRIPE_RATE = 0.015;

export type Plan = { perUnit: number; minimum: number };

/** Grow at the founding rate while founding slots are open, then standard Grow. */
export function growPlan(foundingOpen: boolean): Plan {
  if (foundingOpen) return FOUNDING_PLAN;
  const grow = PLANS.find((p) => p.id === "grow");
  if (!grow) throw new Error("Grow must be in PLANS");
  return { perUnit: grow.perUnit, minimum: grow.minimum };
}

/** Months for the set-up to come back from a yearly income; null when it never does. */
export function paybackMonths(incomeYear: number): number | null {
  return incomeYear > 0 ? OFFER.setupFee / (incomeYear / 12) : null;
}

export type CostInput = {
  /** Units in the network. */
  units: number;
  /** £ each unit pays its platform a month. */
  costPerUnit: number;
  /** The payment fee they pay now, as a fraction (0.015 = 1.5%). */
  paymentFeeRate: number;
  /** £ card payments per unit a month (only counts above Stripe's rate). */
  cardVolumePerUnit: number;
  /** £ other tech the network pays a month. */
  otherTech: number;
  plan: Plan;
};

export type CostResult = {
  /** What leaves the network a year today. */
  costTodayYear: number;
  /** The part of it that is payment fees above Stripe's rate. */
  extraFeesYear: number;
  /** The system's plan a year. */
  systemYear: number;
  /** What stays with the network a year. */
  keptYear: number;
  paybackMonths: number | null;
};

export function calcCostToday(input: CostInput): CostResult {
  const { units, costPerUnit, paymentFeeRate, cardVolumePerUnit, otherTech, plan } =
    input;
  const extraFeesYear =
    12 * units * cardVolumePerUnit * Math.max(paymentFeeRate - STRIPE_RATE, 0);
  const costTodayYear = 12 * (units * costPerUnit + otherTech) + extraFeesYear;
  const systemYear = 12 * Math.max(plan.perUnit * units, plan.minimum);
  const keptYear = costTodayYear - systemYear;
  return {
    costTodayYear,
    extraFeesYear,
    systemYear,
    keptYear,
    paybackMonths: paybackMonths(keptYear),
  };
}

export type TechFeeResult = {
  hqIncomeYear: number;
  /** Positive: franchisees pay less than today; negative: they pay more. */
  franchiseesSaveYear: number;
  paybackMonths: number | null;
};

/** How the tech fee HQ sets splits the same money between HQ and franchisees. */
export function calcTechFee(input: {
  units: number;
  techFee: number;
  costPerUnit: number;
  systemYear: number;
}): TechFeeResult {
  const { units, techFee, costPerUnit, systemYear } = input;
  const hqIncomeYear = 12 * units * techFee - systemYear;
  return {
    hqIncomeYear,
    franchiseesSaveYear: 12 * units * (costPerUnit - techFee),
    paybackMonths: paybackMonths(hqIncomeYear),
  };
}

export type RetentionInput = {
  units: number;
  /** Members per unit, on average. */
  members: number;
  /** £ a member pays a month, on average. */
  bill: number;
  /** Whether HQ takes a fee on every payment. */
  feeOn: boolean;
  /** The fee on every payment, as a fraction. */
  feeRate: number;
  /** HQ's royalty on franchisee revenue, as a fraction. */
  royalty: number;
  /** Members still there after 12 months today, as a fraction. */
  retention: number;
  /** Retention points added by the system, as a fraction (0.05 = +5%). */
  uplift: number;
};

export type RetentionResult = {
  feeIncomeYear: number;
  /** The uplift actually applied: retention can't pass 100%. */
  upliftApplied: number;
  membersKept: number;
  extraRevenueYear: number;
  hqGainYear: number;
};

export function calcRetention(input: RetentionInput): RetentionResult {
  const { units, members, bill, feeOn, royalty, retention, uplift } = input;
  const feeRate = feeOn ? input.feeRate : 0;
  const upliftApplied = Math.max(Math.min(uplift, 1 - retention), 0);
  const membersKept = units * members * upliftApplied;
  const extraRevenueYear = membersKept * bill * 6;
  return {
    feeIncomeYear: 12 * units * members * bill * feeRate,
    upliftApplied,
    membersKept,
    extraRevenueYear,
    hqGainYear: extraRevenueYear * (royalty + feeRate),
  };
}

/** Money to the nearest £10, halves away from zero. */
export function roundMoney(value: number): number {
  return Math.sign(value) * Math.round(Math.abs(value) / 10) * 10;
}

const GBP = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  maximumFractionDigits: 0,
});

/** "£13,920", rounded to the nearest £10; negatives as "−£7,080". */
export function formatMoney(value: number): string {
  const rounded = roundMoney(value);
  const text = GBP.format(Math.abs(rounded));
  return rounded < 0 ? `−${text}` : text;
}

/** Whole months: "10". */
export function formatMonths(value: number): string {
  return String(Math.max(Math.round(value), 1));
}

/** "1.5%", "2%". */
export function formatPercent(fraction: number): string {
  const pct = Math.round(fraction * 1000) / 10;
  return `${Number.isInteger(pct) ? pct : pct.toFixed(1)}%`;
}

/** The GA4 bucket for a unit count (no exact numbers leave the page). */
export function unitsBucket(units: number): string {
  if (units < 3) return "<3";
  if (units <= 6) return "3-6";
  if (units <= 15) return "7-15";
  if (units <= 30) return "16-30";
  return "30+";
}

// ── The network model (Oleh's landing artboard, 21 Oct 2026) ─────────────
// One three-step model for /franchise, replacing the two calculators above
// once the page moves over:
//   leaves a year        = 12·U·C
//   tech fee a year      = 12·U·F                 (F starts at C: no change)
//   fee on payments      = 12·U·M·B·f
//   HQ income a year     = tech fee + fee on payments (before the support plan)
//   churn with the app   = churn·(1 − cut), to 0.1 point
//   still there a year   = (1 − churn)^12
//   members kept a year  = 12·U·M·(churn − churn with the app)
//   extra revenue        = members kept · B · 6
//   HQ gain              = extra revenue · f
// The 6: a member who would have left stays, on average, half a year
// longer within that year.

export type NetworkInput = {
  units: number;
  /** £ each unit pays its platform a month. */
  costPerUnit: number;
  /** £ each unit pays HQ a month. */
  techFee: number;
  members: number;
  /** £ a member pays a month. */
  bill: number;
  /** Fee on every payment, as a fraction (0.01 = 1%). */
  feeRate: number;
  /** Members lost a month today, as a fraction (0.05 = 5%). */
  churn: number;
  /** How much the onboarding flow cuts churn, as a fraction (0.2 = 20%). */
  cut: number;
};

export type NetworkProjection = {
  leavesYear: number;
  techFeeYear: number;
  paymentFeeYear: number;
  /** HQ's income from its own app, before the support plan. */
  incomeYear: number;
  /** Monthly churn with the app, as a fraction, to 0.1 point. */
  churnNew: number;
  /** Members still there after 12 months, today and with the app (0–1). */
  stayYear: number;
  stayYearNew: number;
  membersKeptYear: number;
  extraRevenueYear: number;
  retentionGainYear: number;
};

export function projectNetwork(input: NetworkInput): NetworkProjection {
  const { units, costPerUnit, techFee, members, bill, feeRate, churn, cut } = input;
  const techFeeYear = 12 * units * techFee;
  const paymentFeeYear = 12 * units * members * bill * feeRate;
  const churnNew = Math.round(churn * (1 - cut) * 1000) / 1000;
  const membersKeptYear = Math.round(12 * units * members * (churn - churnNew));
  const extraRevenueYear = membersKeptYear * bill * 6;
  return {
    leavesYear: 12 * units * costPerUnit,
    techFeeYear,
    paymentFeeYear,
    incomeYear: techFeeYear + paymentFeeYear,
    churnNew,
    stayYear: Math.pow(1 - churn, 12),
    stayYearNew: Math.pow(1 - churnNew, 12),
    membersKeptYear,
    extraRevenueYear,
    retentionGainYear: extraRevenueYear * feeRate,
  };
}

/** HQ's total a year: income, plus the retention gain once step 3 is in. */
export function networkTotal(p: NetworkProjection, withRetention: boolean): number {
  return p.incomeYear + (withRetention ? p.retentionGainYear : 0);
}
