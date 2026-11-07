export type TicketPriority = "Low" | "Medium" | "High" | "Critical";
export type TicketStatus = "Open" | "Assigned" | "In Progress" | "Pending" | "Resolved" | "Closed";
export type TicketCategory =
  | "Hardware"
  | "Software"
  | "Network"
  | "Email / Microsoft 365"
  | "Account Access"
  | "Printer"
  | "Other";

export interface TicketComment {
  id: string;
  author: string;
  authorRole: "User" | "Technician" | "System";
  timestamp: string;
  message: string;
}

export interface SupportTicket {
  id: string;
  ticketNumber: string;
  title: string;
  description: string;
  category: TicketCategory;
  priority: TicketPriority;
  status: TicketStatus;
  reporterName: string;
  reporterEmail: string;
  assignedTechnician: string;
  createdAt: string;
  updatedAt: string;
  slaDueHours: number;
  resolutionNotes?: string;
  comments: TicketComment[];
}

export const sampleTechnicians = [
  "Tebogo Z. (Senior Support Specialist)",
  "Sipho M. (Desktop Support Tech)",
  "Lerato K. (Network Administrator)",
  "Dylan P. (Systems Support Tech)",
  "Unassigned",
];

export const initialHelpdeskTickets: SupportTicket[] = [
  {
    id: "ticket-001",
    ticketNumber: "INC-4091",
    title: "Dell XPS laptop failing to connect to 5GHz corporate Wi-Fi",
    description:
      "User reports Wi-Fi disconnects intermittently every 15 minutes in Boardroom B. Device connects fine to 2.4GHz guest network but drops enterprise WPA3 credentials.",
    category: "Network",
    priority: "High",
    status: "In Progress",
    reporterName: "Sarah Jenkins",
    reporterEmail: "s.jenkins@enterprise-sample.co.za",
    assignedTechnician: "Tebogo Z. (Senior Support Specialist)",
    createdAt: "2026-11-06T08:15:00Z",
    updatedAt: "2026-11-06T10:30:00Z",
    slaDueHours: 4,
    comments: [
      {
        id: "c-1",
        author: "Sarah Jenkins",
        authorRole: "User",
        timestamp: "2026-11-06T08:15:00Z",
        message: "Need this resolved before the 14:00 client presentation in Boardroom B.",
      },
      {
        id: "c-2",
        author: "Tebogo Z. (Senior Support Specialist)",
        authorRole: "Technician",
        timestamp: "2026-11-06T09:00:00Z",
        message: "Investigated AP roaming logs. Wi-Fi adapter driver (Intel Wi-Fi 6 AX201) needs rollback from v22.190 to stable v22.140.",
      },
    ],
  },
  {
    id: "ticket-002",
    ticketNumber: "INC-4092",
    title: "Microsoft Outlook desktop app stuck on 'Loading Profile'",
    description:
      "Finance manager unable to open Outlook after Windows 11 KB5035853 update. Webmail functions normally, but local OST cache is not synchronising.",
    category: "Email / Microsoft 365",
    priority: "Critical",
    status: "Open",
    reporterName: "David Khumalo",
    reporterEmail: "d.khumalo@finance-sample.co.za",
    assignedTechnician: "Dylan P. (Systems Support Tech)",
    createdAt: "2026-11-06T09:20:00Z",
    updatedAt: "2026-11-06T09:20:00Z",
    slaDueHours: 2,
    comments: [
      {
        id: "c-3",
        author: "David Khumalo",
        authorRole: "User",
        timestamp: "2026-11-06T09:20:00Z",
        message: "Month-end reconciliation spreadsheets are arriving via email. Immediate help required.",
      },
    ],
  },
  {
    id: "ticket-003",
    ticketNumber: "INC-4093",
    title: "Canon Floor 2 multifunction printer showing 'Error 5100' jam",
    description:
      "Physical paper tray inspected and clear. Print queue has 14 pending jobs queued. Printer needs service reset and queue purged.",
    category: "Printer",
    priority: "Medium",
    status: "Assigned",
    reporterName: "Nomvula Ndlovu",
    reporterEmail: "n.ndlovu@ops-sample.co.za",
    assignedTechnician: "Sipho M. (Desktop Support Tech)",
    createdAt: "2026-11-05T14:10:00Z",
    updatedAt: "2026-11-06T08:00:00Z",
    slaDueHours: 8,
    comments: [
      {
        id: "c-4",
        author: "Sipho M. (Desktop Support Tech)",
        authorRole: "Technician",
        timestamp: "2026-11-06T08:00:00Z",
        message: "Carriage sensor flag cleaned. Reset sequence initiated. Purging print spooler now.",
      },
    ],
  },
  {
    id: "ticket-004",
    ticketNumber: "INC-4094",
    title: "New Employee Onboarding: Hardware provisioning & M365 account",
    description:
      "Setup Lenovo ThinkPad T14 Gen 4, configure Microsoft 365 Business Premium license, provision SharePoint access and Slack account.",
    category: "Account Access",
    priority: "Medium",
    status: "Resolved",
    reporterName: "Karen Van Der Merwe (HR)",
    reporterEmail: "k.vdmerwe@hr-sample.co.za",
    assignedTechnician: "Tebogo Z. (Senior Support Specialist)",
    createdAt: "2026-11-04T10:00:00Z",
    updatedAt: "2026-11-05T16:45:00Z",
    slaDueHours: 24,
    resolutionNotes:
      "Laptop imaged with corporate Windows 11 Enterprise image, BitLocker enabled, user enrolled into Intune MDM, and MFA phone token verified.",
    comments: [
      {
        id: "c-5",
        author: "Tebogo Z. (Senior Support Specialist)",
        authorRole: "Technician",
        timestamp: "2026-11-05T16:45:00Z",
        message: "Handover complete. User signed equipment verification slip.",
      },
    ],
  },
  {
    id: "ticket-005",
    ticketNumber: "INC-4095",
    title: "SQL Server local client ODBC driver connection timeout",
    description:
      "Internal Inventory client reporting 'ODBC Driver 18 for SQL Server: Named Pipes Provider could not open a connection'. TCP port 1433 appears blocked by local firewall.",
    category: "Software",
    priority: "High",
    status: "In Progress",
    reporterName: "Marcus Sterling",
    reporterEmail: "m.sterling@inventory-sample.co.za",
    assignedTechnician: "Tebogo Z. (Senior Support Specialist)",
    createdAt: "2026-11-06T11:00:00Z",
    updatedAt: "2026-11-06T11:45:00Z",
    slaDueHours: 4,
    comments: [
      {
        id: "c-6",
        author: "Tebogo Z. (Senior Support Specialist)",
        authorRole: "Technician",
        timestamp: "2026-11-06T11:45:00Z",
        message: "Verified SQL Server Browser service was stopped. Port 1433 inbound firewall exception applied.",
      },
    ],
  },
  {
    id: "ticket-006",
    ticketNumber: "INC-4096",
    title: "Shared departmental network drive (Z:) disconnected after reboot",
    description:
      "Marketing team unable to access mapped drive \\\\nas01\\marketing. Credentials prompt keeps recurring.",
    category: "Network",
    priority: "Low",
    status: "Resolved",
    reporterName: "Thandiwe Mokoena",
    reporterEmail: "t.mokoena@marketing-sample.co.za",
    assignedTechnician: "Lerato K. (Network Administrator)",
    createdAt: "2026-11-05T11:30:00Z",
    updatedAt: "2026-11-05T13:15:00Z",
    slaDueHours: 8,
    resolutionNotes:
      "Cleared cached stale NTLM credentials in Windows Credential Manager and re-mapped with persistent flag net use Z: /persistent:yes.",
    comments: [
      {
        id: "c-7",
        author: "Lerato K. (Network Administrator)",
        authorRole: "Technician",
        timestamp: "2026-11-05T13:15:00Z",
        message: "Tested reconnection after simulated reboot. Functioning normally.",
      },
    ],
  },
  {
    id: "ticket-007",
    ticketNumber: "INC-4097",
    title: "External USB-C dual-display dock flickering on HDMI 2 port",
    description:
      "Second monitor goes black for 3 seconds whenever high CPU utilization occurs on the host workstation.",
    category: "Hardware",
    priority: "Medium",
    status: "Open",
    reporterName: "Brendan Cole",
    reporterEmail: "b.cole@design-sample.co.za",
    assignedTechnician: "Sipho M. (Desktop Support Tech)",
    createdAt: "2026-11-06T12:30:00Z",
    updatedAt: "2026-11-06T12:30:00Z",
    slaDueHours: 8,
    comments: [],
  },
  {
    id: "ticket-008",
    ticketNumber: "INC-4098",
    title: "VPN Client error 800: Remote connection was not made",
    description:
      "Remote employee unable to connect via FortiClient VPN from home fibre connection. Diagnostic ping to gateway drops packets.",
    category: "Network",
    priority: "High",
    status: "Assigned",
    reporterName: "Alicia Smith",
    reporterEmail: "a.smith@remote-sample.co.za",
    assignedTechnician: "Lerato K. (Network Administrator)",
    createdAt: "2026-11-06T13:10:00Z",
    updatedAt: "2026-11-06T13:15:00Z",
    slaDueHours: 4,
    comments: [
      {
        id: "c-8",
        author: "Lerato K. (Network Administrator)",
        authorRole: "Technician",
        timestamp: "2026-11-06T13:15:00Z",
        message: "Verified ISP router MTU size issue. Adjusted client MTU from 1500 to 1420.",
      },
    ],
  },
  {
    id: "ticket-009",
    ticketNumber: "INC-4099",
    title: "Suspicious phishing email reporting and domain block request",
    description:
      "Staff member received email masquerading as SARS tax refund with spoofed sender address and malicious attachment.",
    category: "Email / Microsoft 365",
    priority: "Critical",
    status: "Resolved",
    reporterName: "Zola Dlamini",
    reporterEmail: "z.dlamini@ops-sample.co.za",
    assignedTechnician: "Tebogo Z. (Senior Support Specialist)",
    createdAt: "2026-11-05T09:00:00Z",
    updatedAt: "2026-11-05T09:40:00Z",
    slaDueHours: 1,
    resolutionNotes:
      "Sender domain blocked across Microsoft 365 Defender tenant gateway. Message purged from all mailboxes via Threat Explorer. User thanked for vigilance.",
    comments: [],
  },
  {
    id: "ticket-010",
    ticketNumber: "INC-4100",
    title: "Workstation memory upgrade request for CAD / 3D rendering",
    description:
      "Engineering workstation running at 94% RAM capacity during AutoCAD mechanical assembly simulations. Requires 32GB to 64GB DDR5 upgrade.",
    category: "Hardware",
    priority: "Low",
    status: "Pending",
    reporterName: "Johan Pretorius",
    reporterEmail: "j.pretorius@eng-sample.co.za",
    assignedTechnician: "Dylan P. (Systems Support Tech)",
    createdAt: "2026-11-04T15:20:00Z",
    updatedAt: "2026-11-05T10:00:00Z",
    slaDueHours: 48,
    comments: [
      {
        id: "c-9",
        author: "Dylan P. (Systems Support Tech)",
        authorRole: "Technician",
        timestamp: "2026-11-05T10:00:00Z",
        message: "PO approved. RAM modules ordered, ETA Thursday morning for scheduled installation.",
      },
    ],
  },
];
