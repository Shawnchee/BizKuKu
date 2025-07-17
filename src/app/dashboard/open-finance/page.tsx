'use client'

import React, { useState } from 'react'
import { Plus, Settings, RefreshCw, Link, Building2, QrCode, PieChart, CreditCard } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import BankAccountCard from '@/components/open-finance/BankAccountCard'
import QRPaymentGenerator from '@/components/open-finance/QRPaymentGenerator'
import ConsolidatedFinancialOverview from '@/components/dashboard/ConsolidatedFinancialOverview'
import { 
  bankAccounts, 
  qrPayments, 
  openFinanceConnections, 
  consolidatedFinancialData,
  transactionCategories 
} from '@/lib/data'

export default function OpenFinancePage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'accounts' | 'payments' | 'connections'>('overview')
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [balanceVisibility, setBalanceVisibility] = useState<Record<string, boolean>>({})

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

  const tabs = [
    { id: 'overview', label: 'Overview', icon: PieChart },
    { id: 'accounts', label: 'Accounts', icon: Building2 },
    { id: 'payments', label: 'QR Payments', icon: QrCode },
    { id: 'connections', label: 'Connections', icon: Link },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Open Finance Dashboard</h1>
              <p className="text-gray-600">Manage your financial connections and payments</p>
            </div>
            
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={handleRefreshData}
                disabled={isRefreshing}
                className="flex items-center gap-2"
              >
                <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                {isRefreshing ? 'Syncing...' : 'Sync All'}
              </Button>
              
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Connect Account
              </Button>
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
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm ${
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
          <ConsolidatedFinancialOverview
            consolidatedData={consolidatedFinancialData}
            bankAccounts={bankAccounts}
            transactionCategories={transactionCategories}
            onRefreshData={handleRefreshData}
            onViewDetails={handleViewDetails}
            onExportData={handleExportData}
            isLoading={isRefreshing}
          />
        )}

        {activeTab === 'accounts' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Connected Accounts</h2>
                <p className="text-gray-600">Manage your connected bank accounts and their data</p>
              </div>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Account
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bankAccounts.map((account) => (
                <BankAccountCard
                  key={account.id}
                  account={account}
                  onSync={handleSyncAccount}
                  onManage={handleManageAccount}
                  onToggleVisibility={handleToggleBalanceVisibility}
                  isBalanceVisible={balanceVisibility[account.id] !== false}
                  isLoading={isRefreshing}
                />
              ))}
            </div>

            {/* Account Stats */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Statistics</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {bankAccounts.length}
                  </div>
                  <div className="text-sm text-gray-600">Total Accounts</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {bankAccounts.filter(acc => acc.status === 'active').length}
                  </div>
                  <div className="text-sm text-gray-600">Active</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">
                    {bankAccounts.filter(acc => acc.status === 'pending').length}
                  </div>
                  <div className="text-sm text-gray-600">Pending</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {new Set(bankAccounts.map(acc => acc.bankName)).size}
                  </div>
                  <div className="text-sm text-gray-600">Banks</div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'payments' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">QR Payments</h2>
                <p className="text-gray-600">Generate and manage QR code payments</p>
              </div>
            </div>

            <QRPaymentGenerator
              onGenerateQR={handleGenerateQR}
              onCopyQR={handleCopyQR}
              onDownloadQR={handleDownloadQR}
              existingPayments={qrPayments}
              isLoading={isRefreshing}
            />

            {/* Payment Statistics */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Statistics</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {qrPayments.length}
                  </div>
                  <div className="text-sm text-gray-600">Total QR Codes</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {qrPayments.filter(qr => qr.status === 'active').length}
                  </div>
                  <div className="text-sm text-gray-600">Active</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {qrPayments.filter(qr => qr.status === 'used').length}
                  </div>
                  <div className="text-sm text-gray-600">Used</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-600">
                    {qrPayments.filter(qr => qr.isReusable).length}
                  </div>
                  <div className="text-sm text-gray-600">Reusable</div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'connections' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Open Finance Connections</h2>
                <p className="text-gray-600">Manage your financial service connections</p>
              </div>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Connection
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {openFinanceConnections.map((connection) => (
                <Card key={connection.id} className="p-6">
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

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Accounts</span>
                      <span className="font-medium">{connection.accounts.length}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Permissions</span>
                      <span className="font-medium">{connection.permissions.length}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Consent Expires</span>
                      <span className="font-medium">
                        {new Date(connection.consentExpiryDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleSyncAccount(connection.id)}
                      className="flex items-center gap-2"
                    >
                      <RefreshCw className="h-4 w-4" />
                      Sync
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleManageAccount(connection.id)}
                      className="flex items-center gap-2"
                    >
                      <Settings className="h-4 w-4" />
                      Manage
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 