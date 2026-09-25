import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/cn";

export type ProofChip = {
  label: string;
  detail: string;
  href: string;
  logo?: string;
  /** a 3×3 tile standing for "many products" */
  grid?: boolean;
};

/**
 * Proof in place of a rating badge: real products, real counts, each one a
 * link to the evidence.
 */
export function ChipRow({
  chips,
  className,
  style,
}: {
  chips: readonly ProofChip[];
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <ul className={cn("flex flex-wrap gap-1 sm:gap-2", className)} style={style}>
      {chips.map((c) => (
        <li key={c.label}>
          <Link
            href={c.href}
            className={cn(
              "group flex h-9 items-center gap-1.5 rounded-full border border-line bg-surface/70 pr-2.5 text-[13px] transition-colors duration-200 hover:border-ink/40 sm:h-10 sm:gap-2.5 sm:pr-4 sm:text-[13.5px]",
              c.logo || c.grid ? "pl-1 sm:pl-[5px]" : "pl-2.5 sm:pl-4",
            )}
          >
            {c.logo ? (
              <Image
                src={c.logo}
                alt=""
                width={28}
                height={28}
                className="size-7 rounded-full max-sm:size-[26px]"
              />
            ) : c.grid ? (
              <span
                aria-hidden
                className="grid size-[26px] grid-cols-[repeat(3,3px)] place-content-center gap-[2.5px] rounded-full bg-ink sm:size-7"
              >
                {Array.from({ length: 9 }, (_, n) => (
                  <span key={n} className="size-[3px] rounded-full bg-paper" />
                ))}
              </span>
            ) : null}
            <span className="font-semibold text-ink">{c.label}</span>
            {/* phones: icon + name only, so all three sit on one row; the
                detail stays for screen readers */}
            <span aria-hidden className="text-faint max-sm:hidden">
              ·
            </span>
            <span className="text-muted max-sm:sr-only">{c.detail}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
