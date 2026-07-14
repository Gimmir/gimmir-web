import { Fragment } from "react";

import { ArrowRight } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";

const svgProps = {
  viewBox: "0 0 220 120",
  className: "h-full w-full",
  preserveAspectRatio: "xMidYMid meet",
  "aria-hidden": true,
} as const;

/* 1 — a real conversation: founder bubble and your bubble. */
function IlluConversation() {
  return (
    <svg {...svgProps}>
      <g>
        <rect
          x="44"
          y="24"
          width="58"
          height="34"
          rx="11"
          className="fill-lime stroke-ink"
          strokeWidth="2"
        />
        <path
          d="M54 56 L54 68 L68 57 Z"
          className="fill-lime stroke-ink"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        {[60, 73, 86].map((cx) => (
          <circle key={cx} cx={cx} cy="41" r="3" className="fill-ink" />
        ))}
      </g>
      <g className="fi1-b d1">
        <rect
          x="118"
          y="52"
          width="58"
          height="34"
          rx="11"
          className="fill-surface stroke-ink/40"
          strokeWidth="2"
        />
        <path
          d="M166 84 L166 96 L152 85 Z"
          className="fill-surface stroke-ink/40"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <line
          x1="128"
          y1="64"
          x2="166"
          y2="64"
          className="stroke-ink/30"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <line
          x1="128"
          y1="74"
          x2="156"
          y2="74"
          className="stroke-ink/30"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

/* 2 — a roadmap: a route that draws, checkpoints light, a flag at the end. */
function IlluRoadmap() {
  const cps = [
    { x: 74, y: 72, c: "c1" },
    { x: 118, y: 76, c: "c2" },
    { x: 160, y: 50, c: "c3" },
  ];
  return (
    <svg {...svgProps}>
      <path
        d="M34 92 L74 72 L118 76 L160 50 L186 40"
        className="stroke-ink/12"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M34 92 L74 72 L118 76 L160 50 L186 40"
        className="fi2-path stroke-lime"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {cps.map((p) => (
        <circle
          key={p.c}
          cx={p.x}
          cy={p.y}
          r="5.5"
          className={`fi2-cp ${p.c} stroke-ink`}
          strokeWidth="2"
        />
      ))}
      <g className="fi2-flag c4">
        <line
          x1="186"
          y1="40"
          x2="186"
          y2="16"
          className="stroke-ink"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M186 16 L203 21 L186 27 Z"
          className="fill-lime stroke-ink"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

/* 3 — the build: blocks stack up into the finished product. */
function IlluBuild() {
  return (
    <svg {...svgProps}>
      <g>
        <rect
          x="64"
          y="78"
          width="92"
          height="22"
          rx="5"
          className="fill-surface stroke-ink/40"
          strokeWidth="2"
        />
      </g>
      <g className="fi3-blk d1">
        <rect
          x="64"
          y="53"
          width="44"
          height="22"
          rx="5"
          className="fill-surface stroke-ink/40"
          strokeWidth="2"
        />
      </g>
      <g className="fi3-blk d2">
        <rect
          x="112"
          y="53"
          width="44"
          height="22"
          rx="5"
          className="fill-surface stroke-ink/40"
          strokeWidth="2"
        />
      </g>
      <g className="fi3-blk d3">
        <rect
          x="86"
          y="28"
          width="48"
          height="22"
          rx="5"
          className="fill-lime stroke-ink"
          strokeWidth="2"
        />
      </g>
    </svg>
  );
}

const STEPS = [
  {
    tag: "Free · 20 min",
    title: "Founder review call",
    desc: "Talk directly with Nazar and Oleh. We look at your product or plan and give you real input on the spot.",
    illu: <IlluConversation />,
  },
  {
    tag: "Paid",
    title: "Scale Review + Roadmap",
    desc: "We review your product, code, or plan against one question: will it survive growth. You get a clear roadmap of what to build, fix, and in what order.",
    illu: <IlluRoadmap />,
  },
  {
    tag: "Build",
    title: "Dedicated team or turnkey build",
    desc: "Delivered by the team the founders lead. Your review fee is credited toward the build.",
    illu: <IlluBuild />,
  },
];

function FlowArrow() {
  return (
    <div className="flex items-center justify-center py-1 md:py-0">
      <span className="flex size-9 items-center justify-center rounded-full bg-lime text-ink shadow-[0_4px_12px_-6px_rgba(21,20,14,0.4)]">
        <ArrowRight className="size-4 rotate-90 md:rotate-0" />
      </span>
    </div>
  );
}

export function FlowSteps() {
  return (
    <div className="mt-12 grid gap-5 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-stretch md:gap-3">
      {STEPS.map((s, i) => (
        <Fragment key={s.title}>
          <Reveal delay={i * 90} className="h-full">
            <div className="t-card group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-shadow duration-300 ease-out hover:shadow-[0_20px_44px_-26px_rgba(21,20,14,0.3)]">
              <div className="t-illu relative h-36 border-b border-line bg-paper-2">
                <span className="absolute left-4 top-4 z-10 flex size-8 items-center justify-center rounded-full bg-ink font-mono text-[12px] font-semibold text-paper">
                  0{i + 1}
                </span>
                {s.illu}
              </div>
              <div className="flex flex-1 flex-col gap-3 p-7 md:p-8">
                <span className="inline-flex w-fit items-center rounded-full bg-lime px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-ink">
                  {s.tag}
                </span>
                <h3 className="text-xl font-bold tracking-tight">{s.title}</h3>
                <p className="leading-relaxed text-muted">{s.desc}</p>
              </div>
            </div>
          </Reveal>
          {i < STEPS.length - 1 ? <FlowArrow /> : null}
        </Fragment>
      ))}
    </div>
  );
}
