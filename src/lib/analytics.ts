type Gtag = (command: "event", action: string, params: Record<string, string>) => void;

export function trackEvent(category: string, action: string, label: string) {
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  gtag?.("event", action, { event_category: category, event_label: label });
}
