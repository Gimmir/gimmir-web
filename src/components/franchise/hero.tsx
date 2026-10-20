import Image from "next/image";

import { HeroBackdrop } from "@/components/home/hero-backdrop";
import { Stage } from "@/components/motion/stage";
import { Container } from "@/components/ui/container";
import { franchise } from "@/content/franchise";
import { UN1T } from "@/content/proof";
import { APPS } from "@/lib/apps";

import { Ctas } from "./ctas";

/**
 * /franchise ①, the money line as the H1, the sub that says where the
 * money comes from, both asks, and UN1T as a strip of facts. There is no
 * phone picture: the repo holds no UN1T screens and none are drawn.
 */
export function FranchiseHero() {
  const { headline, sub, proof } = franchise.hero;
  const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

  return (
    <Stage as="section" eager data-tone="paper" className="relative">
      <HeroBackdrop />
      <Container className="relative pb-16 pt-28 sm:pt-32 md:pb-24 md:pt-40">
        <h1 className="max-w-[20ch] text-[clamp(2.3rem,0.8rem+5.1vw,5.25rem)] font-extrabold leading-[1.04] tracking-[-0.038em] [font-stretch:106%] lg:max-w-[22ch] lg:text-[clamp(3.25rem,0.8rem+3.9vw,4.6rem)]">
          {headline}
        </h1>
        <p
          className="fade mt-7 max-w-[56ch] text-lg text-muted md:mt-9 md:text-xl"
          style={d(600)}
        >
          {sub}
        </p>
        <div className="fade mt-10 md:mt-12" style={d(800)}>
          <Ctas placement="franchise-hero" />
        </div>
        <div
          className="fade mt-10 flex items-center gap-4 text-[15px] text-muted md:mt-12"
          style={d(900)}
        >
          <Image
            src={APPS.un1t.icon}
            alt=""
            width={44}
            height={44}
            className="size-11 shrink-0 rounded-[12px]"
          />
          <p className="leading-snug">
            <span className="font-semibold text-ink">{proof.name}</span>
            {" · "}
            {proof.facts.join(" · ")}
            {" · "}
            <a
              href={UN1T.appStore.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-ink underline decoration-line underline-offset-4 transition-colors hover:decoration-ink"
            >
              See it on the App Store
            </a>
          </p>
        </div>
      </Container>
    </Stage>
  );
}
