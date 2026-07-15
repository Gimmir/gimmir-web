import { Container } from "@/components/ui/container";
import { Check } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import type { HOW_WE_WORK_QUERY_RESULT } from "@/sanity/types";

export function PrinciplesSection({
  data,
}: {
  data: NonNullable<HOW_WE_WORK_QUERY_RESULT>;
}) {
  const principles = data.principlesItems ?? [];

  return (
    <section className="border-t border-line py-20 md:py-28">
      <Container>
        <Reveal>
          <SectionHeader
            index="03"
            title={
              <>
                {data.principlesHeading}
                {data.principlesAccent ? (
                  <>
                    {" "}
                    <span className="font-serif font-normal italic">
                      {data.principlesAccent}
                    </span>
                  </>
                ) : null}
              </>
            }
          />
        </Reveal>

        <Reveal>
          <ul className="mt-12 overflow-hidden rounded-2xl border border-line bg-surface">
            {principles.map((p, i) => (
              <li
                key={i}
                className="flex items-center gap-4 border-t border-line px-6 py-5 transition-colors duration-200 first:border-t-0 hover:bg-paper-2/50 md:gap-5 md:px-8 md:py-6"
              >
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-lime text-ink">
                  <Check className="size-4" />
                </span>
                <span className="text-lg font-semibold tracking-tight md:text-xl">
                  {p}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
