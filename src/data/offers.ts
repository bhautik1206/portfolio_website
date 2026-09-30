export type IconKey =
  | "rocket"
  | "bot"
  | "code"
  | "building"
  | "shield"
  | "file"
  | "server"
  | "life"
  | "zap"
  | "eye"
  | "handshake"
  | "layers"
  | "palette"
  | "users"
  | "lock"
  | "git"
  | "message"
  | "gauge"
  | "sparkles";

export type Card = { icon: IconKey; title: string; description: string; meta?: string; tags?: string[] };

export type Package = {
  name: string;
  badge?: string;
  duration: string;
  summary: string;
  deliverables: string[];
  highlighted?: boolean;
};

export const heroBadges = ["100% code ownership", "Proposal within 24 hours", "Fixed-scope milestones"];

export const hireMe = {
  eyebrow: "Hire me · Fixed-scope engagements",
  title: "Your next product feature, shipped end to end.",
  subtitle:
    "AI features, RAG pipelines, full-stack builds and backend performance work, scoped clearly, built independently and delivered to production.",
  fit: [
    {
      icon: "rocket",
      title: "SaaS founders",
      description: "You need a feature shipped properly without hiring a full team to do it.",
    },
    {
      icon: "bot",
      title: "AI startups",
      description: "You want RAG, agents or LLM features that hold up with real users and real data.",
    },
    {
      icon: "code",
      title: "Technical founders & CTOs",
      description: "Your backlog is growing faster than your team can ship it.",
    },
    {
      icon: "building",
      title: "Agencies & businesses",
      description: "You need a dependable developer for client builds or your own website.",
    },
  ] satisfies Card[],
  whyMe: [
    {
      icon: "layers",
      title: "End-to-end ownership",
      description: "Architecture, backend, frontend and deployment handled by one person who owns the result.",
    },
    {
      icon: "sparkles",
      title: "AI-native workflow",
      description: "I use modern AI tooling daily to build faster, and I know where it needs careful engineering.",
    },
    {
      icon: "server",
      title: "Production experience",
      description: "Systems serving 1.6M+ concurrent users, banking and crypto transaction modules, 30+ GraphQL APIs.",
    },
    {
      icon: "zap",
      title: "Works independently",
      description: "Clear written updates and demos, so you don't have to manage me day to day.",
    },
  ] satisfies Card[],
  proof: [
    {
      icon: "gauge",
      title: "API response 1.2s → 700ms",
      description: "Restructured Entity Framework + LINQ queries on high-traffic endpoints at Advance Web Software.",
      meta: "Backend performance",
    },
    {
      icon: "users",
      title: "1.6M+ concurrent users",
      description: "Scalable .NET services behind a real-time code execution platform.",
      meta: "Scale",
    },
    {
      icon: "shield",
      title: "Banking & crypto modules",
      description: "Secure onboarding, fiat processing and on/off-ramp flows in .NET and React at Validat Limited.",
      meta: "Fintech",
    },
    {
      icon: "file",
      title: "22+ client websites",
      description: "Clinics, jewellers, interior studios, D2C brands and a Web3 payments platform delivered since 2022.",
      meta: "Freelance",
    },
  ] satisfies Card[],
  process: [
    { title: "Scope", description: "A short call or message thread to understand the goal, constraints and what done looks like." },
    { title: "Plan", description: "A written proposal within 24 hours: approach, milestones, timeline and deliverables." },
    { title: "Build", description: "Iterative development with regular demos, so you see progress rather than hear about it." },
    { title: "Ship", description: "Deployment to your infrastructure, handover notes and post-launch support." },
  ],
  assurances: [
    { icon: "file", title: "Fixed-scope milestones", description: "Work is split into clear milestones agreed before we start." },
    { icon: "git", title: "100% code ownership", description: "All code, repositories and IP belong to you from day one." },
    { icon: "server", title: "Your infrastructure", description: "Deployed to accounts you own. No lock-in, no hidden hosting." },
    { icon: "life", title: "Post-launch support", description: "Bug fixes after launch are included, so you're not left alone at go-live." },
  ] satisfies Card[],
  packages: [
    {
      name: "Audit & Roadmap",
      badge: "Foot in the door",
      duration: "3–5 days",
      summary: "A focused review of your AI feature, codebase or performance problem with a clear plan.",
      deliverables: ["Architecture / code review", "Prioritised issue list", "Written roadmap with estimates"],
    },
    {
      name: "Production Feature Sprint",
      badge: "Most popular",
      duration: "1–2 weeks",
      summary: "One well-defined feature (AI, backend or full-stack) designed, built and shipped.",
      deliverables: ["Feature built end to end", "Tests and deployment", "Handover notes"],
      highlighted: true,
    },
    {
      name: "Full Product / MVP",
      duration: "3–6 weeks",
      summary: "A complete first version of your product, from architecture to live production.",
      deliverables: ["Architecture & data model", "Frontend + backend + integrations", "Production deployment"],
    },
    {
      name: "Ongoing Retainer",
      duration: "Monthly",
      summary: "Dedicated monthly capacity for features, maintenance and improvements.",
      deliverables: ["Reserved monthly hours", "Priority response", "Monthly progress summary"],
    },
  ] satisfies Package[],
  faq: [
    {
      q: "What kind of projects do you take on?",
      a: "AI features (RAG, agents, LLM integrations), full-stack web applications, backend and API work, and business websites. If you're not sure your project fits, send a message and I'll tell you honestly.",
    },
    {
      q: "How do you price projects?",
      a: "Every project gets a fixed quote after a short scoping conversation, based on scope and timeline. You'll get a written proposal within 24 hours of that conversation.",
    },
    {
      q: "Which technologies do you use?",
      a: "Mostly .NET/C# and Node.js on the backend, React, Next.js and Angular on the frontend, SQL Server, MySQL or MongoDB for data, and Claude/OpenAI models for AI features. I'll suggest what fits your existing stack rather than forcing mine.",
    },
    {
      q: "Can you work with my existing codebase and team?",
      a: "Yes. I regularly join existing projects, follow your conventions and Git workflow, and document what I change.",
    },
    {
      q: "What's your availability and time zone?",
      a: "I'm based in Vadodara, India (GMT+5:30) and reply within 24 hours. I keep a few hours of overlap with UK, EU and US teams for calls.",
    },
    {
      q: "Who owns the code?",
      a: "You do. All code, repositories and accounts are yours, and deployments go to infrastructure you control.",
    },
  ],
};

