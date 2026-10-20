"use client";

import { useState } from "react";

import { calculator } from "@/content/calculator";
import { HQ_FEATURES } from "@/content/hq-features";
import { CALC_LIMITS } from "@/content/offer";
import { cn } from "@/lib/cn";
import { formatMoney, formatMonths, formatPercent } from "@/lib/franchise-calc";

import { Chips, Disclosure, NumberBox, Range, Step, Switch } from "./fields";
import type { Calculators } from "./use-calculators";

const copy = calculator.retention;

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      className={cn(
        "size-4 transition-transform duration-200 ease-[var(--ease-out)]",
        open && "rotate-180",
      )}
    >
      <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.75" />
    </svg>
  );
}

/**
 * Calculator 2, closed by default under calculator 1. The closed bar is
 * never empty: a title, one live number and a prompt. Units carry over
 * from calculator 1.
 */
export function RetentionCalculator({ c }: { c: Calculators }) {
  const [open, setOpen] = useState(false);
  const { state, set, unit, retention, totalYear, totalPayback, retentionYear } = c;
  const s = copy.steps;
  const r = copy.results;
  const target = Math.min(state.retention + state.uplift, 1);

  return (
    <Disclosure
      id="calc-retention"
      open={open}
      onToggle={() => setOpen((o) => !o)}
      className="mt-6 rounded-[28px] bg-surface ring-1 ring-line"
      bar={
        <span className="flex flex-wrap items-center gap-x-6 gap-y-2 p-6 sm:p-8">
          <span className="text-xl font-bold tracking-[-0.01em]">
            {copy.bar.title}
          </span>
          {retentionYear !== null ? (
            <span className="text-[15px] text-muted tabular-nums">
              {copy.bar.live(formatMoney(retentionYear))}
            </span>
          ) : null}
          <span className="ml-auto inline-flex h-11 items-center gap-2 rounded-full border border-line px-4 text-[15px] font-semibold transition-[border-color,transform] duration-150 group-hover:border-ink group-active:scale-[0.97]">
            {open ? copy.bar.close : copy.bar.open}
            <Chevron open={open} />
          </span>
        </span>
      }
    >
      <div className="grid gap-8 border-t border-line p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:gap-12">
        <div>
          <Step n={1} id="calc-members" label={s.members(unit)} hint={s.membersHint}>
            <NumberBox
              id="calc-members"
              value={state.members}
              unit={null}
              onChange={(v) => set("members", v)}
              describedBy="calc-members-hint"
            />
          </Step>

          <Step n={2} id="calc-kept" label={s.retention}>
            <div className="flex items-center gap-4">
              <Range
                id="calc-kept"
                value={Math.round(state.retention * 100)}
                min={CALC_LIMITS.retention.min * 100}
                max={CALC_LIMITS.retention.max * 100}
                step={1}
                onChange={(v) => set("retention", v / 100)}
                valueText={formatPercent(state.retention)}
              />
              <span className="w-14 shrink-0 text-right text-lg font-semibold tabular-nums">
                {formatPercent(state.retention)}
              </span>
            </div>
          </Step>

          <Step n={3} id="calc-bill" label={s.bill}>
            <NumberBox id="calc-bill" value={state.bill} onChange={(v) => set("bill", v)} />
          </Step>

          <Step n={4} id="calc-fee-on" label={s.fee}>
            <div className="flex flex-wrap items-center gap-4">
              <Switch
                id="calc-fee-on"
                on={state.feeOn}
                onChange={(v) => set("feeOn", v)}
                label={s.feeOn}
              />
              {state.feeOn ? (
                <NumberBox
                  id="calc-fee-rate"
                  value={state.feeRate}
                  unit="%"
                  decimals
                  onChange={(v) => set("feeRate", v)}
                  className="w-[120px]"
                />
              ) : null}
            </div>
          </Step>

          <Step n={5} id="calc-royalty" label={s.royalty} hint={s.royaltyHint}>
            <NumberBox
              id="calc-royalty"
              value={state.royalty}
              unit="%"
              decimals
              onChange={(v) => set("royalty", v)}
              className="w-[120px]"
              describedBy="calc-royalty-hint"
            />
          </Step>

          <Step n={6} id="calc-uplift" label={s.uplift} as="legend">
            <Chips
              name={s.uplift}
              options={CALC_LIMITS.uplifts.map((u) => ({
                value: u,
                label: `+${formatPercent(u)}`,
              }))}
              value={state.uplift}
              onChange={(v) => set("uplift", v)}
            />
            <p className="mt-3 text-[15px] text-muted tabular-nums">
              {formatPercent(state.retention)} → {formatPercent(target)}
            </p>
          </Step>
        </div>

        <div aria-live="polite" className="lg:sticky lg:top-28 lg:self-start">
          {retention === null ? null : (
            <div className="rounded-[24px] bg-paper p-6 ring-1 ring-line">
              <p>
                <span className="display block text-[clamp(2.5rem,1.75rem+3vw,3.5rem)] leading-[0.95] tabular-nums">
                  {formatMoney(retention.hqGainYear)}
                </span>
                <span className="mt-2 block font-semibold leading-snug">{r.gain}</span>
              </p>
              <p className="mt-5 leading-snug">
                {r.kept(
                  String(Math.round(retention.membersKept)),
                  formatMoney(retention.extraRevenueYear),
                )}
              </p>
              {totalYear !== null ? (
                <p className="mt-5 border-t border-line pt-5 text-lg font-semibold leading-snug">
                  {r.total(formatMoney(totalYear))}
                  {totalPayback !== null
                    ? r.payback(formatMonths(totalPayback))
                    : r.noPayback}
                </p>
              ) : null}
              <p className="mt-4 text-sm leading-relaxed text-muted">{r.small}</p>
            </div>
          )}
        </div>
      </div>
    </Disclosure>
  );
}

/** The retention engine: the reason behind the uplift buttons. */
export function RetentionEngine() {
  const [open, setOpen] = useState(false);
  const { title, lead, items } = HQ_FEATURES.retention;

  return (
    <Disclosure
      id="calc-engine"
      open={open}
      onToggle={() => setOpen((o) => !o)}
      className="mt-3 rounded-[28px] ring-1 ring-line"
      bar={
        <span className="flex flex-wrap items-center gap-x-6 gap-y-2 p-6 sm:px-8">
          <span className="text-lg font-bold tracking-[-0.01em]">{title}</span>
          <span className="ml-auto inline-flex h-11 items-center gap-2 rounded-full px-2 text-[15px] font-semibold text-muted transition-colors duration-150 group-hover:text-ink">
            {open ? calculator.engine.close : calculator.engine.open}
            <Chevron open={open} />
          </span>
        </span>
      }
    >
      <div className="border-t border-line p-6 sm:p-8">
        <p className="max-w-[60ch] text-[15px] leading-relaxed text-muted">{lead}</p>
        <ul className="mt-6 grid gap-x-10 gap-y-5 sm:grid-cols-2">
          {items.map((item) => (
            <li key={item.title}>
              <p className="font-semibold">{item.title}</p>
              <p className="mt-1 text-[15px] leading-relaxed text-muted">{item.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </Disclosure>
  );
}
