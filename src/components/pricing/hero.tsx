import { Container } from "@/components/ui/container";
import { Mark } from "@/components/ui/mark";
import { Pill } from "@/components/ui/pill";
import { Reveal } from "@/components/ui/reveal";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <Container className="pb-14 pt-28 sm:pt-32 md:pb-20 md:pt-36">
        <Reveal eager>
          <Pill>Pricing</Pill>
        </Reveal>

        <Reveal eager delay={60}>
          <h1 className="display mt-8 text-[1.7rem] leading-[1.2] sm:text-hero sm:leading-[0.98]">
            Fixed prices. <Mark>No “it depends”</Mark> until we’ve told you what
            it depends on.
          </h1>
        </Reveal>

        <Reveal eager delay={140}>
          <p className="mt-10 max-w-[52ch] text-lg leading-relaxed text-muted md:text-xl">
            Here’s what things cost. The free calls are genuinely free, and
            every price is fixed before we start.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
