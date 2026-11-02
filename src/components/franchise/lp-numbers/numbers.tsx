import { Kicker } from "@/components/franchise/kicker";
import { Stage } from "@/components/motion/stage";
import { RiseText, wordCount } from "@/components/motion/words";
import { Container } from "@/components/ui/container";

import { NumbersModel } from "./model";

/**
 * /franchise, your numbers (Oleh's artboard): the headline and lead, then
 * the three-step model of the visitor's own network with its running
 * result. The model is the only client island.
 */
export function LpNumbers() {
  const line1 = "What’s it worth to you?";
  const line2 = "3 questions, 60 seconds.";
  const title = `${line1} ${line2}`;
  const after = wordCount(title) * 40 + 300;
  const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

  return (
    <Stage
      as="section"
      id="numbers"
      data-tone="paper"
      className="scroll-mt-[84px] pt-32"
    >
      <Container className="flex flex-col gap-10">
        <div className="mx-auto flex max-w-[780px] flex-col items-center gap-[18px] text-center">
          <Kicker>Your numbers</Kicker>
          <h2 className="display m-0 text-[length:var(--text-title)] leading-[1.02]">
            <RiseText text={line1} />
            <br />
            <RiseText text={line2} start={wordCount(line1)} />
          </h2>
          <p
            className="fade m-0 max-w-[660px] text-[19px] leading-[1.55] text-muted"
            style={d(after)}
          >
            A projection, not a promise. On the call we redo it with your real
            figures.
          </p>
        </div>
        <div className="fade" style={d(after + 120)}>
          <NumbersModel />
        </div>
      </Container>
    </Stage>
  );
}
