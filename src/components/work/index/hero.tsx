import { InlineHeadline } from "@/components/blocks/inline-headline";
import { HeroBackdrop } from "@/components/home/hero-backdrop";
import { Stage } from "@/components/motion/stage";
import { Container } from "@/components/ui/container";
import { work } from "@/content/work";

/**
 * /work ①, the count as the headline at manifesto size (doc 09: 8vw),
 * "fitness" marked. Two quiet jumps under it: the two cases we can show,
 * and the seven we can't.
 */
export function WorkHero() {
  const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;
  const jumps = [
    { label: "2 public cases", href: "#un1t" },
    { label: "7 under NDA", href: `#${work.nda.id}` },
  ];

  return (
    <Stage as="section" eager data-tone="paper" className="relative">
      <HeroBackdrop />
      <Container className="relative pb-16 pt-32 md:pb-24 md:pt-44 lg:pb-28 lg:pt-48">
        <h1 className="text-[clamp(2.75rem,0.6rem+7.4vw,8.5rem)] font-extrabold leading-[0.98] tracking-[-0.04em] [font-stretch:106%]">
          <InlineHeadline tokens={work.hero.headline} />
        </h1>
        <ul className="fade mt-10 flex flex-wrap gap-2 md:mt-14" style={d(900)}>
          {jumps.map((j) => (
            <li key={j.href}>
              <a
                href={j.href}
                className="inline-flex h-10 items-center gap-2 rounded-full border border-line bg-surface/70 px-4 text-[15px] font-medium transition-colors duration-200 hover:border-lime hover:bg-lime"
              >
                {j.label}
                <span aria-hidden className="text-faint">
                  ↓
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </Stage>
  );
}
