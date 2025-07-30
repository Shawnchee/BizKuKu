import { useState } from "react"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import Image from "next/image"
import {
  TrendingUp, Users, ShoppingCart, DollarSign, 
  CheckCircle2, Clock, AlertCircle, BarChart3, 
  Truck, Plus, ArrowRight, Zap, Globe, X, Loader2,
  Calendar
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion" // Import framer-motion
import { Platform, ConnectedAccount, TimeRange, timeRangeLabels } from '@/lib/types/online-bizz-types';
import { getStatusIcon, getStatusBadge } from '@/components/online-bizz/StatusIndicators';

interface BusinessDashboardProps {
  platforms: Platform[];
  connectedAccounts: ConnectedAccount[];
  consolidatedStats: any;
}

// Animation variants for staggered children
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function BusinessDashboard({ 
  platforms, 
  connectedAccounts, 
  consolidatedStats 
}: BusinessDashboardProps) {
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
  }

  const currentStats = consolidatedStats[overviewTimeRange]

  return (
    <>
      {/* Time Range Selector for Overview */}
      <motion.div 
        className="mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
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
      </motion.div>

      {/* Overview Stats */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={itemVariants}>
          <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">Total Revenue</p>
                <motion.p 
                  className="text-2xl font-bold text-green-800"
                  key={currentStats.totalRevenue}
                  initial={{ opacity: 0.5, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  RM {currentStats.totalRevenue.toLocaleString()}
                </motion.p>
              </div>
              <motion.div 
                className="p-3 bg-green-500 rounded-full"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <DollarSign className="h-6 w-6 text-white" />
              </motion.div>
            </div>
            <p className="text-xs text-green-600 mt-2">From all connected platforms</p>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">Total Orders</p>
                <motion.p 
                  className="text-2xl font-bold text-blue-800"
                  key={currentStats.totalOrders}
                  initial={{ opacity: 0.5, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {currentStats.totalOrders.toLocaleString()}
                </motion.p>
              </div>
              <motion.div 
                className="p-3 bg-blue-500 rounded-full"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ShoppingCart className="h-6 w-6 text-white" />
              </motion.div>
            </div>
            <p className="text-xs text-blue-600 mt-2">Across all platforms</p>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-700">Active Platforms</p>
                <motion.p 
                  className="text-2xl font-bold text-purple-800"
                  initial={{ opacity: 0.5, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {consolidatedStats.activePlatforms}
                </motion.p>
              </div>
              <motion.div 
                className="p-3 bg-purple-500 rounded-full"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Globe className="h-6 w-6 text-white" />
              </motion.div>
            </div>
            <p className="text-xs text-purple-600 mt-2">{consolidatedStats.pendingPlatforms} pending connection</p>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-700">Total Customers</p>
                <motion.p 
                  className="text-2xl font-bold text-orange-800"
                  key={currentStats.totalCustomers}
                  initial={{ opacity: 0.5, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {currentStats.totalCustomers.toLocaleString()}
                </motion.p>
              </div>
              <motion.div 
                className="p-3 bg-orange-500 rounded-full"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Users className="h-6 w-6 text-white" />
              </motion.div>
            </div>
            <p className="text-xs text-orange-600 mt-2">Unique customers reached</p>
          </Card>
        </motion.div>
      </motion.div>

      {/* Connected Accounts Dashboard */}
      {connectedAccounts.length > 0 && (
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">🔗 Your Connected Accounts</h2>

          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {connectedAccounts.map((account) => {
              const currentAccountStats = account.stats[accountTimeRanges[account.id]]
              return (
                <motion.div 
                  key={account.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Card
                    className="p-6 bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 hover:border-blue-300 transition-colors"
                  >
                    {/* Platform Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <motion.div 
                          className="p-2 bg-blue-100 rounded-lg"
                          whileHover={{ rotate: 5 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <Image
                            src={platforms.find((p) => p.id === account.platformId)?.logo || "/placeholder.svg"}
                            alt={account.platformName}
                            width={40}
                            height={40}
                          />
                        </motion.div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{account.platformName}</h3>
                          <p className="text-sm text-gray-600">{account.accountName}</p>
                        </div>
                      </div>
                      {getStatusBadge(account.status)}
                    </div>

                    {account.status === "active" && (
                      <AnimatePresence mode="wait">
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
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
                          <motion.div 
                            className="grid grid-cols-3 gap-3 mb-4"
                            key={accountTimeRanges[account.id]}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
                              <motion.p 
                                className="text-lg font-bold text-green-600"
                                key={currentAccountStats.revenue}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                              >
                                RM {currentAccountStats.revenue.toLocaleString()}
                              </motion.p>
                              <p className="text-xs text-green-600">Revenue</p>
                            </div>
                            <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                              <motion.p 
                                className="text-lg font-bold text-blue-600"
                                key={currentAccountStats.orders}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                              >
                                {currentAccountStats.orders}
                              </motion.p>
                              <p className="text-xs text-blue-600">Orders</p>
                            </div>
                            <div className="text-center p-3 bg-purple-50 rounded-lg border border-purple-200">
                              <motion.p 
                                className="text-lg font-bold text-purple-600"
                                key={currentAccountStats.customers}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                              >
                                {currentAccountStats.customers}
                              </motion.p>
                              <p className="text-xs text-purple-600">Customers</p>
                            </div>
                          </motion.div>

                          {/* CTA Button */}
                          <motion.div
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                          >
                            <Button
                              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white cursor-pointer"
                              onClick={() => (window.location.href = "/financial-report")}
                            >
                              <BarChart3 className="h-4 w-4 mr-2" />
                              View Detailed Analysis
                              <ArrowRight className="h-4 w-4 ml-2" />
                            </Button>
                          </motion.div>
                        </motion.div>
                      </AnimatePresence>
                    )}

                    {account.status === "in_progress" && (
  <motion.div 
    className="p-4 bg-yellow-50 rounded-lg border border-yellow-200"
    initial={{ opacity: 0, height: 0 }}
    animate={{ opacity: 1, height: "auto" }}
    transition={{ duration: 0.3 }}
  >
    <div className="flex items-center space-x-2 mb-3">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
      >
        <Clock className="h-5 w-5 text-yellow-500" />
      </motion.div>
      <p className="text-sm text-yellow-700 font-medium">Account verification in progress</p>
    </div>
    
    <div className="mt-4 space-y-2">
  {/* Two-column grid layout */}
  <div className="grid grid-cols-2 gap-4">
    {/* Left column */}
    <div className="bg-yellow-100/50 p-3 rounded-lg border border-yellow-200">
      <h4 className="font-medium text-yellow-800 text-sm mb-1">Platform Approval Process</h4>
      <ul className="text-xs text-yellow-700 space-y-1">
        <li className="flex items-center">
          <span className="mr-1">•</span> Account details under review
        </li>
        <li className="flex items-center">
          <span className="mr-1">•</span> Business verification pending
        </li>
        <li className="flex items-center">
          <span className="mr-1">•</span> Compliance check in progress
        </li>
      </ul>
    </div>
    
    {/* Right column */}
<motion.div 
    className="border border-dashed border-yellow-300 rounded-lg p-3"
    animate={{ backgroundColor: ["rgba(254, 240, 138, 0.1)", "rgba(254, 240, 138, 0.3)", "rgba(254, 240, 138, 0.1)"] }}
    transition={{ duration: 2, repeat: Infinity }}
  >
    <div className="flex justify-between items-center">
      <p className="text-xs font-medium text-yellow-800">Current Status:</p>
      <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-100">Pending</Badge>
    </div>
    <div className="mt-2 w-full bg-yellow-200/30 rounded-full h-1.5">
      <motion.div 
        className="bg-yellow-500 h-1.5 rounded-full" 
        initial={{ width: "0%" }}
        animate={{ width: "40%" }}
        transition={{ duration: 1 }}
      />
    </div>
    <p className="text-xs text-yellow-600 mt-1">40% complete</p>
  </motion.div>
  </div>
  

  
  
  {/* Optional: Add an estimated completion section to increase height further */}
  <div className="flex space-x-4 text-xs text-yellow-700 p-2">
    <div className="flex-1 flex items-center">
      <Clock className="h-3 w-3 mr-1 text-yellow-500" />
      <span>Started: 20/07/2025</span>
    </div>
    <div className="flex-1 flex items-center justify-end">
      <Calendar className="h-3 w-3 mr-1 text-yellow-500" />
      <span>Est. Completion: 22/07/2025</span>
    </div>
  </div>
</div>
                    </motion.div>
                  )}
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
        </motion.div>
      )}

      {/* Platform Categories */}
      <motion.div 
        className="mb-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">🛍️ Available Platforms</h2>
          <p className="text-gray-600">Choose the platforms that work best for your business</p>
        </div>
        <motion.div className="flex justify-center space-x-2 flex-wrap gap-2">
          {categories.map((category, index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Button
                variant={selectedCategory === category ? "primary" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="capitalize cursor-pointer"
              >
                {category === "all" ? "All Platforms" : category}
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Platform Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
        variants={containerVariants}
        initial="hidden"
        animate="show"
        key={selectedCategory} // Re-render animation when category changes
      >
        {filteredPlatforms.map((platform) => (
          <motion.div
            key={platform.id}
            variants={itemVariants}
            whileHover={{ scale: 1.03, y: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Card
              className="p-6 bg-white border-2 hover:border-blue-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <motion.div 
                    className="p-2 bg-gray-100 rounded-lg"
                    whileHover={{ rotate: 5 }}
                  >
                    <Image src={platform.logo || "/placeholder.svg"} alt={platform.name} width={40} height={40} />
                  </motion.div>
                  <div>
                    <h3 className="font-bold text-gray-900">{platform.name}</h3>
                    <p className="text-sm text-gray-600">{platform.category}</p>
                  </div>
                </div>
                <motion.div whileHover={{ scale: 1.2 }}>
                  {getStatusIcon(platform.status)}
                </motion.div>
              </div>

              <p className="text-sm text-gray-600 mb-4">{platform.description}</p>

              <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-gray-500 flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {platform.setupTime}
                </span>
              </div>

              <div className="mb-4">
                <p className="text-xs font-medium text-gray-700 mb-2">Key Features:</p>
                <div className="flex flex-wrap gap-1">
                  {platform.features.slice(0, 3).map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Badge variant="secondary" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                        {feature}
                      </Badge>
                    </motion.div>
                  ))}
                  {platform.features.length > 3 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <Badge variant="secondary" className="text-xs bg-gray-50 text-gray-600">
                        +{platform.features.length - 3} more
                      </Badge>
                    </motion.div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between">
                {getStatusBadge(platform.status)}

                {platform.status === "available" && (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      size="sm"
                      onClick={() => handleConnect(platform.id, platform.name)}
                      disabled={isConnecting === platform.id}
                      className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 cursor-pointer"
                    >
                      <Zap className="h-4 w-4" />
                      <span>Connect Now</span>
                    </Button>
                  </motion.div>
                )}

                {platform.status === "connected" && (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center space-x-2 bg-transparent border-green-300 text-green-600 hover:bg-green-50 cursor-pointer"
                    >
                      <BarChart3 className="h-4 w-4" />
                      <span>View Analytics</span>
                    </Button>
                  </motion.div>
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
          </motion.div>
        ))}
      </motion.div>
      
      {/* Modal with AnimatePresence for smooth enter/exit */}
      <AnimatePresence>
        {showConnectModal && (
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <Card className="p-10 max-w-xl mx-4 text-center">
                <div className="mb-6">
                  <motion.div 
                    className="w-24 h-24 bg-blue-100 rounded-full mx-auto mb-6 flex items-center justify-center"
                    animate={isConnecting ? 
                      { scale: [1, 1.05, 1], opacity: [1, 0.8, 1] } : 
                      { scale: [0.8, 1.1, 1], rotate: [0, 10, 0] }
                    }
                    transition={isConnecting ? 
                      { repeat: Infinity, duration: 1.5 } : 
                      { duration: 0.5 }
                    }
                  >
                    {isConnecting ? (
                      <Loader2 className="h-12 w-12 text-blue-500 animate-spin" />
                    ) : (
                      <CheckCircle2 className="h-12 w-12 text-green-500" />
                    )}
                  </motion.div>
                  <motion.h3 
                    className="text-2xl font-bold text-gray-900 mb-4"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {isConnecting ? "Registering Your Application" : "Account Verification Complete"}
                  </motion.h3>
                  <motion.p 
                    className="text-gray-600 mb-4"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {isConnecting
                      ? `We're setting up your ${connectingPlatform} account registration. This may take a moment...`
                      : `Your ${connectingPlatform} account verification is complete. We're now awaiting platform approval.`}
                  </motion.p>
                  <motion.div 
                    className="bg-blue-50 p-4 rounded-lg border border-blue-200"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
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
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                          >
                            <br />• Account verification complete ✅
                          </motion.span>
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7 }}
                          >
                            <br />• Awaiting platform approval (1-2 business days) ⏳
                          </motion.span>
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.9 }}
                          >
                            <br />• You'll receive a notification when approved 🔔
                          </motion.span>
                        </>
                      )}
                    </p>
                  </motion.div>
                </div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button variant="outline" onClick={() => setShowConnectModal(false)} className="mt-6 px-6 py-3 text-base cursor-pointer">
                    <X className="h-5 w-5 mr-2" />
                    Close
                  </Button>
                </motion.div>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}