export const estimator = {
  projectTypes: [
    { id: "agent", label: "AI Agent / Automation" },
    { id: "rag", label: "RAG / Knowledge Assistant" },
    { id: "fullstack", label: "Full-Stack Web App" },
    { id: "backend", label: "Backend & APIs" },
    { id: "website", label: "Business Website" },
    { id: "unsure", label: "Not sure yet" },
  ],
  timelines: [
    { id: "asap", label: "ASAP (< 2 weeks)" },
    { id: "month", label: "2–4 weeks" },
    { id: "later", label: "Next 1–2 months" },
  ],
} as const;

export type EstimatorType = (typeof estimator.projectTypes)[number]["id"];
export type EstimatorTimeline = (typeof estimator.timelines)[number]["id"];

export function recommendPackage(type: EstimatorType, timeline: EstimatorTimeline) {
  if (type === "unsure") return { pkg: "Audit & Roadmap", note: "Start with a short scoping review and a written roadmap." };
  if (type === "website")
    return { pkg: timeline === "asap" ? "Production Feature Sprint" : "Full Product / MVP", note: "A fast, responsive website with clear enquiry paths." };
  if (timeline === "asap") return { pkg: "Production Feature Sprint", note: "One focused feature, scoped tightly and shipped quickly." };
  if (type === "fullstack") return { pkg: "Full Product / MVP", note: "Architecture to production for a complete first version." };
  return { pkg: "Production Feature Sprint", note: "A well-defined build shipped end to end, with room to extend." };
}

export const startups = {
  eyebrow: "For startups",
  title: "Have a product idea? I'll help you get it into production.",
  subtitle:
    "From a first MVP to AI features and payment integrations, I build the product you've been describing in pitch decks, and ship it.",
  offerings: [
    { icon: "rocket", title: "MVP, zero to one", description: "A complete first version: architecture, frontend, backend and deployment.", meta: "3–6 weeks" },
    { icon: "bot", title: "AI feature integration", description: "RAG search, assistants, agents or summarisation added to your product.", meta: "1–2 weeks" },
    { icon: "zap", title: "Backlog acceleration", description: "Focused sprints that clear the features your team keeps postponing.", meta: "3–7 days" },
    { icon: "handshake", title: "API & payment integrations", description: "Third-party APIs, webhooks and payment gateways wired in properly.", meta: "3–5 days" },
  ] satisfies Card[],
  assurances: [
    { icon: "eye", title: "Zero management overhead", description: "Written updates and demos. You review outcomes, not tasks." },
    { icon: "file", title: "Fixed milestones", description: "Scope and milestones agreed up front, invoiced per milestone." },
    { icon: "git", title: "Full code handover", description: "Your repo, your accounts, full ownership of everything built." },
    { icon: "life", title: "Post-launch support", description: "Bug fixes after launch so your first users have a smooth ride." },
  ] satisfies Card[],
  audit: {
    title: "Not ready for a full build?",
    description:
      "Start with a 3–5 day Audit & Roadmap: I review your idea, codebase or AI feature and hand you a clear, prioritised plan you can use with or without me.",
  },
};

