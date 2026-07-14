import Link from "next/link";

import { CaseGrid } from "@/components/shared/case-cards";
import { Container } from "@/components/ui/container";
import { ArrowRight } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";

export function ProofSection() {
  return (
    <section id="work" className="scroll-mt-24 py-20 md:py-28">
      <Container>
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeader
              index="01"
              title="Real fitness products, not promises."
            />
            <Link
              href="/work"
              className="group inline-flex items-center gap-2 text-[15px] font-semibold text-ink"
            >
              All case studies
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>
        <div className="mt-12">
          <CaseGrid priority />
        </div>
      </Container>
    </section>
  );
}
