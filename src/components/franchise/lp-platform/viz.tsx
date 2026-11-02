"use client";

import { useEffect, useLayoutEffect, useRef } from "react";

import { cn } from "@/lib/cn";

// Arm before paint on the client; plain effect on the server (no warning).
const useArmEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * The illustration panel of a bento card. Its children are drawn on a
 * fixed `w`×`h` canvas that is scaled to fit the panel, so text never
 * clips at any width. The panel also plays its entrance once: if it is
 * wholly below the fold it is armed (`data-viz="pending"`), and the first
 * time it scrolls into view it flips to "in". Parts opt in with `In`,
 * `Fill` and `Grow` below. The resting state is the finished drawing:
 * without JS, for reduced motion, or for anything already on screen.
 *
 * The card is the `group/card` that lifts the drawing 4px on hover.
 */
export function Viz({
  w,
  h,
  s0 = 0.8,
  className,
  children,
}: {
  w: number;
  h: number;
  /** The scale before the first measure (server render). */
  s0?: number;
  className?: string;
  children: React.ReactNode;
}) {
  const box = useRef<HTMLDivElement>(null);

  useArmEffect(() => {
    const el = box.current;
    if (!el) return;

    const fit = () => {
      const s = Math.min(1, el.clientWidth / w, el.clientHeight / h);
      el.style.setProperty("--s", s.toFixed(3));
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);

    let io: IntersectionObserver | undefined;
    const calm =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window);
    if (!calm && el.dataset.viz !== "in" && el.getBoundingClientRect().top >= window.innerHeight) {
      el.dataset.viz = "pending";
      io = new IntersectionObserver(
        (entries) => {
          if (!entries[0]?.isIntersecting) return;
          el.dataset.viz = "in"; // plays once, never replays
          io?.disconnect();
        },
        { threshold: 0.2, rootMargin: "0px 0px -8% 0px" },
      );
      io.observe(el);
    }

    return () => {
      ro.disconnect();
      io?.disconnect();
    };
  }, [w, h]);

  return (
    <div
      ref={box}
      aria-hidden
      className={cn(
        "group/viz relative min-h-0 flex-1 overflow-hidden rounded-2xl bg-paper-2",
        className,
      )}
      style={{ aspectRatio: `${w} / ${h}` }}
    >
      <div
        className="absolute top-1/2 left-1/2 transition-[translate] duration-200 ease-[var(--ease-out)] motion-reduce:transition-none [@media(hover:hover)]:group-hover/card:-translate-y-1"
        style={{
          width: w,
          height: h,
          transform: `translate(-50%, -50%) scale(var(--s, ${s0}))`,
        }}
      >
        {children}
      </div>
    </div>
  );
}

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

/** Where a part comes from. Opacity and transform only. */
const FROM = {
  up: "group-data-[viz=pending]/viz:translate-y-2",
  left: "group-data-[viz=pending]/viz:-translate-x-3",
  right: "group-data-[viz=pending]/viz:translate-x-3",
  pop: "group-data-[viz=pending]/viz:scale-90",
} as const;

/** A part that settles in once the panel is first seen, `d` ms after it. */
export function In({
  d = 0,
  from = "up",
  as: Tag = "div",
  className,
  style,
  children,
}: {
  d?: number;
  from?: keyof typeof FROM;
  as?: "div" | "span";
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}) {
  return (
    <Tag
      className={cn(
        "transition-[opacity,translate,scale] duration-500 ease-[var(--ease-out)] [transition-delay:var(--d,0ms)]",
        "group-data-[viz=pending]/viz:opacity-0",
        FROM[from],
        className,
      )}
      style={{ ...delay(d), ...style }}
    >
      {children}
    </Tag>
  );
}

/**
 * A bar that grows from its left edge (or `axis="y"` from the top). The
 * colour keeps its own 300ms transition, so a brand change is not delayed.
 */
export function Fill({
  pct,
  color,
  d = 0,
  axis = "x",
  className,
}: {
  pct: number;
  color: string;
  d?: number;
  axis?: "x" | "y";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "block rounded-[inherit]",
        axis === "x"
          ? "h-full origin-left group-data-[viz=pending]/viz:scale-x-0"
          : "w-full origin-top group-data-[viz=pending]/viz:scale-y-0",
        className,
      )}
      style={{
        [axis === "x" ? "width" : "height"]: `${pct}%`,
        background: color,
        transition: `scale 700ms var(--ease-out) ${d}ms, background-color 300ms ease`,
      }}
    />
  );
}
