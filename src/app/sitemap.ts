import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { projects } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const pages: { path: string; priority: number; changeFrequency: "weekly" | "monthly" }[] = [
    { path: "", priority: 1, changeFrequency: "weekly" },
    { path: "/hire-me", priority: 0.9, changeFrequency: "monthly" },
    { path: "/case-studies", priority: 0.9, changeFrequency: "weekly" },
    { path: "/for-startups", priority: 0.8, changeFrequency: "monthly" },
    { path: "/for-agencies", priority: 0.8, changeFrequency: "monthly" },
    { path: "/blog", priority: 0.7, changeFrequency: "weekly" },
    { path: "/how-i-build", priority: 0.6, changeFrequency: "monthly" },
  ];
  return [
    ...pages.map((p) => ({ url: `${site.url}${p.path}`, lastModified, changeFrequency: p.changeFrequency, priority: p.priority })),
    ...projects.map((p) => ({
      url: `${site.url}/case-studies/${p.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: p.personal ? 0.4 : 0.6,
      images: [`${site.url}${p.image}`],
    })),
  ];
}
