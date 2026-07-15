import { Container } from "@/components/ui/container";
import { FlowSteps } from "@/components/shared/flow-steps";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import type { REVIEW_QUERY_RESULT } from "@/sanity/types";

export function ProcessSection({
  data,
}: {
  data: NonNullable<REVIEW_QUERY_RESULT>;
}) {
  return (
    <section className="border-t border-line py-20 md:py-28">
      <Container>
        <Reveal>
          <SectionHeader
            index="05"
            title={
              <>
                {data.processHeading}
                {data.processAccent ? (
                  <>
                    {" "}
                    <span className="font-serif font-normal italic">
                      {data.processAccent}
                    </span>
                  </>
                ) : null}
              </>
            }
          />
        </Reveal>

        <FlowSteps />
      </Container>
    </section>
  );
}
