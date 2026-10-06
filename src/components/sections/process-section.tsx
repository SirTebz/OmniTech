"use client";

import React from "react";
import { processSteps } from "@/data/process";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { CheckCircle2, ArrowRight } from "lucide-react";

export function ProcessSection() {
  return (
    <section className="py-24 sm:py-32 bg-secondary/30 border-y border-border relative">
      <Container size="default">
        <SectionHeading
          eyebrow="ENGINEERING LIFECYCLE"
          title="From idea to implementation."
          subtitle="A predictable, transparent engineering framework designed to deliver production-ready software without guesswork."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {processSteps.map((step, idx) => (
            <Reveal key={step.number} delay={idx * 0.1} className="h-full">
              <div className="relative h-full flex flex-col justify-between p-6 rounded-xl border border-border bg-card shadow-xs hover:border-foreground/40 transition-colors group">
                <div className="space-y-4">
                  {/* Step Number */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-2xl font-black text-foreground tracking-tighter">
                      {step.number}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-secondary text-muted-foreground uppercase font-bold">
                      Phase {idx + 1}
                    </span>
                  </div>

                  {/* Title & Summary */}
                  <div>
                    <h3 className="text-lg font-bold text-foreground tracking-tight">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                      {step.summary}
                    </p>
                  </div>

                  {/* Key Tasks */}
                  <ul className="space-y-2 pt-3 border-t border-border/60 text-[11px] text-muted-foreground font-mono">
                    {step.details.slice(0, 2).map((detail, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-1.5">
                        <span className="text-foreground font-bold">•</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Deliverable Badge */}
                <div className="pt-4 mt-4 border-t border-border/60">
                  <span className="block text-[10px] font-mono uppercase text-muted-foreground">
                    Key Outcome
                  </span>
                  <p className="text-xs font-semibold text-foreground mt-0.5 line-clamp-1">
                    {step.deliverable}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
