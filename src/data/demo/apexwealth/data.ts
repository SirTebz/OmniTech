import { Account, Transaction, Budget, MonthlyCashflow } from './types';

export const initialAccounts: Account[] = [
  { id: "acc_1", name: "Private Cheque", institution: "Investec", type: "checking", accountNumber: "****4321", balance: 48250, currency: "ZAR", color: "#000000", updatedAt: new Date().toISOString(), isEncrypted: true },
  { id: "acc_2", name: "High-Yield Savings", institution: "Discovery", type: "savings", accountNumber: "****8899", balance: 185000, currency: "ZAR", color: "#F28C28", updatedAt: new Date().toISOString(), isEncrypted: true },
  { id: "acc_3", name: "Global TFSA", institution: "EasyEquities", type: "investment", accountNumber: "TFSA-EE-09", balance: 240500, currency: "ZAR", color: "#E02424", updatedAt: new Date().toISOString(), isEncrypted: true },
  { id: "acc_4", name: "Crypto Vault", institution: "Luno", type: "crypto", accountNumber: "BTC-ETH-01", balance: 62800, currency: "ZAR", color: "#3B82F6", updatedAt: new Date().toISOString(), isEncrypted: true },
  { id: "acc_5", name: "Miles Credit Card", institution: "Discovery", type: "credit", accountNumber: "****1234", balance: -14300, currency: "ZAR", color: "#6B7280", updatedAt: new Date().toISOString(), isEncrypted: true },
];

export const initialTransactions: Transaction[] = [
  { id: "txn_1", accountId: "acc_1", date: "2024-11-25", description: "Salary Deposit", merchant: "Employer Inc", category: "Income", amount: 65000, type: "inflow", status: "cleared", isRecurring: true, tags: ["salary"] },
  { id: "txn_2", accountId: "acc_1", date: "2024-11-26", description: "Rent Payment", merchant: "Property Management", category: "Housing", amount: -16000, type: "outflow", status: "cleared", isRecurring: true, tags: ["rent"] },
  { id: "txn_3", accountId: "acc_1", date: "2024-11-27", description: "Groceries", merchant: "Woolworths", category: "Groceries", amount: -1500, type: "outflow", status: "cleared", isRecurring: false, tags: ["food"] },
  { id: "txn_4", accountId: "acc_1", date: "2024-11-28", description: "Electricity", merchant: "City Power", category: "Utilities", amount: -2200, type: "outflow", status: "cleared", isRecurring: true, tags: ["utilities"] },
  { id: "txn_5", accountId: "acc_5", date: "2024-11-28", description: "Uber Ride", merchant: "Uber", category: "Transport", amount: -250, type: "outflow", status: "cleared", isRecurring: false, tags: ["transport"] },
  { id: "txn_6", accountId: "acc_5", date: "2024-11-29", description: "Dinner", merchant: "The Grillhouse", category: "Dining", amount: -1800, type: "outflow", status: "cleared", isRecurring: false, tags: ["dining"] },
  { id: "txn_7", accountId: "acc_5", date: "2024-12-01", description: "Cloud Hosting", merchant: "AWS", category: "Tech & Software", amount: -850, type: "outflow", status: "cleared", isRecurring: true, tags: ["software", "business"] },
  { id: "txn_8", accountId: "acc_5", date: "2024-12-02", description: "Streaming", merchant: "Netflix", category: "Entertainment", amount: -199, type: "outflow", status: "cleared", isRecurring: true, tags: ["entertainment"] },
  { id: "txn_9", accountId: "acc_1", date: "2024-12-02", description: "Medical Aid", merchant: "Discovery Health", category: "Healthcare", amount: -4500, type: "outflow", status: "cleared", isRecurring: true, tags: ["health"] },
  { id: "txn_10", accountId: "acc_1", date: "2024-12-03", description: "Gym", merchant: "Virgin Active", category: "Healthcare", amount: -890, type: "outflow", status: "cleared", isRecurring: true, tags: ["health", "fitness"] },
  { id: "txn_11", accountId: "acc_1", date: "2024-12-05", description: "Investment Transfer", merchant: "EasyEquities", category: "Investments", amount: -15000, type: "outflow", status: "cleared", isRecurring: true, tags: ["saving"] },
];

