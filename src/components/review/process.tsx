import { Container } from "@/components/ui/container";
import { FlowSteps } from "@/components/shared/flow-steps";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";

export function ProcessSection() {
  return (
    <section className="border-t border-line py-20 md:py-28">
      <Container>
        <Reveal>
          <SectionHeader index="05" title="Three steps, low risk." />
        </Reveal>

        <FlowSteps />
      </Container>
    </section>
  );
}
