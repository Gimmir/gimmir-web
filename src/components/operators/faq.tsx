import { FaqList, type FaqItem } from "@/components/shared/faq-list";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { CONTRACT_ANSWER, DISAPPEAR_ANSWER } from "@/lib/trust-answers";

export const OPERATORS_FAQ_ITEMS: FaqItem[] = [
  {
    key: "timeline",
    question: "How long does a move like this take?",
    answer:
      "Typically four to six months from blueprint to the last location switched over. Sites move in waves, not all at once.",
  },
  {
    key: "risk",
    question: "What is the risky part?",
    answer:
      "Not the build. It is moving members, payment mandates and bookings without anyone noticing. Most of our planning time goes there, and it is the first thing the teardown looks at.",
  },
  DISAPPEAR_ANSWER,
  {
    key: "small-team",
    question: "You're a small team. Can you carry this?",
    answer:
      "Two founders lead every engagement, with a core team of ten senior engineers and designers. We take on few projects at a time on purpose. If we can't staff yours properly, we will say so on the first call.",
  },
  CONTRACT_ANSWER,
  {
    key: "gdpr",
    question: "What about member data and GDPR?",
    answer:
      "Your data lives in your cloud account, in your region. We sign a DPA, work with least-privilege access, and remove access the day someone leaves the project.",
  },
  {
    key: "build-after",
    question: "Do we have to build with you after the teardown?",
    answer: "No. The model and the risk map are yours either way.",
  },
];

export function OperatorsFaq() {
  return (
    <section className="border-t border-line py-20 md:py-28">
      <Container>
        <Reveal>
          <SectionHeader index="06" title="Questions operators ask first." />
        </Reveal>

        <FaqList items={OPERATORS_FAQ_ITEMS} className="mt-12" />
      </Container>
    </section>
  );
}
