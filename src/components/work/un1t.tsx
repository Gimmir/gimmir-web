import Image from "next/image";

import { FinalCtaPanel } from "@/components/shared/final-cta-panel";
import { HeaderDark } from "@/components/site/header-theme";
import { Container } from "@/components/ui/container";
import { CountUp } from "@/components/ui/count-up";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { CaseBackLink, CasePlaceholder } from "@/components/work/parts";
import type { CaseStudy } from "@/lib/cases";

const dots =
  "[background-image:radial-gradient(rgba(246,244,238,0.05)_1px,transparent_1.5px)] [background-size:22px_22px]";

export function Un1tCaseStudy({ data }: { data: CaseStudy }) {
  return (
    <article>
      <HeaderDark />
      {/* hero — dark, cinematic */}
      <section className="relative overflow-hidden bg-ink text-paper">
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-0 ${dots}`}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-28 size-[26rem] rounded-full bg-lime/20 blur-[130px]"
        />

        <Container className="relative pb-16 pt-28 sm:pt-32 md:pb-24 md:pt-36">
          <Reveal>
            <CaseBackLink onDark />
          </Reveal>

          <Reveal delay={40}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Image
                src={data.logo}
                alt={`${data.name} logo`}
                width={52}
                height={52}
                priority
                className="size-[52px] rounded-xl border border-paper/15 object-cover"
              />
              <span className="text-2xl font-extrabold tracking-tight">
                {data.name}
              </span>
              <span className="rounded-full border border-lime/40 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-lime">
                {data.tag}
              </span>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="display mt-9 text-[2.1rem] leading-[1.06] sm:text-hero sm:leading-[0.98]">
              Off a rented platform.
              <br />
              <span className="text-lime">Onto their own.</span>
            </h1>
          </Reveal>

          <Reveal delay={120}>
            <p className="mt-8 max-w-[54ch] text-lg leading-relaxed text-paper/70 md:text-xl">
              {data.summary}
            </p>
          </Reveal>

          <Reveal delay={160}>
            <dl className="mt-14 grid gap-8 border-t border-paper/15 pt-8 sm:grid-cols-2">
              <div>
                <dt className="font-mono text-xs uppercase tracking-widest text-lime">
                  Industry
                </dt>
                <dd className="mt-2 text-lg text-paper/85">{data.industry}</dd>
              </div>
              <div>
                <dt className="font-mono text-xs uppercase tracking-widest text-lime">
                  Our role
                </dt>
                <dd className="mt-2 text-lg text-paper/85">
                  Platform design &amp; engineering
                </dd>
              </div>
            </dl>
          </Reveal>
        </Container>
      </section>

      {/* the challenge */}
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
              <div className="space-y-6 text-lg leading-relaxed text-muted md:text-xl">
                <p>
                  UN1T ran its members, bookings, and payments on a{" "}
                  <strong className="font-semibold text-ink">
                    third-party platform
                  </strong>
                  . As the franchise grew across locations, that meant renting
                  software they could not fully control — and losing tens of
                  thousands a month to payment fees baked into someone
                  else&rsquo;s system.
                </p>
                <CasePlaceholder label="Challenge — real detail">
                  Add the specifics: which platform, what actually broke as you
                  scaled, and the moment you decided to move. Concrete beats
                  general.
                </CasePlaceholder>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* what we built */}
      <section className="border-t border-line py-20 md:py-28">
        <Container>
          <Reveal>
            <SectionHeader
              index="02"
              titleMax="max-w-[22ch]"
              title="Their own app and back office, end to end."
              intro="We replaced the rented stack with a platform they own — one system across every location."
            />
          </Reveal>

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
        </Container>
      </section>

      {/* the result — dark band */}
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
              <div className="relative mt-8 grid gap-10 sm:grid-cols-2 md:gap-14">
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
            </div>
          </Reveal>
        </Container>
      </section>

      <FinalCtaPanel
        eyebrow="Let’s talk"
        title="Building something that has to scale?"
        intro="Tell us what you are working on. We will tell you honestly how we would approach it — and whether we are the right team for it."
        buttonLabel="Book a founder review call"
        buttonHref="/the-review"
      />
    </article>
  );
}
