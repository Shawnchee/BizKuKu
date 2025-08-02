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
    ms: 'Permohonan',
    en: 'Application Status'
  },
  'nav.online-bizzku': {
    ms: 'Perniagaan Dalam Talian',
    en: 'Online Business'
  },
  'nav.mini-services': {
    ms: 'Perkhidmatan Sampingan',
    en: 'Business Toolkit'
  },
  'nav.recommendation': {
    ms: 'Pinjaman',
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
    ms: 'Tanya Sesuatu...',
    en: 'Ask Anything...'
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

  // Mini Services Page
  'mini_services.title': {
    ms: 'Perkhidmatan Mini',
    en: 'Mini Services'
  },
  'mini_services.subtitle': {
    ms: 'Akses alat dan perkhidmatan penting untuk menjalankan perniagaan anda dengan lebih cekap',
    en: 'Access essential tools and services to run your business more efficiently'
  },
  'mini_services.show_favorites': {
    ms: 'Tunjuk Kegemaran',
    en: 'Show Favorites'
  },
  'mini_services.show_all': {
    ms: 'Tunjuk Semua',
    en: 'Show All'
  },
  'mini_services.recommended': {
    ms: 'Disyorkan',
    en: 'Recommended'
  },
  'mini_services.popular': {
    ms: 'Popular',
    en: 'Popular'
  },
  'mini_services.step_of': {
    ms: 'Langkah {current} daripada {total}',
    en: 'Step {current} of {total}'
  },
  'mini_services.previous': {
    ms: 'Sebelum',
    en: 'Previous'
  },
  'mini_services.next': {
    ms: 'Seterusnya',
    en: 'Next'
  },
  'mini_services.complete': {
    ms: 'Selesai',
    en: 'Complete'
  },

  // Mini Services Categories
  'mini_services.category.financial': {
    ms: 'Kewangan & Pematuhan',
    en: 'Financial & Compliance'
  },
  'mini_services.category.operations': {
    ms: 'Titik Jualan & Operasi',
    en: 'Point of Sale & Operations'
  },
  'mini_services.category.digital': {
    ms: 'Kehadiran Digital & Pengurusan Pelanggan',
    en: 'Digital Presence & Customer Management'
  },
  'mini_services.category.professional': {
    ms: 'Perkhidmatan Profesional',
    en: 'Professional Services'
  },

  // Financial & Compliance Services
  'mini_services.einvoicing.title': {
    ms: 'Sistem E-Invois',
    en: 'E-Invoicing System'
  },
  'mini_services.einvoicing.description': {
    ms: 'Jana invois digital yang mematuhi MyInvois • Output PDF',
    en: 'Generate MyInvois compliant digital invoices • PDF output'
  },
  'mini_services.einvoicing.step1.title': {
    ms: 'Butiran Perniagaan',
    en: 'Business Details'
  },
  'mini_services.einvoicing.step2.title': {
    ms: 'Template Invois',
    en: 'Invoice Template'
  },

  'mini_services.digital_receipt.title': {
    ms: 'Penjana Resit Digital',
    en: 'Digital Receipt Generator'
  },
  'mini_services.digital_receipt.description': {
    ms: 'Cipta resit profesional dengan GST/SST • PDF & siap cetak',
    en: 'Create professional receipts with GST/SST • PDF & print ready'
  },
  'mini_services.digital_receipt.step1.title': {
    ms: 'Template Resit',
    en: 'Receipt Template'
  },

  'mini_services.tax_calculator.title': {
    ms: 'Kalkulator Cukai',
    en: 'Tax Calculator'
  },
  'mini_services.tax_calculator.description': {
    ms: 'Kira cukai peribadi dan perniagaan • Laporan ringkasan PDF',
    en: 'Calculate personal and business tax • PDF summary report'
  },
  'mini_services.tax_calculator.step1.title': {
    ms: 'Butiran Pendapatan',
    en: 'Income Details'
  },

  'mini_services.gst_helper.title': {
    ms: 'Pembantu GST/SST',
    en: 'GST/SST Helper'
  },
  'mini_services.gst_helper.description': {
    ms: 'Bantuan pengiraan dan pemfailan GST/SST • Peringatan auto',
    en: 'GST/SST calculation and filing assistance • Auto reminders'
  },
  'mini_services.gst_helper.step1.title': {
    ms: 'Tetapan Cukai',
    en: 'Tax Settings'
  },

  // Point of Sale & Operations Services
  'mini_services.mobile_pos.title': {
    ms: 'Aplikasi POS Mudah Alih',
    en: 'Mobile POS App'
  },
  'mini_services.mobile_pos.description': {
    ms: 'Tukar telefon anda jadi mesin kira-kira • Jejak jualan masa nyata',
    en: 'Turn your phone into a cash register • Real-time sales tracking'
  },
  'mini_services.mobile_pos.step1.title': {
    ms: 'Katalog Produk',
    en: 'Product Catalog'
  },
  'mini_services.mobile_pos.step2.title': {
    ms: 'Kaedah Pembayaran',
    en: 'Payment Methods'
  },

  'mini_services.inventory.title': {
    ms: 'Pengurusan Inventori',
    en: 'Inventory Management'
  },
  'mini_services.inventory.description': {
    ms: 'Jejak stok dan dapat amaran',
    en: 'Track stock levels and get alerts'
  },
  'mini_services.inventory.step1.title': {
    ms: 'Entri Stok',
    en: 'Stock Entry'
  },

  'mini_services.loyalty_program.title': {
    ms: 'Setup Program Kesetiaan',
    en: 'Loyalty Program Setup'
  },
  'mini_services.loyalty_program.description': {
    ms: 'Cipta kad setem digital dan ganjaran',
    en: 'Create digital stamp cards and rewards'
  },
  'mini_services.loyalty_program.step1.title': {
    ms: 'Struktur Ganjaran',
    en: 'Reward Structure'
  },

  'mini_services.delivery_service.title': {
    ms: 'Integrasi Perkhidmatan Penghantaran',
    en: 'Delivery Service Integration'
  },
  'mini_services.delivery_service.description': {
    ms: 'Sambung dengan rakan kongsi penghantaran',
    en: 'Connect with delivery partners'
  },
  'mini_services.delivery_service.step1.title': {
    ms: 'Rakan Kongsi Penghantaran',
    en: 'Delivery Partners'
  },

  // Digital Presence & Customer Management Services
  'mini_services.website_builder.title': {
    ms: 'Pembina Laman Web Mini',
    en: 'Mini Website Builder'
  },
  'mini_services.website_builder.description': {
    ms: 'Cipta laman web perniagaan mudah',
    en: 'Create a simple business website'
  },
  'mini_services.website_builder.step1.title': {
    ms: 'Pemilihan Template',
    en: 'Template Selection'
  },

  'mini_services.booking_system.title': {
    ms: 'Sistem Tempahan Dalam Talian',
    en: 'Online Booking System'
  },
  'mini_services.booking_system.description': {
    ms: 'Terima tempahan dan reservasi dalam talian',
    en: 'Accept online bookings and reservations'
  },
  'mini_services.booking_system.step1.title': {
    ms: 'Setup Perkhidmatan',
    en: 'Service Setup'
  },

  'mini_services.appointment_scheduler.title': {
    ms: 'Penjadual Temujanji',
    en: 'Appointment Scheduler'
  },
  'mini_services.appointment_scheduler.description': {
    ms: 'Urus temujanji dan jadual kakitangan',
    en: 'Manage appointments and staff schedules'
  },
  'mini_services.appointment_scheduler.step1.title': {
    ms: 'Ketersediaan Kakitangan',
    en: 'Staff Availability'
  },

  // Professional Services
  'mini_services.lhdn_filing.title': {
    ms: 'Pembantu e-Filing LHDN',
    en: 'LHDN e-Filing Assistant'
  },
  'mini_services.lhdn_filing.description': {
    ms: 'Panduan pemfailan cukai dengan LHDN',
    en: 'Guided tax filing with LHDN'
  },
  'mini_services.lhdn_filing.step1.title': {
    ms: 'Senarai Semak Dokumen',
    en: 'Document Checklist'
  },

  'mini_services.insurance_quotes.title': {
    ms: 'Sebut Harga Insurans Perniagaan',
    en: 'Business Insurance Quotes'
  },
  'mini_services.insurance_quotes.description': {
    ms: 'Bandingkan perlindungan insurans perniagaan',
    en: 'Compare business insurance coverage'
  },
  'mini_services.insurance_quotes.step1.title': {
    ms: 'Jenis Perniagaan',
    en: 'Business Type'
  },

  // Mini Services - Common Form Elements
  'mini_services.form.business_name': {
    ms: 'Nama Perniagaan',
    en: 'Business Name'
  },
  'mini_services.form.business_address': {
    ms: 'Alamat Perniagaan',
    en: 'Business Address'
  },
  'mini_services.form.ssm_registration': {
    ms: 'No. Pendaftaran SSM',
    en: 'SSM Registration No.'
  },
  'mini_services.form.tax_id': {
    ms: 'No. Pengenalan Cukai',
    en: 'Tax Identification No.'
  },
  'mini_services.form.annual_income': {
    ms: 'Pendapatan Tahunan (RM)',
    en: 'Annual Income (RM)'
  },
  'mini_services.form.product_name': {
    ms: 'Nama Produk',
    en: 'Product Name'
  },
  'mini_services.form.price': {
    ms: 'Harga',
    en: 'Price'
  },
  'mini_services.form.current_stock': {
    ms: 'Stok Semasa',
    en: 'Current Stock'
  },
  'mini_services.form.minimum_alert': {
    ms: 'Amaran Minimum',
    en: 'Minimum Alert'
  },
  'mini_services.form.item_name': {
    ms: 'Nama Item',
    en: 'Item Name'
  },
  'mini_services.form.service_name': {
    ms: 'Nama Perkhidmatan',
    en: 'Service Name'
  },
  'mini_services.form.duration_mins': {
    ms: 'Tempoh (minit)',
    en: 'Duration (mins)'
  },
  'mini_services.form.staff_name': {
    ms: 'Nama Kakitangan',
    en: 'Staff Name'
  },
  'mini_services.form.number_employees': {
    ms: 'Bilangan Pekerja',
    en: 'Number of Employees'
  },
  'mini_services.form.annual_revenue': {
    ms: 'Hasil Tahunan (RM)',
    en: 'Annual Revenue (RM)'
  },

  // Mini Services - Business Types
  'mini_services.business_type.restaurant': {
    ms: 'Restoran/F&B',
    en: 'Restaurant/F&B'
  },
  'mini_services.business_type.retail': {
    ms: 'Kedai Runcit',
    en: 'Retail Store'
  },
  'mini_services.business_type.service': {
    ms: 'Penyedia Perkhidmatan',
    en: 'Service Provider'
  },
  'mini_services.business_type.manufacturing': {
    ms: 'Pembuatan',
    en: 'Manufacturing'
  },
  'mini_services.business_type.individual': {
    ms: 'Individu',
    en: 'Individual'
  },
  'mini_services.business_type.married': {
    ms: 'Berkahwin',
    en: 'Married'
  },
  'mini_services.business_type.business': {
    ms: 'Perniagaan',
    en: 'Business'
  },

  // Mini Services - Tax Settings
  'mini_services.tax.gst_registered': {
    ms: 'Berdaftar GST',
    en: 'GST Registered'
  },
  'mini_services.tax.sst_registered': {
    ms: 'Berdaftar SST',
    en: 'SST Registered'
  },
  'mini_services.tax.not_registered': {
    ms: 'Tidak Berdaftar',
    en: 'Not Registered'
  },
  'mini_services.tax.include_gst': {
    ms: 'Termasuk GST (6%)',
    en: 'Include GST (6%)'
  },
  'mini_services.tax.include_sst': {
    ms: 'Termasuk SST',
    en: 'Include SST'
  },

  // Mini Services - Receipt Templates
  'mini_services.receipt.standard': {
    ms: 'Resit Standard',
    en: 'Standard Receipt'
  },
  'mini_services.receipt.detailed': {
    ms: 'Resit Terperinci',
    en: 'Detailed Receipt'
  },
  'mini_services.receipt.minimal': {
    ms: 'Resit Minimal',
    en: 'Minimal Receipt'
  },

  // Mini Services - Invoice Templates
  'mini_services.invoice.professional': {
    ms: 'Profesional',
    en: 'Professional'
  },
  'mini_services.invoice.simple': {
    ms: 'Mudah',
    en: 'Simple'
  },

  // Mini Services - Payment Methods
  'mini_services.payment.cash': {
    ms: 'Tunai',
    en: 'Cash'
  },
  'mini_services.payment.qr_pay': {
    ms: 'Bayar QR',
    en: 'QR Pay'
  },

  // Mini Services - Website Templates
  'mini_services.website.restaurant': {
    ms: 'Restoran',
    en: 'Restaurant'
  },
  'mini_services.website.retail': {
    ms: 'Runcit',
    en: 'Retail'
  },

  // Mini Services - Availability
  'mini_services.availability.9am_6pm': {
    ms: 'Tersedia 9 Pagi - 6 Petang',
    en: 'Available 9 AM - 6 PM'
  },
  'mini_services.availability.24_7': {
    ms: 'Tersedia 24/7',
    en: 'Available 24/7'
  },
  'mini_services.availability.custom': {
    ms: 'Waktu Khas',
    en: 'Custom hours'
  },

  // Mini Services - Days of Week
  'mini_services.days.mon': {
    ms: 'Isn',
    en: 'Mon'
  },
  'mini_services.days.tue': {
    ms: 'Sel',
    en: 'Tue'
  },
  'mini_services.days.wed': {
    ms: 'Rab',
    en: 'Wed'
  },
  'mini_services.days.thu': {
    ms: 'Kha',
    en: 'Thu'
  },
  'mini_services.days.fri': {
    ms: 'Jum',
    en: 'Fri'
  },
  'mini_services.days.sat': {
    ms: 'Sab',
    en: 'Sat'
  },
  'mini_services.days.sun': {
    ms: 'Ahd',
    en: 'Sun'
  },

  // Mini Services - Document Types
  'mini_services.documents.form_be': {
    ms: 'Borang BE (Individu)',
    en: 'Form BE (Individual)'
  },
  'mini_services.documents.ea_form': {
    ms: 'Borang EA (Pekerjaan)',
    en: 'EA Form (Employment)'
  },
  'mini_services.documents.bank_statements': {
    ms: 'Penyata Bank',
    en: 'Bank Statements'
  },
  'mini_services.documents.business_receipts': {
    ms: 'Resit Perniagaan',
    en: 'Business Receipts'
  },

  // Mini Services - Action Buttons
  'mini_services.action.start_filing': {
    ms: 'Mula Proses Pemfailan',
    en: 'Start Filing Process'
  },
  'mini_services.action.add_product': {
    ms: 'Tambah Produk',
    en: 'Add Product'
  },
  'mini_services.action.choose_file': {
    ms: 'Pilih Fail',
    en: 'Choose File'
  },

  // Mini Services - Status Messages
  'mini_services.status.estimated_tax': {
    ms: 'Anggaran Cukai: RM 0',
    en: 'Estimated Tax: RM 0'
  },
  'mini_services.status.next_filing': {
    ms: 'Pemfailan Seterusnya: 30 Apr 2024',
    en: 'Next Filing: 30 Apr 2024'
  },
  'mini_services.status.set_reminder': {
    ms: 'Tetapkan peringatan 7 hari sebelum',
    en: 'Set reminder 7 days before'
  },
  'mini_services.status.estimated_premium': {
    ms: 'Anggaran Premium: RM 200-500/bulan',
    en: 'Estimated Premium: RM 200-500/month'
  },
  'mini_services.status.preview_reward': {
    ms: 'Pratonton: Kumpul 10 setem = Kopi percuma',
    en: 'Preview: Collect 10 stamps = Free coffee'
  },

  // Mini Services - Delivery Partners
  'mini_services.delivery.grab': {
    ms: 'Grab',
    en: 'Grab'
  },
  'mini_services.delivery.foodpanda': {
    ms: 'Foodpanda',
    en: 'Foodpanda'
  },
  'mini_services.delivery.lalamove': {
    ms: 'Lalamove',
    en: 'Lalamove'
  },
  'mini_services.delivery.commission': {
    ms: 'komisi 5-15%',
    en: '5-15% commission'
  },

  // Mini Services - Sample Data
  'mini_services.sample.invoice_header': {
    ms: 'INVOIS #INV-2024-001\nTarikh: 15 Jan 2024\nKepada: ABC Sdn Bhd\nSSM: 123456-A\nID GST: 000123456789',
    en: 'INVOICE #INV-2024-001\nDate: 15 Jan 2024\nTo: ABC Sdn Bhd\nSSM: 123456-A\nGST ID: 000123456789'
  },
  'mini_services.sample.receipt': {
    ms: 'RESIT #R-2024-001\nKafe Sedap\nNasi Lemak x2    RM 10.00\nTeh Tarik x1     RM  3.50\nSubjumlah:       RM 13.50\nGST (6%):        RM  0.81\nJumlah:          RM 14.31',
    en: 'RECEIPT #R-2024-001\nCafe Delicious\nNasi Lemak x2    RM 10.00\nTeh Tarik x1     RM  3.50\nSubtotal:        RM 13.50\nGST (6%):        RM  0.81\nTotal:           RM 14.31'
  },
  'mini_services.sample.tax_calculation': {
    ms: 'Pendapatan Tahunan: RM 60,000\nPelepasan Peribadi: RM 9,000\nPendapatan Bercukai: RM 51,000\nCukai Perlu Bayar: RM 1,350\nKadar Berkesan: 2.25%',
    en: 'Annual Income: RM 60,000\nPersonal Relief: RM 9,000\nTaxable Income: RM 51,000\nTax Payable: RM 1,350\nEffective Rate: 2.25%'
  },
  'mini_services.sample.gst_return': {
    ms: 'Penyata GST-03\nTempoh: Jan-Mac 2024\nCukai Output: RM 1,200\nCukai Input: RM 800\nGST Bersih: RM 400\nTarikh Akhir: 30 Apr 2024',
    en: 'GST-03 Return\nPeriod: Jan-Mar 2024\nOutput Tax: RM 1,200\nInput Tax: RM 800\nNet GST: RM 400\nDue Date: 30 Apr 2024'
  },
  'mini_services.sample.pos_interface': {
    ms: 'Produk: Nasi Lemak\nHarga: RM 5.00\nKuantiti: 2\nSubjumlah: RM 10.00\nBayaran: Tunai/QR',
    en: 'Product: Nasi Lemak\nPrice: RM 5.00\nQty: 2\nSubtotal: RM 10.00\nPayment: Cash/QR'
  },

  // Mini Services - Features Lists
  'mini_services.features.myinvois_compliance': {
    ms: '✓ Format diluluskan LHDN\n✓ Tandatangan digital\n✓ Pengesahan kod QR\n✓ Pengiraan GST auto',
    en: '✓ LHDN approved format\n✓ Digital signature\n✓ QR code verification\n✓ Auto GST calculation'
  },
  'mini_services.features.receipt_features': {
    ms: '✓ Pengiraan GST/SST auto\n✓ Template profesional\n✓ Penjanaan PDF segera\n✓ Penghantaran emel',
    en: '✓ Auto GST/SST calculation\n✓ Professional templates\n✓ Instant PDF generation\n✓ Email delivery'
  },
  'mini_services.features.tax_calculation': {
    ms: '✓ Cukai peribadi & perniagaan\n✓ Pengoptimuman pelepasan\n✓ Anggaran bulanan\n✓ Peringatan pemfailan',
    en: '✓ Personal & business tax\n✓ Relief optimization\n✓ Monthly estimates\n✓ Filing reminders'
  },
  'mini_services.features.gst_helper': {
    ms: '✓ Pengiraan auto\n✓ Peringatan pemfailan\n✓ Pra-isi borang\n✓ Jejak tarikh akhir',
    en: '✓ Auto calculations\n✓ Filing reminders\n✓ Form pre-filling\n✓ Deadline tracking'
  },

  // Mini Services - Output Types
  'mini_services.output.pdf_invoice': {
    ms: 'Invois PDF',
    en: 'PDF Invoice'
  },
  'mini_services.output.email_delivery': {
    ms: 'Penghantaran Emel',
    en: 'Email Delivery'
  },
  'mini_services.output.pdf_receipt': {
    ms: 'Resit PDF',
    en: 'PDF Receipt'
  },
  'mini_services.output.print_format': {
    ms: 'Format Cetak',
    en: 'Print Format'
  },
  'mini_services.output.email_copy': {
    ms: 'Salinan Emel',
    en: 'Email Copy'
  },
  'mini_services.output.tax_summary_pdf': {
    ms: 'Ringkasan Cukai PDF',
    en: 'Tax Summary PDF'
  },
  'mini_services.output.calculation_breakdown': {
    ms: 'Pecahan Pengiraan',
    en: 'Calculation Breakdown'
  },
  'mini_services.output.filing_checklist': {
    ms: 'Senarai Semak Pemfailan',
    en: 'Filing Checklist'
  },
  'mini_services.output.filing_forms': {
    ms: 'Borang Pemfailan',
    en: 'Filing Forms'
  },
  'mini_services.output.calculation_sheet': {
    ms: 'Lembaran Pengiraan',
    en: 'Calculation Sheet'
  },
  'mini_services.output.email_reminders': {
    ms: 'Peringatan Emel',
    en: 'Email Reminders'
  },
  'mini_services.output.sales_reports': {
    ms: 'Laporan Jualan',
    en: 'Sales Reports'
  },
  'mini_services.output.receipt_prints': {
    ms: 'Cetakan Resit',
    en: 'Receipt Prints'
  },
  'mini_services.output.daily_summary': {
    ms: 'Ringkasan Harian',
    en: 'Daily Summary'
  },
  'mini_services.output.stock_reports': {
    ms: 'Laporan Stok',
    en: 'Stock Reports'
  },
  'mini_services.output.alert_notifications': {
    ms: 'Notifikasi Amaran',
    en: 'Alert Notifications'
  },
  'mini_services.output.digital_cards': {
    ms: 'Kad Digital',
    en: 'Digital Cards'
  },
  'mini_services.output.customer_database': {
    ms: 'Pangkalan Data Pelanggan',
    en: 'Customer Database'
  },
  'mini_services.output.integration_setup': {
    ms: 'Setup Integrasi',
    en: 'Integration Setup'
  },
  'mini_services.output.tracking_links': {
    ms: 'Pautan Jejak',
    en: 'Tracking Links'
  },
  'mini_services.output.website_url': {
    ms: 'URL Laman Web',
    en: 'Website URL'
  },
  'mini_services.output.mobile_responsive': {
    ms: 'Responsif Mudah Alih',
    en: 'Mobile Responsive'
  },
  'mini_services.output.booking_confirmations': {
    ms: 'Pengesahan Tempahan',
    en: 'Booking Confirmations'
  },
  'mini_services.output.calendar_sync': {
    ms: 'Segerak Kalendar',
    en: 'Calendar Sync'
  },
  'mini_services.output.schedule_reports': {
    ms: 'Laporan Jadual',
    en: 'Schedule Reports'
  },
  'mini_services.output.staff_calendars': {
    ms: 'Kalendar Kakitangan',
    en: 'Staff Calendars'
  },
  'mini_services.output.filed_returns': {
    ms: 'Penyata Difailkan',
    en: 'Filed Returns'
  },
  'mini_services.output.confirmation_receipt': {
    ms: 'Resit Pengesahan',
    en: 'Confirmation Receipt'
  },
  'mini_services.output.quote_comparisons': {
    ms: 'Perbandingan Sebut Harga',
    en: 'Quote Comparisons'
  },
  'mini_services.output.policy_documents': {
    ms: 'Dokumen Polisi',
    en: 'Policy Documents'
  },

  // Mini Services - Preview Labels
  'mini_services.preview.sample_invoice_header': {
    ms: 'Contoh Pengepala Invois',
    en: 'Sample Invoice Header'
  },
  'mini_services.preview.myinvois_compliance': {
    ms: 'Pematuhan MyInvois',
    en: 'MyInvois Compliance'
  },
  'mini_services.preview.export_formats': {
    ms: 'Format Eksport',
    en: 'Export Formats'
  },
  'mini_services.preview.sample_receipt': {
    ms: 'Contoh Resit',
    en: 'Sample Receipt'
  },
  'mini_services.preview.features': {
    ms: 'Ciri-ciri',
    en: 'Features'
  },
  'mini_services.preview.tax_calculation_sample': {
    ms: 'Contoh Pengiraan Cukai',
    en: 'Tax Calculation Sample'
  },
  'mini_services.preview.calculation_features': {
    ms: 'Ciri Pengiraan',
    en: 'Calculation Features'
  },
  'mini_services.preview.gst_return_sample': {
    ms: 'Contoh Penyata GST',
    en: 'GST Return Sample'
  },
  'mini_services.preview.helper_features': {
    ms: 'Ciri Pembantu',
    en: 'Helper Features'
  },
  'mini_services.preview.pos_interface': {
    ms: 'Antara Muka POS',
    en: 'POS Interface'
  },

  // Mini Services - Placeholders
  'mini_services.placeholder.business_name': {
    ms: 'Contoh: Warung Mak Kiah',
    en: 'Example: Mak Kiah\'s Stall'
  },
  'mini_services.placeholder.about_us': {
    ms: 'Tentang Kami',
    en: 'About Us'
  },
  'mini_services.placeholder.stamps_needed': {
    ms: 'Setem diperlukan',
    en: 'Stamps needed'
  },
  'mini_services.placeholder.reward': {
    ms: 'Ganjaran',
    en: 'Reward'
  },

  // Mini Services - File Names
  'mini_services.file.invoice_001': {
    ms: 'invois_001.pdf',
    en: 'invoice_001.pdf'
  },

  // Mini Services - Preview Text
  'mini_services.preview_text.invoice_template': {
    ms: 'Pratonton: Template invois akan muncul di sini',
    en: 'Preview: Invoice template will appear here'
  },
  'mini_services.preview_text.website': {
    ms: 'Pratonton laman web',
    en: 'Website preview'
  },
  'mini_services.preview_text.booking_system': {
    ms: 'Pratonton sistem tempahan',
    en: 'Booking system preview'
  },
  'mini_services.preview_text.appointment_scheduler': {
    ms: 'Pratonton penjadual temujanji',
    en: 'Appointment scheduler preview'
  },
  'mini_services.preview_text.lhdn_filing': {
    ms: 'Pratonton pemfailan LHDN',
    en: 'LHDN filing preview'
  },
  'mini_services.preview_text.insurance_quotes': {
    ms: 'Pratonton sebut harga insurans',
    en: 'Insurance quotes preview'
  },
  'mini_services.preview_text.inventory': {
    ms: 'Pratonton jejak stok',
    en: 'Stock tracking preview'
  },
  'mini_services.preview_text.loyalty_program': {
    ms: 'Pratonton program kesetiaan',
    en: 'Loyalty program preview'
  },
  'mini_services.preview_text.delivery_integration': {
    ms: 'Pratonton integrasi penghantaran',
    en: 'Delivery integration preview'
  },

  // Online Business Page
  'online_business.title': {
    ms: 'Perniagaan Dalam Talian BizzKu',
    en: 'Online BizzKu'
  },
  'online_business.subtitle': {
    ms: 'Sambung dan urus semua platform perniagaan dalam talian anda di satu tempat',
    en: 'Connect and manage all your online business platforms in one place'
  },

  // Business Overview Section
  'online_business.overview.title': {
    ms: '📊 Gambaran Keseluruhan Perniagaan',
    en: '📊 Business Overview'
  },
  'online_business.overview.total_revenue': {
    ms: 'Jumlah Hasil',
    en: 'Total Revenue'
  },
  'online_business.overview.total_orders': {
    ms: 'Jumlah Pesanan',
    en: 'Total Orders'
  },
  'online_business.overview.active_platforms': {
    ms: 'Platform Aktif',
    en: 'Active Platforms'
  },
  'online_business.overview.total_customers': {
    ms: 'Jumlah Pelanggan',
    en: 'Total Customers'
  },
  'online_business.overview.from_all_platforms': {
    ms: 'Dari semua platform yang disambung',
    en: 'From all connected platforms'
  },
  'online_business.overview.across_all_platforms': {
    ms: 'Merentas semua platform',
    en: 'Across all platforms'
  },
  'online_business.overview.pending_connection': {
    ms: 'sambungan tertunda',
    en: 'pending connection'
  },
  'online_business.overview.unique_customers': {
    ms: 'Pelanggan unik yang dicapai',
    en: 'Unique customers reached'
  },

  // Time Range Labels
  'online_business.time.today': {
    ms: 'Hari Ini',
    en: 'Today'
  },
  'online_business.time.last7days': {
    ms: '7 Hari Lepas',
    en: 'Last 7 Days'
  },
  'online_business.time.last1month': {
    ms: 'Bulan Lepas',
    en: 'Last Month'
  },
  'online_business.time.alltime': {
    ms: 'Sepanjang Masa',
    en: 'All Time'
  },

  // Connected Accounts Section
  'online_business.connected.title': {
    ms: '🔗 Akaun Yang Disambung',
    en: '🔗 Your Connected Accounts'
  },
  'online_business.connected.revenue': {
    ms: 'Hasil',
    en: 'Revenue'
  },
  'online_business.connected.orders': {
    ms: 'Pesanan',
    en: 'Orders'
  },
  'online_business.connected.customers': {
    ms: 'Pelanggan',
    en: 'Customers'
  },
  'online_business.connected.view_analysis': {
    ms: 'Lihat Analisis Terperinci',
    en: 'View Detailed Analysis'
  },

  // Account Status
  'online_business.status.verification_progress': {
    ms: 'Pengesahan akaun sedang dijalankan',
    en: 'Account verification in progress'
  },
  'online_business.status.platform_approval': {
    ms: 'Proses Kelulusan Platform',
    en: 'Platform Approval Process'
  },
  'online_business.status.account_review': {
    ms: 'Butiran akaun sedang disemak',
    en: 'Account details under review'
  },
  'online_business.status.business_verification': {
    ms: 'Pengesahan perniagaan tertunda',
    en: 'Business verification pending'
  },
  'online_business.status.compliance_check': {
    ms: 'Pemeriksaan pematuhan sedang dijalankan',
    en: 'Compliance check in progress'
  },
  'online_business.status.current_status': {
    ms: 'Status Semasa:',
    en: 'Current Status:'
  },
  'online_business.status.pending': {
    ms: 'Tertunda',
    en: 'Pending'
  },
  'online_business.status.complete': {
    ms: 'selesai',
    en: 'complete'
  },
  'online_business.status.started': {
    ms: 'Dimulakan:',
    en: 'Started:'
  },
  'online_business.status.estimated_completion': {
    ms: 'Anggaran Selesai:',
    en: 'Est. Completion:'
  },

  // Available Platforms Section
  'online_business.platforms.title': {
    ms: '🛍️ Platform Yang Tersedia',
    en: '🛍️ Available Platforms'
  },
  'online_business.platforms.subtitle': {
    ms: 'Pilih platform yang paling sesuai untuk perniagaan anda',
    en: 'Choose the platforms that work best for your business'
  },
  'online_business.platforms.all': {
    ms: 'Semua Platform',
    en: 'All Platforms'
  },

  // Platform Categories
  'online_business.category.ecommerce': {
    ms: 'Pasaran E-dagang',
    en: 'E-commerce Marketplace'
  },
  'online_business.category.ecommercemarketplace': {
    ms: 'Pasaran E-dagang',
    en: 'E-commerce Marketplace'
  },
  'online_business.category.social': {
    ms: 'Perdagangan Sosial',
    en: 'Social Commerce'
  },
  'online_business.category.socialcommerce': {
    ms: 'Perdagangan Sosial',
    en: 'Social Commerce'
  },
  'online_business.category.food': {
    ms: 'Penghantaran Makanan',
    en: 'Food Delivery'
  },
  'online_business.category.fooddelivery': {
    ms: 'Penghantaran Makanan',
    en: 'Food Delivery'
  },

  // Platform Actions
  'online_business.action.connect_now': {
    ms: 'Sambung Sekarang',
    en: 'Connect Now'
  },
  'online_business.action.view_analytics': {
    ms: 'Lihat Analitik',
    en: 'View Analytics'
  },
  'online_business.action.pending': {
    ms: 'Tertunda',
    en: 'Pending'
  },

  // Platform Features
  'online_business.features.key_features': {
    ms: 'Ciri Utama:',
    en: 'Key Features:'
  },
  'online_business.features.more': {
    ms: 'lagi',
    en: 'more'
  },

  // Connection Modal
  'online_business.modal.registering': {
    ms: 'Mendaftarkan Permohonan Anda',
    en: 'Registering Your Application'
  },
  'online_business.modal.verification_complete': {
    ms: 'Pengesahan Akaun Selesai',
    en: 'Account Verification Complete'
  },
  'online_business.modal.setting_up': {
    ms: 'Kami sedang menyediakan pendaftaran akaun {platform} anda. Ini mungkin mengambil sedikit masa...',
    en: 'We\'re setting up your {platform} account registration. This may take a moment...'
  },
  'online_business.modal.verification_done': {
    ms: 'Pengesahan akaun {platform} anda telah selesai. Kami kini menunggu kelulusan platform.',
    en: 'Your {platform} account verification is complete. We\'re now awaiting platform approval.'
  },
  'online_business.modal.whats_happening': {
    ms: 'Apa yang sedang berlaku:',
    en: 'What\'s happening:'
  },
  'online_business.modal.status_update': {
    ms: 'Kemas kini status:',
    en: 'Status update:'
  },
  'online_business.modal.creating_application': {
    ms: 'Mencipta permohonan anda',
    en: 'Creating your application'
  },
  'online_business.modal.preparing_documents': {
    ms: 'Menyediakan dokumen yang diperlukan',
    en: 'Preparing required documents'
  },
  'online_business.modal.setting_profile': {
    ms: 'Menyediakan profil akaun anda',
    en: 'Setting up your account profile'
  },
  'online_business.modal.verification_complete_check': {
    ms: 'Pengesahan akaun selesai ✅',
    en: 'Account verification complete ✅'
  },
  'online_business.modal.awaiting_approval': {
    ms: 'Menunggu kelulusan platform (1-2 hari bekerja) ⏳',
    en: 'Awaiting platform approval (1-2 business days) ⏳'
  },
  'online_business.modal.notification_when_approved': {
    ms: 'Anda akan menerima notifikasi apabila diluluskan 🔔',
    en: 'You\'ll receive a notification when approved 🔔'
  },
  'online_business.modal.close': {
    ms: 'Tutup',
    en: 'Close'
  },

  // Help Resources Section
  'online_business.help.title': {
    ms: '🤝 Kami Di Sini Untuk Membantu Anda Berjaya!',
    en: '🤝 We\'re Here to Help You Succeed!'
  },
  'online_business.help.subtitle': {
    ms: 'Jangan risau jika teknologi terasa menakutkan. Kami memudahkannya untuk semua orang.',
    en: 'Don\'t worry if technology feels overwhelming. We make it simple for everyone.'
  },

  // Help Resources Items
  'online_business.help.video_tutorials.title': {
    ms: 'Tutorial Video (Bahasa Malaysia)',
    en: 'Video Tutorials (Bahasa Malaysia)'
  },
  'online_business.help.video_tutorials.description': {
    ms: 'Panduan video langkah demi langkah dalam bahasa pilihan anda',
    en: 'Step-by-step video guides in your preferred language'
  },
  'online_business.help.video_tutorials.action': {
    ms: 'Tonton Sekarang',
    en: 'Watch Now'
  },

  'online_business.help.whatsapp_support.title': {
    ms: 'Sokongan WhatsApp',
    en: 'WhatsApp Support'
  },
  'online_business.help.whatsapp_support.description': {
    ms: 'Dapatkan bantuan segera melalui WhatsApp dari pasukan mesra kami',
    en: 'Get instant help via WhatsApp from our friendly team'
  },
  'online_business.help.whatsapp_support.action': {
    ms: 'Chat Sekarang',
    en: 'Chat Now'
  },

  'online_business.help.phone_support.title': {
    ms: 'Sokongan Telefon',
    en: 'Phone Support'
  },
  'online_business.help.phone_support.description': {
    ms: 'Bercakap terus dengan pasukan sokongan kami dalam bahasa anda',
    en: 'Speak directly with our support team in your language'
  },
  'online_business.help.phone_support.action': {
    ms: 'Panggil Sekarang',
    en: 'Call Now'
  },

  // Quick Start Guides Section
  'online_business.guides.title': {
    ms: '📚 Panduan Permulaan Pantas',
    en: '📚 Quick Start Guides'
  },
  'online_business.guides.subtitle': {
    ms: 'Panduan mudah untuk membantu anda memulakan perniagaan dalam talian',
    en: 'Simple guides to help you get started with your online business'
  },

  // Quick Start Guide Items
  'online_business.guides.photography.title': {
    ms: 'Fotografi Produk Dipermudahkan',
    en: 'Product Photography Made Simple'
  },
  'online_business.guides.photography.description': {
    ms: 'Ambil gambar yang hebat hanya dengan telefon anda',
    en: 'Take great photos with just your phone'
  },
  'online_business.guides.photography.difficulty': {
    ms: 'Pemula',
    en: 'Beginner'
  },
  'online_business.guides.photography.time': {
    ms: '5 min bacaan',
    en: '5 min read'
  },

  'online_business.guides.pricing.title': {
    ms: 'Cara Menetapkan Harga Produk Anda',
    en: 'How to Price Your Products'
  },
  'online_business.guides.pricing.description': {
    ms: 'Formula mudah untuk menetapkan harga yang menguntungkan',
    en: 'Simple formulas to set profitable prices'
  },
  'online_business.guides.pricing.difficulty': {
    ms: 'Pemula',
    en: 'Beginner'
  },
  'online_business.guides.pricing.time': {
    ms: '3 min bacaan',
    en: '3 min read'
  },

  'online_business.guides.shipping.title': {
    ms: 'Panduan Penghantaran & Penyampaian',
    en: 'Shipping & Delivery Guide'
  },
  'online_business.guides.shipping.description': {
    ms: 'Semua yang perlu anda tahu tentang menghantar produk',
    en: 'Everything you need to know about sending products'
  },
  'online_business.guides.shipping.difficulty': {
    ms: 'Pemula',
    en: 'Beginner'
  },
  'online_business.guides.shipping.time': {
    ms: '4 min bacaan',
    en: '4 min read'
  },

  'online_business.guides.read': {
    ms: 'Baca',
    en: 'Read'
  },

  // Platform Descriptions
  'online_business.platform.shopee.description': {
    ms: 'Platform e-dagang terkemuka di Asia Tenggara dengan berjuta-juta pembeli aktif',
    en: 'Southeast Asia\'s leading e-commerce platform with millions of active buyers'
  },
  'online_business.platform.lazada.description': {
    ms: 'Platform e-dagang perintis di Asia Tenggara dengan rangkaian logistik yang luas',
    en: 'Pioneer e-commerce platform in Southeast Asia with extensive logistics network'
  },
  'online_business.platform.tiktok.description': {
    ms: 'Platform perdagangan sosial yang disepadukan dengan pangkalan pengguna besar TikTok',
    en: 'Social commerce platform integrated with TikTok\'s massive user base'
  },
  'online_business.platform.facebook.description': {
    ms: 'Capai pelanggan melalui ciri membeli-belah Facebook dan Instagram',
    en: 'Reach customers through Facebook and Instagram shopping features'
  },
  'online_business.platform.grab.description': {
    ms: 'Platform penghantaran makanan yang menghubungkan restoran dengan pelanggan yang lapar',
    en: 'Food delivery platform connecting restaurants with hungry customers'
  },
  'online_business.platform.foodpanda.description': {
    ms: 'Perkhidmatan penghantaran makanan terkemuka dengan rangkaian restoran yang luas',
    en: 'Leading food delivery service with extensive restaurant network'
  },

  // Platform Features
  'online_business.feature.product_sync': {
    ms: 'Segerak Produk',
    en: 'Product Sync'
  },
  'online_business.feature.order_management': {
    ms: 'Pengurusan Pesanan',
    en: 'Order Management'
  },
  'online_business.feature.inventory_tracking': {
    ms: 'Jejak Inventori',
    en: 'Inventory Tracking'
  },
  'online_business.feature.analytics': {
    ms: 'Analitik',
    en: 'Analytics'
  },
  'online_business.feature.product_catalog': {
    ms: 'Katalog Produk',
    en: 'Product Catalog'
  },
  'online_business.feature.order_processing': {
    ms: 'Pemprosesan Pesanan',
    en: 'Order Processing'
  },
  'online_business.feature.payment_integration': {
    ms: 'Integrasi Pembayaran',
    en: 'Payment Integration'
  },
  'online_business.feature.shipping': {
    ms: 'Penghantaran',
    en: 'Shipping'
  },
  'online_business.feature.live_selling': {
    ms: 'Jualan Langsung',
    en: 'Live Selling'
  },
  'online_business.feature.video_commerce': {
    ms: 'Perdagangan Video',
    en: 'Video Commerce'
  },
  'online_business.feature.influencer_partnerships': {
    ms: 'Perkongsian Influencer',
    en: 'Influencer Partnerships'
  },
  'online_business.feature.social_analytics': {
    ms: 'Analitik Sosial',
    en: 'Social Analytics'
  },
  'online_business.feature.instagram_integration': {
    ms: 'Integrasi Instagram',
    en: 'Instagram Integration'
  },
  'online_business.feature.facebook_ads': {
    ms: 'Iklan Facebook',
    en: 'Facebook Ads'
  },
  'online_business.feature.messenger_commerce': {
    ms: 'Perdagangan Messenger',
    en: 'Messenger Commerce'
  },
  'online_business.feature.catalog_sync': {
    ms: 'Segerak Katalog',
    en: 'Catalog Sync'
  },
  'online_business.feature.menu_management': {
    ms: 'Pengurusan Menu',
    en: 'Menu Management'
  },
  'online_business.feature.order_tracking': {
    ms: 'Jejak Pesanan',
    en: 'Order Tracking'
  },
  'online_business.feature.delivery_analytics': {
    ms: 'Analitik Penghantaran',
    en: 'Delivery Analytics'
  },
  'online_business.feature.customer_reviews': {
    ms: 'Ulasan Pelanggan',
    en: 'Customer Reviews'
  },
  'online_business.feature.restaurant_dashboard': {
    ms: 'Papan Pemuka Restoran',
    en: 'Restaurant Dashboard'
  },
  'online_business.feature.realtime_orders': {
    ms: 'Pesanan Masa Nyata',
    en: 'Real-time Orders'
  },
  'online_business.feature.real_time_orders': {
    ms: 'Pesanan Masa Nyata',
    en: 'Real-time Orders'
  },
  'online_business.feature.performance_metrics': {
    ms: 'Metrik Prestasi',
    en: 'Performance Metrics'
  },
  'online_business.feature.promotion_tools': {
    ms: 'Alat Promosi',
    en: 'Promotion Tools'
  },

  // Setup Time and Difficulty
  'online_business.difficulty.easy': {
    ms: 'Mudah',
    en: 'Easy'
  },
  'online_business.difficulty.medium': {
    ms: 'Sederhana',
    en: 'Medium'
  },
  'online_business.difficulty.advanced': {
    ms: 'Lanjutan',
    en: 'Advanced'
  },
  'online_business.setup_time.1_2_days': {
    ms: '1-2 hari',
    en: '1-2 days'
  },
  'online_business.setup_time.2_5_days': {
    ms: '2-5 hari',
    en: '2-5 days'
  },
  'online_business.setup_time.1_3_days': {
    ms: '1-3 hari',
    en: '1-3 days'
  },

  // Verification Section
  'online_business.verification.in_progress': {
    ms: 'Pengesahan akaun sedang dijalankan',
    en: 'Account verification in progress'
  },
  'online_business.verification.approval_process': {
    ms: 'Proses Kelulusan Platform',
    en: 'Platform Approval Process'
  },
  'online_business.verification.account_review': {
    ms: 'Butiran akaun sedang dikaji semula',
    en: 'Account details under review'
  },
  'online_business.verification.business_pending': {
    ms: 'Pengesahan perniagaan belum selesai',
    en: 'Business verification pending'
  },
  'online_business.verification.compliance_check': {
    ms: 'Pemeriksaan pematuhan sedang dijalankan',
    en: 'Compliance check in progress'
  },
  'online_business.verification.current_status': {
    ms: 'Status Semasa',
    en: 'Current Status'
  },
  'online_business.verification.pending': {
    ms: 'Belum Selesai',
    en: 'Pending'
  },
  'online_business.verification.progress': {
    ms: 'Kemajuan',
    en: 'Progress'
  },
  'online_business.verification.percent_complete': {
    ms: '40% selesai',
    en: '40% complete'
  },
  'online_business.verification.started': {
    ms: 'Dimulakan',
    en: 'Started'
  },
  'online_business.verification.est_completion': {
    ms: 'Anggaran Siap',
    en: 'Est. Completion'
  },

  // Online Business Store Names
  'online_business.store.official_store': {
    ms: 'Kedai Rasmi BizzKu',
    en: 'BizzKu Official Store'
  },
  'online_business.store.marketplace': {
    ms: 'Pasar Raya BizzKu',
    en: 'BizzKu Marketplace'
  },

  // Platform Status
  'online_business.status.connected': {
    ms: 'Disambung',
    en: 'Connected'
  },
  'online_business.status.in_progress': {
    ms: 'Sedang Diproses',
    en: 'In Progress'
  },
  'online_business.status.error': {
    ms: 'Ralat',
    en: 'Error'
  },
  'online_business.status.available': {
    ms: 'Tersedia',
    en: 'Available'
  },
  'online_business.status.active': {
    ms: 'Aktif',
    en: 'Active'
  },
  'online_business.status.pending_verification': {
    ms: 'Menunggu Pengesahan',
    en: 'Pending Verification'
  },

  // Avatar Onboarding
  'avatar_onboarding.title': {
    ms: 'Pembantu Orientasi MSME',
    en: 'MSME Onboarding Assistant'
  },
  'avatar_onboarding.skip_onboarding': {
    ms: 'Langkau Orientasi',
    en: 'Skip Onboarding'
  },
  'avatar_onboarding.welcome_message': {
    ms: 'Hai! Saya **pembantu orientasi MSME peribadi** anda.\n\nDimana anda dalam perjalanan perniagaan anda?',
    en: 'Hi there! I\'m your **personal MSME onboarding assistant**.\n\nWhere are you in your business journey?'
  },
  'avatar_onboarding.journey_question': {
    ms: '**Dimana anda dalam perjalanan perniagaan anda?**',
    en: '**Where are you in your business journey?**'
  },
  'avatar_onboarding.journey.just_starting': {
    ms: 'Saya baru bermula (belum daftar lagi)',
    en: 'I\'m just starting (no registration yet)'
  },
  'avatar_onboarding.journey.have_ssm': {
    ms: 'Saya sudah ada nombor SSM',
    en: 'I already have an SSM number'
  },
  'avatar_onboarding.journey.operating_offline': {
    ms: 'Saya sudah beroperasi tetapi tidak dalam talian',
    en: 'I\'m already operating but not online'
  },
  'avatar_onboarding.journey.fully_digital': {
    ms: 'Saya sudah digital sepenuhnya dan mahu berkembang lagi',
    en: 'I\'m fully digital and want to grow more'
  },
  'avatar_onboarding.first_step_message': {
    ms: '**Bagus! Anda mengambil langkah pertama.**\n\nSila muat naik **MyKad** anda untuk pendaftaran.',
    en: '**Great! You\'re taking your first step.**\n\nPlease upload your **MyKad** for registration.'
  },
  'avatar_onboarding.form_message': {
    ms: '**MyKad berjaya dimuat naik!**\n\n**Sila lengkapkan maklumat peribadi dan perniagaan anda:**',
    en: '**MyKad uploaded successfully!**\n\n**Please complete your personal and business information:**'
  },
  'avatar_onboarding.checklist.initial': {
    ms: 'Hebat! Sekarang, biar saya bimbing anda melalui setiap langkah untuk menyediakan perniagaan anda sepenuhnya.\n\n**Berikut ialah senarai semak orientasi anda:**',
    en: 'Awesome! Now, let me guide you through each step to get your business fully set up.\n\n**Here\'s your onboarding checklist:**'
  },
  'avatar_onboarding.checklist.proceed': {
    ms: 'Mari kita teruskan dengan senarai semak orientasi:',
    en: 'Let us proceed with the onboarding checklist:'
  },

  // SSM Application
  'avatar_onboarding.ssm.start_application': {
    ms: 'Mula Permohonan SSM',
    en: 'Start SSM Application'
  },
  'avatar_onboarding.ssm.confirm_message': {
    ms: 'Sebelum kita teruskan, mari sahkan:\n\n**Adakah anda bersedia untuk memohon pendaftaran SSM?**\n\n\n\nIni akan membolehkan anda:\n\n• Mengendalikan perniagaan anda secara sah\n\n• Membuka akaun bank perniagaan\n\n• Memohon pinjaman dan geran',
    en: 'Before we proceed, let\'s confirm:\n\n**Are you ready to apply for SSM registration?**\n\n\n\nThis will allow you to:\n\n• Legally operate your business\n\n• Open a business bank account\n\n• Apply for loans and grants'
  },
  'avatar_onboarding.ssm.confirm': {
    ms: '✔️ Sahkan',
    en: '✔️ Confirm'
  },
  'avatar_onboarding.ssm.cancel': {
    ms: '❌ Batal',
    en: '❌ Cancel'
  },
  'avatar_onboarding.ssm.confirmed': {
    ms: '✔️ Disahkan',
    en: '✔️ Confirmed'
  },
  'avatar_onboarding.ssm.progress_message': {
    ms: '**Pendaftaran SSM Sedang Diproses**\n\nKami sedang menghantar permohonan anda sekarang. Anda akan menerima kemas kini tentang status.',
    en: '**SSM Registration in Progress**\n\nWe\'re submitting your application now. You\'ll receive updates on the status.'
  },
  'avatar_onboarding.ssm.submitted_message': {
    ms: '**Permohonan Dihantar!**\n\nAnda akan mendapat **Nombor Pendaftaran Perniagaan** anda selepas kelulusan (dalam 2–3 hari).\n\nKami akan memberitahu anda sebaik sahaja selesai.',
    en: '**Application Submitted!**\n\nYou will get your **Business Registration Number** after approval (within 2–3 days).\n\nWe\'ll notify you once it\'s done.'
  },
  'avatar_onboarding.ssm.canceled': {
    ms: 'Permohonan Dibatalkan',
    en: 'Application Canceled'
  },
  'avatar_onboarding.ssm.cancel_message': {
    ms: 'Tidak mengapa! Beritahu saya jika anda ingin memohon kemudian.',
    en: 'No worries! Let me know if you\'d like to apply later.'
  },

  // Bank Account Setup
  'avatar_onboarding.bank.open_account': {
    ms: 'Buka akaun bank perniagaan',
    en: 'Open business bank account'
  },
  'avatar_onboarding.bank.setup_message': {
    ms: '**Mari sediakan akaun bank perniagaan anda!** 🏦\n\nPilih bank pilihan anda untuk akaun perniagaan anda:',
    en: '**Let\'s set up your business bank account!** 🏦\n\nChoose your preferred bank for your business account:'
  },
  'avatar_onboarding.bank.choice_message': {
    ms: '**Pilihan yang bagus!** {bank} adalah bank yang boleh dipercayai untuk akaun perniagaan.\n\nKami akan membantu anda menyediakan akaun perniagaan anda dengan {bank}.\n\nAnda akan menerima butiran akaun dalam 1-2 hari bekerja.',
    en: '**Great choice!** {bank} is a reliable bank for business accounts.\n\nWe\'ll help you set up your business account with {bank}.\n\nYou\'ll receive account details within 1-2 business days.'
  },
  'avatar_onboarding.bank.setup_complete': {
    ms: '**Persediaan Akaun Bank Selesai!**\n\nPermohonan akaun bank perniagaan anda telah berjaya dihantar.',
    en: '**Bank Account Setup Complete!**\n\nYour business bank account application has been submitted successfully.'
  },

  // Payment Setup
  'avatar_onboarding.payment.setup_digital': {
    ms: 'Sediakan pembayaran digital',
    en: 'Set up digital payment'
  },
  'avatar_onboarding.payment.activate_message': {
    ms: '**Mari aktifkan saluran pembayaran anda!**\n\nPilih satu atau lebih kaedah pembayaran untuk menerima pembayaran pelanggan:',
    en: '**Let\'s activate your payment channels!**\n\nChoose one or more payment methods to accept customer payments:'
  },
  'avatar_onboarding.payment.consent_message': {
    ms: '**Persetujuan Diperlukan**\n\nKami memerlukan persetujuan anda untuk berkongsi butiran SSM anda dengan **{bank}** untuk persediaan QR pedagang.\n\nIni akan membolehkan anda menerima pembayaran QR daripada pelanggan.',
    en: '**Consent Required**\n\nWe need your consent to share your SSM details with **{bank}** for merchant QR setup.\n\nThis will enable you to accept QR payments from customers.'
  },
  'avatar_onboarding.payment.setup_complete': {
    ms: '**Persediaan Selesai!**\n\n**DuitNow QR anda sedang diproses** dan akan siap dalam **3–5 hari**.\n\nAnda akan menerima pemberitahuan apabila ia diaktifkan.',
    en: '**Setup Complete!**\n\nYour **DuitNow QR is processing** and will be ready in **3–5 days**.\n\nYou\'ll receive a notification when it\'s activated.'
  },

  // Payment Options
  'avatar_onboarding.payment_options.duitnow_qr': {
    ms: 'DuitNow QR',
    en: 'DuitNow QR'
  },
  'avatar_onboarding.payment_options.duitnow_description': {
    ms: 'Terima pembayaran QR serta-merta',
    en: 'Accept QR payments instantly'
  },
  'avatar_onboarding.payment_options.boost_grabpay': {
    ms: 'Boost / GrabPay',
    en: 'Boost / GrabPay'
  },
  'avatar_onboarding.payment_options.mobile_description': {
    ms: 'Penyelesaian pembayaran mudah alih',
    en: 'Mobile payment solutions'
  },
  'avatar_onboarding.payment_options.fpx': {
    ms: 'FPX',
    en: 'FPX'
  },
  'avatar_onboarding.payment_options.fpx_description': {
    ms: 'Pemindahan perbankan dalam talian',
    en: 'Online banking transfers'
  },
  'avatar_onboarding.payment_options.gateway': {
    ms: 'Gateway Pembayaran',
    en: 'Payment Gateway'
  },
  'avatar_onboarding.payment_options.gateway_description': {
    ms: 'Pemprosesan pembayaran termaju',
    en: 'Advanced payment processing'
  },
  'avatar_onboarding.payment_options.activate': {
    ms: 'Aktifkan',
    en: 'Activate'
  },
  'avatar_onboarding.payment_options.apply': {
    ms: 'Mohon',
    en: 'Apply'
  },
  'avatar_onboarding.payment_options.setup': {
    ms: 'Sediakan',
    en: 'Setup'
  },
  'avatar_onboarding.payment_options.explore': {
    ms: 'Terokai',
    en: 'Explore'
  },

  // Form Fields
  'avatar_onboarding.form.full_name': {
    ms: 'Nama Penuh',
    en: 'Full Name'
  },
  'avatar_onboarding.form.ic_number': {
    ms: 'No. KP',
    en: 'IC Number'
  },
  'avatar_onboarding.form.auto_filled': {
    ms: 'Auto-diisi daripada MyKad',
    en: 'Auto-filled from MyKad'
  },
  'avatar_onboarding.form.mobile_number': {
    ms: 'Nombor Telefon',
    en: 'Mobile Number'
  },
  'avatar_onboarding.form.mobile_placeholder': {
    ms: 'Masukkan nombor telefon anda',
    en: 'Enter your mobile number'
  },
  'avatar_onboarding.form.business_name': {
    ms: 'Nama Perniagaan',
    en: 'Business Name'
  },
  'avatar_onboarding.form.business_name_placeholder': {
    ms: 'Masukkan nama perniagaan anda',
    en: 'Enter your business name'
  },
  'avatar_onboarding.form.business_type': {
    ms: 'Jenis Perniagaan',
    en: 'Business Type'
  },
  'avatar_onboarding.form.business_type_placeholder': {
    ms: 'Pilih jenis perniagaan',
    en: 'Select business type'
  },
  'avatar_onboarding.form.sole_proprietor': {
    ms: 'Milikan Tunggal',
    en: 'Sole Proprietor'
  },
  'avatar_onboarding.form.partnership': {
    ms: 'Perkongsian',
    en: 'Partnership'
  },
  'avatar_onboarding.form.sdn_bhd': {
    ms: 'Sdn. Bhd. (Syarikat Sendirian Berhad)',
    en: 'Sdn. Bhd. (Private Limited)'
  },
  'avatar_onboarding.form.business_description': {
    ms: 'Penerangan Perniagaan',
    en: 'Business Description'
  },
  'avatar_onboarding.form.business_description_placeholder': {
    ms: 'Terangkan aktiviti perniagaan anda',
    en: 'Describe your business activities'
  },
  'avatar_onboarding.form.business_address': {
    ms: 'Alamat Perniagaan',
    en: 'Business Address'
  },
  'avatar_onboarding.form.business_address_placeholder': {
    ms: 'Masukkan alamat perniagaan anda',
    en: 'Enter your business address'
  },
  'avatar_onboarding.form.continue_button': {
    ms: 'Teruskan ke Langkah Seterusnya',
    en: 'Continue to Next Step'
  },

  // Steps
  'avatar_onboarding.steps.step_1': {
    ms: 'Langkah 1',
    en: 'Step 1'
  },
  'avatar_onboarding.steps.step_2': {
    ms: 'Langkah 2',
    en: 'Step 2'
  },
  'avatar_onboarding.steps.step_3': {
    ms: 'Langkah 3',
    en: 'Step 3'
  },
  'avatar_onboarding.steps.ssm_description': {
    ms: 'Mohon pendaftaran SSM',
    en: 'Apply for SSM registration'
  },
  'avatar_onboarding.steps.bank_description': {
    ms: 'Buka akaun bank perniagaan',
    en: 'Open a business bank account'
  },
  'avatar_onboarding.steps.payment_description': {
    ms: 'Sediakan pembayaran digital',
    en: 'Set up digital payment'
  },
  'avatar_onboarding.steps.done': {
    ms: 'Selesai',
    en: 'Done'
  },
  'avatar_onboarding.steps.start_now': {
    ms: 'Mula Sekarang',
    en: 'Start Now'
  },

  // Completion
  'avatar_onboarding.completion.success_message': {
    ms: '**Orientasi Berjaya!**\n\n**Tahniah!** Persediaan perniagaan anda kini lengkap.\n\nAnda kini boleh:\n\n• Mengakses papan pemuka perniagaan anda\n\n• Menjejaki jualan dan pelanggan\n\n• Memohon pembiayaan\n\n• Menggunakan alat pembayaran digital\n\n\n\n**Bersedia untuk memulakan perjalanan perniagaan anda?**',
    en: '**Onboarding Successful!**\n\n**Congratulations!** Your business setup is now complete.\n\nYou can now:\n\n• Access your business dashboard\n\n• Track sales and customers\n\n• Apply for funding\n\n• Use digital payment tools\n\n\n\n**Ready to start your business journey?**'
  },
  'avatar_onboarding.completion.continue_message': {
    ms: '**Teruskan ke Papan Pemuka Anda**',
    en: '**Continue to your Dashboard**'
  },
  'avatar_onboarding.completion.continue_button': {
    ms: 'Teruskan ke Papan Pemuka',
    en: 'Continue to Dashboard'
  },
  'avatar_onboarding.completion.onboarding_complete': {
    ms: 'Orientasi Selesai!',
    en: 'Onboarding Complete!'
  },
  'avatar_onboarding.completion.setup_complete_description': {
    ms: 'Persediaan perniagaan anda kini lengkap. Anda kini boleh mengakses semua ciri dalam papan pemuka anda.',
    en: 'Your business setup is now complete. You can now access all features in your dashboard.'
  },

  // Consent Modal
  'avatar_onboarding.consent.title': {
    ms: 'Persetujuan Diperlukan',
    en: 'Consent Required'
  },
  'avatar_onboarding.consent.description': {
    ms: 'Kami memerlukan persetujuan anda untuk berkongsi butiran SSM anda untuk persediaan QR pedagang. Ini akan membolehkan anda menerima pembayaran QR daripada pelanggan.',
    en: 'We need your consent to share your SSM details for merchant QR setup. This will enable you to accept QR payments from customers.'
  },
  'avatar_onboarding.consent.decline': {
    ms: 'Tolak',
    en: 'Decline'
  },
  'avatar_onboarding.consent.agree': {
    ms: 'Setuju & Teruskan',
    en: 'Agree & Continue'
  },

  // Chat Interface
  'avatar_onboarding.chat.placeholder': {
    ms: 'Taip mesej anda di sini...',
    en: 'Type your message here...'
  },
  'avatar_onboarding.chat.instructions': {
    ms: 'Tekan Enter untuk hantar • Shift+Enter untuk baris baru',
    en: 'Press Enter to send • Shift+Enter for new line'
  },
  'avatar_onboarding.chat.typing': {
    ms: 'Menaip...',
    en: 'Typing...'
  },

  // Avatar Status
  'avatar_onboarding.avatar.ready': {
    ms: 'Avatar Sedia',
    en: 'Avatar Ready'
  },
  'avatar_onboarding.avatar.initializing': {
    ms: 'Memulakan Avatar...',
    en: 'Initializing Avatar...'
  },

  // Microphone Status
  'avatar_onboarding.microphone.requesting': {
    ms: 'Meminta akses mikrofon...',
    en: 'Requesting microphone access...'
  },
  'avatar_onboarding.microphone.denied': {
    ms: 'Akses mikrofon ditolak',
    en: 'Microphone access denied'
  },
  'avatar_onboarding.microphone.ready': {
    ms: 'Mikrofon sedia',
    en: 'Microphone ready'
  },

  // Language identifier
  'language': {
    ms: 'ms',
    en: 'en'
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
  },

  // Credit Score & Business Health Translations
  'credit_score.title': {
    ms: 'Skor Kredit Perniagaan',
    en: 'Business Credit Score'
  },
  'credit_score.grade': {
    ms: 'Gred',
    en: 'Grade'
  },
  'credit_score.monthly_change': {
    ms: 'Perubahan Bulanan',
    en: 'Monthly Change'
  },
  'credit_score.last_updated': {
    ms: 'Kemaskini Terakhir',
    en: 'Last Updated'
  },
  'credit_score.trend.improving': {
    ms: 'Membaik',
    en: 'Improving'
  },
  'credit_score.trend.stable': {
    ms: 'Stabil',
    en: 'Stable'
  },
  'credit_score.trend.declining': {
    ms: 'Menurun',
    en: 'Declining'
  },
  'credit_score.factors.payment_history': {
    ms: 'Sejarah Pembayaran',
    en: 'Payment History'
  },
  'credit_score.factors.amounts_owed': {
    ms: 'Jumlah Hutang',
    en: 'Amounts Owed'
  },
  'credit_score.factors.length_of_credit_history': {
    ms: 'Tempoh Sejarah Kredit',
    en: 'Length of Credit History'
  },
  'credit_score.factors.credit_mix': {
    ms: 'Campuran Kredit',
    en: 'Credit Mix'
  },
  'credit_score.factors.new_credit': {
    ms: 'Kredit Baharu',
    en: 'New Credit'
  },
  'credit_score.status.healthy': {
    ms: 'Sihat',
    en: 'Healthy'
  },
  'credit_score.status.warning': {
    ms: 'Amaran',
    en: 'Warning'
  },
  'credit_score.status.critical': {
    ms: 'Kritikal',
    en: 'Critical'
  },
  'credit_score.impact.high': {
    ms: 'Tinggi',
    en: 'High'
  },
  'credit_score.impact.medium': {
    ms: 'Sederhana',
    en: 'Medium'
  },
  'credit_score.impact.low': {
    ms: 'Rendah',
    en: 'Low'
  },
  'business_health.title': {
    ms: 'Laporan Kesihatan Perniagaan',
    en: 'Business Health Report'
  },
  'business_health.overall_health': {
    ms: 'Kesihatan Keseluruhan',
    en: 'Overall Health'
  },
  'business_health.health_score': {
    ms: 'Skor Kesihatan',
    en: 'Health Score'
  },
  'business_health.key_strengths': {
    ms: 'Kekuatan Utama',
    en: 'Key Strengths'
  },
  'business_health.improvement_areas': {
    ms: 'Bidang Penambahbaikan',
    en: 'Improvement Areas'
  },
  'business_health.recommended_actions': {
    ms: 'Tindakan Disyorkan',
    en: 'Recommended Actions'
  },
  'business_health.risk_factors': {
    ms: 'Faktor Risiko',
    en: 'Risk Factors'
  },
  'business_health.level.excellent': {
    ms: 'Cemerlang',
    en: 'Excellent'
  },
  'business_health.level.good': {
    ms: 'Baik',
    en: 'Good'
  },
  'business_health.level.fair': {
    ms: 'Sederhana',
    en: 'Fair'
  },
  'business_health.level.poor': {
    ms: 'Lemah',
    en: 'Poor'
  },
  'credit_score.view_details': {
    ms: 'Lihat Butiran',
    en: 'View Details'
  },
  'credit_score.factors_affecting': {
    ms: 'Faktor yang Mempengaruhi Skor',
    en: 'Factors Affecting Score'
  },
  'credit_score.recommendations': {
    ms: 'Cadangan Penambahbaikan',
    en: 'Improvement Recommendations'
  },
  'credit_score.download_report': {
    ms: 'Muat Turun Laporan',
    en: 'Download Report'
  },
  'credit_score.footer_description': {
    ms: 'Ingin memperbaiki skor kredit anda? Dapatkan cadangan yang diperibadikan atau muat turun laporan terperinci anda.',
    en: 'Want to improve your credit score? Get personalized recommendations or download your detailed report.'
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
