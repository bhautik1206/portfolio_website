import Link from "next/link";
import { site } from "@/data/site";

export function Logo() {
  return (
    <Link href="/" className="group flex items-center gap-2.5" aria-label={`${site.name} home`}>
      <span className="grid size-9 place-items-center rounded-lg bg-foreground font-mono text-sm font-bold text-background transition group-hover:bg-primary group-hover:text-primary-foreground">
        {site.monogram}
      </span>
      <span className="hidden text-sm font-bold tracking-tight sm:block">{site.name}</span>
    </Link>
  );
}
