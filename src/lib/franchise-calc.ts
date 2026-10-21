/**
 * The /franchise network model (Oleh's landing artboard, 21 Oct 2026), as
 * pure sums so the page, the tests and the server that re-checks a
 * submitted result agree, plus the money and month formatting the page
 * shares.
 */

import { OFFER } from "@/content/offer";

/** Months for the set-up to come back from a yearly income; null when it never does. */
export function paybackMonths(incomeYear: number): number | null {
  return incomeYear > 0 ? OFFER.setupFee / (incomeYear / 12) : null;
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

// ── The network model ────────────────────────────────────────────────────
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
