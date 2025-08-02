'use client'

import { useState, useEffect, Suspense } from 'react'
import {
  Volume2,
  VolumeX,
  BookOpen,
  RefreshCw,
  Eye,
  EyeOff
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { useUser } from '@/contexts/UserContext'
import { msmePaymentMethodPerformance, msmeConsolidatedFinancialData } from '@/lib/msme-data'
import { useStoryData } from '@/hooks/useStoryData'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import RefinedMoneyJar from '@/components/story/RefinedMoneyJar'
import RefinedStoryTimeline from '@/components/story/RefinedStoryTimeline'
import CreditScoreSection from '@/components/dashboard/CreditScoreSection'
import EducationalModal from '@/components/story/EducationalModal'
import CountUp from 'react-countup'
import Link from 'next/link'
import GradientBackground from "@/components/backgrounds/GradientBackground"

const ErrorFallback = ({ onRefresh, language }: { onRefresh: () => void, language: string }) => (
  <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
    <Card className="p-8 max-w-md text-center shadow-2xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-red-600">
          {language === 'ms' ? 'Ops! Ada masalah' : 'Oops! Something went wrong'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-6">
          {language === 'ms'
            ? 'Sila muat semula halaman ini.'
            : 'Please refresh this page.'}
        </p>
        <Button onClick={onRefresh}>
          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
          {language === 'ms' ? 'Muat Semula' : 'Refresh'}
        </Button>
      </CardContent>
    </Card>
  </div>
)

export default function StoryPage() {
  const { language } = useLanguage()
  const [hasError, setHasError] = useState(false)
  const [audioEnabled, setAudioEnabled] = useState(true)
  const [showBalance, setShowBalance] = useState(true)
  const [selectedJar, setSelectedJar] = useState<any>(null)
  const storyData = useStoryData()

  useEffect(() => {
    const handleError = (error: ErrorEvent) => {
      console.error('Story page error:', error)
      setHasError(true)
    }

    window.addEventListener('error', handleError)
    return () => window.removeEventListener('error', handleError)
  }, [])

  const speakText = (text: string) => {
    if (!audioEnabled || !window.speechSynthesis) return
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = language === 'ms' ? 'ms-MY' : 'en-US'
    speechSynthesis.speak(utterance)
  }

  if (hasError) {
    return <ErrorFallback onRefresh={() => window.location.reload()} language={language} />
  }

  return (
    <div className="min-h-screen font-sans">
      <GradientBackground />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-20">
        <section className="flex flex-col items-center space-y-12">
           <h2 className="text-3xl font-bold text-center text-gray-900">
            {language === 'ms' ? 'Perjalanan Hari Ini' : "Today's Journey"}
          </h2>
          <Suspense fallback={<div>Loading timeline...</div>}>
            <RefinedStoryTimeline
                language={language}
                onAudioPlay={speakText}
                events={storyData.timelineEvents}
            />
          </Suspense>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {storyData.moneyJars.map((jar, index) => (
            <motion.div
              key={jar.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              onClick={() => setSelectedJar(jar)}
              className="cursor-pointer"
            >
              <RefinedMoneyJar {...jar} showBalance={showBalance} />
            </motion.div>
          ))}
        </section>

        {/* Credit Score & Business Health Section */}
        <motion.section
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 mb-16"
        >
          <CreditScoreSection
            creditScoreData={msmeConsolidatedFinancialData.creditScore!}
            businessHealth={msmeConsolidatedFinancialData.businessHealth!}
          />
        </motion.section>

        
        <section>
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            {language === 'ms' ? 'Cara Bayaran Popular' : 'Popular Payment Methods'}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {msmePaymentMethodPerformance.slice(0, 4).map((method, i) => (
              <motion.div
                key={method.name}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                whileHover={{ y: -5, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}
                className="h-full"
              >
                <Card className="text-center p-6 transition-shadow h-full flex flex-col justify-between">
                  <CardHeader>
                     <div className="text-5xl mx-auto mb-4">
                      {method.name.includes('QR') && '📱'}
                      {method.name.includes('Cash') && '💵'}
                      {method.name.includes('Card') && '💳'}
                      {!method.name.includes('QR') && !method.name.includes('Cash') && !method.name.includes('Card') && '✨'}
                    </div>
                    <CardTitle>{method.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold text-blue-600">
                       <CountUp end={method.value} duration={2} />
                    </p>
                    <p className="text-sm text-gray-500">
                      {language === 'ms' ? 'transaksi' : 'transactions'}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{language === 'ms' ? 'Terokai Lebih Lanjut' : 'Explore More'}</h2>
            <p className="text-gray-600 mb-8">{language === 'ms' ? 'Dapatkan pandangan yang lebih mendalam tentang perniagaan anda.' : 'Get deeper insights into your business.'}</p>
            <div className="flex justify-center gap-4">
                <Link href="/financial-report" passHref>
                    <Button size="lg" variant="primary">{language === 'ms' ? 'Laporan Kewangan Terperinci' : 'Detailed Financial Report'}</Button>
                </Link>
                <Link href="/open-finance" passHref>
                    <Button size="lg" variant="secondary">{language === 'ms' ? 'Kewangan Terbuka' : 'Open Finance'}</Button>
                </Link>
            </div>
        </section>
      </main>

      <AnimatePresence>
        {selectedJar && (
            <EducationalModal 
                isOpen={!!selectedJar}
                onClose={() => setSelectedJar(null)}
                title={selectedJar.label}
                data={selectedJar.historicalData}
                metric={selectedJar.metric}
                explanation={selectedJar.explanation}
                status={selectedJar.status}
            />
        )}
      </AnimatePresence>
    </div>
  )
}