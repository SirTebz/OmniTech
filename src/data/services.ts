export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  features: string[];
  deliverables: string[];
  technologies: string[];
}

export const servicesData: ServiceItem[] = [
  {
    id: "websites",
    slug: "websites",
    title: "Websites",
    shortDescription:
      "Modern, ultra-fast responsive websites engineered to establish a premier market presence and convert visitors.",
    fullDescription:
      "We design and engineer bespoke web experiences from high-impact marketing websites to extensive corporate platforms. Each site is built with pristine semantic markup, fast load speeds, fluid responsiveness, and built-in technical SEO.",
    iconName: "Globe",
    features: [
      "Bespoke Responsive Layouts",
      "Core Web Vitals & Performance Optimization",
      "Technical SEO & Structured Schema",
      "Content Management Systems (Headless CMS)",
      "High-Fidelity Visual Hierarchy",
      "WCAG 2.2 AA Accessibility Compliance",
    ],
    deliverables: [
      "Business Websites",
      "High-Conversion Landing Pages",
      "Portfolio & Showcase Websites",
      "Marketing & Brand Hubs",
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Vercel"],
  },
  {
    id: "web-applications",
    slug: "web-applications",
    title: "Web Applications",
    shortDescription:
      "Custom web applications built around complex operational flows, real-time data, and high-security standards.",
    fullDescription:
      "From complex administrative dashboards to multi-tenant SaaS platforms, we architect resilient web applications that streamline business workflows, automate bottlenecks, and provide intuitive user experiences.",
    iconName: "LayoutDashboard",
    features: [
      "Role-Based Access Control (RBAC)",
      "Real-Time Data Visualization & Analytics",
      "REST & GraphQL API Integrations",
      "State Management & Offline-Resilient Flows",
      "Robust Automated Testing & Logging",
      "Scalable Serverless & Microservice Architectures",
    ],
    deliverables: [
      "Operational Dashboards",
      "Booking & Reservation Engines",
      "Resource & Project Management Systems",
      "Secure Customer & Vendor Portals",
      "Data-Driven SaaS Platforms",
    ],
    technologies: ["React", "Next.js", "Node.js", "PostgreSQL", "Prisma", "TypeScript"],
  },
  {
    id: "custom-software",
    slug: "custom-software",
    title: "Custom Software",
    shortDescription:
      "Purpose-built software designed for unique operational requirements that off-the-shelf software fails to address.",
    fullDescription:
      "Off-the-shelf software often forces businesses into rigid constraints. We construct bespoke backend engines, API bridges, background processing workers, and automated business logic tailored exactly to how your business operates.",
    iconName: "Cpu",
    features: [
      "Bespoke Business Logic Engines",
      "Third-Party System & Payment Gateway Integrations",
      "Automated ETL & Reporting Pipelines",
      "Microservice & Cloud Architecture",
      "Database Modeling & Performance Tuning",
      "Enterprise Grade Security Standards",
    ],
    deliverables: [
      "Custom RESTful & GraphQL APIs",
      "Integration Middleware & Sync Bridges",
      "Automated Workflow Engines",
      "Legacy Software Modernization",
    ],
    technologies: ["TypeScript", "C# / .NET", "ASP.NET Core", "PostgreSQL", "Docker", "Azure / AWS"],
  },
  {
    id: "website-maintenance",
    slug: "website-maintenance",
    title: "Website Maintenance",
    shortDescription:
      "Proactive technical support, performance enhancements, security patching, and continuous feature evolution.",
    fullDescription:
      "Your digital presence should never stagnate or break. We offer structured retainer and on-demand maintenance to ensure 99.9% uptime, regular vulnerability assessments, framework upgrades, and continuous UX refinements.",
    iconName: "ShieldCheck",
    features: [
      "Regular Security Audits & Patching",
      "Dependency & Framework Upgrades",
      "Lighthouse & Core Web Vitals Auditing",
      "Bug Triage & Rapid Resolution SLA",
      "Database Optimization & Backup Verification",
      "Feature Iteration & A/B Experimentation",
    ],
    deliverables: [
      "Monthly Health & Performance Reports",
      "Dedicated Technical Support Channel",
      "Emergency Incident Response",
      "Incremental Feature Development",
    ],
    technologies: ["GitHub Actions", "Vercel", "Sentry", "PostgreSQL", "Next.js"],
  },
  {
    id: "ui-ux",
    slug: "ui-ux",
    title: "UI / UX Design",
    shortDescription:
      "Clean, accessible, and intuitive user interfaces backed by functional ergonomics and rigorous UX principles.",
    fullDescription:
      "We design digital interfaces that balance minimalism with deep functionality. Every button, interaction, state transition, and typography scale is carefully calibrated to reduce friction and elevate brand perception.",
    iconName: "Palette",
    features: [
      "Design Systems & Token Architecture",
      "Interactive High-Fidelity Prototypes",
      "Information Architecture & User Journeys",
      "Accessibility & Contrast Validation",
      "Component-Driven UI Specifications",
      "Micro-Interaction & Motion Design",
    ],
    deliverables: [
      "Figma Design Systems & Components",
      "Wireframes & UX Architecture Maps",
      "Interactive Prototypes",
      "Production-Ready Design Assets",
    ],
    technologies: ["Figma", "Tailwind CSS", "Framer Motion", "Radix UI", "Lucide"],
  },
  {
    id: "technical-solutions",
    slug: "technical-solutions",
    title: "Technical Solutions",
    shortDescription:
      "Expert software consulting, architecture auditing, cloud migration, and targeted problem solving.",
    fullDescription:
      "When faced with difficult technical bottlenecks, architectural dilemmas, or performance degradations, we provide hands-on engineering consulting to identify root causes and deploy decisive remedies.",
    iconName: "Terminal",
    features: [
      "Software Architecture Reviews",
      "Database Query Profiling & Optimization",
      "Cloud Infrastructure Sizing & Cost Optimization",
      "Codebase Refactoring & Tech Debt Reduction",
      "CI/CD Pipeline Setup & Automation",
      "Technical Roadmapping & Feasibility Studies",
    ],
    deliverables: [
      "Architectural Blueprint Documents",
      "Performance Benchmark Audits",
      "Refactored Code Modules",
      "Automated CI/CD Delivery Pipelines",
    ],
    technologies: ["Git", "GitHub Actions", "Docker", "Linux", "Azure", "Vercel"],
  },
];
