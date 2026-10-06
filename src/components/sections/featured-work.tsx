"use client";

import React from "react";
import Link from "next/link";
import { projectsData } from "@/data/projects";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ArrowRight, ExternalLink, Layers } from "lucide-react";
import { GithubIcon } from "@/components/ui/social-icons";

export function FeaturedWork() {
  const featuredProjects = projectsData.filter((p) => p.featured).slice(0, 3);

  return (
    <section id="work" className="py-24 sm:py-32 bg-background relative">
      <Container size="default">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16">
          <SectionHeading
            eyebrow="SELECTED CASE STUDIES"
            title="Engineered for impact."
            subtitle="Explore how we solve operational bottlenecks and build high-performance web systems."
            className="mb-0 sm:mb-0"
          />
          <div className="mt-6 md:mt-0">
            <Button href="/work" variant="outline" size="md">
              <span>View All Projects</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </div>
        </div>

        <div className="space-y-12">
          {featuredProjects.map((project, idx) => (
            <Reveal key={project.id} delay={idx * 0.1}>
              <div className="group relative rounded-2xl border border-border bg-card overflow-hidden hover:border-foreground/40 transition-all duration-300 shadow-sm">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10 lg:p-12 items-center">
                  {/* Left Project Info */}
                  <div className="lg:col-span-6 space-y-6">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-secondary text-foreground uppercase">
                        {project.category}
                      </span>
                      <span className="text-xs font-mono text-muted-foreground">
                        {project.year}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight group-hover:text-foreground">
                        <Link href={`/work/${project.slug}`} className="hover:underline flex items-center gap-2">
                          <span>{project.title}</span>
                          <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </Link>
                      </h3>
                      <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
                        {project.shortDescription}
                      </p>
                    </div>

                    {/* Metric Highlights */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-border/80">
                      {project.results.map((res, rIdx) => (
                        <div key={rIdx} className="space-y-0.5">
                          <span className="text-lg sm:text-xl font-bold font-mono text-foreground">
                            {res.metric}
                          </span>
                          <p className="text-[11px] text-muted-foreground leading-tight">
                            {res.label}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Tech Stack Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-[11px] font-mono px-2 py-0.5 rounded border border-border bg-background text-muted-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4 pt-2">
                      <Button href={`/work/${project.slug}`} size="sm" variant="primary">
                        <span>Read Case Study</span>
                        <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                      </Button>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Demo</span>
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <GithubIcon className="w-3.5 h-3.5" />
                          <span>Source</span>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Right Project Mockup / Visual Frame */}
                  <div className="lg:col-span-6">
                    <Link
                      href={`/work/${project.slug}`}
                      className="block relative rounded-xl border border-border bg-background/90 p-5 shadow-inner overflow-hidden transition-transform duration-300 group-hover:scale-[1.01]"
                    >
                      {/* Browser Mockup Bar */}
                      <div className="flex items-center justify-between pb-3 mb-4 border-b border-border text-xs font-mono text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-border" />
                          <span className="w-2.5 h-2.5 rounded-full bg-border" />
                          <span className="w-2.5 h-2.5 rounded-full bg-border" />
                        </div>
                        <span className="text-[11px] text-muted-foreground font-mono truncate max-w-[200px]">
                          https://{project.slug}.omnitech.dev
                        </span>
                        <Layers className="w-3.5 h-3.5 text-muted-foreground" />
                      </div>

                      {/* Mock UI Composition */}
                      <div className="aspect-[16/10] rounded-lg border border-border/70 bg-gradient-to-br from-card to-secondary/30 p-6 flex flex-col justify-between">
                        <div className="space-y-2">
                          <div className="w-1/3 h-3.5 rounded bg-foreground/15" />
                          <div className="w-2/3 h-2.5 rounded bg-muted-foreground/15" />
                        </div>

                        <div className="grid grid-cols-3 gap-3">
                          <div className="h-16 rounded border border-border bg-card/80 p-2 space-y-1">
                            <div className="w-8 h-2 rounded bg-foreground/20" />
                            <div className="w-12 h-3 rounded bg-foreground/30 font-bold" />
                          </div>
                          <div className="h-16 rounded border border-border bg-card/80 p-2 space-y-1">
                            <div className="w-8 h-2 rounded bg-foreground/20" />
                            <div className="w-12 h-3 rounded bg-foreground/30 font-bold" />
                          </div>
                          <div className="h-16 rounded border border-border bg-card/80 p-2 space-y-1">
                            <div className="w-8 h-2 rounded bg-foreground/20" />
                            <div className="w-12 h-3 rounded bg-foreground/30 font-bold" />
                          </div>
                        </div>

                        <div className="p-3 rounded border border-border bg-background/60 flex items-center justify-between text-xs font-mono">
                          <span className="text-muted-foreground">Status: Operational</span>
                          <span className="font-bold text-foreground">Next.js App Router</span>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
