export type SocialKey =
  | "github"
  | "linkedin"
  | "x"
  | "stackoverflow"
  | "instagram"
  | "whatsapp"
  | "medium"
  | "email";

export const socials: { key: SocialKey; label: string; href: string }[] = [
  { key: "github", label: "GitHub", href: "https://github.com/bhautik1206" },
  { key: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/bhautik-kapadiya/" },
  { key: "x", label: "X", href: "https://x.com/bhautikkapadiy6" },
  { key: "stackoverflow", label: "Stack Overflow", href: "https://stackoverflow.com/users/16425368/bhautik" },
  { key: "instagram", label: "Instagram", href: "https://www.instagram.com/bhautik_6/" },
  {
    key: "whatsapp",
    label: "WhatsApp",
    href: "https://api.whatsapp.com/send/?phone=917043624799&text=" + encodeURIComponent("Hello Bhautik, I'd like to talk about a project."),
  },
  { key: "medium", label: "Medium", href: "https://medium.com/@bhautikk" },
  { key: "email", label: "Email", href: "mailto:bhautikkapadiya06@gmail.com" },
];
