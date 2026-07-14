"use client";

import { track } from "@vercel/analytics";

import { Button } from "@/components/ui/button";

/**
 * A Button that fires a Vercel Analytics custom event on click. Used on the
 * primary "book a review call" CTAs — the closest conversion signal we have
 * until a real booking form / submission exists.
 */
export function TrackedCta({
  event,
  ...props
}: React.ComponentProps<typeof Button> & { event: string }) {
  return <Button {...props} onClick={() => track(event)} />;
}
