"use client";

import React from "react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Sparkles, ShieldCheck, Users, TrendingUp } from "lucide-react";

const principles = [
  {
    icon: <Sparkles className="w-6 h-6 text-neutral-100" />,
    title: "Modern",
    description:
      "We build with current standards, strict TypeScript, and modular design patterns to ensure your software is future-proof and enjoyable to maintain.",
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-neutral-100" />,
    title: "Reliable",
    description:
      "Solutions are engineered with deep considerations for uptime, deterministic state, defensive validation, and predictable error handling.",
  },
  {
    icon: <Users className="w-6 h-6 text-neutral-100" />,
    title: "User-focused",
    description:
      "Technology is worthless if users cannot navigate it. We design intuitive interfaces that remove cognitive load and accelerate task completion.",
  },
  {
    icon: <TrendingUp className="w-6 h-6 text-neutral-100" />,
    title: "Built to grow",
    description:
      "Every architecture is designed to scale seamlessly from day one—expanding cleanly as your customer base and feature requirements multiply.",
  },
];

export function WhyOmniTech() {
  return (
    <section className="py-24 sm:py-32 bg-neutral-950 text-neutral-100 relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      <Container size="default" className="relative z-10">
        <SectionHeading
          eyebrow="OUR CORE PILLARS"
          title="Technology with purpose."
          subtitle="We avoid unnecessary complexity. We engineer software that solves real operational bottlenecks and empowers growth."
          dark
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {principles.map((p, idx) => (
            <Reveal key={p.title} delay={idx * 0.1} className="h-full">
              <div className="p-8 rounded-xl border border-neutral-800 bg-neutral-900/60 backdrop-blur-sm h-full flex flex-col justify-between hover:border-neutral-700 transition-colors group">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-neutral-800 border border-neutral-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                    {p.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    {p.title}
                  </h3>
                  <p className="text-sm text-neutral-400 leading-relaxed">
                    {p.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-neutral-800/80">
                  <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">
                    Pillar 0{idx + 1}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
