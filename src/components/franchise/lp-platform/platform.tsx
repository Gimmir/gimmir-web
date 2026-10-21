import { ChapterBridge } from "@/components/franchise/chapters";
import { Kicker } from "@/components/franchise/kicker";
import { Stage } from "@/components/motion/stage";
import { Container } from "@/components/ui/container";
import { PLATFORM } from "@/content/franchise-page/platform";
import { cn } from "@/lib/cn";

import { BrandName } from "./brand-name";
import { PlatformStory } from "./story";

/**
 * /franchise, chapter 03 (Oleh's landing artboard): six things the network
 * runs on, told as a scroll story. The steps are plain server markup in a
 * list; the sticky stage beside them (story.tsx) shows the matching screen
 * and follows whichever step is in the middle of the viewport.
 */

// one static class per step: the story root carries `data-active`
const ON = [
  "group-data-[active='0']/story:border-ink",
  "group-data-[active='1']/story:border-ink",
  "group-data-[active='2']/story:border-ink",
  "group-data-[active='3']/story:border-ink",
  "group-data-[active='4']/story:border-ink",
  "group-data-[active='5']/story:border-ink",
] as const;
const ON_NUM = [
  "group-data-[active='0']/story:bg-lime group-data-[active='0']/story:shadow-[0_0_0_1px_var(--color-ink)]",
  "group-data-[active='1']/story:bg-lime group-data-[active='1']/story:shadow-[0_0_0_1px_var(--color-ink)]",
  "group-data-[active='2']/story:bg-lime group-data-[active='2']/story:shadow-[0_0_0_1px_var(--color-ink)]",
  "group-data-[active='3']/story:bg-lime group-data-[active='3']/story:shadow-[0_0_0_1px_var(--color-ink)]",
  "group-data-[active='4']/story:bg-lime group-data-[active='4']/story:shadow-[0_0_0_1px_var(--color-ink)]",
  "group-data-[active='5']/story:bg-lime group-data-[active='5']/story:shadow-[0_0_0_1px_var(--color-ink)]",
] as const;

export function LpPlatform() {
  const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;
  return (
    <>
      <section id="platform" data-tone="paper" className="pt-7 pb-6">
        <Container className="flex flex-col gap-2">
          <Stage
            as="header"
            className="mx-auto flex max-w-[860px] flex-col items-center gap-4 text-center"
          >
            <Kicker className="fade">{PLATFORM.kicker}</Kicker>
            <h2
              className="display fade text-[clamp(34px,4.6vw,56px)] leading-none"
              style={d(100)}
            >
              Six things your network runs on. All in <BrandName />
              &apos;s name.
            </h2>
            <p className="fade m-0 max-w-[660px] text-[19px] leading-[1.55] text-muted" style={d(200)}>
              {PLATFORM.lead}
            </p>
          </Stage>
          <PlatformStory>
            <ol role="list" className="m-0 list-none p-0">
              {PLATFORM.steps.map((s, i) => (
                <li
                  key={s.title}
                  data-step
                  className="flex min-h-[78vh] flex-col justify-center py-8 max-[900px]:min-h-[68vh]"
                >
                  <div
                    className={cn(
                      "border-l-[3px] border-line pl-6 transition-colors duration-300 motion-reduce:transition-none",
                      ON[i],
                    )}
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "inline-flex size-11 items-center justify-center rounded-full bg-line text-sm font-extrabold transition-[background-color,box-shadow] duration-300 motion-reduce:transition-none",
                        ON_NUM[i],
                      )}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-4 text-[clamp(28px,3.2vw,40px)] leading-[1.05] font-extrabold tracking-[-0.03em]">
                      {s.title}
                    </h3>
                    <p className="mt-3 max-w-[660px] text-[19px] leading-[1.55] text-muted">{s.body}</p>
                    <ul role="list" className="m-0 mt-[18px] flex list-none flex-wrap gap-2 p-0">
                      {s.chips.map((c) => (
                        <li
                          key={c}
                          className="inline-flex h-[34px] items-center rounded-full bg-paper-2 px-3.5 text-sm font-medium text-[#3a382f]"
                        >
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ol>
          </PlatformStory>
        </Container>
      </section>
      <ChapterBridge
        statement={PLATFORM.bridge.statement}
        next="everything"
        number={PLATFORM.bridge.number}
      />
    </>
  );
}
