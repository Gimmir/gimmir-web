import { Check, Panel } from "@/components/blocks/ui-fragment";
import { cn } from "@/lib/cn";

/* The slices of UI drawn on the UN1T case's cards. Generic screens: sites
   are numbered, never named; nothing here is a real person's data. */

export function AppFragment() {
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

export function PaymentsFragment() {
  const rows: [string, string, string][] = [
    ["Membership", "Site 02", "Paid"],
    ["HQ fee", "On every payment", "Taken"],
    ["Payout", "Site 01", "Sent"],
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

export function WorkoutFragment() {
  const lines = ["Warm-up 8 min", "Strength block A", "Finisher 12 min"];
  return (
    <Panel className="w-full max-w-[320px] p-4">
      <div className="flex items-center justify-between">
        <span className="font-semibold">Today&rsquo;s workout</span>
        <span className="rounded-full bg-lime px-2 py-0.5 text-[11px] font-semibold text-ink">
          From HQ
        </span>
      </div>
      <ul className="mt-3 flex flex-col gap-2">
        {lines.map((l) => (
          <li
            key={l}
            className="rounded-xl border border-line px-3 py-2.5 font-medium"
          >
            {l}
          </li>
        ))}
      </ul>
      <p className="mt-3 text-[11px] text-faint">
        Sent to every studio, and its floor screens
      </p>
    </Panel>
  );
}

export function WellhubFragment() {
  const rows: [string, string, string][] = [
    ["HIIT 07:00", "Wellhub", "Booked"],
    ["Strength 12:30", "Member app", "Booked"],
    ["Yoga 18:00", "Wellhub", "Booked"],
  ];
  return (
    <Panel className="w-full max-w-[340px]">
      <div className="border-b border-line px-4 py-3 font-semibold">
        Bookings
      </div>
      <ul>
        {rows.map(([what, via, state]) => (
          <li
            key={what}
            className="flex items-center gap-3 border-b border-line px-4 py-2.5 last:border-b-0"
          >
            <span className="min-w-0">
              <span className="block font-medium">{what}</span>
              <span className="block text-[11px] text-faint">via {via}</span>
            </span>
            <span className="ml-auto flex items-center gap-1 rounded-full bg-lime px-2.5 py-1 text-[11px] font-semibold text-ink">
              <Check className="size-2.5" />
              {state}
            </span>
          </li>
        ))}
      </ul>
    </Panel>
  );
}
