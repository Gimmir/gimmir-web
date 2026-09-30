import Link from "next/link";

import { Stage } from "@/components/motion/stage";
import { RiseText, wordCount } from "@/components/motion/words";
import { Container } from "@/components/ui/container";
import { ArrowRight } from "@/components/ui/icons";
import { saas } from "@/content/saas";

/* The connecting line, in a 1200 × 40 box stretched across the row, cut
   in two so it can reach each number just as that number starts drawing.
   Each dashed half is revealed through a mask whose solid stroke draws
   in (a dashed path can't draw itself: its dashes are the dasharray). */
const SEGMENTS = [
  "M60 30C300 -10 520 50 700 20",
  "M700 20C880 -10 1000 -10 1150 28",
];

// per number: when it starts drawing, after the title has risen
const STEP = 1000;

/**
 * /build-your-saas ②, how Jimmy Coach started, in three numbers told in
 * order: each outline draws itself in lime (the "12" hand), its sentence
 * settles under it, then the dashed line runs on to the next number. At
 * rest (no JS, reduced motion) it's all simply there.
 */
export function SaasStory() {
  const { label, title, sub, items, link } = saas.story;
  const after = wordCount(title) * 40 + 500;
  const at = (ms: number, dur?: number) =>
    ({
      "--d": `${ms}ms`,
      ...(dur ? { "--dur": `${dur}ms` } : {}),
    }) as React.CSSProperties;
  const start = (i: number) => after + i * STEP;

  return (
    <Stage as="section" data-tone="ink" className="bg-ink text-paper">
      <Container className="py-20 md:py-28">
        <p className="fade text-[15px] font-medium text-paper/50">{label}</p>
        <h2 className="display mt-6 text-[length:var(--text-title)] leading-[1.02]">
          <RiseText text={title} />
        </h2>
        <p
          className="fade mt-5 max-w-[34ch] font-serif text-2xl italic leading-snug text-paper/85 md:text-[1.75rem]"
          style={at(after - 200)}
        >
          {sub}
        </p>

        <div className="relative mt-14 grid gap-12 md:mt-24 md:grid-cols-3 md:gap-6">
          <svg
            aria-hidden
            viewBox="0 0 1200 40"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-x-0 -top-12 hidden h-10 w-full overflow-visible md:block"
          >
            <defs>
              {SEGMENTS.map((d, i) => (
                <mask key={i} id={`saas-story-${i}`}>
                  <path
                    d={d}
                    pathLength={1}
                    fill="none"
                    stroke="#fff"
                    strokeWidth={14}
                    strokeLinecap="round"
                    className="draw"
                    style={at(start(i) + 700, 900)}
                  />
                </mask>
              ))}
            </defs>
            {SEGMENTS.map((d, i) => (
              <path
                key={i}
                d={d}
                fill="none"
                stroke="var(--color-lime)"
                strokeWidth={1.4}
                strokeDasharray="4 6"
                mask={`url(#saas-story-${i})`}
              />
            ))}
          </svg>

          {items.map((it, i) => (
            <div key={it.tag}>
              {/* the number, drawn as an outline (SVG so the stroke can draw) */}
              <svg
                aria-hidden
                // ~126 units a glyph at 190: the box fits the drawn number, so
                // max-w-full can shrink it into a narrow column
                viewBox={`0 0 ${it.value.length * 126 + 14} 171`}
                className="h-[clamp(4.5rem,2.7rem+5.4vw,8.5rem)] w-auto max-w-full overflow-visible"
              >
                <text
                  x={4}
                  y={158}
                  fill="none"
                  stroke="var(--color-lime)"
                  strokeWidth={1.6}
                  strokeLinejoin="round"
                  className="draw-text display"
                  style={{
                    ...at(start(i), 1300),
                    ["--len" as string]: 1100,
                    fontSize: 190,
                    letterSpacing: "-0.04em",
                  }}
                >
                  {it.value}
                </text>
              </svg>
              <p
                className="fade mt-5 max-w-[17ch] font-serif text-[clamp(1.3rem,1rem+0.8vw,1.75rem)] italic leading-[1.25]"
                style={at(start(i) + 650)}
              >
                <span className="sr-only">{it.value} </span>
                {it.line}
              </p>
              <p
                className="fade mt-3 font-mono text-[12px] uppercase tracking-[0.04em] text-paper/45"
                style={at(start(i) + 800)}
              >
                {it.tag}
              </p>
            </div>
          ))}
        </div>

        <Link
          href={link.href}
          className="fade group mt-14 inline-flex items-center gap-3 text-lg font-semibold md:mt-16"
          style={at(start(items.length - 1) + 1000)}
        >
          <span className="border-b border-paper/40 pb-1 transition-colors group-hover:border-lime group-hover:text-lime">
            {link.label}
          </span>
          <ArrowRight className="size-5 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </Container>
    </Stage>
  );
}
