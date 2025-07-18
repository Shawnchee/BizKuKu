'use client'

import React, { useState, useEffect } from 'react'
import { Calendar, Download, Filter, TrendingUp, AlertTriangle, Target, DollarSign, PieChart, BarChart3, ArrowUpRight, ArrowDownRight, Eye, EyeOff, RefreshCw, Settings, Bell, Users, ShoppingCart, Zap, Store, CreditCard, QrCode, Plus, Minus, ChevronRight, ChevronDown, ChevronUp, Building2, Clock, MapPin, Star, Award, Utensils, Coffee, Package, Truck, Fuel, Calculator, FileText, TrendingDown, AlertCircle, CheckCircle, Edit, Share, ExternalLink, Search, MoreHorizontal, Activity, Home, Briefcase, UserCheck, Smartphone, Wifi, ShieldCheck, Database, Maximize2 } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import FinancialKPICard from '@/components/ui/FinancialKPICard'
import FinancialInsights from '@/components/ui/FinancialInsights'
import CashFlowChart from '@/components/charts/CashFlowChart'
import ProfitMarginChart from '@/components/charts/ProfitMarginChart'
import RevenueBreakdownChart from '@/components/charts/RevenueBreakdownChart'
import LineChart from '@/components/charts/LineChart'
import BarChart from '@/components/charts/BarChart'
import { 
  msmeBusinessProfile,
  msmeFinancialKPIs,
  msmeCashFlowData,
  msmeProfitMarginData,
  msmeRevenueBreakdown,
  msmeExpenseCategories,
  msmeBusinessGrowthMetrics,
  msmeFinancialHealthIndicators,
  msmeMonthlyRevenueGrowth,
  msmeDailySalesPattern,
  msmeWeeklySalesTrends,
  msmeMenuPerformance,
  msmePeakHours,
  msmeCustomerDemographics,
  msmeBankAccounts,
  msmeTransactions,
  msmeTransactionCategories,
  msmeConsolidatedFinancialData
} from '@/lib/msme-data'
import { formatCurrency, formatNumber } from '@/lib/utils'

