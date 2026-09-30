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
        <Reveal className="relative overflow-hidden rounded-3xl bg-foreground px-6 py-14 text-center text-background sm:px-12">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,color-mix(in_oklab,var(--primary)_45%,transparent),transparent_60%)] opacity-60"
          />
          <p className="relative font-mono text-[11px] uppercase tracking-[0.12em] opacity-70">{eyebrow}</p>
          <h2 className="relative mx-auto mt-4 max-w-2xl text-3xl font-extrabold tracking-tight sm:text-4xl">{title}</h2>
          <p className="relative mx-auto mt-4 max-w-xl opacity-80">{description}</p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-3">
            <ContactButton size="lg" className="bg-primary text-primary-foreground">
              Let&apos;s talk
              <ArrowRight />
            </ContactButton>
            <Button size="lg" asChild className="bg-background text-foreground hover:bg-background/90">
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
