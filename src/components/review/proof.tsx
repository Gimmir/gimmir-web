import { CaseGrid } from "@/components/shared/case-cards";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";

export function ProofSection() {
  return (
    <section className="border-t border-line py-20 md:py-28">
      <Container>
        <Reveal>
          <SectionHeader
            index="07"
            title="Built by people with real products behind them."
          />
        </Reveal>
        <div className="mt-12">
          <CaseGrid />
        </div>
      </Container>
    </section>
  );
}
