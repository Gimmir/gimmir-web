import Image from "next/image";

import { FinalCtaPanel } from "@/components/shared/final-cta-panel";
import { Container } from "@/components/ui/container";
import { CountUp } from "@/components/ui/count-up";
import { Mark } from "@/components/ui/mark";
import { Marquee } from "@/components/ui/marquee";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { CaseBackLink } from "@/components/work/parts";
import type { CaseStudy } from "@/lib/cases";

const SCREENS = [
  { src: "/screens-all/frame-1.jpg", alt: "Jimmy Coach — the member home screen with today’s workout, steps and weight progress" },
  { src: "/screens-all/frame-5.jpg", alt: "Jimmy Coach — a personal program with weekly progress and upcoming workouts" },
  { src: "/screens-all/frame-2.jpg", alt: "Jimmy Coach — a workout broken into warm-up, power, strength and conditioning blocks" },
  { src: "/screens-all/frame-3.jpg", alt: "Jimmy Coach — logging reps, weights and coach’s notes during a live session" },
  { src: "/screens-all/frame-4.jpg", alt: "Jimmy Coach — direct chats between a client and their coach" },
  { src: "/screens-all/frame-6.jpg", alt: "Jimmy Coach — progress tracking for steps and body weight over time" },
];

/* --- tiny stroke glyphs, matching the site's illustration language --------- */

function GlyphPhone() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className="size-6">
      <rect x="7" y="2.5" width="10" height="19" rx="2.5" className="stroke-lime" strokeWidth="1.7" />
      <line x1="10.2" y1="5.4" x2="13.8" y2="5.4" className="stroke-lime" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function GlyphCoach() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className="size-6">
      <rect x="7" y="2.5" width="10" height="19" rx="2.5" className="stroke-lime" strokeWidth="1.7" />
      <path d="M9.8 13.5 11.3 15l3-3.4" className="stroke-lime" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="10" y1="8.6" x2="14" y2="8.6" className="stroke-lime" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function GlyphDashboard() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className="size-6">
      <rect x="2.5" y="4" width="19" height="13" rx="2" className="stroke-lime" strokeWidth="1.7" />
      <line x1="8" y1="20.5" x2="16" y2="20.5" className="stroke-lime" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M6.5 13.2 10 9.8l2.6 2.4 4.6-4.4" className="stroke-lime" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const SURFACES = [
  {
    glyph: <GlyphPhone />,
    tag: "Native app · iOS & Android",
    title: "The client app",
    desc: "Where members train, every day. Today’s workout in clear blocks with timers and video form cues, chat with the coach, the community feed, streaks and PR history — under the coach’s own brand, their logo and colors on the home screen.",
  },
  {
    glyph: <GlyphCoach />,
    tag: "Native app · iOS & Android",
    title: "The coach app",
    desc: "The business in a pocket. Coaches program workouts, answer clients, drop announcements to the community and watch payments come in — between sessions, from the gym floor, not from a laptop.",
  },
  {
    glyph: <GlyphDashboard />,
    tag: "Web",
    title: "The dashboard",
    desc: "The heavy lifting: the workout and course builders, client management, Stripe subscriptions and revenue analytics. Everything a coaching business runs on, in one place instead of five tools.",
  },
];

const CAPABILITIES = [
  {
    title: "Workout builder",
    desc: "EMOM, AMRAP, circuits and strength — structured blocks with video form cues, written the way the best coaches actually program.",
  },
  {
    title: "Community feed",
    desc: "Skool-style posts, reactions and group challenges that turn a client list into a place people belong.",
  },
  {
    title: "Messaging",
    desc: "1:1 and group chat with voice notes, photos and video — so coaching stops living in WhatsApp.",
  },
  {
    title: "Payments & subscriptions",
    desc: "Stripe billing built in: recurring plans, automated charges and revenue analytics. No chasing invoices.",
  },
  {
    title: "Courses",
    desc: "Modules, lessons and full programs packaged next to the training — knowledge the coach sells, not just sessions.",
  },
  {
    title: "Progress & PRs",
    desc: "Lifts, benchmarks, streaks and graphs — clients see themselves getting better, which is why they stay.",
  },
  {
    title: "Video exercise library",
    desc: "Every movement with a demonstration, ready to drop into any block of any workout.",
  },
  {
    title: "Their own branded app",
    desc: "Each coach’s logo and colors — their app on the client’s home screen, not another account in someone else’s tool.",
  },
];

const TIMELINE = [
  {
    tag: "Day 0",
    title: "An empty repository",
    desc: "Co-founded with a coach. No code, no designs — a bet that independent coaches deserve better than PDFs and spreadsheets.",
  },
  {
    tag: "Product",
    title: "Design system & platform",
    desc: "One design language, one API, one data model — built once, powering every surface.",
  },
  {
    tag: "Build",
    title: "Two apps + web",
    desc: "Native client and coach apps and the web dashboard, built in parallel by the same small team.",
  },
  {
    tag: "Launch",
    title: "App Store, then traction",
    desc: "Live in the App Store, 300+ users in the first month — and a weekly release cadence ever since.",
  },
];

