import { cn } from "@/lib/cn";

/** The artboard's platform list (the old calculator's SYSTEMS is not used here). */
export const PLATFORMS = [
  "Glofox",
  "Mindbody",
  "Mariana Tek",
  "Momence",
  "TeamUp",
  "ClassForKids",
  "Other",
] as const;

/** "your platform" until one is chosen, and for "Other". */
export function platformName(platform: string | null): string {
  return !platform || platform === "Other" ? "your platform" : platform;
}

/** Exact small amounts ("£60"), where formatMoney's £10 rounding would not do. */
export function pounds(value: number): string {
  return `£${value.toLocaleString("en-GB")}`;
}

/** The artboard's lime highlighter under a few words. */
export function Mark({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "bg-[linear-gradient(transparent_58%,var(--color-lime)_58%,var(--color-lime)_92%,transparent_92%)] px-0.5",
        className,
      )}
    >
      {children}
    </span>
  );
}

/** The ink pill with a lime arrow disc, as a button or a link. */
const pill =
  "group inline-flex min-h-[52px] items-center gap-3.5 rounded-full bg-ink py-0 pr-2 pl-6 text-base font-semibold text-paper transition-[background-color,transform] duration-200 ease-[var(--ease-out)] hover:-translate-y-px hover:bg-ink-soft active:scale-[0.97]";

function Disc() {
  return (
    <span
      aria-hidden
      className="flex size-[38px] shrink-0 items-center justify-center rounded-full bg-lime"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path
          d="M3 8h10M9 4l4 4-4 4"
          stroke="#15140E"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export function PillButton({
  children,
  onClick,
  className,
}: {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button type="button" onClick={onClick} className={cn(pill, className)}>
      {children}
      <Disc />
    </button>
  );
}

export function PillLink({
  children,
  href,
  className,
}: {
  children: React.ReactNode;
  href: string;
  className?: string;
}) {
  return (
    <a href={href} className={cn(pill, className)}>
      {children}
      <Disc />
    </a>
  );
}
