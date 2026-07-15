"use client";

import { useEffect, useLayoutEffect, useRef } from "react";

// useLayoutEffect on the client (so we can arm the element before it paints),
// useEffect on the server to avoid the hydration warning.
const useArmEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * One-shot scroll reveal. Renders fully visible at rest — so content never
 * disappears without JS, for reduced-motion users, or for crawlers — then fades
 * and rises into place the first time it scrolls into view.
 *
 * The reveal is a CSS transition to a *stable* end state (`data-reveal="in"`),
 * which makes it idempotent: it plays exactly once and can never replay, even if
 * the effect runs twice (React StrictMode) or the observer fires more than once.
 * That is the behaviour the old WAAPI `.animate()` version could not guarantee.
 *
 * `eager` is for above-the-fold content (heroes): the entrance plays as a pure
 * CSS animation on first paint instead of waiting for hydration. Waiting would
 * hide the largest element until JS loads — on a slow connection the user sees
 * the hero, watches it vanish, and gets the LCP attributed seconds late.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 22,
  eager = false,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  eager?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useArmEffect(() => {
    const el = ref.current;
    if (!el || eager) return; // eager: the CSS animation already handled it
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) return; // stay visible

    el.style.setProperty("--reveal-y", `${y}px`);
    el.style.setProperty("--reveal-delay", `${delay}ms`);
    // Arm before the browser paints, so there is no flash of the final position.
    el.dataset.reveal = "pending";

    // Anything already in or above the viewport at arm time — above the fold, or
    // a restored / anchored scroll position — reveals right away, so on-screen or
    // scrolled-past content is never left hidden waiting for an intersection.
    if (el.getBoundingClientRect().top < window.innerHeight) {
      requestAnimationFrame(() => {
        el.dataset.reveal = "in";
      });
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        el.dataset.reveal = "in"; // stable end state — the transition runs once
        io.disconnect();
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay, y, eager]);

  return (
    <div
      ref={ref}
      className={className}
      data-reveal={eager ? "eager" : undefined}
      style={
        eager
          ? ({
              "--reveal-y": `${y}px`,
              "--reveal-delay": `${delay}ms`,
            } as React.CSSProperties)
          : undefined
      }
    >
      {children}
    </div>
  );
}
