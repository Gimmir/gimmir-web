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
 * left and slides right, opening the pill and its label behind it (see
 * the Door block in globals.css). The pill surface and label live on the
 * .door-fill layer, so the entrance and the hover states share it.
 * `delay` is when the first door starts, in ms.
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
            {/* sizes the button; the label you see rides in the pill */}
            <span aria-hidden className="invisible whitespace-nowrap">
              {door.label}
            </span>

            {/* the pill and its label: a window that opens left to right
                with the knob (.door-reveal) over a surface that stays put
                (.door-fill), so the text is uncovered, never animated, and
                an outline keeps its left cap while it is drawn */}
            <span
              aria-hidden
              className="door-reveal absolute inset-0 overflow-hidden rounded-full"
            >
              <span
                className={cn(
                  "door-fill absolute inset-0 flex items-center rounded-full pl-7 transition-[background-color,border-color,color] duration-200",
                  filled
                    ? "bg-ink text-paper group-hover:bg-lime group-hover:text-ink"
                    : "border border-ink/80 text-ink group-hover:border-ink group-hover:bg-ink group-hover:text-paper",
                )}
              >
                <span className="whitespace-nowrap">{door.label}</span>
              </span>
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
