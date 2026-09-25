"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { BookTrigger } from "@/components/blocks/book-trigger";
import { FaceStack } from "@/components/blocks/face-stack";
import { useHeaderTheme } from "@/components/site/header-theme";
import { ArrowRight } from "@/components/ui/icons";
import { Logomark } from "@/components/ui/logomark";
import { cn } from "@/lib/cn";
import { BOOK_DOORS, CONTACT_EMAIL, NAV } from "@/content/site";

const links = NAV.filter((l) => l.ready !== false);

/**
 * Fixed bar. Reads whatever section is under it (`data-tone="ink"`) and
 * flips to light type there. "Book a call" opens a two-option menu: one
 * call per buyer, each with the faces you'll meet.
 */
export function Header() {
  const pathname = usePathname();
  const forcedDark = useHeaderTheme().dark;
  const [scrolled, setScrolled] = useState(false);
  const [overInk, setOverInk] = useState(false);
  const [menu, setMenu] = useState(false); // mobile panel
  const [book, setBook] = useState(false); // booking popover
  const bookRef = useRef<HTMLDivElement>(null);
  const bookBtn = useRef<HTMLButtonElement>(null);

  const dark = (overInk || forcedDark) && !menu;

  // A new page: close the menus and re-read the tone (adjusting state
  // during render, so the first frame of the new page is already right).
  const [shownPath, setShownPath] = useState(pathname);
  if (pathname !== shownPath) {
    setShownPath(pathname);
    setMenu(false);
    setBook(false);
    setOverInk(false);
  }

  // Which tone sits under the bar: a thin band at the top of the viewport.
  useEffect(() => {
    const els = Array.from(document.querySelectorAll('[data-tone="ink"]'));
    if (!els.length) return;
    const under = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) under.add(e.target);
          else under.delete(e.target);
        }
        setOverInk(under.size > 0);
      },
      { rootMargin: "0px 0px -92% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menu]);

  useEffect(() => {
    if (!book) return;
    const onDown = (e: PointerEvent) => {
      if (!bookRef.current?.contains(e.target as Node)) setBook(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setBook(false);
        bookBtn.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [book]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenu(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      {/* mobile panel: a sibling of the bar, so the bar's backdrop blur
          doesn't become its containing block */}
      <div
        id="mobile-menu"
        inert={!menu}
        className={cn(
          "fixed inset-0 z-40 flex flex-col overflow-y-auto bg-ink px-5 pb-10 pt-24 text-paper transition-[opacity,transform] duration-300 ease-[cubic-bezier(.32,.72,0,1)] lg:hidden",
          menu ? "opacity-100" : "pointer-events-none -translate-y-2 opacity-0",
        )}
      >
        <nav aria-label="Mobile" className="flex flex-col">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className="display border-b border-line-dark py-4 text-[34px] leading-none aria-[current=page]:text-paper/45"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <p className="mt-10 text-sm font-medium text-paper/45">
          Book a call
        </p>
        <div className="mt-4 flex flex-col gap-3">
          {BOOK_DOORS.map((d) => (
            <BookTrigger
              key={d.id}
              booking={d.booking}
              placement="mobile-menu"
              onClick={() => setMenu(false)}
              className="flex items-center gap-4 rounded-[20px] border border-line-dark p-4 text-left"
            >
              <FaceStack ids={d.faces} size={40} ring="ink" />
              <span className="min-w-0">
                <span className="block font-semibold">{d.title}</span>
                <span className="block text-sm text-paper/60">{d.detail}</span>
              </span>
            </BookTrigger>
          ))}
        </div>
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="mt-auto pt-10 text-sm text-paper/60"
        >
          {CONTACT_EMAIL}
        </a>
      </div>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,padding] duration-300",
          scrolled && !menu
            ? dark
              ? "border-line-dark bg-ink/80 py-3 backdrop-blur-md"
              : "border-line bg-paper/85 py-3 backdrop-blur-md"
            : "border-transparent py-[18px]",
        )}
      >
        <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-6 px-5 sm:px-6 md:px-10">
          <Link
            href="/"
            aria-label="Gimmir, home"
            className={cn(
              "flex items-center gap-2 text-[22px] font-extrabold tracking-tight transition-colors duration-300",
              dark || menu ? "text-paper" : "text-ink",
            )}
          >
            <Logomark className="size-7" />
            Gimmir
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
            {links.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "whitespace-nowrap text-[15px] font-medium transition-colors duration-200",
                  dark
                    ? "text-paper/65 hover:text-paper aria-[current=page]:text-paper"
                    : "text-muted hover:text-ink aria-[current=page]:text-ink",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div ref={bookRef} className="relative hidden lg:block">
            <button
              ref={bookBtn}
              type="button"
              aria-expanded={book}
              aria-controls="book-menu"
              onClick={() => setBook((v) => !v)}
              className={cn(
                "inline-flex h-11 items-center gap-2 rounded-full pl-5 pr-4 text-[15px] font-semibold transition-[background-color,color,transform] duration-200 ease-[cubic-bezier(.23,1,.32,1)] active:scale-[.97]",
                dark
                  ? "bg-paper text-ink hover:bg-paper-2"
                  : "bg-ink text-paper hover:bg-ink-soft",
              )}
            >
              Book a call
              <svg
                aria-hidden
                viewBox="0 0 16 16"
                className={cn(
                  "size-4 transition-transform duration-200",
                  book && "rotate-180",
                )}
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 6l4 4 4-4" />
              </svg>
            </button>

            <div
              id="book-menu"
              inert={!book}
              className={cn(
                "absolute right-0 top-[calc(100%+12px)] w-[380px] origin-top-right rounded-[24px] bg-surface p-2 text-ink shadow-[0_24px_60px_-24px_rgba(21,20,14,0.45)] ring-1 ring-ink/5 transition-[opacity,transform] duration-200 ease-[cubic-bezier(.23,1,.32,1)]",
                book ? "scale-100 opacity-100" : "pointer-events-none scale-[.96] opacity-0",
              )}
            >
              {BOOK_DOORS.map((d) => (
                <BookTrigger
                  key={d.id}
                  booking={d.booking}
                  placement="header-menu"
                  onClick={() => setBook(false)}
                  className="group flex w-full items-center gap-4 rounded-[18px] p-3.5 text-left transition-colors duration-150 hover:bg-paper"
                >
                  <FaceStack ids={d.faces} size={44} ring="surface" />
                  <span className="min-w-0 flex-1">
                    <span className="block text-[15px] font-semibold">{d.title}</span>
                    <span className="block text-sm text-muted">{d.detail}</span>
                  </span>
                  <ArrowRight className="size-[18px] text-faint transition-[transform,color] duration-200 group-hover:translate-x-0.5 group-hover:text-ink" />
                </BookTrigger>
              ))}
              <Link
                href="/contact"
                onClick={() => setBook(false)}
                className="mt-1 flex items-center justify-between rounded-[18px] px-3.5 py-3 text-sm text-muted transition-colors hover:text-ink"
              >
                Not sure? Compare both calls
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>

          <button
            type="button"
            className="-mr-2 flex size-11 touch-manipulation items-center justify-center lg:hidden"
            aria-label={menu ? "Close menu" : "Open menu"}
            aria-expanded={menu}
            aria-controls="mobile-menu"
            onClick={() => setMenu((v) => !v)}
          >
            <span className="relative block h-[14px] w-6">
              <span
                className={cn(
                  "absolute left-0 block h-[2px] w-6 transition-[transform,top,bottom,background-color] duration-300",
                  dark || menu ? "bg-paper" : "bg-ink",
                  menu ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0",
                )}
              />
              <span
                className={cn(
                  "absolute bottom-0 left-0 block h-[2px] w-6 transition-[transform,top,bottom,background-color] duration-300",
                  dark || menu ? "bg-paper" : "bg-ink",
                  menu ? "bottom-1/2 translate-y-1/2 -rotate-45" : "",
                )}
              />
            </span>
          </button>
        </div>
      </header>
    </>
  );
}
