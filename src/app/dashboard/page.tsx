'use client'

import { useState, useEffect } from 'react'
import { Calendar, Download, Filter, TrendingUp, Users, DollarSign, Building2, Store, Clock, MapPin, Star, QrCode, CreditCard, Utensils, Award, BarChart3, ArrowUpRight, ArrowDownRight, Eye, EyeOff, RefreshCw, Settings, Bell, HelpCircle, ChevronRight, Zap, ShoppingCart, Target, Plus, Minus } from 'lucide-react'
import { Card } from '@/components/ui'
import { Button } from '@/components/ui'
import KPICard from '@/components/ui/KPICard'
import DataTable from '@/components/ui/DataTable'
import LineChart from '@/components/charts/LineChart'
import BarChart from '@/components/charts/BarChart'
import PieChart from '@/components/charts/PieChart'
import CountUp from '@/components/animation/CountUp'
import { 
  msmeBusinessProfile,
  msmeKPIData,
  msmeFinancialKPIs,
  msmeBankAccounts,
  msmeTransactions,
  msmeDailySalesPattern,
  msmeRevenueBreakdown,
  msmeMonthlyRevenueGrowth,
  msmeWeeklySalesTrends,
  msmePeakHours,
  msmeMenuPerformance,
  msmeCustomerDemographics,
  msmeConsolidatedFinancialData,
  msmeTransactionCategories,
  msmeFinancialHealthIndicators
} from '@/lib/msme-data'
import { formatCurrency, formatNumber } from '@/lib/utils'

