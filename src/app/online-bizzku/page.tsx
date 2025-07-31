"use client"

import { motion } from "framer-motion" 
import BusinessDashboard from "@/components/online-bizz/BusinessDashboard"
import BusinessResources from "@/components/online-bizz/BusinessResources"
import { 
  platforms, 
  connectedAccounts, 
  consolidatedStats, 
  helpResources, 
  quickStartGuides 
} from "@/lib/online-bizz-data"
import Iridescence from "@/components/backgrounds/Iridescence"

export default function OnlineBizzkuPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden py-10">
      <Iridescence
        color={[1, 1, 1]}
        mouseReact={false}
        amplitude={0.1}
        speed={1.0}
        className="absolute inset-0 z-[-1]"
      />
    
      <div className="relative z-10 min-h-screen">
        {/* Header with animations */}
        <motion.div 
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl mb-8"
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
                className="text-4xl font-bold mb-2"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <motion.span
                  initial={{ rotate: -10 }}
                  animate={{ rotate: 0 }}
                  transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                  className="inline-block"
                >
                  🚀
                </motion.span> Online BizzKu
              </motion.h1>
              <motion.p 
                className="text-xl text-blue-100 mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                Connect and manage all your online business platforms in one place
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
          {/* Business Dashboard Component (Overview, Connected Accounts, Available Platforms) */}
          <BusinessDashboard 
            platforms={platforms}
            connectedAccounts={connectedAccounts}
            consolidatedStats={consolidatedStats}
          />
          
          {/* Business Resources Component (Help Resources, Quick Start Guides) */}
          <BusinessResources 
            helpResources={helpResources}
            quickStartGuides={quickStartGuides}
          />
        </motion.div>
      </div>
    </div>
  )
}