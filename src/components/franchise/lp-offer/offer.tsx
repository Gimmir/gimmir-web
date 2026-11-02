"use client";

import { useSyncExternalStore } from "react";

import { BookTrigger } from "@/components/blocks/book-trigger";
import { Kicker } from "@/components/franchise/kicker";
import { Mark } from "@/components/franchise/lp-numbers/shared";
import { useDaysLeft } from "@/components/franchise/urgency-bar";
import { Stage } from "@/components/motion/stage";
import { RiseText, wordCount } from "@/components/motion/words";
import { Container } from "@/components/ui/container";
import { ArrowRight, Check } from "@/components/ui/icons";
import { OFFER_COPY as C } from "@/content/franchise-page/offer";
import { FOUNDING_RETURN, OFFER, PRICES_PUBLIC } from "@/content/offer";
import { formatMoney } from "@/lib/franchise-calc";
import { OfferLead } from "./offer-lead";

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

/** The artboard's ink disc with a lime tick. */
function Tick({ className }: { className: string }) {
  return (
    <span
      aria-hidden
      className={`flex shrink-0 items-center justify-center rounded-full bg-ink text-lime ${className}`}
    >
      <Check className="size-[60%]" />
    </span>
  );
}

/**
 * /franchise offer: the founding price in three parts, what it includes,
 * and the risk we carry.
 */
export function LpOffer() {
  const days = useDaysLeft();
  const ready = useReadyDate();
  const after = wordCount(`${C.title.lead} ${C.title.mark}`) * 40 + 300;

  return (
    <Stage
      as="section"
      id="offer"
      data-tone="paper"
      className="relative scroll-mt-[84px] pt-32"
    >
      <Container className="flex flex-col items-center gap-12">
        <div className="mx-auto flex max-w-[1040px] flex-col items-center gap-[18px] text-center">
          <Kicker>
            {C.kicker}
            {days !== null ? ` · ${days} days left` : null}
          </Kicker>
          <h2 className="display text-[length:var(--text-title)] leading-[1.02]">
            <RiseText text={C.title.lead} />{" "}
            <Mark>
              <RiseText
                text={C.title.mark}
                start={wordCount(C.title.lead)}
              />
            </Mark>
          </h2>
          <p
            className="fade m-0 max-w-[660px] text-[19px] leading-[1.55] text-muted"
            style={d(after)}
          >
            <OfferLead />
          </p>
        </div>

        <div
          className="fade grid w-full max-w-[980px] gap-4 md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]"
          style={d(after + 120)}
        >
          <div className="flex flex-col gap-5 rounded-[24px] bg-surface p-6 shadow-[0_30px_70px_-36px_rgba(21,20,14,0.3)] ring-1 ring-line sm:p-8">
            <div>
              <p className="m-0 text-sm text-muted">{C.price.label}</p>
              {PRICES_PUBLIC ? (
                <p className="display m-0 mt-1.5 text-[clamp(44px,6vw,56px)] leading-none tabular-nums">
                  {formatMoney(OFFER.setupFee)}
                </p>
              ) : (
                <>
                  <p className="display m-0 mt-1.5 text-[clamp(44px,6vw,56px)] leading-none">
                    {C.price.hidden}
                  </p>
                  <p className="m-0 mt-2.5 text-[15px] leading-[1.5] text-muted">
                    {C.price.hiddenNote}
                  </p>
                </>
              )}
            </div>
            <ul className="m-0 flex list-none flex-col border-b border-line p-0 text-[15px]">
              {OFFER.payments.map((p) => (
                <li
                  key={p.label}
                  className="flex justify-between gap-3 border-t border-line py-3"
                >
                  <span>{p.label}</span>
                  {PRICES_PUBLIC ? (
                    <strong className="tabular-nums">
                      {formatMoney(p.amount)}
                    </strong>
                  ) : (
                    <strong className="text-muted">{C.price.amountHidden}</strong>
                  )}
                </li>
              ))}
            </ul>
            <ul className="m-0 grid list-none gap-x-4 gap-y-2.5 p-0 text-sm font-semibold sm:grid-cols-2">
              {C.price.checks.map((c) => (
                <li key={c} className="flex items-start gap-2">
                  <Tick className="mt-0.5 size-[18px]" />
                  {c}
                </li>
              ))}
            </ul>
            <BookTrigger
              booking="franchiseCall"
              placement="offer"
              className="group mt-1 inline-flex min-h-[52px] cursor-pointer items-center gap-3.5 self-start rounded-full bg-ink pr-2 pl-6 text-base font-semibold whitespace-nowrap text-paper transition-[background-color,transform] duration-200 ease-[var(--ease-out)] active:scale-[0.97] motion-reduce:transition-none hover:bg-ink-soft"
            >
              {C.price.cta}
              <span
                aria-hidden
                className="flex size-[38px] shrink-0 items-center justify-center rounded-full bg-lime text-ink"
              >
                <ArrowRight className="size-4" />
              </span>
            </BookTrigger>
          </div>

          <div className="flex flex-col py-2 md:pl-6">
            <h3 className="m-0 mb-1.5 text-2xl font-bold">{C.guarantees.title}</h3>
            <ul className="m-0 flex list-none flex-col p-0 text-base leading-[1.5]">
              {C.guarantees.items.map((g) => (
                <li
                  key={g.bold}
                  className="flex gap-3 border-b border-line py-3.5"
                >
                  <Tick className="mt-px size-5" />
                  <span>
                    <strong>{g.bold}</strong>{" "}
                    <span className="text-muted">{g.rest}</span>
                  </span>
                </li>
              ))}
            </ul>
            <p className="m-0 mt-4 text-sm leading-[1.5] text-muted">
              {C.note.before}{" "}
              <strong className="text-ink">
                {ready ?? (
                  <span aria-hidden className="invisible">
                    00 September 0000
                  </span>
                )}
              </strong>
              . {C.note.after} {FOUNDING_RETURN[0]}, {FOUNDING_RETURN[1]} and{" "}
              {FOUNDING_RETURN[2]}.
            </p>
          </div>
        </div>
      </Container>
    </Stage>
  );
}
