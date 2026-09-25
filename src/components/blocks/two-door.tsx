"use client";

import Link from "next/link";

import { ArrowRight } from "@/components/ui/icons";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/cn";

export type Door = { id: string; label: string; href: string };

/**
 * The two front doors: one per buyer. Both are the same size on purpose;
 * the first is filled because fitness brands are the main road in, and it
 * lights up lime on hover like every filled button on the site.
 *
 * Inside a <Stage> each door builds itself: the arrow knob lands on the
 * left, slides right drawing the pill behind it, and the label types in
 * (see the Door block in globals.css). All surfaces live on the .door-fill
 * layer, so the entrance and the hover states share one element. `delay`
 * is when the first door starts, in ms.
 */
export function TwoDoor({
  doors,
  placement,
  delay = 0,
  className,
}: {
  doors: readonly Door[];
  placement: string;
  delay?: number;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-3 sm:flex-row sm:gap-4", className)}>
      {doors.map((door, n) => {
        const filled = n === 0;
        return (
          <Link
            key={door.id}
            href={door.href}
            aria-label={door.label}
            onClick={() => trackEvent("door_click", { door: door.id, placement })}
            className="door group relative isolate inline-flex h-16 items-center overflow-hidden rounded-full pl-7 pr-20 text-[17px] font-semibold transition-transform duration-200 ease-[cubic-bezier(.23,1,.32,1)] active:scale-[.97] sm:h-[68px] sm:pr-24 sm:text-lg"
            style={{ "--d": `${delay + n * 170}ms` } as React.CSSProperties}
          >
            {/* the pill itself: drawn in by the knob, recoloured on hover */}
            <span
              aria-hidden
              className={cn(
                "door-fill absolute inset-0 -z-10 rounded-full transition-[background-color,border-color] duration-200",
                filled
                  ? "bg-ink group-hover:bg-lime"
                  : "border border-ink/80 group-hover:border-ink group-hover:bg-ink",
              )}
            />

            <span
              aria-hidden
              className={cn(
                "whitespace-nowrap transition-colors duration-200",
                filled ? "text-paper group-hover:text-ink" : "text-ink group-hover:text-paper",
              )}
            >
              {Array.from(door.label).map((ch, k) => (
                <span
                  key={k}
                  className="door-char"
                  style={{ "--c": k } as React.CSSProperties}
                >
                  {ch}
                </span>
              ))}
            </span>

            {/* the knob rides this full-width track from left to right */}
            <span
              aria-hidden
              className="door-track pointer-events-none absolute inset-y-0 left-2 right-2 flex items-center justify-end"
            >
              <span className="door-knob">
                <span
                  className={cn(
                    "flex size-12 items-center justify-center rounded-full transition-[transform,background-color,color] duration-300 ease-[cubic-bezier(.23,1,.32,1)] group-hover:translate-x-0.5 sm:size-[52px]",
                    filled
                      ? "bg-paper text-ink group-hover:bg-ink group-hover:text-paper"
                      : "bg-ink text-paper group-hover:bg-paper group-hover:text-ink",
                  )}
                >
                  <ArrowRight className="size-5" />
                </span>
              </span>
            </span>
          </Link>
        );
      })}
    </div>
  );
}
