import { 
  TeamMember, 
  Feature, 
  Testimonial, 
  KPICard, 
  ChartData, 
  CompanyMilestone, 
  CompanyValue,
  ContactInfo,
  SocialLinks,
  FinancialKPI,
  CashFlowData,
  BusinessMetrics,
  FinancialHealthIndicator,
  RevenueBreakdown,
  ExpenseCategory,
  ProfitMarginData
} from './types'
import { 
  Users, 
  TrendingUp, 
  Shield, 
  Zap, 
  Target, 
  Award, 
  Heart, 
  Globe,
  DollarSign,
  ShoppingCart,
  UserCheck,
  BarChart3
} from 'lucide-react'

// Company Information
export const companyInfo = {
  name: 'BizzKu',
  tagline: 'Empowering Business Growth Through Innovation',
  mission: 'To provide cutting-edge solutions that help businesses thrive in the digital age.',
  vision: 'To be the leading platform for business transformation and growth.',
  founded: '2020',
  employees: '150+',
  customers: '10,000+',
}

// Contact Information
export const contactInfo: ContactInfo = {
  email: 'hello@bizzku.com',
  phone: '+1 (555) 123-4567',
  address: '123 Innovation Drive, Tech City, TC 12345',
}

// Social Links
export const socialLinks: SocialLinks = {
  twitter: 'https://twitter.com/bizzku',
  linkedin: 'https://linkedin.com/company/bizzku',
  facebook: 'https://facebook.com/bizzku',
  instagram: 'https://instagram.com/bizzku',
  github: 'https://github.com/bizzku',
}

// Features Data
export const features: Feature[] = [
  {
    id: '1',
    title: 'Advanced Analytics',
    description: 'Get deep insights into your business performance with our comprehensive analytics dashboard.',
    icon: BarChart3,
  },
  {
    id: '2',
    title: 'Real-time Monitoring',
    description: 'Monitor your key metrics in real-time and make data-driven decisions instantly.',
    icon: TrendingUp,
  },
  {
    id: '3',
    title: 'Secure & Reliable',
    description: 'Enterprise-grade security with 99.9% uptime guarantee for your peace of mind.',
    icon: Shield,
  },
  {
    id: '4',
    title: 'Lightning Fast',
    description: 'Optimized performance ensures your data loads quickly and efficiently.',
    icon: Zap,
  },
]

// Team Members Data
export const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'CEO & Founder',
    bio: 'Visionary leader with 15+ years in tech industry, passionate about innovation.',
    image: '/team/sarah.jpg',
    social: {
      linkedin: 'https://linkedin.com/in/sarahjohnson',
      twitter: 'https://twitter.com/sarahjohnson',
    },
  },
  {
    id: '2',
    name: 'Michael Chen',
    role: 'CTO',
    bio: 'Technical expert specializing in scalable architecture and AI solutions.',
    image: '/team/michael.jpg',
    social: {
      linkedin: 'https://linkedin.com/in/michaelchen',
      github: 'https://github.com/michaelchen',
    },
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    role: 'Head of Design',
    bio: 'Creative designer focused on user experience and beautiful interfaces.',
    image: '/team/emily.jpg',
    social: {
      linkedin: 'https://linkedin.com/in/emilyrodriguez',
      twitter: 'https://twitter.com/emilyrodriguez',
    },
  },
  {
    id: '4',
    name: 'David Kim',
    role: 'Head of Marketing',
    bio: 'Growth expert with proven track record in scaling tech companies.',
    image: '/team/david.jpg',
    social: {
      linkedin: 'https://linkedin.com/in/davidkim',
      twitter: 'https://twitter.com/davidkim',
    },
  },
]

// Testimonials Data
export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Alex Thompson',
    role: 'CEO',
    company: 'TechStart Inc.',
    content: 'BizzKu transformed our business operations. The analytics insights helped us increase revenue by 40%.',
    avatar: '/testimonials/alex.jpg',
    rating: 5,
  },
  {
    id: '2',
    name: 'Maria Garcia',
    role: 'Operations Manager',
    company: 'Growth Co.',
    content: 'The real-time monitoring features are incredible. We can now respond to issues before they impact customers.',
    avatar: '/testimonials/maria.jpg',
    rating: 5,
  },
  {
    id: '3',
    name: 'James Wilson',
    role: 'Founder',
    company: 'InnovateLab',
    content: 'Outstanding platform with excellent customer support. Highly recommend for any growing business.',
    avatar: '/testimonials/james.jpg',
    rating: 5,
  },
]

