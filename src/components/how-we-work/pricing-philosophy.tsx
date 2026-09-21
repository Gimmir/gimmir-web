import Link from "next/link";

import { Container } from "@/components/ui/container";
import { ArrowRight } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import type { HOW_WE_WORK_QUERY_RESULT } from "@/sanity/types";

export function PricingPhilosophySection({
  data,
}: {
  data: NonNullable<HOW_WE_WORK_QUERY_RESULT>;
}) {
  if (!data.pricingHeading) return null;

  return (
    <section className="border-t border-line py-20 md:py-28">
      <Container>
        <div className="grid gap-8 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-16">
          <Reveal>
            <SectionHeader
              index="04"
              titleMax="max-w-[18ch]"
              title={data.pricingHeading}
            />
          </Reveal>
          <Reveal delay={80}>
            <p className="text-lg leading-relaxed text-muted md:pt-3 md:text-xl">
              {data.pricingBody}
            </p>
            <Link
              href="/pricing"
              className="group mt-6 inline-flex items-center gap-1.5 font-semibold text-ink"
            >
              See every price
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
