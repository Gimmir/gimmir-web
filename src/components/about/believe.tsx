import { Stage } from "@/components/motion/stage";
import { RiseText, wordCount } from "@/components/motion/words";
import { Container } from "@/components/ui/container";
import { about } from "@/content/about";

const at = (ms: number, dur?: number) =>
  ({
    "--d": `${ms}ms`,
    ...(dur ? { "--dur": `${dur}ms` } : {}),
  }) as React.CSSProperties;

/**
 * /about ⑤, what we believe, five rows: each rule draws in, then the
 * belief in display type, then what it means in the serif voice.
 */
export function AboutBelieve() {
  const { title, items } = about.believe;
  const after = wordCount(title) * 40 + 300;

  return (
    <Stage as="section" data-tone="paper">
      <Container className="py-20 md:py-28">
        <h2 className="display text-[length:var(--text-title)] leading-[1.02]">
          <RiseText text={title} />
        </h2>
        <ol className="mt-12 md:mt-16">
          {items.map((it, i) => {
            const t = after + i * 140;
            return (
              <li
                key={it.title}
                className="relative grid gap-3 py-7 md:grid-cols-[4rem_1.1fr_1fr] md:items-baseline md:gap-8 md:py-9"
              >
                <span
                  aria-hidden
                  className="wipe absolute inset-x-0 top-0 h-px bg-line"
                  style={at(t, 800)}
                />
                <span
                  className="fade font-mono text-[12px] text-faint"
                  style={at(t + 150)}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3
                  className="fade display text-[clamp(1.6rem,1rem+1.6vw,2.6rem)] leading-[1.05]"
                  style={at(t + 200)}
                >
                  {it.title}
                </h3>
                <p
                  className="fade max-w-[40ch] font-serif text-[clamp(1.15rem,1rem+0.4vw,1.4rem)] italic leading-snug text-muted"
                  style={at(t + 320)}
                >
                  {it.body}
                </p>
              </li>
            );
          })}
        </ol>
      </Container>
    </Stage>
  );
}
