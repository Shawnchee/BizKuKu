'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { MessageCircle, Upload, Mic, Bot, Sparkles, TrendingUp, FileText, CreditCard, Settings } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import AzureAvatar from '@/components/avatar/AzureAvatar'
import AvatarTestPanel from '@/components/avatar/AvatarTestPanel'
import { useAzureAvatarEnhanced } from '@/hooks/useAzureAvatarEnhanced'

export default function Home() {
  const { t, language } = useLanguage()
  const [selectedAction, setSelectedAction] = useState<string | null>(null)
  const [chatMessage, setChatMessage] = useState('')
  const [isAvatarPulsing, setIsAvatarPulsing] = useState(true)
  const [floatingElements, setFloatingElements] = useState<number[]>([])
  const [isProcessingChat, setIsProcessingChat] = useState(false)

  // Enhanced Azure Avatar integration with direct backend processing
  const {
    isListening,
    isSpeaking,
    avatarReady,
    error: avatarError,
    isProcessing,
    speakText,
    processTextInput,
    clearError,
    handleSpeechRecognized,
    handleSpeechStart,
    handleSpeechEnd,
    handleAvatarReady,
    handleAvatarError
  } = useAzureAvatarEnhanced({
    onSpeechRecognized: (text) => {
      setChatMessage(text)
      // Speech is auto-processed by the enhanced hook
    },
    onError: (error) => {
      console.error('Avatar error:', error)
    },
    autoProcessSpeech: true, // Enable automatic processing of speech input
    chatEndpoint: '/api/chatbot'
  })

  useEffect(() => {
    // Create floating elements for background decoration
    setFloatingElements(Array.from({ length: 6 }, (_, i) => i))
    
    // Avatar pulsing animation
    const interval = setInterval(() => {
      setIsAvatarPulsing(prev => !prev)
    }, 3000)
    
    return () => clearInterval(interval)
  }, [])

  const actionButtons = [
    {
      id: 'online-business',
      title: 'Online Business',
      titleMs: 'Perniagaan Dalam Talian',
      icon: TrendingUp,
      color: 'from-emerald-400 to-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      summary: 'Your business is performing well with steady growth in online sales. Monthly revenue shows a 15% increase compared to last month.',
      summaryMs: 'Perniagaan anda berprestasi baik dengan pertumbuhan stabil dalam jualan dalam talian. Hasil bulanan menunjukkan peningkatan 15% berbanding bulan lepas.',
      linkTo: null
    },
    {
      id: 'application-progress',
      title: 'Application Progress',
      titleMs: 'Kemajuan Permohonan',
      icon: FileText,
      color: 'from-blue-400 to-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      summary: 'Your SSM registration is approved and QR merchant setup is in progress. Expected completion in 2-3 working days.',
      summaryMs: 'Pendaftaran SSM anda telah diluluskan dan setup QR pedagang sedang dalam proses. Dijangka siap dalam 2-3 hari bekerja.',
      linkTo: '/application-status'
    },
    {
      id: 'financial-insight',
      title: "Today's Financial Insight",
      titleMs: 'Pandangan Kewangan Hari Ini',
      icon: Sparkles,
      color: 'from-purple-400 to-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      summary: "Today's sales: RM450. This month: RM12,300. You're on track to exceed last month's performance by 8%.",
      summaryMs: 'Jualan hari ini: RM450. Bulan ini: RM12,300. Anda sedang menuju untuk melebihi prestasi bulan lepas sebanyak 8%.',
      linkTo: '/dashboard'
    },
    {
      id: 'grant-subsidy',
      title: 'Grant/Subsidy/Loan',
      titleMs: 'Geran/Subsidi/Pinjaman',
      icon: CreditCard,
      color: 'from-orange-400 to-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      summary: 'Based on your profile, you qualify for 3 funding opportunities: Digital Grant (RM5,000), TEKUN Loan (RM10,000), and BUDI MADANI subsidy (RM2,400/year).',
      summaryMs: 'Berdasarkan profil anda, anda layak untuk 3 peluang pembiayaan: Geran Digital (RM5,000), Pinjaman TEKUN (RM10,000), dan subsidi BUDI MADANI (RM2,400/tahun).',
      linkTo: '/recommendation'
    },
    {
      id: 'mini-services',
      title: 'Mini Services',
      titleMs: 'Perkhidmatan Mini',
      icon: Settings,
      color: 'from-teal-400 to-teal-600',
      bgColor: 'bg-teal-50',
      borderColor: 'border-teal-200',
      summary: 'Available services: QR payment setup, business registration assistance, tax filing support, and digital marketing tools.',
      summaryMs: 'Perkhidmatan tersedia: Setup pembayaran QR, bantuan pendaftaran perniagaan, sokongan pemfailan cukai, dan alat pemasaran digital.',
      linkTo: null
    }
  ]

  const handleActionClick = (actionId: string) => {
    setSelectedAction(selectedAction === actionId ? null : actionId)
  }

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!chatMessage.trim() || isProcessingChat || isProcessing) return

    const userMessage = chatMessage.trim()
    setChatMessage('')
    setIsProcessingChat(true)

    try {
      // Use the enhanced avatar's direct processing for better integration
      await processTextInput(userMessage)
    } catch (error) {
      console.error('Error processing chat:', error)
      const errorMessage = language === 'ms' 
        ? 'Maaf, terdapat masalah. Sila cuba lagi.' 
        : 'Sorry, there was an error. Please try again.'
      
      if (avatarReady) {
        await speakText(errorMessage)
      }
    } finally {
      setIsProcessingChat(false)
    }
  }

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Upper Half - Full Azure Avatar TTS Section */}
      <div className="h-screen flex flex-col">
        {/* Avatar Section - Upper Half */}
        <div className="flex-1 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden flex flex-col justify-center items-center">
          {/* Floating Background Elements */}
          {floatingElements.map((i) => (
            <div
              key={i}
              className={`absolute opacity-5 animate-bounce`}
              style={{
                left: `${10 + (i * 15)}%`,
                top: `${5 + (i * 15)}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${3 + (i * 0.5)}s`
              }}
            >
              <div className={`w-16 h-16 rounded-full bg-gradient-to-br from-blue-300 to-purple-300`} />
            </div>
          ))}
          
          {/* Azure Avatar - Direct and prominent */}
          <div className="relative z-10">
            <AzureAvatar
              onSpeechRecognized={handleSpeechRecognized}
              onSpeechStart={handleSpeechStart}
              onSpeechEnd={handleSpeechEnd}
              onAvatarReady={handleAvatarReady}
              onError={handleAvatarError}
              fallbackToRobot={false}
              className="mx-auto"
            />
            
            {/* Minimal Error Display */}
            {avatarError && (
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 p-3 bg-red-50 border border-red-200 rounded-lg max-w-sm backdrop-blur-sm bg-opacity-90">
                <p className="text-xs text-red-600 text-center">
                  {avatarError}
                </p>
                <button
                  onClick={clearError}
                  className="block mx-auto mt-2 text-xs text-red-500 hover:text-red-700 underline"
                >
                  {language === 'ms' ? 'Tutup' : 'Dismiss'}
                </button>
              </div>
            )}
            
            {/* Minimal Processing Indicator */}
            {(isProcessingChat || isProcessing) && (
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg backdrop-blur-sm bg-opacity-90">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-xs text-blue-600">
                    {isProcessing 
                      ? (language === 'ms' ? 'Memproses...' : 'Processing...') 
                      : (language === 'ms' ? 'Memproses...' : 'Processing...')
                    }
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Lower Half - Content Section */}
        <div className="flex-1 bg-white relative overflow-hidden">
          <div className="max-w-6xl mx-auto px-4 py-8 h-full flex flex-col justify-center">
            
            {/* Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
              {actionButtons.map((action, index) => {
                const IconComponent = action.icon
                return (
                  <div key={action.id} className="relative group">
                    <button
                      onClick={() => handleActionClick(action.id)}
                      className={`w-full p-4 rounded-xl border-2 transition-all duration-300 text-center transform hover:scale-105 hover:-translate-y-1 ${
                        selectedAction === action.id
                          ? `${action.borderColor} ${action.bgColor} shadow-xl scale-105 -translate-y-1`
                          : `border-gray-200 bg-white hover:${action.borderColor} hover:shadow-lg`
                      }`}
                      style={{
                        animationDelay: `${index * 0.1}s`
                      }}
                    >
                      {/* Icon with gradient background */}
                      <div className={`w-10 h-10 mx-auto mb-3 rounded-lg bg-gradient-to-r ${action.color} flex items-center justify-center shadow-md transform group-hover:rotate-6 transition-transform duration-300`}>
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>
                      
                      <div className="font-semibold text-gray-900 text-xs leading-tight">
                        {language === 'ms' ? action.titleMs : action.title}
                      </div>
                      
                      {/* Hover indicator */}
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                    </button>

                    {/* Enhanced Executive Summary Popup */}
                    {selectedAction === action.id && (
                      <div className="absolute top-full left-0 right-0 mt-4 bg-white rounded-xl shadow-2xl border border-gray-100 p-4 z-20 transform animate-in slide-in-from-top-2 duration-300">
                        <div className="flex items-center gap-2 mb-3">
                          <div className={`w-6 h-6 rounded-md bg-gradient-to-r ${action.color} flex items-center justify-center`}>
                            <IconComponent className="w-3 h-3 text-white" />
                          </div>
                          <h3 className="font-bold text-gray-900 text-sm">
                            {language === 'ms' ? 'Ringkasan Eksekutif' : 'Executive Summary'}
                          </h3>
                        </div>
                        <p className="text-xs text-gray-700 mb-3 leading-relaxed">
                          {language === 'ms' ? action.summaryMs : action.summary}
                        </p>
                        
                        {action.linkTo && (
                          <Link
                            href={action.linkTo}
                            className={`inline-flex items-center gap-1 bg-gradient-to-r ${action.color} text-white px-3 py-2 rounded-lg text-xs font-medium hover:shadow-md transform hover:scale-105 transition-all duration-200`}
                          >
                            {language === 'ms' ? 'Ketahui Lebih Lanjut' : 'Learn More'}
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </Link>
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Enhanced Chat Interface */}
            <div className="bg-gradient-to-r from-gray-50 to-white rounded-2xl shadow-xl border border-gray-100 p-6 relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full -translate-y-12 translate-x-12 opacity-50" />
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-pink-100 to-yellow-100 rounded-full translate-y-8 -translate-x-8 opacity-50" />
              
              <form onSubmit={handleChatSubmit} className="flex items-center space-x-3 relative z-10">
                <div className="flex-1 relative group">
                  <input
                    type="text"
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    placeholder={language === 'ms' 
                      ? 'Tanya soalan, muat naik fail, atau gunakan suara...' 
                      : 'Ask questions, upload files, or use voice...'
                    }
                    className="w-full px-4 py-3 pr-20 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all duration-300 text-gray-800 placeholder-gray-500 shadow-inner bg-white"
                  />
                  
                  {/* Upload Button */}
                  <button
                    type="button"
                    className="absolute right-12 top-1/2 transform -translate-y-1/2 p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 transition-all duration-300"
                    title={language === 'ms' ? 'Muat naik fail' : 'Upload file'}
                  >
                    <Upload className="w-4 h-4" />
                  </button>
                  
                  {/* Voice Button */}
                  <button
                    type="button"
                    onClick={() => {
                      if (avatarReady && !isListening && !isSpeaking) {
                        document.querySelector('[title*="speak"]')?.dispatchEvent(new Event('click'))
                      }
                    }}
                    disabled={!avatarReady || isListening || isSpeaking || isProcessingChat || isProcessing}
                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1.5 rounded-lg transition-all duration-300 ${
                      isListening
                        ? 'text-white bg-gradient-to-r from-red-500 to-red-600 animate-pulse'
                        : avatarReady
                        ? 'text-gray-500 hover:text-white hover:bg-gradient-to-r hover:from-green-500 hover:to-teal-500'
                        : 'text-gray-300 cursor-not-allowed'
                    }`}
                    title={
                      !avatarReady
                        ? (language === 'ms' ? 'Avatar tidak siap' : 'Avatar not ready')
                        : isListening
                        ? (language === 'ms' ? 'Mendengar...' : 'Listening...')
                        : (language === 'ms' ? 'Mesej suara' : 'Voice message')
                    }
                  >
                    <Mic className="w-4 h-4" />
                  </button>
                </div>
                
                {/* Send Button */}
                <button
                  type="submit"
                  disabled={isProcessingChat || isProcessing || !chatMessage.trim()}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white p-3 rounded-xl transition-all duration-300 flex items-center shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {(isProcessingChat || isProcessing) ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <MessageCircle className="w-5 h-5" />
                  )}
                </button>
              </form>
              
              <div className="mt-4 text-xs text-gray-500 text-center relative z-10">
                <div className="flex items-center justify-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                    <div className="w-1.5 h-1.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-1.5 h-1.5 bg-gradient-to-r from-pink-400 to-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                  <span className="font-medium">
                    {language === 'ms' 
                      ? 'Dikuasakan oleh Azure AI - Semua perbualan adalah selamat dan sulit'
                      : 'Powered by Azure AI - All conversations are secure and confidential'
                    }
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Avatar Test Panel (Development) */}
      {process.env.NODE_ENV === 'development' && (
        <AvatarTestPanel
          onSpeakText={speakText}
          onStartListening={() => {
            // Trigger avatar listening if available
            if (typeof window !== 'undefined' && (window as any).azureAvatar?.startListening) {
              (window as any).azureAvatar.startListening()
            }
          }}
          onStopSpeaking={() => {
            // Trigger stop speaking if available
            if (typeof window !== 'undefined' && (window as any).azureAvatar?.stopSpeaking) {
              (window as any).azureAvatar.stopSpeaking()
            }
          }}
          onStopSession={() => {
            // Trigger session stop if available
            if (typeof window !== 'undefined' && (window as any).azureAvatar?.stopSession) {
              (window as any).azureAvatar.stopSession()
            }
          }}
          avatarReady={avatarReady}
          isListening={isListening}
          isSpeaking={isSpeaking}
          isReconnecting={typeof window !== 'undefined' ? (window as any).azureAvatar?.isReconnecting || false : false}
          sessionActive={typeof window !== 'undefined' ? (window as any).azureAvatar?.isReady || false : false}
          currentAvatarConfig={typeof window !== 'undefined' ? (window as any).azureAvatar?.currentConfig : null}
          spokenTextQueue={[]}
        />
      )}
    </div>
  )
}
