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
import { AnimatePresence, motion } from "framer-motion" // Import framer-motion
import { Platform, ConnectedAccount, TimeRange, timeRangeLabels } from '@/lib/types/online-bizz-types';
import { getStatusBadge } from '@/components/online-bizz/StatusIndicators';
import { useLanguage } from '@/contexts/LanguageContext';
import Iridescence from "../backgrounds/Iridescence"

interface BusinessDashboardProps {
  platforms?: Platform[];
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
  const { t } = useLanguage()
  const [overviewTimeRange, setOverviewTimeRange] = useState<TimeRange>("alltime")
  const [accountTimeRanges, setAccountTimeRanges] = useState<Record<string, TimeRange>>({
    shopee_001: "alltime",
  })

  const timeRangeLabelsTranslated = {
    today: t('online_business.time.today'),
    last7days: t('online_business.time.last7days'),
    last1month: t('online_business.time.last1month'),
    alltime: t('online_business.time.alltime'),
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
          <h2 className="text-2xl font-bold text-gray-900">{t('online_business.overview.title')}</h2>
          <div className="flex space-x-2">
            {Object.entries(timeRangeLabelsTranslated).map(([key, label]) => (
              <Button
                key={key}
                variant={overviewTimeRange === key ? "primary" : "outline"}
                size="sm"
                onClick={() => setOverviewTimeRange(key as TimeRange)}
                className="text-xs cursor-pointer border-black"
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
                <p className="text-sm font-medium text-green-700">{t('online_business.overview.total_revenue')}</p>
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
            <p className="text-xs text-green-600 mt-2">{t('online_business.overview.from_all_platforms')}</p>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">{t('online_business.overview.total_orders')}</p>
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
            <p className="text-xs text-blue-600 mt-2">{t('online_business.overview.across_all_platforms')}</p>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-700">{t('online_business.overview.active_platforms')}</p>
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
            <p className="text-xs text-purple-600 mt-2">{consolidatedStats.pendingPlatforms} {t('online_business.overview.pending_connection')}</p>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-700">{t('online_business.overview.total_customers')}</p>
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
            <p className="text-xs text-orange-600 mt-2">{t('online_business.overview.unique_customers')}</p>
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
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('online_business.connected.title')}</h2>

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
                            src={platforms?.find((p) => p.id === account.platformId)?.logo || "/placeholder.svg"}
                            alt={account.platformName}
                            width={40}
                            height={40}
                          />
                        </motion.div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{account.platformName}</h3>
                          <p className="text-sm text-gray-600">{t(account.accountName)}</p>
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
                            {Object.entries(timeRangeLabelsTranslated).map(([key, label]) => (
                              <Button
                                key={key}
                                variant={accountTimeRanges[account.id] === key ? "primary" : "outline"}
                                size="sm"
                                onClick={() =>
                                  setAccountTimeRanges((prev) => ({ ...prev, [account.id]: key as TimeRange }))
                                }
                                className="text-xs px-2 py-1 cursor-pointer border-black"
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
                              <p className="text-xs text-green-600">{t('online_business.connected.revenue')}</p>
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
                              <p className="text-xs text-blue-600">{t('online_business.connected.orders')}</p>
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
                              <p className="text-xs text-purple-600">{t('online_business.connected.customers')}</p>
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
                              {t('online_business.connected.view_analysis')}
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
      <p className="text-sm text-yellow-700 font-medium">{t('online_business.verification.in_progress')}</p>
    </div>
    
    <div className="mt-4 space-y-2">
  {/* Two-column grid layout */}
  <div className="grid grid-cols-2 gap-4">
    {/* Left column */}
    <div className="bg-yellow-100/50 p-3 rounded-lg border border-yellow-200">
      <h4 className="font-medium text-yellow-800 text-sm mb-1">{t('online_business.verification.approval_process')}</h4>
      <ul className="text-xs text-yellow-700 space-y-1">
        <li className="flex items-center">
          <span className="mr-1">•</span> {t('online_business.verification.account_review')}
        </li>
        <li className="flex items-center">
          <span className="mr-1">•</span> {t('online_business.verification.business_pending')}
        </li>
        <li className="flex items-center">
          <span className="mr-1">•</span> {t('online_business.verification.compliance_check')}
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
      <p className="text-xs font-medium text-yellow-800">{t('online_business.verification.current_status')}:</p>
      <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-100">{t('online_business.verification.pending')}</Badge>
    </div>
    <div className="mt-2 w-full bg-yellow-200/30 rounded-full h-1.5">
      <motion.div 
        className="bg-yellow-500 h-1.5 rounded-full" 
        initial={{ width: "0%" }}
        animate={{ width: "40%" }}
        transition={{ duration: 1 }}
      />
    </div>
    <p className="text-xs text-yellow-600 mt-1">{t('online_business.verification.percent_complete')}</p>
  </motion.div>
  </div>
  

  
  
  {/* Optional: Add an estimated completion section to increase height further */}
  <div className="flex space-x-4 text-xs text-yellow-700 p-2">
    <div className="flex-1 flex items-center">
      <Clock className="h-3 w-3 mr-1 text-yellow-500" />
      <span>{t('online_business.verification.started')}: 20/07/2025</span>
    </div>
    <div className="flex-1 flex items-center justify-end">
      <Calendar className="h-3 w-3 mr-1 text-yellow-500" />
      <span>{t('online_business.verification.est_completion')}: 22/07/2025</span>
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


    </>
  )
}