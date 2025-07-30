"use client"

import BusinessDashboard from "@/components/online-bizz/BusinessDashboard"
import BusinessResources from "@/components/online-bizz/BusinessResources"
import {
  DollarSign,
  Truck,
  PlayCircle,
  MessageCircle,
  Camera,
  Phone,
} from "lucide-react"

interface Platform {
  id: string
  name: string
  description: string
  logo: string
  status: "available" | "connected" | "in_progress" | "error"
  category: string
  features: string[]
  connectionDate?: string
  lastSync?: string
  stats?: {
    orders: number
    revenue: number
    products: number
    customers: number
  }
  difficulty: "Easy" | "Medium" | "Advanced"
  setupTime: string
}

interface ConnectedAccount {
  id: string
  platformId: string
  platformName: string
  accountName: string
  accountId: string
  status: "active" | "in_progress" | "error" | "pending_verification"
  stats: {
    today: { revenue: number; orders: number; customers: number }
    last7days: { revenue: number; orders: number; customers: number }
    last1month: { revenue: number; orders: number; customers: number }
    alltime: { revenue: number; orders: number; customers: number }
  }
  lastActivity: string
  profileImage: string
}

type TimeRange = "today" | "last7days" | "last1month" | "alltime"

const platforms: Platform[] = [
  {
    id: "shopee",
    name: "Shopee",
    description: "Southeast Asia's leading e-commerce platform with millions of active buyers",
    logo: "/logo/shopee_logo.png",
    status: "connected",
    category: "E-commerce Marketplace",
    features: ["Product Sync", "Order Management", "Inventory Tracking", "Analytics"],
    difficulty: "Easy",
    setupTime: "1-2 days",
  },
  {
    id: "lazada",
    name: "Lazada",
    description: "Pioneer e-commerce platform in Southeast Asia with extensive logistics network",
    logo: "/logo/laz_logo.png",
    status: "in_progress",
    category: "E-commerce Marketplace",
    features: ["Product Catalog", "Order Processing", "Payment Integration", "Shipping"],
    difficulty: "Easy",
    setupTime: "1-2 days",
  },
  {
    id: "tiktok",
    name: "TikTok Shop",
    description: "Social commerce platform integrated with TikTok's massive user base",
    logo: "/logo/tt_logo.png",
    status: "available",
    category: "Social Commerce",
    features: ["Live Selling", "Video Commerce", "Influencer Partnerships", "Social Analytics"],
    difficulty: "Medium",
    setupTime: "1-2 days",
  },
  {
    id: "facebook",
    name: "Facebook Shop",
    description: "Reach customers through Facebook and Instagram shopping features",
    logo: "/logo/fb_logo.png",
    status: "available",
    category: "Social Commerce",
    features: ["Instagram Integration", "Facebook Ads", "Messenger Commerce", "Catalog Sync"],
    difficulty: "Medium",
    setupTime: "2-5 days",
  },
  {
    id: "grab",
    name: "GrabFood",
    description: "Food delivery platform connecting restaurants with hungry customers",
    logo: "/logo/gf_logo.png",
    status: "available",
    category: "Food Delivery",
    features: ["Menu Management", "Order Tracking", "Delivery Analytics", "Customer Reviews"],
    difficulty: "Easy",
    setupTime: "1-3 days",
  },
  {
    id: "foodpanda",
    name: "Foodpanda",
    description: "Leading food delivery service with extensive restaurant network",
    logo: "/logo/fp_logo.png",
    status: "available",
    category: "Food Delivery",
    features: ["Restaurant Dashboard", "Real-time Orders", "Performance Metrics", "Promotion Tools"],
    difficulty: "Easy",
    setupTime: "1-3 days",
  },
]

