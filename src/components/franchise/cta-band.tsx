import { BookTrigger } from "@/components/blocks/book-trigger";
import { Container } from "@/components/ui/container";
import { ArrowRight } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

/**
 * The ink band between chapters (Oleh's artboard, 2 Nov): one line, one
 * small line under it, and the 30-minute call. `placement` names the band
 * in the booking event.
 */
export function CtaBand({
  title,
  note,
  placement,
  className,
}: {
  title: string;
  note: string;
  placement: string;
  className?: string;
}) {
  return (
    <Container className={cn("fade", className)}>
      <div className="flex flex-col gap-5 rounded-3xl bg-ink px-6 py-6 text-paper sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div className="flex flex-col gap-1">
          <p className="m-0 text-[clamp(19px,1.8vw,23px)] leading-[1.2] font-bold tracking-[-0.01em]">
            {title}
          </p>
          <p className="m-0 text-sm leading-[1.45] text-paper/65">{note}</p>
        </div>
        <BookTrigger
          booking="franchiseCall"
          placement={placement}
          className="group inline-flex min-h-12 shrink-0 items-center justify-center gap-3 self-start rounded-full bg-paper py-1.5 pr-1.5 pl-5 text-[15px] font-semibold text-ink transition-transform duration-150 ease-[var(--ease-out)] active:scale-[0.97] sm:self-auto"
        >
          Book 30 minutes
          <span
            aria-hidden
            className="inline-flex size-9 items-center justify-center rounded-full bg-lime transition-transform duration-200 ease-[var(--ease-out)] [@media(hover:hover)]:group-hover:translate-x-0.5"
          >
            <ArrowRight className="size-4" />
          </span>
        </BookTrigger>
      </div>
    </Container>
  );
}
