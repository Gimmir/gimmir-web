import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { FlowSteps } from "@/components/shared/flow-steps";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";

export function ReviewCtaSection() {
  return (
    <section
      id="start"
      className="scroll-mt-24 border-t border-line py-20 md:py-28"
    >
      <Container>
        <Reveal>
          <SectionHeader
            index="06"
            title={
              <>
                Start with a conversation,{" "}
                <span className="font-serif font-normal italic">
                  not a contract.
                </span>
              </>
            }
            intro="One path, three steps. You decide how far you go — and nothing is locked in."
          />
        </Reveal>

        <FlowSteps />

        <Reveal>
          <div className="mt-10">
            <Button cal arrow>
              Book a founder review call
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
