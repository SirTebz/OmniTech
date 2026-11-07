import { describe, it, expect } from "vitest";
import { siteConfig } from "@/data/site";
import { servicesData } from "@/data/services";
import { projectsData } from "@/data/projects";
import { contactFormSchema } from "@/lib/validations/contact";

describe("OmniTech Core Configuration & Integrity", () => {
  it("should have official non-negotiable contact details", () => {
    expect(siteConfig.email).toBe("sirtebz.z@gmail.com");
    expect(siteConfig.tagline).toBe("Think It. Build It. Support It. Understand It.");
    expect(siteConfig.url).toContain("omni-tech-three.vercel.app");
  });

  it("should define all 6 first-class technology service areas", () => {
    const expectedSlugs = [
      "software-development",
      "it-support",
      "application-support",
      "data-analytics",
      "website-development",
      "ui-ux-consulting",
    ];
    const presentSlugs = servicesData.map((s) => s.slug);
    expectedSlugs.forEach((slug) => {
      expect(presentSlugs).toContain(slug);
    });
  });

  it("should include all 5 interactive demonstration projects in the portfolio", () => {
    const expectedDemoSlugs = [
      "it-service-desk",
      "appwatch",
      "insighthub",
      "itops-insights",
      "fintrack",
    ];
    const presentSlugs = projectsData.map((p) => p.slug);
    expectedDemoSlugs.forEach((slug) => {
      expect(presentSlugs).toContain(slug);
    });
  });

  it("should validate valid contact form submissions", () => {
    const validData = {
      name: "Sipho Ndlovu",
      email: "sipho@client.co.za",
      phone: "+27 72 238 9325",
      service: "IT Support & Helpdesk" as const,
      preferredContact: "Email" as const,
      subject: "Office network diagnostics and M365 migration",
      message: "We need structured IT support for our 15 workstations in Johannesburg.",
      website: "",
    };
    const res = contactFormSchema.safeParse(validData);
    expect(res.success).toBe(true);
  });

  it("should reject invalid contact form with missing email or short message", () => {
    const invalidData = {
      name: "S",
      email: "invalid-email",
      service: "Software Development" as const,
      preferredContact: "Email" as const,
      subject: "Hi",
      message: "Short",
    };
    const res = contactFormSchema.safeParse(invalidData);
    expect(res.success).toBe(false);
  });
});
