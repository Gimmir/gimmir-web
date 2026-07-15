import Image from "next/image";

import { FinalCtaPanel } from "@/components/shared/final-cta-panel";
import { Container } from "@/components/ui/container";
import { CountUp } from "@/components/ui/count-up";
import { Check } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { CaseBackLink, CasePlaceholder } from "@/components/work/parts";
import type { CaseStudy } from "@/lib/cases";

const dots =
  "[background-image:radial-gradient(rgba(246,244,238,0.05)_1px,transparent_1.5px)] [background-size:22px_22px]";

export function StandardCaseStudy({ data }: { data: CaseStudy }) {
  const story = data.story;

  return (
    <article>
      {/* hero */}
      <section id="top" className="relative overflow-hidden">
        <Container className="pb-16 pt-28 sm:pt-32 md:pb-24 md:pt-36">
          <Reveal>
            <CaseBackLink />
          </Reveal>

          <Reveal delay={40}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Image
                src={data.logo}
                alt={`${data.name} logo`}
                width={52}
                height={52}
                priority
                className="size-[52px] rounded-xl border border-line object-cover"
              />
              <span className="rounded-full border border-ink px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-ink">
                {data.tag}
              </span>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="display mt-8 text-[2.4rem] leading-[1.02] sm:text-hero sm:leading-[0.98]">
              {data.name}
            </h1>
          </Reveal>

          <Reveal delay={120}>
            <p className="mt-8 max-w-[54ch] text-lg leading-relaxed text-muted md:text-xl">
              {data.summary}
            </p>
          </Reveal>

          <Reveal delay={160}>
            <dl className="mt-14 grid gap-8 border-t border-line pt-8 sm:grid-cols-2">
              <div>
                <dt className="font-mono text-xs uppercase tracking-widest text-muted">
                  Industry
                </dt>
                <dd className="mt-2 text-lg text-ink">{data.industry}</dd>
              </div>
              <div>
                <dt className="font-mono text-xs uppercase tracking-widest text-muted">
                  What we did
                </dt>
                <dd className="mt-2 flex flex-wrap gap-2">
                  {data.services.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-line px-3 py-1 text-sm text-muted"
                    >
                      {s}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
          </Reveal>
        </Container>
      </section>

      {/* challenge */}
      <section className="border-t border-line py-20 md:py-28">
        <Container>
          <div className="grid gap-12 md:grid-cols-[0.8fr_1.2fr] md:items-start md:gap-16">
            <Reveal>
              <SectionHeader
                index="01"
                titleMax="max-w-[12ch]"
                title="The challenge."
              />
            </Reveal>
            <Reveal delay={80}>
              {story?.challenge ? (
                <p className="text-lg leading-relaxed text-muted md:text-xl">
                  {story.challenge}
                </p>
              ) : (
                <CasePlaceholder label="Challenge">
                  What state was the product in, and what needed to change? One
                  or two honest sentences.
                </CasePlaceholder>
              )}
            </Reveal>
          </div>
        </Container>
      </section>

      {/* approach */}
      <section className="border-t border-line py-20 md:py-28">
        <Container>
          <Reveal>
            <SectionHeader index="02" title="What we did." />
          </Reveal>

          {story?.approach?.length ? (
            <div className="mt-12 grid gap-4">
              {story.approach.map((point, i) => (
                <Reveal key={i} delay={(i % 3) * 60}>
                  <div className="flex items-start gap-4 rounded-2xl border border-line bg-surface p-6 md:p-7">
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-lime text-ink">
                      <Check className="size-4" />
                    </span>
                    <p className="text-lg leading-relaxed">{point}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="mt-12 grid gap-5 sm:grid-cols-2">
              {data.services.map((s, i) => (
                <Reveal key={s} delay={(i % 2) * 70} className="h-full">
                  <div className="flex h-full items-center gap-4 rounded-2xl border border-line bg-surface p-7">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-lime font-mono text-sm font-bold text-ink">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-lg font-semibold tracking-tight">{s}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* result */}
      <section className="border-t border-line py-20 md:py-28">
        <Container>
          <Reveal>
            <div className="relative overflow-hidden rounded-[28px] bg-ink p-8 text-paper sm:p-10 md:p-14">
              <div
                aria-hidden
                className={`pointer-events-none absolute inset-0 ${dots}`}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -right-20 -top-24 size-80 rounded-full bg-lime/20 blur-[110px]"
              />
              <p className="relative font-mono text-sm uppercase tracking-widest text-lime">
                The result
              </p>

              {story?.outcome ? (
                <p className="relative mt-6 max-w-[60ch] text-lg leading-relaxed text-paper/85 md:text-xl">
                  {story.outcome}
                </p>
              ) : null}

              {data.stats.length ? (
                <div className="relative mt-10 grid gap-10 sm:grid-cols-2 md:gap-14">
                  {data.stats.map((s, i) => (
                    <div key={i}>
                      <div
                        className={`display text-[clamp(3rem,7vw,4.5rem)] leading-none ${
                          s.lime ? "text-lime" : "text-paper"
                        }`}
                      >
                        {typeof s.value === "number" ? (
                          <CountUp value={s.value} suffix={s.suffix} />
                        ) : (
                          s.text
                        )}
                      </div>
                      <p className="mt-3 max-w-[26ch] leading-relaxed text-paper/70">
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </Reveal>
        </Container>
      </section>

      <FinalCtaPanel
        eyebrow="Let’s talk"
        title="Let’s look at what you are building."
        intro="Tell us what you are working on. We will tell you honestly how we would approach it — and whether we are the right team for it."
        buttonLabel="Book a founder review call"
      />
    </article>
  );
}
