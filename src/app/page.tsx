import React from "react";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import { servicesData } from "@/data/services";
import { projectsData } from "@/data/projects";
import { processSteps } from "@/data/process";
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
  ExternalLink,
  Sparkles,
  CheckCircle2,
  Mail,
  ShieldCheck,
  Terminal,
  Cpu,
  Layers,
} from "lucide-react";

export default function HomePage() {
  const getServiceIcon = (name: string) => {
    switch (name) {
      case "Code2":
        return <Code2 className="w-6 h-6 text-blue-500" />;
      case "Headphones":
        return <Headphones className="w-6 h-6 text-emerald-500" />;
      case "Activity":
        return <Activity className="w-6 h-6 text-amber-500" />;
      case "BarChart3":
        return <BarChart3 className="w-6 h-6 text-indigo-500" />;
      case "Globe":
        return <Globe className="w-6 h-6 text-cyan-500" />;
      default:
        return <Layout className="w-6 h-6 text-purple-500" />;
    }
  };

  // Cross-discipline highlights: 1 Software, 1 IT Support, 1 App Support, 1 Analytics
  const featuredProjects = [
    projectsData.find((p) => p.id === "it-service-desk"),
    projectsData.find((p) => p.id === "appwatch"),
    projectsData.find((p) => p.id === "insighthub"),
    projectsData.find((p) => p.id === "quiktab-invoicing-platform"),
  ].filter(Boolean);

  return (
    <div className="pt-24 pb-24 space-y-28">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 sm:pt-16 pb-12">
        <Container size="default">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Heading & Value Proposition */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 font-mono">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Personal Technology Services & Working Demos</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-foreground font-sans leading-[1.1]">
                Technology Solutions That Go Beyond Development.
              </h1>

              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                From building modern web applications to supporting business systems, troubleshooting technical challenges, and transforming data into meaningful insights, I deliver practical, end-to-end technology solutions.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Button href="/services" size="md" className="bg-blue-600 hover:bg-blue-500 text-white font-semibold">
                  <span>Explore My Services</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
                <Button href="/work" variant="outline" size="md">
                  <span>View My Projects</span>
                </Button>
                <Button href="/contact" variant="ghost" size="md">
                  <span>Get in Touch</span>
                </Button>
              </div>

              {/* Verified positioning tags */}
              <div className="pt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-mono text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
                  Software Development
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  IT Support & Helpdesk
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-500" />
                  Application Support
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500" />
                  Data Analytics & BI
                </span>
              </div>
            </div>

            {/* Right Column: Multi-Discipline Live Visual Preview */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-5 rounded-2xl bg-card border border-border shadow-xl space-y-4">
                {/* Visual Header */}
                <div className="flex items-center justify-between pb-3 border-b border-border text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                    <span className="text-muted-foreground ml-1.5">omnitech-environment</span>
                  </div>
                  <span className="text-blue-500 font-semibold">4 Disciplines</span>
                </div>

                {/* Simulated Stack Highlights */}
                <div className="space-y-3 text-xs">
                  {/* Item 1: IT Helpdesk Simulation */}
                  <div className="p-3 rounded-xl bg-background border border-border space-y-1">
                    <div className="flex items-center justify-between font-mono text-[11px]">
                      <span className="text-emerald-500 font-bold flex items-center gap-1">
                        <Headphones className="w-3.5 h-3.5" />
                        IT Helpdesk Active
                      </span>
                      <span className="text-muted-foreground">INC-4091</span>
                    </div>
                    <p className="text-foreground font-medium line-clamp-1">
                      Wi-Fi roaming dropouts on Intel AX201 • Triage in progress
                    </p>
                  </div>

                  {/* Item 2: Application Support */}
                  <div className="p-3 rounded-xl bg-background border border-border space-y-1">
                    <div className="flex items-center justify-between font-mono text-[11px]">
                      <span className="text-amber-500 font-bold flex items-center gap-1">
                        <Activity className="w-3.5 h-3.5" />
                        App Health Monitor
                      </span>
                      <span className="text-muted-foreground">Fleet: 99.95%</span>
                    </div>
                    <p className="text-foreground font-medium line-clamp-1">
                      SQL deadlock remediation applied to webhook processor
                    </p>
                  </div>

                  {/* Item 3: Business Intelligence */}
                  <div className="p-3 rounded-xl bg-background border border-border space-y-1">
                    <div className="flex items-center justify-between font-mono text-[11px]">
                      <span className="text-indigo-500 font-bold flex items-center gap-1">
                        <BarChart3 className="w-3.5 h-3.5" />
                        Business Intelligence
                      </span>
                      <span className="text-emerald-500 font-bold">R 624,500</span>
                    </div>
                    <p className="text-foreground font-medium line-clamp-1">
                      Dynamic KPI filters: Gauteng, Western Cape & KZN
                    </p>
                  </div>

                  {/* Item 4: Software Dev */}
                  <div className="p-3 rounded-xl bg-background border border-border space-y-1">
                    <div className="flex items-center justify-between font-mono text-[11px]">
                      <span className="text-blue-500 font-bold flex items-center gap-1">
                        <Code2 className="w-3.5 h-3.5" />
                        Software Engineering
                      </span>
                      <span className="text-muted-foreground">Next.js 15 + C#</span>
                    </div>
                    <p className="text-foreground font-medium line-clamp-1">
                      QuikTab zero-dependency invoicing & PayFast ITN engine
                    </p>
                  </div>
                </div>

                <div className="pt-2 flex justify-between items-center text-[11px] font-mono text-muted-foreground">
                  <span>Interactive Demos Available</span>
                  <Link href="/work" className="text-blue-500 hover:underline">
                    Launch Demos &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. SERVICES OVERVIEW (EQUAL WEIGHT FOR 6 AREAS) */}
      <section className="space-y-12">
        <Container size="default">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-blue-500 font-bold">
              Core Capabilities
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Comprehensive Technology Services
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Each discipline receives dedicated engineering focus, structured processes, and clear deliverables.
            </p>
          </div>
        </Container>

        <Container size="default">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesData.map((service) => (
              <div
                key={service.id}
                className="p-6 rounded-2xl bg-card border border-border hover:border-blue-500/50 transition-all flex flex-col justify-between space-y-5 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 rounded-xl bg-accent">
                      {getServiceIcon(service.iconName)}
                    </div>
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-background border border-border text-foreground">
                      {service.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-foreground group-hover:text-blue-500 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {service.shortDescription}
                  </p>

                  <div className="pt-2 space-y-1.5 border-t border-border/60">
                    <span className="text-[11px] font-mono font-medium text-foreground block">
                      Capabilities:
                    </span>
                    <ul className="space-y-1 text-xs text-muted-foreground">
                      {service.features.slice(0, 2).map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3 h-3 text-blue-500 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-3 border-t border-border flex items-center justify-between">
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-xs font-semibold text-blue-500 hover:underline inline-flex items-center gap-1"
                  >
                    <span>View Service Details</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 3. MULTI-DISCIPLINE PROJECT HIGHLIGHTS */}
      <section className="space-y-12">
        <Container size="default">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="max-w-2xl space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest text-blue-500 font-bold">
                Working Proof
              </span>
              <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                Featured Projects & Demonstrations
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Explore real, working applications across IT helpdesk, application support, data analytics, and software engineering. No registration required.
              </p>
            </div>

            <Button href="/work" variant="outline" size="sm" className="self-start md:self-auto">
              <span>View All Projects</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </div>
        </Container>

        <Container size="default">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredProjects.map((project) => (
              <div
                key={project!.id}
                className="p-6 sm:p-7 rounded-2xl bg-card border border-border hover:border-blue-500/50 transition-all flex flex-col justify-between space-y-6 group"
              >
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-muted-foreground">
                      {project!.category}
                    </span>
                    {project!.demoUrl && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                        <Sparkles className="w-3 h-3" />
                        <span>Interactive Demo</span>
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-foreground group-hover:text-blue-500 transition-colors">
                    {project!.title}
                  </h3>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {project!.shortDescription}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project!.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 text-[10px] font-mono rounded bg-background border border-border text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-border flex items-center justify-between gap-3">
                  <Link
                    href={`/work/${project!.slug}`}
                    className="text-xs font-semibold text-foreground hover:text-blue-500 transition-colors inline-flex items-center gap-1"
                  >
                    <span>Read Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  {project!.demoUrl && (
                    <Link
                      href={project!.demoUrl}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-sm transition-colors"
                    >
                      <span>Launch Demo</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 4. TECHNICAL CAPABILITIES STRIP */}
      <section className="space-y-8">
        <Container size="default">
          <div className="p-6 sm:p-10 rounded-3xl bg-card border border-border space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-border">
              <div>
                <h3 className="text-xl font-bold text-foreground">Verified Technical Competencies</h3>
                <p className="text-xs text-muted-foreground font-mono mt-0.5">
                  Core technologies, frameworks, and support tools actively utilized
                </p>
              </div>
              <Link href="/about" className="text-xs font-semibold text-blue-500 hover:underline">
                Explore Full Profile &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
              <div className="space-y-2">
                <span className="font-bold text-foreground uppercase tracking-wider text-[11px] block text-blue-500">
                  Software Dev
                </span>
                <p className="text-muted-foreground leading-relaxed">
                  C#, ASP.NET Core, TypeScript, Next.js, SQL Server, EF Core, REST APIs
                </p>
              </div>

              <div className="space-y-2">
                <span className="font-bold text-foreground uppercase tracking-wider text-[11px] block text-emerald-500">
                  IT Support
                </span>
                <p className="text-muted-foreground leading-relaxed">
                  Windows 10/11, Hardware, Microsoft 365, TCP/IP, DNS/DHCP, Printers
                </p>
              </div>

              <div className="space-y-2">
                <span className="font-bold text-foreground uppercase tracking-wider text-[11px] block text-amber-500">
                  App Support
                </span>
                <p className="text-muted-foreground leading-relaxed">
                  L1/L2 Incident Triage, RCA, SQL Queries, Log Analysis, Monitoring
                </p>
              </div>

              <div className="space-y-2">
                <span className="font-bold text-foreground uppercase tracking-wider text-[11px] block text-indigo-500">
                  Data Analytics
                </span>
                <p className="text-muted-foreground leading-relaxed">
                  SQL Modeling, Excel (Advanced), KPI Cards, BI Dashboards, Trend Analysis
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 5. WORKING PROCESS */}
      <section className="space-y-12">
        <Container size="default">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-blue-500 font-bold">
              Predictable Delivery
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              5-Step Structured Working Process
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Applied consistently across development, technical support, and analytics projects.
            </p>
          </div>
        </Container>

        <Container size="default">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {processSteps.map((step) => (
              <div
                key={step.step}
                className="p-5 rounded-2xl bg-card border border-border space-y-2.5 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <span className="text-2xl font-extrabold font-mono text-blue-500">
                    {step.step}
                  </span>
                  <h3 className="text-sm font-bold text-foreground">{step.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {step.subtitle}
                  </p>
                </div>
                <div className="pt-2 border-t border-border/60 text-[10px] font-mono text-muted-foreground">
                  <span>{step.deliverables[0]}</span>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 6. CONTACT CTA */}
      <section>
        <Container size="default">
          <div className="p-8 sm:p-14 rounded-3xl bg-neutral-950 text-white border border-neutral-800 text-center max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Ready to Discuss a Project or Support Engagement?
            </h2>
            <p className="text-sm text-neutral-400 max-w-xl mx-auto leading-relaxed">
              Available for commercial technology consultations, bespoke software engineering, IT support contracts, and data analytics reporting.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Button href="/contact" size="md" className="bg-blue-600 hover:bg-blue-500 text-white font-semibold">
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-neutral-700 bg-neutral-900 hover:bg-neutral-800 text-xs font-mono font-medium transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-blue-400" />
                <span>{siteConfig.email}</span>
              </a>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
