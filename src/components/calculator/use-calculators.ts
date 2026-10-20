"use client";

import { useMemo, useRef, useState } from "react";

import { UNIT_WORDS, type UnitWord } from "@/content/calculator";
import {
  CALC_DEFAULTS,
  CALC_LIMITS,
  FOUNDING,
  SYSTEMS,
  type SystemId,
} from "@/content/offer";
import { trackEvent } from "@/lib/analytics";
import {
  calcCostToday,
  calcRetention,
  calcTechFee,
  growPlan,
  paybackMonths,
  STRIPE_RATE,
  unitsBucket,
} from "@/lib/franchise-calc";

/** Fields are kept as typed text so a half-typed number never shows NaN. */
type Text = string;

export type CalculatorState = {
  system: SystemId;
  unitWord: UnitWord["id"];
  units: number;
  costPerUnit: Text;
  /** Null while they're on Stripe's rate. */
  paymentFee: Text | null;
  cardVolume: Text;
  otherTech: Text;
  /** Null until they move the slider: then it follows their cost per unit. */
  techFee: number | null;
  members: Text;
  retention: number;
  bill: Text;
  feeOn: boolean;
  feeRate: Text;
  royalty: Text;
  uplift: number;
};

const percent = (fraction: number) => String(Math.round(fraction * 1000) / 10);

const INITIAL: CalculatorState = {
  system: CALC_DEFAULTS.system,
  unitWord: "studios",
  units: CALC_DEFAULTS.units,
  costPerUnit: String(
    SYSTEMS.find((s) => s.id === CALC_DEFAULTS.system)?.costPerUnit ?? "",
  ),
  paymentFee: null,
  cardVolume: String(CALC_DEFAULTS.cardVolumePerUnit),
  otherTech: String(CALC_DEFAULTS.otherTech),
  techFee: null,
  members: String(CALC_DEFAULTS.members),
  retention: CALC_DEFAULTS.retention,
  bill: String(CALC_DEFAULTS.bill),
  feeOn: CALC_DEFAULTS.feeOn,
  feeRate: percent(CALC_DEFAULTS.feeRate),
  royalty: percent(CALC_DEFAULTS.royalty),
  uplift: CALC_DEFAULTS.uplift,
};

/** A typed number, or null when the box is empty or not a number yet. */
function num(text: Text): number | null {
  if (text.trim() === "") return null;
  const n = Number(text);
  return Number.isFinite(n) ? n : null;
}

const clamp = (n: number, min: number, max: number) =>
  Math.min(Math.max(n, min), max);

/** Founding terms run through their closing day. */
const foundingOpen = () =>
  Date.now() <= new Date(`${FOUNDING.termsClose}T23:59:59Z`).getTime();

/**
 * Both calculators' state and sums. Units carry from calculator 1 to 2,
 * and calculator 2's total adds the HQ income from the tech fee slider.
 * GA4 gets `calc_start` on the first change and `calc_result` once 3
 * fields have changed, with a units bucket only (never the figures).
 */
export function useCalculators() {
  const [state, setState] = useState<CalculatorState>(INITIAL);
  const changed = useRef(new Set<keyof CalculatorState>());
  const sentResult = useRef(false);

  const set = <K extends keyof CalculatorState>(
    key: K,
    value: CalculatorState[K],
  ) => {
    setState((s) => {
      const next = { ...s, [key]: value };
      // a new system brings its own price, or an empty box to fill
      if (key === "system") {
        const system = SYSTEMS.find((x) => x.id === value);
        next.costPerUnit =
          system?.costPerUnit != null ? String(system.costPerUnit) : "";
      }
      return next;
    });

    const first = changed.current.size === 0;
    changed.current.add(key);
    if (first) trackEvent("calc_start", { page: window.location.pathname });
    if (!sentResult.current && changed.current.size >= 3) {
      sentResult.current = true;
      const units = key === "units" ? (value as number) : state.units;
      trackEvent("calc_result", {
        units: unitsBucket(units),
        unit_word: state.unitWord,
      });
    }
  };

  const derived = useMemo(() => {
    const unit = UNIT_WORDS.find((u) => u.id === state.unitWord) ?? UNIT_WORDS[0];
    const system = SYSTEMS.find((s) => s.id === state.system) ?? SYSTEMS[0];
    const systemName = system.id === "other" ? "your platform" : system.name;
    const plan = growPlan(foundingOpen());

    const units = clamp(state.units, CALC_LIMITS.units.min, CALC_LIMITS.units.max);
    const costPerUnit = num(state.costPerUnit);
    const paymentFeeRate =
      state.paymentFee === null ? STRIPE_RATE : (num(state.paymentFee) ?? 0) / 100;

    const cost =
      costPerUnit === null
        ? null
        : calcCostToday({
            units,
            costPerUnit,
            paymentFeeRate,
            cardVolumePerUnit: num(state.cardVolume) ?? 0,
            otherTech: num(state.otherTech) ?? 0,
            plan,
          });

    // until they move it, the tech fee is what they pay today: no change
    // for franchisees
    const techFee = clamp(
      state.techFee ?? costPerUnit ?? 0,
      CALC_LIMITS.techFee.min,
      CALC_LIMITS.techFee.max,
    );
    const split =
      cost === null || costPerUnit === null
        ? null
        : calcTechFee({ units, techFee, costPerUnit, systemYear: cost.systemYear });

    const members = num(state.members);
    const bill = num(state.bill);
    const retention =
      members === null || bill === null
        ? null
        : calcRetention({
            units,
            members,
            bill,
            feeOn: state.feeOn,
            feeRate: (num(state.feeRate) ?? 0) / 100,
            royalty: (num(state.royalty) ?? 0) / 100,
            retention: state.retention,
            uplift: state.uplift,
          });

    const retentionYear = retention
      ? retention.feeIncomeYear + retention.hqGainYear
      : null;
    const totalYear =
      retentionYear === null ? null : retentionYear + (split?.hqIncomeYear ?? 0);

    return {
      unit,
      systemName,
      units,
      costPerUnit,
      paymentFeeRate,
      aboveStripe: paymentFeeRate > STRIPE_RATE,
      cost,
      techFee,
      split,
      retention,
      retentionYear,
      totalYear,
      totalPayback: totalYear === null ? null : paybackMonths(totalYear),
    };
  }, [state]);

  return { state, set, ...derived };
}

export type Calculators = ReturnType<typeof useCalculators>;
