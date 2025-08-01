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
    ms: 'Dashboard Kewangan',
    en: 'Financial Dashboard'
  },
  'nav.story': {
    ms: 'Cerita',
    en: 'Story'
  },
  'nav.application-status': {
    ms: 'Status Permohonan',
    en: 'Application Status'
  },
  'nav.online-bizzku': {
    ms: 'Perniagaan Dalam Talian',
    en: 'Online Business'
  },
  'nav.mini-services': {
    ms: 'Perkhidmatan Sampingan',
    en: 'Mini Services'
  },
  'nav.recommendation': {
    ms: 'Cadangan Pinjaman',
    en: 'Funding Recommendation'
  },
  'nav.login': {
    ms: 'Log Masuk',
    en: 'Login'
  },
  
  // Hero Section
  'hero.badge': {
    ms: 'Terbaik untuk Perusahaan Kecil',
    en: 'Best for Small Business'
  },
  'hero.title.main': {
    ms: 'Mula dan Kembangkan',
    en: 'Onboard and Grow'
  },
  'hero.title.sub': {
    ms: 'Perusahaan Anda',
    en: 'Your Business Easily'
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
    ms: 'Mulakan perjalanan setup perniagaan anda',
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
    ms: 'Setup perniagaan anda dalam 4 langkah mudah!',
    en: 'Set up your business in just 4 simple steps!'
  },
  'progress.congratulations': {
    ms: 'Tahniah!',
    en: 'Congratulations!'
  },
  'progress.setup_complete': {
    ms: 'Setup perniagaan anda sudah selesai!',
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
    ms: 'Bantuan kewangan untuk perniagaan anda',
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
    ms: 'Dapatkan bantuan kerajaan untuk perniagaan anda',
    en: 'Get government help for your business'
  },
  'recommended.loans.title': {
    ms: 'Pinjaman',
    en: 'Loans'
  },
  'recommended.loans.subtitle': {
    ms: 'Pinjaman Perniagaan',
    en: 'Business Loans'
  },
  'recommended.loans.desc': {
    ms: 'Pinjaman perniagaan pantas dengan faedah rendah',
    en: 'Quick business loans with low interest'
  },
  'recommended.insurance.title': {
    ms: 'Insurans',
    en: 'Insurance'
  },
  'recommended.insurance.subtitle': {
    ms: 'Perlindungan Perniagaan',
    en: 'Business Protection'
  },
  'recommended.insurance.desc': {
    ms: 'Lindungi perniagaan anda dari risiko',
    en: 'Protect your business from risks'
  },
  'recommended.popular': {
    ms: 'Popular',
    en: 'Popular'
  },
  'recommended.amount.subsidy': {
    ms: 'Sehingga RM10,000',
    en: 'Up to RM10,000'
  },
  'recommended.amount.loans': {
    ms: 'Dari RM1,000',
    en: 'From RM1,000'
  },
  'recommended.amount.insurance': {
    ms: 'Sehingga RM50,000',
    en: 'Up to RM50,000'
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
    ms: 'Sedia untuk ubah perniagaan anda?',
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
    ms: '© 2025 BizKuku. Semua hak terpelihara.',
    en: '© 2025 BizKuku. All rights reserved.'
  },

  // Onboarding - Main Steps
  'onboarding.step1.title': {
    ms: 'Maklumat Diperlukan',
    en: 'Required Information'
  },
  'onboarding.step1.subtitle': {
    ms: 'Peribadi & Perniagaan',
    en: 'Personal & Business'
  },
  'onboarding.step1.description': {
    ms: 'Isi maklumat peribadi dan perniagaan',
    en: 'Fill personal and business information'
  },
  'onboarding.step2.title': {
    ms: 'Permohonan SSM',
    en: 'SSM Application'
  },
  'onboarding.step2.subtitle': {
    ms: 'Daftar Perniagaan',
    en: 'Business Registration'
  },
  'onboarding.step2.description': {
    ms: 'Daftar perniagaan dengan SSM',
    en: 'Register business with SSM'
  },
  'onboarding.step3.title': {
    ms: 'Semak Status',
    en: 'Check Status'
  },
  'onboarding.step3.subtitle': {
    ms: 'Kemajuan Permohonan',
    en: 'Application Progress'
  },
  'onboarding.step3.description': {
    ms: 'Semak kemajuan permohonan anda',
    en: 'Check your application progress'
  },
  'onboarding.step4.title': {
    ms: 'QR Pedagang',
    en: 'QR Merchant'
  },
  'onboarding.step4.subtitle': {
    ms: 'Setup Pembayaran',
    en: 'Payment Setup'
  },
  'onboarding.step4.description': {
    ms: 'Dapatkan QR untuk terima bayaran',
    en: 'Get QR to accept payments'
  },

  // Onboarding - Step 1 Header
  'onboarding.step1.header.title': {
    ms: 'Isi Maklumat Diperlukan',
    en: 'Fill in Required Information'
  },
  'onboarding.step1.header.subtitle': {
    ms: 'Sila isi semua maklumat dengan betul',
    en: 'Please fill in all information accurately'
  },

  // Onboarding - Step 1 Sections
  'onboarding.step1.documents.title': {
    ms: 'Muat Naik Dokumen',
    en: 'Upload Documents'
  },
  'onboarding.step1.documents.subtitle': {
    ms: 'Fail Diperlukan',
    en: 'Required Files'
  },
  'onboarding.step1.ekyc.title': {
    ms: 'E-KYC',
    en: 'E-KYC'
  },
  'onboarding.step1.ekyc.subtitle': {
    ms: 'Pengenalan Diri',
    en: 'Personal Identification'
  },
  'onboarding.step1.business.title': {
    ms: 'Maklumat Perniagaan',
    en: 'Business Information'
  },
  'onboarding.step1.business.subtitle': {
    ms: 'Butiran Syarikat',
    en: 'Company Details'
  },
  'onboarding.step1.financial.title': {
    ms: 'Maklumat Kewangan',
    en: 'Financial Information'
  },
  'onboarding.step1.financial.subtitle': {
    ms: 'Butiran Bank',
    en: 'Banking Details'
  },

  // Onboarding - Documents Section
  'onboarding.step1.documents.header': {
    ms: 'Muat Naik Dokumen',
    en: 'Upload Documents'
  },
  'onboarding.step1.documents.tips': {
    ms: 'Tips:',
    en: 'Tips:'
  },
  'onboarding.step1.documents.tip1': {
    ms: 'Pastikan gambar jelas dan tidak kabur',
    en: 'Ensure images are clear and not blurry'
  },
  'onboarding.step1.documents.tip2': {
    ms: 'Format diterima: JPG, PNG, PDF',
    en: 'Accepted formats: JPG, PNG, PDF'
  },
  'onboarding.step1.documents.tip3': {
    ms: 'Saiz maksimum: 5MB setiap fail',
    en: 'Maximum size: 5MB per file'
  },
  'onboarding.step1.documents.ic_front': {
    ms: 'IC Hadapan',
    en: 'IC Front'
  },
  'onboarding.step1.documents.ic_front_desc': {
    ms: 'Bahagian hadapan IC',
    en: 'Front side of IC'
  },
  'onboarding.step1.documents.ic_back': {
    ms: 'IC Belakang',
    en: 'IC Back'
  },
  'onboarding.step1.documents.ic_back_desc': {
    ms: 'Bahagian belakang IC',
    en: 'Back side of IC'
  },
  'onboarding.step1.documents.business_license': {
    ms: 'Lesen Perniagaan (Pilihan)',
    en: 'Business License (Optional)'
  },
  'onboarding.step1.documents.business_license_desc': {
    ms: 'Sijil pendaftaran perniagaan jika ada',
    en: 'Business registration certificate if available'
  },
  'onboarding.step1.documents.choose_file': {
    ms: 'Pilih Fail',
    en: 'Choose File'
  },

  // Onboarding - E-KYC Section
  'onboarding.step1.ekyc.header': {
    ms: 'E-KYC (Pengenalan Diri)',
    en: 'E-KYC (Personal Identification)'
  },
  'onboarding.step1.ekyc.full_name': {
    ms: 'Nama Penuh *',
    en: 'Full Name *'
  },
  'onboarding.step1.ekyc.full_name_placeholder': {
    ms: 'Contoh: Ahmad bin Ali',
    en: 'Contoh: Ahmad bin Ali'
  },
  'onboarding.step1.ekyc.ic_number': {
    ms: 'No. IC *',
    en: 'IC Number *'
  },
  'onboarding.step1.ekyc.ic_number_placeholder': {
    ms: 'Contoh: 901234-56-7890',
    en: 'Contoh: 901234-56-7890'
  },
  'onboarding.step1.ekyc.phone_number': {
    ms: 'No. Telefon *',
    en: 'Phone Number *'
  },
  'onboarding.step1.ekyc.phone_number_placeholder': {
    ms: 'Contoh: 012-345-6789',
    en: 'Contoh: 012-345-6789'
  },
  'onboarding.step1.ekyc.email': {
    ms: 'Emel *',
    en: 'Email *'
  },
  'onboarding.step1.ekyc.email_placeholder': {
    ms: 'Contoh: ahmad@email.com',
    en: 'Contoh: ahmad@email.com'
  },

  // Onboarding - Business Information Section
  'onboarding.step1.business.header': {
    ms: 'Maklumat Perniagaan',
    en: 'Business Information'
  },
  'onboarding.step1.business.name': {
    ms: 'Nama Perniagaan *',
    en: 'Business Name *'
  },
  'onboarding.step1.business.name_placeholder': {
    ms: 'Contoh: Warung Mak Kiah',
    en: 'Example: Mak Kiah\'s Stall'
  },
  'onboarding.step1.business.type': {
    ms: 'Jenis Perniagaan *',
    en: 'Business Type *'
  },
  'onboarding.step1.business.type_choose': {
    ms: 'Pilih jenis',
    en: 'Choose type'
  },
  'onboarding.step1.business.type_warung': {
    ms: 'Warung',
    en: 'Stall'
  },
  'onboarding.step1.business.type_kedai': {
    ms: 'Kedai',
    en: 'Shop'
  },
  'onboarding.step1.business.type_restoran': {
    ms: 'Restoran',
    en: 'Restaurant'
  },
  'onboarding.step1.business.type_online': {
    ms: 'Jualan Online',
    en: 'Online Sales'
  },
  'onboarding.step1.business.type_others': {
    ms: 'Lain-lain',
    en: 'Others'
  },
  'onboarding.step1.business.address': {
    ms: 'Alamat Perniagaan *',
    en: 'Business Address *'
  },
  'onboarding.step1.business.address_placeholder': {
    ms: 'Contoh: No. 123, Jalan Utama, Taman Bahagia, 12345 Kuala Lumpur',
    en: 'Contoh: No. 123, Jalan Utama, Taman Bahagia, 12345 Kuala Lumpur'
  },
  'onboarding.step1.business.registration_number': {
    ms: 'No. Pendaftaran (jika ada)',
    en: 'Registration Number (if any)'
  },
  'onboarding.step1.business.registration_number_placeholder': {
    ms: 'Contoh: SSM123456789',
    en: 'Contoh: SSM123456789'
  },

  // Onboarding - Financial Information Section
  'onboarding.step1.financial.header': {
    ms: 'Maklumat Kewangan',
    en: 'Financial Information'
  },
  'onboarding.step1.financial.monthly_revenue': {
    ms: 'Pendapatan Bulanan *',
    en: 'Monthly Revenue *'
  },
  'onboarding.step1.financial.revenue_choose': {
    ms: 'Pilih julat',
    en: 'Choose range'
  },
  'onboarding.step1.financial.revenue_below_1000': {
    ms: 'Bawah RM1,000',
    en: 'Below RM1,000'
  },
  'onboarding.step1.financial.revenue_1000_5000': {
    ms: 'RM1,000 - RM5,000',
    en: 'RM1,000 - RM5,000'
  },
  'onboarding.step1.financial.revenue_5000_10000': {
    ms: 'RM5,000 - RM10,000',
    en: 'RM5,000 - RM10,000'
  },
  'onboarding.step1.financial.revenue_above_10000': {
    ms: 'Melebihi RM10,000',
    en: 'Above RM10,000'
  },
  'onboarding.step1.financial.bank_name': {
    ms: 'Nama Bank *',
    en: 'Bank Name *'
  },
  'onboarding.step1.financial.bank_choose': {
    ms: 'Pilih bank',
    en: 'Choose bank'
  },
  'onboarding.step1.financial.bank_account': {
    ms: 'No. Akaun Bank *',
    en: 'Bank Account Number *'
  },
  'onboarding.step1.financial.bank_account_placeholder': {
    ms: 'Contoh: 1234567890123',
    en: 'Contoh: 1234567890123'
  },

  // Onboarding - Navigation & Common
  'onboarding.progress_saved': {
    ms: 'Kemajuan disimpan secara automatik',
    en: 'Progress is saved automatically'
  },
  'onboarding.next': {
    ms: 'Seterusnya →',
    en: 'Next →'
  },
  'onboarding.previous': {
    ms: '← Sebelum',
    en: '← Previous'
  },
  'onboarding.complete': {
    ms: 'Selesai',
    en: 'Complete'
  },
  'onboarding.business_setup': {
    ms: 'Setup Perniagaan',
    en: 'Business Setup'
  },
  'onboarding.step_of': {
    ms: 'Langkah {current} daripada {total}',
    en: 'Step {current} of {total}'
  },
  'onboarding.reset': {
    ms: 'Set Semula',
    en: 'Reset'
  },
  'onboarding.save': {
    ms: 'Simpan',
    en: 'Save'
  },
  'onboarding.check': {
    ms: 'Semak',
    en: 'Check'
  },
  'onboarding.click_any_step': {
    ms: 'Klik mana-mana langkah untuk lompat terus',
    en: 'Click on any step to jump directly'
  },

  // Onboarding - Step 2 (SSM Application)
  'onboarding.step2.header.title': {
    ms: 'Permohonan SSM',
    en: 'SSM Application'
  },
  'onboarding.step2.header.subtitle': {
    ms: 'Daftarkan perniagaan anda secara rasmi dengan Suruhanjaya Syarikat Malaysia',
    en: 'Register your business officially with Companies Commission of Malaysia'
  },
  'onboarding.step2.why_ssm': {
    ms: 'Kenapa anda perlukan SSM?',
    en: 'Why do you need SSM?'
  },
  'onboarding.step2.benefit1': {
    ms: '• Pengiktirafan perniagaan yang sah',
    en: '• Legal business recognition'
  },
  'onboarding.step2.benefit2': {
    ms: '• Boleh buka akaun bank perniagaan',
    en: '• Can open business bank account'
  },
  'onboarding.step2.benefit3': {
    ms: '• Lebih mudah dapat pinjaman',
    en: '• Easier to get loans'
  },
  'onboarding.step2.benefit4': {
    ms: '• Nampak lebih profesional',
    en: '• Looks more professional'
  },
  'onboarding.step2.yes_apply': {
    ms: '✓ Ya, saya mahu mohon SSM',
    en: '✓ Yes, I want to apply for SSM'
  },
  'onboarding.step2.not_now': {
    ms: 'Tidak sekarang',
    en: 'Not now'
  },
  'onboarding.step2.great_help': {
    ms: 'Bagus! Kami akan bantu anda mohon SSM',
    en: 'Great! We\'ll help you apply for SSM'
  },
  'onboarding.back': {
    ms: '← Kembali',
    en: '← Back'
  },

  // Onboarding - Step 3 (Check Status)
  'onboarding.step3.header.title': {
    ms: 'Semak Status Permohonan',
    en: 'Check Application Status'
  },
  'onboarding.step3.header.subtitle': {
    ms: 'Pantau kemajuan permohonan SSM anda',
    en: 'Monitor your SSM application progress'
  },
  'onboarding.step3.status.pending': {
    ms: 'Dalam Proses',
    en: 'In Progress'
  },
  'onboarding.step3.status.pending_desc': {
    ms: 'Permohonan anda sedang diproses',
    en: 'Your application is being processed'
  },
  'onboarding.step3.status.approved': {
    ms: 'Diluluskan',
    en: 'Approved'
  },
  'onboarding.step3.status.approved_desc': {
    ms: 'Permohonan anda telah diluluskan',
    en: 'Your application has been approved'
  },
  'onboarding.step3.status.rejected': {
    ms: 'Perlu Semakan',
    en: 'Needs Review'
  },
  'onboarding.step3.status.rejected_desc': {
    ms: 'Permohonan memerlukan maklumat tambahan',
    en: 'Application needs additional information'
  },
  'onboarding.step3.last_checked': {
    ms: 'Terakhir disemak:',
    en: 'Last checked:'
  },
  'onboarding.step3.refresh_status': {
    ms: 'Semak Status Terkini',
    en: 'Refresh Status'
  },
  'onboarding.step3.checking': {
    ms: 'Menyemak...',
    en: 'Checking...'
  },
  'onboarding.step3.next_steps': {
    ms: 'Langkah Seterusnya',
    en: 'Next Steps'
  },
  'onboarding.step3.pending_step1': {
    ms: 'Tunggu kelulusan SSM (2-3 hari bekerja)',
    en: 'Wait for SSM approval (2-3 working days)'
  },
  'onboarding.step3.pending_step2': {
    ms: 'Kami akan hantar notifikasi bila siap',
    en: 'We will send notification when ready'
  },
  'onboarding.step3.pending_step3': {
    ms: 'Hubungi sokongan jika ada soalan',
    en: 'Contact support if you have questions'
  },
  'onboarding.step3.approved_step1': {
    ms: 'Tahniah! Permohonan anda diluluskan',
    en: 'Congratulations! Your application is approved'
  },
  'onboarding.step3.approved_step2': {
    ms: 'Seterusnya: Setup akaun bank',
    en: 'Next: Set up bank account'
  },
  'onboarding.step3.approved_step3': {
    ms: 'Dokumen rasmi akan dihantar dalam 1-2 hari',
    en: 'Official documents will be sent in 1-2 days'
  },
  'onboarding.step3.rejected_step1': {
    ms: 'Permohonan perlu semakan',
    en: 'Application needs review'
  },
  'onboarding.step3.rejected_step2': {
    ms: 'Sila semak dokumen yang dihantar',
    en: 'Please check submitted documents'
  },
  'onboarding.step3.rejected_step3': {
    ms: 'Hubungi sokongan untuk bantuan',
    en: 'Contact support for assistance'
  },
  'onboarding.step3.ssm_details': {
    ms: 'Butiran SSM',
    en: 'SSM Details'
  },
  'onboarding.step3.registration_number': {
    ms: 'No. Pendaftaran:',
    en: 'Registration Number:'
  },
  'onboarding.step3.business_name': {
    ms: 'Nama Perniagaan:',
    en: 'Business Name:'
  },
  'onboarding.step3.registration_date': {
    ms: 'Tarikh Daftar:',
    en: 'Registration Date:'
  },
  'onboarding.step3.expiry_date': {
    ms: 'Tarikh Tamat:',
    en: 'Expiry Date:'
  },
  'onboarding.step3.business_type': {
    ms: 'Jenis Perniagaan:',
    en: 'Business Type:'
  },
  'onboarding.step3.address': {
    ms: 'Alamat:',
    en: 'Address:'
  },
  'onboarding.step3.progress_title': {
    ms: 'Progress:',
    en: 'Progress:'
  },
  'onboarding.step3.documents_submitted': {
    ms: 'Dokumen Diserahkan',
    en: 'Documents Submitted'
  },
  'onboarding.step3.documents_submitted_desc': {
    ms: 'Semua dokumen diterima',
    en: 'All documents received'
  },
  'onboarding.step3.document_review': {
    ms: 'Semakan Dokumen',
    en: 'Document Review'
  },
  'onboarding.step3.document_review_desc': {
    ms: 'Semakan selesai',
    en: 'Review completed'
  },
  'onboarding.step3.decision': {
    ms: 'Keputusan',
    en: 'Decision'
  },
  'onboarding.step3.decision_desc': {
    ms: 'Diluluskan',
    en: 'Approved'
  },
  'onboarding.step3.ssm_registration': {
    ms: 'Butiran SSM',
    en: 'SSM Registration'
  },
  'onboarding.step3.ssm_registration_desc': {
    ms: 'Perniagaan anda telah berjaya didaftarkan',
    en: 'Your business has been successfully registered'
  },
  'onboarding.step3.official_documents': {
    ms: 'Dokumen Rasmi',
    en: 'Official Documents'
  },
  'onboarding.step3.official_documents_desc': {
    ms: 'Sijil SSM rasmi akan dihantar ke alamat anda dalam 1-2 hari bekerja',
    en: 'Official SSM certificate will be sent to your address within 1-2 working days'
  },
  'onboarding.step3.need_help': {
    ms: 'Perlukan Bantuan?',
    en: 'Need Help?'
  },
  'onboarding.step3.contact_support': {
    ms: 'Hubungi pasukan sokongan kami jika anda ada sebarang soalan',
    en: 'Contact our support team if you have any questions'
  },
  'onboarding.step3.whatsapp': {
    ms: 'WhatsApp: +60 12-345-6789',
    en: 'WhatsApp: +60 12-345-6789'
  },
  'onboarding.step3.email': {
    ms: 'Email: support@bizzku.com',
    en: 'Email: support@bizzku.com'
  },
  'onboarding.step3.operating_hours': {
    ms: 'Waktu: 9 Pagi - 6 Petang (Isnin - Jumaat)',
    en: 'Hours: 9 AM - 6 PM (Monday - Friday)'
  },

  // Onboarding - Step 4 (QR Merchant)
  'onboarding.step4.header.title': {
    ms: 'Setup QR Pedagang',
    en: 'QR Merchant Setup'
  },
  'onboarding.step4.header.subtitle': {
    ms: 'Dapatkan QR kod untuk terima pembayaran dari pelanggan',
    en: 'Get QR code to accept payments from customers'
  },
  'onboarding.step4.select_bank': {
    ms: 'Pilih Bank Anda',
    en: 'Select Your Bank'
  },
  'onboarding.step4.select_bank_desc': {
    ms: 'Pilih bank untuk setup QR pembayaran',
    en: 'Choose bank for payment QR setup'
  },
  'onboarding.step4.processing_time': {
    ms: 'Masa pemprosesan:',
    en: 'Processing time:'
  },
  'onboarding.step4.consent_title': {
    ms: 'Persetujuan Berkongsi Maklumat',
    en: 'Information Sharing Consent'
  },
  'onboarding.step4.consent_desc': {
    ms: 'Kami perlu berkongsi maklumat SSM anda dengan bank untuk setup QR pedagang',
    en: 'We need to share your SSM information with the bank for merchant QR setup'
  },
  'onboarding.step4.consent_what_shared': {
    ms: 'Maklumat yang akan dikongsi:',
    en: 'Information to be shared:'
  },
  'onboarding.step4.consent_item1': {
    ms: '• No. pendaftaran SSM',
    en: '• SSM registration number'
  },
  'onboarding.step4.consent_item2': {
    ms: '• Nama perniagaan',
    en: '• Business name'
  },
  'onboarding.step4.consent_item3': {
    ms: '• Alamat perniagaan',
    en: '• Business address'
  },
  'onboarding.step4.consent_item4': {
    ms: '• Maklumat hubungan',
    en: '• Contact information'
  },
  'onboarding.step4.consent_checkbox': {
    ms: 'Saya bersetuju untuk berkongsi maklumat SSM saya dengan bank yang dipilih untuk tujuan setup QR pedagang',
    en: 'I consent to share my SSM information with the selected bank for merchant QR setup purposes'
  },
  'onboarding.step4.submit_request': {
    ms: 'Hantar Permohonan QR',
    en: 'Submit QR Request'
  },
  'onboarding.step4.submitting': {
    ms: 'Menghantar...',
    en: 'Submitting...'
  },
  'onboarding.step4.status_title': {
    ms: 'Status QR Pedagang',
    en: 'Merchant QR Status'
  },
  'onboarding.step4.status.pending': {
    ms: 'Permohonan Dihantar',
    en: 'Request Submitted'
  },
  'onboarding.step4.status.pending_desc': {
    ms: 'Permohonan QR anda telah dihantar ke bank',
    en: 'Your QR request has been submitted to the bank'
  },
  'onboarding.step4.status.processing': {
    ms: 'Sedang Diproses',
    en: 'Processing'
  },
  'onboarding.step4.status.processing_desc': {
    ms: 'Bank sedang memproses permohonan QR anda',
    en: 'Bank is processing your QR request'
  },
  'onboarding.step4.status.ready': {
    ms: 'QR Siap',
    en: 'QR Ready'
  },
  'onboarding.step4.status.ready_desc': {
    ms: 'QR pedagang anda sudah siap untuk digunakan',
    en: 'Your merchant QR is ready to use'
  },
  'onboarding.step4.status.failed': {
    ms: 'Perlu Tindakan',
    en: 'Action Required'
  },
  'onboarding.step4.status.failed_desc': {
    ms: 'Terdapat masalah dengan permohonan QR anda',
    en: 'There is an issue with your QR request'
  },
  'onboarding.step4.request_date': {
    ms: 'Tarikh Permohonan:',
    en: 'Request Date:'
  },
  'onboarding.step4.estimated_ready': {
    ms: 'Anggaran Siap:',
    en: 'Estimated Ready:'
  },
  'onboarding.step4.selected_bank': {
    ms: 'Bank Dipilih:',
    en: 'Selected Bank:'
  },
  'onboarding.step4.qr_code': {
    ms: 'QR Kod Anda',
    en: 'Your QR Code'
  },
  'onboarding.step4.download_qr': {
    ms: 'Muat Turun QR',
    en: 'Download QR'
  },
  'onboarding.step4.print_qr': {
    ms: 'Cetak QR',
    en: 'Print QR'
  },
  'onboarding.step4.complete_setup': {
    ms: 'Selesaikan Setup',
    en: 'Complete Setup'
  },
  'onboarding.step4.congratulations': {
    ms: 'Tahniah! Setup perniagaan anda telah selesai',
    en: 'Congratulations! Your business setup is complete'
  },
  'onboarding.step4.bank.maybank.name': {
    ms: 'Maybank',
    en: 'Maybank'
  },
  'onboarding.step4.bank.maybank.desc': {
    ms: 'Bank terbesar Malaysia',
    en: "Malaysia's largest bank"
  },
  'onboarding.step4.bank.maybank.processing': {
    ms: 'Masa pemprosesan: 3-5 hari bekerja',
    en: 'Processing time: 3-5 working days'
  },
  'onboarding.step4.bank.cimb.name': {
    ms: 'CIMB Bank',
    en: 'CIMB Bank'
  },
  'onboarding.step4.bank.cimb.desc': {
    ms: 'Bank universal ASEAN terkemuka',
    en: 'Leading ASEAN universal bank'
  },
  'onboarding.step4.bank.cimb.processing': {
    ms: 'Masa pemprosesan: 2-4 hari bekerja',
    en: 'Processing time: 2-4 working days'
  },
  'onboarding.step4.bank.public.name': {
    ms: 'Public Bank',
    en: 'Public Bank'
  },
  'onboarding.step4.bank.public.desc': {
    ms: 'Dipercayai oleh jutaan',
    en: 'Trusted by millions'
  },
  'onboarding.step4.bank.public.processing': {
    ms: 'Masa pemprosesan: 3-5 hari bekerja',
    en: 'Processing time: 3-5 working days'
  },
  'onboarding.step4.bank.rhb.name': {
    ms: 'RHB Bank',
    en: 'RHB Bank'
  },
  'onboarding.step4.bank.rhb.desc': {
    ms: 'Rakan anda dalam kemajuan',
    en: 'Your partner in progress'
  },
  'onboarding.step4.bank.rhb.processing': {
    ms: 'Masa pemprosesan: 2-3 hari bekerja',
    en: 'Processing time: 2-3 working days'
  },
  'onboarding.step4.bank.hongleong.name': {
    ms: 'Hong Leong Bank',
    en: 'Hong Leong Bank'
  },
  'onboarding.step4.bank.hongleong.desc': {
    ms: 'The Caring Bank',
    en: 'The Caring Bank'
  },
  'onboarding.step4.bank.hongleong.processing': {
    ms: 'Masa pemprosesan: 3-4 hari bekerja',
    en: 'Processing time: 3-4 working days'
  },
  'onboarding.step4.bank.ambank.name': {
    ms: 'AmBank',
    en: 'AmBank'
  },
  'onboarding.step4.bank.ambank.desc': {
    ms: 'Membantu anda berkembang',
    en: 'Helping you prosper'
  },
  'onboarding.step4.bank.ambank.processing': {
    ms: 'Masa pemprosesan: 4-6 hari bekerja',
    en: 'Processing time: 4-6 working days'
  },
  'onboarding.step4.important_notice': {
    ms: 'Penting:',
    en: 'Important:'
  },
  'onboarding.step4.privacy_notice': {
    ms: 'Bank akan menggunakan maklumat ini untuk memproses permohonan QR pedagang anda. Maklumat ini akan digunakan dengan selamat mengikut dasar privasi bank.',
    en: 'Bank will use this information to process your merchant QR application. This information will be used securely according to the bank\'s privacy policy.'
  },
  'onboarding.step4.next_steps_title': {
    ms: 'Langkah Seterusnya:',
    en: 'Next Steps:'
  },
  'onboarding.step4.next_step1': {
    ms: 'Tunggu email pengesahan dari bank',
    en: 'Wait for confirmation email from bank'
  },
  'onboarding.step4.next_step2': {
    ms: 'QR pedagang akan dihantar dalam 2-3 hari bekerja',
    en: 'QR merchant will be sent within 2-3 working days'
  },
  'onboarding.step4.next_step3': {
    ms: 'Anda boleh mula terima pembayaran sebaik sahaja QR siap',
    en: 'You can start accepting payments once QR is ready'
  },

  // Chatbot
  'chatbot.greeting': {
    ms: 'Hai! 👋 Macam mana saya boleh bantu dengan sokongan perniagaan anda hari ini?',
    en: 'Hi! 👋 How can I help you with your business support today?'
  },
  'chatbot.placeholder': {
    ms: 'Tanya BizMate...',
    en: 'Ask BizMate...'
  },
  'chatbot.error': {
    ms: 'Maaf, ada masalah. Sila cuba lagi.',
    en: 'Sorry, there was an error. Please try again.'
  },

  // Recommendation Page
  'recommendation.title': {
    ms: 'Cari bantuan kewangan yang sesuai!',
    en: 'Discover tailored financial support!'
  },
  'recommendation.subtitle': {
    ms: 'Kami analisis profil perniagaan anda dan cadangkan geran, pinjaman, subsidi, dan skim insentif yang berkaitan — semua dalam satu tempat.',
    en: 'We analyze your business profile and suggests relevant grants, loans, subsidies, and incentive schemes — all in one place.'
  },
  'recommendation.form.purpose.label': {
    ms: 'Tujuan Pembiayaan',
    en: 'Funding Purpose'
  },
  'recommendation.form.purpose.placeholder': {
    ms: 'Contoh: Beli peralatan, tambah stok, bayar gaji...',
    en: 'e.g., Buy equipment, add inventory, pay salaries...'
  },
  'recommendation.form.amount.label': {
    ms: 'Jumlah Diperlukan',
    en: 'Amount Needed'
  },
  'recommendation.form.amount.placeholder': {
    ms: 'Contoh: RM10,000',
    en: 'e.g., RM10,000'
  },
  'recommendation.form.additional.label': {
    ms: 'Keperluan Tambahan',
    en: 'Additional Requirements'
  },
  'recommendation.form.additional.placeholder': {
    ms: 'Terangkan keperluan khas, contoh: sijil halal, wanita sahaja, dll.',
    en: 'Describe any special needs, e.g. halal certification, women-only, etc.'
  },
  'recommendation.form.button.generate': {
    ms: 'Jana Cadangan',
    en: 'Generate Recommendations'
  },
  'recommendation.form.button.generating': {
    ms: 'Menjana...',
    en: 'Generating...'
  },
  'recommendation.history.button': {
    ms: 'Sejarah',
    en: 'History'
  },
  'recommendation.profile.button': {
    ms: 'Profil Syarikat',
    en: 'Company Profile'
  },

  'recommendation.top_picks.title': {
    ms: 'Pilihan Terbaik untuk Perniagaan Anda',
    en: 'Top 3 Picks for Your Business'
  },
  'recommendation.other_funding.title': {
    ms: 'Pembiayaan & Sokongan Lain yang Layak',
    en: 'Other Eligible Funding & Support'
  },
  'recommendation.tabs.grants_loans': {
    ms: 'Geran & Pinjaman',
    en: 'Grants & Loans'
  },
  'recommendation.tabs.subsidies_schemes': {
    ms: 'Subsidi & Skim',
    en: 'Subsidies & Schemes'
  },
  'recommendation.card.max_amount': {
    ms: 'Jumlah Maksimum:',
    en: 'Max Amount:'
  },
  'recommendation.card.for': {
    ms: 'Untuk:',
    en: 'For:'
  },
  'recommendation.card.eligibility': {
    ms: 'Kelayakan:',
    en: 'Eligibility:'
  },
  'recommendation.card.apply_now': {
    ms: 'Mohon Sekarang',
    en: 'Apply Now'
  },
  'recommendation.loading': {
    ms: 'Memuatkan...',
    en: 'Loading...'
  },

  // Funding Purpose Options
  'recommendation.purpose.equipment': {
    ms: 'Peralatan',
    en: 'Equipment'
  },
  'recommendation.purpose.digitalization': {
    ms: 'Digitalisasi',
    en: 'Digitalization'
  },
  'recommendation.purpose.working_capital': {
    ms: 'Modal Kerja',
    en: 'Working Capital'
  },
  'recommendation.purpose.expansion': {
    ms: 'Pengembangan Perniagaan',
    en: 'Business Expansion'
  },
  'recommendation.purpose.inventory': {
    ms: 'Inventori',
    en: 'Inventory'
  },

  // Preference Options
  'recommendation.preference.grant': {
    ms: 'Geran sahaja',
    en: 'Grant only'
  },
  'recommendation.preference.loan': {
    ms: 'Pinjaman sahaja',
    en: 'Loan only'
  },
  'recommendation.preference.low_interest': {
    ms: 'Faedah rendah',
    en: 'Low-interest'
  },
  'recommendation.preference.fast_approval': {
    ms: 'Kelulusan pantas',
    en: 'Fast approval'
  },
  'recommendation.preferences.label': {
    ms: 'Keutamaan',
    en: 'Preferences'
  },

  // Thinking Process
  'recommendation.thinking.title': {
    ms: 'AI Agen sedang berfikir...',
    en: 'AI Agent is Thinking...'
  },
  'recommendation.thinking.subtitle': {
    ms: 'Beri kami sedikit masa sementara AI kami menganalisis keperluan anda dan menjana cadangan pembiayaan yang diperibadikan.',
    en: 'Give us a moment while our AI analyzes your requirements and generates personalized funding recommendations.'
  },
  'recommendation.thinking.stage1': {
    ms: 'Menganalisis profil syarikat dan data kewangan',
    en: 'Analyzing company profile and financial data'
  },
  'recommendation.thinking.stage2': {
    ms: 'Mendapatkan maklumat pembiayaan yang berkaitan',
    en: 'Retrieving relevant funding information'
  },
  'recommendation.thinking.stage3': {
    ms: 'Merumuskan cadangan yang diperibadikan',
    en: 'Formulating personalized recommendations'
  },
  'recommendation.thinking.stage4': {
    ms: 'Menyediakan pilihan pembiayaan anda',
    en: 'Preparing your funding options'
  },
  'recommendation.thinking.completed': {
    ms: 'Selesai',
    en: 'Completed'
  },
  'recommendation.thinking.in_progress': {
    ms: 'Sedang Diproses',
    en: 'In Progress'
  },

  // Thinking Process Details
  'recommendation.thinking.detail1_1': {
    ms: 'Memproses penyata kewangan',
    en: 'Processing financial statements'
  },
  'recommendation.thinking.detail1_2': {
    ms: 'Menganalisis corak aliran tunai',
    en: 'Analyzing cash flow patterns'
  },
  'recommendation.thinking.detail1_3': {
    ms: 'Menilai penanda aras industri',
    en: 'Evaluating industry benchmarks'
  },
  'recommendation.thinking.detail1_4': {
    ms: 'Memeriksa kriteria kelayakan',
    en: 'Checking eligibility criteria'
  },
  'recommendation.thinking.detail2_1': {
    ms: 'Mencari pangkalan data pembiayaan',
    en: 'Searching funding database'
  },
  'recommendation.thinking.detail2_2': {
    ms: 'Memadankan dengan keperluan industri',
    en: 'Matching with industry requirements'
  },
  'recommendation.thinking.detail2_3': {
    ms: 'Menapis mengikut kriteria kelayakan',
    en: 'Filtering by eligibility criteria'
  },
  'recommendation.thinking.detail2_4': {
    ms: 'Menyusun pilihan pembiayaan mengikut kesesuaian',
    en: 'Ranking funding options by relevance'
  },
  'recommendation.thinking.detail3_1': {
    ms: 'Menjana struktur cadangan',
    en: 'Generating recommendation structure'
  },
  'recommendation.thinking.detail3_2': {
    ms: 'Mengira skor padanan pembiayaan',
    en: 'Calculating funding match score'
  },
  'recommendation.thinking.detail3_3': {
    ms: 'Menentukan sebab cadangan',
    en: 'Determining reason for recommendation'
  },
  'recommendation.thinking.detail3_4': {
    ms: 'Menyelesaikan penilaian kelayakan',
    en: 'Finalizing eligibility assessment'
  },
  'recommendation.thinking.detail4_1': {
    ms: 'Mencipta persembahan visual',
    en: 'Creating visual presentation'
  },
  'recommendation.thinking.detail4_2': {
    ms: 'Memformat butiran penyedia',
    en: 'Formatting provider details'
  },
  'recommendation.thinking.detail4_3': {
    ms: 'Menyusun mengikut skor kesesuaian',
    en: 'Sorting by suitability score'
  },
  'recommendation.thinking.detail4_4': {
    ms: 'Menyelesaikan cadangan',
    en: 'Finalizing recommendations'
  },

  // Common Recommendation Data
  'recommendation.data.digital_grant.name': {
    ms: 'Geran Digital PKS (Geran Digital PKS)',
    en: 'Geran Digital PKS (SME Digital Grant)'
  },
  'recommendation.data.digital_grant.description': {
    ms: 'Dapatkan sehingga RM5,000 untuk mendigitalkan perniagaan anda (contoh: POS, e-dagang, perakaunan).',
    en: 'Get up to RM5,000 to digitalize your business (e.g., POS, e-commerce, accounting).'
  },
  'recommendation.data.digital_grant.highlight': {
    ms: 'Sesuai untuk naik taraf ke e-dagang atau POS digital',
    en: 'Perfect for upgrading to e-commerce or digital POS'
  },
  'recommendation.data.tekun.name': {
    ms: 'Pembiayaan Mikro TEKUN Nasional',
    en: 'TEKUN Nasional Micro Financing'
  },
  'recommendation.data.tekun.description': {
    ms: 'Pinjaman mikro mudah untuk peniaga kecil dan penjaja, sehingga RM10,000.',
    en: 'Easy micro-loans for small traders and hawkers, up to RM10,000.'
  },
  'recommendation.data.tekun.highlight': {
    ms: 'Kelulusan pantas, dokumentasi rendah',
    en: 'Fast approval, low documentation'
  },
  'recommendation.data.fund_for_food.name': {
    ms: 'Dana untuk Makanan (3F)',
    en: 'Fund for Food (3F)'
  },
  'recommendation.data.fund_for_food.description': {
    ms: 'Pembiayaan untuk projek pengeluaran makanan (tanaman, ternakan, akuakultur, dll.) untuk meningkatkan keselamatan makanan Malaysia.',
    en: 'Financing for food production projects (crops, livestock, aquaculture, etc.) to boost Malaysia\'s food security.'
  },
  'recommendation.data.fund_for_food.highlight': {
    ms: 'Pembiayaan jangka panjang untuk pengeluaran makanan',
    en: 'Long-term financing for food production'
  },
  'recommendation.data.beep.name': {
    ms: 'Program Peningkatan Perusahaan Bumiputera (BEEP)',
    en: 'Bumiputera Enterprise Enhancement Program (BEEP)'
  },
  'recommendation.data.beep.description': {
    ms: 'Geran untuk usahawan agri-bumiputera untuk menaik taraf peralatan, penjenamaan, dan digitalisasi.',
    en: 'Grant for Bumiputera agri-entrepreneurs to upgrade equipment, branding, and digitalisation.'
  },
  'recommendation.data.beep.highlight': {
    ms: 'Naik taraf aset perniagaan agri anda',
    en: 'Upgrade your agri-business assets'
  },
  'recommendation.data.budi_madani.name': {
    ms: 'BUDI MADANI Agri-Komoditi',
    en: 'BUDI MADANI Agri-Komoditi'
  },
  'recommendation.data.budi_madani.description': {
    ms: 'Subsidi tunai diesel RM200/bulan untuk petani kecil dan penanam komoditi berdaftar.',
    en: 'RM200/month diesel cash subsidy for registered small-scale farmers and commodity growers.'
  },
  'recommendation.data.budi_madani.highlight': {
    ms: 'Kurangkan kos pertanian anda dengan subsidi diesel bulanan!',
    en: 'Lower your farming costs with monthly diesel subsidy!'
  },

  // Success Metrics
  'recommendation.metrics.businesses_matched': {
    ms: 'perniagaan mikro dipadankan',
    en: 'micro businesses matched'
  },
  'recommendation.metrics.amount_approved': {
    ms: 'juta diluluskan',
    en: 'million approved'
  },
  'recommendation.metrics.found_support': {
    ms: 'mendapat sokongan yang layak',
    en: 'found eligible support'
  },

  // Top Picks Insights
  'recommendation.insights.revenue_increase': {
    ms: 'Potensi peningkatan hasil: +12%',
    en: 'Potential revenue increase: +12%'
  },
  'recommendation.insights.fast_track_agri': {
    ms: 'Percepat pertumbuhan perniagaan agri anda',
    en: 'Fast-track your agri-business growth'
  },
  'recommendation.insights.high_funding': {
    ms: 'Pembiayaan tinggi, halangan rendah untuk pengembangan',
    en: 'High funding, low barrier for expansion'
  },
  'recommendation.insights.upgrade_assets': {
    ms: 'Naik taraf aset, tingkatkan produktiviti',
    en: 'Upgrade assets, boost productivity'
  },
  'recommendation.insights.quick_approval': {
    ms: 'Kelulusan geran pantas untuk Bumiputera',
    en: 'Quick grant approval for Bumiputera'
  },
  'recommendation.insights.enhance_brand': {
    ms: 'Tingkatkan jenama dan kehadiran digital',
    en: 'Enhance brand and digital presence'
  },
  'recommendation.insights.save_fuel': {
    ms: 'Jimat sehingga RM2,400/tahun untuk bahan api',
    en: 'Save up to RM2,400/year on fuel'
  },
  'recommendation.insights.lower_costs': {
    ms: 'Kurangkan kos operasi bulanan',
    en: 'Lower monthly operating costs'
  },
  'recommendation.insights.govt_support': {
    ms: 'Sokongan kerajaan yang mudah',
    en: 'Simple, government-backed support'
  },

  // Why Recommended
  'recommendation.why.title': {
    ms: 'Mengapa ini dicadangkan untuk anda:',
    en: 'Why this is recommended for you:'
  },
  'recommendation.why.digitalize_sme': {
    ms: 'Sesuai untuk PKS yang ingin mendigitalkan operasi dan meningkatkan jualan dalam talian. Kadar kelulusan tinggi untuk perniagaan yang layak.',
    en: 'Ideal for SMEs looking to digitalize operations and boost online sales. High approval rate for eligible businesses.'
  },
  'recommendation.why.bumiputera_grant': {
    ms: 'Geran khas untuk usahawan Bumiputera. Proses kelulusan yang dipermudahkan dan sokongan teknikal.',
    en: 'Special grant for Bumiputera entrepreneurs. Streamlined approval process and technical support.'
  },
  'recommendation.why.monthly_subsidy': {
    ms: 'Subsidi bulanan yang berterusan untuk mengurangkan kos operasi. Mudah untuk memohon dan menerima.',
    en: 'Continuous monthly subsidy to reduce operating costs. Easy to apply and receive.'
  },
  'recommendation.why.micro_funding': {
    ms: 'Sesuai untuk perniagaan mikro yang memerlukan pembiayaan pantas tanpa kerumitan untuk menyokong operasi harian atau pengembangan.',
    en: 'Perfect for micro businesses needing quick, hassle-free funding to support daily operations or expansion.'
  },
  'recommendation.why.larger_funding': {
    ms: 'Bagus untuk perusahaan mikro yang mencari pembiayaan yang lebih besar dengan pilihan pembayaran balik yang mesra perniagaan.',
    en: 'Great for micro enterprises seeking larger funding with business-friendly repayment options.'
  },

  // History Modal
  'recommendation.history.title': {
    ms: 'Sejarah Cadangan',
    en: 'Recommendation History'
  },
  'recommendation.history.no_history': {
    ms: 'Tiada sejarah dijumpai.',
    en: 'No history found.'
  },
  'recommendation.history.restore': {
    ms: 'Pulihkan input ini',
    en: 'Restore these inputs'
  },

  // Badge Text
  'recommendation.badge.top': {
    ms: 'Nombor',
    en: 'Top'
  },

  // Additional Recommendation Data
  'recommendation.data.sme_digitalisation.name': {
    ms: 'Geran Padanan Digitalisasi PKS',
    en: 'SME Digitalisation Matching Grant'
  },
  'recommendation.data.sme_digitalisation.description': {
    ms: 'Geran padanan 50% untuk penyelesaian digital (e-dagang, POS, gaji, dll.), sehingga RM5,000.',
    en: '50% matching grant for digital solutions (e-commerce, POS, payroll, etc.), up to RM5,000.'
  },
  'recommendation.data.sme_digitalisation.highlight': {
    ms: 'Potong kos digital anda separuh!',
    en: 'Cut your digital costs in half!'
  },
  'recommendation.data.sme_bank_loan.name': {
    ms: 'Pinjaman Perusahaan Mikro Bank PKS',
    en: 'SME Bank Micro Enterprise Loan'
  },
  'recommendation.data.sme_bank_loan.description': {
    ms: 'Pinjaman mikro fleksibel sehingga RM50,000 untuk pertumbuhan perniagaan dan modal kerja.',
    en: 'Flexible micro loans up to RM50,000 for business growth and working capital.'
  },
  'recommendation.data.sme_bank_loan.highlight': {
    ms: 'Pembayaran balik fleksibel, syarat mesra perniagaan',
    en: 'Flexible repayment, business-friendly terms'
  },
  'recommendation.data.tus.name': {
    ms: 'Tabung Usahawan Siswazah (TUS)',
    en: 'Tabung Usahawan Siswazah (TUS)'
  },
  'recommendation.data.tus.description': {
    ms: 'Skim pinjaman untuk graduan memulakan atau mengembangkan perniagaan, sehingga RM50,000.',
    en: 'Loan scheme for graduates to start or expand businesses, up to RM50,000.'
  },
  'recommendation.data.tus.highlight': {
    ms: 'Khas untuk graduan universiti/kolej',
    en: 'Special for university/college graduates'
  },

  // Additional Grant Data
  'recommendation.data.beep_sme.name': {
    ms: 'Program Peningkatan Perusahaan Bumiputera (BEEP)',
    en: 'Bumiputera Enterprise Enhancement Program (BEEP)'
  },
  'recommendation.data.beep_sme.description': {
    ms: 'Geran untuk PKS Bumiputera untuk menaik taraf peralatan, penjenamaan, dan digitalisasi.',
    en: 'Grant for Bumiputera SMEs to upgrade equipment, branding, and digitalization.'
  },
  'recommendation.data.beep_sme.highlight': {
    ms: 'Naik taraf aset perniagaan anda!',
    en: 'Upgrade your business assets!'
  },
  'recommendation.data.mbf.name': {
    ms: 'Pembiayaan Mikro Biz (MBF)',
    en: 'Micro Biz Financing (MBF)'
  },
  'recommendation.data.mbf.description': {
    ms: 'Pembiayaan mikro untuk petani kecil dan agroprenuer pada kadar faedah rendah (2% setahun).',
    en: 'Micro-financing for small-scale farmers and agropreneurs at a low interest rate (2% per annum).'
  },
  'recommendation.data.mbf.highlight': {
    ms: 'Faedah rendah, kelulusan mudah',
    en: 'Low interest, easy approval'
  },

  // Subsidy Data
  'recommendation.data.electricity_rebate.name': {
    ms: 'Rebat Tarif Elektrik PKS',
    en: 'SME Electricity Tariff Rebate'
  },
  'recommendation.data.electricity_rebate.description': {
    ms: 'Rebat bulanan pada bil elektrik untuk perniagaan mikro dan kecil.',
    en: 'Monthly rebate on electricity bills for micro and small businesses.'
  },
  'recommendation.data.electricity_rebate.highlight': {
    ms: 'Kurangkan kos utiliti bulanan anda',
    en: 'Lower your monthly utility costs'
  },
  'recommendation.data.sst_exemption.name': {
    ms: 'Pengecualian Cukai Jualan & Perkhidmatan (SST)',
    en: 'Sales & Service Tax (SST) Exemption'
  },
  'recommendation.data.sst_exemption.description': {
    ms: 'Pengecualian daripada SST untuk kategori perniagaan terpilih.',
    en: 'Exemption from SST for selected business categories.'
  },
  'recommendation.data.sst_exemption.highlight': {
    ms: 'Tingkatkan margin keuntungan anda!',
    en: 'Boost your profit margins!'
  },
  'recommendation.data.perkeso_subsidy.name': {
    ms: 'Subsidi Gaji PERKESO',
    en: 'PERKESO Wage Subsidy'
  },
  'recommendation.data.perkeso_subsidy.description': {
    ms: 'Subsidi gaji untuk majikan mengekalkan pekerja tempatan semasa masa sukar.',
    en: 'Wage subsidy for employers to retain local workers during tough times.'
  },
  'recommendation.data.perkeso_subsidy.highlight': {
    ms: 'Sokongan untuk mengekalkan pasukan anda!',
    en: 'Support for keeping your team!'
  },
  'recommendation.data.micro_tax_incentive.name': {
    ms: 'Insentif Cukai Perusahaan Mikro',
    en: 'Micro Enterprise Tax Incentive'
  },
  'recommendation.data.micro_tax_incentive.description': {
    ms: 'Kadar cukai dikurangkan untuk perusahaan mikro pada RM600,000 pertama pendapatan boleh cukai.',
    en: 'Reduced tax rate for micro enterprises on the first RM600,000 chargeable income.'
  },
  'recommendation.data.micro_tax_incentive.highlight': {
    ms: 'Bayar cukai kurang, berkembang lebih!',
    en: 'Pay less tax, grow more!'
  },
  'recommendation.data.food_tax_incentive.name': {
    ms: 'Insentif Cukai untuk Projek Pengeluaran Makanan',
    en: 'Tax Incentives for Food Production Projects'
  },
  'recommendation.data.food_tax_incentive.description': {
    ms: 'Pengecualian cukai dan elaun modal dipercepatkan untuk projek pengeluaran makanan/pertanian yang diluluskan.',
    en: 'Tax exemptions and accelerated capital allowances for approved food production/agriculture projects.'
  },
  'recommendation.data.food_tax_incentive.highlight': {
    ms: 'Pelepasan cukai untuk projek makanan/agri',
    en: 'Tax relief for food/agri projects'
  },

  // Type Badges
  'recommendation.type.grant': {
    ms: 'Geran',
    en: 'Grant'
  },
  'recommendation.type.loan': {
    ms: 'Pinjaman',
    en: 'Loan'
  },
  'recommendation.type.subsidy': {
    ms: 'Subsidi',
    en: 'Subsidy'
  },
  'recommendation.type.tax_relief': {
    ms: 'Pelepasan Cukai',
    en: 'Tax Relief'
  },

  // Provider Names
  'recommendation.provider.mdec_bsn': {
    ms: 'MDEC & BSN',
    en: 'MDEC & BSN'
  },
  'recommendation.provider.tekun': {
    ms: 'TEKUN Nasional',
    en: 'TEKUN Nasional'
  },
  'recommendation.provider.bsn': {
    ms: 'BSN',
    en: 'BSN'
  },
  'recommendation.provider.sme_bank': {
    ms: 'Bank PKS',
    en: 'SME Bank'
  },
  'recommendation.provider.mara': {
    ms: 'MARA',
    en: 'MARA'
  },
  'recommendation.provider.sme_corp': {
    ms: 'Perbadanan PKS',
    en: 'SME Corp'
  },
  'recommendation.provider.agrobank': {
    ms: 'Agrobank',
    en: 'Agrobank'
  },
  'recommendation.provider.ministry_finance': {
    ms: 'Kementerian Kewangan',
    en: 'Ministry of Finance'
  },
  'recommendation.provider.tnb': {
    ms: 'TNB',
    en: 'TNB'
  },
  'recommendation.provider.lhdn': {
    ms: 'LHDN',
    en: 'LHDN'
  },
  'recommendation.provider.perkeso': {
    ms: 'PERKESO',
    en: 'PERKESO'
  },

  // Eligibility Criteria
  'recommendation.eligibility.digital_grant': {
    ms: 'PKS milik Malaysia, min 60% pemilikan tempatan, beroperasi >1 tahun, jualan tahunan <RM50j.',
    en: 'Malaysian-owned SME, min 60% local shareholding, in operation >1 year, annual sales <RM50m.'
  },
  'recommendation.eligibility.tekun': {
    ms: 'Warganegara Malaysia, 18-65 tahun, pemilik perniagaan mikro, berdaftar dengan SSM atau majlis tempatan.',
    en: 'Malaysian, 18-65 years old, micro business owner, registered with SSM or local council.'
  },
  'recommendation.eligibility.sme_digitalisation': {
    ms: 'PKS Malaysia, beroperasi >1 tahun, jualan tahunan <RM50j.',
    en: 'Malaysian SME, in operation >1 year, annual sales <RM50m.'
  },
  'recommendation.eligibility.sme_bank_loan': {
    ms: 'Perusahaan mikro Malaysia, berdaftar dengan SSM, beroperasi >1 tahun.',
    en: 'Malaysian micro enterprise, registered with SSM, in operation >1 year.'
  },
  'recommendation.eligibility.tus': {
    ms: 'Graduan Malaysia, berumur 18-40, perniagaan berdaftar dengan SSM.',
    en: 'Malaysian graduates, aged 18-40, business registered with SSM.'
  },
  'recommendation.eligibility.beep_sme': {
    ms: 'PKS milik Bumiputera, berdaftar dengan SSM, beroperasi >1 tahun.',
    en: 'Bumiputera-owned SME, registered with SSM, in operation >1 year.'
  },
  'recommendation.eligibility.fund_for_food': {
    ms: 'Petani Malaysia, agroprenuer, syarikat berasaskan agri',
    en: 'Malaysian farmers, agropreneurs, agri-based companies'
  },
  'recommendation.eligibility.mbf': {
    ms: 'Usahawan mikro Malaysia dalam bidang pertanian',
    en: 'Malaysian micro-entrepreneurs in agriculture'
  },
  'recommendation.eligibility.beep_agri': {
    ms: 'Perniagaan agri milik Bumiputera',
    en: 'Bumiputera-owned agri-businesses'
  },
  'recommendation.eligibility.budi_madani': {
    ms: 'Warganegara Malaysia berdaftar dengan GeoAgro atau lembaga komoditi (MPOB, LGM, dll.), pendapatan RM50k–RM300k setahun',
    en: 'Malaysian citizens registered with GeoAgro or commodity boards (MPOB, LGM, etc.), earning RM50k–RM300k annually'
  },
  'recommendation.eligibility.electricity_rebate': {
    ms: 'Perniagaan mikro dan kecil berdaftar, pelanggan TNB',
    en: 'Registered micro and small businesses, TNB customers'
  },
  'recommendation.eligibility.sst_exemption': {
    ms: 'Perniagaan mikro dan kecil yang layak, lihat garis panduan LHDN',
    en: 'Eligible micro and small businesses, see LHDN guidelines'
  },
  'recommendation.eligibility.perkeso_subsidy': {
    ms: 'Majikan berdaftar, pekerja tempatan, tertakluk kepada syarat PERKESO.',
    en: 'Registered employer, local employees, subject to PERKESO terms.'
  },
  'recommendation.eligibility.micro_tax_incentive': {
    ms: 'Perusahaan mikro, jualan tahunan <RM300,000, <5 pekerja.',
    en: 'Micro enterprise, annual sales <RM300,000, <5 employees.'
  },
  'recommendation.eligibility.food_tax_incentive': {
    ms: 'Projek pertanian yang diluluskan',
    en: 'Approved agricultural projects'
  },

  // For Whom Fields
  'recommendation.for_whom.online_sellers': {
    ms: 'Penjual dalam talian, kedai runcit, warung, perniagaan mikro',
    en: 'Online sellers, kedai runcit, warung, micro businesses'
  },
  'recommendation.for_whom.pasar_malam': {
    ms: 'Penjual pasar malam, gerai makanan, perniagaan berasaskan rumah',
    en: 'Pasar malam sellers, food stalls, home-based businesses'
  },
  'recommendation.for_whom.sme_digitalize': {
    ms: 'PKS yang ingin mendigitalkan',
    en: 'SMEs looking to digitalize'
  },
  'recommendation.for_whom.micro_businesses': {
    ms: 'Perniagaan mikro, gerai makanan, penyedia perkhidmatan',
    en: 'Micro businesses, food stalls, service providers'
  },
  'recommendation.for_whom.young_entrepreneurs': {
    ms: 'Usahawan muda, graduan baru',
    en: 'Young entrepreneurs, new graduates'
  },
  'recommendation.for_whom.bumiputera_sme': {
    ms: 'Perniagaan mikro dan kecil Bumiputera',
    en: 'Bumiputera micro and small businesses'
  },
  'recommendation.for_whom.farmers': {
    ms: 'Petani, agroprenuer, perniagaan agri',
    en: 'Farmers, agropreneurs, agri-businesses'
  },
  'recommendation.for_whom.smallholder_farmers': {
    ms: 'Petani kecil, agroprenuer mikro',
    en: 'Smallholder farmers, micro agropreneurs'
  },
  'recommendation.for_whom.bumiputera_agri': {
    ms: 'Agroprenuer Bumiputera',
    en: 'Bumiputera agri-entrepreneurs'
  },
  'recommendation.for_whom.smallholder_livestock': {
    ms: 'Petani kecil, penternak, penanam komoditi (cth: kelapa sawit, getah, koko)',
    en: 'Smallholder farmers, livestock breeders, and commodity growers (e.g., palm oil, rubber, cocoa)'
  },
  'recommendation.for_whom.all_micro_sme': {
    ms: 'Semua perniagaan mikro dan kecil',
    en: 'All micro and small businesses'
  },
  'recommendation.for_whom.retailers_fnb': {
    ms: 'Peruncit, F&B, penyedia perkhidmatan',
    en: 'Retailers, F&B, service providers'
  },
  'recommendation.for_whom.employers': {
    ms: 'Majikan dengan kakitangan tempatan',
    en: 'Employers with local staff'
  },
  'recommendation.for_whom.micro_businesses_simple': {
    ms: 'Perniagaan mikro',
    en: 'Micro businesses'
  },
  'recommendation.for_whom.farmers_agri': {
    ms: 'Petani, perniagaan agri',
    en: 'Farmers, agri-businesses'
  }
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')

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
