import type { Metadata } from "next";

import { Container } from "@/components/ui/container";
import { Pill } from "@/components/ui/pill";
import { socialMetadata } from "@/lib/seo";

const DESCRIPTION =
  "How Gimmir collects, uses and protects your data — analytics, booking, and contact information.";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: DESCRIPTION,
  alternates: { canonical: "/privacy" },
  ...socialMetadata({
    title: "Privacy Policy",
    description: DESCRIPTION,
    path: "/privacy",
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
      <div className="mt-3 space-y-3 leading-relaxed text-muted">{children}</div>
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <section className="relative overflow-hidden">
      <Container className="max-w-3xl pb-20 pt-28 sm:pt-32 md:pb-28 md:pt-36">
        <Pill>Legal</Pill>
        <h1 className="display mt-8 text-[2rem] leading-[1.12] sm:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-4 font-mono text-sm uppercase tracking-wider text-faint">
          Last updated: July 15, 2026
        </p>

        <p className="mt-8 text-lg leading-relaxed text-muted">
          Gimmir (&ldquo;we&rdquo;, &ldquo;us&rdquo;) is a product engineering
          studio. This policy explains what data we collect on gimmir.com, why
          we collect it, and the choices you have. The short version: we
          collect the minimum we need to understand how the site is used and to
          respond when you contact us. We do not sell your data.
        </p>

        <Section title="What we collect">
          <p>
            <strong className="font-semibold text-ink">
              Usage analytics.
            </strong>{" "}
            We use Vercel Analytics and Vercel Speed Insights (aggregated,
            privacy-friendly page metrics), Google Analytics (visit and
            traffic-source statistics), and Microsoft Clarity (heatmaps and
            session replays that show how visitors interact with pages).
            Google Analytics and Clarity may use cookies and collect
            interaction data such as pages visited, clicks, scrolls, and
            device information.
          </p>
          <p>
            <strong className="font-semibold text-ink">
              Booking details.
            </strong>{" "}
            When you book a review call, the booking runs on Cal.com. We
            receive the details you submit there — typically your name, email,
            and anything you add to the booking notes.
          </p>
          <p>
            <strong className="font-semibold text-ink">
              Contact details.
            </strong>{" "}
            If you email us or submit your details, we store your name, email,
            company, and message in our CRM so we can reply and keep track of
            the conversation.
          </p>
        </Section>

        <Section title="Why we collect it">
          <p>
            To operate and improve the website, to respond to enquiries, to
            schedule and prepare for calls you book, and to keep a record of
            our business conversations. We process this data on the basis of
            our legitimate interest in running the studio and, where you book a
            call or contact us, in order to take steps you have requested.
          </p>
        </Section>

        <Section title="Who processes it">
          <p>
            Our service providers process data on our behalf: Vercel (hosting
            and analytics), Google (Analytics), Microsoft (Clarity), Cal.com
            (booking), Sanity (content management), and Attio (CRM). Each
            processes data under its own security and privacy commitments. We
            do not sell or rent personal data to anyone.
          </p>
        </Section>

        <Section title="How long we keep it">
          <p>
            Analytics data is retained per the retention windows of the tools
            above. Contact and booking records are kept for as long as we have
            an active conversation or business relationship, after which we
            periodically remove records we no longer need.
          </p>
        </Section>

        <Section title="Your rights">
          <p>
            Depending on where you live (including under the GDPR and UK
            GDPR), you may have the right to access, correct, delete, or
            receive a copy of your personal data, and to object to or restrict
            its processing. To exercise any of these rights, email us — we will
            respond promptly.
          </p>
        </Section>

        <Section title="Cookies">
          <p>
            The site itself does not set marketing cookies. Google Analytics
            and Microsoft Clarity may set cookies to distinguish visitors and
            sessions — they load only after you accept them in the cookie
            banner. You can change your choice at any time via the
            &ldquo;Cookie settings&rdquo; link in the footer, or block cookies
            in your browser without losing access to any part of the site.
          </p>
        </Section>

        <Section title="Contact">
          <p>
            Questions about this policy or your data:{" "}
            <a
              href="mailto:hello@gimmir.com"
              className="font-semibold text-ink underline underline-offset-4 hover:text-muted"
            >
              hello@gimmir.com
            </a>
            .
          </p>
        </Section>
      </Container>
    </section>
  );
}
