import Image from "next/image";
import Link from "next/link";

import { FinalCtaPanel } from "@/components/shared/final-cta-panel";
import { HeaderDark } from "@/components/site/header-theme";
import { Container } from "@/components/ui/container";
import { CountUp } from "@/components/ui/count-up";
import { ArrowRight } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { CaseBackLink, CaseQuote, QuickFacts } from "@/components/work/parts";
import { BOOKINGS } from "@/lib/booking";
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
          <Reveal eager>
            <CaseBackLink onDark />
          </Reveal>

          <Reveal eager delay={40}>
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

          <Reveal eager delay={80}>
            <h1 className="display mt-9 text-[2.1rem] leading-[1.06] sm:text-hero sm:leading-[0.98]">
              UN1T kept about $10k a month
              <br />
              <span className="text-lime">by owning their platform.</span>
            </h1>
          </Reveal>

          <Reveal eager delay={120}>
            <p className="mt-8 max-w-[54ch] text-lg leading-relaxed text-paper/70 md:text-xl">
              {data.summary}
            </p>
          </Reveal>

          <Reveal eager delay={160}>
            <QuickFacts facts={data.facts} onDark className="mt-14" />
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
                  UN1T had grown to 10+ locations on a rented{" "}
                  <strong className="font-semibold text-ink">
                    white-label booking platform
                  </strong>
                  . Every member and every payment carried a fee, about $10k a
                  month leaving the business, and the member experience and
                  data lived on a system they didn&rsquo;t own.
                </p>
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
              intro="We built UN1T their own member app (iOS & Android), a back office for classes, memberships and staff across locations, and payments with fees and payouts modeled around a multi-location franchise. Everything in UN1T’s name from day one."
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
              <p className="relative mt-10 max-w-[60ch] text-lg leading-relaxed text-paper/75">
                About $10k a month in platform and payment fees now stays
                inside the business. UN1T owns their app, their data and their
                member relationship.
              </p>
            </div>
          </Reveal>

          {data.quote ? (
            <Reveal>
              <CaseQuote quote={data.quote} className="mt-12" />
            </Reveal>
          ) : null}

          <Reveal>
            <Link
              href="/operators"
              className="group mt-8 inline-flex items-center gap-2 text-lg font-semibold text-ink"
            >
              Run 8+ locations? See your own number
              <ArrowRight className="size-[18px] transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
        </Container>
      </section>

      <FinalCtaPanel
        eyebrow="Platform cost check"
        title="What would owning your platform keep in your business?"
        intro={`${BOOKINGS.costCheck.minutes} minutes with Nazar. Bring your last platform invoice and processing statement, and you leave with your number.`}
        bookings={["costCheck"]}
      />
    </article>
  );
}
