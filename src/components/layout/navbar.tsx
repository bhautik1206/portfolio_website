"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, Menu } from "lucide-react";
import { navLinks, site } from "@/data/site";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ContactButton } from "@/components/contact/contact-button";
import { Container } from "./container";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";

function isActive(pathname: string, href: string) {
  if (href.startsWith("/#")) return false;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b transition-colors duration-200",
        scrolled ? "border-border bg-background/80 backdrop-blur-lg" : "border-transparent bg-background/0",
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-4">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition hover:text-foreground",
                isActive(pathname, link.href) && "text-foreground",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          <Button variant="ghost" size="sm" asChild className="hidden sm:inline-flex">
            <a href={site.resumeUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("Resume", "Click", "Resume Button")}>
              <FileText />
              Resume
            </a>
          </Button>
          <ContactButton size="sm" className="hidden sm:inline-flex">
            Let&apos;s Talk
          </ContactButton>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetTitle className="eyebrow">Menu</SheetTitle>
              <nav className="flex flex-col gap-1" aria-label="Mobile">
                {navLinks.map((link) => (
                  <SheetClose asChild key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        "rounded-lg px-3 py-3 text-base font-semibold transition hover:bg-accent",
                        isActive(pathname, link.href) && "text-primary",
                      )}
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
              <div className="mt-auto flex flex-col gap-2">
                <Button variant="outline" asChild>
                  <a href={site.resumeUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("Resume", "Click", "Resume Button")}>
                    <FileText />
                    Resume
                  </a>
                </Button>
                <SheetClose asChild>
                  <ContactButton>Let&apos;s Talk</ContactButton>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </header>
  );
}
