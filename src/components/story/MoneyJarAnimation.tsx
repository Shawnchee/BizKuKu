'use client'

import { useState, useEffect } from 'react'
import { Coins, PiggyBank, Award, Sparkles, TrendingUp, TrendingDown } from 'lucide-react'

interface MoneyJarAnimationProps {
  amount: number
  maxAmount?: number
  color: string
  icon: React.ComponentType<{ className?: string }>
  isActive?: boolean
  emotion?: 'happy' | 'neutral' | 'sad'
  label: string
  onHover?: (isHovered: boolean) => void
  onClick?: () => void
}

interface FloatingCoin {
  id: string
  x: number
  y: number
  delay: number
  size: number
}

export default function MoneyJarAnimation({
  amount,
  maxAmount = 1000,
  color,
  icon: Icon,
  isActive = false,
  emotion = 'neutral',
  label,
  onHover,
  onClick
}: MoneyJarAnimationProps) {
  const [floatingCoins, setFloatingCoins] = useState<FloatingCoin[]>([])
  const [isHovered, setIsHovered] = useState(false)

  // Generate floating coins when amount changes or jar is active
  useEffect(() => {
    if (isActive || isHovered) {
      const coins: FloatingCoin[] = Array.from({ length: 5 }, (_, i) => ({
        id: `coin-${Date.now()}-${i}`,
        x: Math.random() * 60 + 20, // 20-80% from left
        y: Math.random() * 40 + 30, // 30-70% from top
        delay: Math.random() * 2,
        size: Math.random() * 8 + 12 // 12-20px
      }))
      setFloatingCoins(coins)
      
      // Clear coins after animation
      const timeout = setTimeout(() => {
        setFloatingCoins([])
      }, 3000)
      
      return () => clearTimeout(timeout)
    }
  }, [isActive, isHovered, amount])

  // Calculate fill percentage
  const fillPercentage = Math.min(90, (amount / maxAmount) * 100)

  // Get emotion color
  const getEmotionColor = () => {
    switch (emotion) {
      case 'happy': return 'from-green-300 to-green-500'
      case 'sad': return 'from-red-300 to-red-500'
      default: return 'from-yellow-300 to-yellow-500'
    }
  }

  // Handle hover
  const handleMouseEnter = () => {
    setIsHovered(true)
    onHover?.(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    onHover?.(false)
  }

  return (
    <div 
      className="relative flex flex-col items-center cursor-pointer group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {/* Floating coins */}
      {floatingCoins.map((coin) => (
        <div
          key={coin.id}
          className="absolute pointer-events-none"
          style={{
            left: `${coin.x}%`,
            top: `${coin.y}%`,
            animationDelay: `${coin.delay}s`,
            fontSize: `${coin.size}px`
          }}
        >
          <div className="animate-bounce">
            <Coins className="text-yellow-400 drop-shadow-lg animate-pulse" />
          </div>
        </div>
      ))}
      
      {/* Sparkles for happy emotion */}
      {emotion === 'happy' && (
        <div className="absolute -top-2 -right-2 animate-pulse">
          <Sparkles className="h-6 w-6 text-yellow-400" />
        </div>
      )}
      
      {/* Trending indicator */}
      <div className="absolute -top-1 -left-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {emotion === 'happy' ? (
          <TrendingUp className="h-4 w-4 text-green-500" />
        ) : emotion === 'sad' ? (
          <TrendingDown className="h-4 w-4 text-red-500" />
        ) : null}
      </div>

      {/* Main jar container */}
      <div className="relative">
        {/* Jar body */}
        <div className={`
          relative w-24 h-32 rounded-b-3xl rounded-t-lg overflow-hidden border-4 border-white shadow-2xl
          bg-gradient-to-b ${color} 
          transform transition-all duration-500 
          ${isHovered ? 'scale-110 rotate-2' : 'scale-100 rotate-0'}
          ${isActive ? 'animate-pulse' : ''}
        `}>
          {/* Money level */}
          <div 
            className={`
              absolute bottom-0 left-0 right-0 transition-all duration-1000 ease-out
              bg-gradient-to-t ${getEmotionColor()}
              ${isHovered ? 'animate-pulse' : ''}
            `}
            style={{ 
              height: `${fillPercentage}%`,
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
            }}
          />
          
          {/* Bubbles effect */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={`
                  absolute w-2 h-2 bg-white/30 rounded-full
                  ${isHovered ? 'animate-bounce' : ''}
                `}
                style={{
                  left: `${20 + i * 25}%`,
                  bottom: `${fillPercentage - 10}%`,
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: '2s'
                }}
              />
            ))}
          </div>
          
          {/* Icon in center */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Icon className={`
              h-8 w-8 text-white drop-shadow-lg
              ${isHovered ? 'animate-bounce' : ''}
            `} />
          </div>
          
          {/* Reflection effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        </div>
        
        {/* Jar lid */}
        <div className={`
          absolute -top-3 left-1/2 transform -translate-x-1/2 w-20 h-5 rounded-full border-2 border-white
          bg-gradient-to-r ${color} shadow-lg
          ${isHovered ? 'animate-pulse' : ''}
        `}>
          {/* Lid handle */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full border border-white shadow-sm" />
        </div>
      </div>
      
      {/* Label */}
      <div className="mt-4 text-center">
        <div className="text-sm font-medium text-gray-700 mb-1">{label}</div>
        <div className="text-xs text-gray-500">
          {fillPercentage.toFixed(0)}% {emotion === 'happy' ? '😊' : emotion === 'sad' ? '😢' : '😐'}
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mt-2 overflow-hidden">
        <div 
          className={`h-2 rounded-full bg-gradient-to-r ${color} transition-all duration-1000 ease-out`}
          style={{ width: `${fillPercentage}%` }}
        />
      </div>
    </div>
  )
} 