import { Stage } from "@/components/motion/stage";
import { RiseText, wordCount } from "@/components/motion/words";
import { Container } from "@/components/ui/container";
import { franchise, gbp } from "@/content/franchise";
import { FOUNDING, PLANS } from "@/content/offer";
import { cn } from "@/lib/cn";

import { Ctas } from "./ctas";

/**
 * /franchise ⑨, the plans from `PLANS`: three cards, Grow drawn on ink as
 * the founding plan. The standard set-up isn't offered yet, so it isn't
 * shown.
 */
export function FranchisePlans() {
  const { title, unit, minimum, foundingTag, foundingRate, standard, note } =
    franchise.plans;
  const after = wordCount(title) * 40 + 300;
  const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

  return (
    <Stage as="section" data-tone="paper" className="relative">
      <Container className="py-20 md:py-28">
        <h2 className="display text-[length:var(--text-title)] leading-[1.02]">
          <RiseText text={title} />
        </h2>
        <ul className="mt-12 grid gap-4 md:mt-16 lg:grid-cols-3">
          {PLANS.map((p, i) => {
            const isFounding = p.id === FOUNDING.planId && p.founding;
            const perUnit = isFounding ? p.founding!.perUnit : p.perUnit;
            const min = isFounding ? p.founding!.minimum : p.minimum;
            return (
              <li
                key={p.id}
                className={cn(
                  "fade flex flex-col rounded-[24px] p-6 sm:p-8",
                  isFounding
                    ? "bg-ink text-paper"
                    : "bg-surface ring-1 ring-line",
                )}
                style={d(after + i * 80)}
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-2xl font-bold tracking-[-0.01em]">
                    {p.name}
                  </h3>
                  {isFounding ? (
                    <span className="rounded-full border border-paper/30 px-3 py-1 text-sm font-semibold">
                      {foundingTag}
                    </span>
                  ) : null}
                </div>
                <p className="display mt-6 text-[clamp(2.5rem,1.6rem+2.4vw,3.75rem)] leading-none">
                  {gbp(perUnit)}
                </p>
                <p
                  className={cn(
                    "mt-2 text-[15px]",
                    isFounding ? "text-paper/70" : "text-muted",
                  )}
                >
                  {unit}
                  {isFounding ? (
                    <>
                      {", "}
                      {foundingRate}.{" "}
                      <span className="line-through">{gbp(p.perUnit)}</span>{" "}
                      {standard}
                    </>
                  ) : null}
                </p>
                <p className="mt-5 text-lg font-semibold">
                  {gbp(min)} {minimum}
                  {isFounding ? (
                    <span className="ml-2 text-[15px] font-normal text-paper/70">
                      <span className="line-through">{gbp(p.minimum)}</span>{" "}
                      {standard}
                    </span>
                  ) : null}
                </p>
                <p
                  className={cn(
                    "mt-5 border-t pt-5 leading-relaxed",
                    isFounding
                      ? "border-line-dark text-paper/80"
                      : "border-line text-muted",
                  )}
                >
                  {p.includes}
                </p>
              </li>
            );
          })}
        </ul>
        <p
          className="fade mt-8 max-w-[60ch] text-lg leading-relaxed md:mt-10 md:text-xl"
          style={d(after + 300)}
        >
          {note}
        </p>
        <div className="fade mt-8" style={d(after + 360)}>
          <Ctas placement="franchise-plans" />
        </div>
      </Container>
    </Stage>
  );
}
