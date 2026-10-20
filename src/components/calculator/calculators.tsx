"use client";

import { calculator } from "@/content/calculator";
import { formatMoney, formatPercent } from "@/lib/franchise-calc";

import { CostInputs, CostReceipt, TechFeeSplit } from "./cost-calculator";
import { RetentionCalculator, RetentionEngine } from "./retention-calculator";
import { useCalculators, type Calculators } from "./use-calculators";

/**
 * "Get these numbers in writing" until the stage-2 form exists: an email to
 * hello@ with the figures they typed (no name or address in the link).
 */
function writingHref(c: Calculators): string {
  const lines = [
    `System: ${c.systemName}`,
    `${c.unit.many}: ${c.units}`,
    `Each pays a month: ${c.costPerUnit === null ? "?" : formatMoney(c.costPerUnit)}`,
    `Payment fee: ${formatPercent(c.paymentFeeRate)}`,
    `Tech fee to HQ a month: ${formatMoney(c.techFee)}`,
    c.cost ? `Leaves the network a year: ${formatMoney(c.cost.costTodayYear)}` : "",
    "",
    "Brand:",
    "Name:",
  ].filter((l, i, all) => l !== "" || all[i - 1] !== "");
  const { to, subject } = calculator.mail;
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
}

/** Both calculators, sharing one state. */
export function Calculators() {
  const c = useCalculators();

  return (
    <>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,460px)] lg:gap-16">
        <CostInputs c={c} />
        <div className="lg:sticky lg:top-28 lg:self-start">
          <CostReceipt c={c} writingHref={writingHref(c)} />
        </div>
      </div>
      <TechFeeSplit c={c} />
      <RetentionCalculator c={c} />
      <RetentionEngine />
    </>
  );
}
