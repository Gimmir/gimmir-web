import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import type { REVIEW_QUERY_RESULT } from "@/sanity/types";

export function DeliverablesSection({
  data,
}: {
  data: NonNullable<REVIEW_QUERY_RESULT>;
}) {
  const items = data.deliverablesItems ?? [];

  return (
    <section className="border-t border-line py-20 md:py-28">
      <Container>
        <Reveal>
          <SectionHeader
            index="03"
            titleMax="max-w-[34ch]"
            title={
              <>
                {data.deliverablesHeading}
                {data.deliverablesAccent ? (
                  <>
                    {" "}
                    <span className="font-serif font-normal italic">
                      {data.deliverablesAccent}
                    </span>
                  </>
                ) : null}
              </>
            }
            intro={data.deliverablesIntro}
          />
        </Reveal>

        <Reveal>
          <div className="mt-12 overflow-hidden rounded-2xl border border-line bg-surface">
            {items.map((d, i) => (
              <div
                key={d._key}
                className="group grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-1.5 border-t border-line px-6 py-5 transition-colors duration-200 first:border-t-0 hover:bg-paper-2/60 md:grid-cols-[auto_minmax(0,0.8fr)_minmax(0,1.5fr)] md:gap-x-8 md:px-8 md:py-6"
              >
                <span className="inline-flex items-center justify-center rounded-md bg-lime px-2.5 py-1 text-xs font-extrabold tabular-nums text-ink">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-lg font-bold tracking-tight md:text-xl">
                  {d.title}
                </h3>
                <p className="col-span-2 text-[15px] leading-relaxed text-muted md:col-span-1 md:text-base">
                  {d.body}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <p className="mt-8 max-w-[60ch] text-lg leading-relaxed text-muted">
            {data.deliverablesClosing}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
