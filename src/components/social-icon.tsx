import { FaGithub, FaInstagram, FaLinkedin, FaMedium, FaStackOverflow, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Mail } from "lucide-react";
import type { SocialKey } from "@/data/socials";

const icons = {
  github: FaGithub,
  linkedin: FaLinkedin,
  x: FaXTwitter,
  stackoverflow: FaStackOverflow,
  instagram: FaInstagram,
  whatsapp: FaWhatsapp,
  medium: FaMedium,
  email: Mail,
} as const;

export function SocialIcon({ name, className }: { name: SocialKey; className?: string }) {
  const Icon = icons[name];
  return <Icon className={className} aria-hidden />;
}
