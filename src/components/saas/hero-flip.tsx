"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/cn";

/* The hero's sentence, drawn, the /operators way: first the business as
   it runs today (chats, a spreadsheet, PDFs, payment and booking links,
   each its own tool), then, once it's in view, those cards fold into one
   app with your brand on it, a dashboard of subscribers, members around
   it and "Owner: you". A visitor can flip it back and forth. */

type State = "today" | "saas";

const W = 560;
const H = 500;
const CX = 280;
const CY = 250;
const r1 = (n: number) => Math.round(n * 10) / 10;

const INK = "var(--color-ink)";
const PAPER = "var(--color-paper)";
const PAPER2 = "var(--color-paper-2)";
const MUTED = "var(--color-muted)";

// fold/unfold: cards shrink into the middle, the app grows out of it
const EASE = "duration-700 ease-[cubic-bezier(.23,1,.32,1)]";

type CardSpec = {
  x: number;
  y: number;
  w: number;
  h: number;
  r: number;
  body: React.ReactNode;
};

const CARDS: CardSpec[] = [
  {
    x: 20,
    y: 40,
    w: 210,
    h: 120,
    r: -6,
    body: (
      <>
        <text x={16} y={28} fontSize={14} fontWeight={700}>
          Chats
        </text>
        <rect x={138} y={14} width={58} height={20} rx={10} fill={INK} />
        <text
          x={167}
          y={28}
          textAnchor="middle"
          fontSize={10}
          fontWeight={600}
          fill={PAPER}
        >
          Unread
        </text>
        {["Where is my program?", "Sent the payment", "Can we move Thu?"].map(
          (t, i) => (
            <g key={t}>
              <rect
                x={16}
                y={44 + i * 24}
                width={130 + i * 8}
                height={18}
                rx={9}
                fill={PAPER2}
              />
              <text x={26} y={57 + i * 24} fontSize={10.5}>
                {t}
              </text>
            </g>
          ),
        )}
      </>
    ),
  },
  {
    x: 290,
    y: 70,
    w: 230,
    h: 110,
    r: 5,
    body: (
      <>
        <text x={16} y={28} fontSize={13} fontWeight={700}>
          clients_FINAL_v3.xlsx
        </text>
        {Array.from({ length: 12 }, (_, k) => (
          <rect
            key={k}
            x={16 + (k % 4) * 50}
            y={42 + Math.floor(k / 4) * 18}
            width={44}
            height={12}
            rx={3}
            fill={k < 4 ? INK : PAPER2}
            opacity={k < 4 ? 0.75 : 1}
          />
        ))}
      </>
    ),
  },
  {
    x: 60,
    y: 230,
    w: 200,
    h: 90,
    r: 3,
    body: (
      <>
        <rect x={16} y={18} width={30} height={18} rx={4} fill={INK} />
        <text
          x={31}
          y={31}
          textAnchor="middle"
          fontSize={9}
          fontWeight={700}
          fill={PAPER}
        >
          PDF
        </text>
        <text x={56} y={31} fontSize={12.5} fontWeight={700}>
          Program_week_7.pdf
        </text>
        <text x={16} y={62} fontSize={11} fill={MUTED}>
          Sent to every client, one by one
        </text>
      </>
    ),
  },
  {
    x: 310,
    y: 250,
    w: 200,
    h: 96,
    r: -4,
    body: (
      <>
        <text x={16} y={28} fontSize={13} fontWeight={700}>
          Payment links
        </text>
        <text x={16} y={52} fontSize={11} fill={MUTED}>
          Sent by hand, chased by hand
        </text>
        <rect
          x={16}
          y={64}
          width={80}
          height={18}
          rx={9}
          fill="none"
          stroke={INK}
          strokeWidth={1.2}
        />
        <text x={56} y={77} textAnchor="middle" fontSize={10} fontWeight={600}>
          Overdue
        </text>
      </>
    ),
  },
  {
    x: 150,
    y: 380,
    w: 220,
    h: 80,
    r: 2,
    body: (
      <>
        <text x={16} y={28} fontSize={13} fontWeight={700}>
          Booking link
        </text>
        <text x={16} y={52} fontSize={11} fill={MUTED}>
          Another tool, another login
        </text>
      </>
    ),
  },
];

