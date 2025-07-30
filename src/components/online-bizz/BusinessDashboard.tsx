import { useState } from "react"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import Image from "next/image"
import {
  TrendingUp, Users, ShoppingCart, DollarSign, 
  CheckCircle2, Clock, AlertCircle, BarChart3, 
  Truck, Plus, ArrowRight, Zap, Globe, X, Loader2
} from "lucide-react"
import { Platform, ConnectedAccount, TimeRange, timeRangeLabels } from '@/lib/types/online-bizz-types';
import { getStatusIcon, getStatusBadge } from '@/components/online-bizz/StatusIndicators';

interface BusinessDashboardProps {
  platforms: Platform[];
  connectedAccounts: ConnectedAccount[];
  consolidatedStats: any;
}

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
    </>
  )
}