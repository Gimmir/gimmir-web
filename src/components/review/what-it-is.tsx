import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import type { REVIEW_QUERY_RESULT } from "@/sanity/types";

const svgProps = {
  viewBox: "0 0 220 120",
  className: "h-full w-full",
  preserveAspectRatio: "xMidYMid meet",
  "aria-hidden": true,
} as const;

/* 01 — recurring memberships. Anchor: the front membership card. On hover the
   back of the stack fans out and a renewal badge stamps on. */
function IlluSubscriptions() {
  const back = [
    { cls: "wi1-c3", x: 84, y: 50, stroke: "stroke-ink/25", delay: 0 },
    { cls: "wi1-c2", x: 78, y: 45, stroke: "stroke-ink/40", delay: 70 },
  ];
  return (
    <svg {...svgProps}>
      {back.map((c) => (
        <g
          key={c.cls}
          className={`wi1-card ${c.cls}`}
          style={{ transitionDelay: `${c.delay}ms` }}
        >
          <rect
            x={c.x}
            y={c.y}
            width="74"
            height="44"
            rx="8"
            className={`fill-surface ${c.stroke}`}
            strokeWidth="2"
          />
        </g>
      ))}
      {/* anchor — front active card */}
      <g>
        <rect
          x="72"
          y="40"
          width="74"
          height="44"
          rx="8"
          className="fill-paper stroke-ink"
          strokeWidth="2"
        />
        <rect
          x="80"
          y="48"
          width="17"
          height="13"
          rx="3"
          className="fill-lime stroke-ink"
          strokeWidth="1.5"
        />
        <line
          x1="80"
          y1="70"
          x2="138"
          y2="70"
          className="stroke-ink/25"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <line
          x1="80"
          y1="77"
          x2="120"
          y2="77"
          className="stroke-ink/25"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </g>
      <g transform="translate(150,42)">
        <g className="wi1-badge">
          <circle r="14" className="fill-lime stroke-ink" strokeWidth="2" />
          <path
            d="M -3.5 -3 A 5.5 5.5 0 1 1 -5.5 2.5"
            className="stroke-ink"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M -7 -3 L -3.5 -5 L -1.5 -1.5"
            className="stroke-ink"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </g>
    </svg>
  );
}

/* 02 — payments routed from one hub to many locations. Anchor: hub + pins.
   On hover the lime payout routes draw out to each location. */
function Pin({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <path
        d="M0 -11 C 6 -11 10 -6 10 -1 C 10 6 0 13 0 13 C 0 13 -10 6 -10 -1 C -10 -6 -6 -11 0 -11 Z"
        className="fill-surface stroke-ink"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="0" cy="-1" r="3.2" className="fill-ink" />
    </g>
  );
}
function IlluPayments() {
  const hub = { x: 54, y: 60 };
  const pins = [
    { x: 168, y: 26 },
    { x: 180, y: 62 },
    { x: 168, y: 98 },
  ];
  return (
    <svg {...svgProps}>
      {pins.map((p, i) => (
        <line
          key={`l-${i}`}
          x1={hub.x}
          y1={hub.y}
          x2={p.x}
          y2={p.y}
          pathLength={150}
          className="wi2-line stroke-lime"
          strokeWidth="2.5"
          strokeLinecap="round"
          style={{ transitionDelay: `${i * 90}ms` }}
        />
      ))}
      {pins.map((p, i) => (
        <Pin key={`p-${i}`} x={p.x} y={p.y} />
      ))}
      <g transform={`translate(${hub.x},${hub.y})`}>
        <circle r="17" className="fill-lime stroke-ink" strokeWidth="2" />
        <path
          d="M 3 -7 C -3 -7 -3 -1 0 -1 C 3 -1 3 5 -3 5"
          className="stroke-ink"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <line
          x1="0"
          y1="-9"
          x2="0"
          y2="7"
          className="stroke-ink"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

/* 03 — the booking grid. Anchor: the grid plus a few booked slots. On hover the
   rest fill lime, row by row, under load. */
function IlluBooking() {
  const cols = 4;
  const rows = 3;
  const cw = 26;
  const ch = 22;
  const gx = 7;
  const gy = 7;
  const gridW = cols * cw + (cols - 1) * gx;
  const startX = 110 - gridW / 2;
  const startY = 30;
  const alwaysOn = new Set([0, 5, 10]);
  const fillOn = [1, 3, 6, 7, 9];
  const cells = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const i = r * cols + c;
      cells.push({
        i,
        x: startX + c * (cw + gx),
        y: startY + r * (ch + gy),
        on: alwaysOn.has(i),
        fill: fillOn.includes(i),
        delay: fillOn.indexOf(i) * 55,
      });
    }
  }
  return (
    <svg {...svgProps}>
      <rect
        x={startX}
        y={startY - 13}
        width={gridW}
        height="8"
        rx="3"
        className="fill-ink/15"
      />
      {cells.map((c) => (
        <rect
          key={c.i}
          x={c.x}
          y={c.y}
          width={cw}
          height={ch}
          rx="4"
          className={
            c.on
              ? "fill-lime stroke-ink"
              : c.fill
                ? "wi3-slot wi3-on stroke-ink"
                : "fill-surface stroke-ink/20"
          }
          strokeWidth="1.8"
          style={c.fill ? { transitionDelay: `${c.delay}ms` } : undefined}
        />
      ))}
    </svg>
  );
}

