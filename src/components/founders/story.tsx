import { Container } from "@/components/ui/container";
import { Pencil } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import type { FOUNDERS_PAGE_QUERY_RESULT } from "@/sanity/types";

export function StorySection({
  data,
}: {
  data: NonNullable<FOUNDERS_PAGE_QUERY_RESULT>;
}) {
  const stats = data.storyStats ?? [];
  const differenceBig = (data.storyDifferenceBig ?? "").replace(/\.+$/, "");

  return (
    <section className="border-t border-line py-20 md:py-28">
      <Container>
        <Reveal>
          <SectionHeader
            index="01"
            titleMax="max-w-[24ch]"
            title={
              <>
                {data.storyHeading}
                {data.storyAccent ? (
                  <>
                    {" "}
                    <span className="font-serif font-normal italic">
                      {data.storyAccent}
                    </span>
                  </>
                ) : null}
              </>
            }
          />
        </Reveal>

        {/* the answer — a dark proof stage */}
        <Reveal>
          <div className="relative mt-12 overflow-hidden rounded-[28px] bg-ink p-8 text-paper sm:p-10 md:p-14">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 [background-image:radial-gradient(rgba(246,244,238,0.06)_1px,transparent_1.6px)] [background-size:22px_22px]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -right-24 -top-28 size-80 rounded-full bg-lime/25 blur-[120px]"
            />

            <div className="relative grid gap-10 md:grid-cols-2 md:items-center md:gap-14">
              <div>
                <p className="font-mono text-sm uppercase tracking-widest text-lime">
                  {data.storyDifferenceLabel}
                </p>
                <p className="display mt-5 text-[clamp(3.5rem,10vw,6.5rem)] leading-[0.82]">
                  {differenceBig}
                  <span className="text-lime">.</span>
                </p>
                <p className="mt-7 max-w-[38ch] text-lg leading-relaxed text-paper/70">
                  {data.storyDifferenceSub}
                </p>
              </div>

              <div className="grid gap-5">
                {stats.map((s, i) => (
                  <Reveal key={s._key} delay={i * 90}>
                    <div className="rounded-2xl border border-paper/10 bg-paper/[0.04] p-6 backdrop-blur-sm md:p-7">
                      <div className="display text-[clamp(2.75rem,6vw,3.75rem)] leading-none text-lime">
                        {s.value}
                      </div>
                      <p className="mt-3 max-w-[34ch] leading-relaxed text-paper/60">
                        {s.label}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* the story continues */}
        <div className="mt-14">
          <div className="grid gap-x-14 gap-y-6 md:grid-cols-2">
            <Reveal>
              <p className="text-lg leading-relaxed text-muted md:text-xl">
                {data.storyBody1}
              </p>
            </Reveal>

            <Reveal delay={80}>
              <p className="text-lg leading-relaxed text-muted md:text-xl">
                {data.storyBody2}
              </p>
            </Reveal>
          </div>

          {/* origin — the founders write this */}
          <Reveal delay={80}>
            <div className="relative mt-10 overflow-hidden rounded-2xl border border-dashed border-ink/25 bg-paper-2/50 p-6 md:p-8">
              <span
                aria-hidden
                className="absolute inset-y-0 left-0 w-1 bg-lime/60"
              />
              <div className="flex flex-col gap-5 sm:flex-row sm:gap-6">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-lime text-ink">
                  <Pencil className="size-5" />
                </span>

                <div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    <span className="font-mono text-xs uppercase tracking-widest text-ink/70">
                      {data.storyOriginLabel}
                    </span>
                    <span className="rounded-full border border-ink/20 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-faint">
                      {data.storyOriginCaption}
                    </span>
                  </div>

                  <p className="mt-3 max-w-[64ch] leading-relaxed text-muted">
                    {data.storyOriginBody}
                  </p>

                  <div className="mt-5 flex items-center gap-3">
                    <div className="flex -space-x-2">
                      <span className="flex size-7 items-center justify-center rounded-full bg-lime text-[10px] font-bold text-ink ring-2 ring-paper-2">
                        NM
                      </span>
                      <span className="flex size-7 items-center justify-center rounded-full bg-surface text-[10px] font-bold text-ink ring-2 ring-paper-2">
                        OP
                      </span>
                    </div>
                    <span className="text-sm text-faint">
                      In Nazar &amp; Oleh&rsquo;s words
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
