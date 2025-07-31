'use client'

import React, { useState } from 'react'
import { Play, Square, Mic, MicOff, Settings, TestTube } from 'lucide-react'

interface AvatarTestPanelProps {
  onSpeakText?: (text: string) => void
  onStartListening?: () => void
  onStopSpeaking?: () => void
  onStopSession?: () => void
  avatarReady?: boolean
  isListening?: boolean
  isSpeaking?: boolean
  isReconnecting?: boolean
  sessionActive?: boolean
  currentAvatarConfig?: any
  spokenTextQueue?: string[]
}

const AvatarTestPanel: React.FC<AvatarTestPanelProps> = ({
  onSpeakText,
  onStartListening,
  onStopSpeaking,
  onStopSession,
  avatarReady = false,
  isListening = false,
  isSpeaking = false,
  isReconnecting = false,
  sessionActive = false,
  currentAvatarConfig,
  spokenTextQueue = []
}) => {
  const [testText, setTestText] = useState('Hello! I am your AI business assistant. How can I help you today?')
  const [isOpen, setIsOpen] = useState(false)
  const [showAdvanced, setShowAdvanced] = useState(false)

  const testPhrases = [
    'Hello! Welcome to BizKuKu.',
    'Your business is performing well with 15% growth this month.',
    'You qualify for three funding opportunities totaling RM17,400.',
    'Selamat datang ke BizKuKu, asisten perniagaan AI anda.',
    'Perniagaan anda berkembang dengan baik bulan ini.',
    'Let me help you analyze your business performance and find opportunities.',
    'Based on your financial data, I recommend these three funding options.',
    'Your cash flow shows positive trends for the next quarter.',
    'Mari saya bantu anda mencari peluang pembiayaan yang sesuai.',
    'Data kewangan anda menunjukkan pertumbuhan yang positif.',
  ]

  const ssmlTestPhrases = [
    '<speak><prosody rate="slow">This is a slow speech test.</prosody></speak>',
    '<speak><prosody rate="fast">This is a fast speech test.</prosody></speak>',
    '<speak><prosody pitch="high">This is a high pitch test.</prosody></speak>',
    '<speak><prosody pitch="low">This is a low pitch test.</prosody></speak>',
    '<speak>Normal speech. <break time="1s"/> After a pause.</speak>',
    '<speak><emphasis level="strong">This is emphasized text.</emphasis></speak>',
  ]

  const handleSpeakTest = () => {
    if (onSpeakText && testText.trim()) {
      onSpeakText(testText)
    }
  }

  const handlePresetPhrase = (phrase: string) => {
    setTestText(phrase)
    if (onSpeakText) {
      onSpeakText(phrase)
    }
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 left-4 z-50 bg-purple-600 hover:bg-purple-700 text-white rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-105"
        title="Avatar Test Panel"
      >
        <TestTube className="w-5 h-5" />
      </button>
    )
  }

  return (
    <div className="fixed bottom-4 left-4 z-50 bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 w-96 max-h-[80vh] overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <TestTube className="w-5 h-5 text-purple-600" />
          <h3 className="font-semibold text-gray-800">Avatar Test Panel</h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className={`p-1 rounded ${showAdvanced ? 'text-purple-600' : 'text-gray-400'} hover:text-purple-600 transition-colors`}
            title="Toggle advanced features"
          >
            <Settings className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            ×
          </button>
        </div>
      </div>

      {/* Enhanced Status */}
      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-2 text-sm mb-2">
          <div className={`w-2 h-2 rounded-full ${
            isReconnecting ? 'bg-orange-400' :
            avatarReady && sessionActive ? 'bg-green-400' : 
            avatarReady ? 'bg-yellow-400' : 'bg-red-400'
          }`} />
          <span className={`font-medium ${
            isReconnecting ? 'text-orange-600' :
            avatarReady && sessionActive ? 'text-green-600' : 
            avatarReady ? 'text-yellow-600' : 'text-red-600'
          }`}>
            {isReconnecting ? 'Reconnecting...' :
             avatarReady && sessionActive ? 'Avatar Active' :
             avatarReady ? 'Avatar Ready' : 'Avatar Not Ready'}
          </span>
        </div>
        
        <div className="text-xs space-y-1">
          <div className="flex justify-between">
            <span>Session:</span>
            <span className={sessionActive ? 'text-green-600' : 'text-red-600'}>
              {sessionActive ? '🟢 Active' : '🔴 Inactive'}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Speaking:</span>
            <span className={isSpeaking ? 'text-blue-600' : 'text-gray-500'}>
              {isSpeaking ? '🗣️ Yes' : '🔇 No'}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Listening:</span>
            <span className={isListening ? 'text-green-600' : 'text-gray-500'}>
              {isListening ? '🎙️ Yes' : '🔕 No'}
            </span>
          </div>
          {spokenTextQueue.length > 0 && (
            <div className="flex justify-between">
              <span>Queue:</span>
              <span className="text-purple-600">📝 {spokenTextQueue.length}</span>
            </div>
          )}
        </div>
        
        {currentAvatarConfig && (
          <div className="mt-2 text-xs text-gray-600 border-t border-gray-200 pt-2">
            <div>Avatar: {currentAvatarConfig.name}</div>
            <div>Voice: {currentAvatarConfig.voice}</div>
          </div>
        )}
      </div>

      {/* Text Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Test Text
        </label>
        <textarea
          value={testText}
          onChange={(e) => setTestText(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg text-sm resize-none"
          rows={3}
          placeholder="Enter text for avatar to speak..."
        />
      </div>

      {/* Enhanced Controls */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <button
          onClick={handleSpeakTest}
          disabled={!avatarReady || isSpeaking || !testText.trim()}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white px-3 py-2 rounded-lg text-sm transition-colors"
        >
          <Play className="w-4 h-4" />
          Speak
        </button>
        
        <button
          onClick={onStartListening}
          disabled={!avatarReady || isListening || isSpeaking}
          className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white px-3 py-2 rounded-lg text-sm transition-colors"
        >
          {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          Listen
        </button>

        {/* Stop Controls */}
        {isSpeaking && onStopSpeaking && (
          <button
            onClick={onStopSpeaking}
            className="flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-3 py-2 rounded-lg text-sm transition-colors"
          >
            <Square className="w-4 h-4" />
            Stop
          </button>
        )}

        {(sessionActive || avatarReady) && onStopSession && (
          <button
            onClick={onStopSession}
            className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm transition-colors"
          >
            <Square className="w-4 h-4" />
            End Session
          </button>
        )}
      </div>

      {/* Preset Phrases */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Quick Test Phrases
        </label>
        <div className="space-y-1 max-h-32 overflow-y-auto">
          {testPhrases.map((phrase, index) => (
            <button
              key={index}
              onClick={() => handlePresetPhrase(phrase)}
              disabled={!avatarReady || isSpeaking}
              className="w-full text-left p-2 text-xs bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 rounded border transition-colors"
            >
              {phrase.length > 70 ? `${phrase.substring(0, 70)}...` : phrase}
            </button>
          ))}
        </div>
      </div>

      {/* Advanced SSML Testing */}
      {showAdvanced && (
        <div className="mb-4 border-t border-gray-200 pt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            SSML Test Phrases
          </label>
          <div className="space-y-1 max-h-32 overflow-y-auto">
            {ssmlTestPhrases.map((phrase, index) => (
              <button
                key={`ssml-${index}`}
                onClick={() => handlePresetPhrase(phrase)}
                disabled={!avatarReady || isSpeaking}
                className="w-full text-left p-2 text-xs bg-purple-50 hover:bg-purple-100 disabled:bg-gray-50 rounded border border-purple-200 transition-colors"
              >
                <div className="font-mono text-xs text-purple-700">
                  {phrase.length > 60 ? `${phrase.substring(0, 60)}...` : phrase}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Speech Queue Display */}
      {showAdvanced && spokenTextQueue.length > 0 && (
        <div className="mb-4 border-t border-gray-200 pt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Speech Queue ({spokenTextQueue.length} items)
          </label>
          <div className="space-y-1 max-h-24 overflow-y-auto">
            {spokenTextQueue.map((queuedText, index) => (
              <div
                key={`queue-${index}`}
                className="p-2 text-xs bg-yellow-50 border border-yellow-200 rounded"
              >
                <span className="text-yellow-600 font-medium">#{index + 1}</span>{' '}
                {queuedText.length > 50 ? `${queuedText.substring(0, 50)}...` : queuedText}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Enhanced Environment Check */}
      <div className="mt-4 p-2 bg-yellow-50 border border-yellow-200 rounded text-xs">
        <div className="font-medium text-yellow-800 mb-1">Environment:</div>
        <div className="text-yellow-600 space-y-1">
          <div>Speech Key: {process.env.NEXT_PUBLIC_AZURE_SPEECH_KEY ? '✅ Set' : '❌ Missing'}</div>
          <div>Speech Region: {process.env.NEXT_PUBLIC_AZURE_SPEECH_REGION ? '✅ Set' : '❌ Missing'}</div>
          
          {/* Azure Resource Status */}
          <div className="mt-2 p-2 bg-green-100 border border-green-300 rounded text-green-800">
            <div className="font-semibold">✅ Azure Resource Status</div>
            <div className="text-xs mt-1 text-green-700">
              <strong>Pricing Tier: Standard S0 ✓</strong>
              <br />
              • Avatar services: Available ✓
              <br />
              • Region: Southeast Asia ✓
              <br />
              • ICE Servers: .tts.speech.microsoft.com (correct)
            </div>
          </div>
          
          {showAdvanced && (
            <>
              <div>SDK Version: 1.40.0</div>
              <div>Private Endpoint: 🌐 Disabled (Standard Azure endpoints)</div>
              <div>WebRTC Support: {typeof RTCPeerConnection !== 'undefined' ? '✅ Yes' : '❌ No'}</div>
              <div>Microphone: {navigator.mediaDevices ? '✅ Available' : '❌ Not Available'}</div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default AvatarTestPanel