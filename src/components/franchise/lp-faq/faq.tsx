"use client";

import Image from "next/image";
import { useId, useState } from "react";

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
import { cn } from "@/lib/cn";
import { FOUNDERS } from "@/lib/founders";

export { FAQ_ITEMS };
export type { FaqItem };

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

/**
 * One open at a time. The answer opens by animating the row's grid track
 * (0fr to 1fr), so height is never measured in script; a closed answer is
 * inert, out of the tab order.
 */
function Questions({ items }: { items: readonly FaqItem[] }) {
  const [open, setOpen] = useState(-1);
  const uid = useId();

  return (
    <div className="overflow-hidden rounded-[24px] bg-surface ring-1 ring-line">
      {items.map((item, i) => {
        const isOpen = open === i;
        const trigger = `${uid}-t-${i}`;
        const panel = `${uid}-p-${i}`;
        return (
          <div key={item.key} className="border-b border-line last:border-b-0">
            <h3 className="m-0">
              <button
                type="button"
                id={trigger}
                aria-expanded={isOpen}
                aria-controls={panel}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="flex min-h-14 w-full cursor-pointer items-center justify-between gap-4 px-[18px] py-4 text-left text-base leading-snug font-bold text-ink"
              >
                {item.question}
                <span
                  aria-hidden
                  className={cn(
                    "flex size-8 shrink-0 items-center justify-center rounded-full bg-paper text-ink transition-transform duration-200 ease-[var(--ease-out)] motion-reduce:transition-none",
                    isOpen && "rotate-45",
                  )}
                >
                  <Plus className="size-3.5" />
                </span>
              </button>
            </h3>
            <div
              id={panel}
              role="region"
              aria-labelledby={trigger}
              inert={!isOpen}
              className={cn(
                "grid transition-[grid-template-rows,opacity] duration-[250ms] ease-[var(--ease-out)] motion-reduce:transition-none",
                isOpen
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="min-h-0 overflow-hidden">
                <p className="m-0 px-[18px] pb-[18px] text-[15px] leading-[1.55] text-muted">
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

/** /franchise FAQ: ten straight answers, with Nazar's promise beside them. */
export function LpFaq() {
  const nazar = FOUNDERS.nazar;
  const after = wordCount(FAQ_COPY.title) * 40 + 300;

  return (
    <Stage
      as="section"
      id="faq"
      data-tone="paper"
      className="relative scroll-mt-[84px] pt-32"
    >
      <Container className="grid items-start gap-10 [grid-template-columns:repeat(auto-fit,minmax(min(320px,100%),1fr))]">
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
              className="size-16 shrink-0 rounded-full object-cover object-top"
            />
            <figcaption>
              <blockquote className="m-0 text-base leading-snug font-bold">
                {FAQ_COPY.quote}
              </blockquote>
              <p className="m-0 text-sm leading-[1.5] text-muted">
                {nazar.name}, {nazar.title.split(",")[0]}
              </p>
            </figcaption>
          </figure>
          <p className="fade m-0 text-sm text-muted" style={d(after + 60)}>
            {FAQ_COPY.more}{" "}
            <a
              href={`mailto:${FAQ_COPY.email}`}
              className="inline-flex min-h-11 items-center font-semibold text-ink underline underline-offset-4"
            >
              {FAQ_COPY.moreLink}
            </a>
            .
          </p>
        </div>
        <div className="fade" style={d(after + 120)}>
          <Questions items={FAQ_ITEMS} />
        </div>
      </Container>
    </Stage>
  );
}
