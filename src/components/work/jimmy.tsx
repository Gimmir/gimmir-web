import Image from "next/image";

import { OutlineStat } from "@/components/blocks/outline-stat";
import { Panel } from "@/components/blocks/ui-fragment";
import { Stage } from "@/components/motion/stage";
import { RiseText, wordCount } from "@/components/motion/words";
import { BookTrigger } from "@/components/blocks/book-trigger";
import { Chaos } from "@/components/saas/chaos";
import { Container } from "@/components/ui/container";
import { ArrowRight } from "@/components/ui/icons";
import {
  CaseAudienceLink,
  CaseBackLink,
  CaseQuote,
} from "@/components/work/parts";
import { jimmy } from "@/content/jimmy";
import type { CaseStudy } from "@/lib/cases";
import { FOUNDERS } from "@/lib/founders";
import { cn } from "@/lib/cn";

/* /work/jimmy-coach, V2 (doc 09 §3.6): a founder story, not a vendor
   case. The request → the decision to invest → the product (real client
   screens) → three decisions as owners → what we got wrong → the numbers
   with their date → Quentin's words once approved → the call signed by
   Nazar (Jimmy is his; Oleh wasn't part of it). */

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

const HERO_SCREENS = [
  {
    src: "/screens-all/frame-5.jpg",
    alt: "Jimmy Coach: a personal program with weekly progress and upcoming workouts",
  },
  {
    src: "/screens-all/frame-1.jpg",
    alt: "Jimmy Coach: the member home screen with today’s workout, steps and weight progress",
  },
  {
    src: "/screens-all/frame-6.jpg",
    alt: "Jimmy Coach: a client’s progress, steps and weight over time",
  },
];

function Label({ children, dark }: { children: string; dark?: boolean }) {
  return (
    <p
      className={cn(
        "fade text-[15px] font-medium",
        dark ? "text-paper/50" : "text-faint",
      )}
    >
      {children}
    </p>
  );
}

