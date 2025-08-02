// Navigation and Layout Types
export interface NavItem {
  name: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
}

// Team Member Types
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  social?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

// Feature Types
export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

// Testimonial Types
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
  rating: number;
}

// Analytics Dashboard Types
export interface KPICard {
  id: string;
  title: string;
  value: string | number;
  change: number;
  changeType: 'increase' | 'decrease' | 'neutral';
  icon: React.ComponentType<{ className?: string }>;
  description?: string;
}

export interface ChartData {
  name: string;
  value: number;
  date?: string;
  category?: string;
}

// Financial Analytics Types
export interface FinancialKPI extends KPICard {
  target?: number;
  period: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
  currency?: string;
  trend?: 'up' | 'down' | 'stable';
}

export interface CashFlowData {
  name: string;
  date: string;
  income: number;
  expenses: number;
  netCashFlow: number;
  cumulativeCashFlow: number;
}

export interface BusinessMetrics {
  id: string;
  name: string;
  completionRate: number;
  averageTime: number;
  dropOffRate: number;
  satisfactionScore: number;
  date: string;
}

export interface FinancialHealthIndicator {
  id: string;
  name: string;
  value: number;
  status: 'healthy' | 'warning' | 'critical';
  recommendation: string;
  trend: 'improving' | 'stable' | 'declining';
}

export interface RevenueBreakdown {
  name: string;
  amount: number;
  percentage: number;
  change: number;
  color: string;
}

export interface ExpenseCategory {
  name: string;
  amount: number;
  percentage: number;
  budget: number;
  color: string;
}

export interface ProfitMarginData {
  name: string;
  revenue: number;
  costs: number;
  grossProfit: number;
  margin: number;
  date: string;
}

// Open Finance & Banking Integration Types
export interface BankAccount {
  id: string;
  bankName: string;
  bankCode: string;
  accountNumber: string;
  accountType: 'checking' | 'savings' | 'credit' | 'business';
  balance: number;
  currency: string;
  status: 'active' | 'inactive' | 'pending';
  lastSyncTime: string;
  iban?: string;
  swiftCode?: string;
  isConnected: boolean;
  permissions: string[];
}

export interface Transaction {
  id: string;
  accountId: string;
  amount: number;
  currency: string;
  type: 'debit' | 'credit';
  category: string;
  subcategory?: string;
  description: string;
  counterpartyName?: string;
  counterpartyAccount?: string;
  counterpartyIban?: string;
  date: string;
  timestamp: string;
  reference?: string;
  mcc?: number;
  status: 'completed' | 'pending' | 'failed';
  balance: number;
  isRecurring: boolean;
  recurringPattern?: string;
  tags: string[];
  notes?: string;
}

export interface PaymentMethod {
  id: string;
  type: 'bank_transfer' | 'qr_code' | 'card' | 'digital_wallet' | 'cash';
  provider: string;
  accountId?: string;
  isDefault: boolean;
  status: 'active' | 'inactive';
  metadata: Record<string, any>;
}

export interface QRPayment {
  id: string;
  merchantId: string;
  amount?: number;
  currency: string;
  description?: string;
  expiryTime?: string;
  isReusable: boolean;
  qrCodeData: string;
  qrCodeImage: string;
  status: 'active' | 'used' | 'expired';
  createdAt: string;
  usedAt?: string;
  paymentReference?: string;
}

export interface OpenFinanceConnection {
  id: string;
  providerId: string;
  providerName: string;
  connectionType: 'bank' | 'payment_service' | 'e_money' | 'fintech';
  status: 'connected' | 'disconnected' | 'error' | 'pending';
  accounts: BankAccount[];
  permissions: string[];
  consentExpiryDate: string;
  lastSyncTime: string;
  errorMessage?: string;
  metadata: Record<string, any>;
}

// Master-Detail Dashboard Types
export interface ConsolidatedFinancialData {
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
  netCashFlow: number;
  accountsCount: number;
  transactionsCount: number;
  lastUpdated: string;
  currency: string;
  performanceMetrics: {
    monthlyGrowth: number;
    expenseRatio: number;
    savingsRate: number;
    liquidityRatio: number;
  };
  creditScore?: CreditScoreData;
  businessHealth?: BusinessHealthReport;
}

