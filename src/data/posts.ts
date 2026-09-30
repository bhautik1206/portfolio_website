export type Post = {
  title: string;
  link: string;
  date: string;
  categories: string[];
  image: string | null;
  readingMinutes: number;
  excerpt: string;
};

export const MEDIUM_PROFILE = "https://medium.com/@bhautikk";
export const MEDIUM_FEED = "https://medium.com/feed/@bhautikk";

// Snapshot of the Medium feed, shown only if the live feed can't be reached.
export const fallbackPosts: Post[] = [
  {
    title: "Your Cache Is Not Making Things Faster. It’s Just Hiding the Problem.",
    link: "https://bhautikk.medium.com/your-cache-is-not-making-things-faster-its-just-hiding-the-problem-d943a795da6f",
    date: "2026-07-01T04:59:57.000Z",
    categories: ["software-engineering", "caching", "distributed-systems", "backend"],
    image: "https://cdn-images-1.medium.com/max/1024/1*NSTPyP71EY6z07i160HpLg.png",
    readingMinutes: 5,
    excerpt: "Three ways caching quietly breaks in production, and the architecture pattern that avoids all three.",
  },
  {
    title: "Your AI Chat Streaming Works on Localhost. Here’s Why It Breaks in Production.",
    link: "https://bhautikk.medium.com/your-ai-chat-streaming-works-on-localhost-heres-why-it-breaks-in-production-13fffe4d8f56",
    date: "2026-06-19T05:39:25.000Z",
    categories: ["llm", "server-sent-events", "software-engineering", "backend"],
    image: "https://cdn-images-1.medium.com/max/1024/1*ISEQNbXgPcakSgGL7jDzeg.png",
    readingMinutes: 7,
    excerpt: "Open an SSE connection, pipe the tokens through, add a Last-Event-ID header on reconnect: it works on your laptop. Here's what breaks with real users.",
  },
  {
    title: "Claude Fable 5: The Beast Has Arrived — And AI Just Learned to Take Responsibility",
    link: "https://bhautikk.medium.com/claude-fable-5-the-beast-has-arrived-and-ai-just-learned-to-take-responsibility-439c79b38bf7",
    date: "2026-06-10T13:13:20.000Z",
    categories: ["ai", "anthropic-claude", "fable-5"],
    image: "https://cdn-images-1.medium.com/max/1024/1*cfI3ZYBCQO7ZPqP2TdbHxw.png",
    readingMinutes: 4,
    excerpt: "How Anthropic's new model changed the way I build, think and ship, and why responsibility-taking is the new frontier in AI.",
  },
  {
    title: "Coral MCP in Enterprise: Architecture, Security, and 5 Mistakes That Will Cost You",
    link: "https://bhautikk.medium.com/coral-mcp-in-enterprise-architecture-security-and-5-mistakes-that-will-cost-you-d0bd665a22d6",
    date: "2026-06-09T17:14:06.000Z",
    categories: ["architecture", "mcp", "backend"],
    image: "https://cdn-images-1.medium.com/max/1024/1*PiSaGMtpNW3cQt03atQhNA.png",
    readingMinutes: 6,
    excerpt: "Data lives across a dozen SaaS tools, each with its own API quirks, auth and rate limits. How MCP changes the integration picture, and the mistakes to avoid.",
  },
  {
    title: "When Parallel Became a Problem: A Backend Engineering Postmortem on Fan-Out Concurrency",
    link: "https://bhautikk.medium.com/when-parallel-became-a-problem-a-backend-engineering-postmortem-on-fan-out-concurrency-729deb5a19d9",
    date: "2026-05-27T19:00:13.000Z",
    categories: ["dotnet", "distributed-systems", "concurrency", "backend-development"],
    image: "https://cdn-images-1.medium.com/max/1024/1*uD8MY-ElJRaNEu-I60agRQ.png",
    readingMinutes: 14,
    excerpt: "How an innocent Task.WhenAll() brought down an order aggregation service under load, and what we did about it.",
  },
  {
    title: "Getting Started with Google Maps in React using @react-google-maps/api",
    link: "https://bhautikk.medium.com/%EF%B8%8F-getting-started-with-google-maps-in-react-using-react-google-maps-api-4f22c9101717",
    date: "2025-04-28T05:02:44.000Z",
    categories: ["react", "google-maps-api", "geolocation"],
    image: "https://cdn-images-1.medium.com/max/500/1*_7e8hceczoYyxUaTO1OAEA.png",
    readingMinutes: 2,
    excerpt: "A practical introduction to adding maps, markers and locations to a React app with @react-google-maps/api.",
  },
];
