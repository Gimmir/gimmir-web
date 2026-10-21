import { ChapterBridge } from "@/components/franchise/chapters";
import { Kicker } from "@/components/franchise/kicker";
import { Stage } from "@/components/motion/stage";
import { RiseText, wordCount } from "@/components/motion/words";
import { Container } from "@/components/ui/container";
import {
  BUILT_FOR_YOU,
  CORE,
  FLOW,
  FLOW_INTRO,
  FLOW_LEGEND,
  type FlowStage,
} from "@/content/franchise-page/flow";
import { cn } from "@/lib/cn";

import { ACTOR_FILL, ACTOR_NODE, ACTOR_SWATCH } from "./actor";
import { FeatureMarquee } from "./feature-marquee";
import { FullList } from "./full-list";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

const CARD =
  "rounded-[24px] bg-surface shadow-[inset_0_0_0_1px_var(--color-line)]";

/** The ink disc with the lime tick, used for highlights and examples. */
function TickDot({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      width="18"
      height="18"
      viewBox="0 0 18 18"
      className={cn("shrink-0", className)}
    >
      <circle cx="9" cy="9" r="9" fill="var(--color-ink)" />
      <path
        d="M5 9.2l2.6 2.6L13 6.6"
        fill="none"
        stroke="var(--color-lime)"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * The six stages as links to their rows. A connecting line runs behind the
 * actor-coloured nodes from 901px; below that the strip scrolls sideways.
 */
function StageStrip() {
  return (
    <Stage as="div">
      <nav aria-label="The six stages">
        <ol className="relative m-0 flex list-none gap-4 overflow-x-auto p-0 px-1.5 pt-1.5 pb-2 min-[901px]:grid min-[901px]:grid-cols-6 min-[901px]:gap-2 min-[901px]:overflow-visible min-[901px]:px-0 min-[901px]:pt-0 min-[901px]:pb-0">
          <span
            aria-hidden
            className="wipe absolute top-[22px] right-[8.33%] left-[8.33%] hidden h-0.5 bg-line-strong min-[901px]:block"
            style={d(100)}
          />
          {FLOW.map((s, i) => (
            <li
              key={s.id}
              className="fade min-w-[104px] min-[901px]:min-w-0"
              style={d(220 + i * 70)}
            >
              <a
                href={`#${s.id}`}
                className="group relative flex min-h-11 flex-col items-center gap-2 px-1 text-center text-ink no-underline"
              >
                <span
                  className={cn(
                    "relative z-10 inline-flex size-11 items-center justify-center rounded-full text-sm font-extrabold transition-transform duration-200 ease-[var(--ease-out)] group-hover:-translate-y-0.5",
                    ACTOR_NODE[s.actor],
                  )}
                >
                  {s.num}
                </span>
                <span className="text-[15px] leading-tight font-bold">
                  {s.short}
                </span>
                <span className="text-xs text-muted">{s.who}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </Stage>
  );
}

function Legend() {
  return (
    <ul
      aria-label="Who does what"
      className="m-0 flex list-none flex-wrap justify-center gap-x-5 gap-y-2 p-0 text-sm text-muted"
    >
      {FLOW_LEGEND.map((l) => (
        <li key={l.actor} className="inline-flex items-center gap-2">
          <span
            aria-hidden
            className={cn("size-3.5 rounded-[4px]", ACTOR_SWATCH[l.actor])}
          />
          {l.label}
        </li>
      ))}
    </ul>
  );
}

function StageRow({ s }: { s: FlowStage }) {
  return (
    <Stage
      as="div"
      id={s.id}
      className="grid scroll-mt-[90px] gap-5 border-t border-line py-9 min-[901px]:grid-cols-[minmax(0,0.85fr)_minmax(0,1.6fr)] min-[901px]:items-start min-[901px]:gap-10 min-[901px]:py-12"
    >
      <div className="fade flex flex-col items-start gap-3.5 min-[901px]:sticky min-[901px]:top-[104px]">
        <div
          aria-hidden
          className="display text-[clamp(64px,7vw,96px)] leading-[0.9] text-line-strong"
        >
          {s.num}
        </div>
        <span
          className={cn(
            "inline-flex h-[30px] items-center rounded-full px-3 text-[13px] font-bold",
            ACTOR_FILL[s.actor],
          )}
        >
          {s.who}
        </span>
        <h3 className="display m-0 text-[clamp(28px,3.2vw,40px)] leading-[1.05]">
          {s.title}
        </h3>
        <p className="m-0 text-[17px] leading-[1.5] text-muted">{s.desc}</p>
        <p className="m-0 inline-flex items-center gap-2.5 rounded-[14px] bg-lime px-3.5 py-2.5 text-[15px] font-bold">
          <TickDot />
          {s.highlight}
        </p>
      </div>
      <ol
        className="fade m-0 grid list-none gap-3 p-0 min-[901px]:grid-cols-2"
        style={d(120)}
      >
        {s.steps.map((it) => (
          <li
            key={it.n}
            className={cn(
              CARD,
              "flex items-start gap-3.5 px-5 py-[18px] transition-[transform,box-shadow] duration-[250ms] ease-[var(--ease-out)] hover:-translate-y-[3px] hover:shadow-[inset_0_0_0_1px_var(--color-line),0_22px_44px_-26px_rgba(21,20,14,0.35)]",
            )}
          >
            <span
              className={cn(
                "inline-flex h-8 min-w-[42px] shrink-0 items-center justify-center rounded-[10px] px-2 text-[13px] font-extrabold",
                ACTOR_FILL[s.actor],
              )}
            >
              {it.n}
            </span>
            <div>
              <div className="text-base leading-[1.3] font-bold">{it.title}</div>
              <div className="mt-1 text-sm leading-[1.5] text-muted">
                {it.desc}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </Stage>
  );
}

function CoreCards() {
  return (
    <Stage
      as="div"
      className="mt-6 grid items-stretch gap-5 [grid-template-columns:repeat(auto-fit,minmax(min(320px,100%),1fr))]"
    >
      <div className={cn(CARD, "fade flex flex-col gap-4 p-7 sm:p-10")}>
        <p className="m-0 text-[13px] font-semibold tracking-[0.06em] text-muted uppercase">
          {CORE.label}
        </p>
        <h3 className="display m-0 text-[clamp(28px,3.2vw,40px)] leading-[1.05]">
          {CORE.title[0]}
          <br />
          {CORE.title[1]}
        </h3>
        <p className="m-0 text-[17px] leading-[1.5] text-muted">{CORE.body}</p>
      </div>

      <div
        className="fade flex flex-col gap-4 rounded-[28px] bg-lime p-7 text-[#2b3600] sm:p-10"
        style={d(120)}
      >
        <p className="m-0 text-[13px] font-semibold tracking-[0.06em] uppercase">
          {BUILT_FOR_YOU.label}
        </p>
        <h3 className="display m-0 text-[clamp(28px,3.2vw,40px)] leading-[1.05] text-ink">
          {BUILT_FOR_YOU.title}
        </h3>
        <p className="m-0 text-[17px] leading-[1.55]">{BUILT_FOR_YOU.body}</p>
        <div className="flex flex-col gap-2.5 rounded-[18px] bg-white/60 p-4">
          <p className="m-0 text-[13px] font-bold text-ink">
            {BUILT_FOR_YOU.examplesTitle}
          </p>
          <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
            {BUILT_FOR_YOU.examples.map((e) => (
              <li
                key={e}
                className="flex items-start gap-2.5 text-sm leading-[1.4] text-ink"
              >
                <TickDot className="mt-px" />
                <span>{e}</span>
              </li>
            ))}
          </ul>
        </div>
        <p className="m-0 text-sm leading-[1.5]">{BUILT_FOR_YOU.note}</p>
      </div>
    </Stage>
  );
}

/**
 * /franchise chapter 04, "The full flow" (Oleh's landing artboard): the
 * six-stage strip, each stage's steps, the feature strips with the full
 * list under them, the core and the built-for-you cards, then the bridge
 * to chapter 05. Server-rendered; only the full-list toggle is a client
 * island.
 */
export function LpFlow() {
  const after = wordCount(FLOW_INTRO.title) * 40 + 300;

  return (
    <>
      <section
        id="everything"
        data-tone="paper"
        className="scroll-mt-[84px] pt-7 pb-6"
      >
        <Container className="flex flex-col gap-9">
          <Stage
            as="div"
            className="mx-auto flex max-w-[900px] flex-col items-center gap-4 text-center"
          >
            <div className="fade">
              <Kicker>{FLOW_INTRO.kicker}</Kicker>
            </div>
            <h2 className="display m-0 text-[clamp(34px,4.6vw,56px)] leading-none">
              <RiseText text={FLOW_INTRO.title} />
            </h2>
            <p
              className="fade m-0 max-w-[660px] text-[19px] leading-[1.55] text-muted"
              style={d(after)}
            >
              {FLOW_INTRO.lead}
            </p>
          </Stage>

          <StageStrip />
          <Legend />

          <div className="flex flex-col">
            {FLOW.map((s) => (
              <StageRow key={s.id} s={s} />
            ))}
          </div>

          <div className="flex flex-col gap-6">
            <FeatureMarquee />
            <FullList />
          </div>

          <CoreCards />
        </Container>
      </section>

      <ChapterBridge
        statement={
          <>
            Not a concept.{" "}
            <span className="bg-[linear-gradient(transparent_58%,var(--color-lime)_58%,var(--color-lime)_92%,transparent_92%)] px-0.5">
              It&apos;s live. Download it.
            </span>
          </>
        }
        next="proof"
        number="05"
      />
    </>
  );
}
