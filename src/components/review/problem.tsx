import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";

export function ProblemSection() {
  return (
    <section className="border-t border-line py-20 md:py-28">
      <Container>
        <Reveal>
          <SectionHeader
            index="01"
            titleMax="max-w-[32ch]"
            title="Most fitness products break at exactly the wrong moment."
          />
        </Reveal>

        <div className="mt-12 grid gap-8 md:grid-cols-2 md:items-start md:gap-12">
          <Reveal>
            <p className="text-lg leading-relaxed text-muted md:text-xl">
              The app works fine with 500 members. Then you scale, add locations,
              raise a round, and the cracks show: payments fail under load,
              bookings double-charge, the data model can&rsquo;t handle a second
              franchise, and an investor&rsquo;s technical due diligence finds
              things you did not know were there.
            </p>
          </Reveal>

          <Reveal delay={80}>
            <div className="relative overflow-hidden rounded-2xl border border-line bg-paper-2 p-6 md:p-8">
              <span
                aria-hidden
                className="absolute inset-y-0 left-0 w-[5px] bg-lime"
              />
              <p className="text-lg leading-relaxed text-ink md:text-xl md:leading-relaxed">
                By the time it shows, fixing it is a rewrite.{" "}
                <strong className="font-semibold">
                  The cheapest moment to find these problems is now
                </strong>
                , before they cost you members, money, or a round.
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
