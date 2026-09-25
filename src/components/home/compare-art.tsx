import { cn } from "@/lib/cn";

/** The lime dot of the margin notes, here marking our answer. */
export function Dot() {
  return (
    <span
      aria-hidden
      className="mt-[0.55em] size-2 shrink-0 rounded-full bg-lime ring-1 ring-lime/40"
    />
  );
}

export type GlyphKind = "lock" | "hourglass" | "key";

/**
 * Each way to get software, drawn in the same thin hand as UN1T's "12" and
 * the manifesto's key: renting locks you in, an agency bills the hours,
 * with us you hold the key. Drawn once the table has settled.
 */
export function Glyph({
  kind,
  delay,
  className,
}: {
  kind: GlyphKind;
  delay: number;
  className?: string;
}) {
  const draw = (d: number, dur = 1100) =>
    ({ "--d": `${d}ms`, "--dur": `${dur}ms` }) as React.CSSProperties;
  const line = { pathLength: 1, className: "draw" } as const;

  return (
    <svg
      aria-hidden
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("block overflow-visible", className)}
    >
      {kind === "lock" && (
        <>
          <path
            d="M35 46V34a15 15 0 0 1 30 0v12"
            {...line}
            style={draw(delay)}
          />
          <path
            d="M30 46h40a6 6 0 0 1 6 6v28a6 6 0 0 1-6 6H30a6 6 0 0 1-6-6V52a6 6 0 0 1 6-6Z"
            {...line}
            style={draw(delay + 150)}
          />
          <circle
            cx="50"
            cy="61"
            r="4"
            {...line}
            style={draw(delay + 700, 500)}
          />
          <path d="M50 65v8" {...line} style={draw(delay + 900, 400)} />
        </>
      )}
      {kind === "hourglass" && (
        <>
          <path d="M28 14h44M28 86h44" {...line} style={draw(delay)} />
          <path
            d="M33 14c0 24 16 28 16 36s-16 12-16 36"
            {...line}
            style={draw(delay + 150)}
          />
          <path
            d="M67 14c0 24-16 28-16 36s16 12 16 36"
            {...line}
            style={draw(delay + 150)}
          />
          <path
            d="M41 31c5 4 13 4 18 0"
            {...line}
            style={draw(delay + 700, 500)}
          />
          <path d="M50 55v17" {...line} style={draw(delay + 850, 400)} />
          <path
            d="M39 84c4-8 18-8 22 0"
            {...line}
            style={draw(delay + 950, 500)}
          />
        </>
      )}
      {kind === "key" && (
        <g transform="rotate(-8 30 50)">
          <circle
            cx="30"
            cy="50"
            r="7"
            fill="var(--color-lime)"
            stroke="none"
            className="fade"
            style={{ "--d": `${delay + 900}ms` } as React.CSSProperties}
          />
          <path
            d="M49.36 45H90V55H86V66H79V55H73V62H67V55H49.36A20 20 0 1 1 49.36 45Z"
            {...line}
            style={draw(delay, 1300)}
          />
          <circle
            cx="30"
            cy="50"
            r="7"
            {...line}
            style={draw(delay + 400, 600)}
          />
        </g>
      )}
    </svg>
  );
}
