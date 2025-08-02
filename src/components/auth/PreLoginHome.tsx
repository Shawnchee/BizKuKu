'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowRight, Shield, UserPlus } from 'lucide-react'
import Iridescence from '@/components/backgrounds/Iridescence'
import { Button } from '@/components/ui/Button'

const PreLoginHome = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleLoginClick = async () => {
    setIsLoading(true)
    // Add a small delay for better UX
    setTimeout(() => {
      router.push('/login')
    }, 500)
  }

  const handleRegisterClick = async () => {
    setIsLoading(true)
    // Add a small delay for better UX
    setTimeout(() => {
      router.push('/register')
    }, 500)
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <Iridescence
        color={[1, 1, 1]}
        mouseReact={false}
        amplitude={0.1}
        speed={1.0}
        className="absolute inset-0"
      />
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          {/* Clean Brand Title */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-16"
          >
            <h1 className="text-6xl md:text-8xl font-bold text-black mb-6">
              <span className="bg-gradient-to-r from-black via-purple-800 to-blue-800 bg-clip-text text-transparent">
                BizKuKu
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-black/80 font-light max-w-xl mx-auto leading-relaxed">
              Your Complete MSME Business Platform
            </p>
          </motion.div>

          {/* Dual CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            <div className="flex flex-col gap-4 justify-center items-center">
              <Button
                onClick={handleLoginClick}
                disabled={isLoading}
                className="group relative px-12 py-6 text-xl font-semibold text-white bg-black/80 hover:bg-black/90 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="relative z-10 flex items-center gap-3">
                  {isLoading ? (
                    <>
                      <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Connecting...
                    </>
                  ) : (
                    <>
                      <Shield className="w-6 h-6" />
                      Log in with SSM Passport
                      <ArrowRight className="w-6 h-6 transform group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </span>
                
                {/* Button glow effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300" />
              </Button>

              <Button
                onClick={handleRegisterClick}
                disabled={isLoading}
                className="group relative px-12 py-6 text-xl font-semibold text-black bg-white/90 hover:bg-white rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed border-2 border-black/10"
              >
                <span className="relative z-10 flex items-center gap-3">
                  {isLoading ? (
                    <>
                      <div className="w-6 h-6 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      Connecting...
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-6 h-6" />
                      Create New Account
                      <ArrowRight className="w-6 h-6 transform group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </span>
                
                {/* Button glow effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-300" />
              </Button>
            </div>

            <p className="text-black/60 text-sm">
              Secure • Fast • Malaysian Government Approved
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default PreLoginHome