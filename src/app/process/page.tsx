import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { processSteps } from "@/data/process";
import { siteConfig } from "@/data/site";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight, ShieldCheck, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Engineering & Support Methodology",
  description:
    "Our structured 5-phase delivery and troubleshooting framework across software development, IT helpdesk, application support, and data analytics.",
};

export default function ProcessPage() {
  return (
    <div className="pt-28 pb-24 space-y-20">
      {/* Header */}
      <Container size="default">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 font-mono">
            <span>Rigorous Methodology</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground font-sans">
            Disciplined Execution From Discovery to Support
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Whether engineering a bespoke business application, triaging a critical IT support ticket, diagnosing an application error, or modeling business intelligence data, we follow a structured 5-phase framework that eliminates ambiguity and ensures predictable outcomes.
          </p>
        </div>
      </Container>

      {/* Process Steps */}
      <Container size="default">
        <div className="space-y-8">
          {processSteps.map((step) => (
            <div
              key={step.step}
              className="p-6 sm:p-8 rounded-2xl bg-card border border-border grid grid-cols-1 md:grid-cols-12 gap-6 items-start"
            >
              <div className="md:col-span-3 space-y-2">
                <span className="text-3xl sm:text-4xl font-extrabold font-mono text-blue-600 dark:text-blue-400">
                  {step.step}
                </span>
                <h3 className="text-xl font-bold text-foreground">{step.title}</h3>
                <p className="text-xs text-muted-foreground font-mono">{step.subtitle}</p>
                <div className="flex flex-wrap gap-1 pt-2">
                  {step.disciplines.map((d) => (
                    <span
                      key={d}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-accent text-foreground"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>

              <div className="md:col-span-5 space-y-3">
                <p className="text-sm text-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="md:col-span-4 p-4 rounded-xl bg-background border border-border space-y-2.5">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground block">
                  Key Deliverables
                </span>
                <ul className="space-y-1.5 text-xs text-muted-foreground">
                  {step.deliverables.map((deliv, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                      <span className="text-foreground">{deliv}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </Container>

      {/* CTA */}
      <Container size="default">
        <div className="p-8 sm:p-12 rounded-3xl bg-neutral-950 text-white border border-neutral-800 text-center max-w-2xl mx-auto space-y-5">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Ready to Begin Your Project?
          </h2>
          <p className="text-sm text-neutral-400 leading-relaxed">
            Contact OmniTech today for a complimentary discovery conversation to review your system requirements or technical challenges.
          </p>
          <div className="flex justify-center gap-3 pt-2">
            <Button href="/contact" size="md" className="bg-blue-600 hover:bg-blue-500 text-white font-semibold">
              <span>Schedule Discovery</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
