"use client";

import { useEffect, useState } from "react";

import { calculator } from "@/content/calculator";
import { cn } from "@/lib/cn";
import { formatMoney } from "@/lib/franchise-calc";

import type { Calculators } from "./use-calculators";

const bar = calculator.mobileBar;

/**
 * On phones the receipt sits under six questions, two screens down. While
 * the visitor is in the calculator but the receipt is out of view, this bar
 * keeps the number in sight and takes them to it. It slides up from the
 * bottom edge it lives on (transform/opacity only) and stays put for
 * reduced motion. Hidden from lg up, where the receipt is sticky beside the
 * questions.
 */
export function MobileResultBar({
  c,
  sectionId,
  receiptId,
}: {
  c: Calculators;
  sectionId: string;
  receiptId: string;
}) {
  const [inSection, setInSection] = useState(false);
  const [receiptSeen, setReceiptSeen] = useState(false);

  useEffect(() => {
    const section = document.getElementById(sectionId);
    const receipt = document.getElementById(receiptId);
    if (!section || !receipt) return;
    const watch = (el: Element, set: (v: boolean) => void, rootMargin: string) => {
      const io = new IntersectionObserver(([e]) => set(e.isIntersecting), {
        rootMargin,
      });
      io.observe(el);
      return io;
    };
    // the section counts once its questions fill the screen, not on its edge
    const a = watch(section, setInSection, "-30% 0px -30% 0px");
    const b = watch(receipt, setReceiptSeen, "0px 0px -20% 0px");
    return () => {
      a.disconnect();
      b.disconnect();
    };
  }, [sectionId, receiptId]);

  const show = inSection && !receiptSeen && c.cost !== null;

  return (
    <div
      aria-hidden={!show}
      inert={!show}
      className={cn(
        "fixed inset-x-3 bottom-3 z-[60] pb-[env(safe-area-inset-bottom)] lg:hidden",
        "transition-[transform,opacity] ease-[var(--ease-out)] motion-reduce:transition-opacity",
        show
          ? "translate-y-0 opacity-100 duration-200"
          : "pointer-events-none translate-y-[calc(100%+12px)] opacity-0 duration-150 motion-reduce:translate-y-0",
      )}
    >
      <button
        type="button"
        onClick={() =>
          document.getElementById(receiptId)?.scrollIntoView({ block: "start" })
        }
        className="flex w-full items-center justify-between gap-4 rounded-[20px] bg-ink px-5 py-3.5 text-left text-paper shadow-[0_20px_40px_-20px_rgba(21,20,14,0.6)] transition-transform duration-150 active:scale-[0.98]"
      >
        <span className="min-w-0">
          <span className="block text-xl font-bold leading-tight tabular-nums">
            {c.cost ? formatMoney(c.cost.costTodayYear) : ""}
          </span>
          <span className="block text-sm leading-snug text-paper/70">
            {c.hqYear !== null
              ? `${bar.leaves} · ${bar.hq(formatMoney(c.hqYear))}`
              : bar.leaves}
          </span>
        </span>
        <span className="flex h-11 shrink-0 items-center rounded-full bg-paper px-4 text-sm font-semibold text-ink">
          {bar.see}
        </span>
      </button>
    </div>
  );
}
