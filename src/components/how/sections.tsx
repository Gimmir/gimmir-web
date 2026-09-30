import Link from "next/link";

import { Accordion } from "@/components/blocks/accordion";
import { Stage } from "@/components/motion/stage";
import { RiseText, wordCount } from "@/components/motion/words";
import { Container } from "@/components/ui/container";
import { ArrowRight, Check } from "@/components/ui/icons";
import { how } from "@/content/how";
import { saas } from "@/content/saas";
import { cn } from "@/lib/cn";
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

// the track's columns: five boxes, 2.5rem apart (gap-x-10)
const COL = "((100% - 10rem) / 5)";

/**
 * ② `#pricing`, on ink (Nazar's pick o1): what you pay for, as a track.
 * The Review (lime) leads into milestones at fixed prices, then launch and
 * care; a dashed lime arc carries The Review's fee into the first
 * milestone ("credited to the build"), and a crossed-out clock says the
 * rest. The four rules sit under it. On a phone the track runs down.
 */
export function HowPricing() {
  const { id, title, lede, track, credit, hourly, note, rules } = how.pricing;
  const after = wordCount(title) * 40 + 300;
  const box = (k: number) => after + 200 + k * 140;
  const arcAt = box(1) + 300;

  return (
    <Stage
      as="section"
      id={id}
      data-tone="ink"
      className="scroll-mt-20 bg-ink text-paper"
    >
      <Container className="py-20 md:py-28">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-5">
          <h2 className="display text-[length:var(--text-title)] leading-[1.02]">
            <RiseText text={title} />
          </h2>
          <p
            className="fade max-w-[34ch] font-serif text-[clamp(1.3rem,1rem+0.7vw,1.7rem)] italic leading-snug text-paper/75"
            style={at(after - 150)}
          >
            {lede}
          </p>
        </div>

        <div className="relative mt-12 lg:mt-16 lg:pt-20">
          {/* no hourly billing: a clock, struck through in lime */}
          <p
            className="fade mb-8 flex items-center gap-3 font-serif text-lg italic text-paper/75 lg:absolute lg:right-0 lg:top-3 lg:mb-0"
            style={at(arcAt + 300)}
          >
            <span className="order-2 lg:order-1">{hourly}</span>
            <svg
              aria-hidden
              viewBox="0 0 48 48"
              className="order-1 size-10 overflow-visible lg:order-2"
            >
              <circle
                cx={24}
                cy={24}
                r={19}
                fill="none"
                stroke="var(--color-paper)"
                strokeWidth={1.6}
              />
              <path
                d="M24 13v11l8 5"
                fill="none"
                stroke="var(--color-paper)"
                strokeWidth={1.6}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7 41 41 7"
                pathLength={1}
                fill="none"
                stroke="var(--color-lime)"
                strokeWidth={2.2}
                strokeLinecap="round"
                className="draw"
                style={at(arcAt + 500, 500)}
              />
            </svg>
          </p>

          {/* the arc from The Review into the first milestone */}
          <svg
            aria-hidden
            viewBox="0 0 248 64"
            preserveAspectRatio="none"
            className="pointer-events-none absolute top-4 hidden h-16 overflow-visible lg:block"
            style={{
              left: `calc(${COL} / 2)`,
              width: `calc(${COL} + 2.5rem)`,
            }}
          >
            <defs>
              <mask
                id="how-credit"
                maskUnits="userSpaceOnUse"
                x={-10}
                y={-10}
                width={280}
                height={90}
              >
                <path
                  d="M0 64C0 6 248 6 248 58"
                  pathLength={1}
                  fill="none"
                  stroke="#fff"
                  strokeWidth={12}
                  className="draw"
                  style={at(arcAt, 900)}
                />
              </mask>
            </defs>
            <path
              d="M0 64C0 6 248 6 248 58"
              fill="none"
              stroke="var(--color-lime)"
              strokeWidth={1.6}
              strokeDasharray="5 6"
              mask="url(#how-credit)"
            />
            <path
              d="M241 50l7 9 7-9"
              fill="none"
              stroke="var(--color-lime)"
              strokeWidth={1.6}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="fade"
              style={at(arcAt + 800)}
            />
          </svg>
          <p
            className="fade absolute top-0 hidden text-center font-serif text-lg italic text-lime lg:block"
            style={{
              ...at(arcAt + 300),
              left: `calc(${COL} / 2)`,
              width: `calc(${COL} + 2.5rem)`,
            }}
          >
            {credit}
          </p>

          <ol className="flex flex-col gap-5 lg:grid lg:grid-cols-5 lg:gap-x-10">
            {track.map((t, k) => (
              <li
                key={t.name}
                className={cn(
                  "fade relative flex min-h-[5.5rem] flex-col justify-center rounded-2xl px-5 py-4",
                  k === 0
                    ? "bg-lime text-ink"
                    : "bg-ink-soft ring-1 ring-line-dark",
                )}
                style={at(box(k))}
              >
                {k > 0 && (
                  <span
                    aria-hidden
                    className={cn(
                      "absolute -top-5 left-8 h-5 border-l border-paper/50 lg:left-auto lg:right-full lg:top-1/2 lg:h-0 lg:w-10 lg:border-l-0 lg:border-t",
                      k === track.length - 1 && "border-dashed",
                    )}
                  />
                )}
                {/* on a phone, the credit rides the first connector */}
                {k === 1 && (
                  <span className="absolute -top-5 left-12 flex h-5 items-center font-serif text-[15px] italic text-lime lg:hidden">
                    {credit}
                  </span>
                )}
                <span className="text-lg font-extrabold leading-tight tracking-[-0.01em]">
                  {t.name}
                </span>
                <span
                  className={cn(
                    "mt-1.5 font-mono text-[11px] uppercase tracking-[0.04em]",
                    k === 0 ? "text-ink/70" : "text-paper/55",
                  )}
                >
                  {t.tag}
                </span>
              </li>
            ))}
          </ol>
          <p
            className="fade mt-5 text-[15px] font-medium text-paper/50"
            style={at(box(track.length - 1) + 200)}
          >
            {note}
          </p>
        </div>

        <ol className="mt-16 grid gap-8 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:gap-10">
          {rules.map((r, i) => (
            <li
              key={r.title}
              className="fade border-t border-line-dark pt-5"
              style={at(arcAt + 600 + i * 110)}
            >
              <span className="font-mono text-[12px] text-paper/45">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-xl font-extrabold leading-tight tracking-[-0.01em]">
                {r.title}
              </h3>
              <p className="mt-2 leading-relaxed text-paper/70">{r.body}</p>
            </li>
          ))}
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
          className="fade mt-14 text-[15px] font-medium text-paper/50"
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
