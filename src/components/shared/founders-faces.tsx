import Image from "next/image";

import { cn } from "@/lib/cn";
import { FOUNDERS } from "@/lib/founders";

/** Both founders' faces with a one-line caption: the trust signal in a hero. */
export function FoundersFaces({
  caption,
  className,
}: {
  caption: string;
  className?: string;
}) {
  const founders = Object.values(FOUNDERS);
  return (
    <div className={cn("flex items-center gap-3.5", className)}>
      <div className="flex -space-x-3">
        {founders.map((f) => (
          <Image
            key={f.id}
            src={f.photo}
            alt={f.name}
            width={48}
            height={48}
            className="size-12 rounded-full object-cover object-top ring-[3px] ring-paper"
          />
        ))}
      </div>
      <p className="text-sm leading-snug text-muted">
        <span className="font-semibold text-ink">
          {founders.map((f) => f.first).join(" & ")}
        </span>
        <br />
        {caption}
      </p>
    </div>
  );
}
