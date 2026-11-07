"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { ProjectItem, ProjectCategory } from "@/data/projects";
import {
  Sparkles,
  ArrowRight,
  ExternalLink,
  Code2,
  Headphones,
  Activity,
  BarChart3,
  Globe,
  Search,
} from "lucide-react";

const categories: ProjectCategory[] = [
  "All Projects",
  "Software Development",
  "IT Support & Helpdesk",
  "Application Support",
  "Data Analytics",
  "Web Development",
];

export default function ProjectsClientFilter({ projects }: { projects: ProjectItem[] }) {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>("All Projects");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchCat =
        selectedCategory === "All Projects" || project.category === selectedCategory;
      const matchSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.technologies.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchCat && matchSearch;
    });
  }, [projects, selectedCategory, searchQuery]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Software Development":
        return <Code2 className="w-4 h-4 text-blue-500" />;
      case "IT Support & Helpdesk":
        return <Headphones className="w-4 h-4 text-emerald-500" />;
      case "Application Support":
        return <Activity className="w-4 h-4 text-amber-500" />;
      case "Data Analytics":
        return <BarChart3 className="w-4 h-4 text-indigo-500" />;
      default:
        return <Globe className="w-4 h-4 text-cyan-500" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Category Pills & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-border">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold font-mono transition-all ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-neutral-400"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search projects & tech..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg bg-card border border-border focus:outline-none focus:ring-1 focus:ring-blue-500 text-foreground"
          />
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.length === 0 ? (
          <div className="col-span-full p-12 text-center rounded-2xl bg-card border border-border text-muted-foreground text-sm">
            No projects found matching the active category or search query.
          </div>
        ) : (
          filteredProjects.map((project) => (
            <div
              key={project.id}
              className="p-6 sm:p-7 rounded-2xl bg-card border border-border hover:border-blue-500/50 transition-all flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-4">
                {/* Category & Badge */}
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground">
                    {getCategoryIcon(project.category)}
                    <span>{project.category}</span>
                  </span>

                  {project.demoUrl ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                      <Sparkles className="w-3 h-3" />
                      <span>Live Demo</span>
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-accent text-foreground">
                      {project.projectType}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-foreground group-hover:text-blue-500 transition-colors">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {project.shortDescription}
                </p>

                {/* Metrics Highlight */}
                {project.results && project.results.length > 0 && (
                  <div className="p-3 rounded-xl bg-background border border-border/80 flex items-center justify-between font-mono text-xs">
                    <span className="text-muted-foreground">{project.results[0].label}:</span>
                    <span className="font-bold text-foreground">{project.results[0].metric}</span>
                  </div>
                )}

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 text-[10px] font-mono rounded bg-background border border-border text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="px-1.5 py-0.5 text-[10px] font-mono rounded text-muted-foreground">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-border flex items-center justify-between gap-3">
                <Link
                  href={`/work/${project.slug}`}
                  className="text-xs font-semibold text-foreground hover:text-blue-500 transition-colors inline-flex items-center gap-1"
                >
                  <span>Case Study</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                {project.demoUrl && (
                  <Link
                    href={project.demoUrl}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-sm transition-colors"
                  >
                    <span>Launch Demo</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
