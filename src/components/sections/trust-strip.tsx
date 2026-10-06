"use client";

import React from "react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

const capabilities = [
  "WEB DEVELOPMENT",
  "CUSTOM APPLICATIONS",
  "DIGITAL EXPERIENCES",
  "TECHNICAL SOLUTIONS",
  "CLOUD ARCHITECTURE",
];

export function TrustStrip() {
  return (
    <div className="border-y border-border bg-card/40 py-5 overflow-hidden">
      <Container size="default">
        <Reveal direction="none">
          <div className="flex flex-wrap items-center justify-between gap-y-4 gap-x-8 text-xs font-mono font-bold tracking-widest text-muted-foreground uppercase">
            {capabilities.map((item, idx) => (
              <div key={item} className="flex items-center gap-4 group">
                <span className="text-foreground/40 group-hover:text-foreground transition-colors">
                  0{idx + 1}
                </span>
                <span className="text-foreground tracking-wider group-hover:text-foreground/80 transition-colors">
                  {item}
                </span>
                {idx !== capabilities.length - 1 && (
                  <span className="hidden md:inline-block w-1.5 h-1.5 rounded-full bg-border" />
                )}
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </div>
  );
}
