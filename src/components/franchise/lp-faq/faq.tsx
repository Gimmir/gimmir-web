"use client";

import Image from "next/image";
import { useId, useState } from "react";

import { ChapterBridge } from "@/components/franchise/chapters";
import { Kicker } from "@/components/franchise/kicker";
import { Stage } from "@/components/motion/stage";
import { RiseText, wordCount } from "@/components/motion/words";
import { Container } from "@/components/ui/container";
import { Plus } from "@/components/ui/icons";
import {
  FAQ_COPY,
  FAQ_ITEMS,
  type FaqItem,
} from "@/content/franchise-page/faq";
import { FAQ_BRIDGE } from "@/content/franchise-page/offer";
import { cn } from "@/lib/cn";
import { FOUNDERS } from "@/lib/founders";

export { FAQ_ITEMS };
export type { FaqItem };

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

/**
 * One open at a time. The answer opens by animating the row's grid track
 * (0fr to 1fr, 400ms, the site's ease), so height is never measured in
 * script; a closed answer is inert, out of the tab order.
 */
function Questions({ items }: { items: readonly FaqItem[] }) {
  const [open, setOpen] = useState(-1);
  const uid = useId();

  return (
    <div className="flex flex-col gap-2.5">
      {items.map((item, i) => {
        const isOpen = open === i;
        const trigger = `${uid}-t-${i}`;
        const panel = `${uid}-p-${i}`;
        return (
          <div
            key={item.key}
            className="overflow-hidden rounded-[24px] bg-surface ring-1 ring-line"
          >
            <h3 className="m-0">
              <button
                type="button"
                id={trigger}
                aria-expanded={isOpen}
                aria-controls={panel}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="group flex min-h-14 w-full cursor-pointer items-center justify-between gap-4 px-[22px] py-5 text-left text-[17px] leading-snug font-bold text-ink"
              >
                {item.question}
                <span
                  aria-hidden
                  className={cn(
                    "flex size-8 shrink-0 items-center justify-center rounded-full bg-lime transition-transform duration-[400ms] ease-[var(--ease-out)] motion-reduce:transition-none",
                    isOpen && "rotate-45",
                  )}
                >
                  <Plus className="size-4" />
                </span>
              </button>
            </h3>
            <div
              id={panel}
              role="region"
              aria-labelledby={trigger}
              inert={!isOpen}
              className={cn(
                "grid transition-[grid-template-rows,opacity] duration-[400ms] ease-[var(--ease-out)] motion-reduce:transition-none",
                isOpen
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="min-h-0 overflow-hidden">
                <p className="m-0 px-[22px] pb-[22px] text-base leading-[1.55] text-muted">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/** /franchise 08: the seven hard questions, with Nazar's promise beside them. */
export function LpFaq() {
  const nazar = FOUNDERS.nazar;
  const after = wordCount(FAQ_COPY.title) * 40 + 300;

  return (
    <>
      <Stage as="section" id="faq" data-tone="paper" className="relative scroll-mt-[84px]">
        <Container className="grid items-start gap-10 pt-8 pb-10 [grid-template-columns:repeat(auto-fit,minmax(min(320px,100%),1fr))] md:pt-12">
          <div className="flex flex-col gap-[18px]">
            <Kicker>{FAQ_COPY.kicker}</Kicker>
            <h2 className="display text-[length:var(--text-title)] leading-[1.02]">
              <RiseText text={FAQ_COPY.title} />
            </h2>
            <figure
              className="fade m-0 mt-3 flex items-center gap-4 rounded-[24px] bg-surface p-5 ring-1 ring-line"
              style={d(after)}
            >
              <Image
                src={nazar.photo}
                alt={nazar.name}
                width={128}
                height={128}
                sizes="64px"
                className="size-16 shrink-0 rounded-2xl object-cover object-top"
              />
              <figcaption>
                <blockquote className="m-0 text-[17px] leading-snug font-bold">
                  {FAQ_COPY.quote}
                </blockquote>
                <p className="m-0 text-sm leading-[1.5] text-muted">
                  {nazar.name}, {nazar.title.split(",")[0]}
                </p>
              </figcaption>
            </figure>
          </div>
          <div className="fade" style={d(after + 120)}>
            <Questions items={FAQ_ITEMS} />
          </div>
        </Container>
      </Stage>

      <ChapterBridge
        statement={
          <>
            {FAQ_BRIDGE.lead}{" "}
            <span className="bg-[linear-gradient(transparent_58%,var(--color-lime)_58%,var(--color-lime)_92%,transparent_92%)] px-0.5">
              {FAQ_BRIDGE.mark}
            </span>
          </>
        }
        next="book"
        number={FAQ_BRIDGE.node}
      />
    </>
  );
}
