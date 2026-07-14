import { cn } from "@/lib/cn";

export function Pill({
  children,
  dot = true,
  onDark = false,
  className,
}: {
  children: React.ReactNode;
  dot?: boolean;
  onDark?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 rounded-full border px-4 py-2 text-[13px] font-semibold tracking-tight",
        onDark ? "border-paper/20 text-paper" : "border-ink/90 text-ink",
        className,
      )}
    >
      {dot ? (
        <span className="size-[7px] shrink-0 rounded-full bg-lime" aria-hidden />
      ) : null}
      {children}
    </span>
  );
}
