'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export type Language = 'ms' | 'en'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Language data structure
const translations = {
  // Navigation
  'nav.home': {
    ms: 'Utama',
    en: 'Home'
  },
  'nav.dashboard': {
    ms: 'Papan',
    en: 'Dashboard'
  },
  'nav.story': {
    ms: 'Cerita',
    en: 'Story'
  },
  'nav.recommendation': {
    ms: 'Cadangan',
    en: 'Recommendation'
  },
  
  // Hero Section
  'hero.badge': {
    ms: 'Terbaik untuk Bisnes Kecil',
    en: 'Best for Small Business'
  },
  'hero.title.main': {
    ms: 'Jaga Bisnes Anda',
    en: 'Manage Your Business'
  },
  'hero.title.sub': {
    ms: 'Dengan Mudah',
    en: 'Easily'
  },
  'hero.description.main': {
    ms: 'Tengok jualan, pelanggan, dan duit dengan senang.',
    en: 'Track sales, customers, and money easily.'
  },
  'hero.description.sub': {
    ms: 'Sesuai untuk kedai kecil dan warung.',
    en: 'Perfect for small shops and stalls.'
  },
  'hero.button': {
    ms: 'Daftar Sekarang',
    en: 'Register Now'
  },
  'hero.benefit.card': {
    ms: 'Tak payah kad kredit',
    en: 'No credit card needed'
  },
  'hero.benefit.time': {
    ms: '5 minit je',
    en: '5 minutes setup'
  },
  
  // Dashboard Preview
  'dashboard.title': {
    ms: 'Papan Bisnes Anda',
    en: 'Your Business Dashboard'
  },
  'dashboard.today': {
    ms: 'Jualan Hari Ini',
    en: 'Today Sales'
  },
  'dashboard.month': {
    ms: 'Bulan Ini',
    en: 'This Month'
  },
  'dashboard.bestselling': {
    ms: 'Paling Laris',
    en: 'Best Selling Item'
  },
  'dashboard.sold': {
    ms: 'terjual hari ini',
    en: 'sold today'
  },
  'dashboard.easy': {
    ms: 'Senang faham.',
    en: 'Easy to understand.'
  },
  'dashboard.charts': {
    ms: 'Tak ada carta susah.',
    en: 'No complicated charts.'
  },
  
  // Story Page
  'story.title': {
    ms: 'Cerita Warung Kita',
    en: 'Our Warung Story'
  },
  'story.subtitle': {
    ms: 'Tengok cerita bisnes hari ini dengan mudah',
    en: 'See today\'s business story easily'
  },
  'story.greeting': {
    ms: 'Selamat Pagi, Kak Siti!',
    en: 'Good Morning, Kak Siti!'
  },
  'story.greeting.sub': {
    ms: 'Mari kita tengok cerita warung hari ini',
    en: 'Let\'s see today\'s warung story'
  },
  'story.moneyJars.title': {
    ms: 'Balang Duit Kita',
    en: 'Our Money Jars'
  },
  'story.moneyJars.subtitle': {
    ms: 'Tengok berapa duit dalam setiap balang',
    en: 'See how much money in each jar'
  },
  'story.todayMoney': {
    ms: 'Duit Hari Ini',
    en: 'Today\'s Money'
  },
  'story.savings': {
    ms: 'Simpanan',
    en: 'Savings'
  },
  'story.profit': {
    ms: 'Untung',
    en: 'Profit'
  },
  'story.customers.title': {
    ms: 'Pelanggan Hari Ini',
    en: 'Today\'s Customers'
  },
  'story.food.title': {
    ms: 'Makanan Popular',
    en: 'Popular Food'
  },
  'story.food.subtitle': {
    ms: 'Nasi lemak mana yang paling laris?',
    en: 'Which nasi lemak sells the most?'
  },
  'story.comparison.title': {
    ms: 'Banding Minggu Ini',
    en: 'This Week Comparison'
  },
  'story.thisWeek': {
    ms: 'Minggu Ini',
    en: 'This Week'
  },
  'story.lastWeek': {
    ms: 'Minggu Lepas',
    en: 'Last Week'
  },
  'story.audio': {
    ms: 'Suara',
    en: 'Audio'
  },
  'story.hide': {
    ms: 'Sorok',
    en: 'Hide'
  },
  'story.listen': {
    ms: 'Dengar',
    en: 'Listen'
  },
  'story.sold': {
    ms: 'dijual',
    en: 'sold'
  },
  'story.price': {
    ms: 'Harga',
    en: 'Price'
  },
  'story.total': {
    ms: 'Jumlah',
    en: 'Total'
  },
  'story.todayStory': {
    ms: 'Cerita Hari Ini',
    en: 'Today\'s Story'
  },
  'story.up': {
    ms: 'Naik',
    en: 'Up'
  },
  'story.sunnyWeather': {
    ms: 'Cuaca cerah',
    en: 'Sunny weather'
  },
  'story.goodMood': {
    ms: 'Mood baik',
    en: 'Good mood'
  },
  'story.manyCustomers': {
    ms: 'Ramai pelanggan',
    en: 'Many customers'
  },
  
  // Features
  'features.analytics.title': {
    ms: 'Tengok Jualan',
    en: 'See Sales'
  },
  'features.analytics.desc': {
    ms: 'Tengok berapa duit masuk hari ini dan bulan ini dengan mudah.',
    en: 'See how much money came in today and this month easily.'
  },
  'features.monitoring.title': {
    ms: 'Pantau Masa Nyata',
    en: 'Live Updates'
  },
  'features.monitoring.desc': {
    ms: 'Tengok jualan terkini setiap masa untuk buat keputusan bijak.',
    en: 'See latest sales anytime to make smart decisions.'
  },
  'features.security.title': {
    ms: 'Selamat & Boleh Harap',
    en: 'Safe & Reliable'
  },
  'features.security.desc': {
    ms: 'Data anda selamat dan sistem sentiasa berfungsi untuk ketenangan fikiran.',
    en: 'Your data is safe and system always works for peace of mind.'
  },
  'features.speed.title': {
    ms: 'Pantas & Mudah',
    en: 'Fast & Easy'
  },
  'features.speed.desc': {
    ms: 'Sistem yang pantas dan mudah digunakan untuk semua orang.',
    en: 'Fast and easy system for everyone to use.'
  },

  // Progress Bar
  'progress.title': {
    ms: 'Kemajuan Setup',
    en: 'Setup Progress'
  },
  'progress.get_started': {
    ms: 'Mula Sekarang!',
    en: 'Get Started!'
  },
  'progress.completed': {
    ms: 'Selesai!',
    en: 'Completed!'
  },
  'progress.almost_done': {
    ms: 'Hampir Siap!',
    en: 'Almost Done!'
  },
  'progress.in_progress': {
    ms: 'Sedang Berjalan',
    en: 'In Progress'
  },
  'progress.steps_completed': {
    ms: 'langkah selesai',
    en: 'steps completed'
  },
  'progress.start_journey': {
    ms: 'Mulakan perjalanan setup bisnes anda',
    en: 'Start your business setup journey'
  },
  'progress.start_setup': {
    ms: 'Mula Setup →',
    en: 'Start Setup →'
  },
  'progress.continue_setup': {
    ms: 'Teruskan Setup →',
    en: 'Continue Setup →'
  },
  'progress.view_dashboard': {
    ms: 'Lihat Papan →',
    en: 'View Dashboard →'
  },
  'progress.ready_start': {
    ms: 'Sedia untuk mula?',
    en: 'Ready to start?'
  },
  'progress.setup_steps': {
    ms: 'Setup bisnes anda dalam 4 langkah mudah!',
    en: 'Set up your business in just 4 simple steps!'
  },
  'progress.congratulations': {
    ms: 'Tahniah!',
    en: 'Congratulations!'
  },
  'progress.setup_complete': {
    ms: 'Setup bisnes anda sudah selesai!',
    en: 'Your business setup is complete!'
  },
  'progress.almost_there': {
    ms: 'Hampir sampai!',
    en: 'Almost there!'
  },
  'progress.more_steps': {
    ms: 'lagi langkah untuk pergi!',
    en: 'more steps to go!'
  },
  'progress.great_start': {
    ms: 'Permulaan yang bagus!',
    en: 'Great start!'
  },
  'progress.continue_journey': {
    ms: 'Teruskan perjalanan setup anda!',
    en: 'Continue your setup journey!'
  },

  // Recommended Section
  'recommended.title': {
    ms: 'Disyorkan',
    en: 'Recommended'
  },
  'recommended.subtitle': {
    ms: 'Bantuan kewangan untuk bisnes anda',
    en: 'Financial help for your business'
  },
  'recommended.view_all': {
    ms: 'Lihat Semua',
    en: 'View All'
  },
  'recommended.subsidy.title': {
    ms: 'Subsidi',
    en: 'Subsidy'
  },
  'recommended.subsidy.subtitle': {
    ms: 'Subsidi Kerajaan',
    en: 'Government Subsidy'
  },
  'recommended.subsidy.desc': {
    ms: 'Dapatkan bantuan kerajaan untuk bisnes anda',
    en: 'Get government help for your business'
  },
  'recommended.loans.title': {
    ms: 'Pinjaman',
    en: 'Loans'
  },
  'recommended.loans.subtitle': {
    ms: 'Pinjaman Bisnes',
    en: 'Business Loans'
  },
  'recommended.loans.desc': {
    ms: 'Pinjaman bisnes pantas dengan faedah rendah',
    en: 'Quick business loans with low interest'
  },
  'recommended.insurance.title': {
    ms: 'Insurans',
    en: 'Insurance'
  },
  'recommended.insurance.subtitle': {
    ms: 'Perlindungan Bisnes',
    en: 'Business Protection'
  },
  'recommended.insurance.desc': {
    ms: 'Lindungi bisnes anda dari risiko',
    en: 'Protect your business from risks'
  },
  'recommended.popular': {
    ms: 'Popular',
    en: 'Popular'
  },

  // Features Section
  'features.section.badge': {
    ms: 'Berkuasa Tapi Mudah',
    en: 'Powerful Yet Simple'
  },
  'features.section.title': {
    ms: 'Apa Yang Boleh Anda Buat',
    en: 'What You Can Do'
  },
  'features.section.subtitle': {
    ms: 'Alat mudah untuk membantu bisnes kecil anda berkembang dan berjaya',
    en: 'Simple tools to help your small business grow and succeed'
  },
  'features.track_money.title': {
    ms: 'Jejak Duit Anda',
    en: 'Track Your Money'
  },
  'features.track_money.subtitle': {
    ms: 'Jejakan Duit',
    en: 'Money Tracking'
  },
  'features.track_money.desc': {
    ms: 'Tengok berapa anda dapat dan belanja setiap hari. Tahu kalau anda untung.',
    en: 'See how much you earn and spend every day. Know if you are making profit.'
  },
  'features.track_money.benefit': {
    ms: 'Jimat 2+ jam setiap hari',
    en: 'Save 2+ hours daily'
  },
  'features.know_customers.title': {
    ms: 'Kenal Pelanggan Anda',
    en: 'Know Your Customers'
  },
  'features.know_customers.subtitle': {
    ms: 'Pandangan Pelanggan',
    en: 'Customer Insights'
  },
  'features.know_customers.desc': {
    ms: 'Ingat siapa yang selalu beli dari anda. Hantar tawaran istimewa kepada mereka.',
    en: 'Remember who buys from you often. Send them special offers.'
  },
  'features.know_customers.benefit': {
    ms: 'Tingkatkan jualan berulang',
    en: 'Increase repeat sales'
  },
  'features.accept_payments.title': {
    ms: 'Terima Bayaran',
    en: 'Accept Payments'
  },
  'features.accept_payments.subtitle': {
    ms: 'Bayaran Digital',
    en: 'Digital Payments'
  },
  'features.accept_payments.desc': {
    ms: 'Terima bayaran melalui QR code, kad, dan online dengan mudah.',
    en: 'Accept payments via QR code, cards, and online easily.'
  },
  'features.accept_payments.benefit': {
    ms: 'Lebih banyak cara bayar',
    en: 'More payment options'
  },

  // Additional translations for features section
  'features.grow_sales.title': {
    ms: 'Tingkatkan Jualan',
    en: 'Grow Your Sales'
  },
  'features.grow_sales.subtitle': {
    ms: 'Pertumbuhan Jualan',
    en: 'Sales Growth'
  },
  'features.grow_sales.desc': {
    ms: 'Tahu apa yang paling laris. Fokus pada produk yang bagi lebih untung.',
    en: 'Find out what sells best. Focus on products that make more money.'
  },
  'features.grow_sales.benefit': {
    ms: 'Tingkat untung 30%',
    en: 'Boost profit by 30%'
  },

  // Features Section Bottom CTA
  'features.ready_transform': {
    ms: 'Sedia untuk ubah bisnes anda?',
    en: 'Ready to transform your business?'
  },
  'features.start_journey': {
    ms: 'Mulakan perjalanan anda hari ini!',
    en: 'Start your journey today!'
  },
  'features.see_all': {
    ms: 'Lihat semua ciri',
    en: 'See all features'
  },

  // Recommended Section Bottom
  'recommended.apply_minutes': {
    ms: 'Mohon dalam 5 minit sahaja',
    en: 'Apply in just 5 minutes'
  },

  // Footer
  'footer.copyright': {
    ms: '© 2025 BizzKu. Semua hak terpelihara.',
    en: '© 2025 BizzKu. All rights reserved.'
  }
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('ms')

  // Load language preference from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language
    if (savedLanguage && (savedLanguage === 'ms' || savedLanguage === 'en')) {
      setLanguage(savedLanguage)
    }
  }, [])

  // Save language preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('language', language)
  }, [language])

  // Translation function
  const t = (key: string): string => {
    const translation = translations[key as keyof typeof translations]
    if (!translation) {
      console.warn(`Translation key "${key}" not found`)
      return key
    }
    return translation[language] || translation.en || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
