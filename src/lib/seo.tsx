import type { Metadata } from "next";
import { site } from "@/data/site";
import { socials } from "@/data/socials";
import { experience } from "@/data/experience";
import { education } from "@/data/education";
import { stackGroups } from "@/data/stack";
import { services } from "@/data/services";

type PageMeta = {
  title: string;
  description: string;
  path: string;
  image?: string;
  keywords?: string[];
  type?: "website" | "article" | "profile";
};

export const baseKeywords = [
  "Bhautik Kapadiya",
  "Gen AI Engineer",
  "Full-Stack Developer",
  "Backend Developer",
  "RAG pipelines",
  "AI agents",
  ".NET developer",
  "React developer",
  "Angular developer",
  "Next.js developer",
  "Freelance web developer Vadodara",
  "Hire AI engineer India",
];

export function pageMetadata({ title, description, path, image, keywords = [], type = "website" }: PageMeta): Metadata {
  const url = `${site.url}${path}`;
  const images = image ? [{ url: image, alt: title }] : undefined;
  return {
    title,
    description,
    keywords: [...keywords, ...baseKeywords],
    alternates: { canonical: path },
    openGraph: { type, url, title: `${title} | ${site.name}`, description, siteName: site.name, locale: "en_IN", ...(images && { images }) },
    twitter: { card: "summary_large_image", title: `${title} | ${site.name}`, description, creator: "@bhautikkapadiy6", ...(images && { images }) },
  };
}

export const PERSON_ID = `${site.url}/#person`;
export const WEBSITE_ID = `${site.url}/#website`;

export const personSchema = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: site.name,
  givenName: "Bhautik",
  familyName: "Kapadiya",
  url: site.url,
  image: `${site.url}/opengraph-image`,
  email: `mailto:${site.email}`,
  jobTitle: "Gen AI Engineer & Full-Stack Developer",
  description: site.bio,
  worksFor: { "@type": "Organization", name: experience[0].company },
  alumniOf: { "@type": "CollegeOrUniversity", name: education[0].institution },
  address: { "@type": "PostalAddress", addressLocality: "Vadodara", addressRegion: "Gujarat", addressCountry: "IN" },
  knowsAbout: stackGroups.flatMap((g) => g.items),
  sameAs: socials.filter((s) => s.key !== "email" && s.key !== "whatsapp").map((s) => s.href),
};

export const websiteSchema = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: site.url,
  name: site.name,
  description: site.description,
  inLanguage: "en",
  publisher: { "@id": PERSON_ID },
};

export const professionalServiceSchema = {
  "@type": "ProfessionalService",
  "@id": `${site.url}/#service`,
  name: `${site.name} — AI & Full-Stack Development`,
  url: `${site.url}/hire-me`,
  image: `${site.url}/opengraph-image`,
  description: "Freelance AI agents, RAG pipelines, full-stack web applications, backend APIs and business websites.",
  founder: { "@id": PERSON_ID },
  provider: { "@id": PERSON_ID },
  email: site.email,
  areaServed: "Worldwide",
  address: { "@type": "PostalAddress", addressLocality: "Vadodara", addressRegion: "Gujarat", addressCountry: "IN" },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services",
    itemListElement: services.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s.title, description: s.description },
    })),
  },
};

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: `${site.url}${it.path}` })),
  };
}

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  const graph = { "@context": "https://schema.org", "@graph": Array.isArray(data) ? data : [data] };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }} />;
}
