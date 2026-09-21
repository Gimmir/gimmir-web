import { CaseCard } from "@/components/shared/case-cards";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { getCaseBySlug } from "@/lib/cases";

export function CaseStudySection() {
  const data = getCaseBySlug("un1t");
  if (!data) return null;

  return (
    <section className="border-t border-line py-20 md:py-28">
      <Container>
        <Reveal>
          <SectionHeader index="05" title="A 10+ site franchise, on its own platform." />
        </Reveal>

        <div className="mt-12">
          <CaseCard data={data} />
        </div>
      </Container>
    </section>
  );
}
