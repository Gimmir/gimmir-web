import Image from "next/image";

import { FinalCtaPanel } from "@/components/shared/final-cta-panel";
import { Container } from "@/components/ui/container";
import { CountUp } from "@/components/ui/count-up";
import { Mark } from "@/components/ui/mark";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { CaseBackLink, CasePlaceholder } from "@/components/work/parts";
import type { CaseStudy } from "@/lib/cases";

const SCREENS = [
  { src: "/screens-all/frame-1.jpg", alt: "Jimmy Coach — the member home screen with today’s workout, steps and weight progress" },
  { src: "/screens-all/frame-5.jpg", alt: "Jimmy Coach — a personal program with weekly progress and upcoming workouts" },
  { src: "/screens-all/frame-2.jpg", alt: "Jimmy Coach — a workout broken into warm-up, power, strength and conditioning blocks" },
  { src: "/screens-all/frame-3.jpg", alt: "Jimmy Coach — logging reps, weights and coach’s notes during a live session" },
  { src: "/screens-all/frame-4.jpg", alt: "Jimmy Coach — direct chats between a client and their coach" },
  { src: "/screens-all/frame-6.jpg", alt: "Jimmy Coach — progress tracking for steps and body weight over time" },
];

const CAPABILITIES = [
  {
    title: "Workout builder",
    desc: "Program EMOM, AMRAP, circuits and strength — with video form cues, the way the best coaches actually write.",
  },
  {
    title: "Community feed",
    desc: "Skool-style posts, reactions and group challenges that turn a client list into a place people belong.",
  },
  {
    title: "Messaging",
    desc: "1:1 and group chat, so coaches and clients stay in one app instead of scattered across WhatsApp.",
  },
  {
    title: "Payments & subscriptions",
    desc: "Stripe billing built in — recurring plans and automated payments, no chasing invoices.",
  },
  {
    title: "Courses",
    desc: "Package knowledge into courses that live right next to the training, Skool-style.",
  },
  {
    title: "Their own branded app",
    desc: "A native iOS and Android app under the coach’s brand — not another logo in someone else’s tool.",
  },
];

const RESULTS = [
  { value: 100, suffix: "+", label: "active coaches on the platform" },
  { value: 300, suffix: "+", label: "users in the first month after launch" },
  { value: 500, suffix: "+", label: "expert workouts, ready on tap", lime: true },
];

