import Link from "next/link";

import { ArrowRight, Pencil } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

export function CaseBackLink({ onDark = false }: { onDark?: boolean }) {
  return (
    <Link
      href="/work"
      className={cn(
        "group inline-flex items-center gap-2 text-sm font-medium transition-colors",
        onDark ? "text-paper/55 hover:text-paper" : "text-muted hover:text-ink",
      )}
    >
      <ArrowRight className="size-4 -translate-x-0 rotate-180 transition-transform group-hover:-translate-x-0.5" />
      All case studies
    </Link>
  );
}

/** A clearly-marked editor slot for real detail the founders still need to add. */
export function CasePlaceholder({
  label,
  children,
  onDark = false,
}: {
  label: string;
  children: React.ReactNode;
  onDark?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-dashed p-6 md:p-7",
        onDark ? "border-paper/25 bg-paper/[0.04]" : "border-ink/25 bg-paper-2/50",
      )}
    >
      <span
        aria-hidden
        className="absolute inset-y-0 left-0 w-1 bg-lime/60"
      />
      <div className="flex flex-col gap-4 sm:flex-row sm:gap-5">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-lime text-ink">
          <Pencil className="size-[18px]" />
        </span>
        <div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <span
              className={cn(
                "font-mono text-xs uppercase tracking-widest",
                onDark ? "text-paper/75" : "text-ink/70",
              )}
            >
              {label}
            </span>
            <span
              className={cn(
                "rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider",
                onDark
                  ? "border-paper/25 text-paper/50"
                  : "border-ink/20 text-faint",
              )}
            >
              To add
            </span>
          </div>
          <p
            className={cn(
              "mt-2 max-w-[62ch] leading-relaxed",
              onDark ? "text-paper/60" : "text-muted",
            )}
          >
            {children}
          </p>
        </div>
      </div>
    </div>
  );
}
