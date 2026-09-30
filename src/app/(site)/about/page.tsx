import type { Metadata } from "next";

import { AboutBelieve } from "@/components/about/believe";
import { AboutHero } from "@/components/about/hero";
import { AboutNumbers } from "@/components/about/numbers";
import { AboutOrigin } from "@/components/about/origin";
import { AboutTeam } from "@/components/about/team";
import { AboutWho } from "@/components/about/who";
import { JsonLd } from "@/components/seo/json-ld";
import { about } from "@/content/about";
import { aboutGraph, aboutPage, breadcrumbs } from "@/lib/schema";
import { socialMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  title: about.meta.title,
  description: about.meta.description,
  alternates: { canonical: "/about" },
  ...socialMetadata({
    title: about.meta.title,
    description: about.meta.description,
    path: "/about",
  }),
};

/**
 * /about, "About us" (doc 09 §3.10, the founders page renamed): the two of
 * them, the numbers, who does what, how they got here, what they believe
 * and the team behind them. The footer's two doors are the call to action.
 * The 60–90s video joins once it's shot.
 */
export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbs([
          ["Home", "/"],
          ["About us", "/about"],
        ])}
      />
      <JsonLd data={aboutPage()} />
      <JsonLd data={aboutGraph()} />
      <AboutHero />
      <AboutNumbers />
      <AboutWho />
      <AboutOrigin />
      <AboutBelieve />
      <AboutTeam />
    </>
  );
}
