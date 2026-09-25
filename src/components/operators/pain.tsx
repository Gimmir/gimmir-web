import { Stage } from "@/components/motion/stage";
import { RiseText, wordCount } from "@/components/motion/words";
import { Container } from "@/components/ui/container";
import { operators } from "@/content/operators";

/**
 * /operators ②, "Sound familiar?": three statements, large, each with its
 * number drawn in outline (the site's thin hand) and one plain line on
 * what it costs.
 */
export function OperatorsPain() {
  const { title, items } = operators.pain;
  const after = wordCount(title) * 40 + 300;
  const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

  return (
    <Stage as="section" data-tone="paper" className="border-t border-line">
      <Container className="py-20 md:py-28">
        <h2 className="display text-[length:var(--text-title)] leading-[1.02]">
          <RiseText text={title} />
        </h2>
        <ol className="mt-10 md:mt-14">
          {items.map((it, i) => (
            <li
              key={it.title}
              className="fade grid gap-x-10 gap-y-3 border-t border-line py-8 last:border-b md:grid-cols-12 md:items-start md:py-10"
              style={d(after + i * 90)}
            >
              <span
                aria-hidden
                className="display text-[3.5rem] leading-[0.9] text-transparent [-webkit-text-stroke:1.4px_var(--color-ink)] md:col-span-2 md:text-[5rem]"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="display text-[clamp(1.6rem,1rem+1.9vw,2.75rem)] leading-[1.06] md:col-span-6">
                {it.title}
              </h3>
              <p className="text-lg leading-relaxed text-muted md:col-span-4 md:pt-2">
                {it.body}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </Stage>
  );
}
