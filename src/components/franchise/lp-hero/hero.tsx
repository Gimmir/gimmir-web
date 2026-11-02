import { BookTrigger } from "@/components/blocks/book-trigger";
import { MarkerStroke } from "@/components/blocks/inline-headline";
import { Stage } from "@/components/motion/stage";
import { RiseText, RiseWord } from "@/components/motion/words";
import { Container } from "@/components/ui/container";
import { shown, UN1T } from "@/content/proof";

import { BrandCard } from "./brand-card";
import styles from "./lp-hero.module.css";
import { HeroPhones } from "./phones";

/**
 * /franchise chapter "top" (Oleh's artboard v2): the promise, the two asks,
 * three proof checks and the two-phone composition. The compact brand card
 * under the checks lets a visitor repaint every app screen with their own
 * name and colour (state lives in `FranchiseProvider`).
 */

const studios = shown(UN1T.studios);
const members = shown(UN1T.members);

// claims still waiting on sign-off drop out instead of rendering
const CHECKS = [
  studios !== null ? `Built for ${UN1T.name}, ${studios} studios` : null,
  members !== null ? `${members} members on it` : null,
  "Live in 12 weeks, in writing",
].filter((c): c is string => c !== null);

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

function Check() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 18 18"
      className="mt-0.5 size-[18px] shrink-0"
    >
      <circle cx="9" cy="9" r="9" fill="var(--color-ink)" />
      <path
        d="M5 9.2l2.6 2.6L13 6.6"
        fill="none"
        stroke="var(--color-lime)"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function LpHero() {
  return (
    <Stage
      as="section"
      id="top"
      eager
      data-tone="paper"
      className="scroll-mt-24 overflow-x-clip pt-16 pb-[72px]"
    >
      <Container className="grid items-center gap-x-10 gap-y-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.02fr)]">
        <div className="flex min-w-0 flex-col gap-[26px]">
          <span
            className="fade inline-flex min-h-[34px] items-center gap-1.5 self-start rounded-full bg-surface px-3.5 py-1.5 text-sm font-medium text-muted ring-1 ring-line"
            style={d(0)}
          >
            <span className={styles.live} aria-hidden />
            For fitness and kids&apos; activity franchises · UK and Ireland
          </span>
          <h1 className="display m-0 text-[clamp(46px,6.6vw,86px)] leading-[0.98] tracking-[-0.045em]">
            <RiseText text="Your brand. Your app. Your" />{" "}
            <span className="relative inline-block whitespace-nowrap">
              <RiseWord i={5}>money.</RiseWord>
              <MarkerStroke delay={620} bottom="-0.02em" />
            </span>
          </h1>
          <p
            className="fade m-0 max-w-[520px] text-[20px] leading-[1.55] text-muted"
            style={d(450)}
          >
            Every studio pays Mindbody or Glofox every month. Own the app, and
            that money comes to you.
          </p>
          <div className="fade flex flex-wrap gap-3" style={d(560)}>
            <BookTrigger
              booking="franchiseCall"
              placement="hero"
              className="inline-flex min-h-[52px] items-center gap-3.5 rounded-full bg-ink py-0 pr-2 pl-6 text-base font-semibold text-paper transition-[background-color,transform] duration-200 ease-[var(--ease-out)] active:scale-[.97] [@media(hover:hover)]:hover:bg-ink-soft"
            >
              Book 30 minutes
              <span
                aria-hidden
                className="inline-flex size-[38px] items-center justify-center rounded-full bg-lime text-ink"
              >
                <svg viewBox="0 0 16 16" className="size-4" fill="none">
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </BookTrigger>
            <a
              href="#numbers"
              className="inline-flex min-h-[52px] items-center rounded-full px-6 text-base font-semibold text-ink ring-[1.5px] ring-ink transition-[background-color,transform] duration-200 ease-[var(--ease-out)] ring-inset active:scale-[.97] [@media(hover:hover)]:hover:bg-paper-2"
            >
              Work out my numbers
            </a>
          </div>
          <ul
            className="fade m-0 flex list-none flex-wrap gap-x-5 gap-y-2 p-0 text-sm text-muted"
            style={d(640)}
          >
            {CHECKS.map((c) => (
              <li key={c} className="inline-flex items-start gap-2">
                <Check />
                {c}
              </li>
            ))}
          </ul>
          <BrandCard className="fade" style={d(720)} />
        </div>
        <HeroPhones />
      </Container>
    </Stage>
  );
}
