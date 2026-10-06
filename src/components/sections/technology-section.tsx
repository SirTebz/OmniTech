"use client";

import React from "react";
import { techStackData } from "@/data/technologies";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

export function TechnologySection() {
  const categories = ["Frontend", "Backend", "Database & Cloud", "DevOps & Tools"] as const;

  return (
    <section className="py-24 sm:py-32 bg-secondary/20 border-y border-border relative">
      <Container size="default">
        <SectionHeading
          eyebrow="TECHNOLOGY ECOSYSTEM"
          title="Technologies we work with."
          subtitle="We select battle-tested, high-performance tools engineered for long-term maintainability, speed, and type safety."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, catIdx) => {
            const items = techStackData.filter((t) => t.category === cat);
            return (
              <Reveal key={cat} delay={catIdx * 0.1} className="h-full">
                <div className="p-6 rounded-xl border border-border bg-card shadow-xs h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 pb-3 mb-4 border-b border-border">
                      <span className="w-2 h-2 rounded-full bg-foreground" />
                      <h3 className="text-sm font-mono uppercase font-bold tracking-wider text-foreground">
                        {cat}
                      </h3>
                    </div>
                    <div className="space-y-3">
                      {items.map((tech) => (
                        <div
                          key={tech.name}
                          className="flex items-center justify-between p-2 rounded-md hover:bg-secondary/60 transition-colors"
                        >
                          <span className="text-sm font-semibold text-foreground">
                            {tech.name}
                          </span>
                          <span className="text-[10px] font-mono text-muted-foreground px-2 py-0.5 rounded bg-secondary">
                            {tech.tag}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
