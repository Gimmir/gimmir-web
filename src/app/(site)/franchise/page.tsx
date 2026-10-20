import type { Metadata } from "next";

import { FaqSection } from "@/components/blocks/faq-section";
import { FranchiseClose } from "@/components/franchise/close";
import { FranchiseFounding } from "@/components/franchise/founding";
import { FranchiseGuarantees } from "@/components/franchise/guarantees";
import { FranchiseHero } from "@/components/franchise/hero";
import { FranchiseHowItWorks } from "@/components/franchise/how-it-works";
import { FranchiseMoneyFlow } from "@/components/franchise/money-flow";
import { FranchiseOwn } from "@/components/franchise/own";
import { FranchisePlans } from "@/components/franchise/plans";
import { FranchiseProof } from "@/components/franchise/proof";
import { FranchiseWhatYouGet } from "@/components/franchise/what-you-get";
import { FranchiseWorkedExample } from "@/components/franchise/worked-example";
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

// The offer page every outreach link points to (Oleh's website plan, 20 Oct
// 2026): a money argument top to bottom. ① hero, ② where the money goes,
// ③ a worked example, ④ what you get, ⑤ UN1T, ⑥ what you own, ⑦
// guarantees, ⑧ founding partners, ⑨ plans, ⑩ how it works, ⑪ questions,
// ⑫ the last ask.
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
      <FranchiseMoneyFlow />
      <FranchiseWorkedExample />
      <FranchiseWhatYouGet />
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
