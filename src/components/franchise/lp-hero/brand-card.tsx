"use client";

import { useId, useState } from "react";

import { BRAND_SWATCHES, useFranchise } from "@/components/franchise/franchise-context";
import { cn } from "@/lib/cn";

/**
 * "Try it with your brand": a compact control under the hero's checks. The
 * name and colour the visitor picks repaint every app screen on the page
 * (state in `FranchiseProvider`). Typing never animates.
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
  const id = useId();

  return (
    <div
      className={cn(
        "flex max-w-[520px] flex-col gap-1 rounded-2xl p-3 ring-1 ring-line",
        className,
      )}
      style={style}
    >
      <label htmlFor={id} className="text-[13px] font-semibold text-muted">
        Try it with your brand
      </label>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <input
          id={id}
          type="text"
          value={typed}
          placeholder="Your brand"
          maxLength={18}
          autoComplete="off"
          onChange={(e) => {
            setTyped(e.target.value);
            setBrandName(e.target.value);
          }}
          className="h-11 min-w-0 flex-1 basis-[150px] rounded-xl border-0 bg-surface px-3.5 text-base font-semibold text-ink ring-1 ring-line-strong outline-none ring-inset placeholder:text-stone focus-visible:ring-2 focus-visible:ring-ink"
        />
        <div role="group" aria-label="Your colour" className="flex flex-wrap">
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
                    "block size-7 rounded-full transition-[box-shadow,transform] duration-200 ease-[var(--ease-out)] group-active:scale-[0.97] group-focus-visible:outline-2 group-focus-visible:outline-offset-4 group-focus-visible:outline-ink",
                    on
                      ? "shadow-[0_0_0_2px_var(--color-paper),0_0_0_4px_var(--color-ink)]"
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
