'use client'

import React, { useState, useEffect } from 'react'
import { Plus, Settings, RefreshCw, Link, Building2, QrCode, PieChart, CreditCard, Eye, EyeOff, Download, Share, Copy, Search, Filter, Calendar, MoreHorizontal, ArrowUpRight, ArrowDownRight, TrendingUp, TrendingDown, AlertCircle, CheckCircle, Clock, MapPin, Star, Award, Users, ShoppingCart, Utensils, DollarSign, BarChart3, Target, Store, Coffee, Smartphone, Wifi, Zap, Package, Truck, Activity, Bell, HelpCircle, Edit, ExternalLink, ChevronRight, ChevronDown, ChevronUp, Home, Briefcase, Fuel, Calculator, FileText, Database, LineChart, Maximize2, Minimize2, Phone, Mail, Globe, Shield, Lock, User, Wallet, Banknote, Receipt, History, Repeat, Send, Receive, ScanLine, CheckCircle2, XCircle, AlertTriangle, Info, Upload, FileCheck, FileX, Loader, Fingerprint, Key, CreditCard as CreditCardIcon, Landmark, PiggyBank, TrendingDownIcon, TrendingUpIcon } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import BankAccountCard from '@/components/open-finance/BankAccountCard'
import QRPaymentGenerator from '@/components/open-finance/QRPaymentGenerator'
import ConsolidatedFinancialOverview from '@/components/dashboard/ConsolidatedFinancialOverview'
import { 
  msmeBusinessProfile,
  msmeBankAccounts,
  msmeQRPayments,
  msmeOpenFinanceConnections,
  msmeConsolidatedFinancialData,
  msmeTransactionCategories,
  msmeTransactions,
  msmeFinancialKPIs,
  msmeDailySalesPattern,
  msmeMonthlyRevenueGrowth,
  msmeWeeklySalesTrends,
  msmeCustomerDemographics,
  msmeFinancialHealthIndicators
} from '@/lib/msme-data'
import { formatCurrency, formatNumber } from '@/lib/utils'

