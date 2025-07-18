'use client'

import { useState, useEffect } from 'react'
import { Volume2, Sun, Users, Utensils, DollarSign, Moon, Coffee, ShoppingCart, Heart, Star, TrendingUp, Clock, Calendar, ChevronLeft, ChevronRight, Play, Pause, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui'
import { Card } from '@/components/ui'

interface StoryTimelineProps {
  language: 'ms' | 'en'
  onAudioPlay?: (text: string) => void
  businessData: {
    todaysSales: number
    totalCustomers: number
    popularItems: Array<{ name: string, visual: string, sold: number }>
    peakHours: Array<{ hour: number, sales: number }>
  }
}

interface TimelineEvent {
  id: string
  time: string
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  visual: string
  color: string
  emotion: 'happy' | 'neutral' | 'excited'
  audioText: string
  data?: any
}

export default function InteractiveStoryTimeline({ 
  language, 
  onAudioPlay, 
  businessData 
}: StoryTimelineProps) {
  const [currentEventIndex, setCurrentEventIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [playbackSpeed, setPlaybackSpeed] = useState(1)
  const [hoveredEvent, setHoveredEvent] = useState<string | null>(null)

  // Timeline events for a typical payment day - PAYMENT-CENTRIC VERSION
  const timelineEvents: TimelineEvent[] = [
    {
      id: 'morning-prep',
      time: '7:00 AM',
      icon: Sun,
      title: language === 'ms' ? 'Pagi Bermula' : 'Morning Starts',
      description: language === 'ms' ? 'Kak Siti sampai warung, buka sistem pembayaran' : 'Kak Siti arrives, opens payment systems',
      visual: '🌅',
      color: 'from-orange-400 to-yellow-500',
      emotion: 'happy',
      audioText: language === 'ms' ? 'Pagi bermula! Kak Siti sampai warung dan buka sistem pembayaran' : 'Morning starts! Kak Siti arrives and opens payment systems',
      data: { preparation: true }
    },
    {
      id: 'first-payments',
      time: '8:00 AM',
      icon: Users,
      title: language === 'ms' ? 'Bayaran Pertama' : 'First Payments',
      description: language === 'ms' ? 'Bayaran QR pertama diterima' : 'First QR payments received',
      visual: '💳',
      color: 'from-blue-400 to-purple-500',
      emotion: 'excited',
      audioText: language === 'ms' ? 'Bayaran pertama diterima! Pelanggan guna QR code' : 'First payments received! Customers use QR code',
      data: { customers: Math.floor((businessData.totalCustomers || 0) * 0.3) }
    },
    {
      id: 'peak-hours',
      time: '12:00 PM',
      icon: TrendingUp,
      title: language === 'ms' ? 'Waktu Puncak' : 'Peak Hours',
      description: language === 'ms' ? 'Banyak transaksi, wang masuk banyak' : 'Many transactions, lots of money coming in',
      visual: '📈',
      color: 'from-green-400 to-teal-500',
      emotion: 'excited',
      audioText: language === 'ms' ? 'Waktu puncak! Banyak transaksi dan wang masuk banyak' : 'Peak hours! Many transactions and lots of money coming in',
      data: { sales: (businessData.todaysSales || 0) * 0.6 }
    },
    {
      id: 'popular-method',
      time: '1:00 PM',
      icon: Star,
      title: language === 'ms' ? 'Cara Bayar Popular' : 'Popular Payment Method',
      description: language === 'ms' ? 'DuitNow QR paling kerap digunakan' : 'DuitNow QR most frequently used',
      visual: '📱',
      color: 'from-yellow-400 to-orange-500',
      emotion: 'happy',
      audioText: language === 'ms' ? 'DuitNow QR paling popular! Pelanggan suka guna' : 'DuitNow QR most popular! Customers love using it',
      data: { topItem: businessData.popularItems?.[0] }
    },
    {
      id: 'afternoon-slow',
      time: '3:00 PM',
      icon: Coffee,
      title: language === 'ms' ? 'Petang Tenang' : 'Quiet Afternoon',
      description: language === 'ms' ? 'Transaksi kurang, masa rehat' : 'Fewer transactions, rest time',
      visual: '☕',
      color: 'from-purple-400 to-pink-500',
      emotion: 'neutral',
      audioText: language === 'ms' ? 'Petang tenang, transaksi kurang. Masa untuk rehat' : 'Quiet afternoon, fewer transactions. Time to rest',
      data: { restTime: true }
    },
    {
      id: 'evening-summary',
      time: '6:00 PM',
      icon: DollarSign,
      title: language === 'ms' ? 'Kira Wang Masuk' : 'Count Cash Inflow',
      description: language === 'ms' ? 'Kira jumlah wang masuk hari ini' : 'Count today\'s total cash inflow',
      visual: '💰',
      color: 'from-green-400 to-emerald-500',
      emotion: 'happy',
      audioText: language === 'ms' ? 'Kira wang masuk hari ini! Jumlah: RM' + (businessData.todaysSales || 0) : 'Count today\'s cash inflow! Total: RM' + (businessData.todaysSales || 0),
      data: { totalSales: businessData.todaysSales || 0 }
    }
  ]

  // Auto-play timeline
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentEventIndex(prev => {
          if (prev >= timelineEvents.length - 1) {
            setIsPlaying(false)
            return prev
          }
          return prev + 1
        })
      }, 3000 / playbackSpeed)
      
      return () => clearInterval(interval)
    }
  }, [isPlaying, playbackSpeed, timelineEvents.length])

  // Get emotion emoji
  const getEmotionEmoji = (emotion: string) => {
    switch (emotion) {
      case 'happy': return '😊'
      case 'excited': return '🤩'
      default: return '😐'
    }
  }

  // Handle event click
  const handleEventClick = (index: number) => {
    setCurrentEventIndex(index)
    const event = timelineEvents[index]
    onAudioPlay?.(event.audioText)
  }

  // Navigation handlers
  const goToPrevious = () => {
    if (currentEventIndex > 0) {
      setCurrentEventIndex(currentEventIndex - 1)
    }
  }

  const goToNext = () => {
    if (currentEventIndex < timelineEvents.length - 1) {
      setCurrentEventIndex(currentEventIndex + 1)
    }
  }

  const resetTimeline = () => {
    setCurrentEventIndex(0)
    setIsPlaying(false)
  }

  const togglePlayback = () => {
    setIsPlaying(!isPlaying)
  }

  const currentEvent = timelineEvents[currentEventIndex]

  return (
    <div className="space-y-6">
      {/* Timeline Controls */}
      <div className="flex items-center justify-between bg-white rounded-lg p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={togglePlayback}
            className="flex items-center gap-2"
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            {language === 'ms' ? (isPlaying ? 'Berhenti' : 'Main') : (isPlaying ? 'Pause' : 'Play')}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={resetTimeline}
            className="flex items-center gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            {language === 'ms' ? 'Ulang' : 'Reset'}
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">
            {language === 'ms' ? 'Kelajuan' : 'Speed'}:
          </span>
          {[0.5, 1, 1.5, 2].map((speed) => (
            <Button
              key={speed}
              variant={playbackSpeed === speed ? 'default' : 'outline'}
              size="sm"
              onClick={() => setPlaybackSpeed(speed)}
              className="text-xs"
            >
              {speed}x
            </Button>
          ))}
        </div>
      </div>

      {/* Current Event Display */}
      <Card className={`relative overflow-hidden bg-gradient-to-br ${currentEvent.color} text-white`}>
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-full">
                <currentEvent.icon className="h-8 w-8" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm opacity-90">{currentEvent.time}</span>
                </div>
                <h2 className="text-2xl font-bold mb-1">{currentEvent.title}</h2>
                <p className="text-lg opacity-90">{currentEvent.description}</p>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-6xl mb-2">{currentEvent.visual}</div>
              <div className="text-2xl">{getEmotionEmoji(currentEvent.emotion)}</div>
            </div>
          </div>

          {/* Event Data */}
          {currentEvent.data && (
            <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
              {currentEvent.data.customers && (
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-4 w-4" />
                  <span>{language === 'ms' ? 'Transaksi' : 'Transactions'}: {currentEvent.data.customers}</span>
                </div>
              )}
              {currentEvent.data.sales && (
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="h-4 w-4" />
                  <span>{language === 'ms' ? 'Wang Masuk' : 'Cash Inflow'}: RM {(currentEvent.data.sales || 0).toFixed(2)}</span>
                </div>
              )}
              {currentEvent.data.topItem && (
                <div className="flex items-center gap-2 mb-2">
                  <Star className="h-4 w-4" />
                  <span>{currentEvent.data.topItem.visual} {currentEvent.data.topItem.name}: {currentEvent.data.topItem.sold || 0} {language === 'ms' ? 'transaksi' : 'transactions'}</span>
                </div>
              )}
              {currentEvent.data.totalSales && (
                <div className="flex items-center gap-2 text-xl font-bold">
                  <DollarSign className="h-5 w-5" />
                  <span>{language === 'ms' ? 'Jumlah Wang Masuk' : 'Total Cash Inflow'}: RM {(currentEvent.data.totalSales || 0).toFixed(2)}</span>
                </div>
              )}
            </div>
          )}

          {/* Audio Button */}
          <Button
            variant="outline"
            className="absolute top-4 right-4 bg-white/20 border-white/30 text-white hover:bg-white/30"
            onClick={() => onAudioPlay?.(currentEvent.audioText)}
          >
            <Volume2 className="h-4 w-4" />
          </Button>
        </div>
      </Card>

      {/* Timeline Navigation */}
      <div className="flex items-center justify-between bg-white rounded-lg p-4 shadow-sm">
        <Button
          variant="outline"
          onClick={goToPrevious}
          disabled={currentEventIndex === 0}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          {language === 'ms' ? 'Sebelum' : 'Previous'}
        </Button>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">
            {currentEventIndex + 1} / {timelineEvents.length}
          </span>
        </div>

        <Button
          variant="outline"
          onClick={goToNext}
          disabled={currentEventIndex === timelineEvents.length - 1}
          className="flex items-center gap-2"
        >
          {language === 'ms' ? 'Seterusnya' : 'Next'}
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Timeline Overview */}
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">
          {language === 'ms' ? 'Cerita Hari Ini' : 'Today\'s Story'}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
          {timelineEvents.map((event, index) => (
            <Button
              key={event.id}
              variant={index === currentEventIndex ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleEventClick(index)}
              onMouseEnter={() => setHoveredEvent(event.id)}
              onMouseLeave={() => setHoveredEvent(null)}
              className={`
                flex flex-col items-center gap-1 h-auto py-2 px-3 relative
                ${index === currentEventIndex ? 'ring-2 ring-blue-500' : ''}
                ${index < currentEventIndex ? 'bg-green-50 text-green-700' : ''}
              `}
            >
              <event.icon className="h-4 w-4" />
              <span className="text-xs">{event.time}</span>
              <span className="text-xs font-medium">{event.visual}</span>
              
              {/* Tooltip */}
              {hoveredEvent === event.id && (
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">
                  {event.title}
                </div>
              )}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
} 