import type { Metadata } from "next";

import { HowHero } from "@/components/how/hero";
import {
  HOW_ANSWERS,
  HowPricing,
  HowRisk,
  HowStandards,
} from "@/components/how/sections";
import { SaasOwn } from "@/components/saas/sections";
import { JsonLd } from "@/components/seo/json-ld";
import { how } from "@/content/how";
import { breadcrumbs, faqPage } from "@/lib/schema";
import { socialMetadata } from "@/lib/seo";
import { TWO_FOUNDERS_ANSWER } from "@/lib/trust-answers";

export const metadata: Metadata = {
  title: how.meta.title,
  description: how.meta.description,
  alternates: { canonical: "/how-we-work" },
  ...socialMetadata({
    title: how.meta.title,
    description: how.meta.description,
    path: "/how-we-work",
  }),
};

/**
 * /how-we-work, V2 (doc 09 §3.8), built in code: no black box (the open
 * box and how a build runs), how we price (#pricing, no numbers), what's
 * yours, the standards and the stack, and the two-person risk answered
 * straight. The footer's two doors are the call to action.
 */
export default function HowWeWorkPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbs([
          ["Home", "/"],
          ["How we work", "/how-we-work"],
        ])}
      />
      <JsonLd data={faqPage([TWO_FOUNDERS_ANSWER, ...HOW_ANSWERS])!} />
      <HowHero />
      <HowPricing />
      <SaasOwn title={how.own.title} />
      <HowStandards />
      <HowRisk />
    </>
  );
}
