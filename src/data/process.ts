export interface ProcessStep {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  disciplines: string[];
}

export const processSteps: ProcessStep[] = [
  {
    step: "01",
    title: "Discover & Diagnose",
    subtitle: "Understanding root objectives and technical constraints",
    description:
      "Every project or support engagement begins by understanding the operational problem. Whether gathering requirements for a custom business application, auditing an intermittent system bug, or reviewing IT support workflows, we examine the problem without assumptions.",
    deliverables: [
      "Requirements & Scope Specification",
      "Current-State Diagnostic Review",
      "Technical Feasibility & Architecture Plan",
      "Risk & Constraint Assessment",
    ],
    disciplines: ["Software Development", "IT Support", "Application Support", "Data Analytics"],
  },
  {
    step: "02",
    title: "Plan & Architect",
    subtitle: "Structuring clean solutions and actionable workflows",
    description:
      "We design the technical blueprint: database schema modeling, user journey flows, incident triage protocols, or data extraction queries. Clear planning eliminates tech debt and guarantees alignment before writing code or altering production environments.",
    deliverables: [
      "Database & System Entity Models",
      "Interactive Wireframes & Component Specs",
      "Service Desk SLA & Escalation Matrices",
      "Data Transformation & KPI Formulas",
    ],
    disciplines: ["Software Development", "IT Support", "Application Support", "Data Analytics"],
  },
  {
    step: "03",
    title: "Design & Prototype",
    subtitle: "Human ergonomics, accessible design & rapid validation",
    description:
      "We build clean, distraction-free interfaces adhering to WCAG 2.2 AA standards. Users should accomplish tasks with minimal friction, whether using a customer-facing portal, an IT service desk dashboard, or an executive BI reporting board.",
    deliverables: [
      "High-Fidelity Component Systems",
      "Responsive Desktop & Mobile Layouts",
      "Accessibility & Contrast Validation",
      "Interactive Review Prototypes",
    ],
    disciplines: ["UI/UX Design", "Web Development", "Analytics Dashboards"],
  },
  {
    step: "04",
    title: "Build & Implement",
    subtitle: "Writing resilient code, configuring systems & modeling data",
    description:
      "Execution with precision. Software features are written in typed languages with strict adherence to architectural standards. IT support configurations and analytical ETL pipelines are implemented with deterministic data checks and security best practices.",
    deliverables: [
      "Type-Safe Production Codebases",
      "REST APIs & Relational Database Integration",
      "Configured Operating Systems & Helpdesk Workflows",
      "Automated Data Cleaning & BI Visualisations",
    ],
    disciplines: ["Software Development", "Application Support", "Data Analytics"],
  },
  {
    step: "05",
    title: "Test, Deliver & Support",
    subtitle: "Rigorous verification, clear documentation & proactive maintenance",
    description:
      "Nothing ships without validation. We execute unit tests, end-to-end checks, regression tests, and user acceptance reviews. Handover includes thorough documentation, runbooks, and ongoing monitoring so systems remain reliable indefinitely.",
    deliverables: [
      "Automated Test Suites & QA Reports",
      "Production Deployment & DNS / Hosting Setup",
      "Comprehensive Technical Documentation & SOPs",
      "Ongoing Maintenance & Technical Support",
    ],
    disciplines: ["Software Development", "IT Support", "Application Support", "Website Maintenance"],
  },
];