export default function MSMEOpenFinancePage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'accounts' | 'payments' | 'connections' | 'analytics'>('overview')
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [balanceVisibility, setBalanceVisibility] = useState<Record<string, boolean>>({})
  const [showBalance, setShowBalance] = useState(true)
  const [hoveredAccount, setHoveredAccount] = useState<string | null>(null)
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  // Animate on mount
  useEffect(() => {
    setIsAnimating(true)
    const timer = setTimeout(() => setIsAnimating(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  const handleRefreshData = async () => {
    setIsRefreshing(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsRefreshing(false)
  }

  const handleSyncAccount = async (accountId: string) => {
    console.log('Syncing account:', accountId)
    // Implement account sync logic
  }

  const handleManageAccount = (accountId: string) => {
    console.log('Managing account:', accountId)
    // Implement account management logic
  }

  const handleToggleBalanceVisibility = (accountId: string) => {
    setBalanceVisibility(prev => ({
      ...prev,
      [accountId]: !prev[accountId]
    }))
  }

  const handleGenerateQR = (amount?: number, description?: string) => {
    console.log('Generating QR payment:', { amount, description })
    // Implement QR generation logic
  }

  const handleCopyQR = (qrData: string) => {
    navigator.clipboard.writeText(qrData)
    console.log('QR code data copied')
  }

  const handleDownloadQR = (qrImage: string) => {
    console.log('Downloading QR image:', qrImage)
    // Implement QR download logic
  }

  const handleViewDetails = (category: string) => {
    console.log('Viewing details for:', category)
    // Implement navigation to detail views
  }

  const handleExportData = () => {
    console.log('Exporting financial data')
    // Implement export functionality
  }

  const getTotalBalance = () => {
    const bankBalance = msmeBankAccounts.reduce((total, account) => total + account.balance, 0)
    const ecommerceBalance = msmeOpenFinanceConnections
      .filter(conn => conn.connectionType === 'e-commerce' && conn.metadata?.storeBalance)
      .reduce((total, conn) => total + (conn.metadata?.storeBalance || 0), 0)
    return bankBalance + ecommerceBalance
  }

  const getActiveAccountsCount = () => {
    return msmeOpenFinanceConnections.filter(conn => conn.status === 'connected').length
  }

  const getDigitalPaymentPercentage = () => {
    return '70.0'
  }

  const getRecentTransactions = () => {
    return msmeTransactions.slice(0, 8)
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: PieChart },
    { id: 'accounts', label: 'Bank Accounts', icon: Building2 },
    { id: 'payments', label: 'QR Payments', icon: QrCode },
    { id: 'connections', label: 'Connections', icon: Link },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  ]

  const paymentMethods = [
    { name: 'DuitNow QR', icon: QrCode, color: 'bg-blue-500', count: 847, percentage: 45.2 },
    { name: 'Touch n Go', icon: Smartphone, color: 'bg-green-500', count: 523, percentage: 27.9 },
    { name: 'GrabPay', icon: Wallet, color: 'bg-purple-500', count: 324, percentage: 17.3 },
    { name: 'Cash', icon: Banknote, color: 'bg-orange-500', count: 186, percentage: 9.9 },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-blue-600 to-green-600 rounded-xl">
                <Building2 className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Open Finance Dashboard</h1>
                <p className="text-gray-600">
                  Manage your Malaysian MSME banking connections and digital payments
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                className="flex items-center gap-2 hover:bg-blue-50 transition-colors"
                onClick={() => setShowBalance(!showBalance)}
              >
                {showBalance ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                {showBalance ? 'Hide' : 'Show'} Balances
              </Button>
              <Button
                variant="outline"
                onClick={handleRefreshData}
                disabled={isRefreshing}
                className="flex items-center gap-2 hover:bg-blue-50 transition-colors"
              >
                <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                {isRefreshing ? 'Syncing...' : 'Sync All'}
              </Button>
              
              <Button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
                <Plus className="h-4 w-4" />
                Connect Bank
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Business Quick Stats */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Building2 className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {showBalance ? formatCurrency(getTotalBalance()) : 'RM ••••••'}
                  </div>
                  <div className="text-blue-100 text-sm">Total Balance</div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Landmark className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{getActiveAccountsCount()}</div>
                  <div className="text-blue-100 text-sm">Active Accounts</div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <QrCode className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{getDigitalPaymentPercentage()}%</div>
                  <div className="text-blue-100 text-sm">Digital Payments</div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Activity className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{msmeConsolidatedFinancialData.transactionsCount}</div>
                  <div className="text-blue-100 text-sm">Total Transactions</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <ConsolidatedFinancialOverview
              consolidatedData={msmeConsolidatedFinancialData}
              bankAccounts={msmeBankAccounts}
              transactionCategories={msmeTransactionCategories}
              onRefreshData={handleRefreshData}
              onViewDetails={handleViewDetails}
              onExportData={handleExportData}
              isLoading={isRefreshing}
            />

            {/* Payment Methods Overview */}
            <Card className="p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Payment Methods Usage</h3>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  View Analytics
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {paymentMethods.map((method, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border hover:shadow-md transition-all duration-300 hover:scale-105 ${
                      isAnimating ? 'translate-y-4 opacity-0' : 'translate-y-0 opacity-100'
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`p-2 ${method.color} rounded-lg`}>
                        <method.icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{method.name}</div>
                        <div className="text-sm text-gray-600">{method.percentage}% usage</div>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{formatNumber(method.count)}</div>
                    <div className="text-xs text-gray-600">transactions this month</div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Recent Transactions */}
            <Card className="p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
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
              <div className="space-y-3">
                {getRecentTransactions().map((transaction, index) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg ${
                        transaction.type === 'credit' ? 'bg-green-100' : 'bg-red-100'
                      }`}>
                        {transaction.type === 'credit' ? (
                          <ArrowDownRight className={`h-4 w-4 ${
                            transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                          }`} />
                        ) : (
                          <ArrowUpRight className={`h-4 w-4 ${
                            transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                          }`} />
                        )}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{transaction.description}</div>
                        <div className="text-sm text-gray-600">
                          {transaction.counterpartyName} • {new Date(transaction.date).toLocaleDateString('en-MY')}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`font-bold ${
                        transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.type === 'credit' ? '+' : ''}{formatCurrency(transaction.amount)}
                      </div>
                      <div className="text-sm text-gray-600">{transaction.category}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'accounts' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Connected Bank Accounts</h2>
                <p className="text-gray-600">Manage your Malaysian bank account connections and data access</p>
              </div>
              <Button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
                <Plus className="h-4 w-4" />
                Add Account
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {msmeBankAccounts.map((account, index) => (
                <div
                  key={account.id}
                  className={`transform transition-all duration-300 hover:scale-105 ${
                    isAnimating ? 'translate-y-4 opacity-0' : 'translate-y-0 opacity-100'
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                  onMouseEnter={() => setHoveredAccount(account.id)}
                  onMouseLeave={() => setHoveredAccount(null)}
                >
                  <BankAccountCard
                    account={account}
                    onSync={handleSyncAccount}
                    onManage={handleManageAccount}
                    onToggleVisibility={handleToggleBalanceVisibility}
                    isBalanceVisible={showBalance && balanceVisibility[account.id] !== false}
                    isLoading={isRefreshing}
                    className={`${hoveredAccount === account.id ? 'shadow-xl' : ''}`}
                  />
                </div>
              ))}
            </div>

            {/* Account Analytics */}
            <Card className="p-6 hover:shadow-lg transition-all duration-300">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Account Analytics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600">
                    {msmeBankAccounts.length}
                  </div>
                  <div className="text-sm text-blue-700">Total Accounts</div>
                  <div className="text-xs text-blue-600 mt-1">All bank connections</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-3xl font-bold text-green-600">
                    {msmeBankAccounts.filter(acc => acc.status === 'active').length}
                  </div>
                  <div className="text-sm text-green-700">Active</div>
                  <div className="text-xs text-green-600 mt-1">Successfully connected</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-3xl font-bold text-purple-600">
                    {new Set(msmeBankAccounts.map(acc => acc.bankName)).size}
                  </div>
                  <div className="text-sm text-purple-700">Banks</div>
                  <div className="text-xs text-purple-600 mt-1">Different institutions</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-3xl font-bold text-orange-600">
                    {((msmeBankAccounts.filter(acc => acc.status === 'active').length / msmeBankAccounts.length) * 100).toFixed(0)}%
                  </div>
                  <div className="text-sm text-orange-700">Health Score</div>
                  <div className="text-xs text-orange-600 mt-1">Connection quality</div>
                </div>
              </div>
            </Card>

            {/* Bank Comparison */}
            <Card className="p-6 hover:shadow-lg transition-all duration-300">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Bank Account Comparison</h3>
              <div className="overflow-x-auto">
                <table className="w-full table-auto">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4 font-medium text-gray-900">Bank</th>
                      <th className="text-left p-4 font-medium text-gray-900">Account Type</th>
                      <th className="text-left p-4 font-medium text-gray-900">Balance</th>
                      <th className="text-left p-4 font-medium text-gray-900">Status</th>
                      <th className="text-left p-4 font-medium text-gray-900">Last Sync</th>
                      <th className="text-left p-4 font-medium text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {msmeBankAccounts.map((account) => (
                      <tr key={account.id} className="border-b hover:bg-gray-50">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                              <Building2 className="h-4 w-4 text-blue-600" />
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">{account.bankName}</div>
                              <div className="text-sm text-gray-600">•••• {account.accountNumber.slice(-4)}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="capitalize text-gray-900">{account.accountType}</span>
                        </td>
                        <td className="p-4">
                          <div className="font-medium text-gray-900">
                            {showBalance ? formatCurrency(account.balance) : 'RM ••••••'}
                          </div>
                        </td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            account.status === 'active' ? 'text-green-600 bg-green-100' : 'text-gray-600 bg-gray-100'
                          }`}>
                            {account.status}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="text-sm text-gray-600">
                            {new Date(account.lastSyncTime).toLocaleDateString('en-MY')}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleSyncAccount(account.id)}
                              className="flex items-center gap-1"
                            >
                              <RefreshCw className="h-3 w-3" />
                              Sync
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleManageAccount(account.id)}
                              className="flex items-center gap-1"
                            >
                              <Settings className="h-3 w-3" />
                              Manage
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'payments' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">QR Payment Management</h2>
                <p className="text-gray-600">Generate and manage QR code payments for your MSME business</p>
              </div>
              <Button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
                <Plus className="h-4 w-4" />
                Create QR Code
              </Button>
            </div>

            <QRPaymentGenerator
              onGenerateQR={handleGenerateQR}
              onCopyQR={handleCopyQR}
              onDownloadQR={handleDownloadQR}
              existingPayments={msmeQRPayments}
              isLoading={isRefreshing}
            />

            {/* QR Payment Analytics */}
            <Card className="p-6 hover:shadow-lg transition-all duration-300">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">QR Payment Analytics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600">
                    {msmeQRPayments.length}
                  </div>
                  <div className="text-sm text-blue-700">Total QR Codes</div>
                  <div className="text-xs text-blue-600 mt-1">Generated codes</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-3xl font-bold text-green-600">
                    {msmeQRPayments.filter(qr => qr.status === 'active').length}
                  </div>
                  <div className="text-sm text-green-700">Active</div>
                  <div className="text-xs text-green-600 mt-1">Currently usable</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-3xl font-bold text-purple-600">
                    {msmeQRPayments.reduce((sum, qr) => sum + qr.usageCount, 0)}
                  </div>
                  <div className="text-sm text-purple-700">Total Usage</div>
                  <div className="text-xs text-purple-600 mt-1">Scanned times</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-3xl font-bold text-orange-600">
                    {msmeQRPayments.filter(qr => qr.isReusable).length}
                  </div>
                  <div className="text-sm text-orange-700">Reusable</div>
                  <div className="text-xs text-orange-600 mt-1">Permanent codes</div>
                </div>
              </div>
            </Card>

            {/* QR Code Management */}
            <Card className="p-6 hover:shadow-lg transition-all duration-300">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Manage QR Codes</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {msmeQRPayments.map((qr, index) => (
                  <div key={qr.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <QrCode className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{qr.type.toUpperCase()}</div>
                          <div className="text-sm text-gray-600">{qr.description}</div>
                        </div>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                        qr.status === 'active' ? 'text-green-600 bg-green-100' : 'text-gray-600 bg-gray-100'
                      }`}>
                        {qr.status}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Usage Count</span>
                        <span className="font-medium">{formatNumber(qr.usageCount)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Type</span>
                        <span className="font-medium">{qr.isReusable ? 'Reusable' : 'One-time'}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Created</span>
                        <span className="font-medium">{new Date(qr.createdAt).toLocaleDateString('en-MY')}</span>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCopyQR(qr.qrCode)}
                        className="flex items-center gap-1 flex-1"
                      >
                        <Copy className="h-3 w-3" />
                        Copy
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownloadQR(qr.qrCode)}
                        className="flex items-center gap-1 flex-1"
                      >
                        <Download className="h-3 w-3" />
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'connections' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Open Finance Connections</h2>
                <p className="text-gray-600">Manage your financial service connections and data permissions</p>
              </div>
              <Button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
                <Plus className="h-4 w-4" />
                Add Connection
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {msmeOpenFinanceConnections.map((connection, index) => (
                <Card key={connection.id} className="p-6 hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <Building2 className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{connection.providerName}</h3>
                        <p className="text-sm text-gray-600 capitalize">{connection.connectionType}</p>
                      </div>
                    </div>
                    
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      connection.status === 'connected' 
                        ? 'text-green-600 bg-green-50' 
                        : 'text-red-600 bg-red-50'
                    }`}>
                      {connection.status}
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        {connection.connectionType === 'e-commerce' ? 'Store Balance' : 'Accounts'}
                      </span>
                      <span className="font-medium">
                        {connection.connectionType === 'e-commerce' && connection.metadata?.storeBalance 
                          ? formatCurrency(connection.metadata.storeBalance)
                          : connection.accounts.length
                        }
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Permissions</span>
                      <span className="font-medium">{connection.permissions.length}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Consent Expires</span>
                      <span className="font-medium">
                        {new Date(connection.consentExpiryDate).toLocaleDateString('en-MY')}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Last Sync</span>
                      <span className="font-medium">
                        {new Date(connection.lastSyncTime).toLocaleDateString('en-MY')}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm text-gray-600">Permissions:</div>
                    <div className="flex flex-wrap gap-1">
                      {connection.permissions.map((permission, idx) => (
                        <span key={idx} className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-700">
                          {permission.replace('_', ' ')}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleSyncAccount(connection.id)}
                      className="flex items-center gap-2 flex-1"
                    >
                      <RefreshCw className="h-4 w-4" />
                      Sync
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleManageAccount(connection.id)}
                      className="flex items-center gap-2 flex-1"
                    >
                      <Settings className="h-4 w-4" />
                      Manage
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            {/* Connection Health */}
            <Card className="p-6 hover:shadow-lg transition-all duration-300">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Connection Health</h3>
              <div className="space-y-4">
                {msmeOpenFinanceConnections.map((connection) => (
                  <div key={connection.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        connection.status === 'connected' ? 'bg-green-500' : 'bg-red-500'
                      }`} />
                      <div>
                        <div className="font-medium text-gray-900">{connection.providerName}</div>
                        <div className="text-sm text-gray-600">
                          Last sync: {new Date(connection.lastSyncTime).toLocaleString('en-MY')}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-sm text-gray-600">
                        Expires: {new Date(connection.consentExpiryDate).toLocaleDateString('en-MY')}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1"
                      >
                        <CheckCircle className="h-4 w-4" />
                        Healthy
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Financial Analytics</h2>
                <p className="text-gray-600">Detailed insights into your MSME financial performance</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Date Range
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Export Report
                </Button>
              </div>
            </div>

            {/* Financial KPIs */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {msmeFinancialKPIs.slice(0, 6).map((kpi, index) => (
                <Card key={kpi.id} className="p-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {showBalance || !kpi.currency ? kpi.value : kpi.currency === 'MYR' ? 'RM ••••••' : kpi.value}
                      </p>
                      <p className={`text-xs mt-1 flex items-center gap-1 ${
                        kpi.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {kpi.changeType === 'increase' ? (
                          <ArrowUpRight className="h-3 w-3" />
                        ) : (
                          <ArrowDownRight className="h-3 w-3" />
                        )}
                        {kpi.change}% from last month
                      </p>
                    </div>
                    <div className="p-3 bg-blue-100 rounded-full">
                      <kpi.icon className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Performance Charts */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <Card className="p-6 hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Sales Pattern</h3>
                <div className="h-64 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 text-blue-600 mx-auto mb-2" />
                    <p className="text-gray-600">Sales chart visualization</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Growth</h3>
                <div className="h-64 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <LineChart className="h-12 w-12 text-green-600 mx-auto mb-2" />
                    <p className="text-gray-600">Growth trend visualization</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Financial Health */}
            <Card className="p-6 hover:shadow-lg transition-all duration-300">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Financial Health Indicators</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {msmeFinancialHealthIndicators.map((indicator, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-3 h-3 rounded-full ${
                        indicator.status === 'healthy' ? 'bg-green-500' : 
                        indicator.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                      }`} />
                      <div>
                        <div className="font-medium text-gray-900">{indicator.name}</div>
                        <div className="text-sm text-gray-600">{indicator.recommendation}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900">
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
        )}
      </div>
    </div>
  )
} 