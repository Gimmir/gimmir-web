import { PriceTable, buildRows } from "@/components/pricing/price-table";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { BOOKINGS } from "@/lib/booking";
import { OPERATOR_LADDER } from "@/lib/offers";

export function OperatorsSection() {
  const rows = buildRows(OPERATOR_LADDER, {
    costCheck: {
      kind: "booking",
      booking: "costCheck",
      label: BOOKINGS.costCheck.short,
    },
    teardown: {
      kind: "link",
      href: "/operators#ladder",
      label: "How it works",
    },
    blueprint: {
      kind: "link",
      href: "/operators#switch",
      label: "How it works",
    },
    build: { kind: "link", href: "/work/un1t", label: "See UN1T" },
  });

  return (
    <section id="operators" className="border-t border-line py-20 md:py-28">
      <Container>
        <Reveal>
          <SectionHeader
            index="01"
            title="For fitness operators."
            intro="Own your platform instead of renting it. Nazar runs this path."
          />
        </Reveal>
        <PriceTable caption="Pricing for fitness operators" rows={rows} />
      </Container>
    </section>
  );
}
