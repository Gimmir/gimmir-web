import Image from "next/image";

import { ChapterBridge } from "@/components/franchise/chapters";
import { Kicker } from "@/components/franchise/kicker";
import { Stage } from "@/components/motion/stage";
import { RiseText, wordCount } from "@/components/motion/words";
import { Container } from "@/components/ui/container";
import { PROCESS } from "@/content/franchise-page/process";
import { FOUNDING } from "@/content/offer";
import { JIMMY, shown } from "@/content/proof";
import { FOUNDERS } from "@/lib/founders";

import { ChannelMock, DaysLeftMark, ReadyDate } from "./process-client";

const BAR = "mb-4 h-1 rounded bg-ink";
const LBL = "text-[13px] font-semibold uppercase tracking-[0.06em] text-muted";

/**
 * /franchise ⑥, How we build (chapter "process"): the twelve weeks as a
 * timeline, the shared channel and Oleh's build-in-public post, then the
 * bridge to the offer with the days left (counted on the client).
 */
export function LpProcess() {
  const c = PROCESS;
  const oleh = FOUNDERS.oleh;
  const after = wordCount(c.title) * 40 + 300;
  const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;
  // The post says "more than $12,000 a month": only while that claim is approved.
  const postShown = shown(JIMMY.mrr) !== null;

  return (
    <>
      <Stage as="section" id="process" data-tone="paper" className="relative">
        <Container className="flex flex-col gap-10 py-20 md:py-28">
          <div className="mx-auto flex max-w-[820px] flex-col items-center gap-[18px] text-center">
            <Kicker>{c.kicker}</Kicker>
            <h2 className="display text-[length:var(--text-title)] leading-[1.02]">
              <RiseText text={c.title} />
            </h2>
            <p className="fade m-0 max-w-[660px] text-lg leading-[1.55] text-muted" style={d(after)}>
              {c.lead}
            </p>
          </div>

          <ol
            className="fade m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-y-8 p-0"
            style={d(after + 100)}
          >
            {c.steps.map((s) => (
              <li key={s.label} className="pr-3">
                <div aria-hidden className={BAR} />
                <div className={LBL}>{s.label}</div>
                <div className="mt-1.5 font-bold">{s.text}</div>
              </li>
            ))}
            <li className="pr-3">
              <div
                aria-hidden
                className="mb-4 h-1 rounded bg-lime shadow-[0_0_0_1px_var(--color-ink)]"
              />
              <div className={LBL}>
                <ReadyDate />
              </div>
              <div className="mt-1.5 font-bold">{c.ready.text}</div>
            </li>
          </ol>

          <div className="grid gap-4 md:grid-cols-2">
            <ChannelMock delay={after + 200} />
            <figure
              className="fade m-0 flex flex-col gap-3 rounded-[24px] bg-surface p-5 ring-1 ring-line"
              style={d(after + 300)}
            >
              <div className="flex items-center gap-3">
                <Image
                  src={oleh.photo}
                  alt={oleh.name}
                  width={48}
                  height={48}
                  className="size-12 rounded-full object-cover"
                />
                <div className="text-[13px] leading-[1.35]">
                  <strong className="text-[15px]">{oleh.name}</strong>{" "}
                  <span className="text-[#666]">{c.post.connection}</span>
                  <div className="text-[#666]">{c.post.headline}</div>
                  <div className="text-[#666]">{c.post.network}</div>
                </div>
              </div>
              {postShown ? (
                <p className="m-0 text-[15px] leading-normal">{c.post.text}</p>
              ) : null}
              <Image
                src="/franchise/jimmy-dashboard-post.webp"
                alt={c.post.imageAlt}
                width={2000}
                height={1188}
                sizes="(min-width: 768px) 560px, 100vw"
                className="h-[180px] w-full rounded-lg object-cover object-left-top"
              />
              <div className="flex justify-between gap-3 border-t border-line pt-2.5 text-[13px] text-[#666]">
                <span>{c.post.footer}</span>
                <a
                  href={oleh.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#0A66C2] no-underline hover:underline"
                >
                  {c.post.cta}
                </a>
              </div>
            </figure>
          </div>
        </Container>
      </Stage>
      <ChapterBridge
        number="07"
        next="offer"
        statement={
          <>
            {c.bridge.lead} {FOUNDING.slots} {c.bridge.tail}
            <DaysLeftMark />
          </>
        }
      />
    </>
  );
}
