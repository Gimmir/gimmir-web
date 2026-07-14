import Link from "next/link";

import { cn } from "@/lib/cn";
import { ArrowRight } from "./icons";

type Variant = "solid" | "outline" | "outlineLight" | "lime";
type Size = "md" | "sm";

const base =
  "group inline-flex items-center justify-center gap-2.5 rounded-full font-semibold transition-[background-color,color,transform] duration-200 ease-[cubic-bezier(.23,1,.32,1)] active:scale-[.97]";

const variants: Record<Variant, string> = {
  solid: "bg-ink text-paper hover:bg-lime hover:text-ink",
  outline: "border border-ink text-ink hover:bg-ink hover:text-paper",
  outlineLight: "border border-paper/25 text-paper hover:bg-paper hover:text-ink",
  lime: "bg-lime text-ink hover:bg-lime-deep",
};

const sizes: Record<Size, string> = {
  md: "h-[52px] px-7 text-base",
  sm: "h-11 px-5 text-[15px]",
};

export function Button({
  href,
  children,
  variant = "solid",
  size = "md",
  arrow = false,
  className,
  onClick,
}: {
  href?: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  className?: string;
  onClick?: () => void;
}) {
  const classes = cn(base, variants[variant], sizes[size], className);
  const content = (
    <>
      {children}
      {arrow ? (
        <ArrowRight className="size-[18px] transition-transform duration-200 group-hover:translate-x-0.5" />
      ) : null}
    </>
  );

  if (!href) {
    return (
      <button type="button" className={classes} onClick={onClick}>
        {content}
      </button>
    );
  }
  if (/^(https?:|mailto:|tel:)/.test(href)) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        onClick={onClick}
      >
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} onClick={onClick}>
      {content}
    </Link>
  );
}