/* 04 — one data model branching into many studios / franchises. Anchor: the
   root entity and the studio tables. On hover the relations draw, top to bottom. */
function IlluDataModel() {
  const root = { x: 46, y: 60 };
  const children = [
    { x: 152, y: 28 },
    { x: 152, y: 60 },
    { x: 152, y: 92 },
  ];
  return (
    <svg {...svgProps}>
      {children.map((c, i) => (
        <path
          key={`k-${i}`}
          d={`M ${root.x + 22} ${root.y} C ${root.x + 58} ${root.y}, ${c.x - 56} ${c.y}, ${c.x - 22} ${c.y}`}
          pathLength={150}
          className="wi4-link stroke-lime"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          style={{ transitionDelay: `${i * 120}ms` }}
        />
      ))}
      {/* root entity */}
      <g transform={`translate(${root.x},${root.y})`}>
        <rect
          x="-22"
          y="-27"
          width="44"
          height="54"
          rx="7"
          className="fill-lime stroke-ink"
          strokeWidth="2"
        />
        <line
          x1="-22"
          y1="-13"
          x2="22"
          y2="-13"
          className="stroke-ink"
          strokeWidth="2"
        />
        {[-4, 5, 14].map((y) => (
          <line
            key={y}
            x1="-14"
            y1={y}
            x2="14"
            y2={y}
            className="stroke-ink/45"
            strokeWidth="2"
            strokeLinecap="round"
          />
        ))}
      </g>
      {/* studio entities */}
      {children.map((c, i) => (
        <g key={`n-${i}`} transform={`translate(${c.x},${c.y})`}>
          <rect
            x="-22"
            y="-15"
            width="44"
            height="30"
            rx="6"
            className="fill-surface stroke-ink"
            strokeWidth="2"
          />
          <line
            x1="-22"
            y1="-3"
            x2="22"
            y2="-3"
            className="stroke-ink/30"
            strokeWidth="2"
          />
          <line
            x1="-13"
            y1="6"
            x2="9"
            y2="6"
            className="stroke-ink/30"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>
      ))}
    </svg>
  );
}

/* 05 — the due-diligence magnifier sweeps across the security shield. */
function IlluSecurity() {
  return (
    <svg {...svgProps}>
      <g className="wi5-shield">
        <path
          d="M110 22 L140 34 V60 C140 82 127 94 110 100 C93 94 80 82 80 60 V34 Z"
          className="fill-lime stroke-ink"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <circle cx="110" cy="55" r="6" className="fill-ink" />
        <path
          d="M110 55 L110 70"
          className="stroke-ink"
          strokeWidth="4.5"
          strokeLinecap="round"
        />
      </g>
      <g transform="translate(110,58)">
        <g className="wi5-glass">
          <circle r="15" className="fill-ink/5 stroke-ink" strokeWidth="2.5" />
          <line
            x1="11"
            y1="11"
            x2="23"
            y2="23"
            className="stroke-ink"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </g>
      </g>
    </svg>
  );
}

