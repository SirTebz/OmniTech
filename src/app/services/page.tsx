import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { servicesData } from "@/data/services";
import { siteConfig } from "@/data/site";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import {
  Code2,
  Headphones,
  Activity,
  BarChart3,
  Globe,
  Layout,
  ArrowRight,
  CheckCircle2,
  Phone,
  Mail,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Professional Technology Services",
  description:
    "Comprehensive technology engineering and systems support: software development, IT helpdesk, application incident management, data analytics, and modern web platforms.",
};

export default function ServicesPage() {
  const getIcon = (name: string) => {
    switch (name) {
      case "Code2":
        return <Code2 className="w-6 h-6 text-blue-500" />;
      case "Headphones":
        return <Headphones className="w-6 h-6 text-blue-500" />;
      case "Activity":
        return <Activity className="w-6 h-6 text-blue-500" />;
      case "BarChart3":
        return <BarChart3 className="w-6 h-6 text-blue-500" />;
      case "Globe":
        return <Globe className="w-6 h-6 text-blue-500" />;
      default:
        return <Layout className="w-6 h-6 text-blue-500" />;
    }
  };

  return (
    <div className="pt-28 pb-24 space-y-20">
      {/* Services Header */}
      <Container size="default">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 font-mono">
            <span>Engineering, Operations & Analytics</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground font-sans">
            Technology Services That Go Beyond Development
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            From architecting database-driven applications to resolving urgent IT helpdesk incidents, diagnosing application errors, and transforming transactional data into actionable business intelligence, OmniTech delivers disciplined, end-to-end technical capabilities.
          </p>
        </div>
      </Container>

      {/* Services Cards Grid */}
      <Container size="default">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesData.map((service) => (
            <div
              key={service.id}
              className="p-6 sm:p-7 rounded-2xl bg-card border border-border hover:border-blue-500/50 transition-all flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
                    {getIcon(service.iconName)}
                  </div>
                  <span className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-accent text-foreground">
                    {service.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-foreground group-hover:text-blue-500 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-muted-foreground font-mono mt-1">
                    {service.category}
                  </p>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {service.shortDescription}
                </p>

                <div className="pt-2 space-y-2 border-t border-border/60">
                  <span className="text-xs font-mono font-semibold text-foreground uppercase tracking-wider block">
                    Core Capabilities
                  </span>
                  <ul className="space-y-1.5 text-xs text-muted-foreground">
                    {service.features.slice(0, 3).map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-border flex items-center justify-between">
                <Link
                  href={`/services/${service.slug}`}
                  className="text-xs font-semibold text-blue-600 dark:text-blue-400 inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                >
                  <span>Explore Deep Dive</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <div className="flex flex-wrap gap-1">
                  {service.technologies.slice(0, 2).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 text-[10px] font-mono rounded bg-background border border-border text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>

      {/* Direct Contact Banner */}
      <Container size="default">
        <div className="p-8 sm:p-12 rounded-3xl bg-neutral-950 text-white border border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-2xl font-bold tracking-tight">
              Have a Specific Technical Challenge or Project?
            </h2>
            <p className="text-sm text-neutral-400 max-w-xl">
              Available for custom software development, managed IT support contracts, application incident diagnostics, and data analytics consulting.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Button href="/contact" size="md" className="bg-blue-600 hover:bg-blue-500 text-white font-semibold">
              <span>Let&apos;s Work Together</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
            <a
              href={`tel:${siteConfig.phone}`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-neutral-800 bg-neutral-900 hover:bg-neutral-800 text-xs font-mono font-medium transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-blue-400" />
              <span>{siteConfig.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
}
