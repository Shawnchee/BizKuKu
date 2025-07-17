import { 
  TeamMember, 
  Feature, 
  Testimonial, 
  KPICard, 
  ChartData, 
  CompanyMilestone, 
  CompanyValue,
  ContactInfo,
  SocialLinks 
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
