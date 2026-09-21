import type { Metadata } from "next";

import { JsonLd } from "@/components/seo/json-ld";
import { CONTACT_FAQ_ITEMS, ContactFaq } from "@/components/contact/faq";
import { ContactTabs } from "@/components/contact/contact-tabs";
import { EmailLine } from "@/components/contact/email-line";
import { Hero } from "@/components/contact/hero";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { BOOKINGS } from "@/lib/booking";
import { hostNames } from "@/lib/founders";
import { breadcrumbs, contactPage, faqPage } from "@/lib/schema";
import { socialMetadata } from "@/lib/seo";
import { sanityFetch } from "@/sanity/lib/live";
import { SETTINGS_QUERY } from "@/sanity/lib/queries";

const TITLE = "Book a Call with Nazar & Oleh";
// Minutes and names are pulled from `BOOKINGS` so this can't drift from the
// calls actually on offer.
const DESCRIPTION = `Book a free call with Gimmir’s founders. Operators: a ${BOOKINGS.costCheck.minutes}-minute platform cost check with ${hostNames(BOOKINGS.costCheck.hosts)}. Product and health founders: ${BOOKINGS.founderReview.minutes} minutes with ${hostNames(BOOKINGS.founderReview.hosts)}.`;

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

      <Hero />

      <section className="pb-20 md:pb-28">
        <Container>
          <Reveal delay={80}>
            <ContactTabs />
          </Reveal>
          <EmailLine email={email} />
        </Container>
      </section>

      <ContactFaq />
    </>
  );
}
