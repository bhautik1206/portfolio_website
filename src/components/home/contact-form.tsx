"use client";

import * as React from "react";
import emailjs from "@emailjs/browser";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type Status = "idle" | "sending" | "sent" | "error";

const fieldClass =
  "block w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20";

export function ContactForm() {
  const [form, setForm] = React.useState({ name: "", email: "", message: "" });
  const [status, setStatus] = React.useState<Status>("idle");

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    try {
      await emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID as string,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID as string,
        form,
        { publicKey: process.env.REACT_APP_EMAILJS_USER_ID as string },
      );
      trackEvent("Contact", "Submit", "Contact form");
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-border bg-card p-10 text-center">
        <CheckCircle2 className="size-10 text-success" />
        <p className="mt-4 text-lg font-bold">Message sent!</p>
        <p className="mt-1 text-sm text-muted-foreground">Thanks for reaching out. I&apos;ll reply within 24 hours.</p>
        <Button variant="outline" className="mt-6" onClick={() => setStatus("idle")}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-border bg-card p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold">Name</span>
          <input name="name" required value={form.name} onChange={onChange} placeholder="Your name" className={fieldClass} autoComplete="name" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold">Email</span>
          <input
            name="email"
            type="email"
            required
            value={form.email}
            onChange={onChange}
            placeholder="you@company.com"
            className={fieldClass}
            autoComplete="email"
          />
        </label>
      </div>
      <label className="block">
        <span className="mb-1.5 block text-sm font-semibold">Message</span>
        <textarea
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={onChange}
          placeholder="Tell me about your project, timeline and goals."
          className={cn(fieldClass, "resize-y")}
        />
      </label>
      {status === "error" && (
        <p className="text-sm font-medium text-destructive" role="alert">
          Something went wrong sending your message. Please try again or use email / WhatsApp.
        </p>
      )}
      <Button type="submit" size="lg" disabled={status === "sending"} className="w-full sm:w-auto">
        {status === "sending" ? <Loader2 className="animate-spin" /> : <Send />}
        {status === "sending" ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
