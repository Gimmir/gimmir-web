import { Stage } from "@/components/motion/stage";
import { RiseText, wordCount } from "@/components/motion/words";
import { Container } from "@/components/ui/container";
import { operators } from "@/content/operators";
import { cn } from "@/lib/cn";

/**
 * /operators ⑤, migration step by step: six steps on one line, each with
 * what you get and how long, no prices. The first dot is lime (it costs
 * nothing). On wide screens the steps sit on a drawn line; on phones they
 * are cards you swipe through, in order.
 */
export function OperatorsMigration() {
  const { title, steps, note } = operators.migration;
  const after = wordCount(title) * 40 + 300;
  const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

  return (
    <Stage as="section" data-tone="paper" className="border-t border-line">
      <Container className="py-20 md:py-28">
        <h2 className="display text-[length:var(--text-title)] leading-[1.02]">
          <RiseText text={title} />
        </h2>
        <ol
          className="fade -mx-5 mt-12 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto overscroll-x-contain px-5 pb-2 [scrollbar-width:none] sm:-mx-6 sm:px-6 md:mt-16 lg:mx-0 lg:grid lg:grid-cols-6 lg:gap-0 lg:overflow-visible lg:px-0 [&::-webkit-scrollbar]:hidden"
          style={d(after)}
        >
          {steps.map((s, i) => (
            <li
              key={s.name}
              className="flex w-[78%] shrink-0 snap-start flex-col rounded-[24px] border border-line bg-surface p-5 sm:w-[44%] lg:w-auto lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0 lg:pr-6"
            >
              <div className="flex items-center">
                <span
                  className={cn(
                    "flex size-7 shrink-0 items-center justify-center rounded-full text-[12px] font-semibold",
                    i === 0
                      ? "bg-lime text-ink ring-4 ring-lime/30"
                      : "border border-ink/80 bg-paper text-ink",
                  )}
                >
                  {i + 1}
                </span>
                {i < steps.length - 1 && (
                  <span
                    aria-hidden
                    className="ml-3 hidden h-px flex-1 bg-ink/25 lg:block"
                  />
                )}
              </div>
              <h3 className="mt-5 text-xl font-bold tracking-[-0.01em]">
                {s.name}
              </h3>
              <p className="mt-2 w-fit rounded-full bg-paper-2 px-2.5 py-1 text-[13px] font-medium text-muted">
                {s.time}
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">
                {s.body}
              </p>
            </li>
          ))}
        </ol>
        <p
          className="fade mt-8 text-[15px] text-muted md:mt-10"
          style={d(after + 200)}
        >
          {note}
        </p>
      </Container>
    </Stage>
  );
}
