import type { Metadata } from "next";

import { JsonLd } from "@/components/seo/json-ld";
import { WorkCases } from "@/components/work/index/cases";
import { WorkHero } from "@/components/work/index/hero";
import { WorkNda } from "@/components/work/index/nda";
import { breadcrumbs, caseStudyList } from "@/lib/schema";
import { socialMetadata } from "@/lib/seo";

const WORK_TITLE = "Fitness Software Case Studies: UN1T & Jimmy Coach";
const WORK_DESCRIPTION =
  "Nine products shipped, four in fitness. Two public case studies, UN1T and Jimmy Coach, and seven more under NDA.";

export const metadata: Metadata = {
  title: WORK_TITLE,
  description: WORK_DESCRIPTION,
  alternates: { canonical: "/work" },
  ...socialMetadata({
    title: WORK_TITLE,
    description: WORK_DESCRIPTION,
    path: "/work",
  }),
};

/**
 * /work, V2 (doc 09 §3.4): the count as the headline, the two public cases
 * full-bleed, the seven under NDA as text on ink, GAMMA5 in one line. The
 * footer carries the booking doors. Schema lists the public cases only;
 * nothing on the NDA cards.
 */
export default function WorkPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbs([
          ["Home", "/"],
          ["Case studies", "/work"],
        ])}
      />
      <JsonLd data={caseStudyList()} />
      <WorkHero />
      <WorkCases />
      <WorkNda />
    </>
  );
}
