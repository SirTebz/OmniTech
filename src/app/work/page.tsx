import type { Metadata } from "next";
import Link from "next/link";
import { projectsData } from "@/data/projects";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/sections/cta-section";
import { ArrowUpRight, ArrowRight, ExternalLink, Layers } from "lucide-react";
import { GithubIcon } from "@/components/ui/social-icons";

export const metadata: Metadata = {
  title: "Selected Work & Case Studies",
  description:
    "Explore case studies, full-stack applications, and digital platforms built by OmniTech.",
};

export default function WorkPage() {
  return (
    <div className="pt-28 pb-16">
      <section className="py-12 sm:py-20 bg-background border-b border-border">
        <Container size="default">
          <SectionHeading
            eyebrow="PORTFOLIO & CASE STUDIES"
            title="Engineered solutions. Measurable results."
            subtitle="Explore our portfolio of custom web applications, responsive platforms, and mission-critical software architectures."
          />
        </Container>
      </section>

      <section className="py-20 bg-background">
        <Container size="default">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">
            {projectsData.map((project) => (
              <div
                key={project.id}
                className="group relative rounded-2xl border border-border bg-card p-6 sm:p-8 flex flex-col justify-between hover:border-foreground/40 transition-all duration-300 shadow-xs"
              >
                <div className="space-y-6">
                  {/* Browser Mockup Visual Preview */}
                  <Link
                    href={`/work/${project.slug}`}
                    className="block rounded-xl border border-border bg-background p-4 shadow-inner overflow-hidden transition-transform group-hover:scale-[1.01]"
                  >
                    <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-border text-[11px] font-mono text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-border" />
                        <span className="w-2 h-2 rounded-full bg-border" />
                        <span className="w-2 h-2 rounded-full bg-border" />
                      </div>
                      <span className="truncate max-w-[180px]">
                        {project.slug}.omnitech.dev
                      </span>
                      <Layers className="w-3.5 h-3.5" />
                    </div>

                    <div className="aspect-[16/9] rounded-lg border border-border/70 bg-gradient-to-br from-card to-secondary/40 p-5 flex flex-col justify-between">
                      <div className="space-y-1.5">
                        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-secondary text-foreground">
                          {project.category}
                        </span>
                        <h4 className="text-base font-bold text-foreground line-clamp-1">
                          {project.title}
                        </h4>
                      </div>

                      <div className="grid grid-cols-2 gap-2 pt-2 text-left">
                        {project.results.slice(0, 2).map((res, rIdx) => (
                          <div key={rIdx} className="p-2 rounded bg-card border border-border text-[10px]">
                            <span className="font-bold text-foreground block text-xs font-mono">
                              {res.metric}
                            </span>
                            <span className="text-muted-foreground line-clamp-1">{res.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Link>

                  {/* Project Info */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-secondary text-foreground uppercase">
                        {project.category}
                      </span>
                      <span className="text-xs font-mono text-muted-foreground">
                        {project.year}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                      <Link href={`/work/${project.slug}`} className="hover:underline flex items-center justify-between">
                        <span>{project.title}</span>
                        <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    </h3>

                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {project.shortDescription}
                    </p>
                  </div>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="text-[11px] font-mono px-2 py-0.5 rounded border border-border bg-background text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-6 mt-6 border-t border-border/70 flex items-center justify-between">
                  <Button href={`/work/${project.slug}`} size="sm" variant="outline">
                    <span>View Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </Button>

                  <div className="flex items-center gap-3">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="Live Demo"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="GitHub Repository"
                      >
                        <GithubIcon className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CTASection />
    </div>
  );
}
