import { cn } from "@/lib/cn";

/**
 * Gimmir logomark — the solid letter G in the wordmark typeface with a lime
 * dot as its period. A letterform can't be mistaken for a status icon (power,
 * toggle, signal), and it stays perfectly cohesive with the "Gimmir" wordmark.
 * The G uses currentColor so it adapts to light / dark surfaces.
 */
export function Logomark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={cn("shrink-0", className)}
    >
      <text
        x="14.5"
        y="16.4"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="30"
        fontWeight="800"
        style={{ fontFamily: "var(--font-archivo), sans-serif" }}
        className="fill-current"
      >
        G
      </text>
      <circle cx="26.4" cy="24.2" r="3" className="fill-lime" />
    </svg>
  );
}
