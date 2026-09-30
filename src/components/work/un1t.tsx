import Image from "next/image";

import { OutlineStat } from "@/components/blocks/outline-stat";
import { Stage } from "@/components/motion/stage";
import { RiseText, wordCount } from "@/components/motion/words";
import { OperatorsClose } from "@/components/operators/close";
import {
  AppFragment,
  DataFragment,
  OfficeFragment,
  PaymentsFragment,
} from "@/components/operators/networks";
import { Container } from "@/components/ui/container";
import {
  CaseAudienceLink,
  CaseBackLink,
  CaseQuote,
  QuickFacts,
} from "@/components/work/parts";
import { un1t } from "@/content/un1t";
import type { CaseStudy } from "@/lib/cases";
import { cn } from "@/lib/cn";

/* /work/un1t, V2 (doc 09 §3.5): the case in full, ink and paper taking
   turns. Hero → the franchise → the problem → what we built (bento) →
   the drawn 12 with the stack → Rob's words once approved → Nazar's
   signed call. The bento draws its UI in code until the cleared product
   screens arrive (content/un1t.ts `screens`). */

const FRAGMENTS: Record<string, () => React.ReactNode> = {
  app: AppFragment,
  office: OfficeFragment,
  payments: PaymentsFragment,
  data: DataFragment,
};

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

