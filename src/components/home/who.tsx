import type { SVGProps } from "react";

import { Container } from "@/components/ui/container";
import { Buildings, Layers, TrendingUp } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";

type Audience = {
  icon: (props: SVGProps<SVGSVGElement>) => React.ReactElement;
  title: string;
  desc: string;
};

const AUDIENCE: Audience[] = [
  {
    icon: Layers,
    title: "Founders shipping the real thing",
    desc: "Sport and fitness founders building a product members depend on — not a prototype to demo.",
  },
  {
    icon: Buildings,
    title: "Multi-location operators",
    desc: "Studios, gyms, and franchises where memberships, bookings, and payments simply have to work.",
  },
  {
    icon: TrendingUp,
    title: "Coaching apps that scale",
    desc: "Coaching and creator-led products going from a handful of clients to thousands.",
  },
];

export function WhoSection() {
  return (
    <section className="border-t border-line py-20 md:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
          {/* framing column */}
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <span className="inline-flex items-center gap-2.5 text-[13px] font-semibold uppercase tracking-[0.18em] text-faint">
                <span className="size-[7px] rounded-full bg-lime" aria-hidden />
                Who we build for
              </span>
              <h2 className="display mt-5 text-display max-w-[18ch]">
                Built for founders who take their product{" "}
                <span className="font-serif font-normal italic">seriously.</span>
              </h2>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">
                You are not looking for cheap hands. You want a team that
                understands what you are building and can be trusted with the
                part of your business your members actually touch.
              </p>
            </div>
          </Reveal>

          {/* audience roster */}
          <div className="flex flex-col">
            {AUDIENCE.map((a, i) => (
              <Reveal key={a.title} delay={i * 70}>
                <div className="group relative border-t border-line py-7 pl-5 first:border-t-0 md:py-8 lg:first:border-t">
                  {/* hover rail */}
                  <span
                    aria-hidden
                    className="absolute inset-y-0 left-0 w-[3px] origin-top scale-y-0 rounded-full bg-lime transition-transform duration-300 ease-[cubic-bezier(.23,1,.32,1)] group-hover:scale-y-100"
                  />
                  <div className="flex items-center gap-4">
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-line text-ink transition-colors duration-200 ease-out group-hover:border-ink group-hover:bg-lime [@media(hover:none)]:border-ink [@media(hover:none)]:bg-lime">
                      <a.icon className="size-5" />
                    </span>
                    <h3 className="text-xl font-bold leading-snug tracking-tight transition-transform duration-300 ease-[cubic-bezier(.23,1,.32,1)] group-hover:translate-x-0.5 md:text-[22px]">
                      {a.title}
                    </h3>
                  </div>
                  <p className="mt-4 max-w-[48ch] text-[17px] leading-relaxed text-muted">
                    {a.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
