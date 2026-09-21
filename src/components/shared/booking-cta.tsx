import { TrackedCta } from "@/components/analytics/tracked-cta";
import type { Button } from "@/components/ui/button";
import { BOOKINGS, type BookingId } from "@/lib/booking";

type ButtonProps = React.ComponentProps<typeof Button>;

/**
 * A signed booking button: opens the call's Cal.com popup and records a
 * `book_cta_click` with which call and where on the page. Shows the full
 * label from `sm` up and the short one on phones, unless `label` is given.
 */
export function BookingCta({
  booking,
  placement,
  label,
  variant,
  size,
  arrow = true,
  className,
}: {
  booking: BookingId;
  /** Where the button sits, e.g. "hero", "ladder", "final". */
  placement: string;
  label?: string;
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  arrow?: boolean;
  className?: string;
}) {
  const b = BOOKINGS[booking];
  return (
    <TrackedCta
      cal={booking}
      event="book_cta_click"
      eventProps={{ booking, placement }}
      variant={variant}
      size={size}
      arrow={arrow}
      className={className}
    >
      {label ?? (
        <>
          <span className="hidden sm:inline">{b.label}</span>
          <span className="sm:hidden">{b.short}</span>
        </>
      )}
    </TrackedCta>
  );
}
