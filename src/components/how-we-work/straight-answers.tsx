import { FaqList } from "@/components/shared/faq-list";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { CONTRACT_ANSWER, DISAPPEAR_ANSWER } from "@/lib/trust-answers";

export const STRAIGHT_ANSWERS = [DISAPPEAR_ANSWER, CONTRACT_ANSWER];

export function StraightAnswersSection() {
  return (
    <section className="border-t border-line py-20 md:py-28">
      <Container>
        <Reveal>
          <SectionHeader
            index="04"
            title={
              <>
                Two questions,{" "}
                <span className="font-serif font-normal italic">
                  answered straight.
                </span>
              </>
            }
          />
        </Reveal>

        <FaqList items={STRAIGHT_ANSWERS} className="mt-12" />
      </Container>
    </section>
  );
}