export const agencies = {
  eyebrow: "For agencies",
  title: "Your engineering team, without the hiring overhead.",
  subtitle:
    "White-label development capacity for agencies: Figma-to-production builds, AI features and backends, delivered under your brand.",
  services: [
    { icon: "palette", title: "Figma to production", description: "Pixel-accurate, responsive builds from your designers' files.", tags: ["React", "Next.js", "Tailwind"] },
    { icon: "bot", title: "AI feature integration", description: "Chatbots, RAG search and automation for your clients' products.", tags: ["RAG", "Agents", "LLMs"] },
    { icon: "server", title: "SaaS backends", description: "APIs, databases, auth and integrations for client platforms.", tags: [".NET", "Node.js", "SQL"] },
    { icon: "users", title: "Overflow support", description: "Extra hands when deadlines stack up, without a long-term hire.", tags: ["Flexible", "Remote"] },
  ] satisfies Card[],
  guarantees: [
    { icon: "lock", title: "Mutual NDA", description: "Happy to sign your NDA before we discuss any client work." },
    { icon: "shield", title: "Your client, your brand", description: "I work white-label. Your client relationship stays yours." },
    { icon: "git", title: "Client-owned repos", description: "Code lives in your or your client's repositories from day one." },
    { icon: "message", title: "Async progress updates", description: "Regular written updates that fit your delivery process." },
  ] satisfies Card[],
  packages: [
    {
      name: "Feature Sprint",
      duration: "1–2 weeks",
      summary: "A defined feature or page set for one of your client projects.",
      deliverables: ["Build from your specs / Figma", "QA and handover", "Documentation"],
    },
    {
      name: "Full Project Delivery",
      badge: "Most popular",
      duration: "2–6 weeks",
      summary: "A complete client website or web app delivered under your brand.",
      deliverables: ["Frontend + backend", "Deployment support", "Handover to your team"],
      highlighted: true,
    },
    {
      name: "Monthly Retainer",
      duration: "Monthly",
      summary: "Reserved development capacity for your agency every month.",
      deliverables: ["Reserved hours", "Priority scheduling", "Monthly summary"],
    },
  ] satisfies Package[],
  spec: {
    title: "Send me the spec.",
    description: "Share the brief, Figma file or repo and I'll reply within 24 hours with questions, an approach and a quote.",
  },
};

export const howIBuild = {
  title: "How I Build.",
  subtitle:
    "A practical, repeatable way to take AI and web products from idea to production, with visibility at every step.",
  steps: [
    {
      title: "Discovery & scope",
      duration: "1–3 days",
      description: "Understand the problem, users and constraints. Agree on what success looks like and what's out of scope.",
    },
    {
      title: "Architecture & design",
      duration: "2–5 days",
      description: "System design, data model, API contracts and, for AI work, the retrieval and prompting strategy.",
    },
    {
      title: "Iterative build",
      duration: "1–3 weeks",
      description: "Build in small, reviewable slices with regular demos, so feedback lands early and cheaply.",
    },
    {
      title: "Testing & quality",
      duration: "Continuous",
      description: "Automated tests where they matter, manual QA across devices, and evaluation of AI output quality.",
    },
    {
      title: "Deployment & monitoring",
      duration: "1–2 days",
      description: "CI/CD, environment setup, logging and monitoring on infrastructure you own.",
    },
    {
      title: "Launch support",
      duration: "Included",
      description: "Post-launch fixes and a clear handover, with an optional retainer for ongoing work.",
    },
  ],
  principles: [
    { title: "Measure, don't guess", description: "Performance and AI quality are checked with real numbers, not impressions." },
    { title: "Visible progress", description: "Regular demos and written updates. You always know where things stand." },
    { title: "Pragmatic architecture", description: "The simplest design that meets today's needs and doesn't block tomorrow's." },
    { title: "Business first", description: "Technology choices follow your goals, budget and team, not trends." },
  ],
};
