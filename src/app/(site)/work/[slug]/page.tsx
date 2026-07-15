import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/seo/json-ld";
import { JimmyCaseStudy } from "@/components/work/jimmy";
import { StandardCaseStudy } from "@/components/work/standard";
import { Un1tCaseStudy } from "@/components/work/un1t";
import { caseSlugs, getCaseBySlug } from "@/lib/cases";
import { breadcrumbs, caseStudyWork } from "@/lib/schema";
import { socialMetadata } from "@/lib/seo";

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
    title: data.seoTitle,
    description: data.seoDescription,
    alternates: { canonical: `/work/${data.slug}` },
    ...socialMetadata({
      title: data.seoTitle,
      description: data.seoDescription,
      path: `/work/${data.slug}`,
    }),
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

  const jsonLd = (
    <>
      <JsonLd
        data={breadcrumbs([
          ["Home", "/"],
          ["Case studies", "/work"],
          [data.name, `/work/${data.slug}`],
        ])}
      />
      <JsonLd data={caseStudyWork(data)} />
    </>
  );

  if (data.slug === "un1t")
    return (
      <>
        {jsonLd}
        <Un1tCaseStudy data={data} />
      </>
    );
  if (data.slug === "jimmy-coach")
    return (
      <>
        {jsonLd}
        <JimmyCaseStudy data={data} />
      </>
    );
  return (
    <>
      {jsonLd}
      <StandardCaseStudy data={data} />
    </>
  );
}