const connectedAccounts: ConnectedAccount[] = [
  {
    id: "shopee_001",
    platformId: "shopee",
    platformName: "Shopee",
    accountName: "BizzKu Official Store",
    accountId: "bizzkustore",
    status: "active",
    stats: {
      today: { revenue: 450, orders: 8, customers: 7 },
      last7days: { revenue: 3200, orders: 89, customers: 76 },
      last1month: { revenue: 12500, orders: 324, customers: 287 },
      alltime: { revenue: 25800, orders: 1247, customers: 892 },
    },
    lastActivity: "2024-06-20T10:30:00Z",
    profileImage: "/placeholder.svg?height=40&width=40&text=BS",
  },
  {
    id: "lazada_001",
    platformId: "lazada",
    platformName: "Lazada",
    accountName: "BizzKu Marketplace",
    accountId: "bizzku-my",
    status: "in_progress",
    stats: {
      today: { revenue: 0, orders: 0, customers: 0 },
      last7days: { revenue: 0, orders: 0, customers: 0 },
      last1month: { revenue: 0, orders: 0, customers: 0 },
      alltime: { revenue: 0, orders: 0, customers: 0 },
    },
    lastActivity: "2024-06-18T15:20:00Z",
    profileImage: "/placeholder.svg?height=40&width=40&text=BM",
  },
]

const consolidatedStats = {
  today: { totalRevenue: 450, totalOrders: 8, totalCustomers: 7, totalProducts: 156 },
  last7days: { totalRevenue: 3200, totalOrders: 89, totalCustomers: 76, totalProducts: 156 },
  last1month: { totalRevenue: 12500, totalOrders: 324, totalCustomers: 287, totalProducts: 156 },
  alltime: { totalRevenue: 25800, totalOrders: 1247, totalCustomers: 892, totalProducts: 156 },
  activePlatforms: 1,
  pendingPlatforms: 1,
}

const timeRangeLabels = {
  today: "Today",
  last7days: "Last 7 Days",
  last1month: "Last Month",
  alltime: "All Time",
}

const helpResources = [
  {
    id: "video-tutorials",
    title: "Video Tutorials (Bahasa Malaysia)",
    description: "Step-by-step video guides in your preferred language",
    icon: PlayCircle,
    color: "bg-red-500",
    action: "Watch Now",
  },
  {
    id: "whatsapp-support",
    title: "WhatsApp Support",
    description: "Get instant help via WhatsApp from our friendly team",
    icon: MessageCircle,
    color: "bg-green-500",
    action: "Chat Now",
  },
  {
    id: "phone-support",
    title: "Phone Support",
    description: "Speak directly with our support team in your language",
    icon: Phone,
    color: "bg-blue-500",
    action: "Call Now",
  },
]

const quickStartGuides = [
  {
    id: "photography-tips",
    title: "Product Photography Made Simple",
    description: "Take great photos with just your phone",
    icon: Camera,
    difficulty: "Beginner",
    time: "5 min read",
  },
  {
    id: "pricing-guide",
    title: "How to Price Your Products",
    description: "Simple formulas to set profitable prices",
    icon: DollarSign,
    difficulty: "Beginner",
    time: "3 min read",
  },
  {
    id: "shipping-guide",
    title: "Shipping & Delivery Guide",
    description: "Everything you need to know about sending products",
    icon: Truck,
    difficulty: "Beginner",
    time: "4 min read",
  },
]

export default function OnlineBizzkuPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-2">🚀 Online BizzKu</h1>
            <p className="text-xl text-blue-100 mb-4">
              Connect and manage all your online business platforms in one place
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Business Dashboard Component (Overview, Connected Accounts, Available Platforms) */}
        <BusinessDashboard 
          platforms={platforms}
          connectedAccounts={connectedAccounts}
          consolidatedStats={consolidatedStats}
        />
        
        {/* Business Resources Component (Help Resources, Quick Start Guides) */}
        <BusinessResources 
          helpResources={helpResources}
          quickStartGuides={quickStartGuides}
        />
      </div>
    </div>
  )
}