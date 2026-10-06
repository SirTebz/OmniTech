import type { Metadata } from "next";
import { siteConfig } from "@/data/site";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/sections/cta-section";
import {
  Code2,
  Terminal,
  ShieldCheck,
  Zap,
  Target,
  CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us — Philosophy & Engineering Approach",
  description:
    "Learn about OmniTech's philosophy, engineering approach, and commitment to building purposeful, high-performance software.",
};

export default function AboutPage() {
  return (
    <div className="pt-28 pb-16">
      {/* About Header */}
      <section className="py-12 sm:py-20 bg-background border-b border-border">
        <Container size="default">
          <SectionHeading
            eyebrow="ABOUT OMNITECH"
            title="Technology should make things simpler."
            subtitle="OmniTech is a technology-focused development studio dedicated to turning ideas into reliable, high-performance digital products."
          />
        </Container>
      </section>

      {/* Main Philosophy Section */}
      <section className="py-20 bg-background">
        <Container size="default">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7 space-y-6 text-base text-muted-foreground leading-relaxed">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
                Our Philosophy
              </h2>
              <p>
                In an era overloaded with unnecessary complexity, excessive dependencies, and brittle software, OmniTech takes a deliberate, disciplined engineering approach. We believe software should be fast, accessible, secure, and straightforward to maintain.
              </p>
              <p>
                Whether partnering with early-stage founders to launch their minimum viable product or helping established businesses automate bottlenecks, our focus remains singular: build practical solutions that deliver demonstrable commercial and operational value.
              </p>

              <div className="pt-6">
                <h3 className="text-xl font-bold text-foreground mb-4">
                  How We Operate
                </h3>
                <div className="space-y-4">
                  <div className="p-4 rounded-xl border border-border bg-card flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-foreground shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-foreground block text-sm font-semibold">
                        Transparent Communication
                      </strong>
                      <span className="text-xs text-muted-foreground">
                        Direct communication with the engineer building your product—no layers of account managers or miscommunicated specifications.
                      </span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border border-border bg-card flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-foreground shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-foreground block text-sm font-semibold">
                        Strict Technical Standards
                      </strong>
                      <span className="text-xs text-muted-foreground">
                        Strict TypeScript typing, semantic HTML5, WCAG 2.2 AA accessibility, and zero-compromise Core Web Vitals optimization.
                      </span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border border-border bg-card flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-foreground shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-foreground block text-sm font-semibold">
                        No Vendor Lock-In
                      </strong>
                      <span className="text-xs text-muted-foreground">
                        You own 100% of your source code, deployment pipelines, and design assets from day one.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Card / Studio Highlights */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-8 rounded-2xl border border-border bg-card shadow-xs space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-border">
                  <div className="w-10 h-10 rounded-lg bg-foreground text-background flex items-center justify-center font-mono font-bold">
                    <Code2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-foreground">
                      {siteConfig.legalName}
                    </h3>
                    <span className="text-xs font-mono text-muted-foreground">
                      {siteConfig.location}
                    </span>
                  </div>
                </div>

                <div className="space-y-4 text-xs font-mono">
                  <div className="flex justify-between py-2 border-b border-border/60">
                    <span className="text-muted-foreground">Core Stacks</span>
                    <span className="text-foreground font-semibold">Next.js, TypeScript, .NET</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border/60">
                    <span className="text-muted-foreground">Operating Region</span>
                    <span className="text-foreground font-semibold">South Africa & Global Remote</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border/60">
                    <span className="text-muted-foreground">Accessibility Target</span>
                    <span className="text-foreground font-semibold">WCAG 2.2 AA Standard</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-muted-foreground">Engineering Motto</span>
                    <span className="text-foreground font-bold">{siteConfig.tagline}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <Button href="/contact" size="md" className="w-full justify-center">
                    Start a Conversation
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <CTASection />
    </div>
  );
}
