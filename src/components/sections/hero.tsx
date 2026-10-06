"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Terminal, Layers, Shield, Cpu } from "lucide-react";
import { siteConfig } from "@/data/site";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden bg-background">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-foreground/5 rounded-full blur-3xl pointer-events-none" />

      <Container size="default" className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-8 text-left">
            {/* Eyebrow badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-card/80 backdrop-blur-sm text-xs font-mono tracking-wider font-semibold uppercase text-muted-foreground shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>DIGITAL PRODUCTS • WEBSITES • WEB APPLICATIONS</span>
              </div>
            </motion.div>

            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-2"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold tracking-tight text-foreground leading-[1.08]">
                Turning ideas into <br />
                <span className="underline decoration-border decoration-wavy decoration-2 underline-offset-8">
                  digital solutions.
                </span>
              </h1>
            </motion.div>

            {/* Supporting Copy */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg sm:text-xl text-muted-foreground font-normal max-w-2xl leading-relaxed"
            >
              We design and build modern websites and web applications that turn ideas into useful, reliable, high-performance digital experiences.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <Button href="/contact" size="lg" className="font-semibold shadow-md">
                <span>Let&apos;s Build Together</span>
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button href="/work" variant="outline" size="lg" className="font-medium">
                Explore Our Work
              </Button>
            </motion.div>

            {/* Tech highlights footnote */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="pt-6 border-t border-border/60 flex items-center gap-6 text-xs text-muted-foreground font-mono"
            >
              <div className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-foreground" />
                <span>Production Grade</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-foreground" />
                <span>Next.js & TypeScript</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-foreground" />
                <span>WCAG 2.2 AA</span>
              </div>
            </motion.div>
          </div>

          {/* Right Hero Visual (Abstract IDE / Digital Composition) */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative mx-auto max-w-lg lg:max-w-none"
            >
              {/* Floating Glow Card */}
              <div className="rounded-xl border border-border bg-card/90 backdrop-blur-xl p-5 shadow-2xl space-y-4">
                {/* Code Window Header */}
                <div className="flex items-center justify-between pb-3 border-b border-border text-xs font-mono text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    <span className="ml-2 text-foreground font-medium">omnitech.engine.ts</span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] bg-secondary px-2 py-0.5 rounded text-foreground font-semibold">
                    <Terminal className="w-3 h-3" />
                    READY
                  </div>
                </div>

                {/* Animated Code Representation */}
                <div className="font-mono text-xs text-foreground/90 space-y-2 py-2 overflow-hidden leading-relaxed">
                  <p className="text-muted-foreground">// Building tailored digital architecture</p>
                  <p>
                    <span className="text-muted-foreground">const</span>{" "}
                    <span className="text-foreground font-bold">project</span> ={" "}
                    <span className="text-muted-foreground">await</span>{" "}
                    OmniTech.<span className="font-semibold">build</span>({`{`}
                  </p>
                  <p className="pl-4">
                    vision: <span className="text-muted-foreground">&quot;Scale business online&quot;</span>,
                  </p>
                  <p className="pl-4">
                    standards: [<span className="text-muted-foreground">&quot;Fast&quot;</span>,{" "}
                    <span className="text-muted-foreground">&quot;Reliable&quot;</span>,{" "}
                    <span className="text-muted-foreground">&quot;Accessible&quot;</span>],
                  </p>
                  <p className="pl-4">
                    architecture: <span className="text-foreground font-semibold">&quot;Next.js + TypeScript + Cloud&quot;</span>,
                  </p>
                  <p className="pl-4">
                    execution: <span className="text-emerald-500 font-semibold">&quot;Flawless&quot;</span>
                  </p>
                  <p>{`});`}</p>
                </div>

                {/* Micro Metric Widgets */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-lg border border-border bg-background/50 space-y-1">
                    <span className="text-[11px] font-mono uppercase text-muted-foreground">
                      Core Web Vitals
                    </span>
                    <p className="text-xl font-bold font-mono text-foreground flex items-center gap-1">
                      100<span className="text-xs font-normal text-muted-foreground">/100</span>
                    </p>
                  </div>
                  <div className="p-3 rounded-lg border border-border bg-background/50 space-y-1">
                    <span className="text-[11px] font-mono uppercase text-muted-foreground">
                      Accessibility
                    </span>
                    <p className="text-xl font-bold font-mono text-foreground flex items-center gap-1">
                      WCAG <span className="text-xs font-semibold text-emerald-500">2.2 AA</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Accent Tag */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -left-6 hidden sm:flex items-center gap-3 px-4 py-2.5 rounded-lg border border-border bg-card/95 shadow-xl backdrop-blur-md"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <div className="text-xs font-mono">
                  <span className="text-muted-foreground">Status:</span>{" "}
                  <span className="font-bold text-foreground">Deploying Solutions</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
