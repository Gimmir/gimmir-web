import type { Metadata } from "next";

import { FoundersSection } from "@/components/pricing/founders-section";
import { PRICING_FAQ_ITEMS, PricingFaq } from "@/components/pricing/faq";
import { Hero } from "@/components/pricing/hero";
import { Note } from "@/components/pricing/note";
import { OngoingSection } from "@/components/pricing/ongoing-section";
import { OperatorsSection } from "@/components/pricing/operators-section";
import { JsonLd } from "@/components/seo/json-ld";
import { FinalCtaPanel } from "@/components/shared/final-cta-panel";
import { OFFERS, OPERATOR_LADDER, formatPrice } from "@/lib/offers";
import { breadcrumbs, faqPage, serviceSchema } from "@/lib/schema";
import { socialMetadata } from "@/lib/seo";

const TITLE = "Fitness App Development Cost: Fixed, Public Prices";
const DESCRIPTION = `What a fitness or wellness app costs with Gimmir: free founder calls, ${formatPrice(OFFERS.teardown)} diagnostics, V1 builds at ${formatPrice(OFFERS.build)} fixed by milestone. Your code from day one.`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/pricing" },
  ...socialMetadata({
    title: TITLE,
    description: DESCRIPTION,
    path: "/pricing",
  }),
};

export default function PricingPage() {
  const faqLd = faqPage(PRICING_FAQ_ITEMS);

  return (
    <>
      <JsonLd
        data={breadcrumbs([
          ["Home", "/"],
          ["Pricing", "/pricing"],
        ])}
      />
      {faqLd && <JsonLd data={faqLd} />}
      <JsonLd
        data={serviceSchema({
          id: "pricing",
          name: "Fitness and wellness product engineering",
          description:
            "Fixed-price diagnostics, builds and ongoing care for fitness operators and for fitness or health product founders.",
          path: "/pricing",
          offers: [
            ...OPERATOR_LADDER,
            "reviewCall",
            "review",
            "fixSprint",
            "care",
          ],
        })}
      />
      <Hero />
      <OperatorsSection />
      <FoundersSection />
      <OngoingSection />
      <Note />
      <PricingFaq />
      <FinalCtaPanel
        eyebrow="Not sure where to start?"
        title="Tell us where you are. We’ll tell you the cheapest next step."
        intro="Twenty minutes with Nazar if you run fitness locations. Thirty with Nazar and Oleh if you’re building a product."
        bookings={["costCheck", "founderReview"]}
      />
    </>
  );
}
