"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { operators } from "@/content/operators";
import { cn } from "@/lib/cn";

// measure before paint on the client; plain effect on the server
const useIsoLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

/* The six steps as one route. From lg they zigzag (odd steps above the
   line, even below) along a drawn wave; on phones they stack on a rail.
   Either way the line fills lime down to where you're reading, and each
   number turns solid once the line has reached it. With no JS or reduced
   motion the route rests finished, fully drawn. */

const BAND = 150;
const Y = [34, 116];
const INSET = 18;
// phones: where a step's stop sits below the top of its item
const DOT = 27;

function wave(w: number, n: number) {
  const col = w / n;
  const pts = Array.from({ length: n }, (_, i) => ({
    x: i * col + INSET,
    y: Y[i % 2],
  }));
  let d = `M${pts[0].x} ${pts[0].y}`;
  for (let i = 1; i < n; i++) {
    const mx = (pts[i - 1].x + pts[i].x) / 2;
    d += `C${mx} ${pts[i - 1].y} ${mx} ${pts[i].y} ${pts[i].x} ${pts[i].y}`;
  }
  const last = pts[n - 1];
  // care goes on: the route runs out past the last stop
  const tail = `M${last.x} ${last.y}C${last.x + 80} ${last.y} ${last.x + 80} ${BAND / 2} ${w} ${BAND / 2}`;
  return { d, tail, pts };
}

type Geo = { lg: boolean; tops: number[] };

