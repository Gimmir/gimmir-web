import { TrackedCta } from "@/components/analytics/tracked-cta";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ArrowRight } from "@/components/ui/icons";
import { Mark } from "@/components/ui/mark";
import { Pill } from "@/components/ui/pill";
import { Reveal } from "@/components/ui/reveal";
import type { HOME_QUERY_RESULT } from "@/sanity/types";

export function Hero({ data }: { data: NonNullable<HOME_QUERY_RESULT> }) {
  return (
    <section id="top" className="relative overflow-hidden">
      <Container className="pb-14 pt-28 sm:pt-32 md:pb-20 md:pt-36">
        <Reveal>
          <Pill>{data.heroEyebrow}</Pill>
        </Reveal>

        <Reveal delay={60}>
          <h1 className="display mt-8 text-[1.9rem] leading-[1.2] sm:text-hero sm:leading-[0.98]">
            {data.heroHeading}
            {data.heroAccent ? (
              <>
                {" "}
                <Mark>{data.heroAccent}</Mark>
              </>
            ) : null}
          </h1>
        </Reveal>

        <Reveal delay={140}>
          <div className="mt-10 flex flex-col gap-9 md:flex-row md:items-end md:justify-between md:gap-12">
            <p className="max-w-[46ch] text-lg leading-relaxed text-muted md:text-xl">
              {data.heroSubhead}
            </p>
            <div className="flex shrink-0 flex-wrap gap-3 sm:gap-3.5">
              <TrackedCta
                cal
                size="sm"
                className="sm:h-[52px] sm:px-7 sm:text-base"
                event="review_call_cta_click"
              >
                <span className="sm:hidden">
                  {data.heroPrimaryCtaLabelShort}
                </span>
                <span className="hidden sm:inline">
                  {data.heroPrimaryCtaLabel}
                </span>
                <ArrowRight className="hidden size-[18px] transition-transform duration-200 group-hover:translate-x-0.5 sm:inline-block" />
              </TrackedCta>
              <Button
                href={data.heroSecondaryCtaHref ?? undefined}
                variant="outline"
                size="sm"
                className="sm:h-[52px] sm:px-7 sm:text-base"
              >
                {data.heroSecondaryCtaLabel}
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
