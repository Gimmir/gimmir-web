import Link from "next/link";

import { Stage } from "@/components/motion/stage";
import { RiseText, wordCount } from "@/components/motion/words";
import { Container } from "@/components/ui/container";
import { ArrowRight, ArrowUpRight } from "@/components/ui/icons";
import { franchise } from "@/content/franchise";

import { Ctas } from "./ctas";

/**
 * /franchise ⑤, the proof on ink: UN1T, a 10-studio franchise. The quote
 * is Rob's, word for word (`UN1T.quote`), the fee is "about", and there are
 * no App Store ratings, stack or integrations here (approved claims only).
 */
export function FranchiseProof() {
  const { title, story, quote, appStore, read, yours } = franchise.proof;
  const after = wordCount(title) * 40 + 300;
  const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

  return (
    <Stage
      as="section"
      id="proof"
      data-tone="ink"
      className="relative bg-ink text-paper"
    >
      <Container className="py-20 md:py-28">
        <h2 className="display max-w-[22ch] text-[length:var(--text-title)] leading-[1.02]">
          <RiseText text={title} />
        </h2>
        <div className="mt-10 grid gap-x-12 gap-y-10 md:mt-14 lg:grid-cols-12">
          <p
            className="fade text-lg leading-relaxed text-paper/75 md:text-xl lg:col-span-6"
            style={d(after)}
          >
            {story}
          </p>
          <figure
            className="fade lg:col-span-6"
            style={d(after + 100)}
          >
            <blockquote className="font-serif text-2xl italic leading-snug text-paper md:text-3xl">
              “{quote.text}”
            </blockquote>
            <figcaption className="mt-4 text-[15px] text-paper/60">
              {quote.name}, {quote.org}
            </figcaption>
          </figure>
        </div>
        <div
          className="fade mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 text-lg font-semibold"
          style={d(after + 200)}
        >
          <a
            href={appStore.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5"
          >
            <span className="border-b border-paper/40 pb-1 transition-colors group-hover:border-paper">
              {appStore.label}
            </span>
            <ArrowUpRight className="size-5" />
          </a>
          <Link href={read.href} className="group inline-flex items-center gap-2.5">
            <span className="border-b border-paper/40 pb-1 transition-colors group-hover:border-paper">
              {read.label}
            </span>
            <ArrowRight className="size-5 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
        <p
          className="fade mt-14 max-w-[46ch] text-xl font-semibold leading-snug md:mt-16 md:text-2xl"
          style={d(after + 300)}
        >
          {yours}
        </p>
        <div className="fade mt-8" style={d(after + 360)}>
          <Ctas placement="franchise-proof" onDark />
        </div>
      </Container>
    </Stage>
  );
}
