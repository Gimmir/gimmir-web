import Link from "next/link";

import { Container } from "@/components/ui/container";
import { ArrowRight } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";

/** The wellness edge: prevention work adjacent to the fitness core. */
export function AdjacentSection() {
  return (
    <section className="border-t border-line py-20 md:py-28">
      <Container>
        <Reveal>
          <SectionHeader index="02" title="Adjacent: health & wellness." />
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-12 rounded-2xl border border-line bg-surface p-7 md:p-10">
            <p className="max-w-[68ch] text-lg leading-relaxed text-muted">
              Sleep, nutrition, women’s health, longevity, metabolic and mental
              wellbeing: prevention, not regulated clinical software. Same
              engineering, with privacy by design and HealthKit / Health Connect
              integrations.
            </p>
            <Link
              href="/health"
              className="group mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-ink"
            >
              Health & wellness
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
