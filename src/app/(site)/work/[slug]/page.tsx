import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { JimmyCaseStudy } from "@/components/work/jimmy";
import { StandardCaseStudy } from "@/components/work/standard";
import { Un1tCaseStudy } from "@/components/work/un1t";
import { caseSlugs, getCaseBySlug } from "@/lib/cases";

export function generateStaticParams() {
  return caseSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = getCaseBySlug(slug);
  if (!data) return {};
  return {
    title: `${data.name} — Case study`,
    description: data.summary,
    alternates: { canonical: `/work/${data.slug}` },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = getCaseBySlug(slug);
  if (!data) notFound();

  if (data.slug === "un1t") return <Un1tCaseStudy data={data} />;
  if (data.slug === "jimmy-coach") return <JimmyCaseStudy data={data} />;
  return <StandardCaseStudy data={data} />;
}
