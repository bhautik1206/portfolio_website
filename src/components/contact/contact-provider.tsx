"use client";

import * as React from "react";
import { Mail } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { mailtoLink, whatsappLink, type ContactIntent } from "@/lib/contact";
import { trackEvent } from "@/lib/analytics";
import { site } from "@/data/site";

type ContactContextValue = { openContact: (intent?: ContactIntent) => void };

const ContactContext = React.createContext<ContactContextValue>({ openContact: () => {} });

export function useContact() {
  return React.useContext(ContactContext);
}

export function ContactProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  const [intent, setIntent] = React.useState<ContactIntent>({});

  const openContact = React.useCallback((next: ContactIntent = {}) => {
    setIntent(next);
    setOpen(true);
  }, []);

  const value = React.useMemo(() => ({ openContact }), [openContact]);

  return (
    <ContactContext.Provider value={value}>
      {children}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <p className="eyebrow">Let&apos;s talk</p>
          <DialogTitle className="mt-2">How would you like to reach me?</DialogTitle>
          <DialogDescription>
            I reply {site.responseTime}. Your message is prefilled, so edit it however you like.
          </DialogDescription>
          {intent.message && (
            <p className="mt-4 rounded-lg border border-border bg-secondary/60 p-3 text-sm text-secondary-foreground">
              &ldquo;{intent.message}&rdquo;
            </p>
          )}
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <a
              href={mailtoLink(intent)}
              onClick={() => trackEvent("Contact", "Click", "Email (dialog)")}
              className="group flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-md"
            >
              <span className="grid size-10 place-items-center rounded-lg bg-accent text-accent-foreground">
                <Mail className="size-5" />
              </span>
              <span>
                <span className="block text-sm font-semibold">Email me</span>
                <span className="block text-xs text-muted-foreground">Opens your mail app</span>
              </span>
            </a>
            <a
              href={whatsappLink(intent.message)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("Contact", "Click", "WhatsApp (dialog)")}
              className="group flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition hover:-translate-y-0.5 hover:border-success/60 hover:shadow-md"
            >
              <span className="grid size-10 place-items-center rounded-lg bg-success/10 text-success">
                <FaWhatsapp className="size-5" />
              </span>
              <span>
                <span className="block text-sm font-semibold">WhatsApp</span>
                <span className="block text-xs text-muted-foreground">Chat directly</span>
              </span>
            </a>
          </div>
        </DialogContent>
      </Dialog>
    </ContactContext.Provider>
  );
}
