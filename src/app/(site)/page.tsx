import type { Metadata } from "next";

import { CaseJimmy } from "@/components/home/case-jimmy";
import { CaseUn1t } from "@/components/home/case-un1t";
import { Compare } from "@/components/home/compare";
import { Hero } from "@/components/home/hero";
import { Manifesto } from "@/components/home/manifesto";
import { WhatWeBuild } from "@/components/home/what-we-build";
import { WhatYouGet } from "@/components/home/what-you-get";
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

// V2 home, built section by section: ① hero, ② manifesto, ③ UN1T,
// ④ Jimmy Coach, ⑤ comparison, ⑥ what we build, ⑦ what you get. Next:
// build log, founders, voices, final CTA.
export default function HomePage() {
  return (
    <>
      <Hero />
      <Manifesto />
      <CaseUn1t />
      <CaseJimmy />
      <Compare />
      <WhatWeBuild />
      <WhatYouGet />
    </>
  );
}
