import { cn } from "@/lib/cn";

/**
 * One huge number drawn as a lime outline, then a thin curve that carries
 * the eye from it to its label, like a note made in the margin. Play it
 * inside a <Stage>; at rest (no JS, reduced motion) it is simply drawn.
 *
 * Geometry lives in one 720×600 box; the label is placed in the same
 * coordinates as percentages, so it tracks the curve at any width.
 */
const BOX = { w: 720, h: 600 };
const END = { x: 540, y: 536 };

export function OutlineStat({
  value,
  label,
  delay = 0,
  tone = "ink",
  className,
}: {
  value: string;
  label: string;
  /** ms before the number starts drawing */
  delay?: number;
  tone?: "ink" | "paper";
  className?: string;
}) {
  const vars = (d: number, dur?: number) =>
    ({ "--d": `${d}ms`, ...(dur ? { "--dur": `${dur}ms` } : {}) }) as React.CSSProperties;

  return (
    <figure className={cn("relative", className)}>
      <svg
        aria-hidden
        viewBox={`0 0 ${BOX.w} ${BOX.h}`}
        className="block w-full overflow-visible"
      >
        <text
          x="-18"
          y="458"
          fill="none"
          stroke="var(--color-lime)"
          strokeWidth={2.4}
          strokeLinejoin="round"
          className="draw-text"
          style={{
            ...vars(delay, 1700),
            ["--len" as string]: 2400,
            fontSize: 560,
            fontWeight: 800,
            letterSpacing: "-0.055em",
          }}
        >
          {value}
        </text>
        <path
          d={`M592 266C724 266 728 512 ${END.x} ${END.y}`}
          pathLength={1}
          fill="none"
          stroke="var(--color-lime)"
          strokeWidth={1.8}
          strokeLinecap="round"
          className="draw"
          style={vars(delay + 1250, 950)}
        />
        <circle
          cx={END.x}
          cy={END.y}
          r={6}
          fill="var(--color-lime)"
          className="fade"
          style={vars(delay + 2100)}
        />
      </svg>

      <figcaption
        className={cn(
          "fade absolute -translate-y-1/2 text-right font-mono text-[13px] uppercase leading-snug tracking-[0.08em] sm:text-sm",
          tone === "ink" ? "text-paper/75" : "text-muted",
        )}
        style={{
          ...vars(delay + 2150),
          left: 0,
          right: `${((BOX.w - END.x + 22) / BOX.w) * 100}%`,
          top: `${(END.y / BOX.h) * 100}%`,
        }}
      >
        <span className="sr-only">{value} </span>
        {label}
      </figcaption>
    </figure>
  );
}
