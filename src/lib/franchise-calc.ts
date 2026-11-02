/**
 * The /franchise network model (Oleh's landing artboard, churn model of 22 Oct 2026), as
 * pure sums so the page, the tests and the server that re-checks a
 * submitted result agree, plus the money and month formatting the page
 * shares.
 */

import { OFFER, SUPPORT } from "@/content/offer";

/** HQ's income a year after the Support plan. */
export function afterSupportYear(totalYear: number): number {
  return totalYear - 12 * SUPPORT.monthly;
}

/**
 * Whole months for the set-up to come back from what stays with HQ after
 * Support (the artboard's sum); null when Support costs more than the
 * income.
 */
export function paybackMonths(totalYear: number): number | null {
  const net = afterSupportYear(totalYear);
  return net > 0 ? Math.max(1, Math.round(OFFER.setupFee / (net / 12))) : null;
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
//   HQ income a year     = tech fee + fee on payments (before Support)
//   churn with the app   = max(1%, churn − drop)   (drop in points)
//   still there a year   = (1 − churn)^12
//   lost a month         = round(U·M·churn), today and with the app
//   kept a month         = lost today − lost with the app
//   extra revenue a year = kept a month · B · 12
//   HQ gain              = extra revenue · f

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
  /** How many points the onboarding flow takes off churn (0.01 = 1 point). */
  drop: number;
};

export type NetworkProjection = {
  leavesYear: number;
  techFeeYear: number;
  paymentFeeYear: number;
  /** HQ's income from its own app, before Support. */
  incomeYear: number;
  /** Monthly churn with the app, as a fraction, never under 1%. */
  churnNew: number;
  /** Members still there after 12 months, today and with the app (0–1). */
  stayYear: number;
  stayYearNew: number;
  /** Members across the network. */
  totalMembers: number;
  /** Members who leave a month, today and with the app. */
  lostMonth: number;
  lostMonthNew: number;
  /** Members a month who stay because churn drops. */
  keptMonth: number;
  /** What those members pay, a month and a year. */
  extraRevenueMonth: number;
  extraRevenueYear: number;
  /** HQ's fee on that extra revenue, a year. */
  retentionGainYear: number;
};

const MIN_CHURN = 0.01;

export function projectNetwork(input: NetworkInput): NetworkProjection {
  const { units, costPerUnit, techFee, members, bill, feeRate, churn, drop } = input;
  const techFeeYear = 12 * units * techFee;
  const paymentFeeYear = 12 * units * members * bill * feeRate;
  // to 0.1 point, so 0.05 − 0.01 is 0.04 and not 0.039999…
  const churnNew = Math.max(MIN_CHURN, Math.round((churn - drop) * 1000) / 1000);
  const totalMembers = units * members;
  const lostMonth = Math.round(totalMembers * churn);
  const lostMonthNew = Math.round(totalMembers * churnNew);
  const keptMonth = lostMonth - lostMonthNew;
  const extraRevenueMonth = keptMonth * bill;
  const extraRevenueYear = extraRevenueMonth * 12;
  return {
    leavesYear: 12 * units * costPerUnit,
    techFeeYear,
    paymentFeeYear,
    incomeYear: techFeeYear + paymentFeeYear,
    churnNew,
    stayYear: Math.pow(1 - churn, 12),
    stayYearNew: Math.pow(1 - churnNew, 12),
    totalMembers,
    lostMonth,
    lostMonthNew,
    keptMonth,
    extraRevenueMonth,
    extraRevenueYear,
    retentionGainYear: extraRevenueYear * feeRate,
  };
}

/** HQ's total a year: income, plus the retention gain once step 3 is in. */
export function networkTotal(p: NetworkProjection, withRetention: boolean): number {
  return p.incomeYear + (withRetention ? p.retentionGainYear : 0);
}
