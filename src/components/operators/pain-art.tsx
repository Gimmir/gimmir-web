import { cn } from "@/lib/cn";

/* The three pains, drawn in the site's thin line. Each draws itself when
   the section plays (the Stage .draw / .fade parts), and its one lime
   accent lights up only when the card is ticked (group-data-[on=true]).
   Sites are numbered, never named; there are no amounts. */

const LINE = {
  fill: "none",
  stroke: "var(--color-ink)",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

const at = (ms: number, dur?: number) =>
  ({
    "--d": `${ms}ms`,
    ...(dur ? { "--dur": `${dur}ms` } : {}),
  }) as React.CSSProperties;

const LIT = "transition-[fill] duration-200 group-data-[on=true]:fill-lime";

const SVG = "h-full w-full max-w-[340px] overflow-visible";

/** 01: the bill climbs with every site you open. */
export function FeesArt({ d }: { d: number }) {
  const bars = Array.from({ length: 10 }, (_, i) => {
    const h = 14 + i * 5 + i * i * 1.1;
    return { x: 38 + i * 25, y: 168 - h, h };
  });
  const last = bars[bars.length - 1];
  // the trend rides just above the bar tops
  const trend = bars
    .map((b, i) => `${i ? "L" : "M"}${b.x + 7.5} ${b.y - 8}`)
    .join("");

  return (
    <svg viewBox="0 0 320 210" className={SVG}>
      {bars.map((b, i) => (
        <rect
          key={i}
          x={b.x}
          y={b.y}
          width={15}
          height={b.h}
          rx={3}
          pathLength={1}
          {...LINE}
          fill={i === bars.length - 1 ? "var(--color-surface)" : "none"}
          className={cn("draw", i === bars.length - 1 && LIT)}
          style={at(d + i * 60, 700)}
        />
      ))}
      <path
        d="M24 168H300"
        pathLength={1}
        {...LINE}
        className="draw"
        style={at(d, 900)}
      />
      <g className="fade" style={at(d + 750)}>
        <path d={trend} {...LINE} strokeDasharray="3 5" />
        <circle
          cx={last.x + 7.5}
          cy={last.y - 8}
          r={4.5}
          {...LINE}
          fill="var(--color-surface)"
          className={LIT}
        />
      </g>
      <g className="fade" style={at(d + 950)}>
        <rect
          x={150}
          y={8}
          width={72}
          height={24}
          rx={12}
          fill="var(--color-ink)"
        />
        <text
          x={186}
          y={24}
          textAnchor="middle"
          fontSize={11}
          fontWeight={600}
          fill="var(--color-paper)"
        >
          Your bill
        </text>
      </g>
      <g
        className="fade"
        style={at(d + 600)}
        fontSize={11}
        fill="var(--color-faint)"
      >
        <text x={45} y={190} textAnchor="middle">
          1 site
        </text>
        <text x={last.x + 7.5} y={190} textAnchor="middle">
          10 sites
        </text>
      </g>
    </svg>
  );
}

/** 02: every site in its own tools, head office left guessing. */
export function SilosArt({ d }: { d: number }) {
  const sites = [44, 120, 196, 272];
  const glyphs = [
    <rect key="s" x={-6} y={-6} width={12} height={12} rx={2} />,
    <circle key="c" r={6.5} />,
    <path key="t" d="M0 -7L7 6H-7Z" />,
    <path key="d" d="M0 -7L7 0L0 7L-7 0Z" />,
  ];

  return (
    <svg viewBox="0 0 320 210" className={SVG}>
      {sites.map((x, i) => (
        <g key={x}>
          <path
            d={`M${x} 128V${i % 2 ? 112 : 106}`}
            pathLength={1}
            {...LINE}
            className="draw"
            style={at(d + 300 + i * 80, 400)}
          />
          <path
            d={`M${x} ${i % 2 ? 98 : 92}C${x} 78 160 ${i % 2 ? 76 : 72} 160 64`}
            {...LINE}
            strokeDasharray="3 6"
            opacity={0.5}
            className="fade"
            style={at(d + 650 + i * 80)}
          />
          <rect
            x={x - 32}
            y={128}
            width={64}
            height={58}
            rx={10}
            pathLength={1}
            {...LINE}
            className="draw"
            style={at(d + i * 80, 800)}
          />
          <g
            transform={`translate(${x} 149)`}
            {...LINE}
            className="fade"
            style={at(d + 400 + i * 80)}
          >
            {glyphs[i]}
          </g>
          <text
            x={x}
            y={175}
            textAnchor="middle"
            fontSize={10.5}
            fontWeight={600}
            fill="var(--color-ink)"
            className="fade"
            style={at(d + 450 + i * 80)}
          >
            Site {String(i + 1).padStart(2, "0")}
          </text>
        </g>
      ))}
      <g className="fade" style={at(d + 200)}>
        <rect
          x={104}
          y={16}
          width={112}
          height={40}
          rx={10}
          fill="var(--color-ink)"
        />
        <text
          x={150}
          y={41}
          textAnchor="middle"
          fontSize={11.5}
          fontWeight={600}
          fill="var(--color-paper)"
        >
          Head office
        </text>
        <circle
          cx={198}
          cy={36}
          r={9}
          fill="var(--color-paper)"
          className={LIT}
        />
        <text
          x={198}
          y={40.5}
          textAnchor="middle"
          fontSize={12}
          fontWeight={800}
          fill="var(--color-ink)"
        >
          ?
        </text>
      </g>
    </svg>
  );
}

/** 03: three studios, one app; yours is the one on the right. */
export function SameAppArt({ d }: { d: number }) {
  const phones = [
    { x: 18, label: "Studio A" },
    { x: 121, label: "Studio B" },
    { x: 224, label: "Yours", you: true },
  ];

  return (
    <svg viewBox="0 0 320 210" className={SVG}>
      {phones.map((p, i) => (
        <g key={p.label} transform={`translate(${p.x} 12)`}>
          <rect
            width={78}
            height={150}
            rx={14}
            pathLength={1}
            {...LINE}
            className="draw"
            style={at(d + i * 120, 900)}
          />
          {[40, 62, 84].map((y, r) => (
            <rect
              key={y}
              x={10}
              y={y}
              width={58}
              height={16}
              rx={5}
              pathLength={1}
              {...LINE}
              strokeWidth={1.2}
              className="draw"
              style={at(d + 300 + i * 120 + r * 70, 600)}
            />
          ))}
          <g
            className="fade"
            style={at(d + 600 + i * 120)}
            fill="var(--color-ink)"
          >
            <rect x={26} y={8} width={26} height={5} rx={2.5} />
            <rect x={10} y={24} width={40} height={7} rx={3.5} />
            {[40, 62, 84].map((y) => (
              <rect key={y} x={48} y={y + 5} width={14} height={6} rx={3} />
            ))}
            <rect x={10} y={118} width={58} height={18} rx={9} />
          </g>
          <g
            transform="translate(39 181)"
            className="fade"
            style={at(d + 800 + i * 120)}
          >
            {p.you && (
              <rect
                x={-30}
                y={-13}
                width={60}
                height={22}
                rx={11}
                {...LINE}
                fill="var(--color-surface)"
                className={LIT}
              />
            )}
            <text
              y={2}
              textAnchor="middle"
              fontSize={11}
              fontWeight={600}
              fill={p.you ? "var(--color-ink)" : "var(--color-faint)"}
            >
              {p.label}
            </text>
          </g>
        </g>
      ))}
    </svg>
  );
}
