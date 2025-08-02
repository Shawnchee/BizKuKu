'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'

interface TestResult {
  url: string
  status?: number
  statusText?: string
  success: boolean
  error?: string
  responseTime?: number
}

interface DiagnosticResults {
  customEndpoint: TestResult | null
  regionalTTS: TestResult | null
  regionalAPI: TestResult | null
  recommendations: string[]
}

export default function AzureDiagnosticPage() {
  const [results, setResults] = useState<DiagnosticResults | null>(null)
  const [testing, setTesting] = useState(false)

  const testEndpoint = async (url: string, apiKey: string): Promise<TestResult> => {
    const startTime = Date.now()
    
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Ocp-Apim-Subscription-Key': apiKey,
          'Content-Type': 'application/json'
        }
      })
      
      const responseTime = Date.now() - startTime
      
      return {
        url,
        status: response.status,
        statusText: response.statusText,
        success: response.ok,
        responseTime
      }
    } catch (error) {
      return {
        url,
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        responseTime: Date.now() - startTime
      }
    }
  }

  const runDiagnostics = async () => {
    setTesting(true)
    
    const apiKey = process.env.NEXT_PUBLIC_AZURE_SPEECH_KEY
    const region = process.env.NEXT_PUBLIC_AZURE_SPEECH_REGION
    const customEndpoint = process.env.NEXT_PUBLIC_AZURE_CUSTOM_ENDPOINT

    if (!apiKey) {
      alert('NEXT_PUBLIC_AZURE_SPEECH_KEY not found in environment variables')
      setTesting(false)
      return
    }

    const results: DiagnosticResults = {
      customEndpoint: null,
      regionalTTS: null,
      regionalAPI: null,
      recommendations: []
    }

    // Test custom endpoint if provided
    if (customEndpoint) {
      const customUrl = `${customEndpoint.replace(/\/$/, '')}/cognitiveservices/avatar/relay/token/v1`
      results.customEndpoint = await testEndpoint(customUrl, apiKey)
      
      if (results.customEndpoint.success) {
        results.recommendations.push('✅ Custom endpoint supports Avatar services')
      } else if (results.customEndpoint.status === 404) {
        results.recommendations.push('❌ Custom endpoint does NOT support Avatar services')
        results.recommendations.push('💡 Use regional endpoint instead: NEXT_PUBLIC_AZURE_SPEECH_REGION')
      } else if (results.customEndpoint.status === 401) {
        results.recommendations.push('🔑 Authentication failed - check your API key')
      } else if (results.customEndpoint.status === 403) {
        results.recommendations.push('⚠️ Forbidden - Avatar services may not be enabled')
      }
    }

    // Test regional TTS endpoint if region provided
    if (region) {
      const regionalTTSUrl = `https://${region}.tts.speech.microsoft.com/cognitiveservices/avatar/relay/token/v1`
      results.regionalTTS = await testEndpoint(regionalTTSUrl, apiKey)
      
      if (results.regionalTTS.success) {
        results.recommendations.push('✅ Regional TTS endpoint works perfectly')
      } else if (results.regionalTTS.status === 403) {
        results.recommendations.push('⚠️ Avatar services not available in your region')
        results.recommendations.push('💡 Try these regions: eastus, westus2, westeurope, southeastasia')
      }
    }

    // Test alternative regional API endpoint if region provided
    if (region) {
      const regionalAPIUrl = `https://${region}.api.cognitive.microsoft.com/cognitiveservices/avatar/relay/token/v1`
      results.regionalAPI = await testEndpoint(regionalAPIUrl, apiKey)
    }

    // Generate final recommendations if none worked
    const anySuccess = results.customEndpoint?.success || results.regionalTTS?.success || results.regionalAPI?.success
    if (!anySuccess) {
      results.recommendations.push('❗ No endpoints worked - check these:')
      results.recommendations.push('🔧 Verify API key is correct')
      results.recommendations.push('🔧 Ensure Avatar services are enabled on your resource')
      results.recommendations.push('🔧 Try supported regions: eastus, westus2, westeurope')
      results.recommendations.push('🔧 Check Azure resource pricing tier (requires Standard S0)')
    }

    setResults(results)
    setTesting(false)
  }

  const ResultCard = ({ title, result }: { title: string, result: TestResult | null }) => (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          {result?.success ? '✅' : result ? '❌' : '⏸️'} {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        {result ? (
          <>
            <div><strong>URL:</strong> {result.url}</div>
            {result.status && <div><strong>Status:</strong> {result.status} {result.statusText}</div>}
            {result.responseTime && <div><strong>Response Time:</strong> {result.responseTime}ms</div>}
            {result.error && <div className="text-red-600"><strong>Error:</strong> {result.error}</div>}
            {result.success && <div className="text-green-600"><strong>✅ SUCCESS</strong> - This endpoint works!</div>}
          </>
        ) : (
          <div className="text-gray-500">Not tested</div>
        )}
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">🔍 Azure Avatar Endpoint Diagnostics</CardTitle>
            <p className="text-gray-600">
              This tool tests your Azure endpoints to see which ones support Avatar services.
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="p-3 bg-blue-50 rounded">
                <div className="font-semibold">API Key</div>
                <div className="text-sm">{process.env.NEXT_PUBLIC_AZURE_SPEECH_KEY ? '✅ Set' : '❌ Missing'}</div>
              </div>
              <div className="p-3 bg-blue-50 rounded">
                <div className="font-semibold">Region</div>
                <div className="text-sm">{process.env.NEXT_PUBLIC_AZURE_SPEECH_REGION || '❌ Not set'}</div>
              </div>
              <div className="p-3 bg-blue-50 rounded">
                <div className="font-semibold">Custom Endpoint</div>
                <div className="text-sm">{process.env.NEXT_PUBLIC_AZURE_CUSTOM_ENDPOINT || '❌ Not set'}</div>
              </div>
            </div>
            
            <Button 
              onClick={runDiagnostics} 
              disabled={testing || !process.env.NEXT_PUBLIC_AZURE_SPEECH_KEY}
              className="w-full"
            >
              {testing ? '🔄 Testing Endpoints...' : '🚀 Run Diagnostics'}
            </Button>
          </CardContent>
        </Card>

        {results && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <ResultCard title="Custom Endpoint" result={results.customEndpoint} />
              <ResultCard title="Regional TTS" result={results.regionalTTS} />
              <ResultCard title="Regional API" result={results.regionalAPI} />
            </div>

            <Card>
              <CardHeader>
                <CardTitle>💡 Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                {results.recommendations.length > 0 ? (
                  <ul className="space-y-2">
                    {results.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No specific recommendations at this time.</p>
                )}
              </CardContent>
            </Card>
          </>
        )}

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>🔧 Quick Fix</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Based on your error (404), try this configuration:</p>
            <div className="bg-black text-green-400 p-4 rounded font-mono text-sm">
              <div># In your .env.local file:</div>
              <div>NEXT_PUBLIC_AZURE_SPEECH_KEY=your_api_key_here</div>
              <div># Comment out custom endpoint for Avatar services:</div>
              <div className="text-gray-500"># NEXT_PUBLIC_AZURE_CUSTOM_ENDPOINT=https://bizzkuku-1.cognitiveservices.azure.com/</div>
              <div># Use regional endpoint instead:</div>
              <div>NEXT_PUBLIC_AZURE_SPEECH_REGION=southeastasia</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}