/* 06 — the AI spark splits: a value path to a check, a faded distraction path
   to a dead end. Anchor: the whole composition. On hover the value route
   lights up lime. */
function IlluAI() {
  const node = { x: 52, y: 60 };
  const valuePath = `M ${node.x + 12} ${node.y - 6} C 100 38, 128 32, 156 32`;
  return (
    <svg {...svgProps}>
      <path
        d={`M ${node.x + 12} ${node.y + 6} C 100 82, 128 88, 156 88`}
        className="stroke-ink/25"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        strokeDasharray="2 7"
      />
      {/* value route — faint base + lime draw on top */}
      <path
        d={valuePath}
        className="stroke-ink/15"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d={valuePath}
        pathLength={150}
        className="wi6-value stroke-lime"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      <g transform="translate(170,88)">
        <circle r="11" className="fill-surface stroke-ink/30" strokeWidth="2" />
        <path
          d="M -4 -4 L 4 4 M 4 -4 L -4 4"
          className="stroke-ink/35"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>
      <g transform="translate(170,32)">
        <circle r="14" className="fill-lime stroke-ink" strokeWidth="2" />
        <path
          d="M -5.5 0 L -1.5 4.5 L 6.5 -5.5"
          className="stroke-ink"
          strokeWidth="2.6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <g transform={`translate(${node.x},${node.y})`}>
        <circle r="17" className="fill-ink" />
        <path
          d="M0 -9 C 1.6 -2.4 2.4 -1.6 9 0 C 2.4 1.6 1.6 2.4 0 9 C -1.6 2.4 -2.4 1.6 -9 0 C -2.4 -1.6 -1.6 -2.4 0 -9 Z"
          className="fill-lime"
        />
      </g>
    </svg>
  );
}

const FOCUS_ILLUSTRATIONS = [
  <IlluSubscriptions key="subscriptions" />,
  <IlluPayments key="payments" />,
  <IlluBooking key="booking" />,
  <IlluDataModel key="data-model" />,
  <IlluSecurity key="security" />,
  <IlluAI key="ai" />,
];

export function WhatItIsSection({
  data,
}: {
  data: NonNullable<REVIEW_QUERY_RESULT>;
}) {
  const focusItems = data.focusItems ?? [];

  return (
    <section
      id="start"
      className="scroll-mt-24 border-t border-line py-20 md:py-28"
    >
      <Container>
        <Reveal>
          <SectionHeader
            index="02"
            titleMax="max-w-[36ch]"
            introMax="max-w-4xl"
            title={
              <>
                {data.whatHeading}
                {data.whatAccent ? (
                  <>
                    {" "}
                    <span className="font-serif font-normal italic">
                      {data.whatAccent}
                    </span>
                  </>
                ) : null}
              </>
            }
            intro={data.whatIntro}
          />
        </Reveal>

        <Reveal>
          <p className="mt-12 font-mono text-sm uppercase tracking-wider text-muted">
            {data.focusLabel}
          </p>
        </Reveal>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {focusItems.map((title, i) => (
            <Reveal key={i} delay={(i % 3) * 70} className="h-full">
              <div className="w-card group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-shadow duration-300 ease-out hover:shadow-[0_20px_44px_-26px_rgba(21,20,14,0.3)]">
                <div className="t-illu relative h-36 border-b border-line bg-paper-2">
                  <span className="absolute left-4 top-4 z-10 rounded-md bg-ink px-2 py-1 font-mono text-[11px] font-semibold leading-none text-paper">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {FOCUS_ILLUSTRATIONS[i]}
                </div>
                <div className="flex flex-1 items-center p-6 md:p-7">
                  <h3 className="text-lg font-bold leading-snug tracking-tight md:text-xl">
                    {title}
                  </h3>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
