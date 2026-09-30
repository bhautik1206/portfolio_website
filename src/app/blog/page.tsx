import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { FaMedium } from "react-icons/fa";
import { getMediumPosts } from "@/lib/medium";
import { MEDIUM_PROFILE } from "@/data/posts";
import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { Pill } from "@/components/ui/pill";
import { Button } from "@/components/ui/button";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Blog",
  description: "Articles by Bhautik Kapadiya on backend engineering, AI streaming, MCP, caching, concurrency and React.",
  alternates: { canonical: "/blog" },
};

const dateFormat = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

export default async function BlogPage() {
  const { posts } = await getMediumPosts();
  const [lead, ...rest] = posts;

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Notes from production."
        subtitle="Backend engineering, AI features and lessons learned the hard way, published on Medium."
      >
        <Button variant="outline" asChild>
          <a href={MEDIUM_PROFILE} target="_blank" rel="noopener noreferrer">
            <FaMedium />
            Follow on Medium
          </a>
        </Button>
      </PageHero>

      <section className="border-t border-border py-16 sm:py-20">
        <Container className="space-y-6">
          {lead && (
            <Reveal>
              <a
                href={lead.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid overflow-hidden rounded-2xl border border-border bg-card transition hover:border-primary/40 hover:shadow-lg md:grid-cols-2"
              >
                {lead.image && (
                  <div className="relative aspect-[16/9] bg-muted md:aspect-auto">
                    <Image src={lead.image} alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover transition duration-500 group-hover:scale-[1.03]" />
                  </div>
                )}
                <div className="flex flex-col p-7 sm:p-9">
                  <p className="eyebrow">
                    Latest · {dateFormat.format(new Date(lead.date))} · {lead.readingMinutes} min read
                  </p>
                  <h2 className="mt-4 text-2xl font-extrabold leading-tight tracking-tight group-hover:text-primary sm:text-3xl">{lead.title}</h2>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{lead.excerpt}</p>
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {lead.categories.slice(0, 4).map((c) => (
                      <Pill key={c} tone="outline">
                        {c}
                      </Pill>
                    ))}
                  </div>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-primary">
                    Read on Medium <ArrowUpRight className="size-4" />
                  </span>
                </div>
              </a>
            </Reveal>
          )}

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((post, i) => (
              <Reveal key={post.link} delay={(i % 3) * 0.05}>
                <a
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
                >
                  {post.image && (
                    <div className="relative aspect-[16/9] bg-muted">
                      <Image src={post.image} alt="" fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition duration-500 group-hover:scale-[1.03]" />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    <p className="eyebrow">
                      {dateFormat.format(new Date(post.date))} · {post.readingMinutes} min read
                    </p>
                    <h3 className="mt-3 text-lg font-bold leading-snug tracking-tight group-hover:text-primary">{post.title}</h3>
                    <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
                    <div className="mt-auto flex flex-wrap gap-1.5 pt-5">
                      {post.categories.slice(0, 3).map((c) => (
                        <Pill key={c} tone="outline" className="text-[11px]">
                          {c}
                        </Pill>
                      ))}
                    </div>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
