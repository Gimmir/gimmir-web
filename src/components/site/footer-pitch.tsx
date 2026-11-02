"use client";

import { usePathname } from "next/navigation";

/** Pages that close on their own booking section, so the footer skips its pitch. */
const NO_PITCH = ["/franchise"];

/** The footer's headline and the two calls, except on pages that already end with a booking. */
export function FooterPitch({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return NO_PITCH.includes(pathname) ? null : <>{children}</>;
}
