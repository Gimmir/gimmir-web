import Image from "next/image";

import { cn } from "@/lib/cn";
import { FOUNDERS, type FounderId } from "@/lib/founders";

/** A founder's face, name and role, signing a section written in their voice. */
export function FounderChip({
  id,
  caption,
  onDark = false,
  className,
}: {
  id: FounderId;
  caption?: string;
  onDark?: boolean;
  className?: string;
}) {
  const f = FOUNDERS[id];
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <Image
        src={f.photo}
        alt={f.name}
        width={48}
        height={48}
        className="size-12 rounded-full object-cover object-top ring-2 ring-lime"
      />
      <div className="text-sm leading-tight">
        <div
          className={cn("font-semibold", onDark ? "text-paper" : "text-ink")}
        >
          {f.name}
        </div>
        <div className={onDark ? "text-paper/60" : "text-muted"}>
          {caption ?? f.role}
        </div>
      </div>
    </div>
  );
}
