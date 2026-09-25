import Image from "next/image";

import { ChipRow } from "@/components/blocks/chip-row";
import { InlineHeadline } from "@/components/blocks/inline-headline";
import { TwoDoor } from "@/components/blocks/two-door";
import { Stage } from "@/components/motion/stage";
import { Container } from "@/components/ui/container";
import { home } from "@/content/home";
import { FOUNDERS } from "@/lib/founders";

/**
 * ① The front door: who builds it (faces inside the sentence), what they
 * build, and the one word that matters marked in lime. Then two doors, one
 * per buyer. Plays as CSS on first paint.
 */
export function Hero() {
  const { chips, headline, doors, note } = home.hero;
  const by = FOUNDERS[note.by];

  return (
    <Stage as="section" eager id="top" data-tone="paper" className="relative">
      <Container className="flex flex-col justify-center pb-16 pt-28 sm:pt-32 lg:min-h-[100svh] lg:pb-14">
        <ChipRow
          chips={chips}
          className="fade"
          style={{ "--d": "0ms" } as React.CSSProperties}
        />

        <h1 className="mt-9 text-[length:var(--text-headline)] font-extrabold leading-[1.02] tracking-[-0.038em] [font-stretch:106%] md:mt-12">
          <InlineHeadline tokens={headline} start={2} />
        </h1>

        <div
          className="fade mt-12 md:mt-16"
          style={{ "--d": "760ms" } as React.CSSProperties}
        >
          <TwoDoor doors={doors} placement="home-hero" />

          <p className="mt-8 flex items-center gap-3">
            <span className="relative size-8 shrink-0 overflow-hidden rounded-full bg-paper-2 ring-2 ring-paper">
              <Image
                src={by.photo}
                alt=""
                fill
                sizes="64px"
                className="object-cover object-top"
              />
            </span>
            {/* quote and signature share a baseline, not a box centre */}
            <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="font-serif text-xl italic text-ink/80">
                “{note.quote}”
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-faint">
                {by.first} · {by.title.split(",")[0]}
              </span>
            </span>
          </p>
        </div>
      </Container>
    </Stage>
  );
}
