import { HeroBackdrop } from "@/components/home/hero-backdrop";
import { Stage } from "@/components/motion/stage";
import { RiseText, wordCount } from "@/components/motion/words";
import { Container } from "@/components/ui/container";
import { how } from "@/content/how";

const at = (ms: number, dur?: number) =>
  ({
    "--d": `${ms}ms`,
    ...(dur ? { "--dur": `${dur}ms` } : {}),
  }) as React.CSSProperties;

const LINE = {
  fill: "none",
  stroke: "var(--color-ink)",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

/* The box, in a 420 × 340 plan: two front faces, the opening (light
   inside: nothing dark in there), and two flaps folded back. Each face is
   a fill that settles in plus an outline that draws. */
const FACES: [d: string, fill: string][] = [
  ["M90 170 210 230 210 330 90 290Z", "var(--color-surface)"],
  ["M210 230 330 170 330 290 210 330Z", "var(--color-surface)"],
  ["M90 170 210 110 330 170 210 230Z", "var(--color-paper-2)"],
  ["M90 170 40 120 160 60 210 110Z", "var(--color-paper-2)"],
  ["M330 170 380 120 260 60 210 110Z", "var(--color-paper-2)"],
];

// what flies out, where it lands (centre x, top y); the last one is lime
const OUT: [x: number, y: number][] = [
  [150, 56],
  [230, 30],
  [186, 4],
  [300, 70],
];

function OpenBox({ delay }: { delay: number }) {
  const { contents } = how.hero;
  return (
    <svg
      aria-hidden
      viewBox="0 0 420 340"
      className="mx-auto h-auto w-full max-w-[460px] overflow-visible"
    >
      {FACES.map(([d, fill], i) => (
        <g key={d}>
          <path
            d={d}
            fill={fill}
            className="fade"
            style={at(delay + 300 + i * 80)}
          />
          <path
            d={d}
            pathLength={1}
            {...LINE}
            className="draw"
            style={at(delay + i * 120, 800)}
          />
        </g>
      ))}
      {contents.map((label, i) => {
        const [x, y] = OUT[i];
        const lime = i === contents.length - 1;
        const t = delay + 1000 + i * 140;
        return (
          <g key={label} className="fade" style={at(t)}>
            <path
              d={`M${x} ${y + 28}V${y + 46}`}
              {...LINE}
              strokeWidth={1.2}
              strokeDasharray="3 4"
            />
            <rect
              x={x - 34}
              y={y}
              width={68}
              height={28}
              rx={14}
              {...LINE}
              fill={lime ? "var(--color-lime)" : "var(--color-surface)"}
            />
            <text
              x={x}
              y={y + 18.5}
              textAnchor="middle"
              className="font-sans"
              fontSize={12.5}
              fontWeight={700}
              fill="var(--color-ink)"
            >
              {label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/**
 * /how-we-work ①, Nazar's pick o1: "No black box." beside a box drawn
 * open, with the plan, the price, the docs and the code (lime) coming out
 * of it; under them, how a build runs in five steps, each with what you
 * get to see at that step. On a phone the steps run down a line.
 */
export function HowHero() {
  const { label, title, lede } = how.hero;
  const { label: runs, steps } = how.process;
  const words = wordCount(title) * 40;
  const line = words + 1500;

  return (
    <Stage as="section" eager data-tone="paper" className="relative">
      <HeroBackdrop />
      <Container className="relative pb-20 pt-28 sm:pt-32 md:pb-28 md:pt-40 lg:pt-36">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <p className="fade font-mono text-[13px] uppercase tracking-[0.08em] text-faint">
              {label}
            </p>
            <h1 className="display mt-5 text-[clamp(3.4rem,1rem+7vw,8.5rem)] leading-[0.95]">
              <RiseText text={title} />
            </h1>
            <p
              className="fade mt-7 max-w-[26ch] font-serif text-[clamp(1.3rem,1rem+0.8vw,1.75rem)] italic leading-snug text-muted"
              style={at(words + 250)}
            >
              {lede}
            </p>
          </div>
          <div className="lg:col-span-6">
            <OpenBox delay={words + 300} />
          </div>
        </div>

        <p
          className="fade mt-16 font-mono text-[12px] uppercase tracking-[0.04em] text-faint lg:mt-20"
          style={at(line - 200)}
        >
          {runs}
        </p>
        <ol className="relative mt-6 grid gap-7 pl-8 lg:grid-cols-5 lg:gap-5 lg:pl-0">
          {/* the line the steps sit on */}
          <span
            aria-hidden
            className="wipe absolute bottom-2 left-[7px] top-2 w-px bg-ink lg:inset-x-0 lg:bottom-auto lg:top-[8px] lg:h-px lg:w-auto"
            style={at(line, 1200)}
          />
          {steps.map((s, i) => (
            <li
              key={s.name}
              className="fade relative lg:pt-9"
              style={at(line + 150 + i * 150)}
            >
              <span
                aria-hidden
                className="absolute -left-8 top-1 size-[15px] rounded-full bg-paper ring-[1.5px] ring-inset ring-ink lg:left-0 lg:top-0.5"
              />
              <h2 className="text-lg font-extrabold leading-tight tracking-[-0.01em] md:text-xl">
                {s.name}
              </h2>
              <p className="mt-2 max-w-[34ch] text-[15px] leading-snug text-muted">
                {s.body}
              </p>
              <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-surface px-3 py-1.5 text-[13px] font-semibold ring-1 ring-line">
                <span
                  aria-hidden
                  className="size-1.5 rounded-full bg-lime ring-1 ring-ink/25"
                />
                You see: {s.see}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </Stage>
  );
}
