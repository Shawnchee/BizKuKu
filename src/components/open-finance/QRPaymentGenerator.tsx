import React, { useState } from 'react'
import { QrCode, Copy, Download, RefreshCw, CheckCircle, Clock, XCircle } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { QRPayment } from '@/lib/types'
import { formatCurrency } from '@/lib/utils'

interface QRPaymentGeneratorProps {
  onGenerateQR?: (amount?: number, description?: string) => void
  onCopyQR?: (qrData: string) => void
  onDownloadQR?: (qrImage: string) => void
  existingPayments?: QRPayment[]
  isLoading?: boolean
}

export default function QRPaymentGenerator({
  onGenerateQR,
  onCopyQR,
  onDownloadQR,
  existingPayments = [],
  isLoading = false
}: QRPaymentGeneratorProps) {
  const [amount, setAmount] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [paymentType, setPaymentType] = useState<'fixed' | 'dynamic'>('fixed')

  const handleGenerateQR = () => {
    const numAmount = paymentType === 'fixed' ? parseFloat(amount) : undefined
    onGenerateQR?.(numAmount, description || undefined)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-50'
      case 'used':
        return 'text-blue-600 bg-blue-50'
      case 'expired':
        return 'text-red-600 bg-red-50'
      default:
        return 'text-gray-600 bg-gray-50'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return Clock
      case 'used':
        return CheckCircle
      case 'expired':
        return XCircle
      default:
        return Clock
    }
  }

  return (
    <div className="space-y-6">
      {/* QR Generator Form */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <QrCode className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Generate QR Payment</h3>
        </div>

        <div className="space-y-4">
          {/* Payment Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment Type
            </label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="paymentType"
                  value="fixed"
                  checked={paymentType === 'fixed'}
                  onChange={(e) => setPaymentType(e.target.value as 'fixed' | 'dynamic')}
                  className="mr-2"
                />
                <span className="text-sm">Fixed Amount</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="paymentType"
                  value="dynamic"
                  checked={paymentType === 'dynamic'}
                  onChange={(e) => setPaymentType(e.target.value as 'fixed' | 'dynamic')}
                  className="mr-2"
                />
                <span className="text-sm">Dynamic Amount</span>
              </label>
            </div>
          </div>

          {/* Amount Input */}
          {paymentType === 'fixed' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount (MYR)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          {/* Description Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description (Optional)
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Payment description"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Generate Button */}
          <div className="flex justify-end">
            <Button
              onClick={handleGenerateQR}
              disabled={isLoading || (paymentType === 'fixed' && !amount)}
              className="flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <QrCode className="h-4 w-4" />
                  Generate QR Code
                </>
              )}
            </Button>
          </div>
        </div>
      </Card>

      {/* Existing QR Payments */}
      {existingPayments.length > 0 && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Generated QR Payments</h3>
          <div className="space-y-4">
            {existingPayments.map((payment) => {
              const StatusIcon = getStatusIcon(payment.status)
              
              return (
                <div
                  key={payment.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                        <img
                          src={payment.qrCodeImage}
                          alt="QR Code"
                          className="w-10 h-10"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-gray-900">
                          {payment.amount 
                            ? formatCurrency(payment.amount, payment.currency)
                            : 'Dynamic Amount'
                          }
                        </span>
                        <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}>
                          <StatusIcon className="h-3 w-3" />
                          <span className="capitalize">{payment.status}</span>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-600">
                        {payment.description || 'No description'}
                      </p>
                      
                      <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                        <span>Created: {new Date(payment.createdAt).toLocaleString()}</span>
                        {payment.expiryTime && (
                          <span>Expires: {new Date(payment.expiryTime).toLocaleString()}</span>
                        )}
                        {payment.usedAt && (
                          <span>Used: {new Date(payment.usedAt).toLocaleString()}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onCopyQR?.(payment.qrCodeData)}
                      className="flex items-center gap-2"
                    >
                      <Copy className="h-4 w-4" />
                      Copy
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onDownloadQR?.(payment.qrCodeImage)}
                      className="flex items-center gap-2"
                    >
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        </Card>
      )}
    </div>
  )
} 