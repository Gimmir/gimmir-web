"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/cn";

/**
 * The page as numbered chapters (Oleh's landing artboard): a rail on the
 * right from 1360px that marks where you are, a "Next" pill below that
 * width, and a scroll-progress hairline. One IntersectionObserver reads
 * which chapter fills the middle of the screen.
 */

export const CHAPTERS = [
  { id: "top", label: "Start" },
  { id: "money", label: "The money" },
  { id: "numbers", label: "Your numbers" },
  { id: "platform", label: "The platform" },
  { id: "everything", label: "Full flow" },
  { id: "proof", label: "Live work" },
  { id: "process", label: "How we build" },
  { id: "offer", label: "Founding offer" },
  { id: "faq", label: "Questions" },
  { id: "book", label: "Book a call" },
] as const;

export type ChapterId = (typeof CHAPTERS)[number]["id"];

function useChapter(): number | null {
  const [current, setCurrent] = useState<number | null>(null);
  useEffect(() => {
    const els = CHAPTERS.map((c) => document.getElementById(c.id));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const i = els.indexOf(e.target as HTMLElement);
          if (i >= 0) setCurrent(i);
        }
      },
      { rootMargin: "-35% 0px -60% 0px" },
    );
    els.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);
  return current;
}

export function ChapterNav() {
  const current = useChapter();
  if (current === null) return null;
  const next = CHAPTERS[Math.min(current + 1, CHAPTERS.length - 1)];

  return (
    <>
      <nav
        aria-label="Sections"
        className="fixed top-1/2 right-[22px] z-[25] hidden -translate-y-1/2 flex-col items-end gap-3 min-[1360px]:flex"
      >
        {CHAPTERS.slice(1).map((c, j) => {
          const i = j + 1;
          const on = i === current;
          return (
            <a
              key={c.id}
              href={`#${c.id}`}
              aria-current={on ? "true" : undefined}
              className="group flex min-h-[22px] items-center justify-end gap-2.5"
            >
              <span
                className={cn(
                  "rounded-full bg-surface px-2.5 py-1 text-xs font-bold whitespace-nowrap ring-1 ring-line transition-opacity duration-200",
                  on ? "opacity-100" : "pointer-events-none opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100",
                )}
              >
                {c.label}
              </span>
              <span
                aria-hidden
                className={cn(
                  "block rounded-full transition-[transform,background-color] duration-200 ease-[var(--ease-out)]",
                  on
                    ? "size-3 bg-lime shadow-[0_0_0_1.5px_var(--color-ink)]"
                    : cn("mr-0.5 size-2", i < current ? "bg-ink" : "bg-line-strong"),
                )}
              />
            </a>
          );
        })}
      </nav>

      {current < CHAPTERS.length - 1 ? (
        <a
          href={`#${next.id}`}
          className="fixed bottom-4 left-1/2 z-[25] inline-flex min-h-11 -translate-x-1/2 items-center gap-2 rounded-full bg-ink px-[18px] text-sm font-semibold whitespace-nowrap text-paper shadow-[0_14px_30px_-14px_rgba(0,0,0,0.55)] transition-transform duration-150 active:scale-[0.97] min-[1360px]:hidden"
        >
          Next: {next.label}
          <svg aria-hidden viewBox="0 0 16 16" className="size-4">
            <path d="M8 3v10M4 9l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.75" />
          </svg>
        </a>
      ) : null}
    </>
  );
}

/**
 * The line between two chapters: one statement, then a numbered node that
 * jumps to the next chapter. Server-renderable (no state).
 */
export function ChapterBridge({
  statement,
  next,
  number,
}: {
  statement: React.ReactNode;
  next: ChapterId;
  number: string;
}) {
  const label = CHAPTERS.find((c) => c.id === next)?.label ?? "";
  return (
    <div className="flex flex-col items-center gap-[22px] px-6 pt-14 pb-1 text-center">
      <p className="display m-0 max-w-[900px] text-[clamp(28px,3.9vw,50px)] leading-[1.08]">
        {statement}
      </p>
      <span aria-hidden className="block h-[88px] w-[1.5px] origin-top bg-line-strong" />
      <a
        href={`#${next}`}
        aria-label={`Go to ${number}: ${label}`}
        className="inline-flex h-11 min-w-11 items-center justify-center rounded-full bg-lime px-1.5 text-sm font-extrabold text-ink shadow-[0_0_0_6px_var(--color-paper),0_0_0_7px_var(--color-line)] transition-transform duration-200 ease-[var(--ease-out)] hover:translate-y-[3px]"
      >
        {number}
      </a>
    </div>
  );
}
