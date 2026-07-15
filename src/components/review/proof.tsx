import { CaseGrid } from "@/components/shared/case-cards";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import type { REVIEW_QUERY_RESULT } from "@/sanity/types";

export function ProofSection({
  data,
}: {
  data: NonNullable<REVIEW_QUERY_RESULT>;
}) {
  return (
    <section className="border-t border-line py-20 md:py-28">
      <Container>
        <Reveal>
          <SectionHeader
            index="07"
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
          />
        </Reveal>
        <div className="mt-12">
          <CaseGrid />
        </div>
      </Container>
    </section>
  );
}
