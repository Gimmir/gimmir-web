/* The hero's promise as a plan: "Your SaaS, in your name" in the middle
   and the six parts it's built from around it, each with its own line
   drawn in. Members' data keeps running down those
   lines into the middle, which is the point: it all lands with you. */

const W = 560;
const H = 500;
const CX = 280;
const CY = 250;

const INK = "var(--color-ink)";

const MODULES: [label: string, dx: number, dy: number][] = [
  ["iOS & Android app", -165, -150],
  ["Web dashboard", 150, -150],
  ["Payments", 200, 0],
  ["Community", 150, 150],
  ["Content & programs", -165, 150],
  ["Your data", -210, 0],
];

const r1 = (n: number) => Math.round(n * 10) / 10;

const PARTS = MODULES.map(([label, dx, dy]) => {
  const x = CX + dx;
  const y = CY + dy;
  // pill width from the label, the way it sets in 13.5px Archivo
  const w = r1(label.length * 7.4 + 44);
  return {
    label,
    x,
    y,
    w,
    line: `M${CX} ${CY}C${r1(CX + dx * 0.5)} ${CY} ${r1(x - dx * 0.2)} ${y} ${x} ${y}`,
    flow: `M${x} ${y}C${r1(x - dx * 0.2)} ${y} ${r1(CX + dx * 0.5)} ${CY} ${CX} ${CY}`,
  };
});

const at = (ms: number, dur?: number) =>
  ({
    "--d": `${ms}ms`,
    ...(dur ? { "--dur": `${dur}ms` } : {}),
  }) as React.CSSProperties;

/** /build-your-saas ①, the right half of the hero. */
export function SaasHeroBlueprint({ delay = 0 }: { delay?: number }) {
  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${W} ${H}`}
      className="mx-auto h-auto w-full max-w-[560px] overflow-visible"
    >
      {PARTS.map((p, i) => (
        <g key={p.label}>
          <path
            d={p.line}
            pathLength={1}
            fill="none"
            stroke={INK}
            strokeWidth={1.6}
            strokeLinecap="round"
            className="draw"
            style={at(delay + 300 + i * 90, 700)}
          />
          {/* data running home, along the line */}
          <g
            className="fade motion-reduce:hidden"
            style={at(delay + 1200 + i * 90)}
          >
            <circle r={3.5} fill={INK}>
              <animateMotion
                path={p.flow}
                dur="2.2s"
                begin={`-${(i * 0.37).toFixed(2)}s`}
                repeatCount="indefinite"
              />
            </circle>
          </g>
          <g className="fade" style={at(delay + 700 + i * 90)}>
            <g transform={`translate(${r1(p.x - p.w / 2)} ${p.y - 20})`}>
              <rect
                width={p.w}
                height={40}
                rx={12}
                fill="var(--color-surface)"
                stroke={INK}
                strokeWidth={1.5}
              />
              <circle
                cx={18}
                cy={20}
                r={4.5}
                fill="var(--color-lime)"
                stroke={INK}
                strokeWidth={1}
              />
              <text x={30} y={25} fontSize={13.5} fontWeight={600} fill={INK}>
                {p.label}
              </text>
            </g>
          </g>
        </g>
      ))}

      <g className="fade" style={at(delay + 150)}>
        <g transform={`translate(${CX - 80} ${CY - 50})`}>
          <rect width={160} height={100} rx={22} fill={INK} />
          <text
            x={80}
            y={46}
            textAnchor="middle"
            fontSize={20}
            fontWeight={800}
            fill="var(--color-paper)"
          >
            Your SaaS
          </text>
          <rect
            x={36}
            y={60}
            width={88}
            height={22}
            rx={11}
            fill="var(--color-lime)"
          />
          <text
            x={80}
            y={75}
            textAnchor="middle"
            fontSize={11}
            fontWeight={700}
          >
            in your name
          </text>
        </g>
      </g>
    </svg>
  );
}
