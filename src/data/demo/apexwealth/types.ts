export interface Account {
  id: string;
  name: string;
  institution: string;
  type: "checking" | "savings" | "investment" | "crypto" | "credit";
  accountNumber: string;
  balance: number;
  currency: "ZAR" | "USD" | "EUR";
  color: string;
  updatedAt: string;
  isEncrypted: boolean;
}

export interface Transaction {
  id: string;
  accountId: string;
  date: string;
  description: string;
  merchant: string;
  category: "Income" | "Housing" | "Groceries" | "Dining" | "Investments" | "Utilities" | "Transport" | "Entertainment" | "Healthcare" | "Tech & Software";
  amount: number;
  type: "inflow" | "outflow";
  status: "cleared" | "pending" | "reconciled";
  isRecurring: boolean;
  tags: string[];
}

export interface Budget {
  id: string;
  category: string;
  limit: number;
  spent: number;
  period: "monthly";
  icon: string;
}

export interface MonthlyCashflow {
  month: string;
  income: number;
  expenses: number;
  savings: number;
  netWorth: number;
}

export interface ForecastScenario {
  monthlySavings: number;
  annualReturnRate: number;
  inflationRate: number;
  years: number;
  projectedGrowth: { year: number; balance: number; contributions: number; interest: number }[];
}
