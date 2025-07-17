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