export interface TransactionCategory {
  id: string;
  name: string;
  type: 'income' | 'expense' | 'transfer';
  color: string;
  icon: string;
  parentCategory?: string;
  totalAmount: number;
  transactionCount: number;
  percentage: number;
  budget?: number;
  trend: 'up' | 'down' | 'stable';
  trendPercentage: number;
}

export interface SupplierCustomerData {
  id: string;
  name: string;
  type: 'supplier' | 'customer';
  totalTransactions: number;
  totalAmount: number;
  averageTransaction: number;
  lastTransactionDate: string;
  paymentTerms?: string;
  creditLimit?: number;
  outstandingBalance: number;
  contactInfo: {
    email?: string;
    phone?: string;
    address?: string;
    taxId?: string;
  };
  relationshipScore: number;
  riskAssessment: 'low' | 'medium' | 'high';
}

// Compliance & Reporting Types
export interface ComplianceReport {
  id: string;
  type: 'tax' | 'audit' | 'regulatory' | 'financial';
  period: string;
  status: 'draft' | 'submitted' | 'approved' | 'rejected';
  data: Record<string, any>;
  generatedAt: string;
  submittedAt?: string;
  dueDate: string;
  requirements: string[];
  attachments: string[];
}

export interface TaxCalculation {
  grossIncome: number;
  deductions: number;
  taxableIncome: number;
  taxOwed: number;
  taxRate: number;
  estimatedQuarterly: number;
  lastCalculated: string;
  breakdown: {
    incomeTax: number;
    salesTax: number;
    payrollTax: number;
    otherTaxes: number;
  };
}

// Invoice Management Types
export interface Invoice {
  id: string;
  number: string;
  type: 'sent' | 'received';
  customerId?: string;
  supplierId?: string;
  amount: number;
  currency: string;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  issueDate: string;
  dueDate: string;
  paidDate?: string;
  description: string;
  items: InvoiceItem[];
  taxAmount: number;
  totalAmount: number;
  paymentTerms: string;
  notes?: string;
  attachments: string[];
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  taxRate: number;
  category: string;
}

// Multi-language Support Types
export interface LanguageSupport {
  code: string;
  name: string;
  nativeName: string;
  isRTL: boolean;
  flag: string;
  isActive: boolean;
  completionPercentage: number;
}

export interface TableData {
  id: string;
  [key: string]: string | number | boolean;
}

export interface DateRange {
  from: Date;
  to: Date;
}

// Company Information Types
export interface CompanyMilestone {
  id: string;
  year: string;
  title: string;
  description: string;
}

export interface CompanyValue {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

// UI Component Types
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
  shadow?: 'sm' | 'md' | 'lg' | 'none';
}

// Form Types
export interface ContactInfo {
  email: string;
  phone: string;
  address: string;
}

export interface SocialLinks {
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  instagram?: string;
  github?: string;
}

// Credit Scoring & Business Health Interfaces
export interface CreditScoreData {
  currentScore: number;
  scoreRange: { min: number; max: number };
  grade: 'A+' | 'A' | 'B+' | 'B' | 'C+' | 'C' | 'D' | 'F';
  trend: 'improving' | 'stable' | 'declining';
  monthlyChange: number;
  factors: CreditScoreFactor[];
  lastUpdated: string;
}

export interface CreditScoreFactor {
  id: string;
  name: string;
  weight: number;
  score: number;
  status: 'healthy' | 'warning' | 'critical';
  trend: 'improving' | 'stable' | 'declining';
  recommendation: string;
  impact: 'high' | 'medium' | 'low';
}

export interface BusinessHealthReport {
  overallHealth: 'excellent' | 'good' | 'fair' | 'poor';
  healthScore: number;
  keyStrengths: string[];
  improvementAreas: string[];
  recommendedActions: string[];
  riskFactors: string[];
}
