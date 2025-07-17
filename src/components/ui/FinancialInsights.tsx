import React from 'react'
import { CheckCircle, AlertTriangle, XCircle, TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { FinancialHealthIndicator } from '@/lib/types'
import { formatCurrency, formatNumber } from '@/lib/utils'

interface FinancialInsightsProps {
  indicators: FinancialHealthIndicator[]
  className?: string
}

export default function FinancialInsights({ indicators, className = '' }: FinancialInsightsProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return CheckCircle
      case 'warning':
        return AlertTriangle
      case 'critical':
        return XCircle
      default:
        return CheckCircle
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'text-green-600'
      case 'warning':
        return 'text-yellow-600'
      case 'critical':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  const getStatusBgColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'bg-green-50 border-green-200'
      case 'warning':
        return 'bg-yellow-50 border-yellow-200'
      case 'critical':
        return 'bg-red-50 border-red-200'
      default:
        return 'bg-gray-50 border-gray-200'
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving':
        return TrendingUp
      case 'declining':
        return TrendingDown
      case 'stable':
        return Minus
      default:
        return Minus
    }
  }

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'improving':
        return 'text-green-500'
      case 'declining':
        return 'text-red-500'
      case 'stable':
        return 'text-gray-500'
      default:
        return 'text-gray-500'
    }
  }

  const formatValue = (name: string, value: number) => {
    if (name.toLowerCase().includes('cost') || name.toLowerCase().includes('rate')) {
      return formatCurrency(value)
    }
    if (name.toLowerCase().includes('ratio')) {
      return value.toFixed(1)
    }
    if (name.toLowerCase().includes('rate') || name.toLowerCase().includes('percentage')) {
      return `${value.toFixed(1)}%`
    }
    return formatNumber(value)
  }

  const healthyCount = indicators.filter(i => i.status === 'healthy').length
  const warningCount = indicators.filter(i => i.status === 'warning').length
  const criticalCount = indicators.filter(i => i.status === 'critical').length

  return (
    <Card className={`p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Financial Health Insights</h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-sm text-gray-600">{healthyCount} Healthy</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <span className="text-sm text-gray-600">{warningCount} Warning</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <span className="text-sm text-gray-600">{criticalCount} Critical</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {indicators.map((indicator) => {
          const StatusIcon = getStatusIcon(indicator.status)
          const TrendIcon = getTrendIcon(indicator.trend)
          
          return (
            <div
              key={indicator.id}
              className={`p-4 rounded-lg border ${getStatusBgColor(indicator.status)}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <StatusIcon className={`h-5 w-5 ${getStatusColor(indicator.status)}`} />
                  <div>
                    <h4 className="font-medium text-gray-900">{indicator.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-lg font-semibold text-gray-900">
                        {formatValue(indicator.name, indicator.value)}
                      </span>
                      <div className="flex items-center gap-1">
                        <TrendIcon className={`h-3 w-3 ${getTrendColor(indicator.trend)}`} />
                        <span className={`text-xs capitalize ${getTrendColor(indicator.trend)}`}>
                          {indicator.trend}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  indicator.status === 'healthy' 
                    ? 'bg-green-100 text-green-800' 
                    : indicator.status === 'warning'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {indicator.status}
                </div>
              </div>
              
              <div className="pl-8">
                <p className="text-sm text-gray-600 mb-2">
                  <span className="font-medium">Recommendation:</span> {indicator.recommendation}
                </p>
                
                {indicator.status === 'warning' && (
                  <div className="bg-yellow-100 border border-yellow-200 rounded-md p-3 mt-3">
                    <p className="text-sm text-yellow-800">
                      <span className="font-medium">Action Required:</span> This metric needs attention to prevent potential issues.
                    </p>
                  </div>
                )}
                
                {indicator.status === 'critical' && (
                  <div className="bg-red-100 border border-red-200 rounded-md p-3 mt-3">
                    <p className="text-sm text-red-800">
                      <span className="font-medium">Immediate Action Required:</span> This metric requires urgent attention.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="font-medium text-blue-900 mb-2">💡 Key Insights</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Focus on improving metrics marked as &quot;Critical&quot; or &quot;Warning&quot;</li>
          <li>• Maintain healthy metrics by monitoring trends regularly</li>
          <li>• Consider implementing recommended actions for better financial health</li>
          <li>• Review these insights monthly to track progress</li>
        </ul>
      </div>
    </Card>
  )
} 