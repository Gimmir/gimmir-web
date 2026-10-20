import { Stage } from "@/components/motion/stage";
import { RiseText, wordCount } from "@/components/motion/words";
import { Container } from "@/components/ui/container";
import { Check } from "@/components/ui/icons";
import { franchise } from "@/content/franchise";

/**
 * /franchise ④, what you get: four groups of three, in plain cards.
 */
export function FranchiseWhatYouGet() {
  const { title, groups } = franchise.get;
  const after = wordCount(title) * 40 + 300;
  const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

  return (
    <Stage as="section" id="what-you-get" data-tone="paper" className="relative">
      <Container className="py-20 md:py-28">
        <h2 className="display text-[length:var(--text-title)] leading-[1.02]">
          <RiseText text={title} />
        </h2>
        <ul className="mt-12 grid gap-4 md:mt-16 md:grid-cols-2">
          {groups.map((g, i) => (
            <li
              key={g.id}
              className="fade rounded-[24px] bg-surface p-6 shadow-[0_1px_0_rgba(21,20,14,0.04),0_28px_56px_-36px_rgba(21,20,14,0.35)] ring-1 ring-line sm:p-8"
              style={d(after + i * 80)}
            >
              <h3 className="text-2xl font-bold tracking-[-0.01em]">
                {g.title}
              </h3>
              <ul className="mt-5 flex flex-col gap-4">
                {g.items.map((item) => (
                  <li key={item} className="flex gap-3.5 text-lg leading-snug">
                    <span
                      aria-hidden
                      className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-ink text-paper"
                    >
                      <Check className="size-3.5" />
                    </span>
                    <span className="text-muted">{item}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Container>
    </Stage>
  );
}
