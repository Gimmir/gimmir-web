import { FaqList, type FaqItem } from "@/components/shared/faq-list";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";

export const HEALTH_FAQ_ITEMS: FaqItem[] = [
  {
    key: "medical",
    question: "Do you build medical or clinical apps?",
    answer:
      "No. We build wellness and prevention products, not regulated clinical software, HIPAA-covered systems or medical devices. We'll tell you clearly if your idea crosses that line.",
  },
  {
    key: "wearables",
    question: "Can you integrate wearables, Apple Health and Health Connect?",
    answer:
      "Yes. HealthKit and Android Health Connect integrations are core to what we do, and we've shipped them in production.",
  },
  {
    key: "gdpr",
    question: "How do you handle GDPR and health data?",
    answer:
      "Privacy by design from day one, GDPR-aligned, with an EU-based team. Data handling is scoped before we write code.",
  },
  {
    key: "case-study",
    question: "Do you have a wellness case study?",
    answer:
      "Not a public one yet. Jimmy Coach is the closest proof: the same engineering, subscriptions, retention and native apps.",
  },
  {
    key: "ai",
    question: "Can you build AI features?",
    answer:
      "Yes, responsibly: with consent, explainability and privacy built in, not bolted on.",
  },
];

export function HealthFaq() {
  return (
    <section className="border-t border-line py-20 md:py-28">
      <Container>
        <Reveal>
          <SectionHeader index="05" title="Questions, answered straight." />
        </Reveal>

        <FaqList items={HEALTH_FAQ_ITEMS} className="mt-12" />
      </Container>
    </section>
  );
}
