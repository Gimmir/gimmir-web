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
// landing calculators, 20 Oct 2026): ① hero, ② the calculators (what the
// current system costs and the payback, then what keeping members longer
// adds), ③ what HQ gets, ④ UN1T, ⑤ what you own, ⑥ guarantees, ⑦ founding
// partners, ⑧ plans, ⑨ how it works, ⑩ questions, ⑪ the last ask.
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
      <FranchiseWhatHqGets />
      <FranchiseProof />
      <FranchiseOwn />
      <FranchiseGuarantees />
      <FranchiseFounding />
      <FranchisePlans />
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
