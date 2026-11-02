"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { useFranchise } from "@/components/franchise/franchise-context";
import { formatMoney } from "@/lib/franchise-calc";

// Arm before paint on the client (no flash of the finished figure);
// plain effect on the server to avoid the hydration warning.
const useArmEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

const DURATION = 900;

/**
 * The chapter's big figure, live: what the visitor's network pays its
 * platform a year. It counts up once, the first time it scrolls into view,
 * and afterwards follows the model without animating. Without JS, for
 * reduced motion, or when already on screen at load it simply rests on the
 * final figure.
 */
export function MoneyFigure() {
  const { model } = useFranchise();
  const { projection, values } = model;
  const target = projection.leavesYear;

  const ref = useRef<HTMLDivElement>(null);
  const targetRef = useRef(target);
  // null: show the real figure. A number: the count-up is arming or playing.
  const [counting, setCounting] = useState<number | null>(null);

  useArmEffect(() => {
    targetRef.current = target;
  });

  useArmEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window) ||
      el.getBoundingClientRect().top < window.innerHeight
    ) {
      return;
    }
    setCounting(0);

    let raf = 0;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / DURATION);
          const eased = 1 - Math.pow(1 - p, 3);
          if (p < 1) {
            setCounting(eased * targetRef.current);
            raf = requestAnimationFrame(tick);
          } else {
            setCounting(null);
          }
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0, rootMargin: "0px 0px -20% 0px" },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  const shownValue = counting ?? target;

  return (
    <div ref={ref} className="flex flex-col items-center gap-1.5">
      <p className="display m-0 text-[clamp(64px,8vw,112px)] leading-none tracking-[-0.05em] tabular-nums">
        <span className="sr-only">{formatMoney(target)}</span>
        <span aria-hidden>{formatMoney(shownValue)}</span>
      </p>
      <p className="m-0 text-base text-muted">
        a year, from {values.units} studios at {formatMoney(values.costPerUnit)} a month. You
        earn none of it.
      </p>
    </div>
  );
}
