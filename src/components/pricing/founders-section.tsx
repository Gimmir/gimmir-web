import { PriceTable, buildRows } from "@/components/pricing/price-table";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { BOOKINGS } from "@/lib/booking";
import { FOUNDER_LADDER } from "@/lib/offers";

export function FoundersSection() {
  const rows = buildRows(
    FOUNDER_LADDER,
    {
      reviewCall: {
        kind: "booking",
        booking: "founderReview",
        label: BOOKINGS.founderReview.short,
      },
      review: {
        kind: "link",
        href: "/the-review#pricing",
        label: "How it works",
      },
      fixSprint: {
        kind: "link",
        href: "/the-review#after",
        label: "How it works",
      },
      build: {
        kind: "link",
        href: "/work/jimmy-coach",
        label: "See Jimmy Coach",
      },
    },
    {
      build: "The real build, in your name, delivered milestone by milestone.",
    },
  );

  return (
    <section id="founders" className="border-t border-line py-20 md:py-28">
      <Container>
        <Reveal>
          <SectionHeader
            index="02"
            title="For product &amp; health founders."
            intro="Get a CTO-level view before you commit budget. Nazar and Oleh run this path."
          />
        </Reveal>
        <PriceTable
          caption="Pricing for product and health founders"
          rows={rows}
        />
      </Container>
    </section>
  );
}
