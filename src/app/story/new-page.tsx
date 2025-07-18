'use client'

import { useState, useEffect } from 'react'
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  ArrowUp,
  ArrowDown,
  TrendingUp,
  Sun,
  Moon,
  Zap,
  Award,
  BookOpen,
  Heart,
  Smile,
  Frown,
  Meh,
  Users,
  CreditCard,
  QrCode,
  Wallet,
  PiggyBank,
  Coins,
  ChevronLeft,
  ChevronRight,
  RefreshCw
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import {
  msmeBusinessProfile,
  msmeFinancialKPIs,
  msmeBankAccounts,
  msmePaymentMethodPerformance
} from '@/lib/msme-data'
import { formatCurrency, formatNumber } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import CountUp from 'react-countup'

// Improved MoneyJar component
const MoneyJar = ({
  id,
  label,
  amount,
  maxAmount,
  color,
  icon: Icon,
  emotion,
  showBalance
}) => {
  const fillPercentage = Math.min(100, (amount / maxAmount) * 100)

  const emotionData = {
    happy: { icon: <Smile className="text-green-400" />, color: 'shadow-green-500/50' },
    neutral: { icon: <Meh className="text-yellow-400" />, color: 'shadow-yellow-500/50' },
    sad: { icon: <Frown className="text-red-400" />, color: 'shadow-red-500/50' }
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -10 }}
      className="relative flex flex-col items-center p-4 rounded-2xl bg-white/50 backdrop-blur-sm shadow-lg transition-all duration-300"
    >
      <div
        className={`absolute top-2 right-2 p-1 bg-white/50 rounded-full ${emotionData[emotion].color}`}
      >
        {emotionData[emotion].icon}
      </div>
      <div className="relative w-28 h-40">
        {/* Jar */}
        <div className="absolute inset-0">
          <svg
            viewBox="0 0 100 150"
            className="w-full h-full"
            style={{ filter: 'drop-shadow(0 10px 8px rgba(0,0,0,0.1))' }}
          >
            {/* Jar body */}
            <path
              d="M10 10 C 10 0, 90 0, 90 10 V 140 C 90 150, 10 150, 10 140 V 10 Z"
              fill="rgba(255,255,255,0.3)"
              stroke="rgba(255,255,255,0.7)"
              strokeWidth="2"
            />
            {/* Lid */}
            <path
              d="M5 10 H 95 L 90 2 H 10 Z"
              fill={`url(#${id}-gradient)`}
            />
          </svg>
        </div>
        {/* Liquid */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 rounded-b-xl"
          style={{ height: `${fillPercentage}%` }}
          initial={{ height: 0 }}
          animate={{ height: `${fillPercentage}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to top, ${color[0]}, ${color[1]})`,
              opacity: 0.8
            }}
          />
          {/* Waves */}
          <svg
            className="absolute bottom-0 w-full"
            viewBox="0 0 100 10"
            preserveAspectRatio="none"
          >
            <motion.path
              d="M0 5 Q 25 10, 50 5 T 100 5"
              fill="none"
              stroke={color[1]}
              strokeWidth="3"
              animate={{
                d: [
                  'M0 5 Q 25 10, 50 5 T 100 5',
                  'M0 5 Q 25 0, 50 5 T 100 5',
                  'M0 5 Q 25 10, 50 5 T 100 5'
                ]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
          </svg>
        </motion.div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon className="h-10 w-10 text-white opacity-80" />
        </div>
      </div>
      <div className="text-center mt-4">
        <p className="text-lg font-bold text-gray-800">{label}</p>
        <AnimatePresence>
          {showBalance ? (
            <motion.p
              key="balance"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-700 to-black"
            >
              RM
              <CountUp
                end={amount}
                duration={1.5}
                separator=","
                decimals={amount % 1 !== 0 ? 2 : 0}
              />
            </motion.p>
          ) : (
            <motion.p
              key="hidden"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="text-2xl font-black text-gray-700"
            >
              •••••
            </motion.p>
          )}
        </AnimatePresence>
      </div>
      <svg className="absolute w-0 h-0">
        <defs>
          <linearGradient id={`${id}-gradient`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color[0]} />
            <stop offset="100%" stopColor={color[1]} />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  )
}

// Improved InteractiveStoryTimeline component
const NewInteractiveStoryTimeline = ({
  language,
  onAudioPlay,
  businessData
}) => {
  const [currentEventIndex, setCurrentEventIndex] = useState(0)

  const timelineEvents = [
    {
      id: 'morning',
      time: '7-9 AM',
      icon: Sun,
      title: language === 'ms' ? 'Pagi Ceria' : 'Good Morning',
      description:
        language === 'ms'
          ? 'Warung dibuka! Transaksi pertama masuk.'
          : 'Warung is open! First transactions are coming in.',
      audioText:
        language === 'ms'
          ? 'Pagi ceria, warung dibuka!'
          : 'Good morning, the warung is open!'
    },
    // ... add more events for midday, evening
    {
      id: 'midday',
      time: '12-2 PM',
      icon: Users,
      title: language === 'ms' ? 'Waktu Sibuk' : 'Peak Hours',
      description:
        language === 'ms'
          ? 'Pelanggan ramai, jualan meningkat!'
          : 'Lots of customers, sales are booming!',
      audioText:
        language === 'ms' ? 'Waktu sibuk!' : 'Peak hours!'
    },
    {
      id: 'evening',
      time: '6-8 PM',
      icon: Moon,
      title: language === 'ms' ? 'Waktu Petang' : 'Evening Wind-down',
      description:
        language === 'ms'
          ? 'Jualan terakhir, bersedia untuk tutup.'
          : 'Last sales, preparing to close.',
      audioText:
        language === 'ms' ? 'Waktu petang.' : 'Evening time.'
    }
  ]

  const currentEvent = timelineEvents[currentEventIndex]

  const goNext = () =>
    setCurrentEventIndex(i => (i + 1) % timelineEvents.length)
  const goPrev = () =>
    setCurrentEventIndex(i => (i - 1 + timelineEvents.length) % timelineEvents.length)

  return (
    <div className="relative w-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentEvent.id}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
          className="bg-white/60 backdrop-blur-md rounded-2xl p-6 shadow-xl flex items-center gap-6"
        >
          <div className="flex-shrink-0 text-6xl">
            <currentEvent.icon className="w-16 h-16 text-gray-800" />
          </div>
          <div>
            <p className="font-bold text-gray-500">{currentEvent.time}</p>
            <h3 className="text-2xl font-bold text-gray-900">{currentEvent.title}</h3>
            <p className="text-gray-700">{currentEvent.description}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto"
            onClick={() => onAudioPlay(currentEvent.audioText)}
          >
            <Volume2 className="w-6 h-6" />
          </Button>
        </motion.div>
      </AnimatePresence>
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-4">
        <Button onClick={goPrev} size="icon" className="rounded-full">
          <ChevronLeft />
        </Button>
        <Button onClick={goNext} size="icon" className="rounded-full">
          <ChevronRight />
        </Button>
      </div>
    </div>
  )
}

export default function NewStoryPage() {
  const { language, t } = useLanguage()
  const [hasError, setHasError] = useState(false)
  const [audioEnabled, setAudioEnabled] = useState(true)
  const [showBalance, setShowBalance] = useState(true)

  // Error handling
  useEffect(() => {
    const handleError = (error: ErrorEvent) => {
      console.error('Story page error:', error)
      setHasError(true)
    }

    window.addEventListener('error', handleError)
    return () => window.removeEventListener('error', handleError)
  }, [])

  if (hasError) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <Card className="p-8 max-w-md text-center">
          <CardHeader>
            <CardTitle>
              {language === 'ms' ? 'Ops! Ada masalah' : 'Oops! Something went wrong'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              {language === 'ms'
                ? 'Sila refresh halaman ini'
                : 'Please refresh this page'}
            </p>
            <Button onClick={() => window.location.reload()}>
              <RefreshCw className="mr-2 h-4 w-4" />
              {language === 'ms' ? 'Refresh' : 'Refresh'}
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Data processing
  const parseValue = (value) =>
    typeof value === 'string'
      ? parseFloat(value.replace(/[^\d.]/g, ''))
      : value

  const todayInflow =
    parseValue(
      msmeFinancialKPIs.find(kpi => kpi.id === 'daily_inflow')?.value
    ) || 1125
  const monthlyOutflow =
    parseValue(
      msmeFinancialKPIs.find(kpi => kpi.id === 'monthly_outflow')?.value
    ) || 10000
  const totalBalance =
    msmeBankAccounts?.reduce((sum, account) => sum + (account.balance || 0), 0) ||
    56751
  const todayOutflow = monthlyOutflow / 30
  const todayNetFlow = todayInflow - todayOutflow

  const moneyJars = [
    {
      id: 'inflow',
      label: language === 'ms' ? 'Wang Masuk Hari Ini' : "Today's Inflow",
      amount: todayInflow,
      maxAmount: 2000,
      color: ['#6EE7B7', '#10B981'],
      icon: Coins,
      emotion: todayInflow > 1500 ? 'happy' : todayInflow > 800 ? 'neutral' : 'sad'
    },
    {
      id: 'balance',
      label: language === 'ms' ? 'Baki Bank' : 'Bank Balance',
      amount: totalBalance,
      maxAmount: 100000,
      color: ['#60A5FA', '#2563EB'],
      icon: PiggyBank,
      emotion: totalBalance > 75000 ? 'happy' : totalBalance > 30000 ? 'neutral' : 'sad'
    },
    {
      id: 'netflow',
      label: language === 'ms' ? 'Aliran Bersih Hari Ini' : "Today's Net Flow",
      amount: todayNetFlow,
      maxAmount: 1800,
      color: ['#FBBF24', '#F59E0B'],
      icon: Award,
      emotion: todayNetFlow > 1000 ? 'happy' : todayNetFlow > 300 ? 'neutral' : 'sad'
    }
  ]

  const speakText = (text) => {
    if (!audioEnabled || !window.speechSynthesis) return
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = language === 'ms' ? 'ms-MY' : 'en-US'
    speechSynthesis.speak(utterance)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-100 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl shadow-md">
              <BookOpen className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-gray-800">
                {language === 'ms' ? 'Cerita Bisnes Anda' : 'Your Business Story'}
              </h1>
              <p className="text-sm text-gray-500">
                {language === 'ms'
                  ? 'Kisah kejayaan anda setiap hari'
                  : 'Your daily story of success'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setAudioEnabled(!audioEnabled)}
              className={audioEnabled ? 'text-green-500' : 'text-red-500'}
            >
              {audioEnabled ? <Volume2 /> : <VolumeX />}
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowBalance(!showBalance)}
            >
              {showBalance ? 'Hide Balance' : 'Show Balance'}
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
        {/* Greeting Section */}
        <section className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-extrabold text-gray-900"
          >
            {language === 'ms' ? 'Selamat Datang, Kak Siti!' : 'Welcome, Kak Siti!'}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-2 text-lg text-gray-600"
          >
            {language === 'ms'
              ? 'Ini cerita kewangan anda untuk hari ini.'
              : "Here's your financial story for today."}
          </motion.p>
        </section>

        {/* Money Jars Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {moneyJars.map((jar, index) => (
            <motion.div
              key={jar.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            >
              <MoneyJar {...jar} showBalance={showBalance} />
            </motion.div>
          ))}
        </section>

        {/* Story Timeline Section */}
        <section className="flex flex-col items-center space-y-8">
           <h2 className="text-3xl font-bold text-center text-gray-900">
            {language === 'ms' ? 'Perjalanan Hari Ini' : "Today's Journey"}
          </h2>
          <NewInteractiveStoryTimeline
            language={language}
            onAudioPlay={speakText}
            businessData={{ todaysSales: todayInflow, totalCustomers: 47, popularItems: [], peakHours: [] }}
          />
        </section>
        
        {/* Payment Methods Section */}
        <section>
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            {language === 'ms' ? 'Cara Bayaran Popular' : 'Popular Payment Methods'}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {msmePaymentMethodPerformance.slice(0, 4).map((method, i) => (
              <motion.div
                key={method.name}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
              >
                <Card className="text-center p-6 hover:shadow-xl transition-shadow">
                  <CardHeader>
                     <div className="text-4xl mx-auto mb-4">
                      {method.name.includes('QR') && '📱'}
                      {method.name.includes('Cash') && '💵'}
                      {method.name.includes('Card') && '💳'}
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

      </main>
    </div>
  )
} 