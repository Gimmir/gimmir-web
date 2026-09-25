"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

import { BuildArt, type BuildArtKind } from "@/components/home/build-art";
import { ArrowRight } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

type BuildRow = {
  title: string;
  product?: string;
  href: string;
  art: BuildArtKind;
};

const CARD = { w: 360, h: 260, gap: 36 };
/** Share of the remaining distance covered per frame: ~120ms of lag. */
const FOLLOW = 0.2;
const FINE = "(hover: hover) and (pointer: fine)";

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(FINE);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

/**
 * ⑥'s rows, big, each a link. With a real pointer, a paper card rides
 * beside the cursor (a short lag, like a hand following) and shows what
 * the hovered row is: a drawing, or Jimmy's screen. Position is written
 * straight to transform each frame, so nothing re-renders while it moves.
 * Touch screens get the plain list.
 */
export function BuildList({
  rows,
  delay,
}: {
  rows: readonly BuildRow[];
  delay: number;
}) {
  const fine = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(FINE).matches,
    () => false,
  );
  const wrap = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const frame = useRef(0);
  const [active, setActive] = useState<number | null>(null);
  const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  const place = () => {
    const el = card.current;
    const box = wrap.current;
    if (!el || !box) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const k = still ? 1 : FOLLOW;
    pos.current.x += (target.current.x - pos.current.x) * k;
    pos.current.y += (target.current.y - pos.current.y) * k;
    // beside the cursor, flipping to its left near the right edge
    const right = pos.current.x + CARD.gap + CARD.w > box.clientWidth;
    const x = right
      ? pos.current.x - CARD.gap - CARD.w
      : pos.current.x + CARD.gap;
    const y = pos.current.y - CARD.h / 2;
    el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    const dx = target.current.x - pos.current.x;
    const dy = target.current.y - pos.current.y;
    frame.current =
      Math.abs(dx) + Math.abs(dy) > 0.4 ? requestAnimationFrame(place) : 0;
  };

  const onMove = (e: React.PointerEvent) => {
    if (!fine || !wrap.current) return;
    const r = wrap.current.getBoundingClientRect();
    target.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    if (!frame.current) frame.current = requestAnimationFrame(place);
  };

  const onEnter = (e: React.PointerEvent) => {
    if (!fine || !wrap.current) return;
    // start where the pointer is, not flying in from the corner
    const r = wrap.current.getBoundingClientRect();
    target.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    pos.current = { ...target.current };
    place();
  };

  return (
    <div
      ref={wrap}
      onPointerEnter={onEnter}
      onPointerMove={onMove}
      onPointerLeave={() => setActive(null)}
      className="relative mt-10 md:mt-14"
    >
      <ul>
        {rows.map((r, i) => (
          <li
            key={r.title}
            className="fade border-t border-line-dark last:border-b"
            style={d(delay + i * 70)}
          >
            <Link
              href={r.href}
              onPointerEnter={() => setActive(i)}
              className="group grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-4 py-6 md:grid-cols-[1fr_auto_auto] md:py-7"
            >
              <span className="display text-[clamp(1.75rem,0.9rem+2.6vw,3.5rem)] leading-[1.04] transition-transform duration-300 ease-[cubic-bezier(.23,1,.32,1)] group-hover:translate-x-3">
                {r.title}
              </span>
              <span className="col-start-2 row-start-1 flex size-11 shrink-0 items-center justify-center rounded-full border md:col-start-3 border-line-dark transition-[background-color,border-color,color] duration-200 group-hover:border-lime group-hover:bg-lime group-hover:text-ink">
                <ArrowRight className="size-[18px]" />
              </span>
              <span
                className={cn(
                  "col-span-2 w-fit whitespace-nowrap rounded-full border px-3.5 py-1.5 text-[13px] md:col-span-1 md:col-start-2 md:row-start-1",
                  r.product
                    ? "border-lime/50 text-lime"
                    : "border-line-dark text-paper/70",
                )}
              >
                {r.product ? `Public case · ${r.product}` : "Under NDA"}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {fine && (
        <div
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 z-10"
        >
          <div
            ref={card}
            className="will-change-transform"
            style={{ width: CARD.w, height: CARD.h }}
          >
            <div
              className={cn(
                "relative h-full w-full overflow-hidden rounded-[24px] bg-paper shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)] transition-[opacity,scale] ease-[cubic-bezier(.23,1,.32,1)]",
                active === null
                  ? "scale-95 opacity-0 duration-150"
                  : "scale-100 opacity-100 duration-200",
              )}
            >
              {rows.map((r, i) => (
                <div
                  key={r.title}
                  className={cn(
                    "absolute inset-0 transition-opacity duration-200",
                    active === i ? "opacity-100" : "opacity-0",
                  )}
                >
                  <BuildArt kind={r.art} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
