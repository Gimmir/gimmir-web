"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/cn";

import { SCENES } from "./scenes";

/** The canvas the scenes are drawn on; the stage scales it to fit. */
const CANVAS_W = 620;
const CANVAS_H = 660;

/**
 * One scroll story: the steps scroll on the left (server-rendered markup,
 * passed as children), a sticky stage on the right swaps its scene to match
 * the step in the middle of the viewport. On phones the stage sticks at the
 * top and the steps scroll under it. The active step is shared as
 * `data-active` so the steps style themselves in CSS.
 */
export function PlatformStory({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);

  // the step in the middle of the viewport is the active one
  useEffect(() => {
    const steps = Array.from(root.current?.querySelectorAll<HTMLElement>("[data-step]") ?? []);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const i = steps.indexOf(e.target as HTMLElement);
          if (i >= 0) setActive(i);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    steps.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // fit the canvas to whatever stage the layout gives it
  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const fit = () => {
      const s = Math.min(1, el.clientWidth / CANVAS_W, el.clientHeight / CANVAS_H);
      el.style.setProperty("--s", s.toFixed(3));
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={root}
      data-active={active}
      className="group/story mt-2 grid items-start gap-0 min-[901px]:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] min-[901px]:gap-14"
    >
      {children}

      <div
        ref={stage}
        aria-hidden
        className="sticky top-16 z-[2] order-first h-[430px] overflow-x-clip bg-paper [--s:0.55] min-[901px]:top-[max(96px,calc(50vh-330px))] min-[901px]:order-none min-[901px]:h-[660px] min-[901px]:bg-transparent min-[901px]:[--s:1]"
      >
        <div className="absolute inset-0 rounded-[36px] bg-paper-2" />
        <div
          className="absolute top-1/2 left-1/2"
          style={{
            width: CANVAS_W,
            height: CANVAS_H,
            transform: "translate(-50%, -50%) scale(var(--s))",
          }}
        >
          {SCENES.map((Scene, i) => {
            const on = active === i;
            return (
              <div
                key={i}
                className={cn(
                  "absolute inset-0 motion-reduce:[transition:none!important]",
                  on
                    ? "visible translate-y-0 scale-100 opacity-100"
                    : "invisible translate-y-[18px] scale-[0.985] opacity-0 motion-reduce:translate-y-0 motion-reduce:scale-100",
                )}
                style={{
                  transition: `opacity 500ms ease, transform 600ms cubic-bezier(.2,.7,.2,1), visibility 0s linear ${on ? "0s" : "500ms"}`,
                }}
              >
                <Scene />
              </div>
            );
          })}
        </div>
        <div className="absolute inset-x-0 bottom-[18px] z-[3] flex justify-center gap-1.5">
          {SCENES.map((_, i) => (
            <span
              key={i}
              className={cn(
                "block h-2 rounded-lg transition-[width,background-color] duration-300 motion-reduce:transition-none",
                active === i ? "w-6 bg-ink" : "w-2 bg-line-strong",
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
