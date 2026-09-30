import {
  Bot,
  Building2,
  Code2,
  Eye,
  FileText,
  Gauge,
  GitBranch,
  Handshake,
  Layers,
  LifeBuoy,
  Lock,
  MessageSquare,
  Palette,
  Rocket,
  Server,
  ShieldCheck,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";
import type { IconKey } from "@/data/offers";

const map: Record<IconKey, typeof Bot> = {
  rocket: Rocket,
  bot: Bot,
  code: Code2,
  building: Building2,
  shield: ShieldCheck,
  file: FileText,
  server: Server,
  life: LifeBuoy,
  zap: Zap,
  eye: Eye,
  handshake: Handshake,
  layers: Layers,
  palette: Palette,
  users: Users,
  lock: Lock,
  git: GitBranch,
  message: MessageSquare,
  gauge: Gauge,
  sparkles: Sparkles,
};

export function OfferIcon({ name, className }: { name: IconKey; className?: string }) {
  const Icon = map[name];
  return <Icon className={className} aria-hidden />;
}