for(let i=12; i<=35; i++) {
  initialTransactions.push({
    id: `txn_${i}`,
    accountId: "acc_5",
    date: `2024-11-${String((i%28)+1).padStart(2, '0')}`,
    description: `Everyday Purchase ${i}`,
    merchant: ["Checkers", "Woolworths", "Uber", "Takealot", "Engen"][i % 5],
    category: ["Groceries", "Transport", "Dining", "Tech & Software"][i % 4] as any,
    amount: -Math.floor(Math.random() * 1000 + 100),
    type: "outflow",
    status: "cleared",
    isRecurring: false,
    tags: []
  });
}

export const initialBudgets: Budget[] = [
  { id: "bgt_1", category: "Housing", limit: 16000, spent: 16000, period: "monthly", icon: "Home" },
  { id: "bgt_2", category: "Groceries", limit: 8000, spent: 6500, period: "monthly", icon: "ShoppingCart" },
  { id: "bgt_3", category: "Tech & Software", limit: 2500, spent: 2200, period: "monthly", icon: "Monitor" },
  { id: "bgt_4", category: "Dining", limit: 4000, spent: 4800, period: "monthly", icon: "Utensils" },
  { id: "bgt_5", category: "Transport", limit: 4500, spent: 3200, period: "monthly", icon: "Car" },
  { id: "bgt_6", category: "Investments", limit: 15000, spent: 15000, period: "monthly", icon: "TrendingUp" },
];

export const cashflowHistory: MonthlyCashflow[] = [
  { month: "Dec 23", income: 60000, expenses: 45000, savings: 15000, netWorth: 380000 },
  { month: "Jan 24", income: 60000, expenses: 48000, savings: 12000, netWorth: 392000 },
  { month: "Feb 24", income: 62000, expenses: 42000, savings: 20000, netWorth: 412000 },
  { month: "Mar 24", income: 62000, expenses: 46000, savings: 16000, netWorth: 428000 },
  { month: "Apr 24", income: 62000, expenses: 44000, savings: 18000, netWorth: 446000 },
  { month: "May 24", income: 62000, expenses: 43000, savings: 19000, netWorth: 465000 },
  { month: "Jun 24", income: 62000, expenses: 50000, savings: 12000, netWorth: 477000 },
  { month: "Jul 24", income: 65000, expenses: 45000, savings: 20000, netWorth: 497000 },
  { month: "Aug 24", income: 65000, expenses: 44000, savings: 21000, netWorth: 518000 },
  { month: "Sep 24", income: 65000, expenses: 46000, savings: 19000, netWorth: 537000 },
  { month: "Oct 24", income: 65000, expenses: 58000, savings: 7000, netWorth: 544000 },
  { month: "Nov 24", income: 65000, expenses: 48000, savings: 17000, netWorth: 522000 },
];

export function formatCurrency(amount: number, currency: string = 'ZAR'): string {
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function calculateNetWorth(accounts: Account[]): number {
  return accounts.reduce((total, account) => total + account.balance, 0);
}

export function calculateMonthlyTotals(transactions: Transaction[]): { income: number; expenses: number; savingsRate: number } {
  let income = 0;
  let expenses = 0;

  transactions.forEach(t => {
    if (t.type === 'inflow') {
      income += t.amount;
    } else if (t.type === 'outflow') {
      expenses += Math.abs(t.amount);
    }
  });

  const savingsRate = income > 0 ? ((income - expenses) / income) * 100 : 0;

  return { income, expenses, savingsRate };
}

export function getCategoryIcon(category: string): string {
  const icons: Record<string, string> = {
    Income: "ArrowDownToLine",
    Housing: "Home",
    Groceries: "ShoppingCart",
    Dining: "Utensils",
    Investments: "TrendingUp",
    Utilities: "Zap",
    Transport: "Car",
    Entertainment: "Film",
    Healthcare: "HeartPulse",
    "Tech & Software": "Monitor",
  };
  return icons[category] || "Circle";
}
