"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/cn";

/* The hero's sentence, drawn: eight sites around the platform they run
   on. It opens rented (a padlocked vendor box, fees running down every
   line, the vendor's roadmap on top), then, once the headline has
   landed, the lock opens, the box turns lime and "Your platform", the
   sites light up in waves and head office takes the vendor's place. A
   visitor can flip it back and forth. Sites are numbered, never named. */

type State = "rented" | "yours";

const W = 560;
const H = 490;
const CX = 280;
const CY = 272;
const r1 = (n: number) => Math.round(n * 10) / 10;

const SITES = Array.from({ length: 8 }, (_, i) => {
  const a = -Math.PI / 2 + Math.PI / 8 + (i * Math.PI) / 4;
  const c = Math.cos(a);
  const s = Math.sin(a);
  const x = CX + c * 218;
  const y = CY + s * 182;
  return {
    label: `Site ${String(i + 1).padStart(2, "0")}`,
    x: r1(x),
    y: r1(y),
    // from the platform's edge out to the site's pill
    line: `M${r1(CX + c * 100)} ${r1(CY + s * 62)}L${r1(x - c * 50)} ${r1(y - s * 22)}`,
    // fees run the other way: site to platform
    fee: `M${r1(x - c * 50)} ${r1(y - s * 22)}L${r1(CX + c * 100)} ${r1(CY + s * 62)}`,
  };
});

