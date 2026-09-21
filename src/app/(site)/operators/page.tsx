import type { Metadata } from "next";

import { JsonLd } from "@/components/seo/json-ld";
import { CaseStudySection } from "@/components/operators/case-study";
import { Fit } from "@/components/operators/fit";
import { OperatorsFaq, OPERATORS_FAQ_ITEMS } from "@/components/operators/faq";
import { Hero } from "@/components/operators/hero";
import { OfferLadder } from "@/components/operators/offer-ladder";
import { RentingCost } from "@/components/operators/renting-cost";
import { RevenueLine } from "@/components/operators/revenue-line";
import { SwitchPlan } from "@/components/operators/switch-plan";
import { WhatYouGet } from "@/components/operators/what-you-get";
import { FinalCtaPanel } from "@/components/shared/final-cta-panel";
import { BOOKINGS } from "@/lib/booking";
import { OPERATOR_LADDER } from "@/lib/offers";
import { breadcrumbs, faqPage, serviceSchema } from "@/lib/schema";
import { socialMetadata } from "@/lib/seo";

// "Fitness platform" reads as vibration plates in search; the title targets
// the gym-app wording operators actually type.
const TITLE = "Own Your Gym App: for Operators with 8+ Sites";
const DESCRIPTION =
  "Operators with 8+ locations: move off a rented white-label booking platform onto your own gym app, back office and payments. Fixed prices, money-back Teardown.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/operators" },
  ...socialMetadata({
    title: TITLE,
    description: DESCRIPTION,
    path: "/operators",
  }),
};

export default function OperatorsPage() {
  const faqLd = faqPage(OPERATORS_FAQ_ITEMS);

  return (
    <>
      <JsonLd
        data={breadcrumbs([
          ["Home", "/"],
          ["For operators", "/operators"],
        ])}
      />
      {faqLd && <JsonLd data={faqLd} />}
      <JsonLd
        data={serviceSchema({
          id: "platform-ownership",
          name: "Platform ownership for fitness operators",
          description:
            "For fitness operators and franchisors with 8+ locations: move off a rented booking platform onto your own member app, back office and payments, in your name from day one.",
          path: "/operators",
          offers: OPERATOR_LADDER,
        })}
      />
      <Hero />
      <RentingCost />
      <RevenueLine />
      <WhatYouGet />
      <SwitchPlan />
      <OfferLadder />
      <CaseStudySection />
      <Fit />
      <OperatorsFaq />
      <FinalCtaPanel
        eyebrow="Platform cost check"
        title="Find your number first."
        intro={`${BOOKINGS.costCheck.minutes} minutes with Nazar. Bring your last platform invoice and processing statement, and you leave with your number.`}
        bookings={["costCheck"]}
      />
    </>
  );
}
