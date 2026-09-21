import type { Metadata } from "next";

import { CaseGrid } from "@/components/shared/case-cards";
import { FinalCtaPanel } from "@/components/shared/final-cta-panel";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbs, caseStudyList } from "@/lib/schema";
import { socialMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/container";
import { Mark } from "@/components/ui/mark";
import { Pill } from "@/components/ui/pill";
import { Reveal } from "@/components/ui/reveal";

const WORK_TITLE = "Fitness Software Case Studies: UN1T & Jimmy Coach";
const WORK_DESCRIPTION =
  "Fitness software case studies: UN1T, a boutique franchise on its own gym app and back office, and Jimmy Coach, a coaching platform with two native apps and web.";

export const metadata: Metadata = {
  title: WORK_TITLE,
  description: WORK_DESCRIPTION,
  alternates: { canonical: "/work" },
  ...socialMetadata({
    title: WORK_TITLE,
    description: WORK_DESCRIPTION,
    path: "/work",
  }),
};

export default function WorkPage() {
  return (
    <>
      <JsonLd data={breadcrumbs([["Home", "/"], ["Case studies", "/work"]])} />
      <JsonLd data={caseStudyList()} />
      <section id="top" className="relative overflow-hidden">
        <Container className="pb-14 pt-28 sm:pt-32 md:pb-20 md:pt-36">
          <Reveal eager>
            <Pill>Case studies</Pill>
          </Reveal>

          <Reveal eager delay={60}>
            <h1 className="display mt-8 text-[2rem] leading-[1.12] sm:text-hero sm:leading-[0.98]">
              Two builds we can show you.
              <br />
              <Mark>Both shipped, both live.</Mark>
            </h1>
          </Reveal>

          <Reveal eager delay={140}>
            <p className="mt-10 max-w-[52ch] text-lg leading-relaxed text-muted md:text-xl">
              We&rsquo;d rather show you two real platforms in depth than a wall
              of logos we can&rsquo;t stand behind. Both are live, and we still
              run them in production.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="pb-20 md:pb-28">
        <Container>
          <CaseGrid priority />
          <Reveal>
            <p className="mt-10 max-w-[62ch] leading-relaxed text-muted">
              Only two public case studies, on purpose. We name real clients
              and real numbers rather than pad a portfolio.
            </p>
          </Reveal>
        </Container>
      </section>

      <FinalCtaPanel
        eyebrow="Let’s talk"
        title="Let’s look at what you are building."
        intro="Tell us what you are working on. We will tell you honestly how we would approach it, and whether we are the right team for it."
        bookings={["costCheck", "founderReview"]}
      />
    </>
  );
}