function Hero({ data }: { data: CaseStudy }) {
  const { title, sub } = un1t.hero;
  const after = wordCount(title) * 40 + 500;
  return (
    <Stage
      as="section"
      eager
      data-tone="ink"
      className="relative overflow-hidden bg-ink text-paper"
    >
      <Container className="grid gap-14 pb-20 pt-28 sm:pt-32 md:pb-28 md:pt-36 lg:min-h-[88svh] lg:grid-cols-12 lg:items-center lg:gap-10">
        <div className="lg:col-span-7">
          <div
            className="fade flex flex-wrap items-center gap-x-8 gap-y-3"
            style={d(0)}
          >
            <CaseBackLink onDark />
            <CaseAudienceLink
              href="/operators"
              label="How we move brands onto their own software"
              onDark
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
              className="size-11 rounded-xl object-cover ring-1 ring-paper/15"
            />
            <span className="text-xl font-extrabold tracking-tight">
              {data.name}
            </span>
            <span className="rounded-full border border-line-dark px-3 py-1 text-[13px] text-paper/70">
              {data.tag}
            </span>
          </p>
          <h1 className="display mt-8 max-w-[18ch] text-[clamp(2.4rem,1rem+4.6vw,5.5rem)] leading-[1.0]">
            <RiseText text={title} />
          </h1>
          <p
            className="fade mt-8 max-w-[56ch] text-lg leading-relaxed text-paper/70 md:text-xl"
            // with the headline, not after it: on a phone this is the
            // largest thing on screen, and it counts as loaded once it shows
            style={d(150)}
          >
            {sub}
          </p>
        </div>
        <div className="lg:col-span-5">
          {un1t.screens.length > 0 ? (
            <div
              className="fade flex gap-4 overflow-x-auto"
              style={d(after + 200)}
            >
              {un1t.screens.map((s) => (
                <div
                  key={s.src}
                  className="relative aspect-[9/19.5] w-[44%] shrink-0 overflow-hidden rounded-[24px] ring-1 ring-paper/10 sm:w-[30%] lg:w-[48%]"
                >
                  <Image
                    src={s.src}
                    alt={s.alt}
                    fill
                    sizes="(min-width: 1024px) 260px, 44vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          ) : (
            <OutlineStat
              value={un1t.hero.stat.value}
              label={un1t.hero.stat.label}
              layout="wide"
              delay={400}
              className="mx-auto max-w-[520px] lg:mr-0"
            />
          )}
        </div>
      </Container>
    </Stage>
  );
}

function Context({ data }: { data: CaseStudy }) {
  const { label, title, body } = un1t.context;
  const after = wordCount(title) * 40 + 300;
  return (
    <Stage as="section" data-tone="paper">
      <Container className="grid gap-x-10 gap-y-8 py-20 md:py-28 lg:grid-cols-12">
        <p className="fade text-[15px] font-medium text-faint lg:col-span-3">
          {label}
        </p>
        <div className="lg:col-span-9">
          <h2 className="display text-[length:var(--text-display)] leading-[1.04]">
            <RiseText text={title} />
          </h2>
          <p
            className="fade mt-6 max-w-[56ch] text-lg leading-relaxed text-muted md:text-xl"
            style={d(after)}
          >
            {body}
          </p>
          <div className="fade" style={d(after + 120)}>
            <QuickFacts facts={data.facts} className="mt-12" />
          </div>
        </div>
      </Container>
    </Stage>
  );
}

function Problem() {
  const { label, title, body } = un1t.problem;
  const after = wordCount(title) * 40 + 300;
  return (
    <Stage as="section" data-tone="ink" className="bg-ink text-paper">
      <Container className="grid gap-x-10 gap-y-10 py-20 md:py-28 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <p className="fade text-[15px] font-medium text-paper/50">{label}</p>
          <h2 className="display mt-6 max-w-[16ch] text-[length:var(--text-title)] leading-[1.02]">
            <RiseText text={title} />
          </h2>
        </div>
        <div className="flex flex-col gap-6 lg:col-span-5">
          {body.map((p, i) => (
            <p
              key={i}
              className="fade max-w-[46ch] text-lg leading-relaxed text-paper/70 md:text-xl"
              style={d(after + i * 80)}
            >
              {p}
            </p>
          ))}
        </div>
      </Container>
    </Stage>
  );
}

function Built() {
  const { label, title, cards } = un1t.built;
  const after = wordCount(title) * 40 + 300;
  return (
    <Stage as="section" data-tone="paper">
      <Container className="py-20 md:py-28">
        <p className="fade text-[15px] font-medium text-faint">{label}</p>
        <h2 className="display mt-6 max-w-[18ch] text-[length:var(--text-title)] leading-[1.02]">
          <RiseText text={title} />
        </h2>
        <ul className="mt-12 grid gap-4 md:mt-16 md:grid-cols-2">
          {cards.map((c, i) => {
            const Ui = FRAGMENTS[c.id];
            return (
              <li
                key={c.id}
                className="fade flex flex-col rounded-[24px] bg-surface p-2 shadow-[0_1px_0_rgba(21,20,14,0.04),0_28px_56px_-36px_rgba(21,20,14,0.35)] ring-1 ring-line"
                style={d(after + i * 80)}
              >
                <div
                  aria-hidden
                  className="flex min-h-[250px] flex-1 items-center justify-center overflow-hidden rounded-[18px] bg-paper-2 px-5 py-6"
                >
                  <Ui />
                </div>
                <div className="px-4 pb-4 pt-5 md:px-5">
                  <h3 className="text-xl font-bold tracking-[-0.01em]">
                    {c.title}
                  </h3>
                  <p className="mt-1.5 leading-relaxed text-muted">{c.body}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </Stage>
  );
}

function Result({ data }: { data: CaseStudy }) {
  const { stat, line, stack } = un1t.result;
  return (
    <Stage as="section" data-tone="ink" className="bg-ink text-paper">
      <Container className="grid gap-14 py-20 md:py-28 lg:grid-cols-12 lg:items-center lg:gap-10">
        <div className="lg:col-span-7">
          <OutlineStat
            value={stat.value}
            label={stat.label}
            delay={200}
            className="max-w-[600px]"
          />
        </div>
        <div className="lg:col-span-5">
          <p
            className="fade font-serif text-2xl italic leading-snug md:text-[1.75rem]"
            style={d(900)}
          >
            {line}
          </p>
          <ul className="fade mt-8 flex flex-wrap gap-2" style={d(1000)}>
            {stack.map((t) => (
              <li
                key={t}
                className="rounded-full border border-line-dark px-3.5 py-1.5 font-mono text-[13px] text-paper/80"
              >
                {t}
              </li>
            ))}
          </ul>
          <CaseQuote
            quote={data.quote}
            className={cn("mt-12 [&_blockquote]:text-paper")}
          />
        </div>
      </Container>
    </Stage>
  );
}

export function Un1tCaseStudy({ data }: { data: CaseStudy }) {
  return (
    <article>
      <Hero data={data} />
      <Context data={data} />
      <Problem />
      <Built />
      <Result data={data} />
      <div className="pt-20 md:pt-28">
        <OperatorsClose />
      </div>
    </article>
  );
}
