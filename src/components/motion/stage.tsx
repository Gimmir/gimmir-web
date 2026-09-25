"use client";

import { useEffect, useLayoutEffect, useRef } from "react";

// Arm before paint on the client (no flash of the finished state);
// plain effect on the server to avoid the hydration warning.
const useArmEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

type Tag = "div" | "section" | "figure" | "header" | "span";

/**
 * One scroll trigger for a whole composition. Its parts (rising words,
 * drawing lines, settling labels; see the Stage block in globals.css)
 * choreograph off `data-stage`, each with its own delay, so a headline, an
 * underline and a number can play as one sequence.
 *
 * The finished composition is the resting state: without JS, for reduced
 * motion, or for crawlers everything is simply there. `eager` is for above
 * the fold: the sequence plays as CSS on first paint instead of waiting for
 * hydration, so the largest element is never hidden behind JS.
 */
export function Stage({
  as = "div",
  eager = false,
  className,
  children,
  ...rest
}: {
  as?: Tag;
  eager?: boolean;
  className?: string;
  children: React.ReactNode;
} & Omit<React.HTMLAttributes<HTMLElement>, "children" | "className">) {
  const ref = useRef<HTMLElement>(null);

  useArmEffect(() => {
    const el = ref.current;
    if (!el || eager) return;
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      return;
    }
    // Already scrolled past (restored scroll, anchor link): leave it finished.
    if (el.getBoundingClientRect().bottom < 0) return;

    el.dataset.stage = "pending";
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        el.dataset.stage = "in"; // stable end state: plays once, never replays
        io.disconnect();
      },
      // Plays once its top is a quarter of the way up the screen. Not a
      // share of the element: on phones a section can be taller than the
      // screen and would otherwise sit blank while being read.
      { threshold: 0, rootMargin: "0px 0px -25% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [eager]);

  // typed as a div for JSX; renders whichever tag was asked for
  const Tag = as as "div";
  return (
    <Tag
      {...rest}
      ref={ref as React.RefObject<HTMLDivElement>}
      className={className}
      data-stage={eager ? "eager" : undefined}
    >
      {children}
    </Tag>
  );
}