// Company Values
export const companyValues: CompanyValue[] = [
  {
    id: '1',
    title: 'Innovation',
    description: 'We constantly push boundaries to deliver cutting-edge solutions.',
    icon: Target,
  },
  {
    id: '2',
    title: 'Excellence',
    description: 'We strive for perfection in everything we do.',
    icon: Award,
  },
  {
    id: '3',
    title: 'Integrity',
    description: 'We build trust through transparency and honest communication.',
    icon: Heart,
  },
  {
    id: '4',
    title: 'Global Impact',
    description: 'We aim to make a positive difference worldwide.',
    icon: Globe,
  },
]

// Company Milestones
export const companyMilestones: CompanyMilestone[] = [
  {
    id: '1',
    year: '2020',
    title: 'Company Founded',
    description: 'BizzKu was founded with a vision to revolutionize business analytics.',
  },
  {
    id: '2',
    year: '2021',
    title: 'First 1,000 Customers',
    description: 'Reached our first major milestone with 1,000 satisfied customers.',
  },
  {
    id: '3',
    year: '2022',
    title: 'Series A Funding',
    description: 'Secured $10M in Series A funding to accelerate growth.',
  },
  {
    id: '4',
    year: '2023',
    title: 'Global Expansion',
    description: 'Expanded operations to serve customers in 50+ countries.',
  },
  {
    id: '5',
    year: '2024',
    title: 'AI Integration',
    description: 'Launched AI-powered analytics features for predictive insights.',
  },
]

// KPI Cards Data
export const kpiData: KPICard[] = [
  {
    id: '1',
    title: 'Total Revenue',
    value: '$2.4M',
    change: 12.5,
    changeType: 'increase',
    icon: DollarSign,
    description: 'Monthly recurring revenue',
  },
  {
    id: '2',
    title: 'Active Users',
    value: '45,231',
    change: 8.2,
    changeType: 'increase',
    icon: Users,
    description: 'Monthly active users',
  },
  {
    id: '3',
    title: 'Conversion Rate',
    value: '3.24%',
    change: -2.1,
    changeType: 'decrease',
    icon: UserCheck,
    description: 'Visitor to customer conversion',
  },
  {
    id: '4',
    title: 'Total Orders',
    value: '12,847',
    change: 15.3,
    changeType: 'increase',
    icon: ShoppingCart,
    description: 'Orders this month',
  },
]

// Chart Data
export const revenueData: ChartData[] = [
  { name: 'Jan', value: 1800000 },
  { name: 'Feb', value: 1950000 },
  { name: 'Mar', value: 2100000 },
  { name: 'Apr', value: 2250000 },
  { name: 'May', value: 2180000 },
  { name: 'Jun', value: 2400000 },
]

export const userGrowthData: ChartData[] = [
  { name: 'Jan', value: 32000 },
  { name: 'Feb', value: 35500 },
  { name: 'Mar', value: 38200 },
  { name: 'Apr', value: 41800 },
  { name: 'May', value: 43200 },
  { name: 'Jun', value: 45231 },
]

export const categoryData: ChartData[] = [
  { name: 'Desktop', value: 65 },
  { name: 'Mobile', value: 28 },
  { name: 'Tablet', value: 7 },
]

