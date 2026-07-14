import { Container } from "@/components/ui/container";
import { Pencil, Plus } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";

function TeamAvatar() {
  return (
    <span className="flex size-10 items-center justify-center rounded-full border border-line bg-paper-2 ring-2 ring-surface">
      <svg viewBox="0 0 24 24" fill="none" aria-hidden className="size-5">
        <circle
          cx="12"
          cy="9"
          r="3.2"
          className="stroke-ink/35"
          strokeWidth="1.6"
        />
        <path
          d="M5.5 19a6.5 6.5 0 0 1 13 0"
          className="stroke-ink/35"
          strokeWidth="1.6"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </span>
  );
}

export function StudioSection() {
  return (
    <section className="border-t border-line py-20 md:py-28">
      <Container>
        <div className="grid gap-10 md:grid-cols-[0.85fr_1.15fr] md:items-start md:gap-16">
          <Reveal>
            <SectionHeader
              index="04"
              titleMax="max-w-[18ch]"
              title="Two founders, a full team behind them."
            />
          </Reveal>

          <div>
            <Reveal>
              <p className="text-lg leading-relaxed text-muted md:text-xl">
                Behind the two of us is a team of senior engineers and designers,
                and the infrastructure to spin up a dedicated team for you in{" "}
                <strong className="font-semibold text-ink">
                  weeks, not months
                </strong>
                . We are a{" "}
                <strong className="font-semibold text-ink">
                  Ukrainian studio
                </strong>
                , and that engineering talent is a large part of why founders in
                the US and UK keep building with us.
              </p>
            </Reveal>

            <Reveal delay={80}>
              <div className="mt-8 overflow-hidden rounded-2xl border border-line bg-surface p-7 md:p-8">
                {/* the team */}
                <div className="flex flex-wrap items-center gap-x-5 gap-y-4">
                  <div className="flex -space-x-3">
                    <span className="flex size-10 items-center justify-center rounded-full bg-lime text-[11px] font-bold text-ink ring-2 ring-surface">
                      NM
                    </span>
                    <span className="flex size-10 items-center justify-center rounded-full border border-line bg-paper text-[11px] font-bold text-ink ring-2 ring-surface">
                      OP
                    </span>
                    {Array.from({ length: 6 }).map((_, i) => (
                      <TeamAvatar key={i} />
                    ))}
                    <span className="flex size-10 items-center justify-center rounded-full border border-dashed border-ink/30 text-ink/40 ring-2 ring-surface">
                      <Plus className="size-4" />
                    </span>
                  </div>
                  <p className="text-sm leading-snug text-muted">
                    Nazar &amp; Oleh, plus the
                    <br className="hidden sm:block" /> senior team behind every
                    build.
                  </p>
                </div>

                {/* team size — the founders confirm the number */}
                <div className="mt-7 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:gap-5">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-lime text-ink">
                    <Pencil className="size-[18px]" />
                  </span>
                  <div>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                      <span className="font-mono text-xs uppercase tracking-widest text-ink/70">
                        Team size
                      </span>
                      <span className="rounded-full border border-ink/20 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-faint">
                        Confirm
                      </span>
                    </div>
                    <p className="mt-2 max-w-[56ch] text-sm leading-relaxed text-muted">
                      How you want to state it, kept honest — e.g. &ldquo;a team
                      of 15+ engineers and designers.&rdquo; No global offices
                      you do not have; it is the first thing a careful buyer
                      checks.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
