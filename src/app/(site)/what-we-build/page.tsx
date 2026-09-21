import type { Metadata } from "next";

import { JsonLd } from "@/components/seo/json-ld";
import { FinalCtaPanel } from "@/components/shared/final-cta-panel";
import { AdjacentSection } from "@/components/what-we-build/adjacent";
import { BeyondSection } from "@/components/what-we-build/beyond";
import { CoreSection } from "@/components/what-we-build/core";
import {
  WHAT_WE_BUILD_FAQ_ITEMS,
  WhatWeBuildFaq,
} from "@/components/what-we-build/faq";
import { Hero } from "@/components/what-we-build/hero";
import { StackSection } from "@/components/what-we-build/stack";
import { breadcrumbs, faqPage, serviceSchema } from "@/lib/schema";
import { socialMetadata } from "@/lib/seo";

const TITLE = "Fitness App Development Services: What We Build";
const DESCRIPTION =
  "Member apps, coaching platforms, back offices and payments on iOS, Android and web. Core: fitness and wellness, with select adjacent work in SaaS, sports and devices.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/what-we-build" },
  ...socialMetadata({
    title: TITLE,
    description: DESCRIPTION,
    path: "/what-we-build",
  }),
};

export default function WhatWeBuildPage() {
  const faqLd = faqPage(WHAT_WE_BUILD_FAQ_ITEMS);

  return (
    <>
      <JsonLd
        data={breadcrumbs([
          ["Home", "/"],
          ["What we build", "/what-we-build"],
        ])}
      />
      {faqLd && <JsonLd data={faqLd} />}
      <JsonLd
        data={serviceSchema({
          id: "what-we-build",
          name: "Fitness and wellness app development",
          description:
            "Member apps, coaching platforms, back offices and payments on iOS, Android and web, owned by the client from day one.",
          path: "/what-we-build",
          offers: ["costCheck", "reviewCall", "build", "care"],
        })}
      />
      <Hero />
      <CoreSection />
      <AdjacentSection />
      <BeyondSection />
      <StackSection />
      <WhatWeBuildFaq />
      <FinalCtaPanel
        eyebrow="Let’s talk"
        title="Tell us what you’re building."
        intro="Fitness, wellness or something adjacent: we’ll tell you honestly whether we’re the right team."
        bookings={["costCheck", "founderReview"]}
      />
    </>
  );
}
