import Image from "next/image";

import { cn } from "@/lib/cn";
import { FOUNDERS, type FounderId } from "@/lib/founders";

/** Founders' faces, overlapping: who is on the other end of a CTA. */
export function FaceStack({
  ids,
  size = 40,
  ring = "paper",
  className,
}: {
  ids: readonly FounderId[];
  size?: number;
  ring?: "paper" | "ink" | "surface";
  className?: string;
}) {
  return (
    <span className={cn("flex shrink-0", className)} aria-hidden>
      {ids.map((id, n) => (
        <span
          key={id}
          className={cn(
            "relative overflow-hidden rounded-full bg-paper-2 ring-2",
            ring === "paper" && "ring-paper",
            ring === "ink" && "ring-ink",
            ring === "surface" && "ring-surface",
          )}
          style={{
            width: size,
            height: size,
            marginLeft: n > 0 ? -size * 0.28 : 0,
            zIndex: ids.length - n,
          }}
        >
          <Image
            src={FOUNDERS[id].photo}
            alt=""
            fill
            sizes={`${size * 2}px`}
            className="object-cover object-top"
          />
        </span>
      ))}
    </span>
  );
}
