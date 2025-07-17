import React from 'react'
import { Building2, CheckCircle, AlertCircle, RefreshCw, Settings, Eye, EyeOff } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { BankAccount } from '@/lib/types'
import { formatCurrency, formatDate } from '@/lib/utils'

interface BankAccountCardProps {
  account: BankAccount
  onSync?: (accountId: string) => void
  onManage?: (accountId: string) => void
  onToggleVisibility?: (accountId: string) => void
  isBalanceVisible?: boolean
  isLoading?: boolean
}

export default function BankAccountCard({
  account,
  onSync,
  onManage,
  onToggleVisibility,
  isBalanceVisible = true,
  isLoading = false
}: BankAccountCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-50'
      case 'inactive':
        return 'text-gray-600 bg-gray-50'
      case 'pending':
        return 'text-yellow-600 bg-yellow-50'
      default:
        return 'text-gray-600 bg-gray-50'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return CheckCircle
      case 'pending':
        return AlertCircle
      default:
        return AlertCircle
    }
  }

  const getAccountTypeLabel = (type: string) => {
    switch (type) {
      case 'business':
        return 'Business Account'
      case 'checking':
        return 'Checking Account'
      case 'savings':
        return 'Savings Account'
      case 'credit':
        return 'Credit Account'
      default:
        return 'Account'
    }
  }

  const StatusIcon = getStatusIcon(account.status)

  return (
    <Card className="p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 rounded-lg">
            <Building2 className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{account.bankName}</h3>
            <p className="text-sm text-gray-600">{getAccountTypeLabel(account.accountType)}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(account.status)}`}>
            <StatusIcon className="h-3 w-3" />
            <span className="capitalize">{account.status}</span>
          </div>
          
          {account.isConnected && (
            <div className="flex items-center gap-1 px-2 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium">
              <CheckCircle className="h-3 w-3" />
              <span>Connected</span>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Account Number</span>
          <span className="text-sm font-medium text-gray-900">
            ****{account.accountNumber.slice(-4)}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Balance</span>
          <div className="flex items-center gap-2">
            {isBalanceVisible ? (
              <span className={`text-lg font-bold ${
                account.balance >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {formatCurrency(account.balance)}
              </span>
            ) : (
              <span className="text-lg font-bold text-gray-400">••••••</span>
            )}
            <button
              onClick={() => onToggleVisibility?.(account.id)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              {isBalanceVisible ? (
                <EyeOff className="h-4 w-4 text-gray-400" />
              ) : (
                <Eye className="h-4 w-4 text-gray-400" />
              )}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Currency</span>
          <span className="text-sm font-medium text-gray-900">{account.currency}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Last Sync</span>
          <span className="text-sm text-gray-500">
            {formatDate(account.lastSyncTime)}
          </span>
        </div>

        {account.iban && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">IBAN</span>
            <span className="text-sm font-mono text-gray-900">
              {account.iban.slice(0, 4)}****{account.iban.slice(-4)}
            </span>
          </div>
        )}
      </div>

      <div className="pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onSync?.(account.id)}
              disabled={isLoading}
              className="flex items-center gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              {isLoading ? 'Syncing...' : 'Sync'}
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => onManage?.(account.id)}
              className="flex items-center gap-2"
            >
              <Settings className="h-4 w-4" />
              Manage
            </Button>
          </div>
          
          <div className="flex items-center gap-1">
            {account.permissions.map((permission, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
              >
                {permission.replace('_', ' ')}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Card>
  )
} 