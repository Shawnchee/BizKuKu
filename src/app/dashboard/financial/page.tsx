'use client'

import React, { useState } from 'react'
import { Calendar, Download, Filter, TrendingUp, AlertTriangle, Target } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import FinancialKPICard from '@/components/ui/FinancialKPICard'
import FinancialInsights from '@/components/ui/FinancialInsights'
import CashFlowChart from '@/components/charts/CashFlowChart'
import ProfitMarginChart from '@/components/charts/ProfitMarginChart'
import RevenueBreakdownChart from '@/components/charts/RevenueBreakdownChart'
import BusinessOnboardingChart from '@/components/charts/BusinessOnboardingChart'
import LineChart from '@/components/charts/LineChart'
import BarChart from '@/components/charts/BarChart'
import { 
  financialKPIs,
  cashFlowData,
  profitMarginData,
  revenueBreakdown,
  expenseCategories,
  businessMetrics,
  financialHealthIndicators,
  monthlyRevenueGrowth,
  businessOnboardingTrend,
  customerAcquisitionCost
} from '@/lib/data'
import { formatCurrency, formatNumber } from '@/lib/utils'

export default function FinancialAnalyticsPage() {
  const [dateRange] = useState('Last 30 days')
  const [selectedTab, setSelectedTab] = useState('overview')

  const tabs = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'revenue', label: 'Revenue Analysis', icon: Target },
    { id: 'onboarding', label: 'Business Onboarding', icon: AlertTriangle },
  ]

  const renderOverviewTab = () => (
    <div className="space-y-8">
      {/* Financial KPIs */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {financialKPIs.map((kpi) => (
          <FinancialKPICard key={kpi.id} kpi={kpi} />
        ))}
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <CashFlowChart 
            data={cashFlowData}
            title="Cash Flow Analysis"
            height={350}
          />
        </Card>
        
        <Card className="p-6">
          <ProfitMarginChart 
            data={profitMarginData}
            title="Profit Margin Trends"
            height={350}
          />
        </Card>
      </div>

      {/* Financial Health Insights */}
      <FinancialInsights indicators={financialHealthIndicators} />

      {/* Quick Stats */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <Card className="p-6 text-center">
          <div className="text-2xl font-bold text-gray-900 mb-2">
            {formatCurrency(344000)}
          </div>
          <div className="text-sm text-gray-600">Cumulative Cash Flow</div>
          <div className="text-xs text-green-600 mt-1">+19.2% YoY</div>
        </Card>
        
        <Card className="p-6 text-center">
          <div className="text-2xl font-bold text-gray-900 mb-2">
            38.3%
          </div>
          <div className="text-sm text-gray-600">Average Profit Margin</div>
          <div className="text-xs text-green-600 mt-1">+2.1% vs target</div>
        </Card>
        
        <Card className="p-6 text-center">
          <div className="text-2xl font-bold text-gray-900 mb-2">
            {formatNumber(9247)}
          </div>
          <div className="text-sm text-gray-600">Total Businesses</div>
          <div className="text-xs text-green-600 mt-1">+31.2% this month</div>
        </Card>
        
        <Card className="p-6 text-center">
          <div className="text-2xl font-bold text-gray-900 mb-2">
            2.8
          </div>
          <div className="text-sm text-gray-600">Liquidity Ratio</div>
          <div className="text-xs text-green-600 mt-1">Healthy</div>
        </Card>
      </div>
    </div>
  )

  const renderRevenueTab = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <LineChart
            data={monthlyRevenueGrowth}
            dataKey="value"
            title="Monthly Revenue Growth"
            color="#3b82f6"
          />
        </Card>
        
        <Card className="p-6">
          <BarChart
            data={customerAcquisitionCost}
            dataKey="value"
            title="Customer Acquisition Cost"
            color="#f59e0b"
          />
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <RevenueBreakdownChart
            data={revenueBreakdown}
            title="Revenue Sources"
            height={450}
          />
        </Card>
        
        <Card className="p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Expense Categories</h3>
          </div>
          <div className="space-y-3">
            {expenseCategories.map((category, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: category.color }}
                  />
                  <span className="text-sm font-medium text-gray-900">{category.name}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">
                    {formatCurrency(category.amount)}
                  </div>
                  <div className="text-xs text-gray-600">
                    {category.percentage.toFixed(1)}% of budget
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )

  const renderOnboardingTab = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <LineChart
            data={businessOnboardingTrend}
            dataKey="value"
            title="Business Onboarding Trend"
            color="#10b981"
          />
        </Card>
        
        <Card className="p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Onboarding Performance</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">82.4%</div>
              <div className="text-sm text-gray-600">Overall Completion</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">17.6%</div>
              <div className="text-sm text-gray-600">Average Drop-off</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">9.2 min</div>
              <div className="text-sm text-gray-600">Avg Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">4.1/5</div>
              <div className="text-sm text-gray-600">Satisfaction</div>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <BusinessOnboardingChart
          data={businessMetrics}
          title="Onboarding Step Analysis"
          height={450}
        />
      </Card>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Financial Analytics</h1>
              <p className="mt-2 text-gray-600">
                Monitor your business financial health and performance metrics
              </p>
            </div>
            <div className="mt-4 flex space-x-3 sm:mt-0">
              <Button variant="outline" className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>{dateRange}</span>
              </Button>
              <Button variant="outline" className="flex items-center space-x-2">
                <Filter className="h-4 w-4" />
                <span>Filter</span>
              </Button>
              <Button className="flex items-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Export</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm ${
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
        {selectedTab === 'overview' && renderOverviewTab()}
        {selectedTab === 'revenue' && renderRevenueTab()}
        {selectedTab === 'onboarding' && renderOnboardingTab()}
      </div>
    </div>
  )
} 