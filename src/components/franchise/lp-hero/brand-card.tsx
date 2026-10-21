"use client";

import { useState } from "react";

import { BRAND_SWATCHES, useFranchise } from "@/components/franchise/franchise-context";
import { cn } from "@/lib/cn";

/**
 * "See it with your name on it": the brand name and colour the visitor
 * picks here repaint every app screen on the page (state in
 * `FranchiseProvider`). Typing never animates.
 */
export function BrandCard({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  const { brand, setBrandName, setBrandColor } = useFranchise();
  // the field keeps what was typed (spaces included); the provider trims
  const [typed, setTyped] = useState("");

  return (
    <div
      className={cn(
        "flex flex-col gap-3.5 rounded-3xl bg-surface p-5 ring-1 ring-line",
        className,
      )}
      style={style}
    >
      <p className="m-0 text-[15px] font-bold">See it with your name on it</p>
      <label className="flex flex-col gap-1.5 text-[13px] font-semibold text-muted">
        Your brand
        <input
          type="text"
          value={typed}
          placeholder="Your brand"
          maxLength={18}
          autoComplete="off"
          onChange={(e) => {
            setTyped(e.target.value);
            setBrandName(e.target.value);
          }}
          className="h-12 rounded-xl border-0 bg-paper px-3.5 text-[17px] font-semibold text-ink ring-1 ring-line-strong outline-none ring-inset placeholder:text-stone focus-visible:ring-2 focus-visible:ring-ink"
        />
      </label>
      <div className="flex flex-wrap items-center gap-x-2.5">
        <span className="text-[13px] font-semibold text-muted">Your colour</span>
        <div className="flex flex-wrap">
          {BRAND_SWATCHES.map((sw) => {
            const on = brand.color.toLowerCase() === sw.hex.toLowerCase();
            return (
              <button
                key={sw.hex}
                type="button"
                aria-label={sw.name}
                aria-pressed={on}
                onClick={() => setBrandColor(sw.hex)}
                className="group flex size-11 items-center justify-center rounded-full outline-none"
              >
                <span
                  className={cn(
                    "block size-9 rounded-full transition-shadow duration-200 group-focus-visible:outline-2 group-focus-visible:outline-offset-4 group-focus-visible:outline-ink",
                    on
                      ? "shadow-[0_0_0_3px_#fff,0_0_0_5px_var(--color-ink)]"
                      : "shadow-[inset_0_0_0_1px_rgba(0,0,0,0.1)]",
                  )}
                  style={{ background: sw.hex }}
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
