"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowUpRight, Download, Menu } from "lucide-react";
import { navLinks, site } from "@/data/site";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useContact } from "@/components/contact/contact-provider";
import { ThemeToggle } from "./theme-toggle";

function isActive(pathname: string, href: string) {
  if (href.startsWith("/#")) return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function LogoMark() {
  return (
    <Link href="/" aria-label={`${site.name} home`} className="group relative z-20 flex items-center gap-3">
      <span className="flex size-9 items-center justify-center rounded-lg bg-foreground text-background shadow-2xs transition-transform group-hover:scale-105">
        <span className="text-sm font-bold">{site.monogram}</span>
      </span>
    </Link>
  );
}

function ResumeButton({ className }: { className?: string }) {
  return (
    <a
      href={site.resumeUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent("Resume", "Click", "Resume Button")}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border border-border bg-secondary/90 px-3.5 py-2 font-mono text-xs font-semibold uppercase tracking-wider text-foreground shadow-2xs transition-colors hover:bg-secondary",
        className,
      )}
    >
      <Download className="size-3.5 text-primary" />
      Resume
    </a>
  );
}

function BookCallButton({ className, onClick }: { className?: string; onClick?: () => void }) {
  const { openContact } = useContact();
  return (
    <button
      type="button"
      onClick={() => {
        onClick?.();
        openContact({ subject: "Book a call", message: "Hello Bhautik, I'd like to book a quick call to discuss a project." });
      }}
      className={cn(
        "group relative inline-flex items-center gap-1.5 overflow-hidden rounded-md bg-foreground px-4 py-2 text-center font-mono text-xs font-semibold uppercase tracking-wider text-background shadow-xs transition-all duration-200 hover:bg-foreground/90",
        className,
      )}
    >
      Book Call
      <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-px group-hover:translate-x-px" />
    </button>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [hovered, setHovered] = React.useState<string | null>(null);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40 w-full">
      {/* Desktop */}
      <div className="pointer-events-auto relative z-[60] mx-auto hidden w-full max-w-7xl flex-row items-center justify-between px-6 py-6 lg:flex">
        <LogoMark />

        <nav
          aria-label="Main"
          onMouseLeave={() => setHovered(null)}
          className="flex flex-row items-center gap-1 rounded-full border border-frame-border bg-white/90 px-2.5 py-1.5 shadow-xs backdrop-blur-xl dark:bg-zinc-900/90"
        >
          {navLinks.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onMouseEnter={() => setHovered(link.href)}
                aria-current={active ? "page" : undefined}
                className="relative block px-3.5 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors duration-200"
              >
                {hovered === link.href && (
                  <motion.span
                    layoutId="nav-hover"
                    className="absolute inset-0 rounded-full border border-frame-border bg-zinc-100 dark:bg-zinc-800/80"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                <span
                  className={cn(
                    "relative z-10 font-medium transition-colors duration-200",
                    active ? "text-primary" : "text-zinc-600 dark:text-zinc-300",
                  )}
                >
                  {link.label}
                </span>
                {active && (
                  <motion.span
                    layoutId="nav-active-dot"
                    className="absolute bottom-0 left-1/2 z-10 size-1 -translate-x-1/2 rounded-full bg-primary"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <ResumeButton />
          <BookCallButton />
        </div>
      </div>

      {/* Mobile */}
      <div className="pointer-events-auto relative z-50 flex w-full items-center justify-between px-4 py-4 lg:hidden">
        <LogoMark />
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Open menu"
                className="flex size-9 items-center justify-center rounded-md border border-border bg-secondary/90 text-foreground backdrop-blur-md"
              >
                <Menu className="size-4" />
              </button>
            </SheetTrigger>
            <SheetContent>
              <SheetTitle className="eyebrow">Menu</SheetTitle>
              <nav className="flex flex-col gap-1" aria-label="Mobile">
                {navLinks.map((link) => (
                  <SheetClose asChild key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        "rounded-lg px-3 py-3 font-mono text-sm uppercase tracking-wider transition hover:bg-accent",
                        isActive(pathname, link.href) ? "text-primary" : "text-foreground",
                      )}
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
              <div className="mt-auto flex flex-col gap-2">
                <ResumeButton className="justify-center py-3" />
                <SheetClose asChild>
                  <BookCallButton className="justify-center py-3" />
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
