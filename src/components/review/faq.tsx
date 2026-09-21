import { FaqList } from "@/components/shared/faq-list";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import type { REVIEW_QUERY_RESULT } from "@/sanity/types";

export function FaqSection({
  data,
}: {
  data: NonNullable<REVIEW_QUERY_RESULT>;
}) {
  const faqs = (data.faqItems ?? []).map((f) => ({
    key: f._key,
    question: f.question,
    answer: f.answer,
  }));

  return (
    <section className="border-t border-line py-20 md:py-28">
      <Container>
        <Reveal>
          <SectionHeader
            index="09"
            title={
              <>
                {data.faqHeading}
                {data.faqAccent ? (
                  <>
                    {" "}
                    <span className="font-serif font-normal italic">
                      {data.faqAccent}
                    </span>
                  </>
                ) : null}
              </>
            }
          />
        </Reveal>

        <FaqList items={faqs} className="mt-12" />
      </Container>
    </section>
  );
}
