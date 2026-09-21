import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

/** A short callout, styled like the lime-edged note on /the-review. */
export function Note() {
  return (
    <section className="border-t border-line py-14 md:py-16">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl border border-line bg-paper-2 p-6 md:p-8">
            <span
              aria-hidden
              className="absolute inset-y-0 left-0 w-[5px] bg-lime"
            />
            <p className="text-lg leading-relaxed text-ink md:text-xl md:leading-relaxed">
              Every price is fixed before we start. Code, repos and accounts are
              in your name from day one, on every tier.
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
