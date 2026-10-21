import { cn } from "@/lib/cn";

/**
 * A phone drawn in code, for the illustrated app screens on /franchise:
 * an ink frame, a rounded screen and a notch. Sample content only (Sophie,
 * Leeds, Coach Dean): never a screenshot of a real member's account.
 * Sizes are the artboard's: "front" 292×612, "back" 248×520, "stage"
 * 320×640 for the scroll story.
 */
const SIZES = {
  front: { w: 292, h: 612, pad: 10, outer: 48, inner: 39, notchW: 88, notchH: 26 },
  back: { w: 248, h: 520, pad: 9, outer: 42, inner: 34, notchW: 74, notchH: 22 },
  stage: { w: 320, h: 640, pad: 10, outer: 50, inner: 41, notchW: 92, notchH: 26 },
} as const;

export function Phone({
  size = "front",
  screen = "#F4F4F1",
  className,
  style,
  children,
}: {
  size?: keyof typeof SIZES;
  /** The screen's background. */
  screen?: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  const s = SIZES[size];
  return (
    <div
      aria-hidden
      className={cn("box-border bg-ink shadow-[0_50px_90px_-40px_rgba(21,20,14,0.6)]", className)}
      style={{ width: s.w, height: s.h, padding: s.pad, borderRadius: s.outer, ...style }}
    >
      <div
        className="relative flex h-full w-full flex-col overflow-hidden"
        style={{ borderRadius: s.inner, background: screen }}
      >
        <span
          className="absolute top-2 left-1/2 z-[3] -translate-x-1/2 bg-ink"
          style={{ width: s.notchW, height: s.notchH, borderRadius: 20 }}
        />
        {children}
      </div>
    </div>
  );
}
