"use client";

import { useId } from "react";

import { BookTrigger } from "@/components/blocks/book-trigger";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "@/components/ui/icons";
import { calculator, PLATFORMS, UNIT_WORDS } from "@/content/calculator";
import { OFFER } from "@/content/offer";
import { BOOKINGS } from "@/lib/booking";
import {
  formatMoney,
  formatMonths,
  LIMITS,
  type CalcResult,
} from "@/lib/franchise-calc";

import { useCalculator } from "./use-calculator";

const { fields: copy, result: out } = calculator;

const control =
  "h-[52px] w-full rounded-[14px] border border-line bg-surface px-4 text-base text-ink outline-none transition-colors duration-150 focus:border-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";

function Field({
  id,
  label,
  hint,
  note,
  children,
}: {
  id: string;
  label: string;
  hint?: string | null;
  note?: string | null;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-base font-semibold">
        {label}
      </label>
      <div className="mt-2">{children}</div>
      {hint ? (
        <p id={`${id}-hint`} className="mt-2 text-sm text-muted">
          {hint}
        </p>
      ) : null}
      {note ? (
        <p id={`${id}-note`} role="status" className="mt-2 text-sm font-semibold">
          {note}
        </p>
      ) : null}
    </div>
  );
}

/** A number box: digits only, with an optional £ in front. */
function NumberInput({
  id,
  value,
  onChange,
  money = false,
  decimals = false,
  describedBy,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  money?: boolean;
  decimals?: boolean;
  describedBy?: string;
}) {
  return (
    <div className="relative">
      {money ? (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-base text-muted"
        >
          £
        </span>
      ) : null}
      <input
        id={id}
        type="text"
        inputMode={decimals ? "decimal" : "numeric"}
        autoComplete="off"
        value={value}
        aria-describedby={describedBy}
        onChange={(e) =>
          onChange(e.target.value.replace(decimals ? /[^\d.]/g : /\D/g, ""))
        }
        className={`${control} tabular-nums ${money ? "pl-8" : ""}`}
      />
    </div>
  );
}

function Line({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-t border-ink/15 py-3">
      <dt>{label}</dt>
      <dd className="font-semibold tabular-nums">{value}</dd>
    </div>
  );
}

function Result({ result, unit }: { result: CalcResult; unit: string }) {
  const { perUnit } = out;
  const delta = result.perUnitDelta === null ? null : Math.round(result.perUnitDelta);

  return (
    <div aria-live="polite">
      <p className="text-sm font-semibold uppercase tracking-[0.08em]">
        {out.heading}
      </p>
      <p className="display mt-3 text-[clamp(2.75rem,1.5rem+4vw,4rem)] leading-none tabular-nums">
        {formatMoney(result.monthly)}{" "}
        <span className="ml-1 text-lg font-semibold tracking-normal">
          {out.perMonth}
        </span>
      </p>
      <p className="mt-2 text-lg font-semibold tabular-nums">
        {formatMoney(result.yearly)} {out.perYear}
      </p>

      <dl className="mt-6 text-[15px]">
        <Line label={out.lines.techFee} value={`+${formatMoney(result.techFeeIncome)}`} />
        <Line
          label={out.lines.paymentFee}
          value={`+${formatMoney(result.paymentFeeIncome)}`}
        />
        <Line label={out.lines.plan} value={formatMoney(-result.plan)} />
      </dl>

      <p className="mt-4 font-semibold">
        {result.paybackMonths === null
          ? out.noPayback
          : out.payback(formatMonths(result.paybackMonths))}
      </p>
      <p className="mt-2 text-[15px]">{out.techFeeYear(formatMoney(result.techFeeYear))}</p>
      {delta === null ? null : (
        <p className="mt-2 text-[15px]">
          {delta > 0
            ? perUnit.less(unit, formatMoney(delta))
            : delta < 0
              ? perUnit.more(unit, formatMoney(-delta))
              : perUnit.same(unit)}
        </p>
      )}
    </div>
  );
}

/**
 * The HQ income calculator: five numbers on the left, the result live
 * beside them (below on a phone). Nothing leaves the browser.
 */
