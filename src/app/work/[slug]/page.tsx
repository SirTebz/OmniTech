import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { projectsData } from "@/data/projects";
import { siteConfig } from "@/data/site";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  ExternalLink,
  CheckCircle2,
  ShieldCheck,
  Terminal,
} from "lucide-react";
import { GithubIcon } from "@/components/ui/social-icons";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projectsData.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const project = projectsData.find((p) => p.slug === resolvedParams.slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} | OmniTech Portfolio`,
    description: project.shortDescription,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const project = projectsData.find((p) => p.slug === resolvedParams.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="pt-28 pb-20">
      <Container size="default" className="space-y-16">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
          <Link href="/work" className="hover:text-foreground inline-flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Projects</span>
          </Link>
          <span>/</span>
          <span className="text-foreground">{project.category}</span>
        </div>

        {/* Project Header */}
        <div className="space-y-6 max-w-4xl">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 font-mono">
              {project.categoryBadge}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-accent text-foreground font-mono">
              {project.projectType}
            </span>
            <span className="text-xs font-mono text-muted-foreground">
              {project.year} • {project.client || "Engineering Showcase"}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground font-sans">
            {project.title}
          </h1>

          <p className="text-lg text-muted-foreground leading-relaxed">
            {project.description}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            {project.demoUrl ? (
              <Button href={project.demoUrl} size="md" className="bg-blue-600 hover:bg-blue-500 text-white font-semibold">
                <Sparkles className="w-4 h-4 mr-1.5" />
                <span>Launch Interactive Demo</span>
                <ExternalLink className="w-4 h-4 ml-1.5" />
              </Button>
            ) : project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-colors"
              >
                <span>View Live Site</span>
                <ExternalLink className="w-4 h-4 ml-1" />
              </a>
            ) : null}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-card hover:bg-accent text-xs font-mono font-medium transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub Repository</span>
              </a>
            )}
          </div>
        </div>

        {/* Key Outcomes / Metrics */}
        {project.results && project.results.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {project.results.map((res, i) => (
              <div key={i} className="p-5 rounded-xl bg-card border border-border space-y-1">
                <div className="text-2xl sm:text-3xl font-extrabold font-mono text-blue-500">
                  {res.metric}
                </div>
                <div className="text-xs text-muted-foreground font-mono">{res.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Problem vs Solution Split */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 sm:p-8 rounded-2xl bg-card border border-border space-y-3">
            <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-500" />
              <span>The Operational Problem</span>
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {project.problem}
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-card border border-border space-y-3">
            <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Terminal className="w-5 h-5 text-emerald-500" />
              <span>Engineered Solution</span>
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {project.solution}
            </p>
          </div>
        </div>

        {/* Key Features */}
        <div className="p-6 sm:p-8 rounded-2xl bg-card border border-border space-y-5">
          <h3 className="text-lg font-bold text-foreground">Key Technical Highlights & Implementation</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {project.keyFeatures.map((feat, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <span className="text-foreground">{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Technologies Used */}
        <div className="p-6 sm:p-8 rounded-2xl bg-card border border-border space-y-4">
          <h3 className="text-sm font-mono uppercase tracking-wider text-muted-foreground font-bold">
            Technologies & Tools Employed
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((t) => (
              <span
                key={t}
                className="px-3 py-1.5 rounded-lg text-xs font-mono font-medium bg-background border border-border text-foreground"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="p-8 sm:p-12 rounded-3xl bg-neutral-950 text-neutral-100 border border-neutral-800 text-center max-w-2xl mx-auto space-y-5">
          <h3 className="text-2xl font-bold tracking-tight">
            Interested in Similar Capabilities for Your Organisation?
          </h3>
          <p className="text-sm text-neutral-400">
            Let&apos;s discuss custom development, IT support infrastructure, or application monitoring for your business.
          </p>
          <div className="flex justify-center gap-3 pt-2">
            <Button href="/contact" size="md" className="bg-blue-600 hover:bg-blue-500 text-white font-semibold">
              Contact OmniTech
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