const LINE = {
  fill: "none",
  stroke: "var(--color-ink)",
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

const LOCK_BODY =
  "M30 46h40a6 6 0 0 1 6 6v28a6 6 0 0 1-6 6H30a6 6 0 0 1-6-6V52a6 6 0 0 1 6-6Z";

const at = (ms: number, dur?: number) =>
  ({
    "--d": `${ms}ms`,
    ...(dur ? { "--dur": `${dur}ms` } : {}),
  }) as React.CSSProperties;

// state crossfades: the leaving face shrinks a touch and blurs out
const SWAP =
  "transition-[opacity,transform,filter] duration-500 ease-[cubic-bezier(.23,1,.32,1)] [transform-box:fill-box] origin-center";
const OUT = "scale-95 opacity-0 blur-[2px]";

/**
 * /operators ①, the right half of the hero. Plays rented → yours once,
 * `play` ms after it's first in view (on a phone it sits below the fold),
 * unless the visitor already chose; then it's theirs to flip. Reduced
 * motion: no running fees, no auto-play; it rests on yours.
 */
export function HeroNetwork({
  delay = 0,
  play = 2800,
}: {
  delay?: number;
  play?: number;
}) {
  const [state, setState] = useState<State>("rented");
  const touched = useRef(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let t = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        io.disconnect();
        t = window.setTimeout(
          () => {
            if (!touched.current) setState("yours");
          },
          still ? 0 : play,
        );
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearTimeout(t);
    };
  }, [play]);

  const choose = (s: State) => {
    touched.current = true;
    setState(s);
  };
  const yours = state === "yours";

  return (
    <div
      ref={root}
      className="mx-auto flex w-full max-w-[560px] flex-col items-center"
    >
      <svg
        aria-hidden
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full overflow-visible"
      >
        {/* on top: the vendor's roadmap, or your head office */}
        <g className="fade" style={at(delay + 500)}>
          <g className={cn(SWAP, yours && OUT)}>
            <rect
              x={CX - 70}
              y={4}
              width={140}
              height={40}
              rx={12}
              {...LINE}
              strokeWidth={1.5}
              strokeDasharray="4 4"
              opacity={0.55}
            />
            <text
              x={CX}
              y={29}
              textAnchor="middle"
              fontSize={14}
              fontWeight={600}
              fill="var(--color-faint)"
            >
              Vendor roadmap
            </text>
          </g>
          <g className={cn(SWAP, !yours && OUT)}>
            <path d={`M${CX} 44V${CY - 58}`} {...LINE} strokeWidth={2} />
            <rect
              x={CX - 70}
              y={4}
              width={140}
              height={40}
              rx={12}
              fill="var(--color-ink)"
            />
            <text
              x={CX}
              y={29}
              textAnchor="middle"
              fontSize={14}
              fontWeight={600}
              fill="var(--color-paper)"
            >
              Head office
            </text>
          </g>
        </g>

        {SITES.map((s, i) => (
          <g key={s.label}>
            <path
              d={s.line}
              pathLength={1}
              {...LINE}
              strokeWidth={1.6}
              className="draw"
              style={at(delay + 250 + i * 50, 700)}
            />
            {/* fees running from every site into the rented box */}
            <g
              className="fade motion-reduce:hidden"
              style={at(delay + 900 + i * 50)}
            >
              <g
                className={cn(
                  "transition-opacity duration-300",
                  yours && "opacity-0",
                )}
              >
                <circle r={4.5} fill="var(--color-ink)">
                  <animateMotion
                    path={s.fee}
                    dur="1.6s"
                    // negative: every dot is already mid-run on first paint
                    begin={`-${(i * 0.21).toFixed(2)}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              </g>
            </g>
            <g className="fade" style={at(delay + i * 60)}>
              <g transform={`translate(${s.x} ${s.y})`}>
                <rect
                  x={-50}
                  y={-20}
                  width={100}
                  height={40}
                  rx={12}
                  {...LINE}
                  fill="var(--color-surface)"
                  strokeWidth={1.5}
                />
                <circle
                  cx={-30}
                  r={4.5}
                  stroke="var(--color-ink)"
                  strokeWidth={1}
                  className={cn(
                    "transition-[fill] duration-300",
                    yours ? "fill-lime" : "fill-paper-2",
                  )}
                  // the network switches over in waves
                  style={{ transitionDelay: yours ? `${i * 90}ms` : "0ms" }}
                />
                <text
                  x={7}
                  y={5}
                  textAnchor="middle"
                  fontSize={15}
                  fontWeight={600}
                  fill="var(--color-ink)"
                >
                  {s.label}
                </text>
              </g>
            </g>
          </g>
        ))}

        {/* the platform itself */}
        <g className="fade" style={at(delay + 150)}>
          <g transform={`translate(${CX} ${CY})`}>
            <g className={cn(SWAP, yours && OUT)}>
              <rect
                x={-104}
                y={-60}
                width={208}
                height={120}
                rx={24}
                fill="var(--color-ink)"
              />
              <g
                transform="translate(-82 -26) scale(.52)"
                {...LINE}
                stroke="var(--color-lime)"
                strokeWidth={6}
              >
                <path d="M35 46V34a15 15 0 0 1 30 0v12" />
                <path d={LOCK_BODY} />
                <circle cx="50" cy="61" r="4" />
                <path d="M50 65v8" />
              </g>
              <text fontSize={20} fontWeight={700} fill="var(--color-paper)">
                <tspan x={-24} y={-5}>
                  Rented
                </tspan>
                <tspan x={-24} y={20}>
                  platform
                </tspan>
              </text>
              <text
                y={45}
                textAnchor="middle"
                fontSize={12}
                fill="var(--color-paper)"
                opacity={0.6}
              >
                fee per member, per site
              </text>
            </g>
            <g className={cn(SWAP, !yours && OUT)}>
              <rect
                x={-104}
                y={-60}
                width={208}
                height={120}
                rx={24}
                {...LINE}
                fill="var(--color-lime)"
                strokeWidth={1.6}
              />
              <g
                transform="translate(-82 -26) scale(.52)"
                {...LINE}
                strokeWidth={6}
              >
                <path
                  d="M35 46V30a15 15 0 0 1 29-5"
                  className={cn(
                    "transition-transform delay-150 duration-500 ease-[cubic-bezier(.23,1,.32,1)]",
                    !yours && "translate-y-2",
                  )}
                />
                <path d={LOCK_BODY} />
                <circle cx="50" cy="61" r="4" />
                <path d="M50 65v8" />
              </g>
              <text fontSize={20} fontWeight={800} fill="var(--color-ink)">
                <tspan x={-24} y={-5}>
                  Your
                </tspan>
                <tspan x={-24} y={20}>
                  platform
                </tspan>
              </text>
              <text
                y={45}
                textAnchor="middle"
                fontSize={12}
                fill="var(--color-ink)"
              >
                code, repos, accounts
              </text>
            </g>
          </g>
        </g>
      </svg>

      <div
        role="group"
        aria-label="Show the network on a rented platform or on its own"
        className="fade relative mt-5 grid grid-cols-2 rounded-full bg-surface p-1 text-sm font-semibold shadow-[0_12px_30px_-18px_rgba(21,20,14,0.4)] ring-1 ring-line"
        style={at(delay + 700)}
      >
        <span
          aria-hidden
          className={cn(
            "absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-full bg-ink transition-transform duration-300 ease-[cubic-bezier(.23,1,.32,1)]",
            yours && "translate-x-full",
          )}
        />
        {(["rented", "yours"] as const).map((s) => (
          <button
            key={s}
            type="button"
            aria-pressed={state === s}
            onClick={() => choose(s)}
            className={cn(
              "relative w-24 rounded-full py-2 capitalize transition-colors duration-200",
              state === s
                ? "text-paper"
                : "text-muted hover:bg-lime hover:text-ink",
            )}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
