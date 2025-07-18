'use client'

import Link from 'next/link'
import { Button } from '@/components/ui'
import { TrendingUp, Star, Sparkles } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function HeroSection() {
  const { t } = useLanguage()
  return (
    <section className="relative py-16 sm:py-24 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/background.jpeg')",
        }}
      ></div>
      {/* Extra black overlay for more darkness */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black-900/90 via-black-900/80 to-black-900/90"></div>

      {/* Background decorations */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-10 right-10 text-blue-200 animate-pulse">
        <Sparkles className="w-8 h-8" />
      </div>
      <div className="absolute bottom-10 left-10 text-purple-200 animate-bounce">
        <Star className="w-6 h-6" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center bg-white/90 backdrop-blur-sm text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-white/20 shadow-lg">
              <TrendingUp className="w-4 h-4 mr-2" />
              {t('hero.badge')}
            </div>

            {/* Enhanced Heading */}
            <h1 className="text-4xl font-bold text-white sm:text-5xl mb-6 leading-tight drop-shadow-lg">
              <span className="bg-gradient-to-r from-blue-500 to-indigo-400 bg-clip-text text-transparent">
                {t('hero.title.main')}
              </span>
              <br />
              <span className="text-white">{t('hero.title.sub')}</span>
            </h1>

            {/* Enhanced Description */}
            <p className="text-xl text-white/90 mb-8 leading-relaxed drop-shadow-md">
              {t('hero.description.main')}
              <br />
              <span className="font-medium text-blue-200">{t('hero.description.sub')}</span>
            </p>

            {/* Enhanced Button with stats */}
            <div className="mb-8 lg:mb-0">
              <Link href="/onboarding">
                <Button size="lg" className="text-lg px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  {t('hero.button')} !
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 ml-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L21 12m0 0l-3.75 5.25M21 12H3" />
                  </svg>
                </Button>
              </Link>
              <div className="mt-4 flex items-center justify-center lg:justify-start space-x-6 text-sm text-white/80">
                <div className="flex items-center">
                  <span className="text-green-400 mr-1">✓</span>
                  {t('hero.benefit.card')}
                </div>
                <div className="flex items-center">
                  <span className="text-green-400 mr-1">✓</span>
                  {t('hero.benefit.time')}
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Visual Example */}
          <div className="flex justify-center lg:justify-end">
            <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full border border-gray-100 transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {t('dashboard.title')}
                </h3>
                <div className="flex space-x-1">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
              </div>

              {/* Enhanced Cards */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl text-center border border-green-100 hover:shadow-md transition-shadow">
                  <div className="text-sm text-green-600 mb-1 font-medium">{t('dashboard.today')}</div>
                  <div className="text-2xl font-bold text-gray-900">RM 450</div>
                  <div className="text-xs text-green-500 mt-1">↗ +12%</div>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl text-center border border-blue-100 hover:shadow-md transition-shadow">
                  <div className="text-sm text-blue-600 mb-1 font-medium">{t('dashboard.month')}</div>
                  <div className="text-2xl font-bold text-gray-900">RM 8,200</div>
                  <div className="text-xs text-blue-500 mt-1">↗ +25%</div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl mb-4 border border-purple-100">
                <div className="text-sm text-purple-600 mb-1 font-medium">{t('dashboard.bestselling')}</div>
                <div className="text-lg font-bold text-gray-900">Nasi Lemak</div>
                <div className="text-xs text-purple-500">45 {t('dashboard.sold')}</div>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">{t('dashboard.easy')}</span> {t('dashboard.charts')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
