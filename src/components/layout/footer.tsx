import React from "react";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import { navItems } from "@/data/navigation";
import { servicesData } from "@/data/services";
import { Container } from "@/components/ui/container";
import { Terminal, Mail, MapPin, ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon, InstagramIcon } from "@/components/ui/social-icons";

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
              <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center font-mono text-base font-bold shadow-sm transition-transform group-hover:scale-105">
                <Terminal className="w-5 h-5" />
              </div>
              <span className="font-sans font-extrabold tracking-tight">
                {siteConfig.name}
              </span>
            </Link>

            <p className="text-sm text-neutral-400 leading-relaxed max-w-sm">
              <span className="font-semibold text-neutral-200 font-mono tracking-wider block mb-1">
                {siteConfig.tagline}
              </span>
              {siteConfig.subTagline}
            </p>

            <div className="flex items-center gap-2.5 pt-2">
              <a
                href={siteConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="w-9 h-9 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-700 transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="w-9 h-9 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-700 transition-colors"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter/X Profile"
                className="w-9 h-9 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-700 transition-colors"
              >
                <TwitterIcon className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Profile"
                className="w-9 h-9 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-700 transition-colors"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                aria-label="Email OmniTech"
                className="w-9 h-9 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-700 transition-colors"
              >
                <Mail className="w-4 h-4" />
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
              Services
            </h3>
            <ul className="space-y-2.5 text-sm">
              {servicesData.map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-neutral-400 hover:text-white transition-colors line-clamp-1"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Official Contact Info */}
          <div className="md:col-span-3 space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-400 font-bold">
              Direct Contact
            </h3>
            <div className="space-y-3 text-sm text-neutral-400">
              <div>
                <span className="block text-xs text-neutral-500 uppercase font-mono mb-0.5">Email Address</span>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-neutral-200 hover:text-blue-400 hover:underline font-mono text-sm inline-flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>{siteConfig.email}</span>
                </a>
              </div>

              <div>
                <span className="block text-xs text-neutral-500 uppercase font-mono mb-0.5">Location</span>
                <span className="text-neutral-300 text-xs inline-flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                  <span>{siteConfig.location}</span>
                </span>
              </div>

              <div className="pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 px-3.5 py-2 rounded-md transition-all shadow-sm"
                >
                  <span>Let&apos;s Work Together</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 font-mono">
          <div>
            © {currentYear} {siteConfig.name} ({siteConfig.legalName}). All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>WCAG 2.2 AA Compliant</span>
            <span>Next.js 15 • TypeScript</span>
            <Link href="/contact" className="hover:text-neutral-300 transition-colors">
              Support
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
