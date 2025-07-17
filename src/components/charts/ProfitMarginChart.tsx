import React from 'react'
import { 
  ComposedChart, 
  Bar, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts'
import { ProfitMarginData } from '@/lib/types'
import { formatCurrency } from '@/lib/utils'

interface ProfitMarginChartProps {
  data: ProfitMarginData[]
  title?: string
  height?: number
}

export default function ProfitMarginChart({ data, title, height = 400 }: ProfitMarginChartProps) {
  const CustomTooltip = ({ active, payload, label }: {
    active?: boolean;
    payload?: Array<{
      dataKey: string;
      name: string;
      value: number;
      color: string;
    }>;
    label?: string;
  }) => {
    if (active && payload && payload.length) {
      const revenueData = payload.find((p) => p.dataKey === 'revenue')
      const costsData = payload.find((p) => p.dataKey === 'costs')
      const marginData = payload.find((p) => p.dataKey === 'margin')
      
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-900 mb-2">{label}</p>
          
          {revenueData && (
            <div className="flex items-center gap-2 mb-1">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <span className="text-sm text-gray-600">Revenue:</span>
              <span className="text-sm font-medium text-gray-900">
                {formatCurrency(revenueData.value)}
              </span>
            </div>
          )}
          
          {costsData && (
            <div className="flex items-center gap-2 mb-1">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <span className="text-sm text-gray-600">Costs:</span>
              <span className="text-sm font-medium text-gray-900">
                {formatCurrency(costsData.value)}
              </span>
            </div>
          )}
          
          {marginData && (
            <div className="flex items-center gap-2 mb-1">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-sm text-gray-600">Profit Margin:</span>
              <span className="text-sm font-medium text-gray-900">
                {marginData.value.toFixed(1)}%
              </span>
            </div>
          )}
        </div>
      )
    }
    return null
  }

  return (
    <div className="w-full">
      {title && (
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      )}
      <ResponsiveContainer width="100%" height={height}>
        <ComposedChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="name" 
            stroke="#6b7280"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            yAxisId="left"
            stroke="#6b7280"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
          />
          <YAxis 
            yAxisId="right"
            orientation="right"
            stroke="#6b7280"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          
          <Bar 
            yAxisId="left"
            dataKey="revenue" 
            fill="#3b82f6" 
            name="Revenue"
            radius={[2, 2, 0, 0]}
          />
          <Bar 
            yAxisId="left"
            dataKey="costs" 
            fill="#ef4444" 
            name="Costs"
            radius={[2, 2, 0, 0]}
          />
          <Line 
            yAxisId="right"
            type="monotone" 
            dataKey="margin" 
            stroke="#10b981" 
            strokeWidth={3}
            name="Profit Margin (%)"
            dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: '#10b981', strokeWidth: 2 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
} 