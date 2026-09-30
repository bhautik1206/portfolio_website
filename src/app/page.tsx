import { Hero } from "@/components/home/hero";
import { MetricsStrip } from "@/components/home/metrics-strip";
import { ClientProjects } from "@/components/home/client-projects";
import { ServicesGrid } from "@/components/home/services-grid";
import { ExperienceTimeline } from "@/components/home/experience-timeline";
import { StackColumns } from "@/components/home/stack-columns";
import { Testimonials } from "@/components/home/testimonials";
import { CTASection } from "@/components/home/cta-section";

// Re-render daily so the auto-computed years of experience and © year stay current.
export const revalidate = 86400;

export default function Home() {
  return (
    <>
      <Hero />
      <MetricsStrip />
      <ClientProjects />
      <ServicesGrid />
      <ExperienceTimeline />
      <StackColumns />
      <Testimonials />
      <CTASection />
    </>
  );
}
