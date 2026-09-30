import Image from "next/image";

import { Check, Panel } from "@/components/blocks/ui-fragment";
import { RepoFragment } from "@/components/home/what-you-get";
import { Stage } from "@/components/motion/stage";
import { RiseText, wordCount } from "@/components/motion/words";
import { Container } from "@/components/ui/container";
import { X } from "@/components/ui/icons";
import { saas } from "@/content/saas";
import { AudienceArt, PatchArt, ShelfArt } from "./fit-art";
import { FOUNDERS } from "@/lib/founders";
import { cn } from "@/lib/cn";

/* /build-your-saas ③ to ⑦ (doc 09 §3.3): is this you, how we start,
   what you own, who it's not for. ⑥ (build-log posts tagged Jimmy) waits
   for the build log (P2) and renders nothing until then. */

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

const FIT_ART = {
  shelf: ShelfArt,
  patch: PatchArt,
  audience: AudienceArt,
} as const;

/**
 * ③ Three situations a founder recognises: each card draws the situation
 * in scraps of UI, says it, then answers it in a line.
 */
export function SaasFit() {
  const { title, items } = saas.fit;
  const after = wordCount(title) * 40 + 300;
  return (
    <Stage as="section" data-tone="paper">
      <Container className="py-20 md:py-28">
        <h2 className="display text-[length:var(--text-title)] leading-[1.02]">
          <RiseText text={title} />
        </h2>
        <ul className="mt-12 grid gap-4 md:mt-16 md:grid-cols-3">
          {items.map((it, i) => {
            const Art = FIT_ART[it.id];
            const at = after + i * 90;
            return (
              <li
                key={it.id}
                className="fade flex flex-col rounded-[26px] bg-surface p-3.5 ring-1 ring-line"
                style={d(at)}
              >
                <div
                  aria-hidden
                  className="relative h-[210px] overflow-hidden rounded-[18px] bg-paper-2"
                >
                  <Art d={at + 250} />
                </div>
                <div className="flex flex-1 flex-col gap-3.5 px-3 pb-3.5 pt-5.5">
                  <span className="font-mono text-[12px] uppercase tracking-[0.04em] text-faint">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="display text-[clamp(1.45rem,1rem+0.9vw,1.85rem)] leading-[1.06]">
                    {it.line}
                  </p>
                  <p className="mt-auto border-t border-line pt-4 font-serif text-lg italic leading-snug text-muted">
                    {it.answer}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </Stage>
  );
}

/**
 * ④ `#diagnostic`: The Review first (Nazar's), then a sprint or V1, then
 * Care, as three big steps. Each row's rule draws in, then its outline
 * number draws itself (the first in lime, where it starts), then the words.
 */
export function SaasStart() {
  const { id, title, lede, steps } = saas.start;
  const after = wordCount(title) * 40 + 300;
  const at = (ms: number, dur?: number) =>
    ({
      "--d": `${ms}ms`,
      ...(dur ? { "--dur": `${dur}ms` } : {}),
    }) as React.CSSProperties;
  return (
    <Stage
      as="section"
      id={id}
      data-tone="ink"
      className="scroll-mt-20 bg-ink text-paper"
    >
      <Container className="py-20 md:py-28">
        <div className="grid gap-5 md:grid-cols-2 md:items-end md:gap-8">
          <h2 className="display text-[length:var(--text-title)] leading-[1.02]">
            <RiseText text={title} />
          </h2>
          <p
            className="fade font-serif text-2xl italic leading-snug text-paper/70 md:text-[1.75rem]"
            style={at(after - 200)}
          >
            {lede}
          </p>
        </div>

        <ol className="mt-12 md:mt-16">
          {steps.map((s, i) => {
            const t = after + i * 220;
            return (
              <li
                key={s.name}
                className="relative grid gap-4 py-8 md:grid-cols-[9rem_1.1fr_1fr] md:gap-8 md:py-10"
              >
                <span
                  aria-hidden
                  className="wipe absolute inset-x-0 top-0 h-px bg-line-dark"
                  style={at(t, 900)}
                />
                {/* the step number, an outline that draws itself */}
                <svg
                  aria-hidden
                  viewBox="0 0 140 171"
                  className="h-[clamp(5rem,3.2rem+4vw,9rem)] w-auto overflow-visible"
                >
                  <text
                    x={4}
                    y={158}
                    fill="none"
                    stroke={
                      i === 0 ? "var(--color-lime)" : "var(--color-paper)"
                    }
                    strokeWidth={1.8}
                    strokeLinejoin="round"
                    className="draw-text display"
                    style={{
                      ...at(t + 100, 1100),
                      ["--len" as string]: 900,
                      fontSize: 190,
                    }}
                  >
                    {i + 1}
                  </text>
                </svg>
                <div className="fade" style={at(t + 300)}>
                  <h3 className="display text-[clamp(2rem,1rem+2.2vw,3.25rem)] leading-none">
                    {s.name}
                  </h3>
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <span className="rounded-full border border-line-dark px-3 py-1 text-[13px] text-paper/70">
                      {s.time}
                    </span>
                    {"lead" in s && (
                      <span className="flex items-center gap-2 text-[13px] text-paper/70">
                        <span className="relative size-7 overflow-hidden rounded-full">
                          <Image
                            src={FOUNDERS[s.lead].photo}
                            alt=""
                            fill
                            sizes="56px"
                            className="object-cover object-top"
                          />
                        </span>
                        Led by {FOUNDERS[s.lead].first}
                      </span>
                    )}
                  </div>
                </div>
                <div className="fade" style={at(t + 450)}>
                  <p className="text-[clamp(1.15rem,1rem+0.4vw,1.4rem)] leading-[1.35] text-paper/75">
                    {s.body}
                  </p>
                  <p className="mt-3 text-[15px] text-paper/50">
                    <span className="mr-2 font-mono text-[11px] uppercase tracking-[0.04em]">
                      You get
                    </span>
                    {s.gets}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </Container>
    </Stage>
  );
}

function DocsFragment() {
  const files: [string, string][] = [
    ["ARCHITECTURE.md", "How it fits together"],
    ["RUNBOOK.md", "How to run it"],
    ["decisions/", "Why we built it this way"],
  ];
  return (
    <Panel className="w-full max-w-[380px]">
      <div className="border-b border-line px-4 py-3 font-semibold">docs</div>
      <ul>
        {files.map(([name, note]) => (
          <li
            key={name}
            className="flex items-center gap-2 border-b border-line px-4 py-2.5 last:border-b-0"
          >
            <span className="font-medium">{name}</span>
            <span className="ml-auto text-faint">{note}</span>
          </li>
        ))}
      </ul>
      <div className="flex items-center gap-2 rounded-b-2xl bg-paper px-4 py-2.5 text-muted">
        <span className="flex size-4 items-center justify-center rounded-full bg-lime text-ink">
          <Check className="size-2.5" />
        </span>
        Updated at every milestone
      </div>
    </Panel>
  );
}

function AccountsFragment() {
  const rows = ["App Store Connect", "Google Play Console", "Stripe", "Cloud"];
  return (
    <Panel className="w-full max-w-[360px]">
      <div className="border-b border-line px-4 py-3 font-semibold">
        Accounts
      </div>
      <ul>
        {rows.map((r) => (
          <li
            key={r}
            className="flex items-center gap-2 border-b border-line px-4 py-2.5 last:border-b-0"
          >
            <span className="font-medium">{r}</span>
            <span className="ml-auto flex items-center gap-1.5 rounded-full bg-paper-2 px-2 py-0.5 text-[11px] font-semibold">
              <span className="size-1.5 rounded-full bg-lime ring-1 ring-ink/20" />
              Owner: you
            </span>
          </li>
        ))}
      </ul>
    </Panel>
  );
}

function RoadmapFragment() {
  const cols: [string, string[]][] = [
    ["Now", ["Payments"]],
    ["Next", ["Community", "Web dashboard"]],
    ["Later", ["Integrations"]],
  ];
  return (
    <Panel className="w-full max-w-[400px] p-4">
      <div className="flex items-center justify-between">
        <span className="font-semibold">Roadmap</span>
        <span className="rounded-full bg-paper-2 px-2 py-0.5 text-[11px] text-muted">
          Your call
        </span>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {cols.map(([name, items], k) => (
          <div key={name} className="rounded-xl bg-paper p-2">
            <p className="text-[11px] font-semibold text-muted">{name}</p>
            {items.map((it) => (
              <p
                key={it}
                className={cn(
                  "mt-1.5 rounded-lg px-2 py-1.5 text-[12px] font-medium",
                  k === 0 ? "bg-lime" : "bg-surface ring-1 ring-line",
                )}
              >
                {it}
              </p>
            ))}
          </div>
        ))}
      </div>
    </Panel>
  );
}

const OWN_UI: Record<string, () => React.ReactNode> = {
  code: RepoFragment,
  docs: DocsFragment,
  accounts: AccountsFragment,
  roadmap: RoadmapFragment,
};

/** ⑤ What stays yours, each with a slice of it drawn in code. */
export function SaasOwn() {
  const { title, cards } = saas.own;
  const after = wordCount(title) * 40 + 300;
  return (
    <Stage as="section" data-tone="paper">
      <Container className="py-20 md:py-28">
        <h2 className="display text-[length:var(--text-title)] leading-[1.02]">
          <RiseText text={title} />
        </h2>
        <ul className="mt-12 grid gap-4 md:mt-16 md:grid-cols-2">
          {cards.map((c, i) => {
            const Ui = OWN_UI[c.id];
            return (
              <li
                key={c.id}
                className="fade flex flex-col rounded-[24px] bg-surface p-2 shadow-[0_1px_0_rgba(21,20,14,0.04),0_28px_56px_-36px_rgba(21,20,14,0.35)] ring-1 ring-line"
                style={d(after + i * 80)}
              >
                <div
                  aria-hidden
                  className="flex min-h-[250px] flex-1 items-center justify-center overflow-hidden rounded-[18px] bg-paper-2 px-5 py-6"
                >
                  <Ui />
                </div>
                <div className="px-4 pb-4 pt-5 md:px-5">
                  <h3 className="text-xl font-bold tracking-[-0.01em]">
                    {c.title}
                  </h3>
                  <p className="mt-1.5 leading-relaxed text-muted">{c.body}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </Stage>
  );
}

/** ⑦ The honest filter, on ink. */
export function SaasNotFor() {
  const { title, items } = saas.notFor;
  const after = wordCount(title) * 40 + 300;
  return (
    <Stage as="section" data-tone="ink" className="bg-ink text-paper">
      <Container className="grid gap-x-10 gap-y-10 py-20 md:py-24 lg:grid-cols-12 lg:items-end">
        <h2 className="display text-[length:var(--text-title)] leading-[1.02] lg:col-span-5">
          <RiseText text={title} />
        </h2>
        <ul className="flex flex-col lg:col-span-7">
          {items.map((it, i) => (
            <li
              key={it}
              className="fade flex items-center gap-4 border-t border-line-dark py-5 text-[clamp(1.25rem,1rem+0.8vw,1.75rem)] font-semibold tracking-[-0.01em] last:border-b"
              style={d(after + i * 90)}
            >
              <span
                aria-hidden
                className="flex size-8 shrink-0 items-center justify-center rounded-full border border-line-dark text-paper/60"
              >
                <X className="size-3.5" />
              </span>
              {it}
            </li>
          ))}
        </ul>
      </Container>
    </Stage>
  );
}
