import "server-only";
import Parser from "rss-parser";
import { fallbackPosts, MEDIUM_FEED, type Post } from "@/data/posts";

type MediumItem = { "content:encoded"?: string };

function cleanTitle(title: string) {
  return title.replace(/^[\s️​]+/, "").trim();
}

function toPost(item: Parser.Item & MediumItem): Post {
  const html = item["content:encoded"] ?? item.content ?? "";
  const image = html.match(/<img[^>]+src="([^"]+)"/)?.[1] ?? null;
  const text = html
    .replace(/<figure[\s\S]*?<\/figure>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const words = text ? text.split(" ").length : 0;
  const excerpt = text.length > 200 ? `${text.slice(0, 200).replace(/\s+\S*$/, "")}…` : text;
  return {
    title: cleanTitle(item.title ?? "Untitled"),
    link: (item.link ?? "").split("?")[0],
    date: item.isoDate ?? item.pubDate ?? new Date().toISOString(),
    categories: item.categories ?? [],
    image,
    readingMinutes: Math.max(1, Math.round(words / 230)),
    excerpt,
  };
}

export async function getMediumPosts(): Promise<{ posts: Post[]; live: boolean }> {
  try {
    const res = await fetch(MEDIUM_FEED, { next: { revalidate: 86400 }, headers: { "User-Agent": "bhautik.co.in" } });
    if (!res.ok) throw new Error(`Medium feed returned ${res.status}`);
    const feed = await new Parser<unknown, MediumItem>().parseString(await res.text());
    const posts = feed.items.map(toPost).filter((p) => p.link);
    if (posts.length === 0) throw new Error("Medium feed was empty");
    return { posts, live: true };
  } catch {
    return { posts: fallbackPosts, live: false };
  }
}
