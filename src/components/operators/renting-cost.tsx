import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";

const CARDS = [
  {
    title: "Pricing that punishes growth",
    body: "Per-member and per-location fees rise with every site, whether or not it's profitable yet.",
  },
  {
    title: "Payment fees on top",
    body: "A margin on every card payment, stacked on the subscription. Often the biggest line, and the one nobody adds up.",
  },
  {
    title: "Your data on their system",
    body: "Your member data and your member relationship live on someone else's platform, on their terms.",
  },
  {
    title: "An app like everyone else's",
    body: "Your members get the same experience as every other studio on the platform, and it changes when the vendor decides.",
  },
];

export function RentingCost() {
  return (
    <section className="border-t border-line py-20 md:py-28">
      <Container>
        <Reveal>
          <SectionHeader
            index="01"
            titleMax="max-w-[26ch]"
            title="The fees scale with your success, not your costs."
            intro="Every new member, every new location, every payment: the platform takes its share. You did the hard work of growing; the platform bills you for it. With UN1T, a boutique franchise with 10+ locations, moving onto their own platform kept about $10k a month in platform and payment fees inside the business."
          />
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {CARDS.map((c, i) => (
            <Reveal key={c.title} delay={(i % 4) * 70} className="h-full">
              <div className="flex h-full flex-col gap-3 rounded-2xl border border-line bg-surface p-7">
                <h3 className="text-xl font-bold tracking-tight">{c.title}</h3>
                <p className="leading-relaxed text-muted">{c.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <p className="mt-10 max-w-[62ch] text-lg leading-relaxed text-muted">
            Most operators have never seen the twelve-month total. Add up the
            last twelve invoices and the processing statements. That is the
            number we start from.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
