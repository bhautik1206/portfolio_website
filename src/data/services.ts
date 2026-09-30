export type Service = { icon: "bot" | "database" | "sparkles" | "layers" | "server" | "globe"; title: string; description: string; tags: string[] };

export const services: Service[] = [
  {
    icon: "bot",
    title: "AI Agent Development",
    description:
      "Autonomous agents that plan, call tools and finish real workflows, from support triage to internal ops automation, with guardrails and human hand-off built in.",
    tags: ["Tool calling", "MCP", "Multi-step workflows"],
  },
  {
    icon: "database",
    title: "RAG Pipelines & Knowledge Assistants",
    description:
      "Retrieval-augmented assistants grounded in your documents and data: ingestion, chunking, embeddings, vector search and answers with sources.",
    tags: ["Embeddings", "Vector search", "Citations"],
  },
  {
    icon: "sparkles",
    title: "LLM Feature Integration",
    description:
      "Chat, streaming responses, summarisation and smart search added to your existing product, with production-safe streaming, caching and cost control.",
    tags: ["Streaming", "Summarisation", "Claude / OpenAI"],
  },
  {
    icon: "layers",
    title: "Full-Stack Web Applications",
    description:
      "End-to-end products with .NET or Node on the backend and React, Angular or Next.js on the frontend, from first commit to deployment.",
    tags: [".NET", "Node.js", "React / Next.js"],
  },
  {
    icon: "server",
    title: "Backend & API Engineering",
    description:
      "REST and GraphQL APIs, SQL performance tuning and secure transaction flows, built for real traffic and measurable response times.",
    tags: ["REST", "GraphQL", "SQL Server"],
  },
  {
    icon: "globe",
    title: "Business Websites & Web Design",
    description:
      "Fast, responsive websites for clinics, jewellers, studios and brands, with clear enquiry paths, WhatsApp contact and SEO-ready structure.",
    tags: ["Responsive", "SEO", "Enquiry flows"],
  },
];

export type Capability = {
  icon: "database" | "workflow" | "gauge" | "layout";
  title: string;
  description: string;
  link: { label: string; href: string };
};

export const capabilities: Capability[] = [
  {
    icon: "database",
    title: "Knowledge, connected.",
    description: "Retrieval that turns scattered documents and data into grounded, cited answers your users can trust.",
    link: { label: "RAG & retrieval", href: "/hire-me#estimator" },
  },
  {
    icon: "workflow",
    title: "Work that moves itself.",
    description: "Agents that call tools, recover from interruptions and know when to hand off to a human.",
    link: { label: "Agent workflows", href: "/hire-me#estimator" },
  },
  {
    icon: "gauge",
    title: "Built for real traffic.",
    description: ".NET and Node APIs, SQL tuning and secure transaction flows, proven on platforms with 1.6M+ concurrent users.",
    link: { label: "Backend & performance", href: "/#experience" },
  },
  {
    icon: "layout",
    title: "Every screen matters.",
    description: "React, Angular and Next.js interfaces, plus business websites with clear enquiry paths that turn visitors into clients.",
    link: { label: "Web apps & websites", href: "/case-studies" },
  },
];

export const systemLayers = [
  { icon: "layout", title: "Experience", detail: "Web · Apps · Websites" },
  { icon: "workflow", title: "Intelligence", detail: "RAG · Agents · LLMs" },
  { icon: "shield", title: "Platform", detail: "APIs · Data · Cloud" },
] as const;
