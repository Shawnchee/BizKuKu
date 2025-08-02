'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ReactMarkdown from 'react-markdown'

interface TypewriterTextProps {
  text: string
  speed?: number // characters per second
  delay?: number // initial delay in milliseconds
  onComplete?: () => void
  className?: string
  cursor?: boolean
  renderAsMarkdown?: boolean
}

export default function TypewriterText({
  text,
  speed = 30,
  delay = 0,
  onComplete,
  className = '',
  cursor = true,
  renderAsMarkdown = false
}: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [showCursor, setShowCursor] = useState(true)

  // Calculate interval based on speed (characters per second)
  const interval = 1000 / speed

  useEffect(() => {
    setDisplayedText('')
    setCurrentIndex(0)
    setIsComplete(false)
    setShowCursor(true)
  }, [text])

  useEffect(() => {
    if (currentIndex >= text.length) {
      setIsComplete(true)
      if (onComplete) {
        onComplete()
      }
      // Hide cursor after completion
      setTimeout(() => setShowCursor(false), 1000)
      return
    }

    const timer = setTimeout(() => {
      setDisplayedText(text.slice(0, currentIndex + 1))
      setCurrentIndex(currentIndex + 1)
    }, currentIndex === 0 ? delay + interval : interval)

    return () => clearTimeout(timer)
  }, [currentIndex, text, interval, delay, onComplete])

  const cursorVariants = {
    blinking: {
      opacity: [0, 0, 1, 1],
      transition: {
        duration: 1,
        repeat: Infinity,
        repeatDelay: 0,
        ease: "linear",
        times: [0, 0.5, 0.5, 1]
      }
    }
  }

  if (renderAsMarkdown) {
    return (
      <div className={`inline ${className}`}>
        <div className="inline">
          <ReactMarkdown 
            components={{
              p: ({ children }) => <span>{children}</span>,
              strong: ({ children }) => <strong>{children}</strong>,
              em: ({ children }) => <em>{children}</em>,
              code: ({ children }) => <code className="bg-gray-100 px-1 rounded text-sm">{children}</code>,
            }}
          >
            {displayedText}
          </ReactMarkdown>
        </div>
        <AnimatePresence>
          {cursor && showCursor && !isComplete && (
            <motion.span
              variants={cursorVariants}
              animate="blinking"
              className="inline-block w-0.5 h-4 bg-gray-600 ml-0.5"
            />
          )}
        </AnimatePresence>
      </div>
    )
  }

  return (
    <span className={`inline ${className}`}>
      {displayedText}
      <AnimatePresence>
        {cursor && showCursor && !isComplete && (
          <motion.span
            variants={cursorVariants}
            animate="blinking"
            className="inline-block w-0.5 h-4 bg-gray-600 ml-0.5"
          />
        )}
      </AnimatePresence>
    </span>
  )
}