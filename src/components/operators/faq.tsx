import { FaqList, type FaqItem } from "@/components/shared/faq-list";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { OFFERS, formatPrice } from "@/lib/offers";
import {
  CONTRACT_ANSWER,
  DISAPPEAR_ANSWER,
  TWO_FOUNDERS_ANSWER,
} from "@/lib/trust-answers";

const teardown = formatPrice(OFFERS.teardown);

export const OPERATORS_FAQ_ITEMS: FaqItem[] = [
  {
    key: "disruption",
    question: "Will switching disrupt my members or billing?",
    answer:
      "No, that's exactly what the Migration Blueprint prevents. Before anything moves, we map and test member data and plan a cutover that doesn't interrupt billing. Sites move in waves, not all at once.",
  },
  {
    key: "data",
    question: "What happens to my member data?",
    answer:
      "It's yours. We migrate it into a system in your name, in your cloud account and your region, and you keep full control. We sign a DPA, work with least-privilege access, and remove access the day someone leaves the project.",
  },
  {
    key: "timeline",
    question: "How long does a full build take?",
    answer:
      "Typically four to six months from blueprint to the last location switched over. You get a fixed timeline in the Blueprint before you commit to the build.",
  },
  {
    key: "teardown-refund",
    question: "What if the Teardown doesn't find savings?",
    answer: `If I can't find at least ${teardown} a year in savings, you get your ${teardown} back.`,
  },
  TWO_FOUNDERS_ANSWER,
  {
    key: "platforms",
    question: "Which platforms do you move operators off?",
    answer:
      "We don't name platforms on this site. Tell me on the call which one you're on, and I'll tell you what it's costing you.",
  },
  DISAPPEAR_ANSWER,
  CONTRACT_ANSWER,
  {
    key: "build-after",
    question: "Do we have to build with you after the Teardown?",
    answer: "No. The savings breakdown and the model are yours either way.",
  },
];

export function OperatorsFaq() {
  return (
    <section className="border-t border-line py-20 md:py-28">
      <Container>
        <Reveal>
          <SectionHeader index="08" title="Questions operators ask first." />
        </Reveal>

        <FaqList items={OPERATORS_FAQ_ITEMS} className="mt-12" />
      </Container>
    </section>
  );
}
