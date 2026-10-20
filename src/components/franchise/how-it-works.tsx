import { Stage } from "@/components/motion/stage";
import { RiseText, wordCount } from "@/components/motion/words";
import { Container } from "@/components/ui/container";
import { franchise } from "@/content/franchise";

/**
 * /franchise ⑩, how it works: three steps in a row.
 */
export function FranchiseHowItWorks() {
  const { title, steps } = franchise.how;
  const after = wordCount(title) * 40 + 300;
  const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

  return (
    <Stage
      as="section"
      data-tone="paper"
      className="relative border-t border-line"
    >
      <Container className="py-20 md:py-28">
        <h2 className="display text-[length:var(--text-title)] leading-[1.02]">
          <RiseText text={title} />
        </h2>
        <ol className="mt-12 grid gap-8 md:mt-16 md:grid-cols-3 md:gap-6">
          {steps.map((s, i) => (
            <li
              key={s.title}
              className="fade border-t-2 border-ink pt-5"
              style={d(after + i * 80)}
            >
              <span
                aria-hidden
                className="display text-[clamp(2.5rem,1.6rem+2vw,3.5rem)] leading-none text-transparent [-webkit-text-stroke:1.5px_var(--color-ink)]"
              >
                {i + 1}
              </span>
              <h3 className="mt-5 text-xl font-bold leading-snug tracking-[-0.01em] md:text-2xl">
                {s.title}
              </h3>
              <p className="mt-2 text-lg leading-relaxed text-muted">{s.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </Stage>
  );
}
