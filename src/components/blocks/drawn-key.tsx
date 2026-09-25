import { cn } from "@/lib/cn";

/**
 * A key drawn as one thin outline, a lime disc settling into its bow, then
 * a curve that carries the eye from the tip to its label: the same margin
 * note as <OutlineStat>, on paper and in ink. Play it inside a <Stage>; at
 * rest (no JS, reduced motion) it is simply drawn.
 *
 * Geometry lives in one 720-wide box that starts at the top of the bow;
 * the label is placed in the same coordinates as percentages, so it
 * tracks the curve at any width.
 */
const BOX = { y: 150, w: 720, h: 470 };
const END = { x: 548, y: 582 };
/** The key's silhouette: a round bow, the blade, two teeth. */
const KEY =
  "M347.37 292H600V348H584V424H540V348H512V400H478V348H347.37A150 150 0 1 1 347.37 292Z";

export function DrawnKey({
  label,
  delay = 0,
  className,
}: {
  label: string;
  /** ms before the key starts drawing */
  delay?: number;
  className?: string;
}) {
  const vars = (d: number, dur?: number) =>
    ({
      "--d": `${d}ms`,
      ...(dur ? { "--dur": `${dur}ms` } : {}),
    }) as React.CSSProperties;

  return (
    <figure className={cn("relative text-ink", className)}>
      <svg
        aria-hidden
        viewBox={`0 ${BOX.y} ${BOX.w} ${BOX.h}`}
        className="block w-full overflow-visible"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.2}
      >
        <g transform="rotate(-8 200 320)">
          <circle
            cx="200"
            cy="320"
            r="64"
            fill="var(--color-lime)"
            stroke="none"
            className="fade"
            style={vars(delay + 1100)}
          />
          <path
            d={KEY}
            pathLength={1}
            className="draw"
            style={vars(delay, 1500)}
          />
          <circle
            cx="200"
            cy="320"
            r="64"
            pathLength={1}
            className="draw"
            style={vars(delay + 300, 900)}
          />
        </g>
        <path
          d={`M596 264C700 250 736 520 ${END.x} ${END.y}`}
          pathLength={1}
          strokeLinecap="round"
          className="draw"
          style={vars(delay + 1300, 900)}
        />
        <circle
          cx={END.x}
          cy={END.y}
          r={8}
          fill="var(--color-lime)"
          className="fade"
          style={vars(delay + 2150)}
        />
      </svg>

      <figcaption
        // starts clear of the bow, so the note sits in two short lines
        className="fade absolute left-0 -translate-y-1/2 text-balance text-right text-[15px] leading-snug text-muted sm:left-[24%] sm:text-base"
        style={{
          ...vars(delay + 2200),
          right: `${((BOX.w - END.x + 22) / BOX.w) * 100}%`,
          top: `${((END.y - BOX.y) / BOX.h) * 100}%`,
        }}
      >
        {label}
      </figcaption>
    </figure>
  );
}
