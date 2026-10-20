"use client";

import { calculator, UNIT_WORDS } from "@/content/calculator";
import { CALC_LIMITS, SYSTEMS } from "@/content/offer";
import { cn } from "@/lib/cn";
import { formatMoney, formatMonths } from "@/lib/franchise-calc";

import { Chips, NumberBox, Range, Step } from "./fields";
import type { Calculators } from "./use-calculators";

const copy = calculator.cost;

/** Calculator 1, the six questions. */
export function CostInputs({ c }: { c: Calculators }) {
  const { state, set, unit, systemName, units, aboveStripe } = c;
  const s = copy.steps;

  return (
    <div>
      <Step n={1} id="calc-system" label={s.system} as="legend">
        <Chips
          name={s.system}
          options={SYSTEMS.map((x) => ({ value: x.id, label: x.name }))}
          value={state.system}
          onChange={(v) => set("system", v)}
        />
      </Step>

      <Step n={2} id="calc-units" label={s.units(unit)}>
        <div className="flex items-center gap-4">
          <Range
            id="calc-units"
            value={units}
            min={CALC_LIMITS.units.min}
            max={CALC_LIMITS.units.max}
            step={1}
            onChange={(v) => set("units", v)}
            valueText={`${units} ${units === 1 ? unit.one : unit.many}`}
          />
          <NumberBox
            id="calc-units-box"
            value={String(units)}
            unit={null}
            onChange={(v) => set("units", v === "" ? 1 : Number(v))}
            className="w-[88px] shrink-0"
            describedBy="calc-units-hint"
          />
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <span className="text-sm text-muted">{s.unitWord}</span>
          <Chips
            name={s.unitWord}
            size="sm"
            options={UNIT_WORDS.map((u) => ({ value: u.id, label: u.many }))}
            value={state.unitWord}
            onChange={(v) => set("unitWord", v)}
          />
        </div>
      </Step>

      <Step
        n={3}
        id="calc-cost"
        label={s.cost(unit, systemName)}
        hint={state.system === "glofox" ? s.costHint : null}
      >
        <NumberBox
          id="calc-cost"
          value={state.costPerUnit}
          placeholder={s.costEmpty}
          onChange={(v) => set("costPerUnit", v)}
          describedBy={state.system === "glofox" ? "calc-cost-hint" : undefined}
        />
      </Step>

      <Step n={4} id="calc-fee" label={s.fee}>
        {state.paymentFee === null ? (
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <p className="text-base tabular-nums">{s.feeStripe}</p>
            <button
              type="button"
              onClick={() => set("paymentFee", "2.5")}
              className="inline-flex min-h-11 items-center text-[15px] font-semibold underline decoration-ink/30 underline-offset-4 transition-[text-decoration-color] duration-150 hover:decoration-ink"
            >
              {s.feeMore}
            </button>
          </div>
        ) : (
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <NumberBox
              id="calc-fee"
              value={state.paymentFee}
              unit="%"
              decimals
              onChange={(v) => set("paymentFee", v)}
              className="w-[140px]"
            />
            <button
              type="button"
              onClick={() => set("paymentFee", null)}
              className="inline-flex min-h-11 items-center text-[15px] font-semibold underline decoration-ink/30 underline-offset-4 transition-[text-decoration-color] duration-150 hover:decoration-ink"
            >
              {s.feeBack}
            </button>
          </div>
        )}
      </Step>

      {aboveStripe ? (
        <Step n={5} id="calc-volume" label={s.volume(unit)} hint={s.volumeHint}>
          <NumberBox
            id="calc-volume"
            value={state.cardVolume}
            onChange={(v) => set("cardVolume", v)}
            describedBy="calc-volume-hint"
          />
        </Step>
      ) : null}

      <Step
        n={aboveStripe ? 6 : 5}
        id="calc-other"
        label={s.other}
        hint={s.otherHint}
      >
        <NumberBox
          id="calc-other"
          value={state.otherTech}
          onChange={(v) => set("otherTech", v)}
          describedBy="calc-other-hint"
        />
      </Step>
    </div>
  );
}

