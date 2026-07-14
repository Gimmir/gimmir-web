import type { Metadata } from "next";

import { Hero } from "@/components/home/hero";
import { ProofSection } from "@/components/home/proof";
import { WhoSection } from "@/components/home/who";
import { ServicesSection } from "@/components/home/services";
import { FoundersSection } from "@/components/home/founders";
import { TrustSection } from "@/components/home/trust";
import { ReviewCtaSection } from "@/components/home/review-cta";
import { FinalCta } from "@/components/home/final-cta";
import { Marquee } from "@/components/ui/marquee";

export const metadata: Metadata = {
  title: { absolute: "Gimmir — Product engineering for sport & fitness" },
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee
        items={[
          "franchise platform",
          "Jimmy Coach",
          "Member & booking systems",
          "iOS & Android apps",
          "AI in product",
        ]}
      />
      <ProofSection />
      <WhoSection />
      <ServicesSection />
      <FoundersSection />
      <TrustSection />
      <ReviewCtaSection />
      <FinalCta />
    </>
  );
}
