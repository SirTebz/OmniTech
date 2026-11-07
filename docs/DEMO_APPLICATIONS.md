# OmniTech Interactive Demonstration Applications

All demonstrations are built directly into the Next.js application, require zero registration or paid API keys, persist modifications safely in browser `localStorage`, and feature a deterministic **Reset Demo Data** action.

---

### Demo 1: OmniDesk — IT Service Desk & Ticket Management
- **Route**: `/demos/it-service-desk`
- **Discipline**: IT Support & Helpdesk
- **Functionality**:
  - Full-lifecycle ticket triage (Open, Assigned, In Progress, Pending, Resolved, Closed).
  - Triage modal for logging new tickets with category, reporter, and priority.
  - Priority reclassification (Low, Medium, High, Critical) with simulated SLA response timers.
  - Technician assignment (Tebogo Z., Sipho M., Lerato K., Dylan P.).
  - Step-by-step diagnostic activity timeline and resolution note submission.
  - Multi-criteria filtering (Status, Priority, Category) and full-text search.
- **Sample Dataset**: 10 realistic corporate tickets (Wi-Fi roaming dropouts, Outlook sync lockup, printer error 5100, SQL ODBC timeout, FortiClient VPN packet drops).

---

### Demo 2: AppWatch — Application Support & Incident Management
- **Route**: `/demos/appwatch`
- **Discipline**: Application Support & Systems Support
- **Functionality**:
  - Real-time fleet health monitoring of 8 business-critical systems (HR portal, Payment gateway, ERP sync, CRM, SSO service).
  - Error rate % and average latency (ms) telemetry.
  - L1/L2 incident workflow (New, Investigating, Identified, Monitoring, Resolved).
  - Root-cause analysis (RCA) classification (Database/SQL, API/Third-Party, Authentication, Memory, Configuration).
  - Simulated diagnostic probe tool that inspects connection pools, latencies, and deadlock counters.
  - Incident simulation modal allowing visitors to trigger alerts against any application.
- **Sample Dataset**: 8 monitored applications and 5 documented production incident dossiers.

---

### Demo 3: InsightHub — Business Intelligence & Sales Analytics
- **Route**: `/demos/insighthub`
- **Discipline**: Data Analytics & Business Intelligence
- **Functionality**:
  - Live KPI metric cards (Gross Revenue in ZAR, Total Orders, Average Order Value, Profit Margin %).
  - Multi-dimensional filters (South African Provinces: Gauteng, Western Cape, KZN, Eastern Cape; Categories; Months).
  - Synchronised category contribution and regional distribution bar graphs.
  - Automated narrative insights engine identifying top products and margin distributions.
  - Searchable, sortable transactional ledger.
  - One-click filtered CSV dataset export.
- **Sample Dataset**: 20 realistic commercial transaction records totaling R600k+ in revenue.

---

### Demo 4: ITOps Insights — IT Service Desk Operational Analytics
- **Route**: `/demos/itops-insights`
- **Discipline**: IT Support / Data Analytics
- **Functionality**:
  - Helpdesk SLA compliance rate (%) calculation against industry standards.
  - First-contact response time tracking and overall resolution turnaround velocity.
  - Technician workload and SLA compliance comparison matrix.
  - Incident category frequency analysis (identifying problematic infrastructure).
  - Search, multi-filtering, and full CSV metrics export.
- **Sample Dataset**: 18 detailed operational support logs with SLA benchmarks and satisfaction ratings.

---

### Demo 5: FinTrack — Personal Finance & Cash Flow Analytics
- **Route**: `/demos/fintrack`
- **Discipline**: Data Analytics / Personal Finance
- **Functionality**:
  - South African Rand (ZAR) native currency ledger.
  - Net savings and monthly savings rate (%) KPI indicators.
  - Visual category budget utilisation bars with over-budget threshold alerts.
  - Interactive transaction management (Add, Delete, Filter by Category or Type).
  - Clean CSV statement export.
- **Sample Dataset**: 14 transactions covering consulting inflows, rent, medical aid, groceries, utilities, and investments.
