import { formatDate } from "@/content/franchise";
import { cn } from "@/lib/cn";

/**
 * The founding counter. It only says what is true: until a deposit lands it
 * says how many slots there are and when the terms close (never "0 of 3");
 * once one lands it counts them; after the terms close it renders nothing.
 * The props are the shape a CMS record will fill later.
 */
export function FoundingCounter({
  slots,
  taken,
  termsClose,
  now = new Date(),
  className,
}: {
  slots: number;
  /** Deposits that have landed. Oleh tells the site when this changes. */
  taken: number;
  /** ISO date the founding terms close, e.g. "2026-12-01". */
  termsClose: string;
  /** For tests and previews; defaults to now. */
  now?: Date;
  className?: string;
}) {
  // the terms run through the whole closing day
  if (now.getTime() > new Date(`${termsClose}T23:59:59Z`).getTime()) {
    return null;
  }

  const left = Math.max(slots - taken, 0);
  const text =
    taken === 0
      ? `${slots} founding slots. Founding terms close ${formatDate(termsClose)}.`
      : left === 0
        ? "All founding slots are taken."
        : `${taken} of ${slots} taken. ${left} left.`;

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div aria-hidden className="flex gap-2">
        {Array.from({ length: slots }, (_, i) => (
          <span
            key={i}
            className={cn(
              "h-3 w-full max-w-[96px] rounded-full",
              i < taken ? "bg-lime" : "border border-paper/30",
            )}
          />
        ))}
      </div>
      <p className="text-lg font-semibold leading-snug md:text-xl">{text}</p>
    </div>
  );
}
