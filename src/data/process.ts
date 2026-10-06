export interface ProcessStep {
  number: string;
  title: string;
  summary: string;
  details: string[];
  deliverable: string;
}

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Discover",
    summary: "Understand the core idea, business objectives, target users, and functional requirements.",
    details: [
      "Discovery consultation & scope definition",
      "User persona & journey mapping",
      "Technical feasibility & architectural assessment",
      "Timeline & milestone agreement",
    ],
    deliverable: "Product Scope & Technical Roadmap",
  },
  {
    number: "02",
    title: "Design",
    summary: "Plan the intuitive experience, system structure, wireframes, and design system.",
    details: [
      "Information architecture & content hierarchy",
      "Low-to-high fidelity interactive wireframes",
      "Monochrome/minimal design system & typography tokens",
      "Responsive viewport & accessibility validation",
    ],
    deliverable: "Interactive Prototypes & UI Tokens",
  },
  {
    number: "03",
    title: "Build",
    summary: "Develop the solution using modern frameworks, strict TypeScript, and clean engineering practices.",
    details: [
      "Modular frontend development with Next.js & Tailwind",
      "Robust backend API and database schemas",
      "State management, form validations, and micro-interactions",
      "Code reviews, clean architecture, and git versioning",
    ],
    deliverable: "Clean, Fully Functional Application Codebase",
  },
  {
    number: "04",
    title: "Test",
    summary: "Validate functionality, cross-browser responsiveness, accessibility, and high performance.",
    details: [
      "End-to-end user flow verification",
      "Lighthouse Core Web Vitals profiling (<100ms TBT)",
      "WCAG 2.2 AA accessibility audit & keyboard navigation",
      "API vulnerability and edge-case stress tests",
    ],
    deliverable: "QA Test Suite & Performance Audit Report",
  },
  {
    number: "05",
    title: "Launch & Improve",
    summary: "Deploy to production, configure monitoring, and provide continuous enhancements.",
    details: [
      "Automated CI/CD deployment on Vercel / Cloud Provider",
      "Custom domain, SSL, DNS & security headers setup",
      "Analytics & exception logging configuration",
      "Post-launch handover & continuous SLA support",
    ],
    deliverable: "Live Production Product & Documentation",
  },
];
