import { FaqList, type FaqItem } from "@/components/shared/faq-list";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { OFFERS } from "@/lib/offers";

export const PRICING_FAQ_ITEMS: FaqItem[] = [
  {
    key: "why-fixed",
    question: "Why fixed prices instead of hourly?",
    answer:
      "Because hourly punishes you for our learning curve and rewards slowness. Fixed price aligns us with shipping.",
  },
  {
    key: "teardown-guarantee",
    question: "Is the Teardown really money-back?",
    answer: `Yes. ${OFFERS.teardown.guarantee}`,
  },
  {
    key: "credit",
    question: "Do the diagnostics credit toward the build?",
    answer:
      "The Migration Blueprint is credited to your build, and so is The Review’s fee if you build with us. Ask on the call about the Teardown.",
  },
];

export function PricingFaq() {
  return (
    <section className="border-t border-line py-20 md:py-28">
      <Container>
        <Reveal>
          <SectionHeader index="04" title="Pricing, answered straight." />
        </Reveal>
        <FaqList items={PRICING_FAQ_ITEMS} className="mt-12" />
      </Container>
    </section>
  );
}
