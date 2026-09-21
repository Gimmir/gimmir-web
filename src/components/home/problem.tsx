import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import type { HOME_QUERY_RESULT } from "@/sanity/types";

export function ProblemSection({
  data,
}: {
  data: NonNullable<HOME_QUERY_RESULT>;
}) {
  if (!data.problemHeading) return null;

  return (
    <section className="border-t border-line py-20 md:py-28">
      <Container>
        <div className="grid gap-8 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-16">
          <Reveal>
            <SectionHeader
              index="02"
              titleMax="max-w-[16ch]"
              title={
                <>
                  {data.problemHeading}
                  {data.problemAccent ? (
                    <>
                      {" "}
                      <span className="font-serif font-normal italic">
                        {data.problemAccent}
                      </span>
                    </>
                  ) : null}
                </>
              }
            />
          </Reveal>
          <Reveal delay={80}>
            <p className="text-lg leading-relaxed text-muted md:pt-3 md:text-xl">
              {data.problemBody}
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
