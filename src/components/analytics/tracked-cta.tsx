"use client";

import { track } from "@vercel/analytics";

import { Button } from "@/components/ui/button";

type EventProps = Record<string, string | number | boolean | null>;

/**
 * A Button that fires a Vercel Analytics custom event on click. Used on the
 * booking CTAs, the closest conversion signal we have in the browser.
 */
export function TrackedCta({
  event,
  eventProps,
  ...props
}: React.ComponentProps<typeof Button> & {
  event: string;
  eventProps?: EventProps;
}) {
  return (
    <Button
      {...props}
      onClick={() => {
        track(event, eventProps);
        props.onClick?.();
      }}
    />
  );
}
