import { MarkerStroke } from "@/components/blocks/inline-headline";
import { Stage } from "@/components/motion/stage";
import { RiseText, RiseWord } from "@/components/motion/words";
import { Container } from "@/components/ui/container";
import { UN1T } from "@/content/proof";

import { BrandCard } from "./brand-card";
import styles from "./lp-hero.module.css";
import { HeroPhones } from "./phones";

/**
 * /franchise chapter "top" (Oleh's artboard): the promise, both asks, the
 * brand card that repaints every app screen, and the two phones. The
 * visitor's brand lives in `FranchiseProvider`; the card and phones read it.
 */
export function LpHero() {
  const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;
  return (
    <Stage as="section" id="top" eager className="scroll-mt-24 overflow-x-clip pt-24 pb-[72px]">
      <Container className="grid grid-cols-[repeat(auto-fit,minmax(min(340px,100%),1fr))] items-center gap-14">
        <div className="flex min-w-0 flex-col gap-[26px]">
          <span
            className="fade inline-flex min-h-[34px] items-center gap-1.5 self-start rounded-full bg-surface px-3.5 py-1.5 text-sm font-medium text-[#3a382f] ring-1 ring-line"
            style={d(0)}
          >
            <span className={styles.live} aria-hidden />
            For fitness and kids&apos; activity franchises · UK and Ireland
          </span>
          <h1 className="display m-0 text-[clamp(46px,6.6vw,86px)] leading-[0.96] tracking-[-0.045em]">
            <RiseText text="Your franchise. Your app. Your" />{" "}
            <span className="relative inline-block">
              <RiseWord i={6}>income.</RiseWord>
              <MarkerStroke delay={650} bottom="-0.08em" />
            </span>
          </h1>
          <p
            className="fade m-0 max-w-[660px] text-[21px] leading-[1.55] text-muted"
            style={d(450)}
          >
            Your studios pay Mindbody or Glofox every month. With your own app, that money
            comes to HQ, plus a fee on every payment your members make.
          </p>
          <div className="fade flex flex-wrap gap-3" style={d(560)}>
            <a
              href="#numbers"
              className="inline-flex min-h-[52px] items-center gap-3.5 rounded-full bg-ink py-0 pr-2 pl-6 text-base font-semibold text-paper transition-[background-color,transform] duration-200 hover:-translate-y-px hover:bg-[#2a2920] active:scale-[.97]"
            >
              Work out my numbers
              <span className="inline-flex size-[38px] items-center justify-center rounded-full bg-lime text-ink">
                <svg aria-hidden viewBox="0 0 16 16" className="size-4" fill="none">
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </a>
            <a
              href={UN1T.appStore.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[52px] items-center rounded-full px-6 text-base font-semibold text-ink ring-[1.5px] ring-ink transition-[background-color,transform] duration-200 ring-inset hover:-translate-y-px hover:bg-paper-2 active:scale-[.97]"
            >
              See UN1T&apos;s live app
            </a>
          </div>
          <BrandCard className="fade" style={d(680)} />
        </div>
        <HeroPhones />
      </Container>
    </Stage>
  );
}
