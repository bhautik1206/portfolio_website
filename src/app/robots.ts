import type { MetadataRoute } from "next";
import { site } from "@/data/site";

// Answer engines are explicitly welcome so the site can be cited in AI search results.
const aiCrawlers = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Bingbot",
  "DuckAssistBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: "/old-version/" },
      { userAgent: aiCrawlers, allow: ["/", "/llms.txt"], disallow: "/old-version/" },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
