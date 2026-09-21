import { CaseCard } from "@/components/shared/case-cards";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { getCaseBySlug } from "@/lib/cases";
import type { REVIEW_QUERY_RESULT } from "@/sanity/types";

export function ProofSection({
  data,
}: {
  data: NonNullable<REVIEW_QUERY_RESULT>;
}) {
  const jimmy = getCaseBySlug("jimmy-coach");

  return (
    <section className="border-t border-line py-20 md:py-28">
      <Container>
        <Reveal>
          <SectionHeader
            index="08"
            titleMax="max-w-[30ch]"
            title={
              <>
                {data.proofHeading}
                {data.proofAccent ? (
                  <>
                    {" "}
                    <span className="font-serif font-normal italic">
                      {data.proofAccent}
                    </span>
                  </>
                ) : null}
              </>
            }
            intro={data.proofBody}
          />
        </Reveal>
        {jimmy ? (
          <div className="mt-12">
            <CaseCard data={jimmy} />
          </div>
        ) : null}
      </Container>
    </section>
  );
}
