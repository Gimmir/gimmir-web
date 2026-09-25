"use client";

import { usePathname } from "next/navigation";

import { trackEvent } from "@/lib/analytics";
import { BOOKINGS, type BookingId } from "@/lib/booking";
import { CAL_CONFIG, CAL_NAMESPACE } from "@/lib/cal";

/**
 * Any element that opens a Cal.com booking popup. Cal wires the click up
 * through the data attributes (see <CalProvider>); this adds the funnel
 * event and lets the caller close a menu.
 */
export function BookTrigger({
  booking,
  placement,
  className,
  children,
  onClick,
}: {
  booking: BookingId;
  placement: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  const pathname = usePathname();
  const b = BOOKINGS[booking];
  return (
    <button
      type="button"
      className={className}
      data-cal-namespace={CAL_NAMESPACE}
      data-cal-link={b.calLink}
      data-booking={b.id}
      data-cal-config={CAL_CONFIG}
      onClick={() => {
        trackEvent("booking_started", { booking, placement, path: pathname });
        onClick?.();
      }}
    >
      {children}
    </button>
  );
}
