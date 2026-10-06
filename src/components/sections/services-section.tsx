"use client";

import React from "react";
import Link from "next/link";
import { servicesData } from "@/data/services";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import {
  Globe,
  LayoutDashboard,
  Cpu,
  ShieldCheck,
  Palette,
  Terminal,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Globe: <Globe className="w-6 h-6" />,
  LayoutDashboard: <LayoutDashboard className="w-6 h-6" />,
  Cpu: <Cpu className="w-6 h-6" />,
  ShieldCheck: <ShieldCheck className="w-6 h-6" />,
  Palette: <Palette className="w-6 h-6" />,
  Terminal: <Terminal className="w-6 h-6" />,
};

export function ServicesSection() {
  return (
    <section id="services" className="py-24 sm:py-32 bg-background relative">
      <Container size="default">
        <SectionHeading
          eyebrow="CAPABILITIES & SERVICES"
          title="What we build."
          subtitle="Practical digital solutions designed around your strategic goals, your end users, and your business workflows."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {servicesData.map((service, idx) => {
            const isFeatured = idx === 0 || idx === 1;
            return (
              <Reveal key={service.id} delay={idx * 0.08} className="h-full">
                <div
                  className={`group relative h-full flex flex-col justify-between p-8 rounded-xl border transition-all duration-300 ${
                    isFeatured
                      ? "bg-card border-border hover:border-foreground/40 shadow-sm"
                      : "bg-card/60 border-border hover:border-border hover:bg-card"
                  }`}
                >
                  <div className="space-y-5">
                    {/* Header: Icon & Number */}
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-lg bg-secondary text-foreground flex items-center justify-center transition-transform group-hover:scale-105 group-hover:bg-foreground group-hover:text-background">
                        {iconMap[service.iconName] || <Terminal className="w-6 h-6" />}
                      </div>
                      <span className="font-mono text-xs text-muted-foreground font-semibold">
                        0{idx + 1}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <div>
                      <h3 className="text-xl font-bold text-foreground tracking-tight group-hover:text-foreground">
                        {service.title}
                      </h3>
                      <p className="mt-2.5 text-sm text-muted-foreground leading-relaxed">
                        {service.shortDescription}
                      </p>
                    </div>

                    {/* Features list */}
                    <div className="pt-2 border-t border-border/60">
                      <ul className="space-y-2 text-xs text-muted-foreground font-normal">
                        {service.deliverables.slice(0, 3).map((item) => (
                          <li key={item} className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-foreground shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Footer link */}
                  <div className="pt-6 mt-6 border-t border-border/60">
                    <Link
                      href={`/services#${service.id}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-foreground hover:underline"
                    >
                      <span>Explore service specs</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
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