export function JimmyCaseStudy({ data }: { data: CaseStudy }) {
  return (
    <article>
      {/* hero */}
      <section id="top" className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 -top-24 size-[30rem] rounded-full bg-lime/25 blur-[130px]"
        />
        <Container className="relative pb-14 pt-28 sm:pt-32 md:pb-16 md:pt-36">
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
              <span className="text-2xl font-extrabold tracking-tight">
                {data.name}
              </span>
              <span className="rounded-full border border-ink px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-ink">
                {data.tag}
              </span>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="display mt-9 text-[2.1rem] leading-[1.08] sm:text-hero sm:leading-[0.98]">
              Clients don&rsquo;t just train.
              <br />
              <Mark>They belong.</Mark>
            </h1>
          </Reveal>

          <Reveal delay={120}>
            <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between md:gap-12">
              <p className="max-w-[54ch] text-lg leading-relaxed text-muted md:text-xl">
                Jimmy is the retention platform for modern fitness coaches — the
                &ldquo;Skool of Fitness.&rdquo; Programs, community, messaging,
                payments and courses in one branded app. We co-founded it and
                built it end to end.
              </p>
              <dl className="grid shrink-0 grid-cols-2 gap-x-10 gap-y-6 sm:grid-cols-3 md:text-right">
                <div>
                  <dt className="font-mono text-xs uppercase tracking-widest text-muted">
                    Industry
                  </dt>
                  <dd className="mt-2 font-semibold">Fitness platform</dd>
                </div>
                <div>
                  <dt className="font-mono text-xs uppercase tracking-widest text-muted">
                    Our role
                  </dt>
                  <dd className="mt-2 font-semibold">Co-founder</dd>
                </div>
                <div>
                  <dt className="font-mono text-xs uppercase tracking-widest text-muted">
                    Platform
                  </dt>
                  <dd className="mt-2 font-semibold">iOS · Android · Web</dd>
                </div>
              </dl>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* inside the app — screenshot gallery */}
      <section className="overflow-hidden pb-20 pt-8 md:pb-28 md:pt-12">
        <Container className="mb-8 md:mb-10">
          <Reveal>
            <p className="font-mono text-sm uppercase tracking-widest text-muted">
              Inside the app
            </p>
          </Reveal>
        </Container>
        <Reveal>
          <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 sm:gap-5 sm:px-6 md:px-10 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
            {SCREENS.map((s) => (
              <div
                key={s.src}
                className="snap-start shrink-0 overflow-hidden rounded-3xl border border-line"
              >
                <Image
                  src={s.src}
                  alt={s.alt}
                  width={1242}
                  height={2688}
                  className="h-[440px] w-auto sm:h-[520px]"
                  sizes="(max-width: 640px) 200px, 240px"
                />
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* what it is */}
      <section className="border-t border-line py-20 md:py-28">
        <Container>
          <div className="grid gap-12 md:grid-cols-[0.85fr_1.15fr] md:items-start md:gap-16">
            <Reveal>
              <SectionHeader
                index="01"
                titleMax="max-w-[16ch]"
                title="Not a management tool. A place clients belong."
              />
            </Reveal>
            <Reveal delay={80}>
              <div className="space-y-6 text-lg leading-relaxed text-muted md:text-xl">
                <p>
                  Most coaches run their business across WhatsApp, spreadsheets
                  and PDFs — and lose clients in the gaps. Jimmy pulls it into{" "}
                  <strong className="font-semibold text-ink">
                    one branded app
                  </strong>{" "}
                  where clients get their program, track every session, talk to
                  their coach, and belong to a community.
                </p>
                <p>
                  We did not join to bill hours. We{" "}
                  <strong className="font-semibold text-ink">co-founded it</strong>{" "}
                  and built the product end to end — from an empty repository to a
                  platform coaches and their clients use every day.
                </p>
                <CasePlaceholder label="Story — real detail">
                  Add the origin: whose idea, how the team came together, and what
                  made you bet on it. Founders reading this want the real story.
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
              titleMax="max-w-[24ch]"
              title="One platform for everything a coaching business runs on."
              intro="Two sides in one product: the app clients train in, and the tools coaches run their business with."
            />
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CAPABILITIES.map((c, i) => (
              <Reveal key={c.title} delay={(i % 3) * 60} className="h-full">
                <div className="flex h-full flex-col rounded-2xl border border-line bg-surface p-7">
                  <span className="flex size-10 items-center justify-center rounded-lg bg-lime font-mono text-sm font-bold text-ink">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-5 text-xl font-bold tracking-tight">
                    {c.title}
                  </h3>
                  <p className="mt-2 leading-relaxed text-muted">{c.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* the result — lime band */}
      <section className="border-t border-line py-20 md:py-28">
        <Container>
          <Reveal>
            <div className="overflow-hidden rounded-[28px] bg-lime p-8 text-ink sm:p-10 md:p-14">
              <p className="font-mono text-sm uppercase tracking-widest text-ink/60">
                The result
              </p>
              <div className="mt-8 grid gap-10 sm:grid-cols-3 md:gap-12">
                {RESULTS.map((s, i) => (
                  <div key={i}>
                    <div className="display text-[clamp(2.75rem,6vw,4rem)] leading-none text-ink">
                      <CountUp value={s.value} suffix={s.suffix} />
                    </div>
                    <p className="mt-3 max-w-[24ch] leading-relaxed text-ink/70">
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
        title="Have an idea worth building right?"
        intro="Tell us what you are working on. We will tell you honestly how we would approach it — and whether we are the right team for it."
        buttonLabel="Book a founder review call"
      />
    </article>
  );
}
