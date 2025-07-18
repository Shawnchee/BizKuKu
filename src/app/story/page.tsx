'use client'

import { useState, useEffect } from 'react'
import { Volume2, VolumeX, Play, Pause, ArrowUp, ArrowDown, TrendingUp, TrendingDown, Clock, Calendar, MapPin, Star, Coffee, Users, ShoppingCart, Utensils, DollarSign, PieChart, Eye, EyeOff, RefreshCw, ChevronRight, ChevronLeft, BookOpen, Heart, Smile, Frown, Meh, Sun, Moon, Zap, Award, Target, Gift, Sparkles, Coins, Wallet, PiggyBank, Building2, Home, Store, Truck, Phone, MessageCircle, Share2, Camera, Music, Headphones, Mic } from 'lucide-react'
import MoneyJarAnimation from '@/components/story/MoneyJarAnimation'
import FoodStoryCard from '@/components/story/FoodStoryCard'
import InteractiveStoryTimeline from '@/components/story/InteractiveStoryTimeline'
import { Card } from '@/components/ui'
import { Button } from '@/components/ui'
import { useLanguage } from '@/contexts/LanguageContext'
import { msmeBusinessProfile, msmeKPIData, msmeFinancialKPIs, msmeBankAccounts, msmeTransactions, msmeDailySalesPattern, msmeRevenueBreakdown, msmeMenuPerformance, msmeCustomerDemographics } from '@/lib/msme-data'
import { formatCurrency, formatNumber } from '@/lib/utils'

