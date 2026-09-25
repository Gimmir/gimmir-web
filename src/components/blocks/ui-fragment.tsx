import Image from "next/image";

import { FOUNDERS, type FounderId } from "@/lib/founders";
import { cn } from "@/lib/cn";

/**
 * Parts for the slices of UI drawn in code on the V2 bento cards (home ⑦,
 * /operators): a white panel on the card's tinted stage, small line icons
 * and a founder's face.
 */
const icon = {
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

export function Folder() {
  return (
    <svg {...icon} className="size-3.5 shrink-0 text-muted">
      <path d="M2 4.5a1 1 0 0 1 1-1h3l1.5 1.5H13a1 1 0 0 1 1 1V12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1Z" />
    </svg>
  );
}

export function File() {
  return (
    <svg {...icon} className="size-3.5 shrink-0 text-muted">
      <path d="M4 2h5l3 3v9H4Z M9 2v3h3" />
    </svg>
  );
}

export function Check({ className }: { className?: string }) {
  return (
    <svg {...icon} strokeWidth={2} className={cn("size-3", className)}>
      <path d="M3.5 8.5l3 3 6-7" />
    </svg>
  );
}

export function Face({ id, size = 28 }: { id: FounderId; size?: number }) {
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
export function Panel({
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
