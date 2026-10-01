import { notFound } from "next/navigation";

import { jimmy } from "@/content/jimmy";
import { un1t } from "@/content/un1t";
import { caseSlugs, getCaseBySlug } from "@/lib/cases";
import { OG_CONTENT_TYPE, OG_SIZE, ogCard, type OgPicture } from "@/lib/og-card";

export const alt = "Gimmir case study";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

// rendered at build time, like the case pages: the card reads its fonts
// and pictures from disk
export function generateStaticParams() {
  return caseSlugs.map((slug) => ({ slug }));
}

/** Each case's card: its own H1, one line and its own picture. */
const CARDS: Record<string, Parameters<typeof ogCard>[0]> = {
  un1t: {
    label: "Case study · UN1T",
    headline: [un1t.hero.title],
    voice: "Off a white-label platform, onto its own app and back office.",
    picture: { app: "un1t", stat: un1t.hero.stat.value } satisfies OgPicture,
  },
  "jimmy-coach": {
    label: "Case study · Jimmy Coach",
    headline: jimmy.hero.headline,
    voice: "200+ coaches two months after launch.",
    picture: {
      phones: jimmy.hero.screens.map((s) => s.src) as [string, string, string],
    },
  },
};

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = getCaseBySlug(slug);
  if (!data) notFound();

  return ogCard(
    CARDS[slug] ?? {
      label: "Case study",
      headline: [data.name],
      voice: data.tag,
    },
  );
}
