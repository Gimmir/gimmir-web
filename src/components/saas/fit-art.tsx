import { cn } from "@/lib/cn";

/* The three situations on /build-your-saas ③, each drawn as the scraps of
   UI a founder in it would recognise. Illustrative only: no product is
   named. Each scrap settles in (Stage .fade) one after another, and the
   one lime accent lands last (.wipe for the tape, laid down like tape). */

const at = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

function Scrap({
  tone = "white",
  size = "sm",
  className,
  style,
  tilt = 0,
  title,
  note,
  children,
}: {
  // cn only joins classes, so the variants pick them instead of overriding
  tone?: "white" | "lime";
  size?: "sm" | "lg";
  className?: string;
  style?: React.CSSProperties;
  tilt?: number;
  title: React.ReactNode;
  note?: React.ReactNode;
  children?: React.ReactNode;
}) {
  // the tilt sits inside the .fade box: .fade owns its own transform
  return (
    <div className="fade absolute" style={style}>
      <div
        className={cn(
          "whitespace-nowrap rounded-xl leading-tight",
          tone === "lime"
            ? "bg-lime"
            : "bg-surface shadow-[0_12px_24px_-16px_rgba(21,20,14,0.35)] ring-1 ring-line",
          size === "lg"
            ? "px-[18px] py-3.5 text-[26px] font-extrabold"
            : "px-3 py-2.5 text-[12.5px] font-semibold",
          className,
        )}
        style={tilt ? { rotate: `${tilt}deg` } : undefined}
      >
        {title}
        {note && (
          <span className="mt-1 flex items-center gap-1.5 text-[11px] font-normal text-faint">
            {note}
          </span>
        )}
        {children}
      </div>
    </div>
  );
}

function Lock() {
  return (
    <svg
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.3}
      strokeLinecap="round"
      aria-hidden
      className="size-2.5 shrink-0"
    >
      <rect x={2} y={5.5} width={8} height={5.5} rx={1.2} />
      <path d="M4 5.5V4a2 2 0 0 1 4 0v1.5" />
    </svg>
  );
}

/** 01: the feature you need is on a plan you can't have. */
export function ShelfArt({ d }: { d: number }) {
  return (
    <>
      <Scrap
        style={{ ...at(d), left: 22, top: 26, width: "62%" }}
        title="Custom workflows"
        note={
          <>
            <Lock />
            Enterprise plan only
          </>
        }
      />
      <Scrap
        className="opacity-80"
        style={{ ...at(d + 120), left: 44, top: 88, width: "58%" }}
        title="Your branding"
        note={
          <>
            <Lock />
            Not available
          </>
        }
      />
      <Scrap
        tone="lime"
        style={{ ...at(d + 420), left: 30, top: 146 }}
        title="+312 votes · “Please add this”"
      />
    </>
  );
}

/** 02: the tool you've patched together, and the patch holding it. */
export function PatchArt({ d }: { d: number }) {
  return (
    <>
      <Scrap
        tilt={-3}
        style={{ ...at(d), left: 18, top: 28 }}
        title="clients_FINAL_v3.xlsx"
        note="edited by hand, every Monday"
      />
      <Scrap
        tilt={2}
        style={{ ...at(d + 120), left: 92, top: 92 }}
        title="Zap: form → sheet → email"
        note="failed 4 times this week"
      />
      <Scrap
        tilt={-1}
        style={{ ...at(d + 240), left: 30, top: 152 }}
        title="WhatsApp broadcast"
        note="sent to 250 people, one by one"
      />
      {/* the tape over the join */}
      <div
        className="absolute h-4 w-[54px]"
        style={{ left: 150, top: 80, rotate: "-24deg" }}
      >
        <span
          className="wipe block h-full w-full rounded-[2px] bg-lime"
          style={at(d + 480)}
        />
      </div>
    </>
  );
}

/** 03: the audience is there; the technical half isn't. */
export function AudienceArt({ d }: { d: number }) {
  return (
    <>
      <Scrap
        size="lg"
        style={{ ...at(d), left: 22, top: 30 }}
        title="48.2k"
        note="followers who ask for your app"
      />
      <div
        className="fade absolute flex items-center gap-3"
        style={{ ...at(d + 240), left: 24, top: 128 }}
      >
        <span className="flex size-[50px] items-center justify-center rounded-full border-[1.5px] border-dashed border-ink font-extrabold">
          ?
        </span>
        <span className="text-[13px] font-semibold leading-tight">
          Technical co-founder
          <span className="block font-normal text-faint">still looking</span>
        </span>
      </div>
    </>
  );
}
