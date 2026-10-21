"use client";

import { useId } from "react";

import { cn } from "@/lib/cn";

/**
 * One accordion step: a real button (aria-expanded / aria-controls) over a
 * body that opens by animating grid rows (the artboard's technique: no
 * measuring, no height jump). A closed body is inert, so nothing in it can
 * take focus.
 */
export function Step({
  n,
  title,
  open,
  done,
  waiting,
  summary,
  hint,
  onToggle,
  children,
}: {
  n: number;
  title: string;
  open: boolean;
  done: boolean;
  /** Not open, not answered, and the step before it isn't either. */
  waiting: boolean;
  /** What was answered, shown once done and folded. */
  summary: string;
  /** What to expect, shown until then. */
  hint: string;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  const uid = useId();
  const panelId = `${uid}-panel`;
  const folded = done && !open;

  return (
    <div
      className={cn(
        "rounded-[20px] transition-[background-color,box-shadow] duration-300 motion-reduce:transition-none",
        open
          ? "bg-surface shadow-[inset_0_0_0_1.5px_var(--color-ink)]"
          : "bg-paper shadow-[inset_0_0_0_1px_var(--color-line)]",
      )}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
        className="flex min-h-11 w-full cursor-pointer items-center gap-3.5 rounded-[20px] px-5 py-[18px] text-left text-ink"
      >
        <span
          aria-hidden
          className={cn(
            "flex size-9 shrink-0 items-center justify-center rounded-full text-[15px] font-extrabold transition-colors duration-300 motion-reduce:transition-none",
            folded
              ? "bg-lime text-ink"
              : open
                ? "bg-ink text-paper"
                : "bg-line text-muted",
          )}
        >
          {folded ? "✓" : n}
        </span>
        <span className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="text-lg font-bold">{title}</span>
          <span className="text-sm text-muted">
            {folded ? summary : waiting ? `Opens after step ${n - 1}` : hint}
          </span>
        </span>
        <span className="text-sm font-semibold underline">
          {open ? "" : done ? "Edit" : "Open"}
        </span>
      </button>
      <div
        id={panelId}
        role="region"
        aria-label={title}
        className={cn(
          "grid transition-[grid-template-rows,opacity,visibility] [transition-timing-function:var(--ease-out),ease,linear] motion-reduce:transition-none",
          open
            ? "visible grid-rows-[1fr] opacity-100 [transition-delay:0s,150ms,0s] [transition-duration:500ms,350ms,0s]"
            : "invisible grid-rows-[0fr] opacity-0 [transition-delay:0s,0s,500ms] [transition-duration:500ms,350ms,0s]",
        )}
      >
        <div className="min-h-0 overflow-hidden" inert={!open}>
          <div className="flex flex-col gap-6 px-5 pt-1 pb-[22px]">{children}</div>
        </div>
      </div>
    </div>
  );
}
