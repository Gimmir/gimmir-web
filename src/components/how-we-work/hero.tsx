import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Mark } from "@/components/ui/mark";
import { Pill } from "@/components/ui/pill";
import { Reveal } from "@/components/ui/reveal";
import type { HOW_WE_WORK_QUERY_RESULT } from "@/sanity/types";

export function Hero({
  data,
}: {
  data: NonNullable<HOW_WE_WORK_QUERY_RESULT>;
}) {
  return (
    <section id="top" className="relative overflow-hidden">
      <Container className="pb-14 pt-28 sm:pt-32 md:pb-20 md:pt-36">
        <Reveal>
          <Pill>{data.heroEyebrow}</Pill>
        </Reveal>

        <Reveal delay={60}>
          <h1 className="display mt-8 text-[1.95rem] leading-[1.14] sm:text-hero sm:leading-[0.98]">
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
            <p className="max-w-[54ch] text-lg leading-relaxed text-muted md:text-xl">
              {data.heroSubhead}
            </p>
            <div className="flex shrink-0 flex-col gap-3.5">
              <div className="flex flex-wrap gap-3.5">
                <Button cal arrow>
                  {data.heroCtaLabel}
                </Button>
              </div>
              <p className="text-sm text-faint">{data.heroCtaHelper}</p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
