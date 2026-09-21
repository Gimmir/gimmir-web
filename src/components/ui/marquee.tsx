import { Fragment } from "react";

import { cn } from "@/lib/cn";

function MarqueeGroup({
  items,
  hidden = false,
}: {
  items: string[];
  /** The loop's second copy — decorative, so screen readers skip it. */
  hidden?: boolean;
}) {
  return (
    <div
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center gap-x-10 pr-10 text-sm font-semibold uppercase tracking-wider text-muted"
    >
      {items.map((item, i) => (
        <Fragment key={i}>
          <span className="whitespace-nowrap">{item}</span>
          <span className="text-lime" aria-hidden>
            ◆
          </span>
        </Fragment>
      ))}
    </div>
  );
}

export function Marquee({
  items,
  className,
}: {
  items: string[];
  className?: string;
}) {
  return (
    <div
      className={cn("flex overflow-hidden border-y border-line py-4", className)}
    >
      <div className="flex w-max animate-marquee motion-reduce:animate-none">
        <MarqueeGroup items={items} />
        <MarqueeGroup items={items} hidden />
      </div>
    </div>
  );
}
