import { Stage } from "@/components/motion/stage";
import { RiseText, wordCount } from "@/components/motion/words";
import { Container } from "@/components/ui/container";
import { Check } from "@/components/ui/icons";
import { HQ_FEATURES } from "@/content/hq-features";
import { cn } from "@/lib/cn";

/**
 * /franchise, what HQ gets: the agreed groups from `HQ_FEATURES`, money
 * first. Group A is the lead, a wide ink card; the rest are plain cards in
 * a grid. Only groups with `shown: true` render.
 */
export function FranchiseWhatHqGets({ id = "what-hq-gets" }: { id?: string }) {
  const { title, lead, groups } = HQ_FEATURES;
  const shown = groups.filter((g) => g.shown);
  const after = wordCount(title) * 40 + 300;
  const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

  return (
    <Stage as="section" id={id} data-tone="paper" className="relative">
      <Container className="py-20 md:py-28">
        <h2 className="display text-[length:var(--text-title)] leading-[1.02]">
          <RiseText text={title} />
        </h2>
        <p
          className="fade mt-6 max-w-[60ch] text-lg leading-[1.45] text-muted"
          style={d(after)}
        >
          {lead}
        </p>
        <ul className="mt-12 grid gap-4 md:mt-16 md:grid-cols-2 lg:grid-cols-3">
          {shown.map((g, i) => {
            const first = i === 0;
            return (
              <li
                key={g.id}
                className={cn(
                  "fade rounded-[24px] p-6 sm:p-8",
                  first
                    ? "bg-ink text-paper md:col-span-2 lg:col-span-3 lg:p-12"
                    : "bg-surface shadow-[0_1px_0_rgba(21,20,14,0.04),0_28px_56px_-36px_rgba(21,20,14,0.35)] ring-1 ring-line transition-shadow hover:shadow-[0_1px_0_rgba(21,20,14,0.04),0_36px_64px_-34px_rgba(21,20,14,0.45)]",
                )}
                style={d(after + 120 + i * 70)}
              >
                <div
                  className={cn(
                    first &&
                      "lg:grid lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-14",
                  )}
                >
                  <div>
                    <p
                      aria-hidden
                      className={cn(
                        "font-mono text-[13px] uppercase tracking-[0.04em]",
                        first ? "text-paper/80" : "text-muted",
                      )}
                    >
                      {g.letter}
                    </p>
                    {first ? (
                      <span
                        aria-hidden
                        className="display pointer-events-none mt-4 block text-[clamp(6rem,4rem+8vw,11rem)] leading-[0.8] text-transparent [-webkit-text-stroke:1.5px_var(--color-paper)] max-lg:hidden"
                      >
                        {g.letter}
                      </span>
                    ) : null}
                    <h3
                      className={cn(
                        "font-bold tracking-[-0.01em]",
                        first
                          ? "mt-3 text-3xl leading-[1.08] sm:text-4xl lg:mt-8"
                          : "mt-3 text-2xl",
                      )}
                    >
                      {g.title}
                    </h3>
                  </div>
                  <ul
                    className={cn(
                      "flex flex-col gap-4",
                      first ? "mt-6 lg:mt-0" : "mt-5",
                    )}
                  >
                    {g.items.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3.5 text-base leading-[1.45] sm:text-lg"
                      >
                        <span
                          aria-hidden
                          className={cn(
                            "mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full",
                            first ? "bg-lime text-ink" : "bg-ink text-paper",
                          )}
                        >
                          <Check className="size-3.5" />
                        </span>
                        <span className={first ? "text-paper/90" : "text-muted"}>
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </Stage>
  );
}
