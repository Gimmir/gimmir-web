import { Stage } from "@/components/motion/stage";
import { Container } from "@/components/ui/container";
import { about } from "@/content/about";

/* The connecting line, in a 1200 × 40 box stretched across the row, cut
   in two so it reaches each number just as that number starts drawing.
   Each dashed half is revealed through a mask whose solid stroke draws in
   (a dashed path can't draw itself: its dashes are the dasharray). */
const SEGMENTS = [
  "M40 30C280 -10 500 50 700 20",
  "M700 20C880 -10 1000 -10 1150 28",
];

const STEP = 700;

const at = (ms: number, dur?: number) =>
  ({
    "--d": `${ms}ms`,
    ...(dur ? { "--dur": `${dur}ms` } : {}),
  }) as React.CSSProperties;

/**
 * /about ②, doc 09's stat tiles: 9 products shipped, 4 in fitness, 1 we
 * co-own, each an outline that draws itself in turn along a dashed line.
 * The last, the one we co-own, fills in lime once drawn: the one lime
 * thing here.
 */
export function AboutNumbers() {
  const { label, items } = about.numbers;
  const start = (i: number) => 200 + i * STEP;

  return (
    <Stage as="section" data-tone="paper">
      <Container className="py-20 md:py-28">
        <p className="fade text-[15px] font-medium text-muted">{label}</p>

        <ul className="relative mt-12 grid gap-10 md:mt-20 md:grid-cols-3 md:gap-6">
          <svg
            aria-hidden
            viewBox="0 0 1200 40"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-x-0 -top-12 hidden h-10 w-full overflow-visible md:block"
          >
            <defs>
              {SEGMENTS.map((d, i) => (
                <mask
                  key={d}
                  id={`about-num-${i}`}
                  maskUnits="userSpaceOnUse"
                  x={0}
                  y={-20}
                  width={1200}
                  height={80}
                >
                  <path
                    d={d}
                    pathLength={1}
                    fill="none"
                    stroke="#fff"
                    strokeWidth={14}
                    strokeLinecap="round"
                    className="draw"
                    style={at(start(i) + 500, 700)}
                  />
                </mask>
              ))}
            </defs>
            {SEGMENTS.map((d, i) => (
              <path
                key={d}
                d={d}
                fill="none"
                stroke="var(--color-ink)"
                strokeOpacity={0.45}
                strokeWidth={1.4}
                strokeDasharray="4 6"
                mask={`url(#about-num-${i})`}
              />
            ))}
          </svg>

          {items.map((it, i) => {
            const last = i === items.length - 1;
            return (
              <li key={it.value}>
                <svg
                  aria-hidden
                  viewBox="0 0 140 171"
                  className="h-[clamp(6rem,3.5rem+6vw,11rem)] w-auto overflow-visible"
                >
                  {last && (
                    <text
                      x={4}
                      y={158}
                      fill="var(--color-lime)"
                      className="fade display"
                      style={{ ...at(start(i) + 900), fontSize: 190 }}
                    >
                      {it.value}
                    </text>
                  )}
                  <text
                    x={4}
                    y={158}
                    fill="none"
                    stroke="var(--color-ink)"
                    strokeWidth={1.8}
                    strokeLinejoin="round"
                    className="draw-text display"
                    style={{
                      ...at(start(i), 1100),
                      ["--len" as string]: 900,
                      fontSize: 190,
                    }}
                  >
                    {it.value}
                  </text>
                </svg>
                <p
                  className="fade mt-4 max-w-[16ch] font-serif text-[clamp(1.4rem,1rem+1vw,2rem)] italic leading-[1.2]"
                  style={at(start(i) + 450)}
                >
                  <span className="sr-only">{it.value} </span>
                  {it.line}
                </p>
              </li>
            );
          })}
        </ul>
      </Container>
    </Stage>
  );
}
