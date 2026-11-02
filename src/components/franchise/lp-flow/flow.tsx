import { Kicker } from "@/components/franchise/kicker";
import { Stage } from "@/components/motion/stage";
import { RiseText, wordCount } from "@/components/motion/words";
import { Container } from "@/components/ui/container";
import { FLOW_INTRO } from "@/content/franchise-page/flow";

import { FlowExplorer } from "./explorer";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

/**
 * /franchise chapter "Every feature" (Oleh's landing artboard, 2 Nov): a
 * header, then a six-stage explorer. Each stage shows its copy beside an
 * illustrated screen drawn in code and repainted with the visitor's brand.
 */
export function LpFlow() {
  const after = wordCount(FLOW_INTRO.title) * 40 + 300;

  return (
    <Stage
      as="section"
      id="everything"
      data-tone="paper"
      className="scroll-mt-[84px] pt-32"
    >
      <Container className="flex flex-col gap-8">
        <div className="mx-auto flex max-w-[900px] flex-col items-center gap-4 text-center">
          <div className="fade">
            <Kicker>{FLOW_INTRO.kicker}</Kicker>
          </div>
          <h2 className="display m-0 text-[clamp(34px,4.6vw,56px)] leading-none">
            <RiseText text={FLOW_INTRO.title} />
          </h2>
          <p
            className="fade m-0 max-w-[660px] text-[19px] leading-[1.55] text-muted"
            style={d(after)}
          >
            {FLOW_INTRO.lead}
          </p>
        </div>

        <FlowExplorer />
      </Container>
    </Stage>
  );
}
