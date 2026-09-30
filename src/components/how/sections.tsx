import Link from "next/link";

import { Accordion } from "@/components/blocks/accordion";
import { Stage } from "@/components/motion/stage";
import { RiseText, wordCount } from "@/components/motion/words";
import { Container } from "@/components/ui/container";
import { ArrowRight, Check } from "@/components/ui/icons";
import { how } from "@/content/how";
import { saas } from "@/content/saas";
import {
  CONTRACT_ANSWER,
  DISAPPEAR_ANSWER,
  NOT_OUTSOURCED_ANSWER,
  TAKEOVER_ANSWER,
  TWO_FOUNDERS_ANSWER,
  UNAVAILABLE_ANSWER,
} from "@/lib/trust-answers";

/* /how-we-work ② to ⑤ (doc 09 §3.8): how we price, what's yours, the
   standards we build to, and the two-person risk answered straight. */

const at = (ms: number, dur?: number) =>
  ({
    "--d": `${ms}ms`,
    ...(dur ? { "--dur": `${dur}ms` } : {}),
  }) as React.CSSProperties;

/** ② `#pricing`, on ink: four rules, no numbers. */
export function HowPricing() {
  const { id, title, lede, rules } = how.pricing;
  const after = wordCount(title) * 40 + 300;

  return (
    <Stage
      as="section"
      id={id}
      data-tone="ink"
      className="scroll-mt-20 bg-ink text-paper"
    >
      <Container className="grid gap-10 py-20 md:py-28 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <h2 className="display text-[length:var(--text-title)] leading-[1.02]">
            <RiseText text={title} />
          </h2>
          <p
            className="fade mt-6 max-w-[28ch] font-serif text-[clamp(1.3rem,1rem+0.7vw,1.7rem)] italic leading-snug text-paper/75"
            style={at(after - 150)}
          >
            {lede}
          </p>
        </div>
        <ol className="lg:col-span-7">
          {rules.map((r, i) => {
            const t = after + i * 140;
            return (
              <li
                key={r.title}
                className="relative grid gap-2 py-6 md:grid-cols-[3rem_1fr] md:gap-6 md:py-7"
              >
                <span
                  aria-hidden
                  className="wipe absolute inset-x-0 top-0 h-px bg-line-dark"
                  style={at(t, 800)}
                />
                <span
                  className="fade pt-1 font-mono text-[12px] text-paper/45"
                  style={at(t + 120)}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="fade" style={at(t + 200)}>
                  <h3 className="display text-[clamp(1.4rem,1rem+1.1vw,2.1rem)] leading-[1.08]">
                    {r.title}
                  </h3>
                  <p className="mt-2 max-w-[44ch] leading-relaxed text-paper/70">
                    {r.body}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </Container>
    </Stage>
  );
}

/**
 * ③ What stays yours: the four things from /build-your-saas "What you
 * own", in one line each, with the way to the full picture.
 */
export function HowOwn() {
  const { title, link } = how.own;
  const { cards } = saas.own;
  const after = wordCount(title) * 40 + 300;

  return (
    <Stage as="section" data-tone="paper">
      <Container className="py-20 md:py-28">
        <h2 className="display text-[length:var(--text-title)] leading-[1.02]">
          <RiseText text={title} />
        </h2>
        <ul className="mt-12 grid gap-x-8 gap-y-8 sm:grid-cols-2 md:mt-16 lg:grid-cols-4">
          {cards.map((c, i) => (
            <li
              key={c.id}
              className="fade border-t border-ink pt-5"
              style={at(after + i * 90)}
            >
              <span
                aria-hidden
                className="flex size-7 items-center justify-center rounded-full bg-lime text-ink"
              >
                <Check className="size-3.5" />
              </span>
              <h3 className="mt-5 text-xl font-bold tracking-[-0.01em]">
                {c.title}
              </h3>
              <p className="mt-2 leading-relaxed text-muted">{c.body}</p>
            </li>
          ))}
        </ul>
        <Link
          href={link.href}
          className="fade group mt-12 inline-flex items-center gap-3 text-lg font-semibold"
          style={at(after + cards.length * 90 + 100)}
        >
          <span className="link-mark">{link.label}</span>
          <ArrowRight className="size-5 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </Container>
    </Stage>
  );
}

/** ④ On ink: the standards we build to, and the stack we build with. */
export function HowStandards() {
  const { title, line, items, stackLabel, stack } = how.standards;
  const after = wordCount(title) * 40 + 300;

  return (
    <Stage as="section" data-tone="ink" className="bg-ink text-paper">
      <Container className="py-20 md:py-28">
        <h2 className="display max-w-[20ch] text-[length:var(--text-title)] leading-[1.02]">
          <RiseText text={title} />
        </h2>
        <p
          className="fade mt-7 max-w-[40ch] font-serif text-[clamp(1.3rem,1rem+0.7vw,1.7rem)] italic leading-snug text-paper/80"
          style={at(after)}
        >
          {line}
        </p>
        <ul className="mt-10 grid gap-3 sm:grid-cols-3">
          {items.map((it, i) => (
            <li
              key={it}
              className="fade flex items-center gap-4 rounded-[20px] bg-ink-soft px-5 py-5 ring-1 ring-line-dark"
              style={at(after + 150 + i * 90)}
            >
              <span
                aria-hidden
                className="flex size-8 shrink-0 items-center justify-center rounded-full bg-lime text-ink"
              >
                <Check className="size-4" />
              </span>
              <span className="text-lg font-bold md:text-xl">{it}</span>
            </li>
          ))}
        </ul>

        <p
          className="fade mt-14 font-mono text-[12px] uppercase tracking-[0.04em] text-paper/45"
          style={at(after + 500)}
        >
          {stackLabel}
        </p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {stack.map((s, i) => (
            <li
              key={s}
              className="fade rounded-full px-4 py-2 font-mono text-[13px] text-paper/85 ring-1 ring-line-dark"
              style={at(after + 550 + i * 50)}
            >
              {s}
            </li>
          ))}
        </ul>
      </Container>
    </Stage>
  );
}

/** The careful questions, in the order a buyer asks them. */
export const HOW_ANSWERS = [
  UNAVAILABLE_ANSWER,
  TAKEOVER_ANSWER,
  NOT_OUTSOURCED_ANSWER,
  DISAPPEAR_ANSWER,
  CONTRACT_ANSWER,
];

/**
 * ⑤ The two-person risk, answered honestly (doc 09): the straight answer
 * first, in the serif voice, then the careful questions as the accordion.
 */
export function HowRisk() {
  const { title } = how.risk;
  const after = wordCount(title) * 40 + 300;
  const items = HOW_ANSWERS.map((a) => ({
    key: a.key,
    question: a.question ?? "",
    answer: a.answer ?? "",
  }));

  return (
    <Stage as="section" data-tone="paper">
      <Container className="grid gap-10 py-20 md:py-28 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <h2 className="display text-[length:var(--text-title)] leading-[1.02]">
            <RiseText text={title} />
          </h2>
          <p
            className="fade mt-6 max-w-[34ch] font-serif text-[clamp(1.2rem,1rem+0.5vw,1.5rem)] italic leading-snug text-muted"
            style={at(after)}
          >
            {TWO_FOUNDERS_ANSWER.answer}
          </p>
        </div>
        <div className="fade lg:col-span-7" style={at(after + 150)}>
          <Accordion items={items} />
        </div>
      </Container>
    </Stage>
  );
}
