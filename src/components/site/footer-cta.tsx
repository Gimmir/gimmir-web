"use client";

import { usePathname } from "next/navigation";

import { BookingCta } from "@/components/shared/booking-cta";
import { Button } from "@/components/ui/button";
import { bookingForPath } from "@/lib/booking";

/**
 * The footer's booking button. Client-side only so it can follow the page:
 * operator and founder pages book their own call, pages that serve both
 * audiences send visitors to /contact to choose.
 */
export function FooterCta({ label }: { label: string }) {
  const booking = bookingForPath(usePathname());

  return booking ? (
    <BookingCta booking={booking} placement="footer" className="mt-8" />
  ) : (
    <Button href="/contact" arrow className="mt-8">
      {label}
    </Button>
  );
}
