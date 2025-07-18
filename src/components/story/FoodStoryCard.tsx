'use client'

import { useState, useEffect } from 'react'
import { Volume2, TrendingUp, TrendingDown, Star, Users, ShoppingCart, Heart, Sparkles, Award } from 'lucide-react'
import { Button } from '@/components/ui'
import { Card } from '@/components/ui'

interface FoodStoryCardProps {
  name: string
  visual: string
  soldToday: number
  price: number
  isPopular?: boolean
  customerFeedback?: 'excellent' | 'good' | 'average'
  language: 'ms' | 'en'
  onAudioPlay?: (text: string) => void
  className?: string
}

export default function FoodStoryCard({
  name,
  visual,
  soldToday,
  price,
  isPopular = false,
  customerFeedback = 'good',
  language,
  onAudioPlay,
  className = ''
}: FoodStoryCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [showSalesAnimation, setShowSalesAnimation] = useState(false)
  const [popularity, setPopularity] = useState(0)

  // Calculate popularity percentage
  useEffect(() => {
    const maxSales = 100 // Assuming max sales per item is 100
    setPopularity(Math.min(100, ((soldToday || 0) / maxSales) * 100))
  }, [soldToday])

  // Sales animation when item is hovered
  useEffect(() => {
    if (isHovered) {
      setShowSalesAnimation(true)
      const timeout = setTimeout(() => setShowSalesAnimation(false), 2000)
      return () => clearTimeout(timeout)
    }
  }, [isHovered])

  // Get feedback emoji and color
  const getFeedbackDisplay = () => {
    switch (customerFeedback) {
      case 'excellent':
        return { emoji: '🤩', color: 'text-green-600', stars: 5 }
      case 'good':
        return { emoji: '😊', color: 'text-yellow-600', stars: 4 }
      default:
        return { emoji: '😐', color: 'text-gray-600', stars: 3 }
    }
  }

  const feedback = getFeedbackDisplay()

  // Handle audio play
  const handleAudioPlay = () => {
    const text = language === 'ms' 
      ? `${name}: ${soldToday || 0} dijual hari ini dengan harga ${(price || 0).toFixed(2)} ringgit`
      : `${name}: ${soldToday || 0} sold today at ${(price || 0).toFixed(2)} ringgit`
    onAudioPlay?.(text)
  }

  // Get sales performance
  const getSalesPerformance = () => {
    const sales = soldToday || 0
    if (sales > 50) return { trend: 'up', color: 'text-green-600', message: language === 'ms' ? 'Sangat laris!' : 'Very popular!' }
    if (sales > 20) return { trend: 'stable', color: 'text-yellow-600', message: language === 'ms' ? 'Sederhana' : 'Moderate' }
    return { trend: 'down', color: 'text-red-600', message: language === 'ms' ? 'Kurang laris' : 'Less popular' }
  }

  const performance = getSalesPerformance()

  return (
    <Card 
      className={`
        relative overflow-hidden transition-all duration-300 cursor-pointer group
        ${isHovered ? 'shadow-2xl scale-105' : 'shadow-lg hover:shadow-xl'}
        ${isPopular ? 'ring-2 ring-yellow-400 ring-opacity-50' : ''}
        ${className}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleAudioPlay}
    >
      {/* Popular badge */}
      {isPopular && (
        <div className="absolute top-2 right-2 z-10">
          <div className="flex items-center gap-1 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold">
            <Award className="h-3 w-3" />
            <span>{language === 'ms' ? 'Popular' : 'Popular'}</span>
          </div>
        </div>
      )}

      {/* Sparkles animation */}
      {showSalesAnimation && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-ping"
              style={{
                top: `${20 + i * 30}%`,
                left: `${20 + i * 25}%`,
                animationDelay: `${i * 0.5}s`
              }}
            >
              <Sparkles className="h-4 w-4 text-yellow-400" />
            </div>
          ))}
        </div>
      )}

      <div className="p-6">
        {/* Food visual and name */}
        <div className="flex items-center gap-4 mb-4">
          <div className="relative">
            <div className={`
              text-6xl transform transition-all duration-300
              ${isHovered ? 'scale-110 rotate-12' : 'scale-100 rotate-0'}
            `}>
              {visual}
            </div>
            {/* Floating hearts for popular items */}
            {isPopular && isHovered && (
              <div className="absolute -top-2 -right-2 animate-bounce">
                <Heart className="h-4 w-4 text-red-500 fill-current" />
              </div>
            )}
          </div>
          
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 mb-1">{name}</h3>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-3 w-3 ${i < feedback.stars ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">{feedback.emoji}</span>
            </div>
            <div className={`text-sm font-medium ${performance.color}`}>
              {performance.message}
            </div>
          </div>

          {/* Audio button */}
          <Button
            variant="outline"
            size="sm"
            className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            onClick={(e) => {
              e.stopPropagation()
              handleAudioPlay()
            }}
          >
            <Volume2 className="h-4 w-4" />
          </Button>
        </div>

        {/* Sales info */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">
                {language === 'ms' ? 'Terjual' : 'Sold'}:
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-gray-900">{soldToday || 0}</span>
              <span className="text-sm text-gray-600">
                {language === 'ms' ? 'hari ini' : 'today'}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">
                {language === 'ms' ? 'Harga' : 'Price'}:
              </span>
            </div>
            <div className="text-lg font-bold text-green-600">
              RM {(price || 0).toFixed(2)}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">
              {language === 'ms' ? 'Jumlah' : 'Total'}:
            </span>
            <div className="text-xl font-bold text-green-700">
              RM {((soldToday || 0) * (price || 0)).toFixed(2)}
            </div>
          </div>
        </div>

        {/* Visual progress bar */}
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">
              {language === 'ms' ? 'Populariti' : 'Popularity'}
            </span>
            <span className="text-xs text-gray-500">{popularity.toFixed(0)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div 
              className={`
                h-2 rounded-full transition-all duration-1000 ease-out
                ${popularity > 80 ? 'bg-gradient-to-r from-green-400 to-green-600' :
                  popularity > 50 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' :
                  'bg-gradient-to-r from-red-400 to-red-600'}
                ${isHovered ? 'animate-pulse' : ''}
              `}
              style={{ width: `${popularity}%` }}
            />
          </div>
        </div>

        {/* Customer feedback */}
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-medium text-gray-700">
              {language === 'ms' ? 'Pelanggan kata' : 'Customers say'}:
            </span>
            <span className="text-lg">{feedback.emoji}</span>
          </div>
          <p className="text-xs text-gray-600">
            {language === 'ms' ? 
              (customerFeedback === 'excellent' ? 'Sangat sedap!' : 
               customerFeedback === 'good' ? 'Sedap!' : 'Biasa je') :
              (customerFeedback === 'excellent' ? 'Excellent!' : 
               customerFeedback === 'good' ? 'Good!' : 'Average')
            }
          </p>
        </div>

        {/* Trend indicator */}
        <div className="mt-3 flex items-center justify-center">
          {performance.trend === 'up' && (
            <div className="flex items-center gap-1 text-green-600">
              <TrendingUp className="h-4 w-4" />
              <span className="text-xs font-medium">
                {language === 'ms' ? 'Naik' : 'Rising'}
              </span>
            </div>
          )}
          {performance.trend === 'down' && (
            <div className="flex items-center gap-1 text-red-600">
              <TrendingDown className="h-4 w-4" />
              <span className="text-xs font-medium">
                {language === 'ms' ? 'Turun' : 'Falling'}
              </span>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
} 