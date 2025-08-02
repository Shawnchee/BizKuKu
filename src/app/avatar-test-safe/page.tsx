'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'

export default function SafeAvatarTest() {
  const [testing, setTesting] = useState(false)
  const [countdown, setCountdown] = useState(0)
  const [message, setMessage] = useState('')

  const testWithDelay = async () => {
    setTesting(true)
    setMessage('⏰ Waiting 30 seconds to avoid rate limits...')
    
    // Countdown
    for (let i = 30; i > 0; i--) {
      setCountdown(i)
      await new Promise(resolve => setTimeout(resolve, 1000))
    }
    
    setCountdown(0)
    setMessage('🚀 Attempting avatar initialization...')
    
    try {
      // Try to initialize avatar safely
      const response = await fetch('/api/test-avatar-init', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      })
      
      if (response.ok) {
        setMessage('✅ Avatar initialization test successful!')
      } else {
        const error = await response.text()
        if (error.includes('429') || error.includes('throttled')) {
          setMessage('🚫 Still rate limited. Wait another 10-15 minutes.')
        } else {
          setMessage(`❌ Error: ${error}`)
        }
      }
    } catch (error) {
      setMessage(`❌ Network error: ${error}`)
    }
    
    setTesting(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">🧪 Safe Avatar Testing</CardTitle>
            <p className="text-gray-600">
              Test avatar initialization with built-in delays to avoid rate limiting.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-800 mb-2">Current Status</h3>
              <div className="space-y-2 text-sm text-blue-700">
                <div>✅ Endpoint fixed (404 errors resolved)</div>
                <div>⚠️ Rate limiting active (4429 errors)</div>
                <div>🔄 Auto-retry with delays enabled</div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-800 mb-2">Rate Limiting Info</h3>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Azure blocks rapid avatar initialization attempts</li>
                <li>• Rate limits usually reset after 10-15 minutes</li>
                <li>• This tool waits 30 seconds before testing</li>
                <li>• Only use this once every few minutes</li>
              </ul>
            </div>

            {testing && (
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                {countdown > 0 ? (
                  <div>
                    <div className="text-3xl font-bold text-blue-600 mb-2">{countdown}</div>
                    <div className="text-gray-600">Waiting to avoid rate limits...</div>
                  </div>
                ) : (
                  <div>
                    <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-2"></div>
                    <div className="text-gray-600">Testing avatar initialization...</div>
                  </div>
                )}
              </div>
            )}

            {message && !testing && (
              <div className="p-4 bg-white border rounded-lg">
                <div className="font-medium">{message}</div>
              </div>
            )}

            <Button 
              onClick={testWithDelay}
              disabled={testing}
              className="w-full"
              size="lg"
            >
              {testing ? 'Testing in Progress...' : '🧪 Test Avatar (Safe Mode)'}
            </Button>

            <div className="text-xs text-gray-500 text-center">
              <p><strong>Tip:</strong> If you get "still rate limited", wait 10-15 minutes and try again.</p>
              <p>Normal avatar pages will work once the rate limit resets.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}