/** A "label ........ £1,234" receipt row. */
function Row({
  label,
  value,
  strong = false,
}: {
  label: React.ReactNode;
  value: string;
  strong?: boolean;
}) {
  return (
    <div className="flex items-baseline gap-3 py-2.5">
      <dt className={cn("shrink-0", strong ? "font-semibold" : "text-paper/75")}>
        {label}
      </dt>
      <span aria-hidden className="mb-1 h-px flex-1 border-b border-dotted border-paper/25" />
      <dd className={cn("shrink-0 tabular-nums", strong && "font-semibold")}>
        {value}
      </dd>
    </div>
  );
}

/** Calculator 1's results, as a receipt on ink. */
export function CostReceipt({ c, writingHref }: { c: Calculators; writingHref: string }) {
  const { cost, split, unit, systemName } = c;
  const r = copy.receipt;

  return (
    <div
      aria-live="polite"
      className="rounded-[28px] bg-ink p-6 text-paper shadow-[0_40px_80px_-48px_rgba(21,20,14,0.6)] sm:p-8"
    >
      <p className="font-mono text-[13px] uppercase tracking-[0.08em] text-paper/60">
        {r.label}
      </p>

      {cost === null ? (
        <p className="mt-6 text-lg leading-snug text-paper/85">
          {r.empty(unit, systemName)}
        </p>
      ) : (
        <>
          <p className="mt-4">
            <span className="display block text-[clamp(3rem,2rem+4vw,4.75rem)] leading-[0.95] tabular-nums">
              {formatMoney(cost.costTodayYear)}
            </span>
            <span className="mt-3 block text-lg font-semibold leading-snug">
              {r.leaves(systemName)}
            </span>
          </p>

          <p className="mt-5 text-[15px] leading-relaxed text-paper/75">
            {r.system(formatMoney(cost.systemYear))}
          </p>

          <dl className="mt-5 border-t border-paper/15 pt-2 text-[15px]">
            <Row label={`Today, ${systemName}`} value={formatMoney(cost.costTodayYear)} />
            <Row label="Your own system" value={formatMoney(-cost.systemYear)} />
            <Row label="Stays with you" value={formatMoney(cost.keptYear)} strong />
          </dl>

          <p className="mt-5 text-lg font-semibold leading-snug">
            {r.stays(formatMoney(cost.keptYear))}
            {split?.paybackMonths != null
              ? r.payback(formatMonths(split.paybackMonths))
              : r.noPayback}
          </p>

          <p className="mt-4 text-[15px] leading-relaxed text-paper/75">
            {r.line(systemName)}
          </p>
        </>
      )}

      <a
        href={writingHref}
        className="mt-7 inline-flex h-[52px] items-center justify-center rounded-full border border-paper/25 px-6 text-base font-semibold transition-[background-color,border-color,color,transform] duration-200 ease-[var(--ease-out)] hover:border-paper hover:bg-paper hover:text-ink active:scale-[0.97]"
      >
        {copy.writing}
      </a>
    </div>
  );
}

/**
 * Step 7: the tech fee HQ sets. One bar is what each franchisee pays a
 * month; the slider splits it live between HQ and the franchisee, and past
 * today's cost it grows into what HQ earns on top.
 */
