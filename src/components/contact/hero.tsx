import { Container } from "@/components/ui/container";
import { Mark } from "@/components/ui/mark";
import { Pill } from "@/components/ui/pill";
import { Reveal } from "@/components/ui/reveal";

/** The /contact hero: no CTA of its own, the booking hub sits right below it. */
export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <Container className="pb-14 pt-28 sm:pt-32 md:pb-16 md:pt-36">
        <Reveal eager>
          <Pill>Book a call</Pill>
        </Reveal>

        <Reveal eager delay={60}>
          <h1 className="display mt-8 text-[1.7rem] leading-[1.2] sm:text-hero sm:leading-[0.98]">
            Book a call. <Mark>Talk to the people who&rsquo;ll build it.</Mark>
          </h1>
        </Reveal>

        <Reveal eager delay={140}>
          <p className="mt-8 max-w-[46ch] text-lg leading-relaxed text-muted md:text-xl">
            Twenty to thirty minutes. No pitch deck. If we&rsquo;re not the
            right team, we&rsquo;ll say so.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
