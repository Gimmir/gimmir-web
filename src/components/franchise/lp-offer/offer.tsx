"use client";

import { useSyncExternalStore } from "react";

import { ChapterBridge } from "@/components/franchise/chapters";
import { useFranchise } from "@/components/franchise/franchise-context";
import { Kicker } from "@/components/franchise/kicker";
import { useDaysLeft } from "@/components/franchise/urgency-bar";
import { Stage } from "@/components/motion/stage";
import { RiseText, wordCount } from "@/components/motion/words";
import { Container } from "@/components/ui/container";
import { ArrowRight } from "@/components/ui/icons";
import { OFFER_COPY as C } from "@/content/franchise-page/offer";
import {
  FOUNDING,
  FOUNDING_RETURN,
  OFFER,
  SUPPORT_PLANS,
} from "@/content/offer";
import { cn } from "@/lib/cn";
import { formatMoney, formatMonths } from "@/lib/franchise-calc";

const noop = () => () => {};

/** Today + the build time, on the visitor's clock; null on the server. */
const readyNow = () =>
  new Date(Date.now() + OFFER.readyWeeks * 7 * 86_400_000).toLocaleDateString(
    "en-GB",
    { day: "numeric", month: "long", year: "numeric" },
  );
function useReadyDate(): string | null {
  return useSyncExternalStore(noop, readyNow, () => null);
}

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

const card = "rounded-[24px] bg-surface ring-1 ring-line";
const shadow = "shadow-[0_30px_70px_-36px_rgba(21,20,14,0.3)]";

/** The artboard's ink pill with a lime arrow disc. */
function InkLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={cn(
        "group inline-flex min-h-[52px] items-center gap-3.5 rounded-full bg-ink pr-2 pl-6 text-base font-semibold whitespace-nowrap text-paper no-underline transition-[background-color,transform] duration-200 ease-[var(--ease-out)] hover:-translate-y-px hover:bg-ink/90 hover:text-paper active:scale-[0.97] motion-reduce:transition-none",
        className,
      )}
    >
      {children}
      <span
        aria-hidden
        className="flex size-[38px] shrink-0 items-center justify-center rounded-full bg-lime text-ink"
      >
        <ArrowRight className="size-4" />
      </span>
    </a>
  );
}

/** A number that exists only on the visitor's clock: space is kept until it is known. */
function Live({
  value,
  sample,
}: {
  value: string | number | null;
  sample: string;
}) {
  return value === null ? (
    <span aria-hidden className="invisible">
      {sample}
    </span>
  ) : (
    <>{value}</>
  );
}

function Projection() {
  const { brand, model } = useFranchise();
  if (!model.done[2]) {
    return (
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-[20px] border-[1.5px] border-dashed border-line-strong px-5 py-[18px] text-[15px] leading-[1.5] text-muted">
        <span>{C.noNumbers}</span>
        <a href="#numbers" className="font-bold text-ink">
          {C.runNumbers}
        </a>
      </div>
    );
  }
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-[24px] bg-lime px-6 py-[22px] sm:px-[26px]">
      <p className="m-0 max-w-[720px] text-lg leading-[1.45]">
        <strong>
          Your projection: {formatMoney(model.total)} a year for {brand.hq}.
        </strong>{" "}
        {model.payback !== null
          ? C.payback(formatMonths(model.payback))
          : C.noPayback}
      </p>
      <InkLink href="#book">{C.holdSlot}</InkLink>
    </div>
  );
}

/**
 * /franchise 07, the founding offer: the price in three parts, what comes
 * back, the guarantees and the support plans that follow launch.
 */
