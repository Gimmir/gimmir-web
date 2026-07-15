"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Logomark } from "@/components/ui/logomark";
import { useHeaderTheme } from "@/components/site/header-theme";
import { cn } from "@/lib/cn";
import type { NAVIGATION_QUERY_RESULT } from "@/sanity/types";

type Nav = NonNullable<NAVIGATION_QUERY_RESULT>;

export function Header({ nav }: { nav: Nav | null }) {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const { dark } = useHeaderTheme();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);

  // Light header content while sitting over a dark hero (before scroll / menu).
  const light = dark && !scrolled && !open;

  const links = nav?.headerLinks ?? [];
  const ctaLabel = nav?.headerCtaLabel ?? "Book a review call";

  // On-page anchors (#top) only work on the home page; elsewhere prefix "/".
  const resolve = (anchor: string) =>
    anchor.startsWith("#") ? (onHome ? anchor : `/${anchor}`) : anchor;

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      const h = document.documentElement.scrollHeight - window.innerHeight;
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${h > 0 ? Math.min(1, y / h) : 0})`;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      {/* mobile menu panel — a sibling of the header so it is positioned against
          the viewport (the header's backdrop-blur would otherwise make it the
          containing block and shrink this to the bar). */}
      <div
        id="mobile-menu"
        className={cn(
          "fixed inset-0 z-40 flex flex-col bg-paper px-6 pb-10 pt-24 transition-transform duration-300 ease-[cubic-bezier(.32,.72,0,1)] lg:hidden",
          open ? "translate-x-0" : "pointer-events-none translate-x-full",
        )}
      >
        <nav aria-label="Mobile" className="flex flex-col">
          {links.map((item) => (
            <Link
              key={item._key}
              href={resolve(item.anchor ?? "#")}
              onClick={() => setOpen(false)}
              className="display border-b border-line py-4 text-[30px] leading-none"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Button
          cal
          className="mt-8 self-start"
          onClick={() => setOpen(false)}
        >
          {ctaLabel}
        </Button>
      </div>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,padding] duration-300",
          scrolled || open
            ? "border-b border-line bg-paper/85 py-3 backdrop-blur-md"
            : "border-b border-transparent py-[18px]",
        )}
      >
        {/* scroll progress */}
        <div
          ref={progressRef}
          className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-lime"
          aria-hidden
        />

        {/* bar */}
        <div className="relative mx-auto flex max-w-[1280px] items-center justify-between gap-6 px-5 md:px-10">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className={cn(
            "flex items-center gap-2 text-[22px] font-extrabold tracking-tight transition-colors",
            light ? "text-paper" : "text-ink",
          )}
        >
          <Logomark className={cn("size-7", light ? "text-paper" : "text-ink")} />
          Gimmir
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
          {links.map((item) => (
            <Link
              key={item._key}
              href={resolve(item.anchor ?? "#")}
              className={cn(
                "text-[15px] font-medium transition-colors",
                light
                  ? "text-paper/70 hover:text-paper"
                  : "text-muted hover:text-ink",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button
            cal
            size="sm"
            variant={light ? "outlineLight" : "solid"}
          >
            {ctaLabel}
          </Button>
        </div>

        <button
          type="button"
          className="-mr-2 flex size-11 touch-manipulation items-center justify-center lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="relative block h-[14px] w-6">
            <span
              className={cn(
                "absolute left-0 block h-[2px] w-6 transition-all duration-300",
                light ? "bg-paper" : "bg-ink",
                open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0",
              )}
            />
            <span
              className={cn(
                "absolute bottom-0 left-0 block h-[2px] w-6 transition-all duration-300",
                light ? "bg-paper" : "bg-ink",
                open ? "bottom-1/2 translate-y-1/2 -rotate-45" : "",
              )}
            />
          </span>
        </button>
        </div>
      </header>
    </>
  );
}
