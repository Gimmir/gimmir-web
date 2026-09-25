import { Fragment } from "react";

import { cn } from "@/lib/cn";

function Group({ items, hidden = false }: { items: readonly string[]; hidden?: boolean }) {
  return (
    <div
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center gap-x-8 pr-8 md:gap-x-12 md:pr-12"
    >
      {items.map((item, i) => (
        <Fragment key={i}>
          <span className="whitespace-nowrap">{item}</span>
          <span aria-hidden className="opacity-40">
            /
          </span>
        </Fragment>
      ))}
    </div>
  );
}

/**
 * The mechanics, slowly passing: mono caps, pauses while hovered so it
 * can be read, still for reduced motion.
 */
export function MonoMarquee({
  items,
  tone = "ink",
  className,
}: {
  items: readonly string[];
  tone?: "ink" | "paper";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "marquee-track flex overflow-hidden border-t py-6 font-mono text-[13px] uppercase tracking-[0.14em] md:text-sm",
        tone === "ink" ? "border-line-dark text-paper/60" : "border-line text-muted",
        className,
      )}
    >
      <div className="flex w-max animate-[marquee_60s_linear_infinite] motion-reduce:animate-none">
        <Group items={items} />
        <Group items={items} hidden />
      </div>
    </div>
  );
}
