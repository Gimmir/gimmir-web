import { ChipRow } from "@/components/blocks/chip-row";
import { InlineHeadline } from "@/components/blocks/inline-headline";
import { TwoDoor } from "@/components/blocks/two-door";
import { FoundersPortrait } from "@/components/home/founders-portrait";
import { Stage } from "@/components/motion/stage";
import { Container } from "@/components/ui/container";
import { home } from "@/content/home";

/**
 * ① The front door. Split from xl: proof, the promise (with "own"
 * marked), what we build and the two doors on the left; the two people you
 * would be talking to on the right. Sized to sit inside one screen.
 */
export function Hero() {
  const { chips, headline, sub, doors, caption } = home.hero;
  const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

  return (
    <Stage as="section" eager id="top" data-tone="paper" className="relative">
      <Container className="flex flex-col justify-center pb-16 pt-28 sm:pt-32 xl:min-h-[100svh] xl:pb-12 xl:pt-28">
        <div className="grid gap-14 xl:grid-cols-12 xl:items-center xl:gap-x-12">
          <div className="xl:col-span-7">
            <ChipRow chips={chips} className="fade" style={d(0)} />

            <h1 className="display mt-8 text-[clamp(2.35rem,1.1rem+3.1vw,4.35rem)] leading-[1.02] md:mt-10">
              <InlineHeadline tokens={headline} start={2} />
            </h1>

            <p
              className="fade mt-7 max-w-[46ch] text-lg leading-relaxed text-muted md:text-xl"
              style={d(560)}
            >
              {sub}
            </p>

            <div className="fade mt-10" style={d(680)}>
              <TwoDoor doors={doors} placement="home-hero" />
            </div>
          </div>

          {/* the people on the call, right next to the doors */}
          <FoundersPortrait
            caption={caption}
            className="w-full max-w-[440px] xl:col-span-5 xl:max-w-none"
          />
        </div>
      </Container>
    </Stage>
  );
}
