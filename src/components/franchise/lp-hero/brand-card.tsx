"use client";

import { useId, useState } from "react";

import {
  BRAND_SWATCHES,
  useFranchise,
} from "@/components/franchise/franchise-context";
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
      className={cn("flex max-w-[560px] flex-col gap-2", className)}
      style={style}
    >
      <label htmlFor={id} className="text-[13px] font-semibold text-muted">
        Try it with your brand. The app on the right repaints.
      </label>
      <div className="flex flex-wrap items-center gap-1 rounded-[28px] bg-surface p-1.5 shadow-[inset_0_0_0_1px_var(--color-line),0_14px_30px_-22px_rgba(21,20,14,0.35)] sm:flex-nowrap sm:rounded-full">
        <span
          aria-hidden
          className="ml-1 inline-flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-extrabold text-white transition-[background-color] duration-300"
          style={{ background: brand.color }}
        >
          {brand.initial}
        </span>
        <input
          id={id}
          type="text"
          value={typed}
          placeholder="Type your brand name"
          maxLength={18}
          autoComplete="off"
          onChange={(e) => {
            setTyped(e.target.value);
            setBrandName(e.target.value);
          }}
          className="h-11 min-w-0 flex-1 basis-[160px] rounded-full border-0 bg-transparent px-2.5 text-base font-semibold text-ink outline-none placeholder:font-medium placeholder:text-stone focus-visible:bg-paper"
        />
        <span aria-hidden className="mx-1 hidden h-6 w-px bg-line sm:block" />
        <div role="group" aria-label="Your colour" className="flex">
          {BRAND_SWATCHES.map((sw) => {
            const on = brand.color.toLowerCase() === sw.hex.toLowerCase();
            return (
              <button
                key={sw.hex}
                type="button"
                aria-label={sw.name}
                aria-pressed={on}
                onClick={() => setBrandColor(sw.hex)}
                className="group flex size-10 items-center justify-center rounded-full outline-none"
              >
                <span
                  className={cn(
                    "block size-6 rounded-full transition-[box-shadow,transform] duration-200 ease-[var(--ease-out)] group-active:scale-[0.9] group-focus-visible:outline-2 group-focus-visible:outline-offset-4 group-focus-visible:outline-ink [@media(hover:hover)]:group-hover:scale-110",
                    on
                      ? "scale-110 shadow-[0_0_0_2px_var(--color-surface),0_0_0_4px_var(--color-ink)]"
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
