import Image from "next/image";

import { BookTrigger } from "@/components/blocks/book-trigger";
import { Stage } from "@/components/motion/stage";
import { RiseText, wordCount } from "@/components/motion/words";
import { Container } from "@/components/ui/container";
import { ArrowRight } from "@/components/ui/icons";
import { about } from "@/content/about";
import { FOUNDERS, type FounderId } from "@/lib/founders";

const IDS: FounderId[] = ["nazar", "oleh"];

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

function Face({ id }: { id: FounderId }) {
  return (
    <span className="relative size-9 shrink-0 overflow-hidden rounded-full bg-paper-2 md:size-11">
      <Image
        src={FOUNDERS[id].photo}
        alt=""
        fill
        sizes="88px"
        className="object-cover object-top"
      />
    </span>
  );
}

/**
 * /about ③, doc 09's "who does what": the two of them side by side, row
 * by row, ending in a call with each. On a phone every row keeps both
 * columns (short lines), with the row's name above them.
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

        <div className="mt-12 md:mt-16">
          {/* who's who */}
          <div
            className="fade grid grid-cols-2 gap-4 border-b border-ink pb-5 md:grid-cols-[10rem_1fr_1fr] md:gap-8"
            style={d(after)}
          >
            <span aria-hidden className="hidden md:block" />
            {IDS.map((id) => (
              <p key={id} className="flex items-center gap-3">
                <Face id={id} />
                <span className="text-lg font-bold leading-tight md:text-xl">
                  {FOUNDERS[id].first}
                </span>
              </p>
            ))}
          </div>

          <dl>
            {rows.map((r, i) => (
              <div
                key={r.label}
                className="fade grid grid-cols-2 gap-x-4 gap-y-2 border-b border-line py-5 md:grid-cols-[10rem_1fr_1fr] md:gap-8 md:py-6"
                style={d(after + 120 + i * 90)}
              >
                <dt className="col-span-2 pt-1 font-mono text-[12px] uppercase tracking-[0.04em] text-faint md:col-span-1">
                  {r.label}
                </dt>
                {IDS.map((id) => (
                  <dd
                    key={id}
                    className="text-[15px] leading-snug md:text-lg md:leading-snug"
                  >
                    <span className="sr-only">{FOUNDERS[id].first}: </span>
                    {r[id]}
                  </dd>
                ))}
              </div>
            ))}
          </dl>

          {/* a call with each of them */}
          <div
            className="fade grid grid-cols-1 gap-3 pt-6 sm:grid-cols-2 md:grid-cols-[10rem_1fr_1fr] md:gap-8"
            style={d(after + 120 + rows.length * 90)}
          >
            <span aria-hidden className="hidden md:block" />
            {IDS.map((id) => (
              <BookTrigger
                key={id}
                booking={talk[id].booking}
                placement={`about-who-${id}`}
                className="group flex w-full items-center justify-between gap-3 rounded-full bg-ink py-2 pl-6 pr-2 text-left text-paper transition-colors duration-200 hover:bg-lime hover:text-ink active:scale-[0.97] sm:w-fit"
              >
                <span className="text-base font-semibold">
                  {talk[id].label}
                </span>
                <span className="flex size-10 items-center justify-center rounded-full bg-paper text-ink transition-transform duration-200 group-hover:translate-x-0.5">
                  <ArrowRight className="size-4" />
                </span>
              </BookTrigger>
            ))}
          </div>
        </div>
      </Container>
    </Stage>
  );
}
