"use client";

import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { CAL_LINK_OPERATORS } from "@/lib/cal";

/**
 * The footer's booking button. Client-side only so it can follow the page:
 * operators get the platform cost check, everyone else the founder review.
 */
export function FooterCta({ label }: { label: string }) {
  const onOperators = usePathname().startsWith("/operators");

  return (
    <Button cal={onOperators ? CAL_LINK_OPERATORS : true} arrow className="mt-8">
      {onOperators ? "Get your platform cost check" : label}
    </Button>
  );
}