export function LpOffer() {
  const days = useDaysLeft();
  const ready = useReadyDate();
  const after = wordCount(C.title) * 40 + 300;
  const support = C.support;

  return (
    <>
      <Stage as="section" id="offer" data-tone="paper" className="relative scroll-mt-[84px]">
        <Container className="flex flex-col gap-10 pt-8 pb-10 md:pt-12">
          <div className="mx-auto flex max-w-[860px] flex-col items-center gap-4 text-center">
            <Kicker>{C.kicker}</Kicker>
            <h2 className="display text-[length:var(--text-title)] leading-[1.02]">
              <RiseText text={C.title} />
            </h2>
            <p
              className="fade m-0 max-w-[660px] text-[19px] leading-[1.55] text-muted"
              style={d(after)}
            >
              {C.lead}
            </p>
          </div>

          <div className="fade" style={d(after + 100)}>
            <Projection />
          </div>

          <div
            className="fade grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(min(220px,100%),1fr))]"
            style={d(after + 160)}
          >
            <div className={cn(card, "p-[22px]")}>
              <div className="display text-[44px] leading-none tabular-nums">
                <Live value={days} sample="00" />
              </div>
              <p className="m-0 mt-2 text-sm leading-[1.5] text-muted">
                {C.counters.days}
              </p>
            </div>
            <div className={cn(card, "p-[22px]")}>
              <div className="display text-[44px] leading-none tabular-nums">
                {FOUNDING.slots}
              </div>
              <p className="m-0 mt-2 text-sm leading-[1.5] text-muted">
                {C.counters.slots}
              </p>
            </div>
            <div className="rounded-[24px] bg-lime p-[22px]">
              <div className="display text-[30px] leading-[1.1]">
                <Live value={ready} sample="00 September 0000" />
              </div>
              <p className="m-0 mt-2 text-sm text-ink/80">{C.counters.ready}</p>
            </div>
          </div>

          <div
            className="fade grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(min(320px,100%),1fr))]"
            style={d(after + 220)}
          >
            <div className={cn(card, shadow, "flex flex-col gap-[18px] p-6 sm:p-8")}>
              <p className="m-0 text-sm text-muted">{C.price.label}</p>
              <p className="display m-0 text-[clamp(52px,7vw,72px)] leading-none tabular-nums">
                {formatMoney(OFFER.setupFee)}
              </p>
              <ul className="m-0 flex list-none flex-col p-0 text-base">
                {OFFER.payments.map((p, i) => (
                  <li
                    key={C.price.rows[i]}
                    className="flex justify-between gap-3 border-t border-line py-3.5"
                  >
                    <span>{C.price.rows[i]}</span>
                    <strong className="tabular-nums">{formatMoney(p.amount)}</strong>
                  </li>
                ))}
              </ul>
              <p className="m-0 text-sm leading-[1.5] text-muted">
                {C.price.returnLead} {FOUNDING_RETURN[0]}, {FOUNDING_RETURN[1]}{" "}
                and {FOUNDING_RETURN[2]}.
              </p>
              <InkLink href="#book" className="self-start">
                {C.price.cta}
              </InkLink>
            </div>

            <div className={cn(card, "flex flex-col gap-[18px] p-6 sm:p-8")}>
              <h3 className="m-0 text-[22px] font-bold">{C.guarantees.title}</h3>
              <ul className="m-0 flex list-none flex-col gap-4 p-0 text-base leading-[1.5]">
                {C.guarantees.items.map((g) => (
                  <li key={g.bold} className="flex gap-3">
                    <span
                      aria-hidden
                      className="mt-px size-[22px] shrink-0 rounded-md bg-lime"
                    />
                    <span>
                      <strong>{g.bold}</strong>{" "}
                      <span className="text-muted">{g.rest}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="fade flex flex-col gap-3.5" style={d(after + 280)}>
            <div className="flex flex-wrap items-baseline justify-between gap-2.5">
              <h3 className="m-0 text-[22px] font-bold">{support.title}</h3>
              <p className="m-0 text-sm text-muted">{support.note}</p>
            </div>
            <ul className="m-0 grid list-none gap-3 p-0 [grid-template-columns:repeat(auto-fit,minmax(min(240px,100%),1fr))]">
              {SUPPORT_PLANS.map((plan) => (
                <li
                  key={plan.id}
                  className={cn(
                    card,
                    "flex flex-col gap-2.5 p-[22px] transition-[transform,box-shadow] duration-200 ease-[var(--ease-out)] motion-reduce:transition-none [@media(hover:hover)]:hover:-translate-y-[3px] [@media(hover:hover)]:hover:shadow-[0_22px_44px_-26px_rgba(21,20,14,0.35)]",
                    plan.id === support.featured && "ring-[1.5px] ring-ink",
                  )}
                >
                  <h4 className="m-0 text-[19px] font-bold">{plan.name}</h4>
                  <p className="m-0 text-[15px] leading-[1.5] text-muted">
                    {plan.includes}
                  </p>
                  <p className="m-0 mt-auto pt-1 font-bold tabular-nums">
                    {plan.price === null ? support.price : formatMoney(plan.price)}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Stage>

      <ChapterBridge
        statement={
          <>
            {C.bridge.lead}{" "}
            <span className="bg-[linear-gradient(transparent_58%,var(--color-lime)_58%,var(--color-lime)_92%,transparent_92%)] px-0.5">
              {C.bridge.mark}
            </span>
          </>
        }
        next="faq"
        number={C.bridge.node}
      />
    </>
  );
}
