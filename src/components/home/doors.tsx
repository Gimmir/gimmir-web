import Link from "next/link";

import { ArrowRight } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

const DOORS = [
  {
    href: "/operators",
    title: "I run or franchise 8+ locations",
    body: "See what renting your platform really costs.",
    dark: true,
  },
  {
    href: "/the-review",
    title: "I’m building a fitness or health product",
    body: "Find out if it will survive growth.",
    dark: false,
  },
];

/** The two-door split under the home hero: operators vs. product founders. */
export function Doors({ className }: { className?: string }) {
  return (
    <nav
      aria-label="Choose your path"
      className={cn("grid grid-cols-2 gap-3 sm:gap-4", className)}
    >
      {DOORS.map((d) => (
        <Link
          key={d.href}
          href={d.href}
          className={cn(
            "group flex flex-col justify-between gap-3 rounded-2xl border p-4 transition-[background-color,border-color,transform] duration-200 ease-[var(--ease-out)] active:scale-[.98] sm:p-6",
            d.dark
              ? "border-ink bg-ink text-paper hover:bg-ink/90"
              : "border-line bg-surface text-ink hover:border-ink",
          )}
        >
          <span className="text-[15px] font-bold leading-snug tracking-tight sm:text-xl">
            {d.title}
          </span>
          <span
            className={cn(
              "flex items-end justify-between gap-3 text-[13px] leading-snug sm:text-base",
              d.dark ? "text-paper/65" : "text-muted",
            )}
          >
            {d.body}
            <ArrowRight
              className={cn(
                "size-[18px] shrink-0 transition-transform duration-200 group-hover:translate-x-0.5",
                d.dark ? "text-lime" : "text-ink",
              )}
            />
          </span>
        </Link>
      ))}
    </nav>
  );
}
