import React from "react";
import { processSteps } from "@/data/process";
import { Container } from "@/components/ui/container";
import { CheckCircle2 } from "lucide-react";

export function ProcessSection() {
  return (
    <section className="py-20 bg-background border-t border-border/80">
      <Container size="default">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-accent text-foreground font-mono">
            <span>Our Methodology</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground font-sans">
            How We Deliver Technical Solutions
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            A disciplined, predictable framework applied across software engineering, IT support, and data analytics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {processSteps.map((step) => (
            <div
              key={step.step}
              className="p-6 rounded-2xl bg-card border border-border flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <span className="text-3xl font-extrabold font-mono text-blue-500">
                  {step.step}
                </span>
                <h3 className="text-base font-bold text-foreground">{step.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {step.subtitle}
                </p>
              </div>

              <div className="pt-3 border-t border-border/60 space-y-1">
                <span className="text-[10px] font-mono uppercase text-muted-foreground block font-bold">
                  Deliverable:
                </span>
                <p className="text-xs font-medium text-foreground">
                  {step.deliverables[0]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
