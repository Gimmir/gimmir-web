import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/cn";

export type ProofChip = {
  label: string;
  detail: string;
  href: string;
  logo?: string;
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
    <ul className={cn("flex flex-wrap gap-1.5 sm:gap-2", className)} style={style}>
      {chips.map((c) => (
        <li key={c.label}>
          <Link
            href={c.href}
            className={cn(
              "group inline-flex h-9 items-center gap-1.5 rounded-full border border-line bg-surface/70 pr-2.5 text-[12.5px] transition-colors duration-200 hover:border-ink/40 sm:h-10 sm:gap-2.5 sm:pr-4 sm:text-[13.5px]",
              c.logo ? "pl-1 sm:pl-1.5" : "pl-2.5 sm:pl-4",
            )}
          >
            {c.logo ? (
              <Image
                src={c.logo}
                alt=""
                width={28}
                height={28}
                className="size-7 rounded-[8px] max-sm:size-[26px]"
              />
            ) : null}
            <span className="font-semibold text-ink">{c.label}</span>
            <span aria-hidden className="text-faint">
              ·
            </span>
            <span className="text-muted">{c.detail}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
