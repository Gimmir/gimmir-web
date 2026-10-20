import { Stage } from "@/components/motion/stage";
import { RiseText, wordCount } from "@/components/motion/words";
import { Container } from "@/components/ui/container";
import { Check } from "@/components/ui/icons";
import { franchise } from "@/content/franchise";

/**
 * /franchise ⑥, what you own: four things in your name, the fee that is
 * all yours, and the way out (buying the code).
 */
export function FranchiseOwn() {
  const { title, items, fee, code } = franchise.own;
  const after = wordCount(title) * 40 + 300;
  const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

  return (
    <Stage as="section" data-tone="paper" className="relative">
      <Container className="grid gap-x-10 gap-y-10 py-20 md:py-28 lg:grid-cols-12">
        <h2 className="display text-[length:var(--text-title)] leading-[1.02] lg:col-span-5">
          <RiseText text={title} />
        </h2>
        <div className="fade lg:col-span-7" style={d(after)}>
          <ul className="grid gap-3 sm:grid-cols-2">
            {items.map((item) => (
              <li
                key={item}
                className="flex items-center gap-3.5 rounded-[20px] bg-surface p-5 text-lg font-bold ring-1 ring-line"
              >
                <span
                  aria-hidden
                  className="flex size-7 shrink-0 items-center justify-center rounded-full bg-ink text-paper"
                >
                  <Check className="size-4" />
                </span>
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-[56ch] text-lg font-semibold leading-snug md:text-xl">
            {fee}
          </p>
          <p className="mt-4 max-w-[56ch] text-lg leading-relaxed text-muted">
            {code}
          </p>
        </div>
      </Container>
    </Stage>
  );
}
