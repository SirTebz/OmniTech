import type { Metadata } from "next";
import { servicesData } from "@/data/services";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/sections/cta-section";
import {
  Globe,
  LayoutDashboard,
  Cpu,
  ShieldCheck,
  Palette,
  Terminal,
  ArrowRight,
  CheckCircle2,
  Code2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Services & Capabilities",
  description:
    "Explore OmniTech's comprehensive software and web development services: Modern Websites, Web Applications, Custom Software, Maintenance, UI/UX, and Technical Consulting.",
};

const iconMap: Record<string, React.ReactNode> = {
  Globe: <Globe className="w-8 h-8" />,
  LayoutDashboard: <LayoutDashboard className="w-8 h-8" />,
  Cpu: <Cpu className="w-8 h-8" />,
  ShieldCheck: <ShieldCheck className="w-8 h-8" />,
  Palette: <Palette className="w-8 h-8" />,
  Terminal: <Terminal className="w-8 h-8" />,
};

export default function ServicesPage() {
  return (
    <div className="pt-28 pb-16">
      {/* Services Header */}
      <section className="py-12 sm:py-20 bg-background border-b border-border">
        <Container size="default">
          <SectionHeading
            eyebrow="CAPABILITIES & ENGINEERING"
            title="Services built around real business challenges."
            subtitle="We don't just write code. We architect scalable digital systems that deliver operational reliability, fast performance, and commercial value."
          />
        </Container>
      </section>

      {/* Services Detailed List */}
      <section className="py-20 bg-background">
        <Container size="default" className="space-y-24">
          {servicesData.map((service, idx) => (
            <div
              key={service.id}
              id={service.id}
              className="scroll-mt-32 rounded-2xl border border-border bg-card p-8 sm:p-12 lg:p-14 shadow-xs"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
                {/* Left Overview */}
                <div className="lg:col-span-6 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-secondary text-foreground flex items-center justify-center">
                      {iconMap[service.iconName] || <Terminal className="w-8 h-8" />}
                    </div>
                    <div>
                      <span className="text-xs font-mono text-muted-foreground uppercase font-bold">
                        Service 0{idx + 1}
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                        {service.title}
                      </h2>
                    </div>
                  </div>

                  <p className="text-base text-muted-foreground leading-relaxed">
                    {service.fullDescription}
                  </p>

                  <div className="pt-4 space-y-3">
                    <h3 className="text-xs font-mono uppercase font-bold tracking-wider text-foreground">
                      Common Deliverables:
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {service.deliverables.map((del) => (
                        <span
                          key={del}
                          className="px-3 py-1.5 rounded-md bg-secondary text-xs font-medium text-foreground"
                        >
                          {del}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 flex items-center gap-4">
                    <Button href="/contact" size="md">
                      <span>Request a Quote for {service.title}</span>
                      <ArrowRight className="w-4 h-4 ml-1.5" />
                    </Button>
                  </div>
                </div>

                {/* Right Specifications */}
                <div className="lg:col-span-6 space-y-8 bg-background/60 p-6 sm:p-8 rounded-xl border border-border/80">
                  <div className="space-y-4">
                    <h3 className="text-xs font-mono uppercase font-bold tracking-wider text-foreground flex items-center gap-2">
                      <Code2 className="w-4 h-4" />
                      Key Features & Engineering Specs
                    </h3>
                    <ul className="space-y-3">
                      {service.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                          <CheckCircle2 className="w-4 h-4 text-foreground shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-border space-y-3">
                    <h3 className="text-xs font-mono uppercase font-bold tracking-wider text-muted-foreground">
                      Primary Technologies Applied:
                    </h3>
                    <div className="flex flex-wrap gap-1.5 font-mono text-xs text-muted-foreground">
                      {service.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded border border-border bg-card text-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Container>
      </section>

      <CTASection />
    </div>
  );
}
