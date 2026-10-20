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