export function Calculator() {
  const uid = useId();
  const calc = useCalculator();
  const { fields } = calc.state;
  const id = (name: string) => `${uid}-${name}`;
  const pct = fields.feeRate * 100;
  const pctText = `${+pct.toFixed(2)}%`;
  const underThreshold = calc.units.used !== null && calc.units.used < OFFER.minUnits;
  const unitsNote = calc.units.outOfRange && calc.units.used !== null
    ? copy.units.range(LIMITS.units.min, LIMITS.units.max, calc.units.used)
    : underThreshold
      ? copy.units.note
      : null;

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-12">
      <form
        className="grid gap-7 lg:col-span-7"
        onSubmit={(e) => e.preventDefault()}
        noValidate
      >
        <Field id={id("units")} label={copy.units.label} note={unitsNote}>
          <NumberInput
            id={id("units")}
            value={fields.units}
            onChange={(v) => calc.set("units", v)}
            describedBy={unitsNote ? `${id("units")}-note` : undefined}
          />
        </Field>

        <Field id={id("word")} label={copy.unitWord.label}>
          <select
            id={id("word")}
            value={fields.unitWord}
            onChange={(e) =>
              calc.set("unitWord", e.target.value as typeof fields.unitWord)
            }
            className={control}
          >
            {UNIT_WORDS.map((w) => (
              <option key={w.plural} value={w.plural}>
                {w.plural}
              </option>
            ))}
          </select>
        </Field>

        <Field id={id("pays")} label={copy.platformFee.label} hint={copy.platformFee.hint}>
          <NumberInput
            id={id("pays")}
            money
            decimals
            value={fields.platformFee}
            onChange={(v) => calc.set("platformFee", v)}
            describedBy={`${id("pays")}-hint`}
          />
        </Field>

        <Field id={id("platform")} label={copy.platform.label}>
          <select
            id={id("platform")}
            value={fields.platform}
            onChange={(e) => calc.set("platform", e.target.value)}
            className={control}
          >
            <option value="">{copy.platform.none}</option>
            {PLATFORMS.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </Field>

        <Field id={id("tech")} label={copy.techFee.label} hint={copy.techFee.hint}>
          <NumberInput
            id={id("tech")}
            money
            decimals
            value={fields.techFee}
            onChange={(v) => calc.set("techFee", v)}
            describedBy={`${id("tech")}-hint`}
          />
        </Field>

        <Field id={id("members")} label={copy.members.label} hint={copy.members.hint}>
          <NumberInput
            id={id("members")}
            value={fields.members}
            onChange={(v) => calc.set("members", v)}
            describedBy={`${id("members")}-hint`}
          />
        </Field>

        <Field id={id("avg")} label={copy.avgPayment.label}>
          <NumberInput
            id={id("avg")}
            money
            decimals
            value={fields.avgPayment}
            onChange={(v) => calc.set("avgPayment", v)}
          />
        </Field>

        <div>
          <div className="flex items-baseline justify-between gap-4">
            <label htmlFor={id("fee")} className="text-base font-semibold">
              {copy.feeRate.label}
            </label>
            <output htmlFor={id("fee")} className="text-lg font-bold tabular-nums">
              {pctText}
            </output>
          </div>
          <input
            id={id("fee")}
            type="range"
            min={LIMITS.feeRate.min * 100}
            max={LIMITS.feeRate.max * 100}
            step={LIMITS.feeRate.step * 100}
            value={pct}
            aria-valuetext={pctText}
            onChange={(e) => calc.set("feeRate", Number(e.target.value) / 100)}
            className="mt-3 block h-8 w-full cursor-pointer accent-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          />
          <div
            aria-hidden
            className="flex justify-between text-sm text-muted tabular-nums"
          >
            <span>{+(LIMITS.feeRate.min * 100).toFixed(2)}%</span>
            <span>{+(LIMITS.feeRate.max * 100).toFixed(2)}%</span>
          </div>
        </div>
      </form>

      <aside className="lg:sticky lg:top-28 lg:col-span-5" aria-label={out.heading}>
        <div className="rounded-[24px] bg-lime p-6 text-ink md:p-8">
          {calc.result ? (
            <Result result={calc.result} unit={calc.unit} />
          ) : (
            <p aria-live="polite" className="text-lg font-semibold">
              {out.empty}
            </p>
          )}
          <p className="mt-5 border-t border-ink/15 pt-4 text-[15px] font-semibold">
            {out.condition}
          </p>
        </div>

        <div id="numbers-in-writing">
          {/* Stage 2: "Send me this in writing" gate form goes here */}
        </div>
        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center">
          <BookTrigger
            booking="franchiseCall"
            placement="numbers-calculator"
            className="group inline-flex h-[52px] items-center justify-center gap-2.5 rounded-full border border-ink px-7 font-semibold text-ink transition-[background-color,border-color,transform] duration-200 hover:border-lime hover:bg-lime active:scale-[.97]"
          >
            {BOOKINGS.franchiseCall.label}
            <ArrowRight className="size-[18px] transition-transform duration-200 group-hover:translate-x-0.5" />
          </BookTrigger>
          <Button href="/franchise" variant="outline" size="sm" arrow>
            {calculator.next.back}
          </Button>
        </div>
      </aside>
    </div>
  );
}
