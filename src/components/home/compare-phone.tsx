"use client";

import { useEffect, useRef, useState } from "react";

import { Dot, Glyph, type GlyphKind } from "@/components/home/compare-art";
import { Logomark } from "@/components/ui/logomark";
import { cn } from "@/lib/cn";

type Row = { label: string; values: readonly string[] };

const GLYPHS: GlyphKind[] = ["lock", "hourglass", "key"];

/**
 * ⑤ on phones: the desktop's three columns as three cards in a native
 * swipe (scroll snap, so it moves at the finger's pace on any phone),
 * ours last and dark, the finale. The cards share their rows through a
 * subgrid, so a question sits at the same height on every card as you
 * swipe. The dots follow the card in view and jump to one when tapped.
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
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const cards = Array.from(el.children) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setActive(cards.indexOf(e.target as HTMLElement));
          }
        }
      },
      { root: el, threshold: 0.6 },
    );
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);

  const go = (i: number) => {
    const el = track.current;
    const card = el?.children[i] as HTMLElement | undefined;
    if (!el || !card) return;
    el.scrollTo({
      left: card.offsetLeft - parseFloat(getComputedStyle(el).paddingLeft),
      behavior: "smooth",
    });
  };

  return (
    <div className="md:hidden">
      <div
        ref={track}
        role="region"
        aria-label="Three ways compared, swipe for the next"
        className="fade -mx-5 mt-8 grid auto-cols-[min(82%,320px)] grid-flow-col grid-rows-[repeat(6,auto)] gap-x-3 overflow-x-auto overscroll-x-contain px-5 pb-2 [scrollbar-width:none] snap-x snap-mandatory scroll-px-5 [&::-webkit-scrollbar]:hidden"
        style={d(delay)}
      >
        {columns.map((c, i) => {
          const ours = i === columns.length - 1;
          return (
            <div
              key={c}
              role="group"
              aria-label={`${i + 1} of ${columns.length}: ${c}`}
              className={cn(
                "row-span-6 grid snap-start grid-rows-subgrid rounded-[24px] px-5 pb-2",
                ours ? "bg-ink text-paper" : "border border-line bg-surface",
              )}
            >
              <div className="flex flex-col gap-3 pb-4 pt-5">
                <Glyph
                  kind={GLYPHS[i]}
                  delay={delay + 200 + i * 220}
                  className="size-14"
                />
                <span className="flex items-center gap-2 text-xl font-bold">
                  {ours && <Logomark className="size-6" />}
                  {c}
                </span>
              </div>
              {rows.map((r) => (
                <div
                  key={r.label}
                  className={cn(
                    "border-t py-3",
                    ours ? "border-line-dark" : "border-line",
                  )}
                >
                  <p
                    className={cn(
                      "text-[13px] font-semibold",
                      ours ? "text-paper/60" : "text-muted",
                    )}
                  >
                    {r.label}
                  </p>
                  <p
                    className={cn(
                      "mt-1 flex gap-2 text-[17px] leading-snug",
                      ours && "font-semibold",
                    )}
                  >
                    {ours && <Dot top="0.5em" />}
                    {r.values[i]}
                  </p>
                </div>
              ))}
            </div>
          );
        })}
      </div>

      <div className="fade mt-5 flex items-center gap-2" style={d(delay + 80)}>
        {columns.map((c, i) => (
          <button
            key={c}
            type="button"
            aria-label={`Show ${c}`}
            aria-current={active === i || undefined}
            onClick={() => go(i)}
            className="flex h-11 items-center px-1"
          >
            <span
              className={cn(
                "block h-2 rounded-full transition-[width,background-color] duration-300 ease-[cubic-bezier(.23,1,.32,1)]",
                active === i ? "w-6 bg-ink" : "w-2 bg-line",
              )}
            />
          </button>
        ))}
        <span className="ml-2 text-[13px] font-semibold text-muted">
          Swipe to compare
        </span>
      </div>
    </div>
  );
}
