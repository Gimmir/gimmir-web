import Image from "next/image";

import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/cn";
import { FOUNDERS } from "@/lib/founders";

/**
 * The hero's trust anchor: both founders as staggered portraits with name
 * and role, so the faces sit right next to the call to book them.
 */
export function FoundersPortrait({ className }: { className?: string }) {
  const founders = Object.values(FOUNDERS);

  return (
    <figure className={cn("relative", className)}>
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {founders.map((f, i) => (
          <Reveal
            key={f.id}
            eager
            delay={220 + i * 90}
            className={cn(i === 1 && "mt-10 sm:mt-14")}
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-[22px] bg-paper-2 ring-1 ring-line">
              <Image
                src={f.photo}
                alt={`${f.name}, ${f.role}`}
                fill
                priority
                sizes="(min-width: 1024px) 230px, 45vw"
                className="object-cover object-top"
              />
            </div>
            <p className="mt-3 text-[15px] font-semibold leading-tight text-ink">
              {f.name}
            </p>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-muted">
              {f.role.split(" · ")[0]}
            </p>
          </Reveal>
        ))}
      </div>

      {/* on-call marker, pinned to the first portrait */}
      <Reveal eager delay={420} className="absolute -left-2 -top-3 sm:-left-3">
        <span className="inline-flex items-center gap-2 rounded-full bg-ink px-3.5 py-1.5 text-xs font-semibold text-paper shadow-[0_8px_24px_-12px_rgba(21,20,14,0.6)]">
          <span className="size-1.5 animate-pulse-dot rounded-full bg-lime" />
          On every call
        </span>
      </Reveal>

      <figcaption className="mt-6 max-w-[34ch] font-serif text-lg italic leading-snug text-muted">
        The people on your first call are the people who build it.
      </figcaption>
    </figure>
  );
}
