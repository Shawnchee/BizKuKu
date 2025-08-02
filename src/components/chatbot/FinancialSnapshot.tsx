'use client'

import React from 'react'
import { TrendingDown, AlertTriangle, ArrowRight } from 'lucide-react'
import LineChart from '../charts/LineChart'
import { ChartData } from '@/lib/types'
import { motion } from 'framer-motion'

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
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Welcome Message */}
      <motion.div 
        className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <motion.h4 
          className="text-xl font-bold text-gray-900 mb-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Welcome back! Here's your financial snapshot for today:
        </motion.h4>
        {/* Daily Financial Insights */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {[
            { label: 'Revenue Today', value: 'RM 1,250.00', color: 'text-green-600' },
            { label: 'Transactions', value: '32', color: 'text-purple-600' },
            { label: 'Top Product', value: 'Nasi Lemak Combo', color: 'text-blue-600' },
            { label: 'Payment Method', value: '65% DuitNow QR', color: 'text-orange-600' }
          ].map((item, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.4, 
                delay: 0.6 + (index * 0.1),
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                scale: 1.02, 
                boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                transition: { duration: 0.2 }
              }}
            >
              <div className="text-sm text-gray-600 mb-1">{item.label}</div>
              <div className={`text-base font-bold ${item.color}`}>{item.value}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Monthly Outlook & Forecast */}
      <motion.div 
        className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.0 }}
      >
        <motion.div 
          className="flex items-center justify-between mb-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          <h4 className="text-lg font-semibold text-gray-900">Monthly Outlook & Forecast</h4>
          <motion.div 
            className="flex items-center space-x-2 bg-red-50 text-red-700 px-3 py-1 rounded-full"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 1.4 }}
            whileHover={{ scale: 1.05 }}
          >
            <AlertTriangle className="w-4 h-4" />
            <span className="text-sm font-medium">Alert</span>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.6 }}
        >
          <div className="flex items-start space-x-3">
            <motion.div
              initial={{ rotate: -10, scale: 0.8 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.8 }}
            >
              <TrendingDown className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 2.0 }}
            >
              <p className="text-red-800 font-medium mb-1">Downward Trend Detected</p>
              <p className="text-red-700 text-sm">
                You're projected to earn <span className="font-bold">RM 6,500</span> next month — 
                <span className="font-bold text-red-800"> 8% lower</span> than your monthly average, 
                possibly due to seasonal slowdowns.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Forecast Chart */}
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 2.2 }}
        >
          <h5 className="text-md font-medium text-gray-700 mb-3">Monthly Revenue Forecast</h5>
          <LineChart 
            data={forecastData} 
            dataKey="value" 
            color="#ef4444"
            title=""
          />
        </motion.div>
      </motion.div>

      {/* Suggested Action */}
      <motion.div 
        className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 border border-green-200"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 2.4 }}
      >
        <motion.h4 
          className="text-lg font-semibold text-gray-900 mb-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 2.6 }}
        >
          Suggested Action
        </motion.h4>
        <motion.p 
          className="text-gray-700 mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 2.8 }}
        >
          To maintain cash flow and invest in growth, we recommend applying for a business grant 
          to boost your working capital.
        </motion.p>
        
        <motion.button
          onClick={onExploreGrants}
          className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:from-green-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ 
            duration: 0.5, 
            delay: 3.0,
            type: "spring",
            stiffness: 100
          }}
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
            transition: { duration: 0.2 }
          }}
          whileTap={{ scale: 0.95 }}
        >
          <span>Explore Recommended Grants</span>
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: [0, 5, 0] }}
            transition={{ 
              duration: 1.5, 
              delay: 3.5,
              repeat: Infinity,
              repeatDelay: 2
            }}
          >
            <ArrowRight className="w-4 h-4" />
          </motion.div>
        </motion.button>
      </motion.div>
    </motion.div>
  )
} 