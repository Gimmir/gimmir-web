import { cn } from "@/lib/cn";

/** The artboard's black App Store button. A real link with its own text. */
export function AppStoreButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex h-12 items-center gap-2.5 rounded-xl bg-black px-[18px] text-[15px] font-semibold text-white no-underline transition-[background-color,transform] duration-150 hover:bg-[#222] active:scale-[0.97]"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#ffffff" aria-hidden="true">
        <path d="M16.4 12.6c0-2.6 2.1-3.8 2.2-3.9-1.2-1.8-3.1-2-3.7-2-1.6-.2-3.1.9-3.9.9-.8 0-2-.9-3.4-.9-1.7 0-3.3 1-4.2 2.6-1.8 3.1-.5 7.7 1.3 10.2.9 1.2 1.9 2.6 3.2 2.6 1.3-.1 1.8-.8 3.3-.8s2 .8 3.4.8c1.4 0 2.3-1.3 3.1-2.5 1-1.4 1.4-2.8 1.4-2.9 0 0-2.7-1-2.7-4.1zM13.9 4.9c.7-.9 1.2-2 1.1-3.2-1 0-2.3.7-3 1.6-.7.8-1.2 2-1.1 3.1 1.1.1 2.3-.6 3-1.5z" />
      </svg>
      {children}
    </a>
  );
}

/** The outlined site link beside it. */
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
        "inline-flex min-h-12 items-center rounded-full px-6 text-base font-semibold text-ink no-underline shadow-[inset_0_0_0_1.5px_var(--color-ink)] transition-[background-color,transform] duration-150 hover:bg-paper-2 active:scale-[0.97]",
        className,
      )}
    >
      {children}
    </a>
  );
}
