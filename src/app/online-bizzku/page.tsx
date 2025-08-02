"use client"

import { motion } from "framer-motion"
import BusinessDashboard from "@/components/online-bizz/BusinessDashboard"
import { useLanguage } from "@/contexts/LanguageContext"
import {
  connectedAccounts,
  consolidatedStats
} from "@/lib/online-bizz-data"
import GradientBackground from "@/components/backgrounds/GradientBackground"


export default function OnlineBizzkuPage() {
  const { t } = useLanguage()

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden py-10">
      <GradientBackground />

      <div className="relative z-10 min-h-screen">
        {/* Header with animations */}
        <motion.div 
          className="bg-white/60 backdrop-blur-md border border-white/30 shadow-lg rounded-xl mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 100, 
            damping: 20,
            duration: 0.6 
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <motion.h1 
                className="text-4xl font-bold mb-4"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <span className="bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
                  {t('online_business.title')}
                </span>
              </motion.h1>
              <motion.p
                className="text-lg text-gray-700 mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                {t('online_business.subtitle')}
              </motion.p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {/* Business Dashboard Component (Overview, Connected Accounts) */}
          <BusinessDashboard 
            connectedAccounts={connectedAccounts}
            consolidatedStats={consolidatedStats}
          />
        </motion.div>
      </div>
    </div>
  )
}