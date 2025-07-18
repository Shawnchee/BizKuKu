'use client'

import { memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CountUp from 'react-countup'
import * as Icons from 'lucide-react'

type Emotion = 'happy' | 'neutral' | 'sad'

interface RefinedMoneyJarProps {
  id: string
  label: string
  amount: number
  maxAmount: number
  color: string[]
  icon: keyof typeof Icons
  emotion: Emotion
  showBalance: boolean
}

const emotionData: Record<Emotion, { icon: JSX.Element; color: string }> = {
  happy: { icon: <Icons.Smile className="text-green-400" />, color: 'shadow-green-500/50' },
  neutral: { icon: <Icons.Meh className="text-yellow-400" />, color: 'shadow-yellow-500/50' },
  sad: { icon: <Icons.Frown className="text-red-400" />, color: 'shadow-red-500/50' }
}

const RefinedMoneyJar = memo<RefinedMoneyJarProps>(({
  id,
  label,
  amount,
  maxAmount,
  color,
  icon,
  emotion,
  showBalance
}) => {
  const fillPercentage = Math.min(100, (amount / maxAmount) * 100)
  const IconComponent = Icons[icon] as React.ElementType

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -10 }}
      className="relative flex flex-col items-center p-4 rounded-2xl bg-white/50 backdrop-blur-sm shadow-lg transition-all duration-300 h-full"
    >
      <div
        className={`absolute top-2 right-2 p-1 bg-white/50 rounded-full ${emotionData[emotion].color}`}
      >
        {emotionData[emotion].icon}
      </div>
      <div className="relative w-28 h-40">
        <div className="absolute inset-0">
          <svg
            viewBox="0 0 100 150"
            className="w-full h-full"
            style={{ filter: 'drop-shadow(0 10px 8px rgba(0,0,0,0.1))' }}
          >
            <path
              d="M10 10 C 10 0, 90 0, 90 10 V 140 C 90 150, 10 150, 10 140 V 10 Z"
              fill="rgba(255,255,255,0.3)"
              stroke="rgba(255,255,255,0.7)"
              strokeWidth="2"
            />
            <path d="M5 10 H 95 L 90 2 H 10 Z" fill={`url(#${id}-gradient)`} />
          </svg>
        </div>
        <motion.div
          className="absolute bottom-0 left-0 right-0 rounded-b-xl"
          style={{ height: `${fillPercentage}%`, background: `linear-gradient(to top, ${color[0]}, ${color[1]})`, opacity: 0.8 }}
          initial={{ height: 0 }}
          animate={{ height: `${fillPercentage}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
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
          {IconComponent && <IconComponent className="h-10 w-10 text-white opacity-80" />}
        </div>
      </div>
      <div className="text-center mt-4">
        <p className="text-lg font-bold text-gray-800">{label}</p>
        <AnimatePresence mode="wait">
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
})

RefinedMoneyJar.displayName = 'RefinedMoneyJar'
export default RefinedMoneyJar 