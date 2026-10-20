import { Stage } from "@/components/motion/stage";
import { RiseText, wordCount } from "@/components/motion/words";
import { Container } from "@/components/ui/container";
import { franchise } from "@/content/franchise";

/**
 * /franchise ⑦, four guarantees as numbered cards.
 */
export function FranchiseGuarantees() {
  const { title, items } = franchise.guarantees;
  const after = wordCount(title) * 40 + 300;
  const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

  return (
    <Stage
      as="section"
      data-tone="paper"
      className="relative border-t border-line bg-paper-2"
    >
      <Container className="py-20 md:py-28">
        <h2 className="display text-[length:var(--text-title)] leading-[1.02]">
          <RiseText text={title} />
        </h2>
        <ol className="mt-12 grid gap-4 md:mt-16 md:grid-cols-2 lg:grid-cols-4">
          {items.map((g, i) => (
            <li
              key={g.id}
              className="fade flex flex-col rounded-[24px] bg-surface p-6 ring-1 ring-line"
              style={d(after + i * 80)}
            >
              <span
                aria-hidden
                className="display text-[clamp(2.5rem,1.6rem+2vw,3.5rem)] leading-none text-transparent [-webkit-text-stroke:1.5px_var(--color-ink)]"
              >
                {i + 1}
              </span>
              <h3 className="mt-6 text-xl font-bold leading-snug tracking-[-0.01em]">
                {g.title}
              </h3>
              <p className="mt-2 leading-relaxed text-muted">{g.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </Stage>
  );
}
