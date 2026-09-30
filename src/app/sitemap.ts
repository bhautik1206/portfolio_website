import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { projects } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/case-studies", "/hire-me", "/for-startups", "/for-agencies", "/blog", "/how-i-build"];
  return [
    ...pages.map((p) => ({ url: `${site.url}${p}`, changeFrequency: "weekly" as const, priority: p === "" ? 1 : 0.8 })),
    ...projects.map((p) => ({ url: `${site.url}/case-studies/${p.slug}`, changeFrequency: "monthly" as const, priority: 0.6 })),
  ];
}
