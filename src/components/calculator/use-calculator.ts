"use client";

import { useMemo, useReducer } from "react";

import { UNIT_WORDS } from "@/content/calculator";
import { CALC_DEFAULTS } from "@/content/offer";
import { calcHqIncome, LIMITS, type CalcResult } from "@/lib/franchise-calc";

/** What the visitor typed. Text, so a half-typed field is never a NaN. */
export type CalcFields = {
  units: string;
  unitWord: (typeof UNIT_WORDS)[number]["plural"];
  /** Context only, no price is preset from it. */
  platform: string;
  platformFee: string;
  techFee: string;
  members: string;
  avgPayment: string;
  /** Fee on every payment, as a fraction. */
  feeRate: number;
};

export type CalcState = {
  fields: CalcFields;
  /** True from the first change (stage 2 and analytics hook in here). */
  touched: boolean;
};

const DEFAULT_FIELDS: CalcFields = {
  units: String(CALC_DEFAULTS.units),
  unitWord: "studios",
  platform: "",
  platformFee: String(CALC_DEFAULTS.platformFee),
  techFee: String(CALC_DEFAULTS.techFee),
  members: String(CALC_DEFAULTS.members),
  avgPayment: String(CALC_DEFAULTS.avgPayment),
  feeRate: CALC_DEFAULTS.feeRate,
};

type Action = {
  [K in keyof CalcFields]: { key: K; value: CalcFields[K] };
}[keyof CalcFields];

function reduce(state: CalcState, { key, value }: Action): CalcState {
  return { fields: { ...state.fields, [key]: value }, touched: true };
}

/** A typed amount as a number, or null while it is empty or not a number. */
function parse(text: string): number | null {
  if (text.trim() === "") return null;
  const n = Number(text);
  return Number.isFinite(n) && n >= 0 ? n : null;
}

export function useCalculator() {
  const [state, dispatch] = useReducer(reduce, {
    fields: DEFAULT_FIELDS,
    touched: false,
  });
  const { fields } = state;

  const typedUnits = parse(fields.units);
  const outOfRange =
    typedUnits !== null &&
    (typedUnits < LIMITS.units.min || typedUnits > LIMITS.units.max);
  const units =
    typedUnits === null
      ? null
      : Math.min(
          LIMITS.units.max,
          Math.max(LIMITS.units.min, Math.round(typedUnits)),
        );

  const techFee = parse(fields.techFee);
  const members = parse(fields.members);
  const avgPayment = parse(fields.avgPayment);
  const platformFee = parse(fields.platformFee);

  const result = useMemo<CalcResult | null>(() => {
    if (units === null || techFee === null || members === null || avgPayment === null) {
      return null;
    }
    return calcHqIncome({
      units,
      techFee,
      members,
      avgPayment,
      feeRate: fields.feeRate,
      platformFee: platformFee ?? undefined,
    });
  }, [units, techFee, members, avgPayment, platformFee, fields.feeRate]);

  const changedCount = (Object.keys(DEFAULT_FIELDS) as (keyof CalcFields)[]).filter(
    (k) => fields[k] !== DEFAULT_FIELDS[k],
  ).length;

  return {
    state,
    set: <K extends keyof CalcFields>(key: K, value: CalcFields[K]) =>
      dispatch({ key, value } as Action),
    /** Fields that now differ from their defaults. */
    changedCount,
    touched: state.touched,
    /** The units the sum used (clamped); `outOfRange` when the typed value was not. */
    units: { used: units, outOfRange },
    /** Null while a required field is empty. */
    result,
    /** Singular of the chosen unit word. */
    unit: UNIT_WORDS.find((w) => w.plural === fields.unitWord)?.singular ?? "studio",
  };
}
