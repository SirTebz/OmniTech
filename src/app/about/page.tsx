import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { siteConfig } from "@/data/site";
import { technicalCapabilities } from "@/data/technologies";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import {
  Code2,
  Headphones,
  Activity,
  BarChart3,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Terminal,
  Mail,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/social-icons";

export const metadata: Metadata = {
  title: "About OmniTech & Professional Background",
  description:
    "Professional technology services profile combining full-stack software development, IT helpdesk troubleshooting, application support, and business intelligence analytics.",
};

export default function AboutPage() {
  return (
    <div className="pt-28 pb-24 space-y-20">
      {/* Intro Header */}
      <Container size="default">
        <div className="max-w-3xl space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 font-mono">
            <span>Professional Profile & Engineering Approach</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground font-sans">
            Personalised Technology Services Built on Versatility
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            I am a hands-on technology professional working across <strong>software engineering</strong>, <strong>IT support & helpdesk</strong>, <strong>application support</strong>, and <strong>data analytics</strong>. OmniTech is the digital home for my commercial services and portfolio of working applications.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button href="/contact" size="md" className="bg-blue-600 hover:bg-blue-500 text-white font-semibold">
              <span>Let&apos;s Work Together</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border bg-card hover:bg-accent text-xs font-mono font-medium transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-blue-500" />
              <span>{siteConfig.email}</span>
            </a>
          </div>
        </div>
      </Container>

      {/* Core Philosophy & 4 Disciplines */}
      <Container size="default">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-card border border-border space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
              <Code2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-foreground">Software Engineering</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Engineering full-stack web applications, REST APIs, and database-driven solutions using C#, ASP.NET Core, TypeScript, Next.js, and SQL Server.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-card border border-border space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <Headphones className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-foreground">IT Support & Helpdesk</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Methodical troubleshooting of Windows workstations, hardware peripherals, network connectivity, TCP/IP, DNS, and Microsoft 365 environments.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-card border border-border space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <Activity className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-foreground">Application Support</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Investigating software exceptions, SQL data corruption, API timeout spikes, and maintaining high availability across business systems.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-card border border-border space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-foreground">Data Analytics</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Transforming raw transactional logs into executive BI dashboards, SQL views, KPI cards, and operational service desk performance reports.
            </p>
          </div>
        </div>
      </Container>

      {/* Technical Capabilities Matrix */}
      <Container size="default">
        <div className="p-6 sm:p-10 rounded-3xl bg-card border border-border space-y-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Technical Competencies & Working Proficiencies
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Transparent breakdown of core technologies, operational tools, and platforms
            </p>
          </div>

          <div className="space-y-8">
            {technicalCapabilities.map((category) => (
              <div key={category.title} className="space-y-3 pt-4 border-t border-border/70">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h3 className="text-base font-bold text-foreground font-sans">
                    {category.title}
                  </h3>
                  <span className="text-xs font-mono text-muted-foreground">
                    {category.discipline}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {category.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
                  {category.items.map((item) => (
                    <div
                      key={item.name}
                      className="p-3 rounded-xl bg-background border border-border text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-foreground">{item.name}</span>
                        <span
                          className={`text-[9px] font-mono px-1.5 py-0.2 rounded font-bold ${
                            item.level === "Core"
                              ? "bg-blue-500/10 text-blue-500"
                              : "bg-accent text-muted-foreground"
                          }`}
                        >
                          {item.level}
                        </span>
                      </div>
                      <p className="text-[11px] text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>

      {/* Bottom CTA */}
      <Container size="default">
        <div className="p-8 sm:p-12 rounded-3xl bg-neutral-950 text-white border border-neutral-800 text-center max-w-2xl mx-auto space-y-5">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Connect for Collaborations & Roles
          </h2>
          <p className="text-sm text-neutral-400 leading-relaxed">
            I am available for technology contracts, support retainer agreements, and full-time technical opportunities.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Button href="/contact" size="md" className="bg-blue-600 hover:bg-blue-500 text-white font-semibold">
              Get in Touch
            </Button>
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-neutral-700 bg-neutral-900 hover:bg-neutral-800 text-xs font-mono transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-blue-400" />
              <span>{siteConfig.email}</span>
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
}