function Hero({ data }: { data: CaseStudy }) {
  const { title, sub } = jimmy.hero;
  return (
    <Stage as="section" eager data-tone="paper" className="relative">
      <Container className="grid gap-14 pb-20 pt-28 sm:pt-32 md:pb-28 md:pt-36 lg:min-h-[92svh] lg:grid-cols-12 lg:items-center lg:gap-10">
        <div className="lg:col-span-6">
          <div
            className="fade flex flex-wrap items-center gap-x-8 gap-y-3"
            style={d(0)}
          >
            <CaseBackLink />
            <CaseAudienceLink
              href="/build-your-saas"
              label="Turn your business into a SaaS you own"
            />
          </div>
          <p
            className="fade mt-10 flex flex-wrap items-center gap-3"
            style={d(80)}
          >
            <Image
              src={data.logo}
              alt=""
              width={44}
              height={44}
              priority
              className="size-11 rounded-xl object-cover"
            />
            <span className="text-xl font-extrabold tracking-tight">
              {data.name}
            </span>
            <span className="rounded-full border border-line px-3 py-1 text-[13px] text-muted">
              {data.tag}
            </span>
          </p>
          <h1 className="display mt-8 text-[clamp(2.4rem,1rem+3.4vw,4.25rem)] leading-[1.0]">
            <RiseText text={title} />
          </h1>
          <p
            // no fade: on a phone this is the largest thing on screen, and
            // a fade from zero (run on the GPU) isn't counted as shown until
            // the whole hero has played, which held LCP back by seconds
            className="mt-8 max-w-[52ch] text-lg leading-relaxed text-muted md:text-xl"
          >
            {sub}
          </p>
        </div>
        <div
          className="fade relative mx-auto flex w-full max-w-[600px] items-center justify-center lg:col-span-6"
          style={d(400)}
        >
          {HERO_SCREENS.map((s, n) => (
            <div
              key={s.src}
              className={cn(
                "relative aspect-[1242/2688] overflow-hidden rounded-[22px] shadow-[0_30px_60px_-30px_rgba(21,20,14,0.45)] ring-1 ring-ink/10 md:rounded-[28px]",
                n === 1 ? "z-10 w-[38%]" : "w-[31%]",
                n === 0 && "-mr-[6%] -rotate-[5deg] translate-y-[6%]",
                n === 2 && "-ml-[6%] rotate-[5deg] translate-y-[6%]",
              )}
            >
              <Image
                src={s.src}
                alt={s.alt}
                fill
                priority={n === 1}
                sizes="(min-width: 1024px) 240px, 38vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </Container>
    </Stage>
  );
}

function Origin() {
  const { label, title, body } = jimmy.origin;
  const after = wordCount(title) * 40 + 300;
  return (
    <Stage as="section" data-tone="ink" className="bg-ink text-paper">
      <Container className="grid gap-14 py-20 md:py-28 lg:grid-cols-12 lg:items-center lg:gap-10">
        <div className="lg:col-span-6">
          <Label dark>{label}</Label>
          <h2 className="display mt-6 text-[length:var(--text-title)] leading-[1.02]">
            <RiseText text={title} />
          </h2>
          <p
            className="fade mt-8 max-w-[46ch] text-lg leading-relaxed text-paper/70 md:text-xl"
            style={d(after)}
          >
            {body}
          </p>
        </div>
        <div
          aria-hidden
          className="fade flex justify-center lg:col-span-6"
          style={d(after + 150)}
        >
          <Chaos />
        </div>
      </Container>
    </Stage>
  );
}

function Invest() {
  const { label, title, body, quote } = jimmy.invest;
  const by = FOUNDERS[quote.by];
  const after = wordCount(title) * 40 + 300;
  return (
    <Stage as="section" data-tone="paper">
      <Container className="grid gap-x-10 gap-y-10 py-20 md:py-28 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Label>{label}</Label>
          <h2 className="display mt-6 text-[length:var(--text-title)] leading-[1.02]">
            <RiseText text={title} />
          </h2>
          <p
            className="fade mt-8 max-w-[48ch] text-lg leading-relaxed text-muted md:text-xl"
            style={d(after)}
          >
            {body}
          </p>
        </div>
        <figure className="fade self-end lg:col-span-5" style={d(after + 150)}>
          <blockquote className="font-serif text-[clamp(1.6rem,1rem+1.4vw,2.25rem)] italic leading-snug">
            “{quote.text}”
          </blockquote>
          <figcaption className="mt-5 flex items-center gap-3 text-sm text-muted">
            <span className="relative size-9 overflow-hidden rounded-full bg-paper-2">
              <Image
                src={by.photo}
                alt=""
                fill
                sizes="72px"
                className="object-cover object-top"
              />
            </span>
            {by.first}, {by.also}
          </figcaption>
        </figure>
      </Container>
    </Stage>
  );
}

function DashboardFragment() {
  const rows: [string, string][] = [
    ["Active clients", "Live"],
    ["Programs", "Builder"],
    ["Subscriptions", "Stripe"],
  ];
  return (
    <Panel className="w-full max-w-[340px]">
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <span className="font-semibold">Dashboard</span>
        <span className="text-[11px] text-faint">This month</span>
      </div>
      <div className="flex h-24 items-end gap-1.5 px-4 pt-4">
        {[0.35, 0.5, 0.42, 0.66, 0.58, 0.8, 0.92].map((h, i) => (
          <span
            key={i}
            className={cn(
              "flex-1 rounded-t-md",
              i === 6 ? "bg-lime ring-1 ring-ink/20" : "bg-ink/80",
            )}
            style={{ height: `${h * 100}%` }}
          />
        ))}
      </div>
      <ul className="mt-3">
        {rows.map(([a, b]) => (
          <li
            key={a}
            className="flex items-center justify-between border-t border-line px-4 py-2.5"
          >
            <span className="font-medium">{a}</span>
            <span className="rounded-full bg-paper-2 px-2 py-0.5 text-[11px] text-muted">
              {b}
            </span>
          </li>
        ))}
      </ul>
    </Panel>
  );
}

// Coach app and dashboard: drawn until their real screens are in
function CoachFragment() {
  const rows: [string, string, boolean][] = [
    ["Client 01", "Check-in sent", false],
    ["Client 02", "New PR", true],
    ["Client 03", "Paid · renews", false],
  ];
  return (
    <Panel className="w-full max-w-[300px]">
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <span className="font-semibold">Clients</span>
        <span className="rounded-full bg-paper-2 px-2 py-0.5 text-[11px] text-muted">
          Today
        </span>
      </div>
      <ul>
        {rows.map(([name, note, on]) => (
          <li
            key={name}
            className="flex items-center gap-3 border-b border-line px-4 py-3 last:border-b-0"
          >
            <span className="size-7 shrink-0 rounded-full bg-paper-2" />
            <span className="font-medium">{name}</span>
            <span
              className={cn(
                "ml-auto rounded-full px-2 py-0.5 text-[11px] font-semibold",
                on ? "bg-lime text-ink" : "bg-paper-2 text-muted",
              )}
            >
              {note}
            </span>
          </li>
        ))}
      </ul>
    </Panel>
  );
}

const DRAWN: Record<string, () => React.ReactNode> = {
  coach: CoachFragment,
  dashboard: DashboardFragment,
};

function Product() {
  const { label, title, cards } = jimmy.product;
  const after = wordCount(title) * 40 + 300;
  return (
    <Stage
      as="section"
      data-tone="paper"
      className="border-t border-line bg-paper-2/60"
    >
      <Container className="py-20 md:py-28">
        <Label>{label}</Label>
        <h2 className="display mt-6 max-w-[18ch] text-[length:var(--text-title)] leading-[1.02]">
          <RiseText text={title} />
        </h2>
        <ul className="mt-12 grid gap-4 md:mt-16 md:grid-cols-3">
          {cards.map((c, i) => (
            <li
              key={c.id}
              className="fade flex flex-col rounded-[24px] bg-surface p-2 shadow-[0_1px_0_rgba(21,20,14,0.04),0_28px_56px_-36px_rgba(21,20,14,0.35)] ring-1 ring-line"
              style={d(after + i * 90)}
            >
              <div className="relative flex h-[320px] items-end justify-center overflow-hidden rounded-[18px] bg-paper-2 px-5 pt-6">
                {"screen" in c ? (
                  <div className="relative aspect-[1242/2688] w-[58%] translate-y-[18%] overflow-hidden rounded-t-[22px] shadow-[0_20px_40px_-20px_rgba(21,20,14,0.45)]">
                    <Image
                      src={c.screen}
                      alt={
                        HERO_SCREENS.find((s) => s.src === c.screen)?.alt ??
                        `Jimmy Coach: ${c.title.toLowerCase()} app screen`
                      }
                      fill
                      sizes="220px"
                      className="object-cover object-top"
                    />
                  </div>
                ) : (
                  <div className="flex h-full w-full items-center justify-center pb-6">
                    {DRAWN[c.id]?.()}
                  </div>
                )}
              </div>
              <div className="px-4 pb-4 pt-5 md:px-5">
                <p className="font-mono text-[12px] uppercase tracking-[0.04em] text-faint">
                  {c.tag}
                </p>
                <h3 className="mt-2 text-xl font-bold tracking-[-0.01em]">
                  {c.title}
                </h3>
                <p className="mt-1.5 leading-relaxed text-muted">{c.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </Stage>
  );
}

function Decisions() {
  const { label, items } = jimmy.decisions;
  return (
    <Stage as="section" data-tone="ink" className="bg-ink text-paper">
      <Container className="py-20 md:py-28">
        <h2 className="display max-w-[16ch] text-[length:var(--text-title)] leading-[1.02]">
          <RiseText text={label} />
        </h2>
        <ol className="mt-12 grid gap-4 md:mt-16 md:grid-cols-3">
          {items.map((it, i) => (
            <li
              key={it.title}
              className="fade flex flex-col gap-6 rounded-[24px] bg-ink-soft p-6 ring-1 ring-line-dark md:p-7"
              style={d(wordCount(label) * 40 + 300 + i * 90)}
            >
              <span className="display text-[3.5rem] leading-[0.85] text-transparent [-webkit-text-stroke:1.2px_var(--color-lime)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-2xl font-bold tracking-[-0.01em]">
                  {it.title}
                </h3>
                <p className="mt-3 leading-relaxed text-paper/70">{it.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </Stage>
  );
}

function Wrong() {
  const { label, items } = jimmy.wrong;
  const after = wordCount(label) * 40 + 300;
  return (
    <Stage as="section" data-tone="paper">
      <Container className="grid gap-x-10 gap-y-10 py-20 md:py-28 lg:grid-cols-12">
        <h2 className="display text-[length:var(--text-title)] leading-[1.02] lg:col-span-5">
          <RiseText text={label} />
        </h2>
        <ul className="lg:col-span-7">
          {items.map((it, i) => (
            <li
              key={it.title}
              className="fade border-t border-line py-7 last:border-b"
              style={d(after + i * 90)}
            >
              <h3 className="text-xl font-bold tracking-[-0.01em] md:text-2xl">
                {it.title}
              </h3>
              <p className="mt-2 max-w-[60ch] text-lg leading-relaxed text-muted">
                {it.body}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </Stage>
  );
}

function Numbers({ data }: { data: CaseStudy }) {
  const { label, date, stat, side } = jimmy.numbers;
  return (
    <Stage as="section" data-tone="ink" className="bg-ink text-paper">
      <Container className="grid gap-14 py-20 md:py-28 lg:grid-cols-12 lg:items-center lg:gap-10">
        <div className="lg:col-span-7">
          <Label dark>{label}</Label>
          <OutlineStat
            value={stat.value}
            label={stat.label}
            layout="wide"
            delay={300}
            className="mt-6 max-w-[620px]"
          />
        </div>
        <div className="lg:col-span-5">
          <p
            className="fade font-mono text-[12px] uppercase tracking-[0.04em] text-lime"
            style={d(900)}
          >
            {date}
          </p>
          <div className="mt-6 grid grid-cols-2 gap-6">
            {side.map((s, i) => (
              <div
                key={s.label}
                className="fade border-t border-line-dark pt-4"
                style={d(1000 + i * 90)}
              >
                <p className="display text-[clamp(2.5rem,1.5rem+2vw,3.5rem)] leading-none">
                  {s.value}
                </p>
                <p className="mt-2 text-paper/65">{s.label}</p>
              </div>
            ))}
          </div>
          <CaseQuote
            quote={data.quote}
            className="mt-12 [&_blockquote]:text-paper"
          />
        </div>
      </Container>
    </Stage>
  );
}

/** The call, signed by Nazar alone: Jimmy is his founder story. */
function Close() {
  const { title, line } = jimmy.close;
  const nazar = FOUNDERS.nazar;
  return (
    <Stage as="section" data-tone="paper">
      <Container className="py-20 md:py-28">
        <div className="fade grid items-center gap-8 rounded-[32px] bg-ink p-7 text-paper sm:p-10 md:grid-cols-[auto_1fr] md:gap-12 md:p-14">
          <div className="relative size-28 overflow-hidden rounded-full bg-ink-soft md:size-44">
            <Image
              src={nazar.photo}
              alt={`${nazar.name}, ${nazar.also}`}
              fill
              sizes="176px"
              className="object-cover object-top"
            />
          </div>
          <div>
            <h2 className="display text-[length:var(--text-title)] leading-[1.02]">
              {title}
            </h2>
            <p className="mt-5 max-w-[40ch] font-serif text-2xl italic leading-snug text-paper/85">
              “{line}”{" "}
              <span className="whitespace-nowrap font-sans text-sm not-italic text-paper/60">
                {nazar.first}, {nazar.also}
              </span>
            </p>
            <BookTrigger
              booking="founderReview"
              placement="jimmy-close"
              className="group mt-8 flex w-full items-center justify-between gap-3 rounded-full bg-paper py-2 pl-6 pr-2 text-left text-ink transition-colors duration-200 hover:bg-lime active:scale-[0.97] sm:inline-flex sm:w-auto"
            >
              <span className="text-base font-semibold leading-snug">
                Book a founder review
              </span>
              <span className="flex size-10 items-center justify-center rounded-full bg-ink text-paper transition-transform duration-200 group-hover:translate-x-0.5">
                <ArrowRight className="size-4" />
              </span>
            </BookTrigger>
          </div>
        </div>
      </Container>
    </Stage>
  );
}

export function JimmyCaseStudy({ data }: { data: CaseStudy }) {
  return (
    <article>
      <Hero data={data} />
      <Origin />
      <Invest />
      <Product />
      <Decisions />
      <Wrong />
      <Numbers data={data} />
      <Close />
    </article>
  );
}
