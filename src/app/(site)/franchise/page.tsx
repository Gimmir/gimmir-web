import type { Metadata } from "next";

import { FaqSection } from "@/components/blocks/faq-section";
import { FranchiseCalculators } from "@/components/franchise/calculators";
import { FranchiseClose } from "@/components/franchise/close";
import { FranchiseFounding } from "@/components/franchise/founding";
import { FranchiseGuarantees } from "@/components/franchise/guarantees";
import { FranchiseHero } from "@/components/franchise/hero";
import { FranchiseHowItWorks } from "@/components/franchise/how-it-works";
import { FranchiseOwn } from "@/components/franchise/own";
import { FranchisePlans } from "@/components/franchise/plans";
import { FranchiseProof } from "@/components/franchise/proof";
import { FranchiseWhatHqGets } from "@/components/franchise/what-hq-gets";
import { JsonLd } from "@/components/seo/json-ld";
import { franchise } from "@/content/franchise";
import { FOUNDING, OFFER } from "@/content/offer";
import { breadcrumbs, faqPage, offerSchema } from "@/lib/schema";
import { socialMetadata } from "@/lib/seo";

const { title, description } = franchise.meta;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/franchise" },
  ...socialMetadata({ title, description, path: "/franchise" }),
};

// The founding counter hides itself once the terms close, so the page is
// rebuilt every hour instead of frozen at the last deploy.
export const revalidate = 3600;

// The offer page every outreach link points to (Oleh's website plan and
// landing calculators, 20 Oct 2026; order from Nazar's review): ① hero,
// ② the calculators (the number first), ③ UN1T (why believe it), ④ what
// HQ gets, ⑤ what you own, ⑥ the offer: founding terms, plans and, beside
// the price, the guarantees, ⑦ how it works, ⑧ questions, ⑨ the last ask.
export default function FranchisePage() {
  const faqLd = faqPage([...franchise.faq.items]);

  return (
    <>
      <JsonLd
        data={breadcrumbs([
          ["Home", "/"],
          ["For franchises", "/franchise"],
        ])}
      />
      {faqLd && <JsonLd data={faqLd} />}
      <JsonLd
        data={offerSchema({
          name: "Founding partner set-up",
          price: OFFER.setupFee,
          currency: OFFER.currency,
          path: "/franchise",
          availabilityEnds: FOUNDING.termsClose,
        })}
      />
      <FranchiseHero />
      <FranchiseCalculators />
      <FranchiseProof />
      <FranchiseWhatHqGets />
      <FranchiseOwn />
      <FranchiseFounding />
      <FranchisePlans />
      <FranchiseGuarantees />
      <FranchiseHowItWorks />
      <FaqSection
        title={franchise.faq.title}
        items={franchise.faq.items}
        divided
      />
      <FranchiseClose />
    </>
  );
}
