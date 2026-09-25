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
 */
export function TwoDoor({
  doors,
  placement,
  tone = "paper",
  className,
}: {
  doors: readonly Door[];
  placement: string;
  tone?: "paper" | "ink";
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
            onClick={() => trackEvent("door_click", { door: door.id, placement })}
            className={cn(
              "group inline-flex h-16 items-center justify-between gap-6 rounded-full pl-7 pr-2 text-[17px] font-semibold transition-[background-color,color,border-color,transform] duration-200 ease-[cubic-bezier(.23,1,.32,1)] active:scale-[.97] sm:h-[68px] sm:text-lg",
              tone === "paper"
                ? filled
                  ? "bg-ink text-paper hover:bg-lime hover:text-ink"
                  : "border border-ink/80 text-ink hover:border-ink hover:bg-ink hover:text-paper"
                : filled
                  ? "bg-paper text-ink hover:bg-lime"
                  : "border border-paper/30 text-paper hover:border-paper hover:bg-paper hover:text-ink",
            )}
          >
            {door.label}
            <span
              aria-hidden
              className={cn(
                "flex size-12 items-center justify-center rounded-full transition-[transform,background-color,color] duration-300 ease-[cubic-bezier(.23,1,.32,1)] group-hover:translate-x-0.5 sm:size-[52px]",
                filled
                  ? tone === "paper"
                    ? "bg-paper text-ink group-hover:bg-ink group-hover:text-paper"
                    : "bg-ink text-paper"
                  : tone === "paper"
                    ? "bg-ink text-paper group-hover:bg-paper group-hover:text-ink"
                    : "bg-paper text-ink group-hover:bg-ink group-hover:text-paper",
              )}
            >
              <ArrowRight className="size-5" />
            </span>
          </Link>
        );
      })}
    </div>
  );
}
