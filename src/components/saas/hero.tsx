import Image from "next/image";

import { BookTrigger } from "@/components/blocks/book-trigger";
import { InlineHeadline } from "@/components/blocks/inline-headline";
import { HeroBackdrop } from "@/components/home/hero-backdrop";
import { Stage } from "@/components/motion/stage";
import { Container } from "@/components/ui/container";
import { ArrowRight } from "@/components/ui/icons";
import { saas } from "@/content/saas";
import { SaasHeroBlueprint } from "./hero-blueprint";
import { FOUNDERS } from "@/lib/founders";
import { cn } from "@/lib/cn";

/**
 * /build-your-saas ①: the claim as a sentence with the product we built
 * for ourselves inside it (the Jimmy icon), "ourselves" marked, one call
 * signed with Oleh's and Nazar's faces; beside it, the plan of the SaaS
 * they'd own, drawn on a grid (SaasHeroBlueprint).
 */
export function SaasHero() {
  const { headline, sub, cta } = saas.hero;
  const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

  return (
    <Stage as="section" eager data-tone="paper" className="relative">
      <HeroBackdrop />
      <Container className="relative grid gap-14 pb-16 pt-28 sm:pt-32 md:pb-24 md:pt-40 lg:min-h-[100svh] lg:grid-cols-12 lg:items-center lg:gap-10 lg:pb-10 lg:pt-24">
        <div className="lg:col-span-7">
          <h1 className="text-[clamp(2.3rem,0.8rem+5.1vw,5.25rem)] font-extrabold leading-[1.04] tracking-[-0.038em] [font-stretch:106%] lg:text-[clamp(3rem,0.8rem+3.4vw,4.4rem)]">
            <InlineHeadline tokens={headline} />
          </h1>
          <p
            className="fade mt-7 text-lg text-muted md:mt-9 md:text-xl"
            style={d(1100)}
          >
            {sub}
          </p>
          <div className="fade mt-10 md:mt-12" style={d(1250)}>
            <BookTrigger
              booking="founderReview"
              placement="saas-hero"
              className="group flex w-full items-center gap-4 rounded-full bg-ink p-2 text-left text-paper transition-[background-color,color,transform] duration-200 ease-[cubic-bezier(.23,1,.32,1)] hover:bg-lime hover:text-ink active:scale-[.97] sm:inline-flex sm:w-auto sm:pr-2"
            >
              <span className="flex shrink-0">
                {(["oleh", "nazar"] as const).map((id, k) => (
                  <span
                    key={id}
                    className={cn(
                      "relative size-12 overflow-hidden rounded-full bg-paper-2 ring-2 ring-ink transition-[box-shadow] duration-200 group-hover:ring-lime sm:size-[52px]",
                      k > 0 && "-ml-4",
                    )}
                  >
                    <Image
                      src={FOUNDERS[id].photo}
                      alt=""
                      fill
                      sizes="104px"
                      loading="eager"
                      className="object-cover object-top"
                    />
                  </span>
                ))}
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
        </div>

        <div className="lg:col-span-5">
          <SaasHeroBlueprint delay={900} />
        </div>
      </Container>
    </Stage>
  );
}
