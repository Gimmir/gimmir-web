import type { Metadata } from "next";

import { FaqSection } from "@/components/blocks/faq-section";
import { SaasClose } from "@/components/saas/close";
import { SaasHero } from "@/components/saas/hero";
import { SaasNotFor } from "@/components/saas/not-for";
import { SaasFit, SaasOwn, SaasStart } from "@/components/saas/sections";
import { SaasStory } from "@/components/saas/story";
import { JsonLd } from "@/components/seo/json-ld";
import { saas } from "@/content/saas";
import { breadcrumbs, faqPage, serviceSchema } from "@/lib/schema";
import { socialMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  title: saas.meta.title,
  description: saas.meta.description,
  alternates: { canonical: "/build-your-saas" },
  ...socialMetadata({
    title: saas.meta.title,
    description: saas.meta.description,
    path: "/build-your-saas",
  }),
};

/**
 * /build-your-saas, V2 (doc 09 §3.3): buyer B. Hero, how Jimmy started,
 * is this you, how we start (#diagnostic), what you own, who it's not for,
 * the call signed by Oleh and Nazar. The build-log preview (⑥) joins once
 * there are posts (P2).
 */
export default function BuildYourSaasPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbs([
          ["Home", "/"],
          ["Build your SaaS", "/build-your-saas"],
        ])}
      />
      <JsonLd
        data={serviceSchema({
          id: "saas-build",
          name: saas.meta.title,
          description: saas.meta.description,
          path: "/build-your-saas",
        })}
      />
      <JsonLd data={faqPage([...saas.faq.items])!} />
      <SaasHero />
      <SaasStory />
      <SaasFit />
      <SaasStart />
      <SaasOwn />
      <FaqSection title={saas.faq.title} items={saas.faq.items} divided />
      <SaasNotFor />
      <SaasClose />
    </>
  );
}
