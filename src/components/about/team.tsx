import { Stage } from "@/components/motion/stage";
import { RiseText, wordCount } from "@/components/motion/words";
import { Container } from "@/components/ui/container";
import { about } from "@/content/about";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

/**
 * /about ⑥, the team and the company behind the two of them, in three
 * tiles (the live founders page's approved wording).
 */
export function AboutTeam() {
  const { title, items } = about.team;
  const after = wordCount(title) * 40 + 300;

  return (
    <Stage as="section" data-tone="paper" className="border-t border-line">
      <Container className="py-20 md:py-28">
        <h2 className="display max-w-[18ch] text-[length:var(--text-title)] leading-[1.02]">
          <RiseText text={title} />
        </h2>
        <ul className="mt-12 grid gap-4 md:mt-16 md:grid-cols-3">
          {items.map((it, i) => (
            <li
              key={it.label}
              className="fade flex flex-col rounded-[24px] bg-surface p-6 ring-1 ring-line md:p-7"
              style={d(after + i * 90)}
            >
              <span className="display text-[clamp(3rem,2rem+2.5vw,4.5rem)] leading-[0.9] text-transparent [-webkit-text-stroke:1.3px_var(--color-ink)]">
                {it.value}
              </span>
              <p className="mt-8 text-xl font-bold tracking-[-0.01em]">
                {it.label}
              </p>
              <p className="mt-2 leading-relaxed text-muted">{it.body}</p>
            </li>
          ))}
        </ul>
      </Container>
    </Stage>
  );
}
