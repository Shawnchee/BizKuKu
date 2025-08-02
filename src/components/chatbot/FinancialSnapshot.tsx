'use client'

import React from 'react'
import { TrendingDown, AlertTriangle, ArrowRight } from 'lucide-react'
import LineChart from '../charts/LineChart'
import { ChartData } from '@/lib/types'

interface FinancialSnapshotProps {
  onExploreGrants: () => void
}

export default function FinancialSnapshot({ onExploreGrants }: FinancialSnapshotProps) {
  // Sample data for the monthly forecast chart
  const forecastData: ChartData[] = [
    { name: 'Jan', value: 7200 },
    { name: 'Feb', value: 6800 },
    { name: 'Mar', value: 7100 },
    { name: 'Apr', value: 6900 },
    { name: 'May', value: 6500 },
    { name: 'Jun', value: 6200 },
    { name: 'Jul', value: 6500 },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Message */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
        <h4 className="text-xl font-bold text-gray-900 mb-4">
          Welcome back! Here's your financial snapshot for today:
        </h4>
        {/* Daily Financial Insights */}
        <div className="grid grid-cols-2 gap-4 mb-6"> {/* Changed to grid-cols-2 */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="text-sm text-gray-600 mb-1">Revenue Today</div>
            <div className="text-base font-bold text-green-600">RM 1,250.00</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="text-sm text-gray-600 mb-1">Transactions</div>
            <div className="text-base font-bold text-purple-600">32</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="text-sm text-gray-600 mb-1">Top Product</div>
            <div className="text-base font-bold text-blue-600">Nasi Lemak Combo</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="text-sm text-gray-600 mb-1">Payment Method</div>
            <div className="text-base font-bold text-orange-600">65% DuitNow QR</div>
          </div>
        </div>
      </div>

      {/* Monthly Outlook & Forecast */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-semibold text-gray-900">Monthly Outlook & Forecast</h4>
          <div className="flex items-center space-x-2 bg-red-50 text-red-700 px-3 py-1 rounded-full">
            <AlertTriangle className="w-4 h-4" />
            <span className="text-sm font-medium">Alert</span>
          </div>
        </div>
        
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
          <div className="flex items-start space-x-3">
            <TrendingDown className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-red-800 font-medium mb-1">Downward Trend Detected</p>
              <p className="text-red-700 text-sm">
                You're projected to earn <span className="font-bold">RM 6,500</span> next month — 
                <span className="font-bold text-red-800"> 8% lower</span> than your monthly average, 
                possibly due to seasonal slowdowns.
              </p>
            </div>
          </div>
        </div>

        {/* Forecast Chart */}
        <div className="mb-6">
          <h5 className="text-md font-medium text-gray-700 mb-3">Monthly Revenue Forecast</h5>
          <LineChart 
            data={forecastData} 
            dataKey="value" 
            color="#ef4444"
            title=""
          />
        </div>
      </div>

      {/* Suggested Action */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 border border-green-200">
        <h4 className="text-lg font-semibold text-gray-900 mb-3">Suggested Action</h4>
        <p className="text-gray-700 mb-4">
          To maintain cash flow and invest in growth, we recommend applying for a business grant 
          to boost your working capital.
        </p>
        
        <button
          onClick={onExploreGrants}
          className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:from-green-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
        >
          <span>Explore Recommended Grants</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
} 