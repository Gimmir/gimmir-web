import Image from "next/image";

import { Stage } from "@/components/motion/stage";
import { RiseText, wordCount } from "@/components/motion/words";
import { Container } from "@/components/ui/container";
import { home } from "@/content/home";
import { FOUNDERS, type FounderId } from "@/lib/founders";
import { cn } from "@/lib/cn";

/* ------------------------------------------------------------------ */
/*  Small parts the fragments share                                   */
/* ------------------------------------------------------------------ */

const icon = {
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

function Folder() {
  return (
    <svg {...icon} className="size-3.5 shrink-0 text-muted">
      <path d="M2 4.5a1 1 0 0 1 1-1h3l1.5 1.5H13a1 1 0 0 1 1 1V12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1Z" />
    </svg>
  );
}

function File() {
  return (
    <svg {...icon} className="size-3.5 shrink-0 text-muted">
      <path d="M4 2h5l3 3v9H4Z M9 2v3h3" />
    </svg>
  );
}

function Check({ className }: { className?: string }) {
  return (
    <svg {...icon} strokeWidth={2} className={cn("size-3", className)}>
      <path d="M3.5 8.5l3 3 6-7" />
    </svg>
  );
}

function Face({ id, size = 28 }: { id: FounderId; size?: number }) {
  return (
    <span
      className="relative shrink-0 overflow-hidden rounded-full bg-paper-2"
      style={{ width: size, height: size }}
    >
      <Image
        src={FOUNDERS[id].photo}
        alt=""
        fill
        sizes={`${size * 2}px`}
        className="object-cover object-top"
      />
    </span>
  );
}

/** A white panel on the card's tinted stage, like a slice of the real UI. */
function Panel({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-surface text-[13px] shadow-[0_1px_0_rgba(21,20,14,0.04),0_12px_28px_-18px_rgba(21,20,14,0.35)] ring-1 ring-line",
        className,
      )}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  The five fragments                                                */
/* ------------------------------------------------------------------ */

/** A repository that belongs to the client from its first commit. */
function RepoFragment() {
  const files: [string, string, boolean][] = [
    ["app", "Member app", true],
    ["api", "Bookings & payments", true],
    ["infra", "Your cloud account", true],
    ["RUNBOOK.md", "How to run it", false],
  ];
  return (
    <Panel className="w-full max-w-[460px]">
      <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
        <span className="flex items-center gap-2 font-semibold">
          <Folder />
          your-company <span className="text-faint">/</span> platform
        </span>
        <span className="rounded-full border border-line px-2 py-0.5 text-[11px] text-muted">
          Private
        </span>
      </div>
      <div className="flex items-center gap-2 border-b border-line px-4 py-2.5 text-muted">
        Owner
        <span className="flex items-center gap-1.5 rounded-full bg-paper-2 px-2 py-0.5 font-semibold text-ink">
          <span className="size-1.5 rounded-full bg-lime ring-1 ring-ink/20" />
          Your company
        </span>
        <span className="ml-auto text-faint">main</span>
      </div>
      <ul>
        {files.map(([name, note, dir]) => (
          <li
            key={name}
            className="flex items-center gap-2 border-b border-line px-4 py-2 last:border-b-0"
          >
            {dir ? <Folder /> : <File />}
            <span className="font-medium">{name}</span>
            <span className="ml-auto text-faint">{note}</span>
          </li>
        ))}
      </ul>
      <div className="flex items-center gap-2 rounded-b-2xl bg-paper px-4 py-2.5 text-muted">
        <Face id="oleh" size={18} />
        Initial commit
        <span className="ml-auto text-faint">Day 1</span>
      </div>
    </Panel>
  );
}

/** Milestones on a track: two approved, one in progress, one next. */
function MilestoneFragment() {
  const steps: [string, "done" | "now" | "next"][] = [
    ["Discovery", "done"],
    ["Member app", "done"],
    ["Payments", "now"],
    ["Launch", "next"],
  ];
  return (
    <Panel className="w-full max-w-[380px] px-4 pb-5 pt-4">
      <div className="flex items-center justify-between">
        <span className="font-semibold">Milestones</span>
        <span className="rounded-full bg-paper-2 px-2 py-0.5 text-[11px] text-muted">
          Fixed price each
        </span>
      </div>
      <ol className="relative mt-6 grid grid-cols-4">
        <span
          aria-hidden
          className="absolute left-[12.5%] right-[12.5%] top-[9px] h-px bg-line"
        />
        <span
          aria-hidden
          className="absolute left-[12.5%] top-[9px] h-px w-1/2 bg-ink"
        />
        {steps.map(([name, state]) => (
          <li key={name} className="relative flex flex-col items-center gap-2">
            <span
              className={cn(
                "flex size-[19px] items-center justify-center rounded-full",
                state === "done" && "bg-ink text-paper",
                state === "now" && "bg-lime ring-4 ring-lime/30",
                state === "next" && "border border-line bg-surface",
              )}
            >
              {state === "done" && <Check />}
              {state === "now" && (
                <span className="size-1.5 rounded-full bg-ink" />
              )}
            </span>
            <span className="text-center text-[12px] font-medium leading-tight">
              {name}
            </span>
            <span className="text-[11px] text-faint">
              {state === "done"
                ? "Approved"
                : state === "now"
                  ? "In progress"
                  : "Next"}
            </span>
          </li>
        ))}
      </ol>
    </Panel>
  );
}

/** A project thread with the two founders in it. */
function ThreadFragment() {
  const msgs: [FounderId, string, string][] = [
    [
      "oleh",
      "10:24",
      "Payments are live in staging. Recording a walkthrough now.",
    ],
    ["nazar", "10:31", "Great. I'll share it with your team today."],
  ];
  return (
    <Panel className="w-full max-w-[360px]">
      <div className="border-b border-line px-4 py-2.5 font-semibold">
        # your-platform
      </div>
      <ul className="flex flex-col gap-3.5 px-4 py-3.5">
        {msgs.map(([id, time, text]) => (
          <li key={time} className="flex gap-2.5">
            <Face id={id} />
            <span className="min-w-0">
              <span className="flex items-baseline gap-2">
                <span className="font-semibold">{FOUNDERS[id].first}</span>
                <span className="text-[11px] text-faint">{time}</span>
              </span>
              <span className="mt-0.5 block leading-snug text-ink/85">
                {text}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </Panel>
  );
}

/** This week's build-log entry: the same story as the thread. */
function LogFragment() {
  return (
    <Panel className="w-full max-w-[360px] p-4">
      <div className="flex items-center gap-2 text-[11px] text-muted">
        <span className="rounded-full bg-paper-2 px-2 py-0.5">Week 6</span>
        Build log
      </div>
      <p className="mt-3 text-[15px] font-semibold leading-snug">
        Payments in staging, walkthrough recorded
      </p>
      <p className="mt-1.5 leading-snug text-muted">
        What changed, what&apos;s next, and a video of it working.
      </p>
      <div className="mt-3 flex items-center gap-2 border-t border-line pt-3 text-muted">
        <span className="flex size-4 items-center justify-center rounded-full bg-lime text-ink">
          <Check className="size-2.5" />
        </span>
        Runbook updated
      </div>
    </Panel>
  );
}

/** A release after launch, and the service being watched. */
function ReleaseFragment() {
  return (
    <Panel className="w-full max-w-[360px] p-4">
      <div className="flex items-center justify-between">
        <span className="font-semibold">Release 1.4</span>
        <span className="flex items-center gap-1.5 rounded-full bg-paper-2 px-2 py-0.5 text-[11px] text-muted">
          <span className="size-1.5 rounded-full bg-lime ring-1 ring-ink/20" />
          Live
        </span>
      </div>
      <ul className="mt-3 flex flex-col gap-1.5 text-ink/85">
        <li>Faster class booking</li>
        <li>New payout report</li>
      </ul>
      <div className="mt-4 border-t border-line pt-3">
        <div className="flex items-center justify-between text-[11px] text-muted">
          Monitored
          <span>Last 30 days</span>
        </div>
        <div aria-hidden className="mt-2 flex h-5 gap-[3px]">
          {Array.from({ length: 30 }, (_, i) => (
            <span key={i} className="flex-1 rounded-[2px] bg-ink/85" />
          ))}
        </div>
      </div>
    </Panel>
  );
}

const FRAGMENTS: Record<string, () => React.ReactNode> = {
  code: RepoFragment,
  milestones: MilestoneFragment,
  founders: ThreadFragment,
  steps: LogFragment,
  after: ReleaseFragment,
};

/** Where each card sits in the bento on wide screens. */
const SPAN: Record<string, string> = {
  code: "lg:col-span-7",
  milestones: "lg:col-span-5",
  founders: "lg:col-span-4",
  steps: "lg:col-span-4",
  after: "lg:col-span-4",
};

/**
 * ⑦ What you get, on paper: five promises as a bento of light cards, each
 * with a slice of the UI it means (the client's own repo, milestones
 * without amounts, the founders in the thread, the build log, a release
 * after launch). The thread and the log tell the same week's story.
 */
export function WhatYouGet() {
  const { title, cards } = home.get;
  const after = wordCount(title) * 40 + 300;
  const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

  return (
    <Stage as="section" data-tone="paper" className="relative">
      <Container className="py-20 md:py-28">
        <h2 className="display text-[length:var(--text-title)] leading-[1.02]">
          <RiseText text={title} />
        </h2>
        <ul className="mt-12 grid gap-4 md:mt-16 md:grid-cols-2 lg:grid-cols-12">
          {cards.map((c, i) => {
            const Ui = FRAGMENTS[c.id];
            return (
              <li
                key={c.id}
                className={cn(
                  "fade flex flex-col rounded-[24px] bg-surface p-2 shadow-[0_1px_0_rgba(21,20,14,0.04),0_28px_56px_-36px_rgba(21,20,14,0.35)] ring-1 ring-line",
                  SPAN[c.id],
                  c.id === "code" && "md:col-span-2 lg:col-span-7",
                )}
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
