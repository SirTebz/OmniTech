import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
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
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  ShieldCheck,
  Terminal,
} from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return servicesData.map((s) => ({
    slug: s.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const service = servicesData.find((s) => s.slug === resolvedParams.slug);
  if (!service) return { title: "Service Not Found" };

  return {
    title: `${service.title} | OmniTech Services`,
    description: service.shortDescription,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const service = servicesData.find((s) => s.slug === resolvedParams.slug);

  if (!service) {
    notFound();
  }

  const getServiceIcon = (name: string) => {
    switch (name) {
      case "Code2":
        return <Code2 className="w-8 h-8 text-blue-600 dark:text-blue-400" />;
      case "Headphones":
        return <Headphones className="w-8 h-8 text-blue-600 dark:text-blue-400" />;
      case "Activity":
        return <Activity className="w-8 h-8 text-blue-600 dark:text-blue-400" />;
      case "BarChart3":
        return <BarChart3 className="w-8 h-8 text-blue-600 dark:text-blue-400" />;
      case "Globe":
        return <Globe className="w-8 h-8 text-blue-600 dark:text-blue-400" />;
      default:
        return <Layout className="w-8 h-8 text-blue-600 dark:text-blue-400" />;
    }
  };

  return (
    <div className="pt-28 pb-20">
      <Container size="default" className="space-y-16">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
          <Link href="/services" className="hover:text-foreground inline-flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Services</span>
          </Link>
          <span>/</span>
          <span className="text-foreground">{service.category}</span>
        </div>

        {/* Hero Banner */}
        <div className="space-y-6 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 font-mono">
            <span>{service.badge}</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-blue-600/10 border border-blue-500/20">
              {getServiceIcon(service.iconName)}
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground font-sans">
              {service.title}
            </h1>
          </div>

          <p className="text-lg text-muted-foreground leading-relaxed">
            {service.fullDescription}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button href="/contact" size="md" className="font-semibold bg-blue-600 hover:bg-blue-500 text-white">
              <span>Request Consultation</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
            <Button href={`mailto:${siteConfig.email}`} variant="secondary" size="md">
              <span>Email: {siteConfig.email}</span>
            </Button>
          </div>
        </div>

        {/* Core Challenges Addressed */}
        <div className="p-6 sm:p-8 rounded-2xl bg-card border border-border space-y-6">
          <div>
            <h2 className="text-xl font-bold text-foreground">Operational Challenges Solved</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Common friction points and technical bottlenecks this service directly eliminates
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {service.problemsAddressed.map((problem, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-background border border-border">
                <ShieldCheck className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <span className="text-sm text-foreground leading-relaxed">{problem}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Service Capabilities & Deliverables Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 sm:p-8 rounded-2xl bg-card border border-border space-y-5">
            <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Code2 className="w-5 h-5 text-blue-500" />
              <span>Core Capabilities & Features</span>
            </h3>
            <ul className="space-y-3">
              {service.features.map((feat, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-foreground">{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-card border border-border space-y-5">
            <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Terminal className="w-5 h-5 text-indigo-500" />
              <span>Tangible Deliverables</span>
            </h3>
            <ul className="space-y-3">
              {service.deliverables.map((deliv, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <ChevronRight className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                  <span className="text-foreground">{deliv}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Technical Stack / Tools */}
        <div className="p-6 sm:p-8 rounded-2xl bg-card border border-border space-y-4">
          <h3 className="text-sm font-mono uppercase tracking-wider text-muted-foreground font-bold">
            Supported Technologies & Tooling
          </h3>
          <div className="flex flex-wrap gap-2">
            {service.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 rounded-lg text-xs font-mono font-medium bg-background border border-border text-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Working Lifecycle Steps */}
        {service.lifecycle && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-foreground">Service Delivery Lifecycle</h2>
              <p className="text-sm text-muted-foreground mt-1">
                A disciplined, predictable framework for project execution and ongoing support
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {service.lifecycle.map((step, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-card border border-border space-y-2">
                  <span className="text-xs font-mono font-bold text-blue-500">
                    Phase 0{idx + 1}
                  </span>
                  <p className="text-sm font-semibold text-foreground">{step}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Projects / Demonstrations */}
        {service.exampleProjects && service.exampleProjects.length > 0 && (
          <div className="space-y-6 pt-4 border-t border-border">
            <div>
              <h2 className="text-xl font-bold text-foreground">Featured Demonstrations & Case Studies</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Explore real interactive implementations demonstrating this service in action
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {service.exampleProjects.map((proj) => (
                <Link
                  key={proj.slug}
                  href={`/work/${proj.slug}`}
                  className="p-5 rounded-xl bg-card border border-border hover:border-blue-500 transition-all group space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-bold text-foreground group-hover:text-blue-500 transition-colors">
                      {proj.title}
                    </h4>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {proj.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Contact CTA */}
        <div className="p-8 sm:p-12 rounded-3xl bg-neutral-950 text-neutral-100 border border-neutral-800 space-y-6 text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Need Expert Assistance with {service.title}?
          </h2>
          <p className="text-sm text-neutral-400 leading-relaxed">
            Whether embarking on a new implementation or requiring urgent troubleshooting and systems support, I am available to help.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Button href="/contact" size="md" className="bg-blue-600 hover:bg-blue-500 text-white font-semibold">
              Get in Touch Today
            </Button>
            <Button
              href={`mailto:${siteConfig.email}`}
              variant="outline"
              size="md"
              className="border-neutral-700 text-neutral-200 hover:bg-neutral-900"
            >
              Email: {siteConfig.email}
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
