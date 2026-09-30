import Link from "next/link";
import { Clock, Mail, MapPin } from "lucide-react";
import { footerQuickLinks, site } from "@/data/site";
import { socials } from "@/data/socials";
import { services } from "@/data/services";
import { SocialIcon } from "@/components/social-icon";
import { Container } from "./container";
import { Logo } from "./logo";
import { MotionToggle } from "./motion-toggle";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border bg-card/40">
      <Container className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div className="space-y-4">
          <Logo />
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">{site.bio}</p>
          <MotionToggle />
        </div>

        <div>
          <p className="eyebrow">Quick links</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {footerQuickLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-muted-foreground transition hover:text-foreground">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow">Services</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {services.map((s) => (
              <li key={s.title}>
                <Link href="/#services" className="text-muted-foreground transition hover:text-foreground">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow">Connect</p>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li>
              <a href={`mailto:${site.email}`} className="flex items-center gap-2 transition hover:text-foreground">
                <Mail className="size-4 shrink-0" />
                {site.email}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="size-4 shrink-0" />
              Based in {site.baseLocation} · {site.timezoneLabel}
            </li>
            <li className="flex items-center gap-2">
              <Clock className="size-4 shrink-0" />
              Replies {site.responseTime}
            </li>
          </ul>
          <div className="mt-5 flex flex-wrap gap-2">
            {socials.map((s) => (
              <a
                key={s.key}
                href={s.href}
                target={s.key === "email" ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={s.label}
                title={s.label}
                className="grid size-9 place-items-center rounded-lg border border-border bg-card text-muted-foreground transition hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary"
              >
                <SocialIcon name={s.key} className="size-4" />
              </a>
            ))}
          </div>
        </div>
      </Container>
      <div className="border-t border-border">
        <Container className="flex flex-col items-center justify-between gap-3 py-6 text-xs text-muted-foreground sm:flex-row">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <a href="/old-version" className="font-mono uppercase tracking-[0.12em] transition hover:text-foreground">
            View old version →
          </a>
        </Container>
      </div>
    </footer>
  );
}
