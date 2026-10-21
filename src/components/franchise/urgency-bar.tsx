"use client";

import { useSyncExternalStore } from "react";

import { FOUNDING } from "@/content/offer";
import { formatMoney } from "@/lib/franchise-calc";

import { useFranchise } from "./franchise-context";

const CLOSE = new Date(`${FOUNDING.termsClose}T23:59:59Z`);
const closeLabel = CLOSE.toLocaleDateString("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

const noop = () => () => {};
const daysNow = () => Math.max(0, Math.ceil((CLOSE.getTime() - Date.now()) / 86_400_000));

/**
 * Days until the founding terms close, counted on the visitor's clock;
 * null on the server, so the HTML never states a stale count.
 */
export function useDaysLeft(): number | null {
  return useSyncExternalStore(noop, daysNow, () => null);
}

export function daysLeftText(days: number): string {
  if (days > 1) return `${days} days left`;
  if (days === 1) return "Last day";
  return "Founding terms closed";
}

/**
 * The bar above the page: the real founding deadline (never a countdown
 * that resets), and once they've moved the model, their own yearly figure.
 * The number of days renders after hydration, so the HTML never states a
 * count that's already stale.
 */
export function UrgencyBar() {
  const days = useDaysLeft();
  const { brand, model } = useFranchise();
  const moved = model.done[1] || model.answers.platform !== null;

  return (
    // sits under the site's fixed header (81px at the top of the page)
    <div className="mt-[81px] bg-ink text-paper">
      <div className="mx-auto flex min-h-11 max-w-[1280px] flex-wrap items-center justify-center gap-x-4 gap-y-1 px-5 py-2 text-sm sm:justify-between">
        <p className="m-0 flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
          <span>
            Founding partners: {FOUNDING.slots} slots, terms close {closeLabel}
          </span>
          {days !== null ? (
            <span className="rounded-full bg-lime px-2.5 py-0.5 text-xs font-bold text-ink tabular-nums">
              {daysLeftText(days)}
            </span>
          ) : null}
          <a href="#offer" className="font-semibold text-paper underline decoration-paper/40 underline-offset-4 hover:decoration-paper">
            See the offer
          </a>
        </p>
        {moved ? (
          <a
            href="#numbers"
            className="hidden font-semibold text-paper tabular-nums no-underline sm:inline"
          >
            {brand.hq.charAt(0).toUpperCase() + brand.hq.slice(1)}: +{formatMoney(model.total)} a year
          </a>
        ) : null}
      </div>
    </div>
  );
}
