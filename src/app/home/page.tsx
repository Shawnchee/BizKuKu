'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Send, Upload, Paperclip, X, Bot, Sparkles, TrendingUp, FileText, CreditCard, Settings, Mic, BookOpen, MessageCircle} from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { useUser } from '@/contexts/UserContext'
import GradientBackground from "@/components/backgrounds/GradientBackground"
import { motion, AnimatePresence } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import TypewriterText from '@/components/animation/TypewriterText'
import AzureAvatar from '@/components/avatar/AzureAvatar'
import AvatarTestPanel from '@/components/avatar/AvatarTestPanel'
import { useAzureAvatarEnhanced } from '@/hooks/useAzureAvatarEnhanced'
import FinancialSnapshot from '@/components/chatbot/FinancialSnapshot'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
  files?: File[]
  customComponent?: React.ReactNode
}

const API_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:8000/api/chat' : '/api/chat';

export default function AuthenticatedHome() {
  const { t, language } = useLanguage()
  const { user } = useUser()
  const [selectedAction, setSelectedAction] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasUserSentMessage, setHasUserSentMessage] = useState(false)
  const [isAvatarSpeaking, setIsAvatarSpeaking] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Enhanced Azure Avatar integration
  const {
    isListening,
    isSpeaking,
    avatarReady,
    error: avatarError,
    isProcessing,
    speakText,
    processTextInput,
    startListening,
    stopSpeaking,
    stopListening,
    clearError,
    handleSpeechRecognized,
    handleSpeechStart,
    handleSpeechEnd,
    handleAvatarReady,
    handleAvatarError
  } = useAzureAvatarEnhanced({
    onSpeechRecognized: (text) => {
      // Ensure text is a string and has content
      const speechText = typeof text === 'string' ? text.trim() : ''
      if (speechText) {
        setInputMessage(speechText)
        // Auto-process speech with context
        handleSendMessage(speechText, true)
      }
    },
    onError: (error) => {
      console.error('Avatar error:', error)
    },
    autoProcessSpeech: true,
    chatEndpoint: '/api/chatbot'
  })

  useEffect(() => {
    setIsAvatarSpeaking(isSpeaking)
  }, [isSpeaking])

  // Auto-show financial snapshot for XinJie
  useEffect(() => {
    if (user?.full_name === 'XinJie' && !hasUserSentMessage) {
      // Automatically show financial snapshot
      const botMessage: Message = {
        id: Date.now().toString(),
        text: '',
        sender: 'bot',
        timestamp: new Date(),
        customComponent: <FinancialSnapshot onExploreGrants={handleExploreGrants} />
      }
      
      setMessages([botMessage])
      setHasUserSentMessage(true)
    }
  }, [user?.full_name, hasUserSentMessage])

  // Add this function to handle stopping the avatar from speaking
  const handleStopSpeaking = async () => {
    await stopSpeaking()
    setIsAvatarSpeaking(false) // Immediately update local state
    
    // Force update any parent components that might be listening to speaking state
    handleSpeakingStateChange(false)
  }

  const handleSpeakingStateChange = (speaking: boolean) => {
    console.log('🔊 Avatar speaking state changed:', speaking)
    setIsAvatarSpeaking(speaking)
  }

  const actionButtons = [
    {
      id: 'application-progress',
      title: 'Check Application Status',
      titleMs: 'Semak Status Permohonan',
      icon: FileText,
      color: 'from-blue-400 to-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      summary: 'Your SSM registration is approved and QR merchant setup is in progress. Expected completion in 2-3 working days.',
      summaryMs: 'Pendaftaran SSM anda telah diluluskan dan setup QR pedagang sedang dalam proses. Dijangka siap dalam 2-3 hari bekerja.',
      linkTo: '/application-status',
      tab: 'Application Status'
    },
    {
      id: 'online-business',
      title: 'Start Online Business Platform',
      titleMs: 'Mulakan Perniagaan Dalam Talian',
      icon: TrendingUp,
      color: 'from-green-400 to-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      summary: 'Your business is performing well with steady growth in online sales. Monthly revenue shows a 15% increase compared to last month.',
      summaryMs: 'Perniagaan anda berprestasi baik dengan pertumbuhan stabil dalam jualan dalam talian. Hasil bulanan menunjukkan peningkatan 15% berbanding bulan lepas.',
      linkTo: '/online-bizzku',
      tab: 'Online Bizzku'
    },
    {
      id: 'mini-services',
      title: 'Access Digital Business Toolkit',
      titleMs: 'Akses Alat Perniagaan Digital',
      icon: Settings,
      color: 'from-orange-400 to-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      summary: 'Access quick business tools: QR generator, invoice maker, tax calculator, and more utility services.',
      summaryMs: 'Akses alat perniagaan pantas: penjana QR, pembuat invois, kalkulator cukai, dan lebih banyak perkhidmatan utiliti.',
      linkTo: '/mini-services',
      tab: 'Digital Business Toolkit'
    },
    {
      id: 'business-insights',
      title: 'View Financial Insights',
      titleMs: 'Lihat Analisis Kewangan',
      icon: Sparkles,
      color: 'from-pink-400 to-pink-600',
      bgColor: 'bg-pink-50',
      borderColor: 'border-pink-200',
      summary: 'Your customer retention rate is 85%. Best selling product: Traditional snacks. Peak hours: 2-4 PM.',
      summaryMs: 'Kadar pengekalan pelanggan anda adalah 85%. Produk terlaris: Kudapan tradisional. Waktu puncak: 2-4 petang.',
      linkTo: '/dashboard',
      tab: 'Financial Dashboard'
    },
    {
      id: 'grants-loans',
      title: 'Apply for Loan, Grant or Subsidy',
      titleMs: 'Memohon Pinjaman, Geran atau Subsidi',
      icon: CreditCard,
      color: 'from-purple-400 to-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      summary: 'You have 2 pending grant applications and 1 loan pre-approval. Total potential funding: RM 150,000.',
      summaryMs: 'Anda mempunyai 2 permohonan geran yang belum selesai dan 1 pra-kelulusan pinjaman. Jumlah pembiayaan berpotensi: RM 150,000.',
      linkTo: '/recommendation',
      tab: 'Funding Recommendation'
    },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleActionClick = (action: any) => {
    setSelectedAction(action.id)
    if (action.linkTo) {
      // Will handle navigation after showing summary
      setTimeout(() => {
        window.location.href = action.linkTo
      }, 3000)
    }
  }

  const handleSendMessage = async (messageText?: string, autoSubmit = false) => {
    // Ensure we always work with strings
    const textToSend = String(messageText || inputMessage || '').trim()
    if (!textToSend && selectedFiles.length === 0) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: textToSend,
      sender: 'user',
      timestamp: new Date(),
      files: selectedFiles.length > 0 ? [...selectedFiles] : undefined
    }

    setMessages(prev => [...prev, userMessage])
    // Clear input if it's not from speech recognition (autoSubmit = false)
    if (!autoSubmit) {
      setInputMessage('') 
    }
    setSelectedFiles([])
    setIsLoading(true)
    setHasUserSentMessage(true)

    try {

      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: userMessage.text,
          message_history: messages.map(msg => ({ role: msg.sender === 'user' ? 'user' : 'model', content: msg.text })),
        }),
      });
      const data = await res.json();

      setIsLoading(false);

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response || `I received your message: "${userMessage.text}"${selectedFiles.length > 0 ? ` and ${selectedFiles.length} file(s)` : ''}. This is a demo response.`,
        sender: 'bot',
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, botMessage])
      
      // Use Azure Avatar to speak the response if available
      if (avatarReady && botMessage.text) {
        try {
          await speakText(botMessage.text)
        } catch (error) {
          console.error('Error speaking response:', error)
        }
      }
      
    } catch (err) {
      console.error(err);
      // Also stop loading on error
      setIsLoading(false);

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: `I received your message: "${userMessage.text}"${selectedFiles.length > 0 ? ` and ${selectedFiles.length} file(s)` : ''}. This is a demo response.`,
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botMessage])
      
      // Speak error response if avatar is available
      if (avatarReady && botMessage.text) {
        try {
          await speakText(botMessage.text)
        } catch (error) {
          console.error('Error speaking response:', error)
        }
      }
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setSelectedFiles(prev => [...prev, ...files])
  }

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index))
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const handleExploreGrants = () => {
    // Navigate to grants page or show grants modal
    window.location.href = '/recommendation'
  }

  const canInteract = !isLoading && !isAvatarSpeaking && !isProcessing

  return (
    <div className="relative min-h-screen overflow-hidden">
      <GradientBackground />
      
      <div className="relative z-10 flex h-screen">
        {/* Left Side - Avatar Section */}
        <div className="w-1/2 flex flex-col items-center justify-center p-8">
          <h2 className="text-xl md:text-3xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
              Your MSME Digital Copilot
            </span>
          </h2>
          {/* Avatar Container */}
          <div className="relative mb-8">
            <AzureAvatar
              onSpeechRecognized={handleSpeechRecognized}
              onSpeechStart={handleSpeechStart}
              onSpeechEnd={handleSpeechEnd}
              onAvatarReady={handleAvatarReady}
              onError={handleAvatarError}
              fallbackToRobot={true}
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
          </div>
        </div>

        {/* Right Side - Actions and Chat */}
        <div className="w-1/2 flex flex-col px-8 py-6">
          {!hasUserSentMessage && (
            <div className="mb-2">
              {/* Action Buttons */}
              <div className="space-y-4 mb-8">
                {actionButtons.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <div
                      key={action.id}
                      onClick={() => handleActionClick(action)}
                      className="bg-white/60 backdrop-blur-lg rounded-2xl p-4 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-white/95 group"
                    >
                      <div className="flex items-center gap-4">
                        {/* Icon */}
                        <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300 flex-shrink-0`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        
                        {/* Title */}
                        <h3 className="text-base font-semibold text-gray-700 flex-1">
                          {language === 'ms' ? action.titleMs : action.title}
                        </h3>
                      </div>

                      {selectedAction === action.id && (
                        <div className="mt-4 p-4 bg-black/10 backdrop-blur-sm rounded-lg border border-black/20 animate-fadeIn">
                          <p className="text-sm text-gray-800">
                            {language === 'ms' ? action.summaryMs : action.summary}
                          </p>
                          {action.linkTo && (
                            <div className="mt-2 text-xs text-blue-700 font-medium">
                              Redirecting to {action.tab}...
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Chat Interface */}
          <div className={`${messages.length > 0 ? 'flex-1' : 'h-auto'} bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl border border-white/30 p-6 flex flex-col overflow-hidden`}>
            {/* Chat Messages */}
            <div className={`overflow-y-auto space-y-4 ${messages.length > 0 ? 'flex-1 min-h-0' : 'h-auto'}`}>
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                        message.sender === 'user'
                          ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                          : 'bg-gray-100 text-gray-800 shadow-lg border border-gray-200'
                      }`}
                    >
                      <div className="text-sm leading-relaxed">
                        {message.sender === 'bot' ? (
                          <>
                            <TypewriterText 
                              text={message.text}
                              speed={40}
                              delay={300}
                              renderAsMarkdown={true}
                              cursor={true}
                            />
                            {message.customComponent && (
                              <div className="mt-4">
                                {message.customComponent}
                              </div>
                            )}
                          </>
                        ) : (
                          message.text
                        )}
                      </div>
                      
                      {/* File attachments */}
                      {message.files && message.files.length > 0 && (
                        <div className="mt-3 space-y-2">
                          {message.files.map((file, index) => (
                            <div
                              key={index}
                              className={`flex items-center space-x-2 p-2 rounded-lg ${
                                message.sender === 'user'
                                  ? 'bg-white/20'
                                  : 'bg-gray-50'
                              }`}
                            >
                              <Paperclip className="w-4 h-4" />
                              <span className="text-xs truncate">{file.name}</span>
                              <span className="text-xs opacity-70">
                                ({formatFileSize(file.size)})
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      <p className={`text-xs mt-2 ${
                        message.sender === 'user' ? 'text-white/70' : 'text-gray-500'
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Loading indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-gray-100 text-gray-800 shadow-lg border border-gray-200 rounded-2xl px-4 py-3">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                      <span className="text-sm text-gray-600">Typing...</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
            <div ref={messagesEndRef} />

            {/* File Preview */}
            {selectedFiles.length > 0 && (
              <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex flex-wrap gap-2">
                  {selectedFiles.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 bg-white rounded-lg px-3 py-2 border border-gray-200"
                    >
                      <Paperclip className="w-4 h-4 text-gray-600" />
                      <span className="text-sm text-gray-700 truncate max-w-32">
                        {file.name}
                      </span>
                      <span className="text-xs text-gray-500">
                        ({formatFileSize(file.size)})
                      </span>
                      <button
                        onClick={() => removeFile(index)}
                        className="text-gray-500 hover:text-red-500 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="flex items-end space-x-3">
              <div className="flex-1 relative">
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={t('chatbot.placeholder') || 'Ask anything...'}
                  className="w-full resize-none border border-gray-300 rounded-2xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  rows={1}
                  style={{ minHeight: '48px', maxHeight: '120px' }}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="p-3 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-full transition-colors"
                  title="Attach file"
                >
                  <Upload className="w-5 h-5" />
                </button>
                
                {/* Voice Button */}
                <button
                  type="button"
                  onClick={() => {
                    if (avatarReady && !isListening && !isSpeaking && !isLoading && !isProcessing) {
                      startListening();
                    }
                  }}
                  disabled={!avatarReady || isListening || isSpeaking || isLoading || isProcessing}
                  className={`p-3 rounded-full transition-all duration-200 transform hover:scale-105 ${
                    isListening
                      ? 'bg-red-500 text-white animate-pulse'
                      : avatarReady
                      ? 'text-gray-600 hover:text-green-600 hover:bg-green-50'
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
                  <Mic className="w-5 h-5" />
                </button>
                
                {/* Add Stop Speaking Button */}
                {isAvatarSpeaking && (
                  <button
                    onClick={handleStopSpeaking}
                    className="p-3 bg-orange-500 hover:bg-orange-600 text-white rounded-full transition-all duration-200 transform hover:scale-105"
                    title={language === 'ms' ? 'Hentikan bercakap' : 'Stop speaking'}
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
                
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  disabled={(!inputMessage.trim() && selectedFiles.length === 0) || isLoading || isAvatarSpeaking}
                  className="p-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
                  title="Send message"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={handleFileSelect}
              className="hidden"
              accept="*/*"
            />
            
            <p className="text-xs text-gray-500 mt-2 text-center">
              Press Enter to send • Shift+Enter for new line
            </p>

            {/* Clear Chat Button */}
            {messages.length > 1 && (
              <button 
                onClick={() => {
                  setMessages([])
                  setHasUserSentMessage(false)
                }} 
                className="mt-4 block w-full text-center text-red-600 hover:text-red-800 text-sm"
              >
                Clear Chat
              </button>
            )}
          </div>
        </div>
      </div>

      {/* CSS for avatar animation */}
      <style jsx>{`
        @keyframes avatarPulse {
          0%, 100% { 
            transform: scale(1);
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          }
          50% { 
            transform: scale(1.1);
            box-shadow: 0 25px 50px -12px rgba(59, 130, 246, 0.5);
          }
        }
        
        .animate-avatar-pulse {
          animation: avatarPulse 3s ease-in-out infinite;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>

      {/* Enhanced Avatar Test Panel (Development)
      {process.env.NODE_ENV === 'development' && (
        <AvatarTestPanel
          onSpeakText={speakText}
          onStartListening={startListening}
          onStopSpeaking={stopSpeaking}
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
      )} */}
    </div>
  )
}