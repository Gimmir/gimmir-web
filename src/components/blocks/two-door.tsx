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
 * Inside a <Stage> each door grows out of its arrow knob: a fixed left cap,
 * a right cap that rides with the knob on one track, and between them the
 * straight middle and the label, both still, uncovered by a window whose
 * edge sits under the knob's centre. So it is a whole pill at every frame,
 * outline included, and the label never moves. See the Door block in
 * globals.css. `delay` is when the first door starts, in ms.
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
        // The outline is an opaque ink-on-paper mix, not ink/80: the pieces
        // overlap by a pixel so no seam shows, and a translucent line would
        // read darker where two of them meet.
        const surface = filled
          ? "bg-ink group-hover:bg-lime"
          : "border-[color-mix(in_srgb,var(--color-ink)_80%,var(--color-paper))] group-hover:border-ink group-hover:bg-ink";
        const piece =
          "transition-[background-color,border-color] duration-200";
        return (
          <Link
            key={door.id}
            href={door.href}
            aria-label={door.label}
            onClick={() => trackEvent("door_click", { door: door.id, placement })}
            className="door group relative isolate inline-flex h-16 items-center pl-7 pr-20 text-[17px] font-semibold transition-transform duration-200 ease-[cubic-bezier(.23,1,.32,1)] active:scale-[.97] sm:h-[68px] sm:pr-24 sm:text-lg"
            style={{ "--d": `${delay + n * 170}ms` } as React.CSSProperties}
          >
            {/* sizes the button */}
            <span aria-hidden className="invisible whitespace-nowrap">
              {door.label}
            </span>

            {/* left cap: fixed */}
            <span
              aria-hidden
              className={cn(
                "absolute inset-y-0 left-0 w-(--r) rounded-l-full",
                piece,
                surface,
                !filled && "border border-r-0",
              )}
            />

            {/* the straight middle and the label stand still; the window
                over them opens with its edge under the knob's centre */}
            <span
              aria-hidden
              className="door-win absolute inset-y-0 left-0 right-(--r) overflow-hidden"
            >
              <span className="door-win-in absolute inset-0">
                <span
                  className={cn(
                    "absolute inset-y-0 left-[calc(var(--r)-1px)] right-0",
                    piece,
                    surface,
                    !filled && "border-y",
                  )}
                />
                <span
                  className={cn(
                    "relative flex h-full items-center pl-7 transition-colors duration-200",
                    filled
                      ? "text-paper group-hover:text-ink"
                      : "text-ink group-hover:text-paper",
                  )}
                >
                  <span className="whitespace-nowrap">{door.label}</span>
                </span>
              </span>
            </span>

            {/* right cap and knob ride one track, so they never part; the
                cap reaches a pixel back under the window's edge */}
            <span
              aria-hidden
              className="door-track pointer-events-none absolute inset-0"
            >
              <span
                className={cn(
                  "absolute inset-y-0 right-0 w-[calc(var(--r)+1px)] rounded-r-full",
                  piece,
                  surface,
                  !filled && "border border-l-0",
                )}
              />
              <span className="absolute inset-y-0 right-2 flex items-center">
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
            </span>
          </Link>
        );
      })}
    </div>
  );
}
