import React from "react";
import { technicalCapabilities } from "@/data/technologies";
import { Container } from "@/components/ui/container";

export function TechnologySection() {
  return (
    <section className="py-20 bg-background border-t border-border/80">
      <Container size="default">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-accent text-foreground font-mono">
            <span>Verified Tooling</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground font-sans">
            Technical Stack & Capabilities
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Our technical breadth across software development, IT helpdesk, systems support, and business analytics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {technicalCapabilities.map((cat) => (
            <div key={cat.title} className="p-6 rounded-2xl bg-card border border-border space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-border">
                <h3 className="font-bold text-foreground text-base">{cat.title}</h3>
                <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-accent text-muted-foreground">
                  {cat.discipline}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">{cat.description}</p>
              <div className="flex flex-wrap gap-1.5 pt-2">
                {cat.items.map((item) => (
                  <span
                    key={item.name}
                    className="px-2.5 py-1 text-xs font-mono rounded-md bg-background border border-border text-foreground"
                  >
                    {item.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
