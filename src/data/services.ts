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
