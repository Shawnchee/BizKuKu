'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { X, ExternalLink, FileText, Download } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

interface PreviewItem {
  type: 'image' | 'text' | 'file' | 'feature'
  label: string
  content: string | React.ReactNode
  icon?: React.ComponentType<any>
}

interface HoverCardProps {
  children: React.ReactNode
  title: string
  description: string
  previews: PreviewItem[]
  outputs?: string[]
  learnMoreUrl?: string
  className?: string
  disabled?: boolean
}

export default function HoverCard({
  children,
  title,
  description,
  previews,
  outputs = [],
  learnMoreUrl,
  className = '',
  disabled = false
}: HoverCardProps) {
  const { t } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const triggerRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout>()

  const updatePosition = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect()
      const cardWidth = 400
      const cardHeight = 500
      
      let x = rect.right + 10
      let y = rect.top
      
      // Adjust if card would go off screen
      if (x + cardWidth > window.innerWidth) {
        x = rect.left - cardWidth - 10
      }
      
      if (y + cardHeight > window.innerHeight) {
        y = window.innerHeight - cardHeight - 20
      }
      
      if (y < 20) {
        y = 20
      }
      
      setPosition({ x, y })
    }
  }

  const handleMouseEnter = () => {
    if (disabled) return
    
    clearTimeout(timeoutRef.current)
    updatePosition()
    setIsVisible(true)
  }

  const handleMouseLeave = () => {
    if (disabled) return
    
    timeoutRef.current = setTimeout(() => {
      setIsVisible(false)
    }, 150)
  }

  const handleCardMouseEnter = () => {
    clearTimeout(timeoutRef.current)
  }

  const handleCardMouseLeave = () => {
    setIsVisible(false)
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={className}
      >
        {children}
      </div>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            ref={cardRef}
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            className="fixed z-50 pointer-events-auto"
            style={{
              left: position.x,
              top: position.y,
            }}
            onMouseEnter={handleCardMouseEnter}
            onMouseLeave={handleCardMouseLeave}
          >
            <Card className="w-96 max-h-[500px] overflow-hidden shadow-2xl border-2 border-gray-200 bg-white">
              {/* Header */}
              <div className="p-4 border-b bg-gradient-to-r from-blue-50 to-purple-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-lg">{title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{description}</p>
                  </div>
                  <button
                    onClick={() => setIsVisible(false)}
                    className="p-1 hover:bg-white hover:bg-opacity-50 rounded transition-colors"
                  >
                    <X className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 max-h-80 overflow-y-auto">
                {/* Outputs Section */}
                {outputs.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      What you'll get:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {outputs.map((output, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium"
                        >
                          {t(output)}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Previews Section */}
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Preview:
                  </h4>

                  {previews.map((preview, index) => (
                    <div key={index} className="border rounded-lg p-3 bg-gray-50">
                      <div className="flex items-center gap-2 mb-2">
                        {preview.icon && <preview.icon className="w-4 h-4 text-gray-600" />}
                        <span className="text-sm font-medium text-gray-700">{t(preview.label)}</span>
                      </div>

                      {preview.type === 'text' && (
                        <div className="text-sm text-gray-600 font-mono bg-white p-2 rounded border">
                          {t(preview.content as string)}
                        </div>
                      )}

                      {preview.type === 'image' && (
                        <div className="bg-white p-2 rounded border">
                          <div className="text-xs text-gray-500 text-center py-8 border-2 border-dashed border-gray-200 rounded">
                            {t(preview.content as string)}
                          </div>
                        </div>
                      )}

                      {preview.type === 'feature' && (
                        <div className="text-sm text-gray-600">
                          {t(preview.content as string)}
                        </div>
                      )}

                      {preview.type === 'file' && (
                        <div className="flex items-center gap-2 text-sm text-gray-600 bg-white p-2 rounded border">
                          <FileText className="w-4 h-4" />
                          {t(preview.content as string)}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              {learnMoreUrl && (
                <div className="p-4 border-t bg-gray-50">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full flex items-center gap-2"
                    onClick={() => window.open(learnMoreUrl, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4" />
                    Learn More
                  </Button>
                </div>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
