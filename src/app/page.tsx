'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { MessageCircle, Upload, Mic, Bot, Sparkles, TrendingUp, FileText, CreditCard, Settings } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Home() {
  const { t } = useLanguage()
  const [selectedAction, setSelectedAction] = useState<string | null>(null)
  const [chatMessage, setChatMessage] = useState('')
  const [isAvatarPulsing, setIsAvatarPulsing] = useState(true)
  const [floatingElements, setFloatingElements] = useState<number[]>([])

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
      title: 'Online Bizzku',
      titleMs: 'Perniagaan Dalam Talian',
      icon: TrendingUp,
      color: 'from-emerald-400 to-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      summary: 'Your business is performing well with steady growth in online sales. Monthly revenue shows a 15% increase compared to last month.',
      summaryMs: 'Perniagaan anda berprestasi baik dengan pertumbuhan stabil dalam jualan dalam talian. Hasil bulanan menunjukkan peningkatan 15% berbanding bulan lepas.',
      linkTo: '/online-bizzku'
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
      linkTo: '/mini-services'
    }
  ]

  const handleActionClick = (actionId: string) => {
    setSelectedAction(selectedAction === actionId ? null : actionId)
  }

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Integrate with Azure AI SDK
    console.log('Chat message:', chatMessage)
    setChatMessage('')
  }

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Floating Background Elements */}
      {floatingElements.map((i) => (
        <div
          key={i}
          className={`absolute opacity-5 animate-bounce`}
          style={{
            left: `${20 + (i * 15)}%`,
            top: `${10 + (i * 10)}%`,
            animationDelay: `${i * 0.5}s`,
            animationDuration: `${3 + (i * 0.5)}s`
          }}
        >
          <div className={`w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-400`} />
        </div>
      ))}
      
      <div className="max-w-6xl mx-auto px-4 py-8 relative z-10">
        
        {/* 3D Avatar Section */}
        <div className="text-center mb-12">
          <div className="relative inline-block">
            {/* Avatar Mockup with enhanced styling */}
            <div className={`w-56 h-56 mx-auto mb-6 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl transform transition-all duration-1000 ${isAvatarPulsing ? 'scale-105' : 'scale-100'}`}>
              <div className="w-52 h-52 bg-white rounded-full flex items-center justify-center">
                <Bot className="w-28 h-28 text-blue-600 animate-pulse" />
              </div>
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 opacity-20 animate-ping" />
            </div>
            
            {/* Enhanced Speech Bubble */}
            <div className="absolute -top-6 -right-12 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl px-6 py-3 shadow-xl transform hover:scale-105 transition-transform duration-300">
              <div className="text-sm font-medium">
                {t('language') === 'ms' ? 'Hai! Macam mana saya boleh bantu?' : 'Hi! How can I help?'}
              </div>
              <div className="absolute bottom-0 left-8 transform translate-y-1/2 rotate-45 w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-600" />
              {/* Sparkle effect */}
              <Sparkles className="absolute -top-2 -right-2 w-4 h-4 text-yellow-300 animate-spin" />
            </div>
          </div>
          
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            {t('language') === 'ms' ? 'Asisten Perniagaan AI Anda' : 'Your AI Business Assistant'}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('language') === 'ms' 
              ? 'Dapatkan pandangan perniagaan, semak kemajuan, dan tanya soalan apa sahaja!'
              : 'Get business insights, check progress, and ask me anything!'
            }
          </p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-12">
          {actionButtons.map((action, index) => {
            const IconComponent = action.icon
            return (
              <div key={action.id} className="relative group">
                <button
                  onClick={() => handleActionClick(action.id)}
                  className={`w-full p-6 rounded-2xl border-2 transition-all duration-300 text-center transform hover:scale-105 hover:-translate-y-2 ${
                    selectedAction === action.id
                      ? `${action.borderColor} ${action.bgColor} shadow-2xl scale-105 -translate-y-2`
                      : `border-gray-200 bg-white hover:${action.borderColor} hover:shadow-xl`
                  }`}
                  style={{
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  {/* Icon with gradient background */}
                  <div className={`w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-r ${action.color} flex items-center justify-center shadow-lg transform group-hover:rotate-6 transition-transform duration-300`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="font-semibold text-gray-900 text-sm leading-tight">
                    {t('language') === 'ms' ? action.titleMs : action.title}
                  </div>
                  
                  {/* Hover indicator */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                </button>

                {/* Enhanced Executive Summary Popup */}
                {selectedAction === action.id && (
                  <div className="absolute top-full left-0 right-0 mt-4 bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 z-20 transform animate-in slide-in-from-top-2 duration-300">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${action.color} flex items-center justify-center`}>
                        <IconComponent className="w-4 h-4 text-white" />
                      </div>
                      <h3 className="font-bold text-gray-900">
                        {t('language') === 'ms' ? 'Ringkasan Eksekutif' : 'Executive Summary'}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                      {t('language') === 'ms' ? action.summaryMs : action.summary}
                    </p>
                    
                    {action.linkTo && (
                      <Link
                        href={action.linkTo}
                        className={`inline-flex items-center gap-2 bg-gradient-to-r ${action.color} text-white px-5 py-3 rounded-xl text-sm font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200`}
                      >
                        {t('language') === 'ms' ? 'Ketahui Lebih Lanjut' : 'Learn More'}
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    )}
                    
                    {/* Floating particles effect */}
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full animate-ping" />
                    <div className="absolute -bottom-1 -left-1 w-1 h-1 bg-blue-400 rounded-full animate-bounce" />
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Enhanced Chat Interface */}
        <div className="bg-gradient-to-r from-gray-50 to-white rounded-3xl shadow-2xl border border-gray-100 p-8 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full -translate-y-16 translate-x-16 opacity-50" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-pink-100 to-yellow-100 rounded-full translate-y-12 -translate-x-12 opacity-50" />
          
          <form onSubmit={handleChatSubmit} className="flex items-center space-x-4 relative z-10">
            <div className="flex-1 relative group">
              <input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder={t('language') === 'ms' 
                  ? 'Tanya soalan, muat naik fail, atau gunakan suara...' 
                  : 'Ask questions, upload files, or use voice...'
                }
                className="w-full px-6 py-4 pr-24 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all duration-300 text-gray-800 placeholder-gray-500 shadow-inner bg-white group-hover:shadow-md"
              />
              
              {/* Upload Button */}
              <button
                type="button"
                className="absolute right-16 top-1/2 transform -translate-y-1/2 p-2 rounded-xl text-gray-500 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 transition-all duration-300 hover:scale-110"
                title={t('language') === 'ms' ? 'Muat naik fail' : 'Upload file'}
              >
                <Upload className="w-5 h-5" />
              </button>
              
              {/* Voice Button */}
              <button
                type="button"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-xl text-gray-500 hover:text-white hover:bg-gradient-to-r hover:from-green-500 hover:to-teal-500 transition-all duration-300 hover:scale-110 hover:animate-pulse"
                title={t('language') === 'ms' ? 'Mesej suara' : 'Voice message'}
              >
                <Mic className="w-5 h-5" />
              </button>
            </div>
            
            {/* Enhanced Send Button */}
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white p-4 rounded-2xl transition-all duration-300 flex items-center shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1"
            >
              <MessageCircle className="w-6 h-6" />
            </button>
          </form>
          
          <div className="mt-6 text-sm text-gray-500 text-center relative z-10">
            <div className="flex items-center justify-center gap-2">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                <div className="w-2 h-2 bg-gradient-to-r from-pink-400 to-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              </div>
              <span className="font-medium">
                {t('language') === 'ms' 
                  ? 'Dikuasakan oleh Azure AI - Semua perbualan adalah selamat dan sulit'
                  : 'Powered by Azure AI - All conversations are secure and confidential'
                }
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
