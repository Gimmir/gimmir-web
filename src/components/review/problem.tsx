import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import type { REVIEW_QUERY_RESULT } from "@/sanity/types";

export function ProblemSection({ data }: { data: NonNullable<REVIEW_QUERY_RESULT> }) {
  return (
    <section className="border-t border-line py-20 md:py-28">
      <Container>
        <Reveal>
          <SectionHeader
            index="01"
            titleMax="max-w-[32ch]"
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

        <div className="mt-12 grid gap-8 md:grid-cols-2 md:items-start md:gap-12">
          <Reveal>
            <p className="text-lg leading-relaxed text-muted md:text-xl">
              {data.problemBody}
            </p>
          </Reveal>

          <Reveal delay={80}>
            <div className="relative overflow-hidden rounded-2xl border border-line bg-paper-2 p-6 md:p-8">
              <span
                aria-hidden
                className="absolute inset-y-0 left-0 w-[5px] bg-lime"
              />
              <p className="text-lg leading-relaxed text-ink md:text-xl md:leading-relaxed">
                {data.problemCallout}
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
