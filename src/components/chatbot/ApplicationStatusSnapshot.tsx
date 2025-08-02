'use client'

import React from 'react'
import { TrendingUp, AlertTriangle, ArrowRight, CheckCircle, Clock, FileText, DollarSign, Calendar } from 'lucide-react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

interface ApplicationStatusSnapshotProps {
  onExploreServices?: () => void
}

export default function ApplicationStatusSnapshot({ onExploreServices }: ApplicationStatusSnapshotProps) {
  const { language } = useLanguage()

  // Sample application data
  const applicationStats = {
    totalApplications: 4,
    approvedApplications: 1,
    processingApplications: 2,
    pendingApplications: 1,
    totalPotentialFunding: 'RM 25,000',
    averageProcessingTime: '12 days',
    nextDeadline: '2024-02-10'
  }

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Welcome Message */}
      <motion.div 
        className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 border border-green-100"
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
          {language === 'ms' 
            ? 'Status Permohonan Anda - Pandangan Keseluruhan' 
            : 'Your Application Status - Overview'
          }
        </motion.h4>
        
        {/* Application Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { 
              label: language === 'ms' ? 'Jumlah Permohonan' : 'Total Applications', 
              value: applicationStats.totalApplications.toString(), 
              color: 'text-blue-600',
              icon: FileText
            },
            { 
              label: language === 'ms' ? 'Diluluskan' : 'Approved', 
              value: applicationStats.approvedApplications.toString(), 
              color: 'text-green-600',
              icon: CheckCircle
            },
            { 
              label: language === 'ms' ? 'Sedang Diproses' : 'Processing', 
              value: applicationStats.processingApplications.toString(), 
              color: 'text-orange-600',
              icon: Clock
            },
            { 
              label: language === 'ms' ? 'Pembiayaan Potensi' : 'Potential Funding', 
              value: applicationStats.totalPotentialFunding, 
              color: 'text-purple-600',
              icon: DollarSign
            }
          ].map((item, index) => {
            const Icon = item.icon
            return (
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
                <div className="flex items-center space-x-2 mb-2">
                  <Icon className={`w-4 h-4 ${item.color}`} />
                  <div className="text-sm text-gray-600">{item.label}</div>
                </div>
                <div className={`text-lg font-bold ${item.color}`}>{item.value}</div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* Application Insights */}
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
          <h4 className="text-lg font-semibold text-gray-900">
            {language === 'ms' ? 'Analisis Permohonan' : 'Application Analysis'}
          </h4>
          <motion.div 
            className="flex items-center space-x-2 bg-green-50 text-green-700 px-3 py-1 rounded-full"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 1.4 }}
            whileHover={{ scale: 1.05 }}
          >
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-medium">
              {language === 'ms' ? 'Positif' : 'Positive'}
            </span>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6"
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
              <TrendingUp className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 2.0 }}
            >
              <p className="text-green-800 font-medium mb-1">
                {language === 'ms' ? 'Kemajuan Baik Dikesan' : 'Good Progress Detected'}
              </p>
              <p className="text-green-700 text-sm">
                {language === 'ms' 
                  ? `Purata masa pemprosesan anda ialah ${applicationStats.averageProcessingTime} — lebih cepat daripada purata industri. ${applicationStats.processingApplications} permohonan sedang diproses secara aktif.`
                  : `Your average processing time is ${applicationStats.averageProcessingTime} — faster than industry average. ${applicationStats.processingApplications} applications are actively being processed.`
                }
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Timeline Insights */}
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 2.2 }}
        >
          <h5 className="text-md font-medium text-gray-700 mb-3">
            {language === 'ms' ? 'Tahap Pemprosesan' : 'Processing Timeline'}
          </h5>
          <div className="space-y-3">
            {[
              { 
                stage: language === 'ms' ? 'Permohonan Dihantar' : 'Application Submitted', 
                percentage: 100, 
                color: 'bg-green-500',
                applications: 4
              },
              { 
                stage: language === 'ms' ? 'Dokumen Dikaji' : 'Document Review', 
                percentage: 75, 
                color: 'bg-blue-500',
                applications: 3
              },
              { 
                stage: language === 'ms' ? 'Kelulusan' : 'Approval', 
                percentage: 25, 
                color: 'bg-purple-500',
                applications: 1
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="flex items-center space-x-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 2.4 + (index * 0.1) }}
              >
                <div className="w-24 text-sm text-gray-600">{item.stage}</div>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className={`${item.color} h-2 rounded-full transition-all duration-700`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
                <div className="w-12 text-sm font-medium text-gray-700">
                  {item.applications}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Recommendations */}
      <motion.div 
        className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200"
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
          {language === 'ms' ? 'Cadangan Tindakan' : 'Recommended Actions'}
        </motion.h4>
        <motion.div 
          className="space-y-3 mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 2.8 }}
        >
          <div className="flex items-start space-x-3">
            <Calendar className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-gray-700 font-medium">
                {language === 'ms' ? 'Tarikh Tutup Seterusnya' : 'Next Deadline'}
              </p>
              <p className="text-sm text-gray-600">
                {language === 'ms' 
                  ? `Geran Digitalisasi PKS - ${applicationStats.nextDeadline}`
                  : `SME Digitalisation Grant - ${applicationStats.nextDeadline}`
                }
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-gray-700 font-medium">
                {language === 'ms' ? 'Tindakan Diperlukan' : 'Action Required'}
              </p>
              <p className="text-sm text-gray-600">
                {language === 'ms' 
                  ? 'Sila lengkapkan dokumen tambahan untuk permohonan TEKUN Nasional'
                  : 'Please complete additional documents for TEKUN Nasional application'
                }
              </p>
            </div>
          </div>
        </motion.div>
        
        {onExploreServices && (
          <motion.button
            onClick={onExploreServices}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
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
            <span>
              {language === 'ms' ? 'Jelajah Perkhidmatan Lain' : 'Explore Other Services'}
            </span>
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
        )}
      </motion.div>
    </motion.div>
  )
}