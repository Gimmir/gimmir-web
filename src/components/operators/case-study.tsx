import { CaseCard } from "@/components/shared/case-cards";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { getCaseBySlug } from "@/lib/cases";

export function CaseStudySection() {
  const data = getCaseBySlug("un1t");
  if (!data) return null;

  return (
    <section className="border-t border-line py-20 md:py-28">
      <Container>
        <Reveal>
          <SectionHeader
            index="06"
            titleMax="max-w-[28ch]"
            title="UN1T: off a rented platform, onto their own."
            intro="A London-founded boutique fitness franchise with 10+ locations. We built their member app (iOS & Android), back office and payments on a multi-location data model, keeping about $10k a month inside the business."
          />
        </Reveal>

        {data.quote ? (
          <Reveal>
            <figure className="mt-10 max-w-[60ch] border-l-[5px] border-lime pl-6">
              <blockquote className="font-serif text-2xl italic leading-snug text-ink">
                &ldquo;{data.quote.text}&rdquo;
              </blockquote>
              <figcaption className="mt-4 text-sm text-muted">
                {data.quote.name}, {data.quote.role}
              </figcaption>
            </figure>
          </Reveal>
        ) : null}

        <div className="mt-12">
          <CaseCard data={data} />
        </div>
      </Container>
    </section>
  );
}
