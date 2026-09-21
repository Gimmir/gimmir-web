import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { Pill } from "@/components/ui/pill";
import { socialMetadata } from "@/lib/seo";

const DESCRIPTION =
  "The terms for using gimmir.com: what the site is, how prices and guarantees work, booking calls, our content, and the law that applies.";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: DESCRIPTION,
  alternates: { canonical: "/terms" },
  ...socialMetadata({
    title: "Terms of Use",
    description: DESCRIPTION,
    path: "/terms",
  }),
};

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-bold tracking-tight md:text-2xl">{title}</h2>
      <div className="mt-3 space-y-3 leading-relaxed text-muted">
        {children}
      </div>
    </section>
  );
}

const link =
  "font-semibold text-ink underline underline-offset-4 hover:text-muted";

export default function TermsPage() {
  return (
    <section className="relative overflow-hidden">
      <Container className="pb-20 pt-28 sm:pt-32 md:pb-28 md:pt-36">
        <div className="max-w-3xl">
          <Pill>Legal</Pill>
          <h1 className="display mt-8 text-[2rem] leading-[1.12] sm:text-5xl">
            Terms of Use
          </h1>
          <p className="mt-4 font-mono text-sm uppercase tracking-wider text-faint">
            Last updated: September 21, 2026
          </p>

          <p className="mt-8 text-lg leading-relaxed text-muted">
            These terms cover your use of gimmir.com. The site is run by Gimmir
            LLC, a Delaware (US) company (&ldquo;Gimmir&rdquo;,
            &ldquo;we&rdquo;, &ldquo;us&rdquo;). By using the site you agree to
            them. If you don&rsquo;t, please don&rsquo;t use the site.
          </p>

          <Section title="What this site is">
            <p>
              The site describes who we are, what we build and what our standard
              offers cost. It is information, not an offer we are bound by. Any
              work we do for you starts only with a written agreement signed by
              both sides, and that agreement governs the work, its scope, its
              price and any guarantee.
            </p>
          </Section>

          <Section title="Prices and guarantees">
            <p>
              Prices on the site are our current standard prices, in euros, and
              may change. The price that applies to you is the one in your
              signed agreement. Guarantees described on the site, such as the
              Platform Fee Teardown money-back guarantee, apply as set out in
              that agreement.
            </p>
          </Section>

          <Section title="Booking a call">
            <p>
              Calls are booked through Cal.com, which has its own terms. A call
              is free and creates no obligation on either side. If you need an
              NDA before sharing details about your product or business, ask and
              we will sign one.
            </p>
          </Section>

          <Section title="Our content">
            <p>
              The text, design, graphics and code of this site belong to Gimmir
              or are used with permission. Client names and logos belong to
              their owners. You are welcome to link to the site and to quote
              short parts with attribution; please don&rsquo;t copy the site or
              its content otherwise.
            </p>
          </Section>

          <Section title="Links to other sites">
            <p>
              We link to other sites, such as Cal.com and our founders&rsquo;
              LinkedIn profiles. We are not responsible for their content or
              practices.
            </p>
          </Section>

          <Section title="No warranties">
            <p>
              We work to keep the site accurate and available, but it is
              provided &ldquo;as is&rdquo;, without warranties of any kind, to
              the extent the law allows.
            </p>
          </Section>

          <Section title="Limitation of liability">
            <p>
              To the extent the law allows, Gimmir is not liable for any
              indirect or consequential loss arising from your use of the site.
              Nothing in these terms limits liability that the law does not
              allow us to limit.
            </p>
          </Section>

          <Section title="Privacy">
            <p>
              How we handle data from the site is described in our{" "}
              <Link href="/privacy" className={link}>
                Privacy Policy
              </Link>
              .
            </p>
          </Section>

          <Section title="Changes">
            <p>
              We may update these terms. The date at the top shows the latest
              version, and using the site after a change means you accept it.
            </p>
          </Section>

          <Section title="Governing law">
            <p>
              These terms are governed by the laws of the State of Delaware,
              USA, without taking away any protection that the law of your
              country gives you and that cannot be excluded by agreement.
            </p>
          </Section>

          <Section title="Contact">
            <p>
              Questions about these terms:{" "}
              <a href="mailto:hello@gimmir.com" className={link}>
                hello@gimmir.com
              </a>
              .
            </p>
          </Section>
        </div>
      </Container>
    </section>
  );
}
