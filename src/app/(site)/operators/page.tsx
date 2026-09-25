import type { Metadata } from "next";

import { OperatorsClose } from "@/components/operators/close";
import { OperatorsGuarantee } from "@/components/operators/guarantee";
import { OperatorsHero } from "@/components/operators/hero";
import { OperatorsMigration } from "@/components/operators/migration";
import { OperatorsNetworks } from "@/components/operators/networks";
import { OperatorsObjections } from "@/components/operators/objections";
import { OperatorsPain } from "@/components/operators/pain";
import { OperatorsUn1t } from "@/components/operators/un1t";
import { JsonLd } from "@/components/seo/json-ld";
import { operators } from "@/content/operators";
import { breadcrumbs, faqPage, serviceSchema } from "@/lib/schema";
import { socialMetadata } from "@/lib/seo";

const { title, description } = operators.meta;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/operators" },
  ...socialMetadata({ title, description, path: "/operators" }),
};

// V2 /operators (doc 09 §3.2), Nazar's voice, no prices: ① hero, ② sound
// familiar, ③ UN1T, ④ what we build for networks, ⑤ migration, ⑥ the
// guarantee, ⑦ objections, ⑧ the signed call.
export default function OperatorsPage() {
  const faqLd = faqPage([...operators.objections.items]);

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
            "For fitness brands and franchisors with 8+ locations: move off a rented booking platform onto your own member app, back office and payments, in your name from day one.",
          path: "/operators",
        })}
      />
      <OperatorsHero />
      <OperatorsPain />
      <OperatorsUn1t />
      <OperatorsNetworks />
      <OperatorsMigration />
      <OperatorsGuarantee />
      <OperatorsObjections />
      <OperatorsClose />
    </>
  );
}
