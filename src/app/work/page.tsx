import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { projectsData, ProjectCategory } from "@/data/projects";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import {
  Code2,
  ExternalLink,
  Sparkles,
  ArrowRight,
  Headphones,
  Activity,
  BarChart3,
  Globe,
  Terminal,
} from "lucide-react";
import ProjectsClientFilter from "./projects-client";

export const metadata: Metadata = {
  title: "Professional Projects & Interactive Demonstrations",
  description:
    "Explore our technical portfolio across software development, IT helpdesk, application incident support, and business intelligence with zero-login live interactive demos.",
};

export default function WorkPage() {
  return (
    <div className="pt-28 pb-24 space-y-16">
      {/* Page Header */}
      <Container size="default">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 font-mono">
            <span>Verified Portfolio & Practical Demos</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground font-sans">
            Technical Capabilities Demonstrated in Practice
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            A comprehensive portfolio featuring full-stack applications, operational IT service desk simulations, application support monitoring dashboards, and interactive business intelligence tools. Explore working interactive demonstrations directly without registration.
          </p>
        </div>
      </Container>

      {/* Interactive Filter and Project Grid */}
      <Container size="default">
        <ProjectsClientFilter projects={projectsData} />
      </Container>
    </div>
  );
}
