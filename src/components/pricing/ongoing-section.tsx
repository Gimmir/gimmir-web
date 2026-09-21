import { PriceTable, buildRows } from "@/components/pricing/price-table";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { ONGOING } from "@/lib/offers";

export function OngoingSection() {
  const rows = buildRows(ONGOING, {
    care: { kind: "link", href: "/how-we-work", label: "How we work" },
  });

  return (
    <section className="border-t border-line py-20 md:py-28">
      <Container>
        <Reveal>
          <SectionHeader index="03" title="Once you’re live." />
        </Reveal>
        <PriceTable caption="Pricing once you’re live" rows={rows} />
      </Container>
    </section>
  );
}
