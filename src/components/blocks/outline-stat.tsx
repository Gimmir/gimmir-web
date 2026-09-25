import { cn } from "@/lib/cn";

/**
 * One huge number drawn as an outline, then a thin curve that carries the
 * eye from it to its label, like a note made in the margin. Play it inside
 * a <Stage>; at rest (no JS, reduced motion) it is simply drawn.
 *
 * On ink the outline is lime; on paper it is ink with a lime dot (lime
 * lines vanish on paper). Geometry lives in one box per layout; the label
 * is placed in the same coordinates as percentages, so it tracks the curve
 * at any width.
 */
const LAYOUTS = {
  // two glyphs, tall ("12")
  narrow: {
    box: { w: 720, h: 600 },
    text: { x: -18, y: 458, size: 560 },
    from: "M592 266C724 266 728 512",
    end: { x: 540, y: 536 },
  },
  // four glyphs, wide ("100+"); the curve leaves from the plus
  wide: {
    box: { w: 1000, h: 560 },
    text: { x: -10, y: 400, size: 430 },
    from: "M962 250C1084 250 1086 478",
    end: { x: 880, y: 504 },
  },
  // one glyph ("9"); the curve leaves from its right shoulder and lands
  // below the glyph, so its note sits on one line clear of the "9"
  single: {
    box: { w: 520, h: 470 },
    text: { x: -14, y: 400, size: 560 },
    from: "M300 180C434 180 452 424",
    end: { x: 420, y: 446 },
  },
} as const;

export function OutlineStat({
  value,
  label,
  delay = 0,
  tone = "ink",
  layout = "narrow",
  className,
}: {
  value: string;
  label: string;
  /** ms before the number starts drawing */
  delay?: number;
  /** the background it sits on */
  tone?: "ink" | "paper";
  layout?: keyof typeof LAYOUTS;
  className?: string;
}) {
  const { box, text, from, end } = LAYOUTS[layout];
  const line = tone === "ink" ? "var(--color-lime)" : "var(--color-ink)";
  const vars = (d: number, dur?: number) =>
    ({
      "--d": `${d}ms`,
      ...(dur ? { "--dur": `${dur}ms` } : {}),
    }) as React.CSSProperties;

  return (
    <figure className={cn("relative", className)}>
      <svg
        aria-hidden
        viewBox={`0 0 ${box.w} ${box.h}`}
        className="block w-full overflow-visible"
      >
        <text
          x={text.x}
          y={text.y}
          fill="none"
          stroke={line}
          strokeWidth={2.4}
          strokeLinejoin="round"
          className="draw-text"
          style={{
            ...vars(delay, 1700),
            ["--len" as string]: 2400,
            fontSize: text.size,
            fontWeight: 800,
            letterSpacing: "-0.055em",
          }}
        >
          {value}
        </text>
        <path
          d={`${from} ${end.x} ${end.y}`}
          pathLength={1}
          fill="none"
          stroke={line}
          strokeWidth={1.8}
          strokeLinecap="round"
          className="draw"
          style={vars(delay + 1250, 950)}
        />
        <circle
          cx={end.x}
          cy={end.y}
          r={tone === "ink" ? 6 : 8}
          fill="var(--color-lime)"
          stroke={tone === "ink" ? "none" : "var(--color-ink)"}
          strokeWidth={2}
          className="fade"
          style={vars(delay + 2100)}
        />
      </svg>

      <figcaption
        className={cn(
          "fade absolute -translate-y-1/2 text-balance text-right text-[15px] leading-snug sm:text-base",
          tone === "ink" ? "text-paper/75" : "text-muted",
        )}
        style={{
          ...vars(delay + 2150),
          left: 0,
          right: `${((box.w - end.x + 22) / box.w) * 100}%`,
          top: `${(end.y / box.h) * 100}%`,
        }}
      >
        <span className="sr-only">{value} </span>
        {label}
      </figcaption>
    </figure>
  );
}
