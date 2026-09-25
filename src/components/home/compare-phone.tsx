"use client";

import { Fragment, useState } from "react";

import { Dot, Glyph, type GlyphKind } from "@/components/home/compare-art";
import { Logomark } from "@/components/ui/logomark";
import { cn } from "@/lib/cn";

type Row = { label: string; values: readonly string[] };

const THEIRS: GlyphKind[] = ["lock", "hourglass"];
/** An answer swapped in: a short fade that a touch of blur carries across. */
const SWAP =
  "animate-[swap-in_300ms_var(--ease-out)_both] motion-reduce:animate-none";

/**
 * ⑤ on phones: the desktop table in two columns, ours always on the right
 * as the dark card, theirs on the left, switched by a tap (renting or an
 * agency). Answers change in place, so the eye stays on one comparison.
 */
export function CompareOnPhone({
  columns,
  rows,
  delay,
}: {
  columns: readonly string[];
  rows: readonly Row[];
  delay: number;
}) {
  const [them, setThem] = useState(0);
  // the entrance belongs to the stage; the swap only plays once tapped
  const [touched, setTouched] = useState(false);
  const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;
  const pick = (i: number) => {
    setThem(i);
    setTouched(true);
  };

  return (
    <div className="md:hidden">
      <div
        role="group"
        aria-label="Compare Gimmir with"
        className="fade relative mt-10 grid grid-cols-2 rounded-full bg-paper-2 p-1 ring-1 ring-line"
        style={d(delay)}
      >
        <span
          aria-hidden
          className="absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-full bg-surface shadow-[0_1px_2px_rgba(21,20,14,0.08),0_8px_18px_-10px_rgba(21,20,14,0.3)] transition-transform duration-300 ease-[cubic-bezier(.23,1,.32,1)]"
          style={{ transform: them ? "translateX(100%)" : "none" }}
        />
        {[0, 1].map((i) => (
          <button
            key={i}
            type="button"
            aria-pressed={them === i}
            onClick={() => pick(i)}
            className={cn(
              "relative flex h-11 items-center justify-center rounded-full px-2 text-[13px] font-semibold transition-colors duration-200",
              them === i ? "text-ink" : "text-muted",
            )}
          >
            {columns[i]}
          </button>
        ))}
      </div>

      <div className="fade mt-6 grid grid-cols-2" style={d(delay + 80)}>
        <div className="flex flex-col justify-end gap-3 pb-5 pr-4">
          <span key={them} className={cn("block", touched && SWAP)}>
            <Glyph
              kind={THEIRS[them]}
              delay={delay + 200}
              className="size-14"
            />
          </span>
          <span
            key={`name-${them}`}
            className={cn("text-[15px] font-semibold", touched && SWAP)}
          >
            {columns[them]}
          </span>
        </div>
        <div className="flex flex-col justify-end gap-3 rounded-t-[20px] bg-ink px-4 pb-5 pt-5 text-paper">
          <Glyph kind="key" delay={delay + 420} className="size-14" />
          <span className="flex items-center gap-2 text-[15px] font-semibold">
            <Logomark className="size-5" />
            {columns[2]}
          </span>
        </div>

        {rows.map((r, n) => {
          const last = n === rows.length - 1;
          return (
            <Fragment key={r.label}>
              <div className="flex flex-col justify-between gap-2 border-t border-line py-4 pr-4">
                <span className="text-[13px] font-semibold">{r.label}</span>
                <span
                  key={`${them}-${n}`}
                  className={cn("text-[15px] leading-snug", touched && SWAP)}
                >
                  {r.values[them]}
                </span>
              </div>
              <div
                className={cn(
                  "flex items-end border-t border-line-dark bg-ink px-4 py-4 text-paper",
                  last && "rounded-b-[20px] pb-5",
                )}
              >
                <span className="flex gap-2 text-[15px] font-semibold leading-snug">
                  <Dot />
                  {r.values[2]}
                </span>
              </div>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
