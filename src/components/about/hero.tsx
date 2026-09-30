import Image from "next/image";

import { Stage } from "@/components/motion/stage";
import { RiseText, wordCount } from "@/components/motion/words";
import { Container } from "@/components/ui/container";
import { LinkedIn } from "@/components/ui/icons";
import { about } from "@/content/about";
import { FOUNDERS, type FounderId } from "@/lib/founders";

const at = (ms: number, dur?: number) =>
  ({
    "--d": `${ms}ms`,
    ...(dur ? { "--dur": `${dur}ms` } : {}),
  }) as React.CSSProperties;

function Portrait({ id, delay }: { id: FounderId; delay: number }) {
  const f = FOUNDERS[id];
  return (
    <figure
      className="fade group relative aspect-[1/1.08] overflow-hidden rounded-[28px] bg-ink-soft md:rounded-[32px]"
      style={at(delay)}
    >
      {/* black and white evens out two very different snapshots; the
          colour comes back under the pointer */}
      <Image
        src={f.photo}
        alt={`${f.name}, ${f.title}`}
        fill
        loading="eager"
        sizes="(min-width: 768px) 50vw, 100vw"
        className="object-cover object-[center_22%] brightness-95 contrast-[1.05] grayscale transition-[filter] duration-700 ease-[cubic-bezier(.23,1,.32,1)] group-hover:grayscale-0"
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(180deg, transparent 45%, rgba(21,20,14,0.85))",
        }}
      />
      <a
        href={f.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${f.name} on LinkedIn`}
        className="absolute right-4 top-4 flex size-11 items-center justify-center rounded-full bg-ink/45 text-paper backdrop-blur-sm transition-colors duration-200 hover:bg-lime hover:text-ink active:scale-[0.97] md:right-5 md:top-5"
      >
        <LinkedIn className="size-4" />
      </a>
      <figcaption className="absolute inset-x-5 bottom-5 md:inset-x-7 md:bottom-7">
        <p className="display text-[clamp(2.25rem,1rem+2.8vw,3.75rem)] leading-none text-paper">
          {f.first}
        </p>
        <p className="mt-2 text-sm text-paper/75 md:text-[15px]">
          {f.title}
          {"also" in f && f.also ? ` · ${f.also}` : null}
        </p>
      </figcaption>
    </figure>
  );
}

/**
 * /about ①, Nazar's pick o3: on ink, the two of them as big portraits in
 * black and white, a lime outline "&" drawing itself between them. On a
 * phone the portraits stack full width with the "&" in the gap between.
 */
export function AboutHero() {
  const { label, title, lede, people } = about.hero;
  const words = wordCount(title) * 40;

  return (
    <Stage as="section" eager data-tone="ink" className="bg-ink text-paper">
      <Container className="pb-16 pt-28 sm:pt-32 md:pb-24 md:pt-36">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-5">
          <div>
            <p className="fade text-[15px] font-medium text-paper/50">
              {label}
            </p>
            <h1 className="display mt-4 text-[clamp(3rem,1rem+5vw,6.5rem)] leading-[0.95]">
              <RiseText text={title} />
            </h1>
          </div>
          <p
            className="fade max-w-[26ch] font-serif text-[clamp(1.3rem,1rem+0.8vw,1.75rem)] italic leading-snug text-paper/75"
            style={at(words + 250)}
          >
            {lede}
          </p>
        </div>

        <div className="relative mt-10 grid gap-24 md:mt-14 md:grid-cols-2 md:gap-[clamp(3.5rem,6vw,5.5rem)]">
          {people.map((id, i) => (
            <Portrait key={id} id={id} delay={words + 150 + i * 120} />
          ))}
          {/* the "&" between them, drawn in lime */}
          <svg
            aria-hidden
            viewBox="0 0 170 180"
            className="pointer-events-none absolute left-1/2 top-1/2 z-10 h-[clamp(5.5rem,3rem+7vw,11rem)] w-auto -translate-x-1/2 -translate-y-1/2 overflow-visible"
          >
            <text
              x={85}
              y={150}
              textAnchor="middle"
              fill="none"
              stroke="var(--color-lime)"
              strokeWidth={2.4}
              strokeLinejoin="round"
              className="draw-text display"
              style={{
                ...at(words + 600, 1400),
                ["--len" as string]: 1200,
                fontSize: 190,
              }}
            >
              &amp;
            </text>
          </svg>
        </div>
      </Container>
    </Stage>
  );
}
