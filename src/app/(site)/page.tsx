import type { Metadata } from "next";

import { CaseJimmy } from "@/components/home/case-jimmy";
import { CaseUn1t } from "@/components/home/case-un1t";
import { Compare } from "@/components/home/compare";
import { Founders } from "@/components/home/founders";
import { Hero } from "@/components/home/hero";
import { Manifesto } from "@/components/home/manifesto";
import { WhatWeBuild } from "@/components/home/what-we-build";
import { WhatYouGet } from "@/components/home/what-you-get";
import { JsonLd } from "@/components/seo/json-ld";
import { home } from "@/content/home";
import { CONTACT_EMAIL } from "@/content/site";
import { organizationGraph } from "@/lib/schema";
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

// V2 home: ① hero, ② manifesto, ③ UN1T, ④ Jimmy Coach, ⑤ comparison,
// ⑥ what we build, ⑦ what you get, ⑨ founders; the footer closes it (no
// separate final CTA, Nazar 2026-09-25). ⑧ build log waits for P2, ⑩
// voices for three real, approved quotes.
export default function HomePage() {
  return (
    <>
      <JsonLd
        data={organizationGraph({
          email: CONTACT_EMAIL,
          description: home.meta.description,
        })}
      />
      <Hero />
      <Manifesto />
      <CaseUn1t />
      <CaseJimmy />
      <Compare />
      <WhatWeBuild />
      <WhatYouGet />
      <Founders />
    </>
  );
}
