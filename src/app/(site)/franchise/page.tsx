import type { Metadata } from "next";

import { FranchisePage } from "@/components/franchise/franchise-page";
import { franchise } from "@/content/franchise";
import { socialMetadata } from "@/lib/seo";

const { title, description } = franchise.meta;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/franchise" },
  ...socialMetadata({ title, description, path: "/franchise" }),
};

// Rebuilt every hour so the founding-terms copy never outlives its date.
export const revalidate = 3600;

// The offer page every outreach link points to; the page body is shared
// with the landing version (see components/franchise/franchise-page.tsx).
export default function Page() {
  return <FranchisePage />;
}
