import type { NdaKind } from "@/content/work";

/* Line silhouettes for the NDA cards: the shape of the kind of product,
   never the product. Lime on ink; the one bright stroke is the part that
   matters, the rest is faint. Each draws itself when the section plays. */

const BRIGHT = {
  fill: "none",
  stroke: "var(--color-lime)",
  strokeWidth: 1.4,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

const FAINT = {
  fill: "none",
  stroke: "rgb(201 242 61 / 0.35)",
  strokeWidth: 1,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

// drawn parts get pathLength 1 for the Stage's .draw
const draw = { pathLength: 1, className: "draw" } as const;

function Device() {
  return (
    <>
      <rect
        x="70"
        y="30"
        width="60"
        height="100"
        rx="12"
        {...BRIGHT}
        {...draw}
      />
      <rect x="80" y="48" width="40" height="30" rx="4" {...FAINT} />
      <circle cx="210" cy="80" r="28" {...BRIGHT} {...draw} />
      <path d="M196 58a32 32 0 0 1 0 44M186 66a20 20 0 0 1 0 28" {...FAINT} />
      <path d="M150 80h26" {...BRIGHT} strokeDasharray="3 4" />
    </>
  );
}

function Web() {
  return (
    <>
      <rect
        x="50"
        y="25"
        width="200"
        height="110"
        rx="10"
        {...BRIGHT}
        {...draw}
      />
      <path d="M50 45h200" {...BRIGHT} />
      <circle cx="62" cy="35" r="3" {...FAINT} />
      <circle cx="72" cy="35" r="3" {...FAINT} />
      <rect x="64" y="58" width="80" height="60" rx="6" {...FAINT} />
      <rect x="156" y="58" width="80" height="26" rx="6" {...FAINT} />
      <rect x="156" y="92" width="80" height="26" rx="6" {...FAINT} />
    </>
  );
}

function Market() {
  const spokes: [number, number][] = [
    [150, 25],
    [150, 125],
    [110, 30],
    [190, 120],
  ];
  return (
    <>
      {spokes.map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <path d={`M${x} ${y}L150 75`} {...FAINT} />
          <rect
            x={x - 14}
            y={y - 10}
            width="28"
            height="20"
            rx="5"
            {...FAINT}
          />
        </g>
      ))}
      <circle cx="70" cy="75" r="22" {...BRIGHT} {...draw} />
      <circle cx="230" cy="75" r="22" {...BRIGHT} {...draw} />
      <path d="M92 75h116" {...BRIGHT} {...draw} />
      <circle cx="150" cy="75" r="7" fill="var(--color-lime)" />
    </>
  );
}

function Omni() {
  const ends: [number, number][] = [
    [50, 30],
    [50, 120],
    [250, 30],
    [250, 120],
    [40, 75],
    [260, 75],
  ];
  return (
    <>
      {ends.map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <path d={`M${x} ${y}L150 75`} {...FAINT} />
          <rect
            x={x - 18}
            y={y - 12}
            width="36"
            height="24"
            rx="6"
            {...FAINT}
          />
        </g>
      ))}
      <rect
        x="125"
        y="50"
        width="50"
        height="50"
        rx="12"
        {...BRIGHT}
        {...draw}
      />
      <circle cx="150" cy="75" r="6" fill="var(--color-lime)" />
    </>
  );
}

function Fans() {
  const crowd: [number, number][] = [
    [60, 50],
    [70, 105],
    [240, 45],
    [235, 110],
  ];
  return (
    <>
      {crowd.map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="10" {...FAINT} />
      ))}
      <rect
        x="110"
        y="20"
        width="80"
        height="110"
        rx="10"
        {...BRIGHT}
        {...draw}
      />
      <path
        d="M150 50l6 12 13 2-9 9 2 13-12-6-12 6 2-13-9-9 13-2z"
        {...BRIGHT}
        {...draw}
      />
      <rect
        x="124"
        y="100"
        width="52"
        height="14"
        rx="7"
        fill="var(--color-lime)"
      />
    </>
  );
}

function Music() {
  const pins: [number, number][] = [
    [70, 50],
    [150, 95],
    [230, 45],
    [110, 120],
    [200, 120],
  ];
  return (
    <>
      <path
        d="M70 70C100 90 120 100 150 110S210 70 230 65"
        {...BRIGHT}
        strokeDasharray="3 5"
      />
      {pins.map(([x, y], k) => (
        <path
          key={`${x}-${y}`}
          d={`M${x} ${y - 16}c-9 0-14 7-14 14 0 10 14 22 14 22s14-12 14-22c0-7-5-14-14-14z`}
          {...(k === 1 ? BRIGHT : FAINT)}
          {...(k === 1 ? draw : {})}
        />
      ))}
    </>
  );
}

function Shop() {
  return (
    <>
      <rect
        x="40"
        y="25"
        width="220"
        height="110"
        rx="10"
        {...BRIGHT}
        {...draw}
      />
      {[0, 1, 2, 3].map((c) => (
        <g key={c}>
          <rect
            x={56 + c * 50}
            y="45"
            width="40"
            height="44"
            rx="6"
            {...(c === 3 ? BRIGHT : FAINT)}
          />
          <path d={`M${56 + c * 50} 100h40M${56 + c * 50} 110h24`} {...FAINT} />
        </g>
      ))}
    </>
  );
}

const ART: Record<NdaKind, () => React.ReactNode> = {
  device: Device,
  web: Web,
  market: Market,
  omni: Omni,
  fans: Fans,
  music: Music,
  shop: Shop,
};

export function NdaArt({ kind, delay }: { kind: NdaKind; delay: number }) {
  const Art = ART[kind];
  return (
    <svg
      aria-hidden
      viewBox="0 0 300 150"
      className="absolute inset-0 size-full"
      style={{ "--d": `${delay}ms`, "--dur": "900ms" } as React.CSSProperties}
    >
      <Art />
    </svg>
  );
}
