"use client";

import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { bookingForPath } from "@/lib/booking";

/**
 * The footer's booking button. Client-side only so it can follow the page:
 * operator pages get the platform cost check, everyone else the founder review.
 */
export function FooterCta({ label }: { label: string }) {
  const costCheck = bookingForPath(usePathname()) === "costCheck";

  return (
    <Button cal={costCheck ? "costCheck" : "founderReview"} arrow className="mt-8">
      {costCheck ? "Get your platform cost check" : label}
    </Button>
  );
}