export default function MSMEFinancialAnalyticsPage() {
  const [dateRange, setDateRange] = useState('Last 30 days')
  const [selectedTab, setSelectedTab] = useState('overview')
  const [selectedPeriod, setSelectedPeriod] = useState('monthly')
  const [showBalance, setShowBalance] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [hoveredMetric, setHoveredMetric] = useState<string | null>(null)
  const [expandedCard, setExpandedCard] = useState<string | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)

  // Animate on mount
  useEffect(() => {
    setIsAnimating(true)
    const timer = setTimeout(() => setIsAnimating(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  const tabs = [
    { id: 'overview', label: 'Financial Overview', icon: TrendingUp },
    { id: 'cashflow', label: 'Cash Flow', icon: BarChart3 },
    { id: 'expenses', label: 'Expense Analysis', icon: PieChart },
    { id: 'performance', label: 'Performance', icon: Target },
  ]

  const periodOptions = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
  ]

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsRefreshing(false)
  }

  const getTotalIncome = () => {
    return msmeTransactionCategories
      .filter(cat => cat.type === 'income')
      .reduce((sum, cat) => sum + cat.totalAmount, 0)
  }

  const getTotalExpenses = () => {
    return Math.abs(msmeTransactionCategories
      .filter(cat => cat.type === 'expense')
      .reduce((sum, cat) => sum + cat.totalAmount, 0))
  }

  const getNetProfit = () => {
    return getTotalIncome() - getTotalExpenses()
  }

  const getProfitMargin = () => {
    const income = getTotalIncome()
    return income > 0 ? ((getNetProfit() / income) * 100).toFixed(1) : '0.0'
  }

  const renderOverviewTab = () => (
    <div className="space-y-8">
      {/* Business Summary Header */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-white/20 rounded-xl">
                <Store className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold">{msmeBusinessProfile.name}</h2>
                <p className="text-blue-100">{msmeBusinessProfile.category}</p>
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm text-blue-100">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {msmeBusinessProfile.location}
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                {msmeBusinessProfile.employees} employees
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {msmeBusinessProfile.operatingHours}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold mb-1">
              {showBalance ? formatCurrency(getNetProfit()) : 'RM ••••••'}
            </div>
            <div className="text-blue-100">Monthly Net Profit</div>
            <div className="text-sm text-blue-200 mt-1">
              {getProfitMargin()}% profit margin
            </div>
          </div>
        </div>
      </div>

      {/* Financial KPIs */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {msmeFinancialKPIs.map((kpi, index) => (
          <div
            key={kpi.id}
            className={`transform transition-all duration-300 ${
              isAnimating ? 'translate-y-4 opacity-0' : 'translate-y-0 opacity-100'
            }`}
            style={{ animationDelay: `${index * 100}ms` }}
            onMouseEnter={() => setHoveredMetric(kpi.id)}
            onMouseLeave={() => setHoveredMetric(null)}
          >
            <FinancialKPICard 
              key={kpi.id} 
              kpi={kpi} 
              className={`hover:shadow-xl transition-all duration-300 ${
                hoveredMetric === kpi.id ? 'scale-105 shadow-lg' : ''
              }`}
            />
          </div>
        ))}
      </div>

      {/* Main Financial Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="p-6 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Cash Flow Analysis</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setExpandedCard(expandedCard === 'cashflow' ? null : 'cashflow')}
            >
              <Maximize2 className="h-4 w-4" />
            </Button>
          </div>
          <CashFlowChart 
            data={msmeCashFlowData}
            title=""
            height={expandedCard === 'cashflow' ? 450 : 300}
          />
          <div className="mt-4 grid grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="text-lg font-bold text-green-600">
                {formatCurrency(msmeCashFlowData[msmeCashFlowData.length - 1]?.income || 0)}
              </div>
              <div className="text-xs text-green-700">Weekly Income</div>
            </div>
            <div className="p-3 bg-red-50 rounded-lg">
              <div className="text-lg font-bold text-red-600">
                {formatCurrency(msmeCashFlowData[msmeCashFlowData.length - 1]?.expenses || 0)}
              </div>
              <div className="text-xs text-red-700">Weekly Expenses</div>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="text-lg font-bold text-blue-600">
                {formatCurrency(msmeCashFlowData[msmeCashFlowData.length - 1]?.netCashFlow || 0)}
              </div>
              <div className="text-xs text-blue-700">Net Cash Flow</div>
            </div>
          </div>
        </Card>
        
        <Card className="p-6 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Profit Margin Trends</h3>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Weekly Margin</span>
            </div>
          </div>
          <ProfitMarginChart 
            data={msmeProfitMarginData}
            title=""
            height={expandedCard === 'profit' ? 450 : 300}
          />
          <div className="mt-4 p-4 bg-green-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-green-900">Margin Analysis</span>
            </div>
            <p className="text-sm text-green-700">
              Profit margin has improved by 2.1% this month. Strong cost control on ingredients 
              and optimized pricing strategy driving profitability.
            </p>
          </div>
        </Card>
      </div>

      {/* Transaction Categories */}
      <Card className="p-6 hover:shadow-lg transition-all duration-300">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Income & Expense Categories</h3>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Income Categories */}
          <div>
            <h4 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              Income Sources
            </h4>
            <div className="space-y-3">
              {msmeTransactionCategories
                .filter(cat => cat.type === 'income')
                .map((category, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-200 rounded-lg">
                      <Utensils className="h-4 w-4 text-green-700" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{category.name}</div>
                      <div className="text-xs text-gray-600">
                        {category.transactionCount} transactions
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-green-600">
                      {formatCurrency(category.totalAmount)}
                    </div>
                    <div className="text-xs text-green-700">
                      {category.percentage.toFixed(1)}% of total
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Expense Categories */}
          <div>
            <h4 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              Expense Categories
            </h4>
            <div className="space-y-3">
              {msmeTransactionCategories
                .filter(cat => cat.type === 'expense')
                .map((category, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-200 rounded-lg">
                      <ShoppingCart className="h-4 w-4 text-red-700" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{category.name}</div>
                      <div className="text-xs text-gray-600">
                        {category.transactionCount} transactions
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-red-600">
                      {formatCurrency(Math.abs(category.totalAmount))}
                    </div>
                    <div className="text-xs text-red-700">
                      {category.percentage.toFixed(1)}% of total
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Financial Health Insights */}
      <Card className="p-6 hover:shadow-lg transition-all duration-300">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Financial Health Indicators</h3>
        <FinancialInsights indicators={msmeFinancialHealthIndicators} />
      </Card>
    </div>
  )

  const renderCashflowTab = () => (
    <div className="space-y-8">
      {/* Cash Flow Summary */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-700">Current Balance</p>
              <p className="text-2xl font-bold text-blue-900">
                {showBalance ? formatCurrency(msmeConsolidatedFinancialData.totalBalance) : 'RM ••••••'}
              </p>
              <p className="text-xs text-blue-600 mt-1">Across all accounts</p>
            </div>
            <div className="p-3 bg-blue-200 rounded-full">
              <Building2 className="h-6 w-6 text-blue-700" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-700">Monthly Inflow</p>
              <p className="text-2xl font-bold text-green-900">
                {showBalance ? formatCurrency(getTotalIncome()) : 'RM ••••••'}
              </p>
              <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                <ArrowUpRight className="h-3 w-3" />
                +15.2% from last month
              </p>
            </div>
            <div className="p-3 bg-green-200 rounded-full">
              <TrendingUp className="h-6 w-6 text-green-700" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-700">Monthly Outflow</p>
              <p className="text-2xl font-bold text-red-900">
                {showBalance ? formatCurrency(getTotalExpenses()) : 'RM ••••••'}
              </p>
              <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                <ArrowDownRight className="h-3 w-3" />
                -5.2% from last month
              </p>
            </div>
            <div className="p-3 bg-red-200 rounded-full">
              <TrendingDown className="h-6 w-6 text-red-700" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-700">Net Cash Flow</p>
              <p className="text-2xl font-bold text-purple-900">
                {showBalance ? formatCurrency(getNetProfit()) : 'RM ••••••'}
              </p>
              <p className="text-xs text-purple-600 mt-1">This month</p>
            </div>
            <div className="p-3 bg-purple-200 rounded-full">
              <BarChart3 className="h-6 w-6 text-purple-700" />
            </div>
          </div>
        </Card>
      </div>

      {/* Detailed Cash Flow Chart */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Weekly Cash Flow Breakdown</h3>
          <div className="flex items-center gap-2">
            {periodOptions.map((option) => (
              <Button
                key={option.value}
                variant={selectedPeriod === option.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedPeriod(option.value)}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>
        <CashFlowChart 
          data={msmeCashFlowData}
          title=""
          height={400}
        />
      </Card>

      {/* Bank Account Breakdown */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Bank Account Balances</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {msmeBankAccounts.map((account, index) => (
            <div key={account.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Building2 className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{account.bankName}</h4>
                    <p className="text-sm text-gray-600">•••• {account.accountNumber.slice(-4)}</p>
                  </div>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  account.status === 'active' ? 'text-green-600 bg-green-100' : 'text-gray-600 bg-gray-100'
                }`}>
                  {account.status}
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-gray-900">
                  {showBalance ? formatCurrency(account.balance) : 'RM ••••••'}
                </div>
                <div className="text-sm text-gray-600 capitalize">{account.accountType}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )

  const renderExpensesTab = () => (
    <div className="space-y-8">
      {/* Expense Overview */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Expense Breakdown</h3>
          <RevenueBreakdownChart
            data={msmeExpenseCategories.map((cat, index) => ({
              name: cat.name,
              amount: cat.amount,
              percentage: cat.percentage,
              change: [5.2, -2.1, -8.3, 3.4, 0.0, 12.5, -4.7][index] || 0,
              color: cat.color,
              description: `${cat.percentage.toFixed(1)}% of total expenses`
            }))}
            title=""
            height={300}
          />
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Expense Trends</h3>
          <LineChart
            data={[
              { name: 'Week 1', value: 2280 },
              { name: 'Week 2', value: 2450 },
              { name: 'Week 3', value: 2680 },
              { name: 'Week 4', value: 2590 },
            ]}
            dataKey="value"
            title=""
            color="#ef4444"
            height={300}
          />
        </Card>
      </div>

      {/* Detailed Expense Analysis */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Expense Category Analysis</h3>
        <div className="space-y-4">
          {msmeExpenseCategories.map((category, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-4">
                <div 
                  className="w-4 h-4 rounded-full" 
                  style={{ backgroundColor: category.color }}
                />
                <div>
                  <div className="text-sm font-medium text-gray-900">{category.name}</div>
                  <div className="text-xs text-gray-600">
                    {category.percentage.toFixed(1)}% of total budget
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-gray-900">
                  {formatCurrency(category.amount)}
                </div>
                <div className="text-xs text-gray-600">
                  Budget: {formatCurrency(category.budget)}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-20 bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full" 
                    style={{ 
                      width: `${(category.amount / category.budget) * 100}%`,
                      backgroundColor: category.color 
                    }}
                  />
                </div>
                <span className="text-xs text-gray-600 w-10">
                  {((category.amount / category.budget) * 100).toFixed(0)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )

  const renderPerformanceTab = () => (
    <div className="space-y-8">
      {/* Performance Metrics */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Sales Performance</h3>
          <BarChart 
            data={msmeDailySalesPattern} 
            dataKey="value" 
            title="" 
            color="#3b82f6"
            height={300}
          />
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Peak Hours Analysis</h3>
          <BarChart 
            data={msmePeakHours} 
            dataKey="value" 
            title="" 
            color="#10b981"
            height={300}
          />
        </Card>
      </div>

      {/* Menu Performance */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Menu Item Performance</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <BarChart 
              data={msmeMenuPerformance} 
              dataKey="value" 
              title="" 
              color="#f59e0b"
              height={250}
            />
          </div>
          <div className="space-y-4">
            {msmeMenuPerformance.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Utensils className="h-4 w-4 text-orange-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-900">{item.name}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-gray-900">
                    {formatNumber(item.value)} orders
                  </div>
                  <div className="text-xs text-gray-600">
                    {((item.value / msmeMenuPerformance.reduce((sum, i) => sum + i.value, 0)) * 100).toFixed(1)}% share
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Business Growth Metrics */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Business Growth Metrics</h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {msmeBusinessGrowthMetrics.map((metric, index) => (
            <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-900">{metric.name}</h4>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="text-sm text-gray-600">{metric.satisfactionScore.toFixed(1)}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Completion Rate</span>
                  <span className="font-medium">{metric.completionRate.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-500" 
                    style={{ width: `${metric.completionRate}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-600">
                  <span>Drop-off: {metric.dropOffRate.toFixed(1)}%</span>
                  <span>Score: {metric.satisfactionScore.toFixed(1)}/5</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="mb-4 sm:mb-0">
              <h1 className="text-3xl font-bold text-gray-900">Financial Analytics</h1>
              <p className="mt-2 text-gray-600">
                Comprehensive financial management for your Malaysian MSME business
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                className="flex items-center gap-2 hover:bg-blue-50 transition-colors"
                onClick={() => setShowBalance(!showBalance)}
              >
                {showBalance ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                {showBalance ? 'Hide' : 'Show'} Amounts
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
              <Button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
                <Download className="h-4 w-4" />
                Export Report
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200 bg-white rounded-t-lg">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    selectedTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-b-lg min-h-[600px] p-6">
          {selectedTab === 'overview' && renderOverviewTab()}
          {selectedTab === 'cashflow' && renderCashflowTab()}
          {selectedTab === 'expenses' && renderExpensesTab()}
          {selectedTab === 'performance' && renderPerformanceTab()}
        </div>
      </div>
    </div>
  )
} 