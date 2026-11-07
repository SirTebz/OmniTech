export type AppHealthStatus = "Operational" | "Degraded" | "Outage" | "Maintenance";

export interface MonitoredApplication {
  id: string;
  name: string;
  environment: "Production" | "Staging" | "UAT";
  owner: string;
  tier: "Tier 1 - Mission Critical" | "Tier 2 - Business Operational" | "Tier 3 - Internal Supporting";
  status: AppHealthStatus;
  uptimePercentage: number;
  avgLatencyMs: number;
  errorRatePercent: number;
  lastHealthCheck: string;
  activeIncidentsCount: number;
  description: string;
}

export type IncidentSeverity = "Critical" | "High" | "Medium" | "Low";
export type IncidentStatus = "New" | "Investigating" | "Identified" | "Monitoring" | "Resolved" | "Closed";

export interface IncidentRecord {
  id: string;
  incidentCode: string;
  applicationId: string;
  applicationName: string;
  title: string;
  summary: string;
  severity: IncidentSeverity;
  status: IncidentStatus;
  assignedEngineer: string;
  reportedAt: string;
  resolvedAt?: string;
  rootCauseCategory: "Database / SQL" | "API / Third-Party" | "Authentication / Token" | "Infrastructure / Memory" | "Configuration";
  rootCauseNotes?: string;
  resolutionSteps?: string;
}

export const sampleApplications: MonitoredApplication[] = [
  {
    id: "app-hr",
    name: "OmniPeople HR & Payroll Portal",
    environment: "Production",
    owner: "People Operations & Finance",
    tier: "Tier 1 - Mission Critical",
    status: "Operational",
    uptimePercentage: 99.98,
    avgLatencyMs: 142,
    errorRatePercent: 0.02,
    lastHealthCheck: "Just now",
    activeIncidentsCount: 0,
    description: "Employee self-service, leave approval workflows, SARS PAYE tax calculations, and payroll disbursement.",
  },
  {
    id: "app-pay",
    name: "OmniPay Payment Gateway Gateway API",
    environment: "Production",
    owner: "Core Billing Architecture",
    tier: "Tier 1 - Mission Critical",
    status: "Degraded",
    uptimePercentage: 99.45,
    avgLatencyMs: 480,
    errorRatePercent: 2.15,
    lastHealthCheck: "1 min ago",
    activeIncidentsCount: 1,
    description: "Credit card 3D-Secure transaction orchestration, Instant EFT integrations, and webhooks processing.",
  },
  {
    id: "app-erp",
    name: "Enterprise ERP & Inventory Sync",
    environment: "Production",
    owner: "Supply Chain & Operations",
    tier: "Tier 1 - Mission Critical",
    status: "Operational",
    uptimePercentage: 99.92,
    avgLatencyMs: 185,
    errorRatePercent: 0.05,
    lastHealthCheck: "2 mins ago",
    activeIncidentsCount: 0,
    description: "Real-time stock reservation, supplier purchase orders, warehouse barcode scanners, and freight dispatch.",
  },
  {
    id: "app-crm",
    name: "OmniCRM Customer Relationship Hub",
    environment: "Production",
    owner: "Client Success & Sales",
    tier: "Tier 2 - Business Operational",
    status: "Operational",
    uptimePercentage: 99.88,
    avgLatencyMs: 210,
    errorRatePercent: 0.12,
    lastHealthCheck: "Just now",
    activeIncidentsCount: 0,
    description: "Lead pipelines, interaction histories, deal forecasting, and customer communication records.",
  },
  {
    id: "app-auth",
    name: "Identity & Single Sign-On (SSO) Service",
    environment: "Production",
    owner: "Security & Infrastructure",
    tier: "Tier 1 - Mission Critical",
    status: "Operational",
    uptimePercentage: 99.99,
    avgLatencyMs: 65,
    errorRatePercent: 0.01,
    lastHealthCheck: "Just now",
    activeIncidentsCount: 0,
    description: "OAuth2 / OIDC token issuance, role-based claims verification, and MFA push security.",
  },
  {
    id: "app-docs",
    name: "Cloud Document & Contract Vault",
    environment: "Production",
    owner: "Legal & Compliance",
    tier: "Tier 2 - Business Operational",
    status: "Operational",
    uptimePercentage: 99.75,
    avgLatencyMs: 290,
    errorRatePercent: 0.08,
    lastHealthCheck: "3 mins ago",
    activeIncidentsCount: 0,
    description: "Encrypted PDF contract storage, audit trail logging, and electronic signature verification.",
  },
  {
    id: "app-analytics",
    name: "Nightly Data Warehouse ETL Pipeline",
    environment: "Production",
    owner: "Data Analytics & BI",
    tier: "Tier 3 - Internal Supporting",
    status: "Degraded",
    uptimePercentage: 98.90,
    avgLatencyMs: 820,
    errorRatePercent: 3.40,
    lastHealthCheck: "4 mins ago",
    activeIncidentsCount: 1,
    description: "SQL Server change data capture, transformation views, and automated snapshot deliveries.",
  },
  {
    id: "app-notify",
    name: "OmniNotify Multi-Channel Dispatcher",
    environment: "Production",
    owner: "Engineering Core",
    tier: "Tier 2 - Business Operational",
    status: "Operational",
    uptimePercentage: 99.95,
    avgLatencyMs: 115,
    errorRatePercent: 0.04,
    lastHealthCheck: "Just now",
    activeIncidentsCount: 0,
    description: "Transactional SMS, WhatsApp Business API messages, and automated customer email alerts.",
  },
];

