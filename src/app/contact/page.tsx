import type { Metadata } from "next";
import { siteConfig } from "@/data/site";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ContactForm } from "@/components/forms/contact-form";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/ui/social-icons";

export const metadata: Metadata = {
  title: "Contact & Start a Project",
  description:
    "Get in touch with OmniTech to discuss your website, web application, or custom software project.",
};

export default function ContactPage() {
  return (
    <div className="pt-28 pb-20">
      {/* Contact Header */}
      <section className="py-12 sm:py-20 bg-background border-b border-border">
        <Container size="default">
          <SectionHeading
            eyebrow="GET IN TOUCH"
            title="Let's build something useful."
            subtitle="Have a project in mind, an existing system to revamp, or a technical inquiry? Send us a message and let's discuss how to bring it to life."
          />
        </Container>
      </section>

      {/* Main Content Grid */}
      <section className="py-16 sm:py-20 bg-background">
        <Container size="default">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left: Contact Form */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>

            {/* Right: Direct Contact Info & Directives */}
            <div className="lg:col-span-5 space-y-8">
              <div className="p-8 rounded-2xl border border-border bg-card shadow-xs space-y-6">
                <h3 className="text-lg font-bold text-foreground">
                  Direct Inquiries
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Prefer direct correspondence? Feel free to reach out via email or connect with us on professional networks.
                </p>

                <div className="space-y-4 text-sm">
                  <div className="flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-lg bg-secondary text-foreground flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono uppercase text-muted-foreground block">
                        Email Address
                      </span>
                      <a
                        href={`mailto:${siteConfig.email}`}
                        className="text-foreground font-semibold hover:underline font-mono text-xs"
                      >
                        {siteConfig.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-lg bg-secondary text-foreground flex items-center justify-center shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono uppercase text-muted-foreground block">
                        Phone / WhatsApp
                      </span>
                      <span className="text-foreground font-semibold font-mono text-xs">
                        {siteConfig.phone}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-lg bg-secondary text-foreground flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono uppercase text-muted-foreground block">
                        Location
                      </span>
                      <span className="text-foreground font-medium text-xs">
                        {siteConfig.location}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-lg bg-secondary text-foreground flex items-center justify-center shrink-0">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono uppercase text-muted-foreground block">
                        Availability
                      </span>
                      <span className="text-foreground font-medium text-xs">
                        {siteConfig.workingHours}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Social Connects */}
                <div className="pt-6 border-t border-border space-y-3">
                  <span className="text-[11px] font-mono uppercase text-muted-foreground block font-bold">
                    Professional Networks
                  </span>
                  <div className="flex items-center gap-3">
                    <a
                      href={siteConfig.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg border border-border bg-background hover:bg-secondary text-foreground transition-colors"
                      aria-label="GitHub"
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>
                    <a
                      href={siteConfig.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg border border-border bg-background hover:bg-secondary text-foreground transition-colors"
                      aria-label="LinkedIn"
                    >
                      <LinkedinIcon className="w-4 h-4" />
                    </a>
                    <a
                      href={siteConfig.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg border border-border bg-background hover:bg-secondary text-foreground transition-colors"
                      aria-label="Twitter / X"
                    >
                      <TwitterIcon className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
