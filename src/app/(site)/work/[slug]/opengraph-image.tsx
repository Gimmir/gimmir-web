import { notFound } from "next/navigation";

import { getCaseBySlug } from "@/lib/cases";
import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og-card";

export const alt = "Gimmir case study";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = getCaseBySlug(slug);
  if (!data) notFound();

  // "UN1T Case Study — Own Gym App Instead of White-Label" → the part after
  // the dash becomes the lime line.
  const angle = data.seoTitle.split("—")[1]?.trim().toLowerCase() ?? data.tag;

  return ogCard({
    line1: data.name,
    line2: angle,
    footer: `${data.industry} · built and shipped as owners`,
  });
}
