import { FaqList, type FaqItem } from "@/components/shared/faq-list";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";

export const CONTACT_FAQ_ITEMS: FaqItem[] = [
  {
    key: "what-happens",
    question: "What happens on the call?",
    answer:
      "We listen first. You tell us what you’re building or what’s costing you; we tell you honestly whether and how we can help.",
  },
  {
    key: "nda",
    question: "Will you sign an NDA?",
    answer: "Yes, if you need one. Just ask when you book.",
  },
  {
    key: "neither-fits",
    question: "What if neither call fits?",
    answer:
      "Email us. If you’re building something outside fitness and wellness, tell us what it is and we’ll be honest about fit.",
  },
];

export function ContactFaq() {
  return (
    <section className="border-t border-line py-20 md:py-28">
      <Container>
        <Reveal>
          <SectionHeader index="01" title="Before you book." />
        </Reveal>

        <FaqList items={CONTACT_FAQ_ITEMS} className="mt-12" />
      </Container>
    </section>
  );
}
