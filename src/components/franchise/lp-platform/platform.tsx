import { CtaBand } from "@/components/franchise/cta-band";
import { Kicker } from "@/components/franchise/kicker";
import { Mark } from "@/components/franchise/lp-numbers/shared";
import { Stage } from "@/components/motion/stage";
import { RiseText, wordCount } from "@/components/motion/words";
import { Container } from "@/components/ui/container";
import { PLATFORM } from "@/content/franchise-page/platform";
import { FOUNDING } from "@/content/offer";
import { cn } from "@/lib/cn";

import { CANVAS } from "./canvas";
import { AppViz, AskViz, HqViz, PayViz, StayViz, TrainViz } from "./illustrations";
import { Viz } from "./viz";

/**
 * /franchise, "What you get" (Oleh's landing artboard, 2 Nov): six things
 * the network runs on, as a bento grid. Row 1 is wide + narrow, row 2
 * narrow + wide, row 3 two equal cards. Each card is a soft illustration
 * panel (drawn in code, repainted with the visitor's brand) with its title
 * and text under it, or beside it on the wide cards. On a phone it is one
 * column with the drawing on top.
 */

const BENTO = [
  { Art: AppViz, canvas: CANVAS.app, s0: 0.82, span: "min-[1000px]:col-span-4", wide: true },
  { Art: PayViz, canvas: CANVAS.pay, s0: 0.72, span: "min-[1000px]:col-span-2", wide: false },
  { Art: StayViz, canvas: CANVAS.stay, s0: 0.72, span: "min-[1000px]:col-span-2", wide: false },
  { Art: HqViz, canvas: CANVAS.hq, s0: 0.85, span: "min-[1000px]:col-span-4", wide: true },
  { Art: TrainViz, canvas: CANVAS.train, s0: 1, span: "min-[1000px]:col-span-3", wide: false },
  { Art: AskViz, canvas: CANVAS.ask, s0: 1, span: "min-[1000px]:col-span-3", wide: false },
] as const;

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

const closeLabel = new Date(`${FOUNDING.termsClose}T12:00:00Z`).toLocaleDateString("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

export function LpPlatform() {
  const C = PLATFORM;
  const title = `${C.title} ${C.marked}`;
  const after = wordCount(title) * 40 + 300;

  return (
    <>
      <Stage as="section" id="platform" data-tone="paper" className="scroll-mt-[84px] pt-32">
        <Container className="flex flex-col gap-8">
          <div className="mx-auto flex max-w-[860px] flex-col items-center gap-4 text-center">
            <Kicker>{C.kicker}</Kicker>
            <h2 className="display m-0 text-[length:var(--text-title)] leading-[1.02]">
              <RiseText text={C.title} />{" "}
              <Mark>
                <RiseText text={C.marked} start={wordCount(C.title)} />
              </Mark>
            </h2>
            <p
              className="fade m-0 max-w-[660px] text-[19px] leading-[1.55] text-muted"
              style={d(after)}
            >
              {C.lead}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 min-[1000px]:grid-cols-6">
            {BENTO.map(({ Art, canvas, s0, span, wide }, i) => {
              const tile = C.tiles[i];
              const text = (
                <div
                  className={cn(
                    "flex flex-col gap-2 px-3 pt-1 pb-3.5",
                    wide && "min-[1000px]:justify-center min-[1000px]:px-7 min-[1000px]:py-6",
                  )}
                >
                  <h3
                    className={cn(
                      "m-0 text-xl leading-[1.2] font-bold tracking-[-0.02em]",
                      wide && "min-[1000px]:text-[28px]",
                    )}
                  >
                    {tile.title}
                  </h3>
                  <p className="m-0 text-[15px] leading-[1.5] text-muted">{tile.body}</p>
                </div>
              );
              const viz = (
                <Viz w={canvas.w} h={canvas.h} s0={s0}>
                  <Art />
                </Viz>
              );
              return (
                <article
                  key={tile.title}
                  className={cn(
                    "group/card flex flex-col gap-3 rounded-3xl bg-surface p-2.5 shadow-[0_0_0_1px_rgba(21,20,14,0.07),0_16px_40px_-24px_rgba(21,20,14,0.22)] sm:p-3",
                    span,
                    wide &&
                      "flex-col-reverse min-[1000px]:grid min-[1000px]:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] min-[1000px]:gap-3",
                  )}
                >
                  {wide ? (
                    <>
                      {text}
                      {viz}
                    </>
                  ) : (
                    <>
                      {viz}
                      {text}
                    </>
                  )}
                </article>
              );
            })}
          </div>
        </Container>
      </Stage>

      <Stage className="pt-28 pb-20">
        <CtaBand
          title={C.band.title}
          note={`${FOUNDING.slots} founding places. Terms close ${closeLabel}.`}
          placement={C.band.placement}
        />
      </Stage>
    </>
  );
}
