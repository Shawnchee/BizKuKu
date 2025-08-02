"use client"

// import { HeroSection } from '@/components/sections'
import { OnboardingProgressBar } from '@/components/onboarding'
// import Iridescence from '@/components/backgrounds/Iridescence'
import GradientBackground from "@/components/backgrounds/GradientBackground"
import { motion } from "framer-motion" 
import { useLanguage } from '@/contexts/LanguageContext'


export default function ApplicationStatus() {
  const { language } = useLanguage()
  
  return (
    <div className="min-h-screen">
      {/* <HeroSection /> */}
      <section className="relative py-16 overflow-hidden -mt-6">
        <GradientBackground />
        <motion.div 
          className="bg-white/60 backdrop-blur-md border border-white/30 shadow-lg rounded-xl mb-8 mx-4 sm:mx-8"
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
                  {language === 'ms' ? 'Status Permohonan' : 'Application Status'}
                </span>
              </motion.h1>
              <motion.p 
                className="text-lg text-gray-700 mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
              {language === 'ms' ? 'Pantau kemajuan semua permohonan anda' : 'Track the progress of all your applications'}
            </motion.p>
            </div>
          </div>
        </motion.div>
        {/* <Iridescence
          color={[1, 1, 1]}
          mouseReact={true}
          amplitude={0.15}
          speed={0.8}
          className="absolute inset-0"
        /> */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <OnboardingProgressBar />
        </div>
      </section>
    </div>
  )
}
