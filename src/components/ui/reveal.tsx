"use client";

import { useEffect, useRef } from "react";

/**
 * One-shot scroll reveal. Content is fully visible at rest (transform-only, no
 * opacity flash); on first intersection it slides up into place. Respects
 * prefers-reduced-motion and degrades gracefully without JS.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 22,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window) || !el.animate) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            el.animate(
              [{ transform: `translateY(${y}px)` }, { transform: "none" }],
              { duration: 640, delay, easing: "cubic-bezier(.2,.7,.2,1)" },
            );
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay, y]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
