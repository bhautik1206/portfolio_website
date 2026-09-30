import { ArrowRight, Mail } from "lucide-react";
import { site } from "@/data/site";
import { mailtoLink } from "@/lib/contact";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { ContactButton } from "@/components/contact/contact-button";

export function FinalCTA({
  eyebrow = "Ready to ship",
  title = "Ready to ship your next feature?",
  description = `Tell me what you're building. You'll get a clear proposal ${site.responseTime}.`,
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
}) {
  return (
    <section className="border-t border-border py-20 sm:py-24">
      <Container>
        <Reveal className="relative overflow-hidden rounded-3xl border border-border bg-card px-6 py-14 text-center text-card-foreground sm:px-12">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,color-mix(in_oklab,var(--primary)_30%,transparent),transparent_60%)] opacity-70"
          />
          <p className="relative font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">{eyebrow}</p>
          <h2 className="relative mx-auto mt-4 max-w-2xl text-3xl font-extrabold tracking-tight sm:text-4xl">{title}</h2>
          <p className="relative mx-auto mt-4 max-w-xl text-muted-foreground">{description}</p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-3">
            <ContactButton size="lg" variant="invert">
              Let&apos;s talk
              <ArrowRight />
            </ContactButton>
            <Button size="lg" asChild variant="glass">
              <a href={mailtoLink()}>
                <Mail />
                {site.email}
              </a>
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
