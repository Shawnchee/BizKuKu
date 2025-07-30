"use client"

import { useState } from "react"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import Image from "next/image"
import {
  TrendingUp,
  Users,
  ShoppingCart,
  DollarSign,
  CheckCircle2,
  Clock,
  AlertCircle,
  BarChart3,
  Truck,
  Plus,
  ArrowRight,
  Zap,
  Globe,
  X,
  Loader2,
  PlayCircle,
  BookOpen,
  MessageCircle,
  Camera,
  Star,
  Phone,
  Award,
  Heart,
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
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [isConnecting, setIsConnecting] = useState<string | null>(null)
  const [showConnectModal, setShowConnectModal] = useState(false)
  const [connectingPlatform, setConnectingPlatform] = useState<string>("")
  const [overviewTimeRange, setOverviewTimeRange] = useState<TimeRange>("alltime")
  const [accountTimeRanges, setAccountTimeRanges] = useState<Record<string, TimeRange>>({
    shopee_001: "alltime",
    lazada_001: "alltime",
  })

  const categories = ["all", "E-commerce Marketplace", "Social Commerce", "Food Delivery"]

  const filteredPlatforms =
    selectedCategory === "all" ? platforms : platforms.filter((p) => p.category === selectedCategory)

  const handleConnect = async (platformId: string, platformName: string) => {
    setConnectingPlatform(platformName)
    setShowConnectModal(true)
    setIsConnecting(platformId)

    // Simulate registration process - shorter loading time (1-2 seconds)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // After loading, keep the modal open but change state to show verification status
    setIsConnecting(null)
    
    // In real app, would update the platform status or redirect
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "connected":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />
      case "in_progress":
        return <Clock className="h-5 w-5 text-yellow-500" />
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-500" />
      default:
        return <Plus className="h-5 w-5 text-gray-400" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "connected":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Connected</Badge>
      case "in_progress":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">In Progress</Badge>
      case "error":
        return <Badge className="bg-red-100 text-red-800 border-red-200">Error</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Available</Badge>
    }
  }

  const getDifficultyBadge = (difficulty: string) => {
    const colors = {
      Easy: "bg-green-100 text-green-800 border-green-200",
      Medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
      Advanced: "bg-red-100 text-red-800 border-red-200",
    }
    return <Badge className={colors[difficulty as keyof typeof colors]}>{difficulty}</Badge>
  }

  const currentStats = consolidatedStats[overviewTimeRange]

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
            <p className="text-blue-200">Simple, easy, and designed for everyone - no technical skills needed!</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Time Range Selector for Overview */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">📊 Business Overview</h2>
            <div className="flex space-x-2">
              {Object.entries(timeRangeLabels).map(([key, label]) => (
                <Button
                  key={key}
                  variant={overviewTimeRange === key ? "primary" : "outline"}
                  size="sm"
                  onClick={() => setOverviewTimeRange(key as TimeRange)}
                  className="text-xs cursor-pointer"
                >
                  {label}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">Total Revenue</p>
                <p className="text-2xl font-bold text-green-800">RM {currentStats.totalRevenue.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-green-500 rounded-full">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
            </div>
            <p className="text-xs text-green-600 mt-2">From all connected platforms</p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">Total Orders</p>
                <p className="text-2xl font-bold text-blue-800">{currentStats.totalOrders.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-blue-500 rounded-full">
                <ShoppingCart className="h-6 w-6 text-white" />
              </div>
            </div>
            <p className="text-xs text-blue-600 mt-2">Across all platforms</p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-700">Active Platforms</p>
                <p className="text-2xl font-bold text-purple-800">{consolidatedStats.activePlatforms}</p>
              </div>
              <div className="p-3 bg-purple-500 rounded-full">
                <Globe className="h-6 w-6 text-white" />
              </div>
            </div>
            <p className="text-xs text-purple-600 mt-2">{consolidatedStats.pendingPlatforms} pending connection</p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-700">Total Customers</p>
                <p className="text-2xl font-bold text-orange-800">{currentStats.totalCustomers.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-orange-500 rounded-full">
                <Users className="h-6 w-6 text-white" />
              </div>
            </div>
            <p className="text-xs text-orange-600 mt-2">Unique customers reached</p>
          </Card>
        </div>

        {/* Connected Accounts Dashboard */}
        {connectedAccounts.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">🔗 Your Connected Accounts</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {connectedAccounts.map((account) => {
                const currentAccountStats = account.stats[accountTimeRanges[account.id]]
                return (
                  <Card
                    key={account.id}
                    className="p-6 bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 hover:border-blue-300 transition-colors"
                  >
                    {/* Platform Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Image
                            src={platforms.find((p) => p.id === account.platformId)?.logo || "/placeholder.svg"}
                            alt={account.platformName}
                            width={40}
                            height={40}
                          />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{account.platformName}</h3>
                          <p className="text-sm text-gray-600">{account.accountName}</p>
                        </div>
                      </div>
                      {getStatusBadge(account.status)}
                    </div>

                    {account.status === "active" && (
                      <>
                        {/* Time Range Selector */}
                        <div className="flex space-x-1 mb-4">
                          {Object.entries(timeRangeLabels).map(([key, label]) => (
                            <Button
                              key={key}
                              variant={accountTimeRanges[account.id] === key ? "primary" : "outline"}
                              size="sm"
                              onClick={() =>
                                setAccountTimeRanges((prev) => ({ ...prev, [account.id]: key as TimeRange }))
                              }
                              className="text-xs px-2 py-1 cursor-pointer"
                            >
                              {label}
                            </Button>
                          ))}
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-3 gap-3 mb-4">
                          <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
                            <p className="text-lg font-bold text-green-600">
                              RM {currentAccountStats.revenue.toLocaleString()}
                            </p>
                            <p className="text-xs text-green-600">Revenue</p>
                          </div>
                          <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                            <p className="text-lg font-bold text-blue-600">{currentAccountStats.orders}</p>
                            <p className="text-xs text-blue-600">Orders</p>
                          </div>
                          <div className="text-center p-3 bg-purple-50 rounded-lg border border-purple-200">
                            <p className="text-lg font-bold text-purple-600">{currentAccountStats.customers}</p>
                            <p className="text-xs text-purple-600">Customers</p>
                          </div>
                        </div>

                        {/* CTA Button */}
                        <Button
                          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white cursor-pointer"
                          onClick={() => (window.location.href = "/financial-report")}
                        >
                          <BarChart3 className="h-4 w-4 mr-2" />
                          View Detailed Analysis
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </>
                    )}

                    {account.status === "in_progress" && (
                      <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                        <div className="flex items-center space-x-2">
                          <Clock className="h-5 w-5 text-yellow-500" />
                          <p className="text-sm text-yellow-700 font-medium">Account verification in progress</p>
                        </div>
                        <p className="text-xs text-yellow-600 mt-1">Expected completion: 1-2 business days</p>
                      </div>
                    )}
                  </Card>
                )
              })}
            </div>
          </div>
        )}

        {/* Platform Categories */}
        <div className="mb-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">🛍️ Available Platforms</h2>
            <p className="text-gray-600">Choose the platforms that work best for your business</p>
          </div>
          <div className="flex justify-center space-x-2 flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "primary" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="capitalize cursor-pointer"
              >
                {category === "all" ? "All Platforms" : category}
              </Button>
            ))}
          </div>
        </div>

        {/* Platform Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredPlatforms.map((platform) => (
            <Card
              key={platform.id}
              className="p-6 hover:shadow-xl transition-all duration-300 bg-white border-2 hover:border-blue-300 hover:scale-105"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Image src={platform.logo || "/placeholder.svg"} alt={platform.name} width={40} height={40} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{platform.name}</h3>
                    <p className="text-sm text-gray-600">{platform.category}</p>
                  </div>
                </div>
                {getStatusIcon(platform.status)}
              </div>

              <p className="text-sm text-gray-600 mb-4">{platform.description}</p>

              <div className="flex items-center justify-between mb-4">
                {getDifficultyBadge(platform.difficulty)}
                <span className="text-xs text-gray-500 flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {platform.setupTime}
                </span>
              </div>

              <div className="mb-4">
                <p className="text-xs font-medium text-gray-700 mb-2">Key Features:</p>
                <div className="flex flex-wrap gap-1">
                  {platform.features.slice(0, 3).map((feature, index) => (
                    <Badge key={index} variant="secondary" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                      {feature}
                    </Badge>
                  ))}
                  {platform.features.length > 3 && (
                    <Badge variant="secondary" className="text-xs bg-gray-50 text-gray-600">
                      +{platform.features.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between">
                {getStatusBadge(platform.status)}

                {platform.status === "available" && (
                  <Button
                    size="sm"
                    onClick={() => handleConnect(platform.id, platform.name)}
                    disabled={isConnecting === platform.id}
                    className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 cursor-pointer"
                  >
                    <Zap className="h-4 w-4" />
                    <span>Connect Now</span>
                  </Button>
                )}

                {platform.status === "connected" && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center space-x-2 bg-transparent border-green-300 text-green-600 hover:bg-green-50 cursor-pointer"
                  >
                    <BarChart3 className="h-4 w-4" />
                    <span>View Analytics</span>
                  </Button>
                )}

                {platform.status === "in_progress" && (
                  <Button
                    variant="outline"
                    size="sm"
                    disabled
                    className="flex items-center space-x-2 bg-transparent border-yellow-300 text-yellow-600"
                  >
                    <Clock className="h-4 w-4" />
                    <span>Pending</span>
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Help Resources for Uncle/Aunty */}
        <div className="mb-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">🤝 We're Here to Help You Succeed!</h2>
            <p className="text-gray-600">
              Don't worry if technology feels overwhelming. We make it simple for everyone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {helpResources.map((resource) => (
              <Card
                key={resource.id}
                className="p-4 text-center hover:shadow-lg transition-shadow bg-white border-2 hover:border-blue-300"
              >
                <div className={`inline-flex p-3 rounded-full ${resource.color} mb-3`}>
                  <resource.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{resource.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{resource.description}</p>
                <Button size="sm" className="w-full cursor-pointer">
                  {resource.action}
                </Button>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Start Guides */}
        <div className="mb-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">📚 Quick Start Guides</h2>
            <p className="text-gray-600">Simple guides to help you get started with your online business</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickStartGuides.map((guide) => (
              <Card
                key={guide.id}
                className="p-4 hover:shadow-lg transition-shadow bg-white border-2 hover:border-green-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <guide.icon className="h-5 w-5 text-green-600" />
                  </div>
                  <Badge className="bg-green-100 text-green-800 text-xs">{guide.difficulty}</Badge>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{guide.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{guide.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{guide.time}</span>
                  <Button size="sm" variant="outline" className="text-xs bg-transparent cursor-pointer">
                    <BookOpen className="h-3 w-3 mr-1" />
                    Read
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
        

        </div>

      {showConnectModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <Card className="p-10 max-w-xl mx-4 text-center">
      <div className="mb-6">
        <div className="w-24 h-24 bg-blue-100 rounded-full mx-auto mb-6 flex items-center justify-center">
          {isConnecting ? (
            <Loader2 className="h-12 w-12 text-blue-500 animate-spin" />
          ) : (
            <CheckCircle2 className="h-12 w-12 text-green-500" />
          )}
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          {isConnecting ? "Registering Your Application" : "Account Verification Complete"}
        </h3>
        <p className="text-gray-600 mb-4">
          {isConnecting
            ? `We're setting up your ${connectingPlatform} account registration. This may take a moment...`
            : `Your ${connectingPlatform} account verification is complete. We're now awaiting platform approval.`}
        </p>
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-700">
            <strong>{isConnecting ? "What's happening:" : "Status update:"}</strong>
            {isConnecting ? (
              <>
                <br />• Creating your application
                <br />• Preparing required documents
                <br />• Setting up your account profile
              </>
            ) : (
              <>
                <br />• Account verification complete
                <br />• Awaiting platform approval (1-2 business days)
                <br />• You'll receive a notification when approved
              </>
            )}
          </p>
        </div>
      </div>
      <Button variant="outline" onClick={() => setShowConnectModal(false)} className="mt-6 px-6 py-3 text-base cursor-pointer">
        <X className="h-5 w-5 mr-2" />
        Close
      </Button>
    </Card>
  </div>
)}
    </div>
  )
}
