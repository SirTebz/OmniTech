"use client";

import React from "react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { ArrowRight, Code2 } from "lucide-react";
import { siteConfig } from "@/data/site";

export function CTASection() {
  return (
    <section className="py-24 sm:py-32 bg-background relative overflow-hidden">
      <Container size="default">
        <Reveal direction="up">
          <div className="relative rounded-2xl border border-border bg-card p-8 sm:p-14 lg:p-20 overflow-hidden shadow-lg text-center">
            {/* Background elements */}
            <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-foreground/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-3xl mx-auto space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-secondary text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground">
                <Code2 className="w-3.5 h-3.5" />
                <span>{siteConfig.tagline}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
                Have an idea? Let&apos;s build it.
              </h2>

              <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
                Whether you need a new website, a custom web application, or technical guidance on modernizing an existing digital product, let&apos;s explore what you&apos;re trying to achieve.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <Button href="/contact" size="lg" className="font-semibold shadow-md">
                  <span>Start a Project</span>
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button href="/work" variant="outline" size="lg">
                  View Our Work
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
