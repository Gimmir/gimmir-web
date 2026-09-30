import Image from "next/image";

import { BookTrigger } from "@/components/blocks/book-trigger";
import { Stage } from "@/components/motion/stage";
import { RiseText, wordCount } from "@/components/motion/words";
import { Container } from "@/components/ui/container";
import { ArrowRight } from "@/components/ui/icons";
import { about } from "@/content/about";
import { cn } from "@/lib/cn";
import { FOUNDERS, type FounderId } from "@/lib/founders";

const IDS: FounderId[] = ["nazar", "oleh"];

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

// one grid for every row, so the columns (and the rule between them) line up
const ROW = "grid grid-cols-2 gap-x-5 md:grid-cols-[9rem_1fr_1fr] md:gap-x-0";
// the second founder's column carries the rule between the two
const CELL = (k: number) =>
  cn("md:pr-8", k === 1 && "md:border-l md:border-line md:pl-8 md:pr-0");

/**
 * /about ③, doc 09's "who does what", as a table on a card: the two of
 * them in the header (face, name, role), then what each owns, built and
 * leads, every cell leading with its key phrase, and a call with each at
 * the foot. On a phone both columns stay side by side under each row's
 * name.
 */
export function AboutWho() {
  const { title, rows, talk } = about.who;
  const after = wordCount(title) * 40 + 300;

  return (
    <Stage as="section" data-tone="paper" className="border-t border-line">
      <Container className="py-20 md:py-28">
        <h2 className="display text-[length:var(--text-title)] leading-[1.02]">
          <RiseText text={title} />
        </h2>

        <div
          className="fade mt-12 rounded-[28px] bg-surface px-5 pb-6 pt-7 shadow-[0_1px_0_rgba(21,20,14,0.04),0_28px_56px_-36px_rgba(21,20,14,0.35)] ring-1 ring-line md:mt-16 md:px-8 md:pb-8 md:pt-9"
          style={d(after)}
        >
          {/* who's who */}
          <div className={cn(ROW, "border-b border-ink")}>
            <span aria-hidden className="hidden md:block" />
            {IDS.map((id, k) => {
              const f = FOUNDERS[id];
              return (
                <div
                  key={id}
                  className={cn(
                    "flex flex-col gap-3 pb-6 md:flex-row md:items-center md:gap-4 md:pb-7",
                    CELL(k),
                  )}
                >
                  <span className="relative size-12 shrink-0 overflow-hidden rounded-full bg-paper-2 md:size-16">
                    <Image
                      src={f.photo}
                      alt=""
                      fill
                      sizes="128px"
                      className="object-cover object-top"
                    />
                  </span>
                  <span>
                    <span className="display block text-[clamp(1.6rem,1rem+1.4vw,2.4rem)] leading-none">
                      {f.first}
                    </span>
                    <span className="mt-1.5 block text-[13px] leading-snug text-muted md:text-sm">
                      {f.title}
                      {"also" in f && f.also ? ` · ${f.also}` : null}
                    </span>
                  </span>
                </div>
              );
            })}
          </div>

          <dl>
            {rows.map((r, i) => (
              <div
                key={r.label}
                className={cn(ROW, "fade border-b border-line pt-5 md:pt-0")}
                style={d(after + 150 + i * 90)}
              >
                <dt className="col-span-2 font-mono text-[12px] uppercase tracking-[0.04em] text-faint md:col-span-1 md:py-7 md:pt-8">
                  {r.label}
                </dt>
                {IDS.map((id, k) => (
                  <dd
                    key={id}
                    className={cn(
                      "pb-5 pt-2 text-[15px] leading-snug text-muted md:py-7 md:text-lg md:leading-snug",
                      CELL(k),
                    )}
                  >
                    <span className="sr-only">{FOUNDERS[id].first}: </span>
                    <strong className="font-semibold text-ink">
                      {r[id].b}
                    </strong>
                    {r[id].rest}
                  </dd>
                ))}
              </div>
            ))}
          </dl>

          {/* a call with each of them (stacked on a phone, where two
              buttons side by side would wrap their labels) */}
          <div
            className="fade grid grid-cols-1 md:grid-cols-[9rem_1fr_1fr]"
            style={d(after + 150 + rows.length * 90)}
          >
            <span aria-hidden className="hidden md:block" />
            {IDS.map((id, k) => (
              <div
                key={id}
                className={cn(k === 0 ? "pt-6" : "pt-3", "md:pt-8", CELL(k))}
              >
                <BookTrigger
                  booking={talk[id].booking}
                  placement={`about-who-${id}`}
                  className="group flex w-full items-center justify-between gap-3 rounded-full bg-ink py-2 pl-5 pr-2 text-left text-paper transition-colors duration-200 hover:bg-lime hover:text-ink active:scale-[0.97] md:w-fit md:pl-6"
                >
                  <span className="text-[15px] font-semibold md:text-base">
                    {talk[id].label}
                  </span>
                  <span className="flex size-9 items-center justify-center rounded-full bg-paper text-ink transition-transform duration-200 group-hover:translate-x-0.5 md:size-10">
                    <ArrowRight className="size-4" />
                  </span>
                </BookTrigger>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Stage>
  );
}
