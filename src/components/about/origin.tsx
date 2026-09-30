import { InlineHeadline } from "@/components/blocks/inline-headline";
import { Stage } from "@/components/motion/stage";
import { Container } from "@/components/ui/container";
import { about } from "@/content/about";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

/**
 * /about ④, doc 09's origin paragraph, on ink: the claim with "owners"
 * marked in lime, then the story in the serif voice, one paragraph at a
 * time.
 */
export function AboutOrigin() {
  const { label, title, body } = about.origin;

  return (
    <Stage as="section" data-tone="ink" className="bg-ink text-paper">
      <Container className="grid gap-10 py-20 md:py-28 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-6">
          <p className="fade text-[15px] font-medium text-paper/50">{label}</p>
          <h2 className="display mt-6 text-[length:var(--text-title)] leading-[1.02]">
            <InlineHeadline tokens={title} />
          </h2>
        </div>
        <div className="flex flex-col gap-6 lg:col-span-6 lg:pt-12">
          {body.map((p, i) => (
            <p
              key={i}
              className="fade max-w-[36ch] font-serif text-[clamp(1.3rem,1rem+0.7vw,1.7rem)] italic leading-[1.35] text-paper/85"
              style={d(700 + i * 160)}
            >
              {p}
            </p>
          ))}
        </div>
      </Container>
    </Stage>
  );
}
