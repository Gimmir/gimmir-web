"use client";

import { useEffect, useRef, useState } from "react";

import { useFranchise } from "@/components/franchise/franchise-context";
import { OFFER } from "@/content/offer";
import { cn } from "@/lib/cn";
import { formatMoney, formatMonths, formatPercent } from "@/lib/franchise-calc";

import { PillLink, platformName, pounds } from "./shared";

/**
 * The running result beside the steps (below them on a phone): what leaves
 * the network, what comes to HQ instead once step 2 is in, what less churn
 * adds once step 3 is in, and the total with its payback. Sticky from 1024px
 * only while it fits the screen, so a tall result never hides its own tail.
 */

const card = "rounded-3xl bg-surface p-[22px] shadow-[inset_0_0_0_1px_var(--color-line)]";
// the artboard's "appear": new blocks settle in, once, when they first render
const appear =
  "transition-[opacity,translate] duration-500 ease-[var(--ease-out)] starting:translate-y-2.5 starting:opacity-0 motion-reduce:transition-none";
const lbl = "m-0 text-[13px] font-semibold tracking-[0.06em] uppercase text-muted";
const row = "flex justify-between gap-3 text-[15px] leading-[1.4]";
const dashed =
  "rounded-[20px] border-[1.5px] border-dashed border-line-strong px-5 py-[18px] text-[15px] leading-[1.5] text-muted";

function useFitsScreen() {
  const ref = useRef<HTMLDivElement>(null);
  const [fits, setFits] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => setFits(el.offsetHeight <= window.innerHeight - 120);
    const frame = requestAnimationFrame(measure);
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  return { ref, fits };
}

export function NumbersResult() {
  const { brand, model } = useFranchise();
  const { answers, values, projection, done, total, payback } = model;
  const { ref, fits } = useFitsScreen();

  const fee = formatPercent(values.feeRate);
  const churn = formatPercent(values.churn);
  const churnNew = formatPercent(projection.churnNew);

  return (
    <div
      ref={ref}
      aria-live="polite"
      className={cn("flex flex-col gap-3", fits && "lg:sticky lg:top-24")}
    >
      <div className="rounded-3xl bg-paper p-6 shadow-[inset_0_0_0_1px_var(--color-line)]">
        <p className="m-0 text-sm leading-[1.5] text-muted">
          Leaves your network for {platformName(answers.platform)} every year
        </p>
        <p className="display m-0 mt-2.5 text-[clamp(40px,4.6vw,58px)] leading-none tracking-[-0.035em] [font-stretch:100%]">
          {formatMoney(projection.leavesYear)}
        </p>
        <p className="m-0 mt-2 text-sm leading-[1.5] text-muted">
          {values.units} studios × {pounds(values.costPerUnit)} a month × 12
        </p>
      </div>

      {done[2] ? (
        <div className={cn(card, appear, "flex flex-col gap-3")}>
          <h3 className={lbl}>Comes to {brand.hq} instead</h3>
          <p className={cn(row, "m-0")}>
            <span className="text-muted">Tech fees from {values.units} studios</span>
            <strong>+{formatMoney(projection.techFeeYear)}</strong>
          </p>
          <p className={cn(row, "m-0")}>
            <span className="text-muted">A {fee} fee on every payment</span>
            <strong>+{formatMoney(projection.paymentFeeYear)}</strong>
          </p>
        </div>
      ) : (
        <p className={cn(dashed, "m-0")}>
          Step 2 shows how much of it comes to HQ instead.
        </p>
      )}

      {done[3] ? (
        <div className={cn(card, appear, "flex flex-col gap-3")}>
          <h3 className={lbl}>Less churn</h3>
          <p className={cn(row, "m-0")}>
            <span className="text-muted">
              {projection.membersKeptYear.toLocaleString("en-GB")} fewer members
              leave a year, churn {churn} to {churnNew}
            </span>
          </p>
          <p className={cn(row, "m-0")}>
            <span className="text-muted">More revenue for your studios</span>
            <strong>+{formatMoney(projection.extraRevenueYear)}</strong>
          </p>
          <p className={cn(row, "m-0")}>
            <span className="text-muted">Your {fee} fee on their payments</span>
            <strong>+{formatMoney(projection.retentionGainYear)}</strong>
          </p>
        </div>
      ) : (
        <p className={cn(dashed, "m-0")}>Step 3 adds what less churn is worth.</p>
      )}

      {done[2] ? (
        <div className={cn("rounded-3xl bg-lime p-[26px]", appear)}>
          <p className="m-0 text-[15px] font-semibold">
            Projected new income for {brand.hq}, a year
          </p>
          <p className="display m-0 mt-2.5 text-[clamp(48px,5.6vw,72px)] leading-none tracking-[-0.035em] [font-stretch:100%]">
            {formatMoney(total)}
          </p>
          <p className="m-0 mt-3 text-[15px] leading-[1.5] text-[#2b3600]">
            {payback
              ? `The ${formatMoney(OFFER.setupFee)} set-up comes back in about ${formatMonths(payback)} ${formatMonths(payback) === "1" ? "month" : "months"}.`
              : "Set a tech fee or a fee on payments to see the payback."}
          </p>
          <PillLink href="#book" className="mt-[18px]">
            Check it with us
          </PillLink>
        </div>
      ) : null}

      <p className="m-0 mt-0.5 text-sm leading-[1.5] text-muted">
        A projection, not a promise. Before your monthly support plan.
      </p>
    </div>
  );
}