const RING = Array.from({ length: 14 }, (_, i) => {
  const a = (i / 14) * Math.PI * 2 - Math.PI / 2;
  return {
    x: r1(CX + Math.cos(a) * 230),
    y: r1(CY + Math.sin(a) * 205),
    big: i % 3 === 0,
    lime: i % 4 === 0,
  };
});

const BARS = [0.35, 0.5, 0.45, 0.7, 0.62, 0.85, 1];
const ROWS = [62, 100, 138, 176];

/**
 * /build-your-saas ①, the right half of the hero. Plays today → your
 * SaaS once, `play` ms after it's first in view, unless the visitor
 * already chose; then it's theirs to flip. Reduced motion rests on the
 * SaaS.
 */
export function SaasHeroFlip({
  delay = 0,
  play = 2400,
}: {
  delay?: number;
  play?: number;
}) {
  const [state, setState] = useState<State>("today");
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
            if (!touched.current) setState("saas");
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
  const saas = state === "saas";
  const at = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

  return (
    <div
      ref={root}
      className="mx-auto flex w-full max-w-[560px] flex-col items-center"
    >
      <svg
        aria-hidden
        viewBox={`0 0 ${W} ${H}`}
        className="fade h-auto w-full overflow-visible"
        style={at(delay)}
      >
        {/* the SaaS: members around it, then the dashboard and the app */}
        <g
          className={cn(
            "transition-opacity duration-500",
            saas ? "opacity-100" : "opacity-0",
          )}
        >
          {RING.map((d, i) => (
            <g
              key={i}
              className={cn(
                "transition-[opacity,transform] duration-500 ease-[cubic-bezier(.23,1,.32,1)] [transform-box:fill-box] origin-center",
                saas ? "scale-100 opacity-100" : "scale-50 opacity-0",
              )}
              style={{ transitionDelay: saas ? `${300 + i * 50}ms` : "0ms" }}
            >
              <path
                d={`M${d.x} ${d.y}L${CX} ${CY}`}
                stroke={INK}
                strokeOpacity={0.14}
                strokeWidth={1.2}
              />
              <circle
                cx={d.x}
                cy={d.y}
                r={d.big ? 12 : 9}
                fill={d.lime ? "var(--color-lime)" : "var(--color-surface)"}
                stroke={INK}
                strokeWidth={1.4}
              />
            </g>
          ))}
        </g>

        <g
          className={cn(
            "transition-[opacity,transform] [transform-box:fill-box] origin-center",
            EASE,
            saas ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0",
          )}
          style={{ transitionDelay: saas ? "150ms" : "0ms" }}
        >
          <g transform="translate(300 110)">
            <rect
              width={210}
              height={140}
              rx={14}
              fill="var(--color-surface)"
              stroke={INK}
              strokeWidth={1.6}
            />
            <path d="M0 26H210" stroke={INK} strokeWidth={1.2} />
            <circle cx={14} cy={13} r={3} fill={PAPER2} />
            <circle cx={24} cy={13} r={3} fill={PAPER2} />
            <text x={16} y={48} fontSize={12} fontWeight={700}>
              Dashboard
            </text>
            <text
              x={194}
              y={48}
              textAnchor="end"
              fontSize={10}
              fill="var(--color-faint)"
            >
              Subscribers
            </text>
            {BARS.map((h, k) => (
              <rect
                key={k}
                x={16 + k * 26}
                y={120 - h * 56}
                width={18}
                height={h * 56}
                rx={3}
                fill={k === BARS.length - 1 ? "var(--color-lime)" : INK}
                stroke={k === BARS.length - 1 ? INK : "none"}
                strokeWidth={1}
                opacity={k === BARS.length - 1 ? 1 : 0.8}
              />
            ))}
          </g>
        </g>

        <g
          className={cn(
            "transition-[opacity,transform] [transform-box:fill-box] origin-center",
            EASE,
            saas ? "scale-100 opacity-100" : "scale-75 opacity-0",
          )}
        >
          <g transform="translate(130 130)">
            <rect width={140} height={270} rx={26} fill={INK} />
            <rect x={8} y={8} width={124} height={254} rx={20} fill={PAPER} />
            <circle
              cx={30}
              cy={36}
              r={10}
              fill="var(--color-lime)"
              stroke={INK}
              strokeWidth={1.2}
            />
            <text x={46} y={40} fontSize={11.5} fontWeight={800}>
              Your brand
            </text>
            {ROWS.map((y, k) => (
              <g key={y}>
                <rect
                  x={18}
                  y={y}
                  width={104}
                  height={30}
                  rx={9}
                  fill="var(--color-surface)"
                  stroke="var(--color-line)"
                />
                <rect
                  x={26}
                  y={y + 10}
                  width={40 + k * 6}
                  height={8}
                  rx={4}
                  fill={INK}
                  opacity={0.8}
                />
                <rect
                  x={94}
                  y={y + 9}
                  width={20}
                  height={12}
                  rx={6}
                  fill={k === 0 ? "var(--color-lime)" : PAPER2}
                />
              </g>
            ))}
            <rect x={18} y={220} width={104} height={26} rx={13} fill={INK} />
            <text
              x={70}
              y={237}
              textAnchor="middle"
              fontSize={10.5}
              fontWeight={700}
              fill={PAPER}
            >
              Subscribe
            </text>
          </g>
        </g>

        <g
          className={cn(
            "transition-[opacity,transform] [transform-box:fill-box] origin-center",
            EASE,
            saas ? "scale-100 opacity-100" : "scale-90 opacity-0",
          )}
          style={{ transitionDelay: saas ? "700ms" : "0ms" }}
        >
          <g transform="translate(340 290)">
            <rect
              width={150}
              height={40}
              rx={20}
              fill="var(--color-lime)"
              stroke={INK}
              strokeWidth={1.5}
            />
            <text
              x={75}
              y={25}
              textAnchor="middle"
              fontSize={12.5}
              fontWeight={700}
            >
              Owner: you
            </text>
          </g>
        </g>

        {/* today: every tool its own card, folding into the app */}
        {CARDS.map((c, i) => {
          const dx = r1(CX - (c.x + c.w / 2));
          const dy = r1(CY - (c.y + c.h / 2));
          return (
            <g
              key={i}
              className={cn(
                "transition-[opacity,transform]",
                EASE,
                saas ? "opacity-0" : "opacity-100",
              )}
              style={{
                transform: saas
                  ? `translate(${dx}px, ${dy}px) scale(0.3)`
                  : "none",
                transformBox: "fill-box",
                transformOrigin: "center",
                transitionDelay: saas ? `${i * 40}ms` : `${i * 40}ms`,
              }}
            >
              <g transform={`translate(${c.x} ${c.y}) rotate(${c.r})`}>
                <rect
                  width={c.w}
                  height={c.h}
                  rx={14}
                  fill="var(--color-surface)"
                  stroke={INK}
                  strokeWidth={1.4}
                />
                <g fill={INK}>{c.body}</g>
              </g>
            </g>
          );
        })}
      </svg>

      <div
        role="group"
        aria-label="Show the business today or as its own SaaS"
        className="fade relative mt-4 grid grid-cols-2 rounded-full bg-surface p-1 text-sm font-semibold shadow-[0_12px_30px_-18px_rgba(21,20,14,0.4)] ring-1 ring-line"
        style={at(delay + 500)}
      >
        <span
          aria-hidden
          className={cn(
            "absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-full bg-ink transition-transform duration-300 ease-[cubic-bezier(.23,1,.32,1)]",
            saas && "translate-x-full",
          )}
        />
        {(
          [
            ["today", "Today"],
            ["saas", "Your SaaS"],
          ] as const
        ).map(([s, label]) => (
          <button
            key={s}
            type="button"
            aria-pressed={state === s}
            onClick={() => choose(s)}
            className={cn(
              "relative w-28 rounded-full py-2 transition-colors duration-200",
              state === s
                ? "text-paper"
                : "text-muted hover:bg-lime hover:text-ink",
            )}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
