'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { Globe } from 'lucide-react'

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === 'ms' ? 'en' : 'ms')
  }

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors duration-200 border border-gray-200 hover:border-blue-300"
      aria-label={`Switch to ${language === 'ms' ? 'English' : 'Bahasa Malaysia'}`}
    >
      <Globe className="h-4 w-4" />
      <span className="font-semibold">
        {language === 'ms' ? 'BM' : 'EN'}
      </span>
      <span className="text-xs text-gray-500">
        {language === 'ms' ? '🇲🇾' : '🇺🇸'}
      </span>
    </button>
  )
}
