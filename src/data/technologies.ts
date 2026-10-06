export interface TechItem {
  name: string;
  category: "Frontend" | "Backend" | "Database & Cloud" | "DevOps & Tools";
  tag: string;
}

export const techStackData: TechItem[] = [
  { name: "Next.js", category: "Frontend", tag: "App Router & SSR" },
  { name: "React", category: "Frontend", tag: "UI Component Architecture" },
  { name: "TypeScript", category: "Frontend", tag: "Strict Type Safety" },
  { name: "Tailwind CSS", category: "Frontend", tag: "Utility-First Styling" },
  { name: "Framer Motion", category: "Frontend", tag: "Motion & Fluid UI" },
  { name: "C# / .NET", category: "Backend", tag: "High-Performance Backend" },
  { name: "ASP.NET Core", category: "Backend", tag: "Enterprise Web APIs" },
  { name: "Node.js", category: "Backend", tag: "Event-Driven Services" },
  { name: "PostgreSQL", category: "Database & Cloud", tag: "Relational Database" },
  { name: "SQL Server", category: "Database & Cloud", tag: "Enterprise RDBMS" },
  { name: "Prisma ORM", category: "Backend", tag: "Type-safe Data Access" },
  { name: "Docker", category: "DevOps & Tools", tag: "Containerization" },
  { name: "Git & GitHub", category: "DevOps & Tools", tag: "Version Control & CI/CD" },
  { name: "Azure", category: "Database & Cloud", tag: "Enterprise Cloud Hosting" },
  { name: "Vercel", category: "Database & Cloud", tag: "Edge Deployment & CDN" },
  { name: "Zod", category: "Frontend", tag: "Schema Validation" },
];
