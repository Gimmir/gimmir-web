import { cn } from "@/lib/cn";

/**
 * Lime marker highlight behind text. `full` paints the whole phrase like a
 * highlighter; otherwise it's a thick underline-style swipe along the baseline.
 * Uses box-decoration-break so the highlight hugs the text on each line when it
 * wraps, instead of forming one full-width rectangle.
 */
export function Mark({
  children,
  full = false,
  className,
}: {
  children: React.ReactNode;
  full?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "[-webkit-box-decoration-break:clone] [box-decoration-break:clone]",
        full
          ? "bg-lime px-[0.08em] text-ink"
          : "bg-[linear-gradient(to_top,var(--color-lime)_0.32em,transparent_0.32em)]",
        className,
      )}
    >
      {children}
    </span>
  );
}
