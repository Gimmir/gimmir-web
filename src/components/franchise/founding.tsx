import { Stage } from "@/components/motion/stage";
import { RiseText, wordCount } from "@/components/motion/words";
import { Container } from "@/components/ui/container";
import { franchise } from "@/content/franchise";
import { FOUNDING } from "@/content/offer";

import { FoundingCounter } from "./founding-counter";

/** Deposits that have landed. Oleh tells the site; a CMS value replaces it. */
const TAKEN = 0;

/**
 * /franchise ⑧, the price: founding partners on ink, the counter first,
 * then the fixed set-up and how it is paid, what they give and what they
 * get, and why only 3.
 */
export function FranchiseFounding() {
  const { title, price, payments, versus, give, get, why } = franchise.founding;
  const after = wordCount(title) * 40 + 300;
  const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

  return (
    <Stage
      as="section"
      id="founding"
      data-tone="ink"
      className="relative bg-ink text-paper"
    >
      <Container className="py-20 md:py-28">
        <h2 className="display text-[length:var(--text-title)] leading-[1.02]">
          <RiseText text={title} />
        </h2>
        <FoundingCounter
          slots={FOUNDING.slots}
          taken={TAKEN}
          termsClose={FOUNDING.termsClose}
          className="fade mt-8"
        />
        <div className="mt-12 grid gap-x-12 gap-y-10 md:mt-16 lg:grid-cols-12">
          <div className="fade lg:col-span-6" style={d(after)}>
            <p className="display text-[length:var(--text-display)] leading-[1.05]">
              {price}
            </p>
            <p className="mt-5 text-lg leading-relaxed text-paper/75">
              {payments}
            </p>
            <p className="mt-5 text-lg leading-relaxed text-paper/75">
              {versus}
            </p>
          </div>
          <div
            className="fade grid gap-8 sm:grid-cols-2 lg:col-span-6"
            style={d(after + 100)}
          >
            {[give, get].map((col) => (
              <div key={col.title}>
                <h3 className="text-sm font-semibold text-paper/50">
                  {col.title}
                </h3>
                <ul className="mt-4 flex flex-col gap-3 text-lg leading-snug">
                  {col.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <p
          className="fade mt-12 max-w-[52ch] border-t border-line-dark pt-8 text-lg leading-relaxed text-paper/75"
          style={d(after + 200)}
        >
          {why}
        </p>
      </Container>
    </Stage>
  );
}
