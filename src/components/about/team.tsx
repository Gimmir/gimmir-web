import { Stage } from "@/components/motion/stage";
import { RiseText, wordCount } from "@/components/motion/words";
import { Container } from "@/components/ui/container";
import { about } from "@/content/about";

const at = (ms: number, dur?: number) =>
  ({
    "--d": `${ms}ms`,
    ...(dur ? { "--dur": `${dur}ms` } : {}),
  }) as React.CSSProperties;

const LINE = {
  fill: "none",
  stroke: "var(--color-ink)",
  strokeWidth: 1.4,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

/** The tile's word, an outline that draws itself (the site's number hand). */
function Outline({ value, delay }: { value: string; delay: number }) {
  return (
    <svg
      aria-hidden
      // ~130 units a glyph at 190: the box fits the drawn word
      viewBox={`0 0 ${value.length * 130 + 14} 171`}
      className="h-[clamp(3rem,2rem+2.5vw,4.5rem)] w-auto overflow-visible"
    >
      <text
        x={4}
        y={158}
        {...LINE}
        strokeWidth={3.6}
        className="draw-text display"
        style={{
          ...at(delay, 1200),
          ["--len" as string]: 1100,
          fontSize: 190,
        }}
      >
        {value}
      </text>
    </svg>
  );
}

/* One small drawing per tile, top right: what the tile says, at a glance. */

/** Ten of them, settling in one by one. */
function People({ delay }: { delay: number }) {
  return (
    <span aria-hidden className="grid grid-cols-[repeat(5,0.875rem)] gap-1.5">
      {Array.from({ length: 10 }, (_, i) => (
        <span
          key={i}
          className="fade size-3.5 rounded-full ring-[1.4px] ring-ink"
          style={at(delay + i * 50)}
        />
      ))}
    </span>
  );
}

/** A contract, signed: the seal is the tile's lime. */
function Contract({ delay }: { delay: number }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 56 64"
      className="h-16 w-auto overflow-visible"
    >
      <path
        d="M6 3h32l12 12v46H6Z"
        pathLength={1}
        {...LINE}
        className="draw"
        style={at(delay, 700)}
      />
      <path
        d="M38 3v12h12"
        pathLength={1}
        {...LINE}
        className="draw"
        style={at(delay + 300, 400)}
      />
      {[24, 32, 40].map((y, k) => (
        <path
          key={y}
          d={`M14 ${y}h${k === 2 ? 14 : 26}`}
          pathLength={1}
          {...LINE}
          className="draw"
          style={at(delay + 400 + k * 90, 400)}
        />
      ))}
      <g className="fade" style={at(delay + 750)}>
        <circle cx={40} cy={50} r={8} {...LINE} fill="var(--color-lime)" />
        <path d="M36.5 50.2l2.3 2.3 4.7-4.9" {...LINE} />
      </g>
    </svg>
  );
}

/** Their day and yours, overlapping: the shared hours are the lime. */
function Hours({ delay }: { delay: number }) {
  return (
    <span aria-hidden className="flex w-28 flex-col gap-1.5">
      {(
        [
          ["EU", "left-0 right-[28%]"],
          ["You", "left-[28%] right-0"],
        ] as const
      ).map(([label, span], k) => (
        <span key={label} className="flex items-center gap-2">
          <span className="w-6 font-mono text-[10px] uppercase text-faint">
            {label}
          </span>
          <span className="relative h-2.5 flex-1 rounded-full bg-paper-2">
            <span
              className={`wipe absolute inset-y-0 rounded-full ring-[1.4px] ring-inset ring-ink ${span}`}
              style={at(delay + k * 200, 700)}
            />
          </span>
        </span>
      ))}
      <span className="flex items-center gap-2">
        <span className="w-6" />
        <span className="relative h-2.5 flex-1">
          <span
            className="wipe absolute inset-y-0 left-[28%] right-[28%] rounded-full bg-lime"
            style={at(delay + 600, 500)}
          />
        </span>
      </span>
    </span>
  );
}

const ART = [People, Contract, Hours];

/**
 * /about ⑥, the team and the company behind the two of them, in three
 * tiles (the live founders page's approved wording): each one's word
 * draws itself in outline, with a small drawing of it top right.
 */
export function AboutTeam() {
  const { title, items } = about.team;
  const after = wordCount(title) * 40 + 300;

  return (
    <Stage as="section" data-tone="paper" className="border-t border-line">
      <Container className="py-20 md:py-28">
        <h2 className="display max-w-[18ch] text-[length:var(--text-title)] leading-[1.02]">
          <RiseText text={title} />
        </h2>
        <ul className="mt-12 grid gap-4 md:mt-16 md:grid-cols-3">
          {items.map((it, i) => {
            const Art = ART[i];
            const t = after + i * 160;
            return (
              <li
                key={it.label}
                className="fade flex flex-col rounded-[24px] bg-surface p-6 shadow-[0_1px_0_rgba(21,20,14,0.04),0_28px_56px_-36px_rgba(21,20,14,0.35)] ring-1 ring-line md:p-7"
                style={at(t)}
              >
                <div className="flex items-start justify-between gap-4">
                  <Outline value={it.value} delay={t + 150} />
                  {/* too tight beside the word in three narrow columns */}
                  <div className="shrink-0 md:max-lg:hidden">
                    <Art delay={t + 500} />
                  </div>
                </div>
                <p className="mt-8 text-xl font-bold tracking-[-0.01em]">
                  {it.label}
                </p>
                <p className="mt-2 leading-relaxed text-muted">{it.body}</p>
              </li>
            );
          })}
        </ul>
      </Container>
    </Stage>
  );
}