// Financial Analytics Mock Data
export const financialKPIs: FinancialKPI[] = [
  {
    id: 'monthly_revenue',
    title: 'Monthly Revenue',
    value: '$127,500',
    change: 18.5,
    changeType: 'increase',
    icon: DollarSign,
    description: 'Total revenue this month',
    period: 'monthly',
    currency: 'USD',
    trend: 'up',
    target: 150000,
  },
  {
    id: 'gross_profit',
    title: 'Gross Profit',
    value: '$89,250',
    change: 22.3,
    changeType: 'increase',
    icon: TrendingUp,
    description: 'Profit after direct costs',
    period: 'monthly',
    currency: 'USD',
    trend: 'up',
    target: 105000,
  },
  {
    id: 'cash_flow',
    title: 'Net Cash Flow',
    value: '$34,720',
    change: -5.2,
    changeType: 'decrease',
    icon: BarChart3,
    description: 'Net cash flow this month',
    period: 'monthly',
    currency: 'USD',
    trend: 'down',
    target: 45000,
  },
  {
    id: 'profit_margin',
    title: 'Profit Margin',
    value: '27.8%',
    change: 3.1,
    changeType: 'increase',
    icon: Target,
    description: 'Gross profit margin',
    period: 'monthly',
    trend: 'up',
    target: 30,
  },
  {
    id: 'businesses_onboarded',
    title: 'Businesses Onboarded',
    value: '1,847',
    change: 31.2,
    changeType: 'increase',
    icon: Users,
    description: 'New businesses this month',
    period: 'monthly',
    trend: 'up',
    target: 2000,
  },
  {
    id: 'avg_transaction_value',
    title: 'Avg Transaction Value',
    value: '$68.50',
    change: -2.8,
    changeType: 'decrease',
    icon: ShoppingCart,
    description: 'Average transaction amount',
    period: 'monthly',
    currency: 'USD',
    trend: 'down',
    target: 75,
  },
]

export const cashFlowData: CashFlowData[] = [
  {
    name: 'Jan',
    date: '2024-01-01',
    income: 142000,
    expenses: 89000,
    netCashFlow: 53000,
    cumulativeCashFlow: 53000,
  },
  {
    name: 'Feb',
    date: '2024-02-01',
    income: 158000,
    expenses: 94000,
    netCashFlow: 64000,
    cumulativeCashFlow: 117000,
  },
  {
    name: 'Mar',
    date: '2024-03-01',
    income: 135000,
    expenses: 91000,
    netCashFlow: 44000,
    cumulativeCashFlow: 161000,
  },
  {
    name: 'Apr',
    date: '2024-04-01',
    income: 167000,
    expenses: 98000,
    netCashFlow: 69000,
    cumulativeCashFlow: 230000,
  },
  {
    name: 'May',
    date: '2024-05-01',
    income: 149000,
    expenses: 102000,
    netCashFlow: 47000,
    cumulativeCashFlow: 277000,
  },
  {
    name: 'Jun',
    date: '2024-06-01',
    income: 175000,
    expenses: 108000,
    netCashFlow: 67000,
    cumulativeCashFlow: 344000,
  },
]

export const businessMetrics: BusinessMetrics[] = [
  {
    id: 'onboarding_step_1',
    name: 'Basic Information',
    completionRate: 94.2,
    averageTime: 3.5,
    dropOffRate: 5.8,
    satisfactionScore: 4.3,
    date: '2024-06-01',
  },
  {
    id: 'onboarding_step_2',
    name: 'Business Documents',
    completionRate: 78.6,
    averageTime: 12.3,
    dropOffRate: 21.4,
    satisfactionScore: 3.8,
    date: '2024-06-01',
  },
  {
    id: 'onboarding_step_3',
    name: 'Bank Account Setup',
    completionRate: 85.1,
    averageTime: 8.7,
    dropOffRate: 14.9,
    satisfactionScore: 4.1,
    date: '2024-06-01',
  },
  {
    id: 'onboarding_step_4',
    name: 'Payment Gateway',
    completionRate: 72.4,
    averageTime: 15.2,
    dropOffRate: 27.6,
    satisfactionScore: 3.6,
    date: '2024-06-01',
  },
  {
    id: 'onboarding_step_5',
    name: 'Final Verification',
    completionRate: 91.8,
    averageTime: 6.1,
    dropOffRate: 8.2,
    satisfactionScore: 4.5,
    date: '2024-06-01',
  },
]

export const financialHealthIndicators: FinancialHealthIndicator[] = [
  {
    id: 'liquidity_ratio',
    name: 'Liquidity Ratio',
    value: 2.8,
    status: 'healthy',
    recommendation: 'Maintain current cash reserves',
    trend: 'stable',
  },
  {
    id: 'debt_to_equity',
    name: 'Debt-to-Equity',
    value: 0.4,
    status: 'healthy',
    recommendation: 'Good balance between debt and equity',
    trend: 'improving',
  },
  {
    id: 'customer_acquisition_cost',
    name: 'Customer Acquisition Cost',
    value: 45.2,
    status: 'warning',
    recommendation: 'Focus on organic growth channels',
    trend: 'stable',
  },
  {
    id: 'churn_rate',
    name: 'Customer Churn Rate',
    value: 3.2,
    status: 'healthy',
    recommendation: 'Continue current retention strategies',
    trend: 'improving',
  },
  {
    id: 'monthly_burn_rate',
    name: 'Monthly Burn Rate',
    value: 78500,
    status: 'warning',
    recommendation: 'Monitor operational expenses closely',
    trend: 'stable',
  },
]

