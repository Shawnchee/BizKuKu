import React, { useState } from 'react'
import { 
  TrendingUp, 
  TrendingDown, 
  ArrowUpDown, 
  Eye, 
  EyeOff, 
  RefreshCw, 
  Filter,
  Building2,
  CreditCard,
  PieChart,
  BarChart3,
  Calendar,
  Download
} from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ConsolidatedFinancialData, BankAccount, TransactionCategory } from '@/lib/types'
import { formatCurrency, formatPercentage, formatRelativeDate } from '@/lib/utils'

interface ConsolidatedFinancialOverviewProps {
  consolidatedData: ConsolidatedFinancialData
  bankAccounts: BankAccount[]
  transactionCategories: TransactionCategory[]
  onRefreshData?: () => void
  onViewDetails?: (category: string) => void
  onFilterChange?: (filters: any) => void
  onExportData?: () => void
  isLoading?: boolean
}

export default function ConsolidatedFinancialOverview({
  consolidatedData,
  bankAccounts,
  transactionCategories,
  onRefreshData,
  onViewDetails,
  onFilterChange,
  onExportData,
  isLoading = false
}: ConsolidatedFinancialOverviewProps) {
  const [isBalanceVisible, setIsBalanceVisible] = useState(true)
  const [selectedPeriod, setSelectedPeriod] = useState('30d')

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return TrendingUp
      case 'down':
        return TrendingDown
      default:
        return ArrowUpDown
    }
  }

  const getTrendColor = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return 'text-green-600'
      case 'down':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  const getHealthStatusColor = (ratio: number, thresholds: { good: number; warning: number }) => {
    if (ratio >= thresholds.good) return 'text-green-600 bg-green-50'
    if (ratio >= thresholds.warning) return 'text-yellow-600 bg-yellow-50'
    return 'text-red-600 bg-red-50'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Financial Overview</h1>
          <p className="text-gray-600">
            Consolidated view across {consolidatedData.accountsCount} accounts
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 3 months</option>
            <option value="1y">Last year</option>
          </select>
          
          <Button
            variant="outline"
            size="sm"
            onClick={onRefreshData}
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            {isLoading ? 'Syncing...' : 'Refresh'}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={onExportData}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Balance */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium text-gray-600">Total Balance</span>
            </div>
            <button
              onClick={() => setIsBalanceVisible(!isBalanceVisible)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              {isBalanceVisible ? (
                <EyeOff className="h-4 w-4 text-gray-400" />
              ) : (
                <Eye className="h-4 w-4 text-gray-400" />
              )}
            </button>
          </div>
          <div className="mb-2">
            {isBalanceVisible ? (
              <span className="text-2xl font-bold text-gray-900">
                {formatCurrency(consolidatedData.totalBalance, consolidatedData.currency)}
              </span>
            ) : (
              <span className="text-2xl font-bold text-gray-400">••••••</span>
            )}
          </div>
          <div className="flex items-center gap-2 text-sm">
            <TrendingUp className="h-4 w-4 text-green-600" />
            <span className="text-green-600">
              +{formatPercentage(consolidatedData.performanceMetrics.monthlyGrowth)}
            </span>
            <span className="text-gray-500">this month</span>
          </div>
        </Card>

        {/* Monthly Income */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            <span className="text-sm font-medium text-gray-600">Monthly Income</span>
          </div>
          <div className="mb-2">
            <span className="text-2xl font-bold text-green-600">
              {formatCurrency(consolidatedData.totalIncome, consolidatedData.currency)}
            </span>
          </div>
          <div className="text-sm text-gray-500">
            {consolidatedData.transactionsCount} transactions
          </div>
        </Card>

        {/* Monthly Expenses */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown className="h-5 w-5 text-red-600" />
            <span className="text-sm font-medium text-gray-600">Monthly Expenses</span>
          </div>
          <div className="mb-2">
            <span className="text-2xl font-bold text-red-600">
              {formatCurrency(consolidatedData.totalExpenses, consolidatedData.currency)}
            </span>
          </div>
          <div className="text-sm text-gray-500">
            Expense ratio: {formatPercentage(consolidatedData.performanceMetrics.expenseRatio * 100)}
          </div>
        </Card>

        {/* Net Cash Flow */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-2">
            <ArrowUpDown className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-medium text-gray-600">Net Cash Flow</span>
          </div>
          <div className="mb-2">
            <span className={`text-2xl font-bold ${
              consolidatedData.netCashFlow >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {formatCurrency(consolidatedData.netCashFlow, consolidatedData.currency)}
            </span>
          </div>
          <div className="text-sm text-gray-500">
            Savings rate: {formatPercentage(consolidatedData.performanceMetrics.savingsRate * 100)}
          </div>
        </Card>
      </div>

      {/* Financial Health Indicators */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Health</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 mb-2">
              {consolidatedData.performanceMetrics.liquidityRatio.toFixed(1)}
            </div>
            <div className="text-sm text-gray-600 mb-1">Liquidity Ratio</div>
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${
              getHealthStatusColor(consolidatedData.performanceMetrics.liquidityRatio, { good: 2, warning: 1 })
            }`}>
              {consolidatedData.performanceMetrics.liquidityRatio >= 2 ? 'Healthy' :
               consolidatedData.performanceMetrics.liquidityRatio >= 1 ? 'Moderate' : 'Needs Attention'}
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 mb-2">
              {formatPercentage(consolidatedData.performanceMetrics.savingsRate * 100)}
            </div>
            <div className="text-sm text-gray-600 mb-1">Savings Rate</div>
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${
              getHealthStatusColor(consolidatedData.performanceMetrics.savingsRate, { good: 0.2, warning: 0.1 })
            }`}>
              {consolidatedData.performanceMetrics.savingsRate >= 0.2 ? 'Excellent' :
               consolidatedData.performanceMetrics.savingsRate >= 0.1 ? 'Good' : 'Improve'}
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600 mb-2">
              {formatPercentage(consolidatedData.performanceMetrics.monthlyGrowth)}
            </div>
            <div className="text-sm text-gray-600 mb-1">Monthly Growth</div>
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${
              getHealthStatusColor(consolidatedData.performanceMetrics.monthlyGrowth, { good: 5, warning: 0 })
            }`}>
              {consolidatedData.performanceMetrics.monthlyGrowth >= 5 ? 'Strong' :
               consolidatedData.performanceMetrics.monthlyGrowth >= 0 ? 'Stable' : 'Declining'}
            </div>
          </div>
        </div>
      </Card>

      {/* Account Summary */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Connected Accounts</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetails?.('accounts')}
            className="flex items-center gap-2"
          >
            <Eye className="h-4 w-4" />
            View All
          </Button>
        </div>
        
        <div className="space-y-3">
          {bankAccounts.slice(0, 3).map((account) => (
            <div key={account.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Building2 className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">{account.bankName}</div>
                  <div className="text-sm text-gray-600">
                    {account.accountType} • ****{account.accountNumber.slice(-4)}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className={`font-semibold ${
                  account.balance >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {isBalanceVisible ? formatCurrency(account.balance, account.currency) : '••••••'}
                </div>
                <div className="text-sm text-gray-500">
                  {formatRelativeDate(account.lastSyncTime)}
                </div>
              </div>
            </div>
          ))}
          
          {bankAccounts.length > 3 && (
            <div className="text-center py-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onViewDetails?.('accounts')}
              >
                View {bankAccounts.length - 3} more accounts
              </Button>
            </div>
          )}
        </div>
      </Card>

      {/* Transaction Categories */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Transaction Categories</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetails?.('categories')}
            className="flex items-center gap-2"
          >
            <PieChart className="h-4 w-4" />
            View Details
          </Button>
        </div>
        
        <div className="space-y-3">
          {transactionCategories.slice(0, 5).map((category) => {
            const TrendIcon = getTrendIcon(category.trend)
            
            return (
              <div key={category.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: category.color }}></div>
                  <div>
                    <div className="font-medium text-gray-900">{category.name}</div>
                    <div className="text-sm text-gray-600">
                      {category.transactionCount} transactions
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`font-semibold ${
                    category.type === 'income' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {formatCurrency(Math.abs(category.totalAmount), consolidatedData.currency)}
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <TrendIcon className={`h-3 w-3 ${getTrendColor(category.trend)}`} />
                    <span className={getTrendColor(category.trend)}>
                      {category.trendPercentage > 0 ? '+' : ''}{formatPercentage(category.trendPercentage)}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </Card>

      {/* Quick Actions */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button
            variant="outline"
            onClick={() => onViewDetails?.('transactions')}
            className="flex flex-col items-center gap-2 h-auto py-4"
          >
            <BarChart3 className="h-6 w-6 text-blue-600" />
            <span className="text-sm">View Transactions</span>
          </Button>
          
          <Button
            variant="outline"
            onClick={() => onViewDetails?.('analytics')}
            className="flex flex-col items-center gap-2 h-auto py-4"
          >
            <PieChart className="h-6 w-6 text-green-600" />
            <span className="text-sm">Analytics</span>
          </Button>
          
          <Button
            variant="outline"
            onClick={() => onViewDetails?.('reports')}
            className="flex flex-col items-center gap-2 h-auto py-4"
          >
            <Calendar className="h-6 w-6 text-purple-600" />
            <span className="text-sm">Reports</span>
          </Button>
          
          <Button
            variant="outline"
            onClick={() => onViewDetails?.('settings')}
            className="flex flex-col items-center gap-2 h-auto py-4"
          >
            <Filter className="h-6 w-6 text-gray-600" />
            <span className="text-sm">Settings</span>
          </Button>
        </div>
      </Card>
    </div>
  )
} 