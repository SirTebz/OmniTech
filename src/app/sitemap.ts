import { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";
import { projectsData } from "@/data/projects";
import { servicesData } from "@/data/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  const coreRoutes = ["", "/services", "/work", "/about", "/process", "/contact"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const serviceRoutes = servicesData.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  const projectRoutes = projectsData.map((project) => ({
    url: `${baseUrl}/work/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  const demoSlugs = [
    "it-service-desk",
    "appwatch",
    "insighthub",
    "itops-insights",
    "fintrack",
  ];

  const demoRoutes = demoSlugs.map((slug) => ({
    url: `${baseUrl}/demos/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  return [...coreRoutes, ...serviceRoutes, ...projectRoutes, ...demoRoutes];
}
