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
import { BusinessMetrics } from '@/lib/types'

interface BusinessOnboardingChartProps {
  data: BusinessMetrics[]
  title?: string
  height?: number
}

export default function BusinessOnboardingChart({ data, title, height = 400 }: BusinessOnboardingChartProps) {
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
      const completionData = payload.find((p) => p.dataKey === 'completionRate')
      const dropOffData = payload.find((p) => p.dataKey === 'dropOffRate')
      const satisfactionData = payload.find((p) => p.dataKey === 'satisfactionScore')
      const timeData = payload.find((p) => p.dataKey === 'averageTime')
      
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg min-w-[250px]">
          <p className="font-semibold text-gray-900 mb-2">{label}</p>
          
          {completionData && (
            <div className="flex items-center gap-2 mb-1">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-sm text-gray-600">Completion Rate:</span>
              <span className="text-sm font-medium text-gray-900">
                {completionData.value.toFixed(1)}%
              </span>
            </div>
          )}
          
          {dropOffData && (
            <div className="flex items-center gap-2 mb-1">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <span className="text-sm text-gray-600">Drop-off Rate:</span>
              <span className="text-sm font-medium text-gray-900">
                {dropOffData.value.toFixed(1)}%
              </span>
            </div>
          )}
          
          {satisfactionData && (
            <div className="flex items-center gap-2 mb-1">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <span className="text-sm text-gray-600">Satisfaction:</span>
              <span className="text-sm font-medium text-gray-900">
                {satisfactionData.value.toFixed(1)}/5.0
              </span>
            </div>
          )}
          
          {timeData && (
            <div className="flex items-center gap-2 mb-1">
              <div className="w-3 h-3 rounded-full bg-purple-500" />
              <span className="text-sm text-gray-600">Avg Time:</span>
              <span className="text-sm font-medium text-gray-900">
                {timeData.value.toFixed(1)} mins
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
          margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="name" 
            stroke="#6b7280"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            angle={-45}
            textAnchor="end"
            height={60}
            interval={0}
          />
          <YAxis 
            yAxisId="left"
            stroke="#6b7280"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}%`}
            domain={[0, 100]}
          />
          <YAxis 
            yAxisId="right"
            orientation="right"
            stroke="#6b7280"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}`}
            domain={[0, 5]}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          
          <Bar 
            yAxisId="left"
            dataKey="completionRate" 
            fill="#10b981" 
            name="Completion Rate (%)"
            radius={[2, 2, 0, 0]}
          />
          <Bar 
            yAxisId="left"
            dataKey="dropOffRate" 
            fill="#ef4444" 
            name="Drop-off Rate (%)"
            radius={[2, 2, 0, 0]}
          />
          <Line 
            yAxisId="right"
            type="monotone" 
            dataKey="satisfactionScore" 
            stroke="#3b82f6" 
            strokeWidth={3}
            name="Satisfaction Score"
            dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
      
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-sm font-medium text-green-800">Best Performing Step</span>
          </div>
          <div className="text-lg font-bold text-green-900">
            {data.reduce((max, item) => 
              item.completionRate > max.completionRate ? item : max
            ).name}
          </div>
          <div className="text-sm text-green-700">
            {data.reduce((max, item) => 
              item.completionRate > max.completionRate ? item : max
            ).completionRate.toFixed(1)}% completion rate
          </div>
        </div>
        
        <div className="bg-red-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <span className="text-sm font-medium text-red-800">Needs Improvement</span>
          </div>
          <div className="text-lg font-bold text-red-900">
            {data.reduce((min, item) => 
              item.completionRate < min.completionRate ? item : min
            ).name}
          </div>
          <div className="text-sm text-red-700">
            {data.reduce((min, item) => 
              item.completionRate < min.completionRate ? item : min
            ).dropOffRate.toFixed(1)}% drop-off rate
          </div>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <span className="text-sm font-medium text-blue-800">Highest Satisfaction</span>
          </div>
          <div className="text-lg font-bold text-blue-900">
            {data.reduce((max, item) => 
              item.satisfactionScore > max.satisfactionScore ? item : max
            ).name}
          </div>
          <div className="text-sm text-blue-700">
            {data.reduce((max, item) => 
              item.satisfactionScore > max.satisfactionScore ? item : max
            ).satisfactionScore.toFixed(1)}/5.0 rating
          </div>
        </div>
      </div>
    </div>
  )
} 