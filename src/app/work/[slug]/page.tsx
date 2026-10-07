import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projectsData } from "@/data/projects";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/sections/cta-section";
import {
  ArrowLeft,
  ExternalLink,
  CheckCircle2,
  Calendar,
  Layers,
} from "lucide-react";
import { GithubIcon } from "@/components/ui/social-icons";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} — Case Study`,
    description: project.shortDescription,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const relatedProjects = projectsData
    .filter((p) => p.slug !== project.slug)
    .slice(0, 2);

  return (
    <div className="pt-28 pb-16">
      {/* Back to Work link */}
      <div className="border-b border-border bg-card/40 py-4">
        <Container size="default">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-xs font-mono font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Work</span>
          </Link>
        </Container>
      </div>

      {/* Project Hero Header */}
      <section className="py-14 sm:py-20 bg-background border-b border-border">
        <Container size="default">
          <div className="max-w-4xl space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-secondary text-foreground uppercase">
                {project.category}
              </span>
              <span className="text-xs font-mono text-muted-foreground flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {project.year}
              </span>
              {project.client && (
                <span className="text-xs font-mono text-muted-foreground border-l border-border pl-3">
                  Client: {project.client}
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1]">
              {project.title}
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
              {project.description}
            </p>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              {project.liveUrl && (
                <Button
                  href={project.liveUrl}
                  isExternal={project.liveUrl.startsWith("http")}
                  size="md"
                >
                  <span>Launch Live Demo</span>
                  {project.liveUrl.startsWith("http") ? (
                    <ExternalLink className="w-4 h-4 ml-2" />
                  ) : (
                    <Layers className="w-4 h-4 ml-2" />
                  )}
                </Button>
              )}
              {project.githubUrl && (
                <Button href={project.githubUrl} isExternal variant="outline" size="md">
                  <GithubIcon className="w-4 h-4 mr-2" />
                  <span>View Repository</span>
                </Button>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Results & Metrics Banner */}
      <section className="py-10 bg-secondary/30 border-b border-border">
        <Container size="default">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
            {project.results.map((res, idx) => (
              <div key={idx} className="p-4 rounded-lg bg-card border border-border">
                <span className="text-2xl sm:text-3xl font-black font-mono text-foreground block">
                  {res.metric}
                </span>
                <span className="text-xs text-muted-foreground mt-1 block">
                  {res.label}
                </span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Case Study Content: Problem, Solution, Architecture */}
      <section className="py-20 bg-background">
        <Container size="default">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left Content Column */}
            <div className="lg:col-span-8 space-y-16">
              {/* The Challenge */}
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-muted-foreground">
                  <span className="w-2 h-2 rounded-full bg-red-500/80" />
                  The Problem & Challenge
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                  Identifying the operational bottleneck.
                </h2>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {project.problem}
                </p>
              </div>

              {/* The Solution */}
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-muted-foreground">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  The Engineering Solution
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                  Architecture & Implementation Strategy
                </h2>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {project.solution}
                </p>
              </div>

              {/* Interactive Mockup Frame */}
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-border text-xs font-mono text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                    <span className="ml-2 text-foreground font-semibold">
                      Production Architecture Preview
                    </span>
                  </div>
                  <Layers className="w-4 h-4 text-muted-foreground" />
                </div>

                <div className="aspect-[16/9] rounded-xl border border-border/80 bg-gradient-to-tr from-secondary/40 via-background to-card p-8 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <span className="text-xs font-mono uppercase text-muted-foreground">
                        Module Status
                      </span>
                      <p className="text-lg font-bold text-foreground">
                        {project.title} Engine
                      </p>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/20">
                      Active
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3 rounded-lg border border-border bg-background/80 space-y-1">
                      <span className="text-[10px] font-mono uppercase text-muted-foreground">
                        Stack
                      </span>
                      <p className="text-xs font-bold text-foreground truncate">
                        {project.technologies[0]} + {project.technologies[1]}
                      </p>
                    </div>
                    <div className="p-3 rounded-lg border border-border bg-background/80 space-y-1">
                      <span className="text-[10px] font-mono uppercase text-muted-foreground">
                        Latency
                      </span>
                      <p className="text-xs font-bold font-mono text-emerald-500">
                        &lt; 50ms Edge
                      </p>
                    </div>
                    <div className="p-3 rounded-lg border border-border bg-background/80 space-y-1">
                      <span className="text-[10px] font-mono uppercase text-muted-foreground">
                        Security
                      </span>
                      <p className="text-xs font-bold text-foreground">
                        Encrypted
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Features List */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-foreground">
                  Delivered Capabilities & Key Features
                </h3>
                <div className="space-y-3">
                  {project.keyFeatures.map((feat, fIdx) => (
                    <div
                      key={fIdx}
                      className="p-4 rounded-xl border border-border bg-card/60 flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-5 h-5 text-foreground shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground font-medium">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Sidebar: Tech Specs & Meta */}
            <div className="lg:col-span-4 space-y-8">
              <div className="p-6 sm:p-8 rounded-2xl border border-border bg-card shadow-xs space-y-6 sticky top-28">
                <h3 className="text-sm font-mono uppercase font-bold tracking-wider text-foreground pb-3 border-b border-border">
                  Project Specifications
                </h3>

                <div className="space-y-4 text-xs font-mono">
                  <div>
                    <span className="text-muted-foreground block uppercase text-[10px]">
                      Category
                    </span>
                    <span className="text-foreground font-semibold text-sm">
                      {project.category}
                    </span>
                  </div>

                  <div>
                    <span className="text-muted-foreground block uppercase text-[10px]">
                      Year
                    </span>
                    <span className="text-foreground font-semibold text-sm">
                      {project.year}
                    </span>
                  </div>

                  <div>
                    <span className="text-muted-foreground block uppercase text-[10px]">
                      Deployment Target
                    </span>
                    <span className="text-foreground font-semibold text-sm">
                      Vercel Serverless Edge
                    </span>
                  </div>

                  <div>
                    <span className="text-muted-foreground block uppercase text-[10px] mb-2">
                      Technologies Used
                    </span>
                    <div className="flex flex-wrap gap-1.5 font-sans">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 rounded bg-secondary text-xs text-foreground font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border space-y-3">
                  <p className="text-xs text-muted-foreground">
                    Interested in building something similar for your business?
                  </p>
                  <Button href="/contact" size="md" className="w-full">
                    <span>Discuss Similar Project</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="py-20 bg-secondary/20 border-t border-border">
          <Container size="default">
            <h2 className="text-2xl font-bold text-foreground mb-8">
              Explore More Case Studies
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedProjects.map((rel) => (
                <div
                  key={rel.id}
                  className="p-6 rounded-xl border border-border bg-card flex flex-col justify-between hover:border-foreground/40 transition-colors"
                >
                  <div className="space-y-3">
                    <span className="text-xs font-mono uppercase px-2 py-0.5 rounded bg-secondary text-muted-foreground font-semibold">
                      {rel.category}
                    </span>
                    <h3 className="text-xl font-bold text-foreground">
                      {rel.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {rel.shortDescription}
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-border/80">
                    <Button href={`/work/${rel.slug}`} size="sm" variant="outline">
                      <span>View Case Study</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      <CTASection />
    </div>
  );
}