export default function StoryPage() {
  const { language, t } = useLanguage()
  
  // Error boundary state
  const [hasError, setHasError] = useState(false)
  
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
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-green-50 flex items-center justify-center">
        <Card className="p-8 max-w-md text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {language === 'ms' ? 'Ops! Ada masalah' : 'Oops! Something went wrong'}
          </h2>
          <p className="text-gray-600 mb-4">
            {language === 'ms' ? 'Sila refresh halaman ini' : 'Please refresh this page'}
          </p>
          <Button onClick={() => window.location.reload()}>
            {language === 'ms' ? 'Refresh' : 'Refresh'}
          </Button>
        </Card>
      </div>
    )
  }
  const [currentStory, setCurrentStory] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioEnabled, setAudioEnabled] = useState(true)
  const [animationStep, setAnimationStep] = useState(0)
  const [hoveredJar, setHoveredJar] = useState<string | null>(null)
  const [showBalance, setShowBalance] = useState(true)
  const [currentTimeframe, setCurrentTimeframe] = useState<'today' | 'week' | 'month'>('today')
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  // Story data based on real business metrics
  const todaysSalesKPI = msmeFinancialKPIs.find(kpi => kpi.id === 'daily_sales')
  const monthlyProfitKPI = msmeFinancialKPIs.find(kpi => kpi.id === 'monthly_profit')
  
  // Extract numeric values from formatted strings
  const todaysSales = todaysSalesKPI ? parseFloat(todaysSalesKPI.value.replace(/[^\d.]/g, '')) : 1125
  const monthlyRevenue = monthlyProfitKPI ? parseFloat(monthlyProfitKPI.value.replace(/[^\d.]/g, '')) : 12750
  const totalBalance = msmeBankAccounts && msmeBankAccounts.length > 0 
    ? msmeBankAccounts.reduce((sum, account) => sum + (account.balance || 0), 0)
    : 15420 // Fallback value
  const todayProfit = todaysSales * 0.3 // 30% profit margin
  const weeklyProfit = todayProfit * 7
  const monthlyProfit = monthlyRevenue * 0.3



  // Visual metaphors for money (jars)
  const moneyJars = [
    {
      id: 'daily',
      label: language === 'ms' ? 'Duit Hari Ini' : 'Today\'s Money',
      amount: todaysSales,
      color: 'from-green-400 to-green-600',
      icon: Coins,
      emotion: todaysSales > 800 ? 'happy' : todaysSales > 500 ? 'neutral' : 'sad'
    },
    {
      id: 'savings',
      label: language === 'ms' ? 'Simpanan' : 'Savings',
      amount: totalBalance,
      color: 'from-blue-400 to-blue-600',
      icon: PiggyBank,
      emotion: totalBalance > 10000 ? 'happy' : totalBalance > 5000 ? 'neutral' : 'sad'
    },
    {
      id: 'profit',
      label: language === 'ms' ? 'Untung' : 'Profit',
      amount: todayProfit,
      color: 'from-yellow-400 to-yellow-600',
      icon: Award,
      emotion: todayProfit > 200 ? 'happy' : todayProfit > 100 ? 'neutral' : 'sad'
    }
  ]

  // Story sections
  const storySection = [
    {
      id: 'greeting',
      title: language === 'ms' ? 'Selamat Pagi, Kak Siti!' : 'Good Morning, Kak Siti!',
      content: language === 'ms' ? 'Mari kita tengok cerita warung hari ini' : 'Let\'s see today\'s warung story',
      icon: Sun,
      color: 'from-orange-400 to-pink-500'
    },
    {
      id: 'money',
      title: language === 'ms' ? 'Balang Duit Kita' : 'Our Money Jars',
      content: language === 'ms' ? 'Tengok berapa duit dalam setiap balang' : 'See how much money in each jar',
      icon: Wallet,
      color: 'from-green-400 to-teal-500'
    },
    {
      id: 'customers',
      title: language === 'ms' ? 'Pelanggan Hari Ini' : 'Today\'s Customers',
      content: language === 'ms' ? 'Berapa orang datang makan?' : 'How many people came to eat?',
      icon: Users,
      color: 'from-blue-400 to-purple-500'
    },
    {
      id: 'food',
      title: language === 'ms' ? 'Makanan Popular' : 'Popular Food',
      content: language === 'ms' ? 'Nasi lemak mana yang paling laris?' : 'Which nasi lemak sells the most?',
      icon: Utensils,
      color: 'from-red-400 to-pink-500'
    }
  ]

  const menuItems = msmeMenuPerformance && msmeMenuPerformance.length > 0 
    ? msmeMenuPerformance.map(item => ({
        ...item,
        // Convert monthly values to daily values (divide by 30)
        soldToday: Math.floor((item.value || 0) / 30),
        price: item.name?.includes('Teh') || item.name?.includes('Kopi') ? 2.5 : 
               item.name?.includes('Extra') ? 1.0 : 6.5, // Default prices
        visual: item.name?.includes('Classic') ? '🍽️' : 
               item.name?.includes('Ayam') ? '🍗' : 
               item.name?.includes('Rendang') ? '🍛' : 
               item.name?.includes('Sambal') ? '🌶️' : 
               item.name?.includes('Teh') ? '🍵' : 
               item.name?.includes('Kopi') ? '☕' : '🥤'
      }))
    : [
        // Fallback menu items
        { name: 'Nasi Lemak Classic', soldToday: 15, price: 6.5, visual: '🍽️', value: 450 },
        { name: 'Nasi Lemak Ayam', soldToday: 6, price: 6.5, visual: '🍗', value: 195 },
        { name: 'Teh Tarik', soldToday: 6, price: 2.5, visual: '🍵', value: 180 },
        { name: 'Kopi O', soldToday: 4, price: 2.5, visual: '☕', value: 120 },
        { name: 'Extra Egg', soldToday: 3, price: 1.0, visual: '🥚', value: 85 },
        { name: 'Nasi Lemak Sotong', soldToday: 2, price: 6.5, visual: '🦑', value: 60 }
      ]

  // Audio synthesis for text-to-speech
  const speakText = (text: string) => {
    if (!audioEnabled) return
    
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = language === 'ms' ? 'ms-MY' : 'en-US'
      utterance.rate = 0.8
      utterance.pitch = 1.1
      speechSynthesis.speak(utterance)
    }
  }

  // Animation sequence
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationStep(prev => (prev + 1) % 4)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  // Emotion component for visual feedback
  const EmotionFace = ({ emotion }: { emotion: string }) => {
    const faces = {
      happy: <Smile className="h-8 w-8 text-green-500" />,
      neutral: <Meh className="h-8 w-8 text-yellow-500" />,
      sad: <Frown className="h-8 w-8 text-red-500" />
    }
    return faces[emotion as keyof typeof faces] || faces.neutral
  }



  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-green-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-orange-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                  {language === 'ms' ? 'Cerita Warung Kita' : 'Our Warung Story'}
                </h1>
                <p className="text-gray-600 text-sm">
                  {language === 'ms' ? 'Tengok cerita bisnes hari ini dengan mudah' : 'See today\'s business story easily'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={() => setAudioEnabled(!audioEnabled)}
                className={`flex items-center gap-2 ${audioEnabled ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}
              >
                {audioEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                {language === 'ms' ? 'Suara' : 'Audio'}
              </Button>
              
              <Button
                variant="outline"
                onClick={() => setShowBalance(!showBalance)}
                className="flex items-center gap-2"
              >
                {showBalance ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                {language === 'ms' ? 'Sorok' : 'Hide'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Greeting Section */}
        <Card className="overflow-hidden bg-gradient-to-r from-orange-500 to-pink-500 text-white">
          <div className="p-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 rounded-full">
                  <Sun className="h-8 w-8" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold mb-2">
                    {language === 'ms' ? 'Selamat Pagi, Kak Siti!' : 'Good Morning, Kak Siti!'}
                  </h2>
                  <p className="text-orange-100 text-lg">
                    {language === 'ms' ? 'Mari kita tengok cerita warung hari ini' : 'Let\'s see today\'s warung story'}
                  </p>
                </div>
              </div>
              
              <Button
                variant="outline"
                className="bg-white/20 border-white/30 text-white hover:bg-white/30"
                onClick={() => speakText(language === 'ms' ? 'Selamat pagi Kak Siti! Mari kita tengok cerita warung hari ini' : 'Good morning Kak Siti! Let\'s see today\'s warung story')}
              >
                <Volume2 className="h-5 w-5" />
              </Button>
            </div>
            
            {/* Weather and mood */}
            <div className="mt-6 flex items-center gap-6">
              <div className="flex items-center gap-2 text-orange-100">
                <Sun className="h-5 w-5" />
                <span>{language === 'ms' ? 'Cuaca cerah' : 'Sunny weather'}</span>
              </div>
              <div className="flex items-center gap-2 text-orange-100">
                <Heart className="h-5 w-5" />
                <span>{language === 'ms' ? 'Mood baik' : 'Good mood'}</span>
              </div>
              <div className="flex items-center gap-2 text-orange-100">
                <Users className="h-5 w-5" />
                <span>{language === 'ms' ? 'Ramai pelanggan' : 'Many customers'}</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Money Jars Section */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {language === 'ms' ? '💰 Balang Duit Kita' : '💰 Our Money Jars'}
            </h2>
            <p className="text-gray-600 text-lg">
              {language === 'ms' ? 'Tengok berapa duit dalam setiap balang' : 'See how much money in each jar'}
            </p>
            <Button
              variant="outline"
              className="mt-2"
              onClick={() => speakText(language === 'ms' ? 'Balang duit kita. Tengok berapa duit dalam setiap balang' : 'Our money jars. See how much money in each jar')}
            >
              <Volume2 className="h-4 w-4 mr-2" />
              {language === 'ms' ? 'Dengar' : 'Listen'}
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {moneyJars.map((jar, index) => (
              <div key={jar.id} className="flex justify-center">
                <MoneyJarAnimation
                  amount={jar.amount}
                  maxAmount={jar.id === 'savings' ? 20000 : jar.id === 'daily' ? 2000 : 1000}
                  color={jar.color}
                  icon={jar.icon}
                  emotion={jar.emotion}
                  label={jar.label}
                  isActive={hoveredJar === jar.id}
                  onHover={(isHovered) => setHoveredJar(isHovered ? jar.id : null)}
                  onClick={() => speakText(`${jar.label}: ${formatCurrency(jar.amount)}`)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Today's Story Summary */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">
                {language === 'ms' ? '📖 Cerita Hari Ini' : '📖 Today\'s Story'}
              </h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => speakText(language === 'ms' ? 
                  `Cerita hari ini: Kak Siti jual nasi lemak dan dapat ${formatCurrency(todaysSales)}. Untung hari ini ${formatCurrency(todayProfit)}.` :
                  `Today's story: Kak Siti sold nasi lemak and earned ${formatCurrency(todaysSales)}. Today's profit is ${formatCurrency(todayProfit)}.`
                )}
              >
                <Volume2 className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="text-2xl">🍽️</div>
                <p className="text-gray-700">
                  {language === 'ms' ? 
                    `Kak Siti jual nasi lemak dan dapat ${formatCurrency(todaysSales)} hari ini.` :
                    `Kak Siti sold nasi lemak and earned ${formatCurrency(todaysSales)} today.`
                  }
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="text-2xl">💰</div>
                <p className="text-gray-700">
                  {language === 'ms' ? 
                    `Untung hari ini ${formatCurrency(todayProfit)}.` :
                    `Today's profit is ${formatCurrency(todayProfit)}.`
                  }
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="text-2xl">👥</div>
                <p className="text-gray-700">
                  {language === 'ms' ? 
                    `Ramai pelanggan datang, terutama pekerja ofis dan penduduk kawasan.` :
                    `Many customers came, especially office workers and local residents.`
                  }
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Popular Food Section */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {language === 'ms' ? '🍽️ Makanan Popular' : '🍽️ Popular Food'}
            </h2>
            <p className="text-gray-600 text-lg">
              {language === 'ms' ? 'Nasi lemak mana yang paling laris?' : 'Which nasi lemak sells the most?'}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems.slice(0, 6).map((item, index) => (
              <FoodStoryCard
                key={item.name}
                name={item.name}
                visual={item.visual}
                soldToday={item.soldToday}
                price={item.price}
                isPopular={index === 0} // First item is most popular
                customerFeedback={index === 0 ? 'excellent' : index < 3 ? 'good' : 'average'}
                language={language}
                onAudioPlay={speakText}
              />
            ))}
          </div>
        </div>

        {/* Simple Comparison */}
        <Card className="bg-gradient-to-r from-green-50 to-teal-50 border-green-200">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">
                {language === 'ms' ? '📊 Banding Minggu Ini' : '📊 This Week Comparison'}
              </h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => speakText(language === 'ms' ? 
                  `Minggu ini lebih baik dari minggu lepas. Jualan naik dan pelanggan bertambah.` :
                  `This week is better than last week. Sales increased and more customers came.`
                )}
              >
                <Volume2 className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-6xl mb-2">😊</div>
                <div className="text-2xl font-bold text-green-600 mb-1">
                  {language === 'ms' ? 'Minggu Ini' : 'This Week'}
                </div>
                <div className="text-3xl font-bold text-gray-900">
                  {formatCurrency(todaysSales * 7)}
                </div>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <ArrowUp className="h-5 w-5 text-green-500" />
                  <span className="text-green-600 font-medium">
                    {language === 'ms' ? 'Naik 15%' : 'Up 15%'}
                  </span>
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-6xl mb-2">🙂</div>
                <div className="text-2xl font-bold text-gray-600 mb-1">
                  {language === 'ms' ? 'Minggu Lepas' : 'Last Week'}
                </div>
                <div className="text-3xl font-bold text-gray-600">
                  {formatCurrency(todaysSales * 7 * 0.85)}
                </div>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <span className="text-gray-500">
                    {language === 'ms' ? 'Minggu lepas' : 'Previous week'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Interactive Story Timeline */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {language === 'ms' ? '🕐 Cerita Sepanjang Hari' : '🕐 Story Throughout the Day'}
            </h2>
            <p className="text-gray-600 text-lg">
              {language === 'ms' ? 'Tengok apa yang berlaku dari pagi hingga petang' : 'See what happens from morning to evening'}
            </p>
          </div>
          
          <InteractiveStoryTimeline
            language={language}
            onAudioPlay={speakText}
            businessData={{
              todaysSales: todaysSales,
              totalCustomers: 156, // Estimated based on business data
              popularItems: menuItems.slice(0, 3).map(item => ({
                name: item.name || 'Unknown Item',
                visual: item.visual || '🍽️',
                sold: item.soldToday || 0
              })),
              peakHours: [
                { hour: 8, sales: todaysSales * 0.15 },
                { hour: 12, sales: todaysSales * 0.4 },
                { hour: 18, sales: todaysSales * 0.25 }
              ]
            }}
          />
        </div>
      </div>
    </div>
  )
} 