export function MigrationRoute({ after }: { after: number }) {
  const { steps } = operators.migration;
  const n = steps.length;
  const list = useRef<HTMLOListElement>(null);
  const band = useRef<HTMLLIElement>(null);
  // measure() reads the ref; rendering reads the state
  const geoRef = useRef<Geo>({ lg: true, tops: [] });
  const [geo, setGeo] = useState<Geo>({ lg: true, tops: [] });
  const [w, setW] = useState(1200);
  const [rail, setRail] = useState<[number, number] | null>(null);
  // how far the route is drawn, 0..1; finished until measured
  const [p, setP] = useState(1);

  useIsoLayoutEffect(() => {
    const el = list.current;
    if (!el) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lgQuery = window.matchMedia("(min-width: 1024px)");
    let raf = 0;

    const measure = () => {
      raf = 0;
      if (still) return;
      const r = el.getBoundingClientRect();
      const line = window.innerHeight * 0.62;
      const { lg, tops } = geoRef.current;
      let next: number;
      if (lg || tops.length < 2) {
        next = (line - r.top) / (r.height * 0.9);
      } else {
        const first = tops[0];
        const last = tops[tops.length - 1];
        next = (line - r.top - first) / (last - first);
      }
      next = Math.min(1, Math.max(0, next));
      setP((prev) => (Math.abs(prev - next) > 0.002 ? next : prev));
    };
    const schedule = () => {
      if (!raf) raf = window.requestAnimationFrame(measure);
    };

    const ro = new ResizeObserver(() => {
      const lg = lgQuery.matches;
      const items = Array.from(
        el.querySelectorAll<HTMLLIElement>("li[data-step]"),
      );
      const tops = items.map((li) => li.offsetTop + DOT);
      geoRef.current = { lg, tops };
      setGeo({ lg, tops });
      if (band.current) setW(Math.round(band.current.clientWidth) || 1200);
      if (tops.length > 1) setRail([tops[0], tops[tops.length - 1]]);
      schedule();
    });
    ro.observe(el);
    window.addEventListener("scroll", schedule, { passive: true });
    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", schedule);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  const { d, tail, pts } = wave(w, n);
  const { tops } = geo;
  const threshold = (i: number) =>
    !geo.lg && tops.length === n
      ? (tops[i] - tops[0]) / (tops[n - 1] - tops[0])
      : i / (n - 1);
  const lit = (i: number) => p > 0.01 && p >= threshold(i) * 0.97;
  const at = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;
  const railBox = rail
    ? { top: rail[0], height: rail[1] - rail[0] }
    : { top: DOT, bottom: 40 };

  return (
    <div className="relative mt-12 md:mt-14">
      {/* phones: the rail the steps hang from, filling as you read */}
      <div
        aria-hidden
        className="absolute left-[15px] lg:hidden"
        style={railBox}
      >
        <span className="absolute inset-y-0 left-0 w-0.5 bg-[repeating-linear-gradient(to_bottom,rgb(21_20_14/0.25)_0_5px,transparent_5px_11px)]" />
        <span
          className="absolute inset-y-0 -left-0.5 w-1.5 origin-top rounded-full bg-lime"
          style={{ transform: `scaleY(${p})` }}
        />
        <span
          className="absolute inset-y-0 left-[0.25px] w-[1.5px] origin-top bg-ink"
          style={{ transform: `scaleY(${p})` }}
        />
      </div>

      <ol
        ref={list}
        className="relative lg:grid lg:grid-cols-6 lg:grid-rows-[auto_150px_auto]"
      >
        {steps.map((s, i) => (
          <li
            key={s.name}
            data-step
            data-on={lit(i)}
            className={cn(
              "fade group relative pl-12 lg:pb-0 lg:pl-0 lg:pr-8",
              i < n - 1 && "pb-10",
              i % 2
                ? "lg:row-start-3 lg:pt-5"
                : "lg:row-start-1 lg:self-end lg:pb-5",
            )}
            style={{
              ...at(after + i * 80),
              gridColumn: `${i + 1} / span ${i === n - 1 ? 1 : 2}`,
            }}
          >
            {/* phones: this step's stop on the rail */}
            <span
              aria-hidden
              className="absolute left-[7px] size-[18px] rounded-full border-[1.5px] border-ink bg-paper transition-colors duration-300 group-data-[on=true]:bg-lime lg:hidden"
              style={{ top: DOT - 9 }}
            />
            <span
              aria-hidden
              className="display block text-[2.75rem] leading-[0.9] text-transparent transition-colors duration-300 [-webkit-text-stroke:1.3px_var(--color-ink)] group-data-[on=true]:text-ink md:text-[3.5rem] lg:text-[4rem]"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-2 text-[1.375rem] font-bold tracking-[-0.01em]">
              {s.name}
            </h3>
            <p className="mt-2 w-fit rounded-full bg-paper-2 px-2.5 py-1 text-[13px] font-medium text-muted">
              {s.time}
            </p>
            <p className="mt-3 max-w-[36ch] text-[15px] leading-relaxed text-muted">
              {s.body}
            </p>
          </li>
        ))}

        {/* lg: the drawn route between the two rows */}
        <li
          ref={band}
          aria-hidden
          className="fade col-span-6 row-start-2 hidden lg:block"
          style={at(after + 200)}
        >
          <svg
            width="100%"
            height={BAND}
            viewBox={`0 0 ${w} ${BAND}`}
            className="overflow-visible"
          >
            {[d, tail].map((path) => (
              <path
                key={path}
                d={path}
                fill="none"
                stroke="var(--color-ink)"
                strokeOpacity={0.28}
                strokeWidth={1.6}
                strokeDasharray="5 7"
              />
            ))}
            {[
              { stroke: "var(--color-lime)", width: 9 },
              { stroke: "var(--color-ink)", width: 1.8 },
            ].map((l) => (
              <path
                key={l.width}
                d={d}
                fill="none"
                stroke={l.stroke}
                strokeWidth={l.width}
                strokeLinecap="round"
                pathLength={1}
                strokeDasharray="1 1"
                strokeDashoffset={1 - p}
              />
            ))}
            {pts.map((pt, i) => (
              <circle
                key={i}
                cx={pt.x}
                cy={pt.y}
                r={8}
                stroke="var(--color-ink)"
                strokeWidth={1.6}
                className={cn(
                  "transition-[fill] duration-300",
                  lit(i) ? "fill-lime" : "fill-paper",
                )}
              />
            ))}
          </svg>
        </li>
      </ol>
    </div>
  );
}