export const initialIncidentRecords: IncidentRecord[] = [
  {
    id: "inc-01",
    incidentCode: "APP-INC-812",
    applicationId: "app-pay",
    applicationName: "OmniPay Payment Gateway Gateway API",
    title: "HTTP 504 Gateway Timeout spike on PayFast Webhook reconciliation",
    summary:
      "Monitoring alerts triggered 48 failed webhook reconciliations between 10:15 and 10:35 SAST. Downstream database connection pool exhausted due to unindexed transaction lockups.",
    severity: "Critical",
    status: "Investigating",
    assignedEngineer: "Tebogo Z. (Application Support Lead)",
    reportedAt: "2026-11-06T10:18:00Z",
    rootCauseCategory: "Database / SQL",
    rootCauseNotes:
      "Deadlock condition detected on dbo.PaymentTransactions during simultaneous batch reconciliation and card settlement webhooks.",
    resolutionSteps:
      "Increased SQL connection pool size, added missing index on (TransactionToken, ProcessedStatus), and replayed pending webhooks successfully.",
  },
  {
    id: "inc-02",
    incidentCode: "APP-INC-813",
    applicationId: "app-analytics",
    applicationName: "Nightly Data Warehouse ETL Pipeline",
    title: "Memory overflow in customer retention aggregation window function",
    summary:
      "Nightly batch scheduled job failed with exit code 137 (OOM killed). Data processing node ran out of memory during 36-month cohort partition.",
    severity: "High",
    status: "Identified",
    assignedEngineer: "Dylan P. (Systems Specialist)",
    reportedAt: "2026-11-06T04:22:00Z",
    rootCauseCategory: "Infrastructure / Memory",
    rootCauseNotes:
      "SQL batch query was attempting to load the entire 36-month dataset into memory without date-range chunking.",
    resolutionSteps:
      "Refactored query into sliding 90-day partitioned batches and adjusted Node heap allocation limit to 4096MB.",
  },
  {
    id: "inc-03",
    incidentCode: "APP-INC-810",
    applicationId: "app-hr",
    applicationName: "OmniPeople HR & Payroll Portal",
    title: "Intermittent session invalidation during leave application upload",
    summary:
      "Users submitting medical certificates larger than 8MB experienced sudden redirect to login page with HTTP 413 error payload masked as session timeout.",
    severity: "Medium",
    status: "Resolved",
    assignedEngineer: "Tebogo Z. (Application Support Lead)",
    reportedAt: "2026-11-05T13:40:00Z",
    resolvedAt: "2026-11-05T15:10:00Z",
    rootCauseCategory: "Configuration",
    rootCauseNotes:
      "Reverse proxy client_max_body_size was defaulted to 5MB, causing Nginx to terminate TCP connection prior to application handling.",
    resolutionSteps:
      "Updated reverse proxy buffer size to 25MB and added client-side image compression prior to multipart upload.",
  },
  {
    id: "inc-04",
    incidentCode: "APP-INC-809",
    applicationId: "app-auth",
    applicationName: "Identity & Single Sign-On (SSO) Service",
    title: "Clock skew error on JWT token verification across secondary node",
    summary:
      "Secondary app container rejected authentic user tokens with 'Token used before issued' due to an unsynchronised NTP daemon on host vm-app-02.",
    severity: "High",
    status: "Resolved",
    assignedEngineer: "Lerato K. (Network & Systems)",
    reportedAt: "2026-11-04T16:05:00Z",
    resolvedAt: "2026-11-04T16:50:00Z",
    rootCauseCategory: "Configuration",
    rootCauseNotes: "Host clock had drifted 7.4 seconds ahead of standard NTP time server.",
    resolutionSteps: "Forced chronyd sync against pool.ntp.org and added drift tolerance window of 15 seconds to token validator.",
  },
  {
    id: "inc-05",
    incidentCode: "APP-INC-808",
    applicationId: "app-erp",
    applicationName: "Enterprise ERP & Inventory Sync",
    title: "Duplicate SKU generation during concurrent barcode scanner batch sync",
    summary:
      "Two warehouse scanners submitted new product intake simultaneously, bypassing client-side sequence check.",
    severity: "Medium",
    status: "Resolved",
    assignedEngineer: "Tebogo Z. (Application Support Lead)",
    reportedAt: "2026-11-04T09:12:00Z",
    resolvedAt: "2026-11-04T11:30:00Z",
    rootCauseCategory: "Database / SQL",
    rootCauseNotes: "Table lacked an enforced UNIQUE constraint on SKU column at the schema level.",
    resolutionSteps: "Cleaned duplicate entries via SQL script, applied UNIQUE INDEX on SKU, and wrapped ingestion in an isolation transaction.",
  },
];
