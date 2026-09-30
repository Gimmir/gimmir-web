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

/* The box, in a 420 × 340 plan. Painted back to front: the two flaps
   folded back, the opening (light inside: nothing dark in there), the
   cards standing in it, then the two front faces, which hide the cards'
   lower halves so they sit inside the box with their tops out. Each face
   is a fill that settles in plus an outline that draws. */
type Face = [d: string, fill: string];
const BACK: Face[] = [
  ["M90 170 40 120 160 60 210 110Z", "var(--color-paper-2)"],
  ["M330 170 380 120 260 60 210 110Z", "var(--color-paper-2)"],
  ["M90 170 210 110 330 170 210 230Z", "var(--color-paper-2)"],
];
const FRONT: Face[] = [
  ["M90 170 210 230 210 330 90 290Z", "var(--color-surface)"],
  ["M210 230 330 170 330 290 210 330Z", "var(--color-surface)"],
];

// where each card stands (centre x, top y), keyed by label; drawn from
// the back row to the front, and the code is the lime one
const CARD_W = 72;
const CARD_H = 100;
const SPOTS: Record<string, [x: number, y: number]> = {
  Price: [245, 80],
  Docs: [175, 88],
  Code: [280, 112],
  Plan: [140, 118],
};

function Faces({ faces, delay }: { faces: Face[]; delay: number }) {
  return faces.map(([d, fill], i) => (
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
  ));
}

function OpenBox({ delay }: { delay: number }) {
  const { contents } = how.hero;
  const cards = [...contents].sort((a, b) => SPOTS[a][1] - SPOTS[b][1]);
  return (
    <svg
      aria-hidden
      viewBox="0 30 420 310"
      className="mx-auto h-auto w-full max-w-[460px] overflow-visible"
    >
      <Faces faces={BACK} delay={delay} />
      {cards.map((label, i) => {
        const [x, y] = SPOTS[label];
        const lime = label === "Code";
        return (
          <g key={label} className="fade" style={at(delay + 900 + i * 140)}>
            <rect
              x={x - CARD_W / 2}
              y={y}
              width={CARD_W}
              height={CARD_H}
              rx={10}
              {...LINE}
              fill={lime ? "var(--color-lime)" : "var(--color-surface)"}
            />
            <text
              x={x}
              y={y + 22}
              textAnchor="middle"
              className="font-sans"
              fontSize={12.5}
              fontWeight={700}
              fill="var(--color-ink)"
            >
              {label}
            </text>
            {/* a couple of lines, so it reads as something written */}
            <path
              d={`M${x - 20} ${y + 36}h40M${x - 20} ${y + 45}h28`}
              {...LINE}
              strokeWidth={1.2}
              strokeOpacity={0.35}
            />
          </g>
        );
      })}
      <Faces faces={FRONT} delay={delay + 240} />
    </svg>
  );
}

/**
 * /how-we-work ①, Nazar's pick o1: "No black box." beside a box drawn
 * open, with the plan, the price, the docs and the code (lime) standing
 * in it in plain sight; under them, how a build runs in five steps, each with what you
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
            <p className="fade text-[15px] font-medium text-muted">{label}</p>
            <h1 className="display mt-5 text-[clamp(3.4rem,1rem+7vw,8.5rem)] leading-[0.95]">
              <RiseText text={title} />
            </h1>
            <p
              className="fade mt-7 max-w-[26ch] font-serif text-[clamp(1.3rem,1rem+0.8vw,1.75rem)] italic leading-snug text-muted"
              // with the headline (on a phone it's the largest text)
              style={at(150)}
            >
              {lede}
            </p>
          </div>
          <div className="lg:col-span-6">
            <OpenBox delay={words + 300} />
          </div>
        </div>

        <p
          className="fade mt-16 text-[15px] font-medium text-muted lg:mt-20"
          style={at(line - 200)}
        >
          {runs}
        </p>
        {/* each step spans three shared rows (name, what you see, body),
            so the "You see" chips line up even where a name wraps */}
        <ol className="relative mt-6 grid gap-7 pl-8 lg:grid-cols-5 lg:grid-rows-[auto_auto_auto] lg:gap-x-5 lg:gap-y-0 lg:pl-0">
          {/* the line the steps sit on */}
          <span
            aria-hidden
            className="wipe absolute bottom-2 left-[7px] top-2 w-px bg-ink lg:inset-x-0 lg:bottom-auto lg:top-[8px] lg:h-px lg:w-auto"
            style={at(line, 1200)}
          />
          {steps.map((s, i) => (
            <li
              key={s.name}
              className="fade relative flex flex-col items-start gap-3 lg:row-span-3 lg:grid lg:grid-rows-subgrid lg:pt-9"
              style={at(line + 150 + i * 150)}
            >
              <span
                aria-hidden
                className="absolute -left-8 top-1 size-[15px] rounded-full bg-paper ring-[1.5px] ring-inset ring-ink lg:left-0 lg:top-0.5"
              />
              <h2 className="text-lg font-extrabold leading-tight tracking-[-0.01em] md:text-xl">
                {s.name}
              </h2>
              <p className="inline-flex w-fit items-baseline gap-2 self-start rounded-xl bg-surface px-3 py-1.5 text-[13px] font-semibold leading-snug ring-1 ring-line">
                <span
                  aria-hidden
                  className="size-1.5 shrink-0 translate-y-[-1px] rounded-full bg-lime ring-1 ring-ink/25"
                />
                You see: {s.see}
              </p>
              <p className="max-w-[34ch] text-[15px] leading-snug text-muted">
                {s.body}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </Stage>
  );
}