export const revenueBreakdown: RevenueBreakdown[] = [
  {
    name: 'Transaction Fees',
    amount: 67500,
    percentage: 53.0,
    change: 12.5,
    color: '#3b82f6',
  },
  {
    name: 'Subscription Revenue',
    amount: 38250,
    percentage: 30.0,
    change: 8.2,
    color: '#10b981',
  },
  {
    name: 'Premium Features',
    amount: 15300,
    percentage: 12.0,
    change: 24.7,
    color: '#f59e0b',
  },
  {
    name: 'Consulting Services',
    amount: 6450,
    percentage: 5.0,
    change: -5.3,
    color: '#ef4444',
  },
]

export const expenseCategories: ExpenseCategory[] = [
  {
    name: 'Staff Salaries',
    amount: 45000,
    percentage: 35.2,
    budget: 50000,
    color: '#3b82f6',
  },
  {
    name: 'Technology & Infrastructure',
    amount: 22500,
    percentage: 17.6,
    budget: 25000,
    color: '#10b981',
  },
  {
    name: 'Marketing & Advertising',
    amount: 18750,
    percentage: 14.7,
    budget: 20000,
    color: '#f59e0b',
  },
  {
    name: 'Operations',
    amount: 15200,
    percentage: 11.9,
    budget: 18000,
    color: '#ef4444',
  },
  {
    name: 'Legal & Compliance',
    amount: 12800,
    percentage: 10.0,
    budget: 15000,
    color: '#8b5cf6',
  },
  {
    name: 'Office & Utilities',
    amount: 8950,
    percentage: 7.0,
    budget: 10000,
    color: '#06b6d4',
  },
  {
    name: 'Other',
    amount: 4800,
    percentage: 3.8,
    budget: 7000,
    color: '#6b7280',
  },
]

export const profitMarginData: ProfitMarginData[] = [
  {
    name: 'Jan',
    revenue: 142000,
    costs: 89000,
    grossProfit: 53000,
    margin: 37.3,
    date: '2024-01-01',
  },
  {
    name: 'Feb',
    revenue: 158000,
    costs: 94000,
    grossProfit: 64000,
    margin: 40.5,
    date: '2024-02-01',
  },
  {
    name: 'Mar',
    revenue: 135000,
    costs: 91000,
    grossProfit: 44000,
    margin: 32.6,
    date: '2024-03-01',
  },
  {
    name: 'Apr',
    revenue: 167000,
    costs: 98000,
    grossProfit: 69000,
    margin: 41.3,
    date: '2024-04-01',
  },
  {
    name: 'May',
    revenue: 149000,
    costs: 102000,
    grossProfit: 47000,
    margin: 31.5,
    date: '2024-05-01',
  },
  {
    name: 'Jun',
    revenue: 175000,
    costs: 108000,
    grossProfit: 67000,
    margin: 38.3,
    date: '2024-06-01',
  },
]

// Additional chart data for financial analytics
export const monthlyRevenueGrowth: ChartData[] = [
  { name: 'Jan', value: 142000 },
  { name: 'Feb', value: 158000 },
  { name: 'Mar', value: 135000 },
  { name: 'Apr', value: 167000 },
  { name: 'May', value: 149000 },
  { name: 'Jun', value: 175000 },
]

export const businessOnboardingTrend: ChartData[] = [
  { name: 'Jan', value: 1245 },
  { name: 'Feb', value: 1389 },
  { name: 'Mar', value: 1156 },
  { name: 'Apr', value: 1567 },
  { name: 'May', value: 1423 },
  { name: 'Jun', value: 1847 },
]

export const customerAcquisitionCost: ChartData[] = [
  { name: 'Jan', value: 52.3 },
  { name: 'Feb', value: 48.7 },
  { name: 'Mar', value: 51.2 },
  { name: 'Apr', value: 43.8 },
  { name: 'May', value: 46.5 },
  { name: 'Jun', value: 45.2 },
]
