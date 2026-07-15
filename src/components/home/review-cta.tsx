import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { FlowSteps } from "@/components/shared/flow-steps";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import type { HOME_QUERY_RESULT } from "@/sanity/types";

export function ReviewCtaSection({
  data,
}: {
  data: NonNullable<HOME_QUERY_RESULT>;
}) {
  return (
    <section
      id="start"
      className="scroll-mt-24 border-t border-line py-20 md:py-28"
    >
      <Container>
        <Reveal>
          <SectionHeader
            index="06"
            title={
              <>
                {data.reviewCtaHeading}
                {data.reviewCtaAccent ? (
                  <>
                    {" "}
                    <span className="font-serif font-normal italic">
                      {data.reviewCtaAccent}
                    </span>
                  </>
                ) : null}
              </>
            }
            intro={data.reviewCtaIntro}
          />
        </Reveal>

        <FlowSteps />

        <Reveal>
          <div className="mt-10">
            <Button cal arrow>
              {data.reviewCtaButtonLabel}
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
