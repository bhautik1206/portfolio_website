import { site } from "@/data/site";

export type ContactIntent = {
  subject?: string;
  message?: string;
};

const DEFAULT_MESSAGE = "Hello Bhautik, I'd like to talk about a project.";

export function whatsappLink(message = DEFAULT_MESSAGE) {
  return `https://api.whatsapp.com/send/?phone=${site.whatsappNumber}&text=${encodeURIComponent(message)}`;
}

export function mailtoLink({ subject = "Project enquiry", message = DEFAULT_MESSAGE }: ContactIntent = {}) {
  const body = `${message}\n\nName:\nCompany / website:\nBudget & timeline:\n`;
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function packageIntent(pkg: string, context?: string): ContactIntent {
  const suffix = context ? ` (${context})` : "";
  return {
    subject: `Enquiry: ${pkg}`,
    message: `Hello Bhautik, I'm interested in the ${pkg}${suffix}. Could you share a quote?`,
  };
}
