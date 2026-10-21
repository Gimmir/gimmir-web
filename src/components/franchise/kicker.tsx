import { cn } from "@/lib/cn";

/**
 * A chapter's label above its headline ("02 · Your numbers"), with the
 * artboard's small lime square. Shared by every /franchise chapter.
 */
export function Kicker({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "m-0 inline-flex items-center gap-2.5 text-sm font-semibold text-muted",
        className,
      )}
    >
      <span
        aria-hidden
        className="size-2 rounded-[2px] bg-lime shadow-[0_0_0_1px_var(--color-ink)]"
      />
      {children}
    </p>
  );
}
