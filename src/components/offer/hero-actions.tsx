import { ArrowRight, CheckCircle2, Mail } from "lucide-react";
import { mailtoLink, type ContactIntent } from "@/lib/contact";
import { Button } from "@/components/ui/button";
import { ContactButton } from "@/components/contact/contact-button";

export function HeroActions({ primary, intent, badges }: { primary: string; intent?: ContactIntent; badges?: string[] }) {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3">
        <ContactButton size="lg" intent={intent}>
          {primary}
          <ArrowRight />
        </ContactButton>
        <Button size="lg" variant="outline" asChild>
          <a href={mailtoLink(intent)}>
            <Mail />
            Send me your project
          </a>
        </Button>
      </div>
      {badges && (
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-muted-foreground">
          {badges.map((b) => (
            <li key={b} className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="size-4 text-success" />
              {b}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