export function TechFeeSplit({ c }: { c: Calculators }) {
  const { state, set, split, techFee, costPerUnit, units } = c;
  const t = copy.split;
  if (split === null || costPerUnit === null) return null;

  const { max } = CALC_LIMITS.techFee;
  const more = techFee > costPerUnit;
  const same = techFee === costPerUnit;
  // the bar is what each franchisee pays a month: today's cost, or the
  // tech fee when HQ asks for more
  const whole = Math.max(costPerUnit, techFee, 1);
  const hqPart = (Math.min(techFee, costPerUnit) / whole) * 100;
  const keepPart = (Math.max(costPerUnit - techFee, 0) / whole) * 100;
  const extraPart = (Math.max(techFee - costPerUnit, 0) / whole) * 100;

  return (
    <div className="mt-6 rounded-[28px] bg-surface p-6 ring-1 ring-line sm:p-8">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <label htmlFor="calc-techfee" className="text-lg font-semibold leading-snug">
          {t.title}
        </label>
        <p className="display text-[2rem] leading-none tabular-nums">
          {formatMoney(techFee)}
        </p>
      </div>

      {/* each franchisee's month, split between HQ and the franchisee */}
      <div aria-hidden className="mt-6">
        <div className="flex h-10 gap-1 overflow-hidden rounded-[12px]">
          {hqPart > 0 ? (
            <span
              className="flex items-center rounded-[10px] bg-ink px-3 text-sm font-semibold whitespace-nowrap text-paper"
              style={{ flexBasis: `${hqPart}%` }}
            >
              {hqPart >= 18 ? `HQ ${formatMoney(Math.min(techFee, costPerUnit))}` : null}
            </span>
          ) : null}
          {extraPart > 0 ? (
            <span
              className="flex items-center rounded-[10px] bg-ink-soft px-3 text-sm font-semibold whitespace-nowrap text-paper/80 [background-image:repeating-linear-gradient(135deg,transparent_0_6px,rgba(246,244,238,0.12)_6px_12px)]"
              style={{ flexBasis: `${extraPart}%` }}
            >
              {extraPart >= 18 ? `+${formatMoney(techFee - costPerUnit)}` : null}
            </span>
          ) : null}
          {keepPart > 0 ? (
            <span
              className="flex items-center justify-end rounded-[10px] bg-paper-2 px-3 text-sm font-semibold whitespace-nowrap text-muted ring-1 ring-line ring-inset"
              style={{ flexBasis: `${keepPart}%` }}
            >
              {keepPart >= 18 ? `${formatMoney(costPerUnit - techFee)} kept` : null}
            </span>
          ) : null}
        </div>
      </div>

      <div className="mt-3">
        <Range
          id="calc-techfee"
          value={techFee}
          min={CALC_LIMITS.techFee.min}
          max={max}
          step={CALC_LIMITS.techFee.step}
          onChange={(v) => set("techFee", v)}
          valueText={`${formatMoney(techFee)} a month`}
        />
      </div>

      <dl className="mt-6 grid gap-4 sm:grid-cols-3">
        <div>
          <dt className="text-sm text-muted">{t.hq}</dt>
          <dd className="mt-1 text-xl font-semibold tabular-nums">
            {formatMoney(split.hqIncomeYear)}{" "}
            <span className="text-sm font-normal text-muted">{t.perYear}</span>
          </dd>
        </div>
        <div>
          <dt className="text-sm text-muted">{more ? t.franchiseesMore : t.franchisees}</dt>
          <dd className="mt-1 text-xl font-semibold tabular-nums">
            {formatMoney(Math.abs(split.franchiseesSaveYear))}{" "}
            <span className="text-sm font-normal text-muted">{t.perYear}</span>
          </dd>
        </div>
        <div>
          <dt className="text-sm text-muted">{t.paybackLabel}</dt>
          <dd className="mt-1 text-xl font-semibold tabular-nums">
            {split.paybackMonths === null
              ? t.noPayback
              : t.months(formatMonths(split.paybackMonths))}
          </dd>
        </div>
      </dl>

      <p className="mt-5 text-[15px] leading-relaxed text-muted">
        {same && state.techFee === null
          ? `${t.same}: ${units} × ${formatMoney(costPerUnit)}.`
          : more
            ? t.moreLine(formatMoney(-split.franchiseesSaveYear))
            : null}
      </p>
    </div>
  );
}
