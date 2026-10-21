import { ChapterBridge } from "@/components/franchise/chapters";
import { Kicker } from "@/components/franchise/kicker";
import { Stage } from "@/components/motion/stage";
import { RiseText, wordCount } from "@/components/motion/words";
import { Container } from "@/components/ui/container";

import { NumbersModel } from "./model";
import { Mark } from "./shared";

/**
 * /franchise 02, your numbers (Oleh's artboard): the headline and lead, then
 * the three-step model of the visitor's own network with its running result,
 * then the bridge to 03. The model is the only client island.
 */
export function LpNumbers() {
  const title = "Model your own network.";
  const after = wordCount(title) * 40 + 300;
  const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

  return (
    <>
      <Stage
        as="section"
        id="numbers"
        data-tone="paper"
        className="scroll-mt-[84px] pt-8 pb-10"
      >
        <Container className="flex flex-col gap-10">
          <div className="mx-auto flex max-w-[780px] flex-col items-center gap-[18px] text-center">
            <Kicker>02 · Your numbers</Kicker>
            <h2 className="display m-0 text-[length:var(--text-title)] leading-[1.02]">
              <RiseText text={title} />
            </h2>
            <p
              className="fade m-0 max-w-[660px] text-[19px] leading-[1.55] text-muted"
              style={d(after)}
            >
              Answer a step and the next one opens. It is a projection, not a promise: on
              the call we redo it with your real figures.
            </p>
          </div>
          <div className="fade" style={d(after + 120)}>
            <NumbersModel />
          </div>
        </Container>
      </Stage>

      <ChapterBridge
        statement={
          <>
            That&apos;s the money. <Mark>Here&apos;s the product that makes it.</Mark>
          </>
        }
        next="platform"
        number="03"
      />
    </>
  );
}
