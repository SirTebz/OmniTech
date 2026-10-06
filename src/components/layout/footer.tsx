import React from "react";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import { navItems } from "@/data/navigation";
import { servicesData } from "@/data/services";
import { Container } from "@/components/ui/container";
import { Code2, ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/ui/social-icons";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-950 text-neutral-200 border-t border-neutral-900 transition-colors">
      <Container size="default" className="py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
          {/* Brand Col */}
          <div className="md:col-span-4 space-y-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 text-white font-bold tracking-tight text-2xl group"
            >
              <div className="w-9 h-9 rounded-lg bg-white text-black flex items-center justify-center font-mono text-base font-bold shadow-sm transition-transform group-hover:scale-105">
                <Code2 className="w-5 h-5" />
              </div>
              <span className="font-sans font-extrabold tracking-tight">
                {siteConfig.name}
              </span>
            </Link>

            <p className="text-sm text-neutral-400 leading-relaxed max-w-sm">
              <span className="font-semibold text-neutral-200 font-mono tracking-wider block mb-1">
                {siteConfig.tagline}
              </span>
              {siteConfig.subTagline} {siteConfig.description}
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={siteConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="w-9 h-9 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-700 transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="w-9 h-9 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-700 transition-colors"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter / X profile"
                className="w-9 h-9 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-700 transition-colors"
              >
                <TwitterIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-400 font-bold">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-neutral-400 hover:text-white transition-colors flex items-center gap-1 group"
                  >
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div className="md:col-span-3 space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-400 font-bold">
              Capabilities
            </h3>
            <ul className="space-y-2.5 text-sm">
              {servicesData.map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/services#${service.id}`}
                    className="text-neutral-400 hover:text-white transition-colors line-clamp-1"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact / Inquiries */}
          <div className="md:col-span-3 space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-400 font-bold">
              Inquiries
            </h3>
            <div className="space-y-2.5 text-sm text-neutral-400">
              <p>
                <span className="block text-xs text-neutral-500 uppercase font-mono">Email</span>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-neutral-200 hover:underline font-mono text-xs"
                >
                  {siteConfig.email}
                </a>
              </p>
              <p>
                <span className="block text-xs text-neutral-500 uppercase font-mono">Phone</span>
                <span className="text-neutral-200 font-mono text-xs">{siteConfig.phone}</span>
              </p>
              <p>
                <span className="block text-xs text-neutral-500 uppercase font-mono">Location</span>
                <span className="text-neutral-300 text-xs">{siteConfig.location}</span>
              </p>
              <div className="pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-white bg-neutral-900 border border-neutral-800 hover:border-neutral-600 px-3 py-1.5 rounded transition-all"
                >
                  <span>Start a Project</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 font-mono">
          <div>
            © {currentYear} {siteConfig.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>WCAG 2.2 AA Compliant</span>
            <span>Next.js • TypeScript</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
