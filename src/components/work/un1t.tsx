import Image from "next/image";

import { OutlineStat } from "@/components/blocks/outline-stat";
import { Ctas } from "@/components/franchise/ctas";
import { Stage } from "@/components/motion/stage";
import { RiseText, wordCount } from "@/components/motion/words";
import { Container } from "@/components/ui/container";
import { ArrowUpRight } from "@/components/ui/icons";
import { CaseBackLink, CaseQuote, QuickFacts } from "@/components/work/parts";
import {
  AppFragment,
  PaymentsFragment,
  WellhubFragment,
  WorkoutFragment,
} from "@/components/work/un1t-fragments";
import { un1t } from "@/content/un1t";
import type { CaseStudy } from "@/lib/cases";
import { cn } from "@/lib/cn";

/* /work/un1t, rewritten around money: the headline is what HQ earns. Hero,
   before, what we built (bento), what changed for HQ, the objection it
   answers with Rob's words, then the two asks. The bento draws its UI in
   code; the screens are generic. */

const FRAGMENTS: Record<string, () => React.ReactNode> = {
  app: AppFragment,
  payments: PaymentsFragment,
  workout: WorkoutFragment,
  wellhub: WellhubFragment,
};

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

function Hero({ data }: { data: CaseStudy }) {
  const { title, stats, appStore, stat } = un1t.hero;
  const after = wordCount(title) * 40 + 300;
  return (
    <Stage
      as="section"
      eager
      data-tone="ink"
      className="relative overflow-hidden bg-ink text-paper"
    >
      <Container className="grid gap-14 pb-20 pt-28 sm:pt-32 md:pb-28 md:pt-36 lg:min-h-[88svh] lg:grid-cols-12 lg:items-center lg:gap-10">
        <div className="lg:col-span-7">
          <div className="fade" style={d(0)}>
            <CaseBackLink onDark />
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
          <ul
            className="fade mt-10 flex flex-wrap items-center gap-2"
            style={d(after)}
          >
            {stats.map((s) => (
              <li
                key={s}
                className="rounded-full border border-line-dark px-4 py-2 text-[15px] text-paper/85"
              >
                {s}
              </li>
            ))}
            <li>
              <a
                href={appStore.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 rounded-full border border-line-dark px-4 py-2 text-[15px] text-paper/85 transition-colors hover:border-lime hover:text-lime"
              >
                {appStore.label}
                <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </li>
          </ul>
        </div>
        <div className="lg:col-span-5">
          <OutlineStat
            value={stat.value}
            label={stat.label}
            delay={400}
            className="mx-auto max-w-[420px] lg:mr-0"
          />
        </div>
      </Container>
    </Stage>
  );
}

function Before({ data }: { data: CaseStudy }) {
  const { label, title, body } = un1t.before;
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

function Built() {
  const { label, title, cards, health } = un1t.built;
  const after = wordCount(title) * 40 + 300;
  return (
    <Stage as="section" data-tone="ink" className="bg-ink text-paper">
      <Container className="py-20 md:py-28">
        <p className="fade text-[15px] font-medium text-paper/50">{label}</p>
        <h2 className="display mt-6 max-w-[18ch] text-[length:var(--text-title)] leading-[1.02]">
          <RiseText text={title} />
        </h2>
        <ul className="mt-12 grid gap-4 md:mt-16 md:grid-cols-2">
          {cards.map((c, i) => {
            const Ui = FRAGMENTS[c.id];
            return (
              <li
                key={c.id}
                className="fade flex flex-col rounded-[24px] bg-surface p-2 text-ink ring-1 ring-line"
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
        {health && (
          <p className="fade mt-8 text-paper/70" style={d(after + 400)}>
            {health}
          </p>
        )}
      </Container>
    </Stage>
  );
}

function Changed() {
  const { label, title, line } = un1t.changed;
  const after = wordCount(title) * 40 + 300;
  return (
    <Stage as="section" data-tone="paper">
      <Container className="grid gap-x-10 gap-y-8 py-20 md:py-28 lg:grid-cols-12">
        <p className="fade text-[15px] font-medium text-faint lg:col-span-3">
          {label}
        </p>
        <div className="lg:col-span-9">
          <h2 className="display max-w-[20ch] text-[length:var(--text-display)] leading-[1.04]">
            <RiseText text={title} />
          </h2>
          <p
            className="fade mt-6 max-w-[48ch] font-serif text-2xl italic leading-snug text-muted md:text-[1.75rem]"
            style={d(after)}
          >
            {line}
          </p>
        </div>
      </Container>
    </Stage>
  );
}

function Objection({ data }: { data: CaseStudy }) {
  const { label, body } = un1t.objection;
  return (
    <Stage as="section" data-tone="ink" className="bg-ink text-paper">
      <Container className="grid gap-14 py-20 md:py-28 lg:grid-cols-12 lg:items-center lg:gap-10">
        <div className="lg:col-span-7">
          <p className="fade text-[15px] font-medium text-paper/50">{label}</p>
          <p
            className="fade mt-6 max-w-[34ch] font-serif text-3xl italic leading-snug md:text-4xl"
            style={d(120)}
          >
            {body}
          </p>
        </div>
        <div className="lg:col-span-5">
          <CaseQuote
            quote={data.quote}
            className={cn("[&_blockquote]:text-paper")}
          />
        </div>
      </Container>
    </Stage>
  );
}

function Close() {
  const { title } = un1t.close;
  return (
    <Stage as="section" data-tone="paper">
      <Container className="pb-20 pt-20 md:pb-28 md:pt-28">
        <div className="fade rounded-[32px] bg-ink p-7 text-paper sm:p-10 md:p-14">
          <h2 className="display max-w-[18ch] text-[length:var(--text-title)] leading-[1.02]">
            {title}
          </h2>
          <div className="fade mt-8 md:mt-10" style={d(200)}>
            <Ctas placement="un1t-close" onDark />
          </div>
        </div>
      </Container>
    </Stage>
  );
}

export function Un1tCaseStudy({ data }: { data: CaseStudy }) {
  return (
    <article>
      <Hero data={data} />
      <Before data={data} />
      <Built />
      <Changed />
      <Objection data={data} />
      <Close />
    </article>
  );
}