const RESULTS = [
  { value: 100, suffix: "+", label: "active coaches on the platform" },
  { value: 300, suffix: "+", label: "users in the first month after launch" },
  { value: 500, suffix: "+", label: "expert workouts, ready on tap" },
  { value: 2, suffix: "", label: "native apps — client and coach — plus web" },
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
          <Reveal eager>
            <CaseBackLink />
          </Reveal>

          <Reveal eager delay={40}>
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

          <Reveal eager delay={80}>
            <h1 className="display mt-9 text-[2.1rem] leading-[1.08] sm:text-hero sm:leading-[0.98]">
              Clients don&rsquo;t just train.
              <br />
              <Mark>They belong.</Mark>
            </h1>
          </Reveal>

          <Reveal eager delay={120}>
            <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between md:gap-12">
              <p className="max-w-[54ch] text-lg leading-relaxed text-muted md:text-xl">
                Jimmy is the retention platform for modern fitness coaches — the
                &ldquo;Skool of Fitness.&rdquo; A whole platform: two native
                mobile apps and a web dashboard, with programs, community,
                messaging, payments and courses inside. We co-founded it and
                built all of it, end to end.
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
                  <dd className="mt-2 font-semibold">2 native apps · Web</dd>
                </div>
              </dl>
            </div>
          </Reveal>
        </Container>
      </section>

      <Marquee
        items={[
          "Workout builder",
          "Community feed",
          "1:1 & group chat",
          "Stripe subscriptions",
          "Courses",
          "PRs & progress",
          "Branded apps",
        ]}
      />

      {/* inside the app — screenshot gallery */}
      <section className="overflow-hidden pb-20 pt-14 md:pb-28 md:pt-16">
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

      {/* what it is + the real story */}
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
                  Jimmy was co-founded with{" "}
                  <strong className="font-semibold text-ink">
                    a working coach
                  </strong>{" "}
                  — Quentin Randis, who has coached 250+ clients in Hyrox,
                  CrossFit and functional fitness. He brought the coaching
                  judgment; we brought everything else:{" "}
                  <strong className="font-semibold text-ink">
                    product, design and engineering, from an empty repository to
                    the App Store
                  </strong>
                  . Not billed by the hour — built as owners.
                </p>
                <blockquote className="rounded-2xl border border-line bg-surface p-6 text-base leading-relaxed md:p-7">
                  <p className="text-ink">
                    &ldquo;Not a disguised web wrapper or a vibe-coding project.
                    It&rsquo;s a high-performance mobile app built by engineers,
                    designed for stability and scalability.&rdquo;
                  </p>
                  <footer className="mt-3 font-mono text-xs uppercase tracking-widest text-muted">
                    How jimmycoach.com describes the product we built
                  </footer>
                </blockquote>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* one platform, three surfaces — dark band */}
      <section className="bg-ink text-paper">
        <Container className="py-20 md:py-28">
          <Reveal>
            <SectionHeader
              index="02"
              onDark
              titleMax="max-w-[24ch]"
              title={
                <>
                  One platform,{" "}
                  <span className="font-serif font-normal italic text-lime">
                    three surfaces.
                  </span>
                </>
              }
              intro="Not a website with a mobile view. Two native apps and a web dashboard on one shared platform — each surface built for how it is actually used."
            />
          </Reveal>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {SURFACES.map((s, i) => (
              <Reveal key={s.title} delay={i * 80} className="h-full">
                <div className="flex h-full flex-col rounded-2xl border border-paper/15 p-7 md:p-8">
                  <div className="flex items-center justify-between">
                    {s.glyph}
                    <span className="rounded-full border border-lime/40 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-lime">
                      {s.tag}
                    </span>
                  </div>
                  <h3 className="mt-6 text-2xl font-bold tracking-tight">
                    {s.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-[#c9c6bc]">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <p className="mt-10 max-w-[62ch] text-lg leading-relaxed text-[#8b887e]">
              One design system, one API, one data model underneath — which is
              how a small team ships{" "}
              <strong className="font-semibold text-paper">
                a new feature every week
              </strong>{" "}
              across all three surfaces without them drifting apart.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* what we built */}
      <section className="border-t border-line py-20 md:py-28">
        <Container>
          <Reveal>
            <SectionHeader
              index="03"
              titleMax="max-w-[24ch]"
              title="Everything a coaching business runs on."
              intro="Two sides in one product: the app clients train in, and the tools coaches run their business with."
            />
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {CAPABILITIES.map((c, i) => (
              <Reveal key={c.title} delay={(i % 4) * 60} className="h-full">
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

      {/* from zero to the App Store */}
      <section className="border-t border-line py-20 md:py-28">
        <Container>
          <Reveal>
            <SectionHeader
              index="04"
              titleMax="max-w-[22ch]"
              title="From an empty repo to the App Store."
              intro="Built the way we build for clients: senior team, honest scope, working software early and often."
            />
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {TIMELINE.map((t, i) => (
              <Reveal key={t.title} delay={i * 70} className="h-full">
                <div className="relative flex h-full flex-col rounded-2xl border border-line bg-surface p-7">
                  <span className="inline-flex w-fit items-center rounded-full bg-lime px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-ink">
                    {t.tag}
                  </span>
                  <h3 className="mt-5 text-xl font-bold tracking-tight">
                    {t.title}
                  </h3>
                  <p className="mt-2 leading-relaxed text-muted">{t.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <p className="mt-10 max-w-[62ch] text-lg leading-relaxed text-muted">
              Because we run Jimmy as owners, every hard problem — App Store
              review, Stripe billing edge cases, chat at scale, keeping two
              native apps in lockstep — is a problem{" "}
              <strong className="font-semibold text-ink">
                we have already solved for ourselves
              </strong>{" "}
              before a client ever pays us to solve it for them.
            </p>
          </Reveal>
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
              <div className="mt-8 grid gap-10 sm:grid-cols-2 md:grid-cols-4 md:gap-12">
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
              <p className="mt-10 border-t border-ink/15 pt-6 text-ink/70">
                Live in the App Store, growing week over week — and still built
                and run by the same team you would be working with.
              </p>
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
