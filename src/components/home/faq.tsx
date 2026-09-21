import { FaqList } from "@/components/shared/faq-list";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import type { HOME_QUERY_RESULT } from "@/sanity/types";

export function FaqSection({ data }: { data: NonNullable<HOME_QUERY_RESULT> }) {
  const faqs = (data.faqItems ?? []).map((f) => ({
    key: f._key,
    question: f.question,
    answer: f.answer,
  }));
  if (!faqs.length) return null;

  return (
    <section className="border-t border-line py-20 md:py-28">
      <Container>
        <Reveal>
          <SectionHeader index="06" title={data.faqHeading} />
        </Reveal>
        <FaqList items={faqs} className="mt-12" />
      </Container>
    </section>
  );
}
