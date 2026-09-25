import Image from "next/image";

import { BookTrigger } from "@/components/blocks/book-trigger";
import { InlineHeadline } from "@/components/blocks/inline-headline";
import { HeroBackdrop } from "@/components/home/hero-backdrop";
import { Stage } from "@/components/motion/stage";
import { Container } from "@/components/ui/container";
import { ArrowRight } from "@/components/ui/icons";
import { operators } from "@/content/operators";
import { FOUNDERS } from "@/lib/founders";

/**
 * /operators ①, the home hero's language for operators: the rented
 * platform drawn as a padlock inside the sentence, "yours." marked, and
 * one call signed with Nazar's face.
 */
export function OperatorsHero() {
  const { headline, sub, cta } = operators.hero;
  const nazar = FOUNDERS.nazar;
  const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

  return (
    <Stage as="section" eager data-tone="paper" className="relative">
      <HeroBackdrop />
      <Container className="relative flex min-h-[100svh] flex-col justify-center pb-16 pt-28 sm:pt-32 md:min-h-0 md:py-40 lg:min-h-[100svh] lg:pb-10 lg:pt-24">
        <h1 className="max-w-[17ch] text-[clamp(2.3rem,0.8rem+5.1vw,5.25rem)] font-extrabold leading-[1.04] tracking-[-0.038em] [font-stretch:106%]">
          <InlineHeadline tokens={headline} />
        </h1>
        <p
          className="fade mt-7 text-lg text-muted md:mt-9 md:text-xl"
          style={d(900)}
        >
          {sub}
        </p>
        <div className="fade mt-10 md:mt-12" style={d(1100)}>
          <BookTrigger
            booking="costCheck"
            placement="operators-hero"
            className="group flex w-full items-center gap-4 rounded-full bg-ink p-2 text-left text-paper transition-[background-color,color,transform] duration-200 ease-[cubic-bezier(.23,1,.32,1)] hover:bg-lime hover:text-ink active:scale-[.97] sm:inline-flex sm:w-auto sm:pr-2"
          >
            <span className="relative size-12 shrink-0 overflow-hidden rounded-full bg-paper-2 ring-2 ring-paper/20 sm:size-[52px]">
              <Image
                src={nazar.photo}
                alt=""
                fill
                sizes="104px"
                loading="eager"
                className="object-cover object-top"
              />
            </span>
            <span className="flex min-w-0 flex-col pr-2">
              <span className="text-[16px] font-semibold leading-tight sm:text-[17px]">
                {cta.label}
              </span>
              <span className="mt-0.5 text-sm opacity-70">{cta.by}</span>
            </span>
            <span className="ml-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-paper text-ink transition-colors duration-200 group-hover:bg-ink group-hover:text-paper sm:ml-4 sm:size-[52px]">
              <ArrowRight className="size-5" />
            </span>
          </BookTrigger>
        </div>
      </Container>
    </Stage>
  );
}
