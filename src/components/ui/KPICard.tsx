import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { Card } from './Card'
import { Badge } from './Badge'
import { KPICard as KPICardType } from '@/lib/types'
import { cn } from '@/lib/utils'

interface KPICardProps {
  kpi: KPICardType
}

export default function KPICard({ kpi }: KPICardProps) {
  const getTrendIcon = () => {
    switch (kpi.changeType) {
      case 'increase':
        return <TrendingUp className="h-4 w-4" />
      case 'decrease':
        return <TrendingDown className="h-4 w-4" />
      default:
        return <Minus className="h-4 w-4" />
    }
  }

  const getTrendColor = () => {
    switch (kpi.changeType) {
      case 'increase':
        return 'text-green-600'
      case 'decrease':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  const getBadgeVariant = () => {
    switch (kpi.changeType) {
      case 'increase':
        return 'success'
      case 'decrease':
        return 'destructive'
      default:
        return 'secondary'
    }
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <kpi.icon className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
            <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
          </div>
        </div>
        <div className="text-right">
          <Badge variant={getBadgeVariant()} className="mb-1">
            <span className={cn('flex items-center space-x-1', getTrendColor())}>
              {getTrendIcon()}
              <span>{Math.abs(kpi.change)}%</span>
            </span>
          </Badge>
          {kpi.description && (
            <p className="text-xs text-gray-500">{kpi.description}</p>
          )}
        </div>
      </div>
    </Card>
  )
}
