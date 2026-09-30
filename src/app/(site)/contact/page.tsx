import type { Metadata } from "next";

import { JsonLd } from "@/components/seo/json-ld";
import { CONTACT_FAQ_ITEMS, ContactFaq } from "@/components/contact/faq";
import { Doors } from "@/components/contact/doors";
import { EmailLine } from "@/components/contact/email-line";
import { Hero } from "@/components/contact/hero";
import { HeroBackdrop } from "@/components/home/hero-backdrop";
import { Container } from "@/components/ui/container";
import { BOOKINGS } from "@/lib/booking";
import { hostNames } from "@/lib/founders";
import { breadcrumbs, contactPage, faqPage } from "@/lib/schema";
import { socialMetadata } from "@/lib/seo";
import { sanityFetch } from "@/sanity/lib/live";
import { SETTINGS_QUERY } from "@/sanity/lib/queries";

const TITLE = "Book a Call with Nazar & Oleh";
// Minutes and names are pulled from `BOOKINGS` so this can't drift from the
// calls actually on offer.
const DESCRIPTION = `Book a free call with the founders. Brands with 8+ locations: a ${BOOKINGS.costCheck.minutes}-minute platform check with ${hostNames(BOOKINGS.costCheck.hosts)}. Founders building a SaaS: ${BOOKINGS.founderReview.minutes} minutes with ${hostNames(BOOKINGS.founderReview.hosts)}.`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/contact" },
  ...socialMetadata({
    title: TITLE,
    description: DESCRIPTION,
    path: "/contact",
  }),
};

export default async function ContactPage() {
  const { data: settings } = await sanityFetch({ query: SETTINGS_QUERY });
  const email = settings?.contactEmail ?? "hello@gimmir.com";
  const faqLd = faqPage(CONTACT_FAQ_ITEMS);

  return (
    <>
      <JsonLd
        data={breadcrumbs([
          ["Home", "/"],
          ["Book a call", "/contact"],
        ])}
      />
      <JsonLd data={contactPage()} />
      {faqLd && <JsonLd data={faqLd} />}

      {/* one backdrop behind the hero and the doors, so no seam between them */}
      <div className="relative">
        <HeroBackdrop />
        <Hero />
        <Doors />
      </div>
      <Container className="pb-20 md:pb-24">
        <EmailLine email={email} />
      </Container>
      <ContactFaq />
    </>
  );
}
