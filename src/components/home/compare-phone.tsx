"use client";

import { useState } from "react";

import { Dot, Glyph, type GlyphKind } from "@/components/home/compare-art";
import { Logomark } from "@/components/ui/logomark";
import { cn } from "@/lib/cn";

type Row = { label: string; values: readonly string[] };

const THEIRS: GlyphKind[] = ["lock", "hourglass"];
/** An answer swapped in: a short fade that a touch of blur carries across. */
const SWAP =
  "animate-[swap-in_300ms_var(--ease-out)_both] motion-reduce:animate-none";

/**
 * ⑤ on phones: each question with two answers side by side, ours always
 * on the right in a dark tile, theirs on the left, switched by a tap
 * (renting or an agency). Answers change in place, so the eye stays on
 * one comparison.
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

      {/* Each question runs the full width, its two answers side by side
          under it: theirs plain, ours a dark tile, so dark only sits where
          there is text. Both of their answers are stacked in one cell with
          only the picked one visible, so a row is as tall as its longest
          answer and the toggle never moves anything. */}
      <div className="fade mt-6" style={d(delay + 80)}>
        <div className="grid grid-cols-2 items-end gap-3 pb-5">
          <div className="flex flex-col gap-3 pb-4 pt-5">
            <span className="grid">
              {THEIRS.map((kind, i) => (
                <span
                  key={i === them ? `on-${i}` : `off-${i}`}
                  className={cn(
                    "[grid-area:1/1]",
                    i === them ? touched && SWAP : "invisible",
                  )}
                >
                  <Glyph kind={kind} delay={delay + 200} className="size-14" />
                </span>
              ))}
            </span>
            <span className="grid text-[15px] font-semibold leading-snug">
              {[0, 1].map((i) => (
                <span
                  key={i === them ? `on-${i}` : `off-${i}`}
                  aria-hidden={i !== them || undefined}
                  className={cn(
                    "[grid-area:1/1]",
                    i === them ? touched && SWAP : "invisible",
                  )}
                >
                  {columns[i]}
                </span>
              ))}
            </span>
          </div>
          <div className="flex flex-col gap-3 rounded-[20px] bg-ink px-4 pb-4 pt-5 text-paper">
            <Glyph kind="key" delay={delay + 420} className="size-14" />
            <span className="flex items-center gap-2 text-[15px] font-semibold leading-snug">
              <Logomark className="size-5" />
              {columns[2]}
            </span>
          </div>
        </div>

        {rows.map((r) => (
          <div key={r.label} className="border-t border-line py-4">
            <p className="text-[13px] font-semibold leading-snug">{r.label}</p>
            {/* same vertical padding on both sides, so both answers start
                on the same line */}
            <div className="mt-2 grid grid-cols-2 items-start gap-3 text-[15px] leading-snug">
              <span className="grid py-3">
                {[0, 1].map((i) => (
                  <span
                    key={i === them ? `on-${i}` : `off-${i}`}
                    aria-hidden={i !== them || undefined}
                    className={cn(
                      "[grid-area:1/1]",
                      i === them ? touched && SWAP : "invisible",
                    )}
                  >
                    {r.values[i]}
                  </span>
                ))}
              </span>
              <span className="flex gap-2 rounded-2xl bg-ink px-4 py-3 font-semibold text-paper">
                <Dot top="0.42em" />
                {r.values[2]}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
