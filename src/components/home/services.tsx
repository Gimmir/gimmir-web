import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import type { HOME_QUERY_RESULT } from "@/sanity/types";

export function ServicesSection({
  data,
}: {
  data: NonNullable<HOME_QUERY_RESULT>;
}) {
  return (
    <section
      id="process"
      className="scroll-mt-24 border-t border-line py-20 md:py-28"
    >
      <Container>
        <Reveal>
          <SectionHeader
            index="03"
            titleMax="max-w-[32ch]"
            title={
              <>
                {data.servicesHeading}
                {data.servicesAccent ? (
                  <>
                    {" "}
                    <span className="font-serif font-normal italic">
                      {data.servicesAccent}
                    </span>
                  </>
                ) : null}
              </>
            }
          />
        </Reveal>

        <div className="mt-10 grid border-t border-line sm:grid-cols-2 sm:gap-x-12">
          {(data.servicesItems ?? []).map((s, i) => (
            <Reveal key={s._key} delay={(i % 2) * 70}>
              <div className="flex h-full flex-col gap-3.5 border-b border-line py-8 md:py-9">
                <div className="flex items-center gap-3.5">
                  <span className="inline-flex items-center justify-center rounded-md bg-lime px-2.5 py-1 text-xs font-extrabold text-ink">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-[22px] font-bold tracking-tight md:text-2xl">
                    {s.title}
                  </h3>
                </div>
                <p className="max-w-[46ch] text-[17px] leading-relaxed text-muted">
                  {s.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mt-8 max-w-[60ch] text-lg leading-relaxed text-muted">
            {data.servicesFootnote}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
