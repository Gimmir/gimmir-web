"use client";

import Cal from "@calcom/embed-react";
import { useEffect, useRef, useState } from "react";

import { BookTrigger } from "@/components/blocks/book-trigger";
import { FaceStack } from "@/components/blocks/face-stack";
import { useDaysLeft } from "@/components/franchise/urgency-bar";
import { Stage } from "@/components/motion/stage";
import { RiseText, wordCount } from "@/components/motion/words";
import { Container } from "@/components/ui/container";
import { ArrowRight } from "@/components/ui/icons";
import { BOOK_COPY as C } from "@/content/franchise-page/offer";
import { BOOKINGS } from "@/lib/booking";
import { CAL_NAMESPACE } from "@/lib/cal";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

const CAL_EMBED_CONFIG = {
  layout: "month_view",
  useSlotsViewOnSmallScreen: "true",
  theme: "light",
} as const;

function closesText(days: number): string {
  if (days > 1) return `Founding terms close in ${days} days`;
  if (days === 1) return "Last day of the founding terms";
  return "Founding terms closed";
}

/**
 * The real Cal.com calendar, inline. It mounts when the card is about to
 * scroll into view (the embed script is heavy), and until then the card
 * holds a plain button that opens the same booking as a popup.
 */
function Calendar() {
  const ref = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  const booking = BOOKINGS.franchiseCall;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        setNear(true);
        io.disconnect();
      },
      { rootMargin: "600px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="min-h-[300px]">
      {near ? (
        <Cal
          namespace={CAL_NAMESPACE}
          calLink={booking.calLink}
          config={CAL_EMBED_CONFIG}
          style={{ width: "100%", minHeight: 300 }}
        />
      ) : (
        <BookTrigger
          booking="franchiseCall"
          placement="franchise-book-card"
          className="group flex min-h-[52px] w-full cursor-pointer items-center justify-between gap-3.5 rounded-full bg-ink pr-2 pl-6 text-base font-semibold text-paper transition-[background-color,transform] duration-200 ease-[var(--ease-out)] hover:bg-ink/90 active:scale-[0.97] motion-reduce:transition-none"
        >
          {C.button}
          <span
            aria-hidden
            className="flex size-[38px] shrink-0 items-center justify-center rounded-full bg-lime text-ink"
          >
            <ArrowRight className="size-4" />
          </span>
        </BookTrigger>
      )}
    </div>
  );
}

/** /franchise 09: the call, with the founders who take it. */
export function LpBook() {
  const days = useDaysLeft();
  const after = wordCount(C.title) * 40 + 300;

  return (
    <Stage as="section" id="book" data-tone="paper" className="relative scroll-mt-[84px]">
      <Container className="pt-8 pb-24">
        <div className="grid items-center gap-10 rounded-[36px] bg-lime p-6 [grid-template-columns:repeat(auto-fit,minmax(min(320px,100%),1fr))] sm:p-10 lg:p-14">
          <div className="flex flex-col gap-[18px]">
            <h2 className="display text-[clamp(38px,5vw,64px)] leading-none">
              <RiseText text={C.title} />
            </h2>
            <p
              className="fade m-0 text-[19px] leading-[1.5] text-ink/80"
              style={d(after)}
            >
              {C.lead}
            </p>
            <div
              className="fade flex flex-wrap items-center gap-2.5"
              style={d(after + 80)}
            >
              <FaceStack ids={["oleh", "nazar"]} size={44} ring="surface" />
              <span className="text-[15px] font-semibold">{C.founders}</span>
            </div>
            <p
              className="fade m-0 inline-flex min-h-[34px] items-center self-start rounded-full bg-ink/10 px-3.5 text-sm font-semibold"
              style={d(after + 140)}
            >
              {days === null ? (
                <span aria-hidden className="invisible">
                  Founding terms close in 00 days
                </span>
              ) : (
                closesText(days)
              )}
            </p>
          </div>

          <div
            className="fade flex flex-col gap-[18px] rounded-[28px] bg-white p-6 shadow-[0_30px_60px_-30px_rgba(21,20,14,0.4)]"
            style={d(after + 200)}
          >
            <p className="m-0 text-lg font-bold">{C.card}</p>
            <Calendar />
            <p className="m-0 text-center text-sm leading-[1.5] text-muted">
              {C.fallbackLead}{" "}
              <a
                href={`mailto:${C.email}?subject=${encodeURIComponent(C.emailSubject)}`}
                className="inline-flex min-h-11 items-center font-semibold text-ink underline underline-offset-4"
              >
                {C.fallbackLink}
              </a>
            </p>
          </div>
        </div>
      </Container>
    </Stage>
  );
}
