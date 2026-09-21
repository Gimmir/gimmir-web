import type { Metadata } from "next";

import { NotFoundContent } from "@/components/site/not-found-content";
import { SiteShell } from "@/components/site/site-shell";

export const metadata: Metadata = { title: "Page not found" };

/** Unmatched URLs land here, outside the (site) layout, so bring the chrome. */
export default function NotFound() {
  return (
    <SiteShell>
      <NotFoundContent />
    </SiteShell>
  );
}
