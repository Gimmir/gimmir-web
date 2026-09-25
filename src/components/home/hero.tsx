import Image from "next/image";

import { ChipRow } from "@/components/blocks/chip-row";
import { HeroBackdrop } from "@/components/home/hero-backdrop";
import { InlineHeadline } from "@/components/blocks/inline-headline";
import { TwoDoor } from "@/components/blocks/two-door";
import { Stage } from "@/components/motion/stage";
import { Container } from "@/components/ui/container";
import { home } from "@/content/home";
import { FOUNDERS } from "@/lib/founders";

/**
 * ① The front door, as one sentence with the evidence inside it: the two
 * founders' faces, the real apps next to "Fitness", and "own" marked in
 * lime. Then two doors, one per buyer. From lg the whole thing sits inside
 * one screen; the headline is capped so it stays at four lines. Soft lime
 * light behind it (HeroBackdrop).
 */
export function Hero() {
  const { chips, headline, doors, note } = home.hero;
  const by = FOUNDERS[note.by];
  const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

  return (
    <Stage as="section" eager id="top" data-tone="paper" className="relative">
      <HeroBackdrop />
      <Container className="relative flex min-h-[100svh] flex-col pb-16 pt-28 sm:pt-32 md:min-h-0 lg:min-h-[100svh] lg:justify-center lg:pb-10 lg:pt-24">
        <ChipRow chips={chips} className="fade" style={d(0)} />

        <h1 className="mt-8 text-[clamp(2.3rem,0.8rem+5.1vw,5.25rem)] font-extrabold leading-[1.04] tracking-[-0.038em] [font-stretch:106%] md:mt-10">
          <InlineHeadline tokens={headline} start={2} />
        </h1>

        <div className="fade mt-10 md:mt-12" style={d(760)}>
          <TwoDoor doors={doors} placement="home-hero" />

          <p className="mt-7 flex items-center gap-3">
            <span className="relative size-8 shrink-0 overflow-hidden rounded-full bg-paper-2 ring-2 ring-paper">
              <Image
                src={by.photo}
                alt=""
                fill
                loading="eager"
                sizes="64px"
                className="object-cover object-top"
              />
            </span>
            {/* quote and signature share a baseline, not a box centre */}
            <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="font-serif text-xl italic text-ink/80">
                “{note.quote}”
              </span>
              <span className="text-sm text-faint">
                {by.first}, {by.title.split(",")[0]}
              </span>
            </span>
          </p>
        </div>
      </Container>
    </Stage>
  );
}
