import type { SVGProps } from "react";

import { Container } from "@/components/ui/container";
import { Buildings, Layers, TrendingUp } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import type { HOME_QUERY_RESULT } from "@/sanity/types";

const AUDIENCE_ICONS: ((props: SVGProps<SVGSVGElement>) => React.ReactElement)[] =
  [Layers, Buildings, TrendingUp];

export function WhoSection({
  data,
}: {
  data: NonNullable<HOME_QUERY_RESULT>;
}) {
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
                {data.whoHeading}
                {data.whoAccent ? (
                  <>
                    {" "}
                    <span className="font-serif font-normal italic">
                      {data.whoAccent}
                    </span>
                  </>
                ) : null}
              </h2>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">
                {data.whoIntro}
              </p>
            </div>
          </Reveal>

          {/* audience roster */}
          <div className="flex flex-col">
            {(data.whoRows ?? []).map((row, i) => {
              const Icon = AUDIENCE_ICONS[i % AUDIENCE_ICONS.length];
              return (
                <Reveal key={row._key} delay={i * 70}>
                  <div className="group relative border-t border-line py-7 pl-5 first:border-t-0 md:py-8 lg:first:border-t">
                    {/* hover rail */}
                    <span
                      aria-hidden
                      className="absolute inset-y-0 left-0 w-[3px] origin-top scale-y-0 rounded-full bg-lime transition-transform duration-300 ease-[cubic-bezier(.23,1,.32,1)] group-hover:scale-y-100"
                    />
                    <div className="flex items-center gap-4">
                      <span className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-line text-ink transition-colors duration-200 ease-out group-hover:border-ink group-hover:bg-lime [@media(hover:none)]:border-ink [@media(hover:none)]:bg-lime">
                        <Icon className="size-5" />
                      </span>
                      <h3 className="text-xl font-bold leading-snug tracking-tight transition-transform duration-300 ease-[cubic-bezier(.23,1,.32,1)] group-hover:translate-x-0.5 md:text-[22px]">
                        {row.title}
                      </h3>
                    </div>
                    <p className="mt-4 max-w-[48ch] text-[17px] leading-relaxed text-muted">
                      {row.body}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
