/**
 * Azure Endpoint Diagnostic Tool
 * Use this to test which endpoint works for your Azure resource
 */

export async function testAzureEndpoints(apiKey: string, region?: string, customEndpoint?: string) {
  const results = {
    customEndpoint: null as any,
    regionalTTS: null as any,
    regionalAPI: null as any,
    recommendations: [] as string[]
  }

  console.log('🔍 Testing Azure Avatar endpoints...')

  // Test 1: Custom endpoint (if provided)
  if (customEndpoint) {
    const customUrl = `${customEndpoint.replace(/\/$/, '')}/cognitiveservices/avatar/relay/token/v1`
    try {
      console.log(`🧪 Testing custom endpoint: ${customUrl}`)
      const response = await fetch(customUrl, {
        method: 'GET',
        headers: {
          'Ocp-Apim-Subscription-Key': apiKey,
          'Content-Type': 'application/json'
        }
      })
      
      results.customEndpoint = {
        url: customUrl,
        status: response.status,
        statusText: response.statusText,
        success: response.ok
      }
      
      if (response.ok) {
        results.recommendations.push('✅ Custom endpoint supports Avatar services - use NEXT_PUBLIC_AZURE_CUSTOM_ENDPOINT')
      } else if (response.status === 404) {
        results.recommendations.push('❌ Custom endpoint does not support Avatar services - use regional endpoint instead')
      } else if (response.status === 401) {
        results.recommendations.push('🔑 Authentication failed - check your API key')
      }
    } catch (error) {
      results.customEndpoint = { url: customUrl, error: error.message, success: false }
      results.recommendations.push('❌ Custom endpoint failed - network error or invalid URL')
    }
  }

  // Test 2: Regional TTS endpoint (standard for Avatar)
  if (region) {
    const regionalTTSUrl = `https://${region}.tts.speech.microsoft.com/cognitiveservices/avatar/relay/token/v1`
    try {
      console.log(`🧪 Testing regional TTS endpoint: ${regionalTTSUrl}`)
      const response = await fetch(regionalTTSUrl, {
        method: 'GET',
        headers: {
          'Ocp-Apim-Subscription-Key': apiKey,
          'Content-Type': 'application/json'
        }
      })
      
      results.regionalTTS = {
        url: regionalTTSUrl,
        status: response.status,
        statusText: response.statusText,
        success: response.ok
      }
      
      if (response.ok) {
        results.recommendations.push('✅ Regional TTS endpoint works - use NEXT_PUBLIC_AZURE_SPEECH_REGION')
      } else if (response.status === 403) {
        results.recommendations.push('⚠️ Avatar services not available in this region - try eastus, westus2, or westeurope')
      }
    } catch (error) {
      results.regionalTTS = { url: regionalTTSUrl, error: error.message, success: false }
    }
  }

  // Test 3: Regional API endpoint (alternative)
  if (region) {
    const regionalAPIUrl = `https://${region}.api.cognitive.microsoft.com/cognitiveservices/avatar/relay/token/v1`
    try {
      console.log(`🧪 Testing regional API endpoint: ${regionalAPIUrl}`)
      const response = await fetch(regionalAPIUrl, {
        method: 'GET',
        headers: {
          'Ocp-Apim-Subscription-Key': apiKey,
          'Content-Type': 'application/json'
        }
      })
      
      results.regionalAPI = {
        url: regionalAPIUrl,
        status: response.status,
        statusText: response.statusText,
        success: response.ok
      }
    } catch (error) {
      results.regionalAPI = { url: regionalAPIUrl, error: error.message, success: false }
    }
  }

  // Generate final recommendations
  if (!results.recommendations.some(r => r.includes('✅'))) {
    results.recommendations.push('🔧 Try these regions that support Avatar: eastus, westus2, westeurope, southeastasia')
    results.recommendations.push('🔧 Check Azure Portal: ensure Avatar services are enabled on your resource')
    results.recommendations.push('🔧 Verify pricing tier: Avatar requires Standard S0')
  }

  return results
}

// Console-friendly test function
export function runAzureEndpointTest() {
  const apiKey = process.env.NEXT_PUBLIC_AZURE_SPEECH_KEY
  const region = process.env.NEXT_PUBLIC_AZURE_SPEECH_REGION
  const customEndpoint = process.env.NEXT_PUBLIC_AZURE_CUSTOM_ENDPOINT

  if (!apiKey) {
    console.error('❌ NEXT_PUBLIC_AZURE_SPEECH_KEY not found')
    return
  }

  console.log('🚀 Starting Azure endpoint diagnostics...')
  console.log(`🔑 API Key: ${apiKey ? '✅ Set' : '❌ Missing'}`)
  console.log(`🌍 Region: ${region || '❌ Not set'}`)
  console.log(`🔗 Custom Endpoint: ${customEndpoint || '❌ Not set'}`)

  testAzureEndpoints(apiKey, region, customEndpoint).then(results => {
    console.log('\n📊 Test Results:')
    console.log('Custom Endpoint:', results.customEndpoint)
    console.log('Regional TTS:', results.regionalTTS)
    console.log('Regional API:', results.regionalAPI)
    console.log('\n💡 Recommendations:')
    results.recommendations.forEach(rec => console.log(rec))
  })
}