'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

interface RateLimitNoticeProps {
  isVisible: boolean
  waitTime?: number
  onRetry?: () => void
  onDismiss?: () => void
}

export default function RateLimitNotice({ 
  isVisible, 
  waitTime = 60, 
  onRetry, 
  onDismiss 
}: RateLimitNoticeProps) {
  const [countdown, setCountdown] = useState(waitTime)
  const [canRetry, setCanRetry] = useState(false)

  useEffect(() => {
    if (!isVisible) return

    setCountdown(waitTime)
    setCanRetry(false)

    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          setCanRetry(true)
          clearInterval(interval)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isVisible, waitTime])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            ⏱️ Azure Rate Limit Detected
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-gray-600">
            <p className="mb-2">
              Azure is temporarily limiting requests to prevent spam. This happens when:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Too many avatar initialization attempts</li>
              <li>Rapid page refreshes during testing</li>
              <li>Multiple browser tabs open</li>
            </ul>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <div className="font-semibold text-yellow-800">
              {canRetry ? '✅ Ready to retry!' : `⏰ Please wait: ${countdown} seconds`}
            </div>
            <div className="text-sm text-yellow-700 mt-1">
              {canRetry ? 'You can now try initializing the avatar again.' : 'Azure will allow new requests after this countdown.'}
            </div>
          </div>

          <div className="flex gap-2">
            <Button 
              onClick={onRetry} 
              disabled={!canRetry}
              className="flex-1"
            >
              {canRetry ? '🔄 Retry Now' : `Wait ${countdown}s`}
            </Button>
            <Button 
              variant="outline" 
              onClick={onDismiss}
              className="px-4"
            >
              Dismiss
            </Button>
          </div>

          <div className="text-xs text-gray-500">
            <strong>Tip:</strong> To avoid rate limits, wait at least 10 seconds between avatar initialization attempts.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}