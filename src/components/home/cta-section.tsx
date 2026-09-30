import { Mail } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { site } from "@/data/site";
import { mailtoLink, whatsappLink } from "@/lib/contact";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { ContactForm } from "./contact-form";

export function CTASection() {
  return (
    <Section id="contact" size="chapter" title="Your next idea." titleMuted="Let's make it work." description={`Have a project, a feature or an idea? Send a message and I'll reply ${site.responseTime}.`}>
      <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
        <Reveal className="flex flex-col justify-between gap-8 rounded-2xl border border-border bg-card p-8 text-card-foreground">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">Prefer a quick chat?</p>
            <p className="mt-3 text-2xl font-extrabold leading-tight tracking-tight">
              Reach me directly by email or WhatsApp. No forms, no waiting.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <Button asChild size="lg" variant="invert">
              <a href={mailtoLink()}>
                <Mail />
                Email me
              </a>
            </Button>
            <Button asChild size="lg" className="bg-success text-white hover:bg-success/90">
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                <FaWhatsapp />
                WhatsApp
              </a>
            </Button>
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  );
}
