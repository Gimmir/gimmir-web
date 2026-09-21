import { CaseCard } from "@/components/shared/case-cards";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { getCaseBySlug } from "@/lib/cases";

export function CaseStudySection() {
  const data = getCaseBySlug("jimmy-coach");
  if (!data) return null;

  return (
    <section className="border-t border-line py-20 md:py-28">
      <Container>
        <Reveal>
          <SectionHeader
            index="04"
            titleMax="max-w-[30ch]"
            title="We haven't published a wellness case study yet. Here's the nearest proof."
            intro="Jimmy Coach is a coaching platform with the same engineering a wellness app needs: two native apps and web, subscriptions, community, messaging, progress tracking and branded apps. 100+ coaches and 300+ users in the first month. If you're building in wellness, this is the closest look at how we build."
          />
        </Reveal>

        <div className="mt-12">
          <CaseCard data={data} />
        </div>
      </Container>
    </section>
  );
}
