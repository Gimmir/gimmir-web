import { Check, Panel } from "@/components/blocks/ui-fragment";
import { Stage } from "@/components/motion/stage";
import { RiseText, wordCount } from "@/components/motion/words";
import { Container } from "@/components/ui/container";
import { operators } from "@/content/operators";
import { cn } from "@/lib/cn";

/* Slices of the platform a network runs on, drawn in code. Sites are
   numbered, never named; nothing here is a real client's data. */

function AppFragment() {
  const classes: [string, string, "book" | "booked" | "wait"][] = [
    ["HIIT", "07:00", "booked"],
    ["Strength", "12:30", "book"],
    ["Yoga", "18:00", "wait"],
  ];
  return (
    <Panel className="w-full max-w-[300px] px-4 pb-4 pt-3.5">
      <div className="flex items-center justify-between">
        <span className="font-semibold">Today</span>
        <span className="rounded-full bg-paper-2 px-2 py-0.5 text-[11px] text-muted">
          Site 03
        </span>
      </div>
      <ul className="mt-3 flex flex-col gap-2">
        {classes.map(([name, time, state]) => (
          <li
            key={name}
            className="flex items-center gap-3 rounded-xl border border-line px-3 py-2.5"
          >
            <span className="font-medium">{name}</span>
            <span className="text-faint">{time}</span>
            <span
              className={cn(
                "ml-auto rounded-full px-2.5 py-1 text-[11px] font-semibold",
                state === "book" && "bg-ink text-paper",
                state === "booked" &&
                  "flex items-center gap-1 bg-lime text-ink",
                state === "wait" && "border border-line text-muted",
              )}
            >
              {state === "booked" && <Check className="size-2.5" />}
              {state === "book"
                ? "Book"
                : state === "booked"
                  ? "Booked"
                  : "Waitlist"}
            </span>
          </li>
        ))}
      </ul>
    </Panel>
  );
}

function OfficeFragment() {
  const sites = [0.82, 0.64, 0.9, 0.55];
  return (
    <Panel className="w-full max-w-[380px]">
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <span className="font-semibold">Network</span>
        <span className="text-[11px] text-faint">This week</span>
      </div>
      <ul>
        {sites.map((w, i) => (
          <li
            key={i}
            className="flex items-center gap-3 border-b border-line px-4 py-2.5 last:border-b-0"
          >
            <span className="size-1.5 rounded-full bg-lime ring-1 ring-ink/20" />
            <span className="w-14 font-medium">
              Site {String(i + 1).padStart(2, "0")}
            </span>
            <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-paper-2">
              <span
                className="block h-full rounded-full bg-ink/80"
                style={{ width: `${w * 100}%` }}
              />
            </span>
            <span className="text-[11px] text-faint">Live</span>
          </li>
        ))}
      </ul>
    </Panel>
  );
}

function PaymentsFragment() {
  const rows: [string, string, string][] = [
    ["Membership", "Site 02", "Paid"],
    ["Payout", "Site 01", "Sent"],
    ["Royalty", "From actual payments", "Calculated"],
  ];
  return (
    <Panel className="w-full max-w-[340px]">
      <div className="border-b border-line px-4 py-3 font-semibold">
        Payments
      </div>
      <ul>
        {rows.map(([what, where, state]) => (
          <li
            key={what}
            className="flex items-center gap-3 border-b border-line px-4 py-2.5 last:border-b-0"
          >
            <span className="min-w-0">
              <span className="block font-medium">{what}</span>
              <span className="block text-[11px] text-faint">{where}</span>
            </span>
            <span className="ml-auto rounded-full bg-paper-2 px-2 py-0.5 text-[11px] text-muted">
              {state}
            </span>
          </li>
        ))}
      </ul>
    </Panel>
  );
}

function DataFragment() {
  return (
    <Panel className="w-full max-w-[320px] p-4">
      <div className="flex items-center gap-3">
        <span className="flex size-9 items-center justify-center rounded-full bg-paper-2 text-[12px] font-semibold">
          AM
        </span>
        <span>
          <span className="block font-semibold">One member</span>
          <span className="block text-[11px] text-faint">
            Every site, one record
          </span>
        </span>
      </div>
      <ul className="mt-4 flex flex-wrap gap-1.5">
        {["Site 01", "Site 03", "Site 04"].map((s) => (
          <li
            key={s}
            className="rounded-full border border-line px-2.5 py-1 text-[12px]"
          >
            {s}
          </li>
        ))}
        <li className="rounded-full bg-lime px-2.5 py-1 text-[12px] font-semibold text-ink">
          Head office
        </li>
      </ul>
    </Panel>
  );
}

function MigrationFragment() {
  const steps: [string, boolean][] = [
    ["Member data mapped and tested", true],
    ["Cutover planned around billing", true],
    ["Sites switching in waves", false],
  ];
  return (
    <Panel className="w-full max-w-[340px] p-4">
      <span className="font-semibold">Migration</span>
      <ul className="mt-3 flex flex-col gap-2.5">
        {steps.map(([s, done]) => (
          <li key={s} className="flex items-center gap-2.5">
            <span
              className={cn(
                "flex size-5 shrink-0 items-center justify-center rounded-full",
                done ? "bg-ink text-paper" : "bg-lime ring-4 ring-lime/30",
              )}
            >
              {done ? (
                <Check className="size-2.5" />
              ) : (
                <span className="size-1.5 rounded-full bg-ink" />
              )}
            </span>
            <span className={done ? "text-ink/85" : "font-semibold"}>{s}</span>
          </li>
        ))}
      </ul>
    </Panel>
  );
}

const FRAGMENTS: Record<string, () => React.ReactNode> = {
  app: AppFragment,
  office: OfficeFragment,
  payments: PaymentsFragment,
  data: DataFragment,
  migration: MigrationFragment,
};

const SPAN: Record<string, string> = {
  app: "md:col-span-2 lg:col-span-7",
  office: "lg:col-span-5",
  payments: "lg:col-span-4",
  data: "lg:col-span-4",
  migration: "lg:col-span-4",
};

/**
 * /operators ④, what we build for networks: the home's bento language
 * (light cards, a slice of UI on each) for the five parts an operator
 * actually runs on.
 */
export function OperatorsNetworks() {
  const { title, cards } = operators.bento;
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
                )}
                style={d(after + i * 80)}
              >
                <div
                  aria-hidden
                  className="flex min-h-[230px] flex-1 items-center justify-center overflow-hidden rounded-[18px] bg-paper-2 px-5 py-6"
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
