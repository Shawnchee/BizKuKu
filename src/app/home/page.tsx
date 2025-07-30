'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { MessageCircle, Upload, Mic, Bot, Sparkles, TrendingUp, FileText, CreditCard, Settings } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import Iridescence from '@/components/backgrounds/Iridescence'

export default function AuthenticatedHome() {
  const { t } = useLanguage()
  const [selectedAction, setSelectedAction] = useState<string | null>(null)
  const [chatMessage, setChatMessage] = useState('')

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
      id: 'grants-loans',
      title: 'Grant/Subsidy/Loan',
      titleMs: 'Geran/Subsidi/Pinjaman',
      icon: CreditCard,
      color: 'from-purple-400 to-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      summary: 'You have 2 pending grant applications and 1 loan pre-approval. Total potential funding: RM 150,000.',
      summaryMs: 'Anda mempunyai 2 permohonan geran yang belum selesai dan 1 pra-kelulusan pinjaman. Jumlah pembiayaan berpotensi: RM 150,000.',
      linkTo: '/recommendation'
    },
    {
      id: 'mini-services',
      title: 'Mini Services',
      titleMs: 'Perkhidmatan Mini',
      icon: Settings,
      color: 'from-orange-400 to-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      summary: 'Access quick business tools: QR generator, invoice maker, tax calculator, and more utility services.',
      summaryMs: 'Akses alat perniagaan pantas: penjana QR, pembuat invois, kalkulator cukai, dan lebih banyak perkhidmatan utiliti.',
      linkTo: '/mini-services'
    },
    {
      id: 'business-insights',
      title: 'Business Insights',
      titleMs: 'Wawasan Perniagaan',
      icon: Sparkles,
      color: 'from-pink-400 to-pink-600',
      bgColor: 'bg-pink-50',
      borderColor: 'border-pink-200',
      summary: 'Your customer retention rate is 85%. Best selling product: Traditional snacks. Peak hours: 2-4 PM.',
      summaryMs: 'Kadar pengekalan pelanggan anda adalah 85%. Produk terlaris: Kudapan tradisional. Waktu puncak: 2-4 petang.',
      linkTo: null
    }
  ]

  const handleActionClick = (action: any) => {
    setSelectedAction(action.id)
    if (action.linkTo) {
      // Will handle navigation after showing summary
      setTimeout(() => {
        window.location.href = action.linkTo
      }, 3000)
    }
  }

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!chatMessage.trim()) return
    
    // Handle chat message (placeholder)
    console.log('Chat message:', chatMessage)
    setChatMessage('')
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Iridescence
        color={[1, 1, 1]}
        mouseReact={false}
        amplitude={0.1}
        speed={1.0}
        className="absolute inset-0"
      />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-black mb-4">
            <span className="bg-gradient-to-r from-black via-purple-800 to-blue-800 bg-clip-text text-transparent">
              Welcome to BizKuKu
            </span>
          </h1>
          <p className="text-xl text-black/80 mb-8">
            Your AI-powered business companion
          </p>
        </div>

        {/* 3D Avatar Mockup */}
        <div className="flex justify-center mb-12">
          <div className="relative">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center shadow-2xl animate-avatar-pulse">
              <Bot className="w-16 h-16 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-400 rounded-full flex items-center justify-center animate-pulse">
              <div className="w-3 h-3 bg-white rounded-full"></div>
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
        `}</style>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {actionButtons.map((action, index) => {
            const Icon = action.icon
            return (
              <div
                key={action.id}
                onClick={() => handleActionClick(action)}
                className="bg-white/90 backdrop-blur-lg border-2 border-white/30 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-white/95 group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {t.language === 'ms' ? action.titleMs : action.title}
                  </h3>
                </div>
                
                {selectedAction === action.id && (
                  <div className="mt-4 p-4 bg-black/10 backdrop-blur-sm rounded-lg border border-black/20 animate-fadeIn">
                    <p className="text-sm text-gray-800">
                      {t.language === 'ms' ? action.summaryMs : action.summary}
                    </p>
                    {action.linkTo && (
                      <div className="mt-2 text-xs text-blue-700 font-medium">
                        Redirecting to {action.linkTo}...
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Interactive Chat Bar */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl border border-white/30 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
              Ask your business assistant
            </h3>
            <form onSubmit={handleChatSubmit} className="flex gap-3">
              <input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Type your question here..."
                className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 flex items-center gap-2 group"
              >
                <MessageCircle className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                Send
              </button>
            </form>
            
            {/* Quick action buttons */}
            <div className="flex gap-2 mt-4 flex-wrap justify-center">
              <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm transition-colors flex items-center gap-1">
                <Upload className="w-3 h-3" />
                Upload document
              </button>
              <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm transition-colors flex items-center gap-1">
                <Mic className="w-3 h-3" />
                Voice message
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}