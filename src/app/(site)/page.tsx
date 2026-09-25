import type { Metadata } from "next";

import { CaseUn1t } from "@/components/home/case-un1t";
import { Hero } from "@/components/home/hero";
import { Manifesto } from "@/components/home/manifesto";
import { home } from "@/content/home";
import { socialMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: home.meta.title },
  description: home.meta.description,
  alternates: { canonical: "/" },
  ...socialMetadata({
    title: home.meta.title,
    description: home.meta.description,
    path: "/",
    image: "/opengraph-image",
  }),
};

// V2 design slice: ① hero, ② manifesto, ③ UN1T. The remaining sections
// (Jimmy, comparison, hover list, bento, build log, founders, voices, final
// CTA) follow once the direction is signed off.
export default function HomePage() {
  return (
    <>
      <Hero />
      <Manifesto />
      <CaseUn1t />
    </>
  );
}
