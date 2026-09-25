"use client";

import { useId, useState } from "react";

import { BookTrigger } from "@/components/blocks/book-trigger";
import { ArrowRight } from "@/components/ui/icons";
import { operators } from "@/content/operators";
import { cn } from "@/lib/cn";

import { FeesArt, SameAppArt, SilosArt } from "./pain-art";

const ART = { fees: FeesArt, silos: SilosArt, same: SameAppArt };

/**
 * The pains as cards an operator ticks for themself: each card is one
 * checkbox (a real input, stretched over the card), ticking lights its
 * drawing, and the bar underneath counts and offers the platform check.
 */
export function PainCheck({ after }: { after: number }) {
  const { items, check } = operators.pain;
  const [on, setOn] = useState<boolean[]>(() => items.map(() => false));
  const uid = useId();
  const n = on.filter(Boolean).length;
  const status =
    n === 0
      ? check.none
      : `${n} of ${items.length}. ${n === items.length ? check.all : check.some}`;
  const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

  return (
    <>
      <ul className="mt-10 grid gap-4 md:mt-14 md:grid-cols-3">
        {items.map((it, i) => {
          const Art = ART[it.id];
          const label = `${uid}-${it.id}`;
          return (
            <li key={it.id} className="fade" style={d(after + i * 90)}>
              <div
                data-on={on[i]}
                className="group relative flex h-full flex-col rounded-[24px] bg-surface p-2 shadow-[0_1px_0_rgba(21,20,14,0.04),0_28px_56px_-36px_rgba(21,20,14,0.35)] ring-1 ring-line transition-[box-shadow,transform] duration-200 ease-out has-[:active]:scale-[0.985] has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-4 has-[:focus-visible]:outline-ink data-[on=false]:hover:ring-ink/30 data-[on=true]:ring-[1.5px] data-[on=true]:ring-ink"
              >
                <label className="absolute inset-0 z-10 cursor-pointer rounded-[24px]">
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={on[i]}
                    aria-labelledby={label}
                    onChange={() =>
                      setOn((prev) => prev.map((v, k) => (k === i ? !v : v)))
                    }
                  />
                </label>
                <div
                  aria-hidden
                  className="relative flex h-[240px] items-center justify-center rounded-[18px] bg-paper-2 px-4 pb-4 pt-10 md:h-[270px]"
                >
                  <Art d={after + i * 90 + 200} />
                  <span className="absolute right-3 top-3 flex size-10 items-center justify-center rounded-[12px] border-[1.5px] border-ink bg-surface transition-colors duration-150 group-data-[on=true]:bg-lime">
                    <svg viewBox="0 0 24 24" className="size-5">
                      <path
                        d="M5 12.5l4.5 4.5L19 7.5"
                        pathLength={1}
                        fill="none"
                        stroke="var(--color-ink)"
                        strokeWidth={2.6}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="transition-[stroke-dashoffset] duration-300 ease-[cubic-bezier(.23,1,.32,1)] [stroke-dasharray:1] [stroke-dashoffset:1] group-data-[on=true]:[stroke-dashoffset:0]"
                      />
                    </svg>
                  </span>
                </div>
                <div className="px-4 pb-5 pt-5 md:px-5">
                  <p className="text-sm font-semibold text-faint">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3
                    id={label}
                    className="display mt-2 text-[1.625rem] leading-[1.06]"
                  >
                    {it.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-muted">{it.body}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <div
        className="fade mt-4 flex flex-col gap-5 rounded-[24px] bg-ink p-6 text-paper sm:flex-row sm:items-center sm:justify-between sm:py-6 sm:pl-8 sm:pr-6"
        style={d(after + items.length * 90 + 100)}
      >
        <div className="flex items-start gap-4">
          <span aria-hidden className="mt-2.5 flex gap-1.5">
            {on.map((v, k) => (
              <span
                key={k}
                className={cn(
                  "size-2.5 rounded-full border transition-colors duration-200",
                  v ? "border-lime bg-lime" : "border-paper/35",
                )}
              />
            ))}
          </span>
          <div>
            <p
              aria-live="polite"
              className="text-xl font-bold tracking-[-0.01em] md:text-2xl"
            >
              {status}
            </p>
            <p className="mt-1 text-paper/65">{check.line}</p>
          </div>
        </div>
        <BookTrigger
          booking="costCheck"
          placement="operators-pain"
          className="group inline-flex shrink-0 items-center gap-3 self-start rounded-full bg-paper py-2 pl-6 pr-2 text-ink transition-[background-color,transform] duration-200 hover:bg-lime active:scale-[0.97] sm:self-auto"
        >
          <span className="font-semibold">{check.cta}</span>
          <span className="flex size-10 items-center justify-center rounded-full bg-ink text-paper transition-transform duration-200 group-hover:translate-x-0.5">
            <ArrowRight className="size-4" />
          </span>
        </BookTrigger>
      </div>
    </>
  );
}
