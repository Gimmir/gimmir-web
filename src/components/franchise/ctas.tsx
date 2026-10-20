import { BookTrigger } from "@/components/blocks/book-trigger";
import { Button } from "@/components/ui/button";
import { franchise } from "@/content/franchise";
import { cn } from "@/lib/cn";

/**
 * The page's two asks, in the same order everywhere: the numbers (the only
 * lime button on the page) and the 30-minute call with Oleh. `placement`
 * names where the call was started, for the funnel event.
 */
export function Ctas({
  placement,
  onDark = false,
  className,
}: {
  placement: string;
  /** On an ink section the call button is drawn in paper. */
  onDark?: boolean;
  className?: string;
}) {
  const { numbers, call } = franchise.cta;

  return (
    <div
      className={cn(
        "flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center",
        className,
      )}
    >
      <Button href={numbers.href} variant="lime" arrow>
        {numbers.label}
      </Button>
      <BookTrigger
        booking="franchiseCall"
        placement={placement}
        className={cn(
          "inline-flex h-[52px] items-center justify-center rounded-full border px-7 text-base font-semibold transition-[background-color,border-color,color,transform] duration-200 ease-[cubic-bezier(.23,1,.32,1)] active:scale-[.97]",
          onDark
            ? "border-paper/30 text-paper hover:bg-paper hover:text-ink"
            : "border-ink text-ink hover:bg-ink hover:text-paper",
        )}
      >
        {call.label}
      </BookTrigger>
    </div>
  );
}
