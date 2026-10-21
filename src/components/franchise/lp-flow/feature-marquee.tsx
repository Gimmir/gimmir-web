import {
  FEATURE_GROUPS,
  MARQUEE_ROWS,
  type FeatureGroup,
} from "@/content/franchise-page/flow";
import { cn } from "@/lib/cn";

import { TONE_DOT } from "./actor";

const MASK =
  "[-webkit-mask-image:linear-gradient(to_right,transparent,#000_6%,#000_94%,transparent)] [mask-image:linear-gradient(to_right,transparent,#000_6%,#000_94%,transparent)]";

function Chips({
  groups,
  hidden = false,
}: {
  groups: readonly FeatureGroup[];
  /** The loop's second copy: decorative, and gone when motion is reduced. */
  hidden?: boolean;
}) {
  return (
    <ul
      aria-hidden={hidden || undefined}
      className={cn(
        "m-0 flex shrink-0 list-none gap-2.5 p-0 pr-2.5",
        "motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:pr-0",
        hidden && "motion-reduce:hidden",
      )}
    >
      {groups.flatMap((g) =>
        g.items.map((item) => (
          <li
            key={`${g.id}-${item}`}
            className="inline-flex h-[50px] items-center gap-2.5 rounded-full bg-surface px-5 text-base font-semibold whitespace-nowrap shadow-[inset_0_0_0_1px_var(--color-line)]"
          >
            <span
              aria-hidden
              className={cn("size-2.5 shrink-0 rounded-full", TONE_DOT[g.tone])}
            />
            {item}
          </li>
        )),
      )}
    </ul>
  );
}

/**
 * The features drifting past in three strips: constant linear motion,
 * paused while hovered so a chip can be read, edges faded out. Reduced
 * motion: no drift, the chips wrap and sit still.
 */
export function FeatureMarquee() {
  return (
    <div className="flex flex-col gap-2.5">
      <h3 className="sr-only">Every feature, in three strips</h3>
      {MARQUEE_ROWS.map((row, i) => {
        const groups = row.groups
          .map((id) => FEATURE_GROUPS.find((g) => g.id === id))
          .filter((g): g is FeatureGroup => Boolean(g));
        return (
          <div
            key={i}
            className={cn("marquee-track flex overflow-hidden", MASK)}
          >
            <div
              className={cn(
                "flex w-max motion-reduce:w-full motion-reduce:animate-none",
                row.reverse
                  ? "animate-[marquee_80s_linear_infinite_reverse]"
                  : "animate-[marquee_70s_linear_infinite]",
              )}
            >
              <Chips groups={groups} />
              <Chips groups={groups} hidden />
            </div>
          </div>
        );
      })}
    </div>
  );
}
