import type { Metadata } from "next";

import { FranchisePage } from "@/components/franchise/franchise-page";
import { franchise } from "@/content/franchise";

const { title, description } = franchise.meta;

// The landing version of /franchise (reached as /franchise?landing=true).
// Search engines get the one page at /franchise.
export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/franchise" },
  robots: { index: false, follow: false },
};

// Rebuilt every hour so the founding-terms copy never outlives its date.
export const revalidate = 3600;

export default function Page() {
  return <FranchisePage landing />;
}
