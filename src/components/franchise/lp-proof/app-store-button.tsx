import Image from "next/image";

import { Globe } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

const BADGES = {
  apple: { src: "/badges/app-store-en.svg", width: 144 },
  play: { src: "/badges/google-play-en.png", width: 161 },
} as const;

/**
 * The official store badge ("Download on the App Store", "Get it on Google
 * Play"), the same files Jimmy's own site uses. 48px tall, like the site
 * link beside it.
 */
export function StoreBadge({
  store,
  href,
  label,
}: {
  store: keyof typeof BADGES;
  href: string;
  /** What the link opens, e.g. "Jimmy Coach on the App Store". */
  label: string;
}) {
  const b = BADGES[store];
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex shrink-0 rounded-[10px] transition-[opacity,transform] duration-150 ease-[var(--ease-out)] active:scale-[0.97] [@media(hover:hover)]:hover:opacity-85"
    >
      <Image
        src={b.src}
        alt={label}
        width={b.width}
        height={48}
        unoptimized
        className="block h-12 w-auto"
      />
    </a>
  );
}

/** The outlined site link beside it, with a globe so it reads as a website. */
export function SiteLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex min-h-12 items-center gap-2 rounded-full pr-6 pl-5 text-base font-semibold text-ink no-underline shadow-[inset_0_0_0_1.5px_var(--color-ink)] transition-[background-color,transform] duration-150 active:scale-[0.97] [@media(hover:hover)]:hover:bg-paper-2",
        className,
      )}
    >
      <Globe className="size-[18px] shrink-0" />
      {children}
    </a>
  );
}
