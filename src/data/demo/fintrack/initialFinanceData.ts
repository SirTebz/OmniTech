export type TransactionType = "Income" | "Expense";

export type FinanceCategory =
  | "Salary / Consulting"
  | "Housing & Rent"
  | "Groceries & Food"
  | "Utilities & Internet"
  | "Transport & Fuel"
  | "Software & Subscriptions"
  | "Investments & Savings"
  | "Health & Medical"
  | "Entertainment & Leisure";

export interface FinanceTransaction {
  id: string;
  date: string; // YYYY-MM-DD
  description: string;
  category: FinanceCategory;
  type: TransactionType;
  amountZAR: number;
  paymentMethod: "EFT / Bank" | "Debit Card" | "Credit Card" | "Direct Debit";
}

export interface BudgetLimit {
  category: FinanceCategory;
  budgetLimitZAR: number;
}

export const initialBudgetLimits: BudgetLimit[] = [
  { category: "Housing & Rent", budgetLimitZAR: 16500 },
  { category: "Groceries & Food", budgetLimitZAR: 7500 },
  { category: "Utilities & Internet", budgetLimitZAR: 3200 },
  { category: "Transport & Fuel", budgetLimitZAR: 4500 },
  { category: "Software & Subscriptions", budgetLimitZAR: 2800 },
  { category: "Health & Medical", budgetLimitZAR: 3800 },
  { category: "Entertainment & Leisure", budgetLimitZAR: 3000 },
];

export const initialFinanceTransactions: FinanceTransaction[] = [
  // Income
  {
    id: "ft-01",
    date: "2026-10-25",
    description: "Enterprise Software Consulting Retainer (OmniTech)",
    category: "Salary / Consulting",
    type: "Income",
    amountZAR: 48500,
    paymentMethod: "EFT / Bank",
  },
  {
    id: "ft-02",
    date: "2026-10-28",
    description: "QuikTab Invoicing SaaS Payout (PayFast)",
    category: "Salary / Consulting",
    type: "Income",
    amountZAR: 14200,
    paymentMethod: "EFT / Bank",
  },
  {
    id: "ft-03",
    date: "2026-11-01",
    description: "IT Support Helpdesk Retainer",
    category: "Salary / Consulting",
    type: "Income",
    amountZAR: 18000,
    paymentMethod: "EFT / Bank",
  },

  // Expenses
  {
    id: "ft-04",
    date: "2026-11-01",
    description: "Apartment Rental & Levies",
    category: "Housing & Rent",
    type: "Expense",
    amountZAR: 14500,
    paymentMethod: "Direct Debit",
  },
  {
    id: "ft-05",
    date: "2026-11-01",
    description: "Discovery Health Medical Aid",
    category: "Health & Medical",
    type: "Expense",
    amountZAR: 3450,
    paymentMethod: "Direct Debit",
  },
  {
    id: "ft-06",
    date: "2026-11-02",
    description: "Woolworths Food Market (Johannesburg)",
    category: "Groceries & Food",
    type: "Expense",
    amountZAR: 1850,
    paymentMethod: "Credit Card",
  },
  {
    id: "ft-07",
    date: "2026-11-02",
    description: "Fibre Internet 200/200 Mbps (Openserve)",
    category: "Utilities & Internet",
    type: "Expense",
    amountZAR: 999,
    paymentMethod: "Direct Debit",
  },
  {
    id: "ft-08",
    date: "2026-11-03",
    description: "Sasol Fuel Station Fill-up",
    category: "Transport & Fuel",
    type: "Expense",
    amountZAR: 1250,
    paymentMethod: "Debit Card",
  },
  {
    id: "ft-09",
    date: "2026-11-03",
    description: "AWS Cloud Infrastructure Hosting",
    category: "Software & Subscriptions",
    type: "Expense",
    amountZAR: 1420,
    paymentMethod: "Credit Card",
  },
  {
    id: "ft-10",
    date: "2026-11-04",
    description: "Monthly TFSA Tax-Free Savings Investment",
    category: "Investments & Savings",
    type: "Expense",
    amountZAR: 3000,
    paymentMethod: "EFT / Bank",
  },
  {
    id: "ft-11",
    date: "2026-11-04",
    description: "Checkers Hyper Groceries",
    category: "Groceries & Food",
    type: "Expense",
    amountZAR: 2420,
    paymentMethod: "Credit Card",
  },
  {
    id: "ft-12",
    date: "2026-11-05",
    description: "City Power Electricity Voucher",
    category: "Utilities & Internet",
    type: "Expense",
    amountZAR: 1500,
    paymentMethod: "EFT / Bank",
  },
  {
    id: "ft-13",
    date: "2026-11-05",
    description: "GitHub Enterprise & Copilot Subscription",
    category: "Software & Subscriptions",
    type: "Expense",
    amountZAR: 450,
    paymentMethod: "Credit Card",
  },
  {
    id: "ft-14",
    date: "2026-11-06",
    description: "Coffee & Lunch Meeting with Client (Rosebank)",
    category: "Entertainment & Leisure",
    type: "Expense",
    amountZAR: 480,
    paymentMethod: "Credit Card",
  },
];
