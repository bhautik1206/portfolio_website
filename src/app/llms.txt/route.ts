import { site } from "@/data/site";
import { socials } from "@/data/socials";
import { experience } from "@/data/experience";
import { education } from "@/data/education";
import { services } from "@/data/services";
import { stackGroups } from "@/data/stack";
import { clientProjects, personalProjects } from "@/data/projects";
import { hireMe } from "@/data/offers";
import { yearsOfExperience } from "@/data/metrics";

export const dynamic = "force-static";
export const revalidate = 86400;

// llms.txt (https://llmstxt.org): a plain-markdown summary that answer engines can read and cite.
export function GET() {
  const lines = [
    `# ${site.name}`,
    "",
    `> ${site.name} is a Gen AI Engineer and Full-Stack Developer based in ${site.baseLocation} (${site.timezoneLabel}). ${site.bio}`,
    "",
    "## Quick facts",
    `- Role: ${experience[0].role} at ${experience[0].company} (current)`,
    `- Experience: ${yearsOfExperience()}+ years, freelancing since 2022`,
    `- Client projects: ${clientProjects.length}+ websites, stores and web apps`,
    `- Location: ${site.baseLocation}, works with clients worldwide`,
    `- Contact: ${site.email} · WhatsApp +${site.whatsappNumber} · replies ${site.responseTime}`,
    `- Resume: ${site.resumeUrl}`,
    "",
    "## Services",
    ...services.map((s) => `- **${s.title}**: ${s.description}`),
    "",
    "## Experience",
    ...experience.map((j) => `- **${j.role}, ${j.company}** (${j.duration}): ${j.highlights[0]} Tech: ${j.tech.join(", ")}.`),
    "",
    "## Education",
    ...education.map((e) => `- ${e.qualification}, ${e.institution} (${e.duration}), ${e.grade}`),
    "",
    "## Tech stack",
    ...stackGroups.map((g) => `- ${g.title}: ${g.items.join(", ")}`),
    "",
    "## Client case studies",
    ...clientProjects.map(
      (p) => `- [${p.name}](${site.url}/case-studies/${p.slug}): ${p.summary}${p.stack.length ? ` Stack: ${p.stack.join(", ")}.` : ""}`,
    ),
    "",
    "## Personal projects",
    ...personalProjects.map((p) => `- [${p.name}](${site.url}/case-studies/${p.slug}): ${p.summary}`),
    "",
    "## Frequently asked questions",
    ...hireMe.faq.flatMap((f) => [`### ${f.q}`, f.a, ""]),
    "## Pages",
    `- [Home](${site.url}/)`,
    `- [Case studies](${site.url}/case-studies)`,
    `- [Hire me](${site.url}/hire-me)`,
    `- [For startups](${site.url}/for-startups)`,
    `- [For agencies](${site.url}/for-agencies)`,
    `- [Blog](${site.url}/blog)`,
    `- [How I build](${site.url}/how-i-build)`,
    "",
    "## Profiles",
    ...socials.filter((s) => s.key !== "email" && s.key !== "whatsapp").map((s) => `- ${s.label}: ${s.href}`),
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
