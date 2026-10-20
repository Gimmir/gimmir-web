/**
 * HQ's new income from its own app: the sum Oleh sends in writing
 * (sales-kit/numbers-sheet.md), shared by the /franchise worked example,
 * the calculator and the server that re-checks a submitted result.
 *
 *   income a month = U·T + U·M·A·F − max(U·planPerUnit, planMinimum)
 */

import { FOUNDING_PLAN, OFFER } from "@/content/offer";

export type CalcInput = {
  /** Units in the network (studios, clubs, schools…). */
  units: number;
  /** £ tech fee each unit pays HQ a month. */
  techFee: number;
  /** Members (or families) per unit. */
  members: number;
  /** £ a member pays a month, on average. */
  avgPayment: number;
  /** Fee on every payment, as a fraction (0.01 = 1%). */
  feeRate: number;
  /** £ each unit pays its platform today, if known. */
  platformFee?: number;
};

export type CalcResult = {
  techFeeIncome: number;
  paymentFeeIncome: number;
  plan: number;
  monthly: number;
  yearly: number;
  /** Months for the set-up to come back; null when income is ≤ 0. */
  paybackMonths: number | null;
  /** A year of the tech fee, shown against the set-up. */
  techFeeYear: number;
  /**
   * What each unit pays today minus the tech fee: positive pays less, negative
   * pays more (HQ's choice). Null when the platform fee isn't given.
   */
  perUnitDelta: number | null;
};

export const LIMITS = {
  units: { min: 1, max: 500 },
  feeRate: { min: 0.005, max: 0.03, step: 0.0025 },
} as const;

export function calcHqIncome(input: CalcInput): CalcResult {
  const { units, techFee, members, avgPayment, feeRate, platformFee } = input;

  const techFeeIncome = units * techFee;
  const paymentFeeIncome = units * members * avgPayment * feeRate;
  const plan = Math.max(units * FOUNDING_PLAN.perUnit, FOUNDING_PLAN.minimum);
  const monthly = techFeeIncome + paymentFeeIncome - plan;

  return {
    techFeeIncome,
    paymentFeeIncome,
    plan,
    monthly,
    yearly: monthly * 12,
    paybackMonths: monthly > 0 ? OFFER.setupFee / monthly : null,
    techFeeYear: techFeeIncome * 12,
    perUnitDelta: platformFee === undefined ? null : platformFee - techFee,
  };
}

/** Money to the nearest £10, halves away from zero. */
export function roundMoney(value: number): number {
  return Math.sign(value) * Math.round(Math.abs(value) / 10) * 10;
}

/** Months to the nearest half. */
export function roundMonths(value: number): number {
  return Math.round(value * 2) / 2;
}

const GBP = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  maximumFractionDigits: 0,
});

/** "£1,720", rounded to the nearest £10; negatives as "−£400". */
export function formatMoney(value: number): string {
  const rounded = roundMoney(value);
  const text = GBP.format(Math.abs(rounded));
  return rounded < 0 ? `−${text}` : text;
}

/** "7", "11.5". */
export function formatMonths(value: number): string {
  const rounded = roundMonths(value);
  return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
}
