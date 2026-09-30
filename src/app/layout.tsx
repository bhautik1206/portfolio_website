import type { Metadata, Viewport } from "next";
import { Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Providers } from "@/components/providers";
import { ContactProvider } from "@/components/contact/contact-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { site } from "@/data/site";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s | ${site.name}` },
  description: site.description,
  keywords: [
    "Bhautik Kapadiya",
    "Gen AI Engineer",
    "Full-Stack Developer",
    "RAG pipelines",
    "AI agents",
    ".NET developer",
    "React developer",
    "Freelance web developer Vadodara",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: site.title,
    description: site.description,
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image", title: site.title, description: site.description, creator: "@bhautikkapadiy6" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#0d0e11" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${jakarta.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body className="flex min-h-dvh flex-col">
        <Providers>
          <ContactProvider>
            <a
              href="#main"
              className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
            >
              Skip to content
            </a>
            <Navbar />
            <main id="main" className="flex-1">
              {children}
            </main>
            <Footer />
          </ContactProvider>
        </Providers>
      </body>
      <GoogleAnalytics gaId={site.gaId} />
    </html>
  );
}