export default function MSMEDashboardPage() {
  const [dateRange, setDateRange] = useState('Last 30 days')
  const [selectedTimeframe, setSelectedTimeframe] = useState('daily')
  const [isAnimating, setIsAnimating] = useState(false)
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [showBalance, setShowBalance] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Animate cards on mount
  useEffect(() => {
    setIsAnimating(true)
    const timer = setTimeout(() => setIsAnimating(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  const handleRefresh = async () => {
    setIsRefreshing(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsRefreshing(false)
  }

  const timeframeOptions = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
  ]

  const getTotalBalance = () => {
    return msmeBankAccounts.reduce((total, account) => total + account.balance, 0)
  }

  const getRecentTransactions = () => {
    return msmeTransactions.slice(0, 5).map(txn => ({
      id: txn.id,
      description: txn.description,
      amount: formatCurrency(txn.amount),
      type: txn.type,
      date: new Date(txn.date).toLocaleDateString('en-MY'),
      category: txn.category,
      status: txn.status
    }))
  }

  const tableColumns = [
    { key: 'description', label: 'Transaction', sortable: true },
    { key: 'amount', label: 'Amount', sortable: true },
    { key: 'category', label: 'Category', sortable: true },
    { key: 'date', label: 'Date', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="mb-4 sm:mb-0">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-green-100 rounded-xl">
                  <Store className="h-8 w-8 text-green-600" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                    {msmeBusinessProfile.name}
                    <span className="text-sm font-normal text-gray-500">
                      by {msmeBusinessProfile.owner}
                    </span>
                  </h1>
                  <div className="flex items-center gap-4 mt-1">
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <MapPin className="h-4 w-4" />
                      {msmeBusinessProfile.location}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      {msmeBusinessProfile.operatingHours}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-green-600">
                      <Star className="h-4 w-4 fill-current" />
                      4.8 Rating
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 max-w-2xl">
                {msmeBusinessProfile.description}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                {timeframeOptions.map((option) => (
                  <Button
                    key={option.value}
                    variant={selectedTimeframe === option.value ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedTimeframe(option.value)}
                    className="transition-all duration-200 hover:scale-105"
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
              <Button 
                variant="outline" 
                className="flex items-center gap-2 hover:bg-blue-50 transition-colors"
                onClick={() => setShowBalance(!showBalance)}
              >
                {showBalance ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                {showBalance ? 'Hide' : 'Show'} Balance
              </Button>
              <Button 
                variant="outline" 
                className="flex items-center gap-2 hover:bg-blue-50 transition-colors"
                onClick={handleRefresh}
                disabled={isRefreshing}
              >
                <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                {isRefreshing ? 'Refreshing...' : 'Refresh'}
              </Button>
              <Button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 transition-all duration-200 hover:scale-105">
                <Download className="h-4 w-4" />
                Export Report
              </Button>
            </div>
          </div>
        </div>

        {/* Business Overview Cards */}
        <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">Total Balance</p>
                <div className="text-2xl font-bold text-green-900">
                  {showBalance ? (
                    <div className="flex items-center">
                      <span className="mr-1">RM</span>
                      <CountUp to={getTotalBalance()} duration={2} separator="," />
                    </div>
                  ) : (
                    'RM ••••••'
                  )}
                </div>
                <p className="text-xs text-green-600 mt-1">Across 3 bank accounts</p>
              </div>
              <div className="p-3 bg-green-200 rounded-full">
                <Building2 className="h-6 w-6 text-green-700" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">Monthly Cash Inflow</p>
                <div className="text-2xl font-bold text-blue-900">
                  {showBalance ? (
                    <div className="flex items-center">
                      <span className="mr-1">RM</span>
                      <CountUp
                        to={msmeConsolidatedFinancialData.totalIncome}
                        duration={2}
                        separator=","
                      />
                    </div>
                  ) : (
                    'RM ••••••'
                  )}
                </div>
                <p className="text-xs text-blue-600 mt-1 flex items-center gap-1">
                  <ArrowUpRight className="h-3 w-3" />
                  +15.2% from last month
                </p>
              </div>
              <div className="p-3 bg-blue-200 rounded-full">
                <DollarSign className="h-6 w-6 text-blue-700" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-700">Digital Payments</p>
                <div className="text-2xl font-bold text-purple-900">
                  <CountUp to={76} duration={2} />%
                </div>
                <p className="text-xs text-purple-600 mt-1">of total transactions</p>
              </div>
              <div className="p-3 bg-purple-200 rounded-full">
                <QrCode className="h-6 w-6 text-purple-700" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-700">Daily Transactions</p>
                <div className="text-2xl font-bold text-orange-900">
                  <CountUp to={47} duration={2} />
                </div>
                <p className="text-xs text-orange-600 mt-1">Average per day</p>
              </div>
              <div className="p-3 bg-orange-200 rounded-full">
                <Users className="h-6 w-6 text-orange-700" />
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Access Section */}
        <div className="mb-8">
          <Card className="p-6 bg-gradient-to-r from-blue-600 to-green-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2">Financial Management Hub</h3>
                <p className="text-blue-100 mb-4">
                  Monitor your business finances, track cashflow, and manage bank connections
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <BarChart3 className="h-4 w-4" />
                    Real-time Analytics
                  </div>
                  <div className="flex items-center gap-1">
                    <Building2 className="h-4 w-4" />
                    Multi-bank Integration
                  </div>
                  <div className="flex items-center gap-1">
                    <QrCode className="h-4 w-4" />
                    QR Payment Support
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href="/dashboard/financial"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-all duration-200 hover:scale-105"
                >
                  <BarChart3 className="h-4 w-4" />
                  Financial Dashboard
                  <ChevronRight className="h-4 w-4" />
                </a>
                <a
                  href="/dashboard/open-finance"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white border border-white/20 font-medium rounded-lg hover:bg-white/20 transition-all duration-200 hover:scale-105"
                >
                  <CreditCard className="h-4 w-4" />
                  Bank Accounts
                  <ChevronRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </Card>
        </div>

        {/* KPI Cards */}
        <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {msmeKPIData.map((kpi, index) => (
            <div
              key={kpi.id}
              className={`transform transition-all duration-300 ${
                isAnimating ? 'translate-y-4 opacity-0' : 'translate-y-0 opacity-100'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredCard(kpi.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <KPICard 
                kpi={kpi} 
                className={`hover:shadow-xl transition-all duration-300 ${
                  hoveredCard === kpi.id ? 'scale-105 shadow-lg' : ''
                }`}
              />
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card className="p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Daily Cash Flow Pattern</h3>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Cash Flow (RM)</span>
              </div>
            </div>
            <BarChart 
              data={msmeDailySalesPattern} 
              dataKey="value" 
              title="" 
              color="#3b82f6"
              height={300}
            />
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700">
                <strong>Peak Activity:</strong> Lunch time (12-1 PM) shows highest cash inflow. 
                Consider promoting digital payments to reduce cash handling.
              </p>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Payment Method Distribution</h3>
              <span className="text-sm text-gray-600">By Payment Type</span>
            </div>
            <PieChart 
              data={msmeRevenueBreakdown} 
              title="" 
              dataKey="amount"
            />
            <div className="mt-4 p-3 bg-green-50 rounded-lg">
              <p className="text-sm text-green-700">
                <strong>Most Popular:</strong> DuitNow QR accounts for 45% of transactions. 
                Digital adoption is growing steadily.
              </p>
            </div>
          </Card>
        </div>

        {/* Additional Charts */}
        <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Card className="p-6 hover:shadow-lg transition-all duration-300">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Cash Flow Growth</h3>
            <LineChart 
              data={msmeMonthlyRevenueGrowth} 
              dataKey="value" 
              title="" 
              color="#22c55e"
              height={200}
            />
            <div className="mt-3 text-center">
              <div className="text-2xl font-bold text-green-600">+15.2%</div>
              <div className="text-sm text-gray-600">Net cash flow growth</div>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-all duration-300">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Transaction Time Patterns</h3>
            <div className="space-y-3">
              {msmeCustomerDemographics.slice(0, 4).map((demo, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: demo.color }}
                    />
                    <span className="text-sm font-medium text-gray-900">{demo.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">
                      {demo.percentage}%
                    </div>
                    <div className="text-xs text-gray-600">
                      {formatCurrency(demo.amount)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-all duration-300">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Health</h3>
            <div className="space-y-4">
              {msmeFinancialHealthIndicators.slice(0, 3).map((indicator, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      indicator.status === 'healthy' ? 'bg-green-500' : 
                      indicator.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                    }`} />
                    <div>
                      <div className="text-sm font-medium text-gray-900">{indicator.name}</div>
                      <div className="text-xs text-gray-600">{indicator.recommendation}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-gray-900">
                      {typeof indicator.value === 'number' ? 
                        (indicator.value > 10 ? formatNumber(indicator.value) : indicator.value.toFixed(1)) : 
                        indicator.value}
                    </div>
                    <div className={`text-xs ${
                      indicator.trend === 'improving' ? 'text-green-600' : 
                      indicator.trend === 'stable' ? 'text-gray-600' : 'text-red-600'
                    }`}>
                      {indicator.trend}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Recent Transactions */}
        <div className="mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Date Range
                </Button>
              </div>
            </div>
            <DataTable 
              data={getRecentTransactions()} 
              columns={tableColumns} 
              title="" 
              className="hover:shadow-sm transition-shadow"
            />
          </Card>
        </div>

        {/* Bank Accounts Summary */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Connected Bank Accounts</h3>
            <Button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
              <Plus className="h-4 w-4" />
              Connect Bank
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {msmeBankAccounts.map((account) => (
              <Card key={account.id} className="p-6 hover:shadow-lg transition-all duration-300 hover:scale-105">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Building2 className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{account.bankName}</h4>
                      <p className="text-sm text-gray-600">•••• {account.accountNumber.slice(-4)}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">
                      {showBalance ? formatCurrency(account.balance) : 'RM ••••••'}
                    </div>
                    <div className="text-sm text-gray-600 capitalize">{account.accountType}</div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    account.status === 'active' ? 'text-green-600 bg-green-100' : 'text-gray-600 bg-gray-100'
                  }`}>
                    {account.status}
                  </div>
                  <div className="text-xs text-gray-500">
                    Last sync: {new Date(account.lastSyncTime).toLocaleString('en-MY')}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Business Insights */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card className="p-6 hover:shadow-lg transition-all duration-300">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Highlights</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                <div className="p-2 bg-green-200 rounded-full">
                  <TrendingUp className="h-4 w-4 text-green-700" />
                </div>
                <div>
                  <p className="text-sm font-medium text-green-900">Strong morning cash inflow</p>
                  <p className="text-xs text-green-700">15% higher than yesterday</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <div className="p-2 bg-blue-200 rounded-full">
                  <QrCode className="h-4 w-4 text-blue-700" />
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-900">Digital payment surge</p>
                  <p className="text-xs text-blue-700">80% customers used QR payments</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                <div className="p-2 bg-purple-200 rounded-full">
                  <Award className="h-4 w-4 text-purple-700" />
                </div>
                <div>
                  <p className="text-sm font-medium text-purple-900">Payment efficiency</p>
                  <p className="text-xs text-purple-700">Zero failed transactions today</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-all duration-300">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommendations</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
                <div className="p-2 bg-orange-200 rounded-full">
                  <Target className="h-4 w-4 text-orange-700" />
                </div>
                <div>
                  <p className="text-sm font-medium text-orange-900">Optimize pricing</p>
                  <p className="text-xs text-orange-700">Consider 5% price increase for premium items</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                <div className="p-2 bg-yellow-200 rounded-full">
                  <Clock className="h-4 w-4 text-yellow-700" />
                </div>
                <div>
                  <p className="text-sm font-medium text-yellow-900">Extend hours</p>
                  <p className="text-xs text-yellow-700">High demand during afternoon tea time</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                <div className="p-2 bg-green-200 rounded-full">
                  <Utensils className="h-4 w-4 text-green-700" />
                </div>
                <div>
                  <p className="text-sm font-medium text-green-900">Menu expansion</p>
                  <p className="text-xs text-green-700">Add mee goreng to capture more customers</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
