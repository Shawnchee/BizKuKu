import React from 'react'
import { TrendingUp, TrendingDown, Minus, Target } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { FinancialKPI } from '@/lib/types'
import { formatCurrency, formatNumber } from '@/lib/utils'

interface FinancialKPICardProps {
  kpi: FinancialKPI
  className?: string
}

export default function FinancialKPICard({ kpi, className = '' }: FinancialKPICardProps) {
  const IconComponent = kpi.icon
  
  const getChangeIcon = () => {
    if (kpi.change > 0) return TrendingUp
    if (kpi.change < 0) return TrendingDown
    return Minus
  }

  const getChangeColor = () => {
    if (kpi.changeType === 'increase') return 'text-green-600'
    if (kpi.changeType === 'decrease') return 'text-red-600'
    return 'text-gray-600'
  }

  const getTrendIcon = () => {
    if (kpi.trend === 'up') return TrendingUp
    if (kpi.trend === 'down') return TrendingDown
    return Minus
  }

  const getTrendColor = () => {
    if (kpi.trend === 'up') return 'text-green-500'
    if (kpi.trend === 'down') return 'text-red-500'
    return 'text-gray-500'
  }

  const calculateTargetProgress = () => {
    if (!kpi.target) return 0
    
    let currentValue = 0
    if (typeof kpi.value === 'string') {
      // Extract numeric value from string (e.g., "$127,500" -> 127500)
      const numericValue = kpi.value.replace(/[^0-9.-]/g, '')
      currentValue = parseFloat(numericValue)
    } else {
      currentValue = kpi.value
    }
    
    return Math.min((currentValue / kpi.target) * 100, 100)
  }

  const formatValue = (value: string | number) => {
    if (kpi.currency && typeof value === 'string') {
      // If it's already formatted with currency, return as is
      if (value.includes('$') || value.includes('€') || value.includes('£')) {
        return value
      }
      return formatCurrency(parseFloat(value.replace(/[^0-9.-]/g, '')))
    }
    
    if (typeof value === 'number') {
      return kpi.currency ? formatCurrency(value) : formatNumber(value)
    }
    
    return value
  }

  const ChangeIcon = getChangeIcon()
  const TrendIcon = getTrendIcon()
  const targetProgress = calculateTargetProgress()

  return (
    <Card className={`p-6 hover:shadow-lg transition-shadow duration-200 ${className}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <IconComponent className="h-5 w-5 text-gray-600" />
            <h3 className="text-sm font-medium text-gray-600">{kpi.title}</h3>
          </div>
          
          <div className="mb-3">
            <div className="text-2xl font-bold text-gray-900">
              {formatValue(kpi.value)}
            </div>
            {kpi.description && (
              <p className="text-sm text-gray-500 mt-1">{kpi.description}</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ChangeIcon className={`h-4 w-4 ${getChangeColor()}`} />
              <span className={`text-sm font-medium ${getChangeColor()}`}>
                {kpi.change > 0 ? '+' : ''}{kpi.change.toFixed(1)}%
              </span>
              <span className="text-sm text-gray-500">vs last {kpi.period}</span>
            </div>
            
            {kpi.trend && (
              <div className="flex items-center gap-1">
                <TrendIcon className={`h-3 w-3 ${getTrendColor()}`} />
                <span className={`text-xs ${getTrendColor()}`}>
                  {kpi.trend}
                </span>
              </div>
            )}
          </div>

          {kpi.target && (
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1">
                  <Target className="h-3 w-3 text-gray-400" />
                  <span className="text-xs text-gray-500">Target Progress</span>
                </div>
                <span className="text-xs text-gray-600 font-medium">
                  {targetProgress.toFixed(1)}%
                </span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    targetProgress >= 100 ? 'bg-green-500' : 
                    targetProgress >= 75 ? 'bg-blue-500' : 
                    targetProgress >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${targetProgress}%` }}
                />
              </div>
              
              <div className="text-xs text-gray-500 mt-1">
                Target: {kpi.currency ? formatCurrency(kpi.target) : formatNumber(kpi.target)}
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
} 