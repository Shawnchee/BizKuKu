'use client'

import { useState, useEffect } from 'react'
import { CheckCircle, Sparkles, Play, FileText, CreditCard, QrCode, Building2, Calendar, Clock } from 'lucide-react'
import { OnboardingStorage } from '@/lib/onboarding-storage'
import { useLanguage } from '@/contexts/LanguageContext'

interface OnboardingProgressBarProps {
  className?: string
}

interface ApplicationProgress {
  id: string
  title: string
  titleMs: string
  icon: any
  status: 'pending' | 'processing' | 'approved' | 'rejected'
  progress: number
  estimatedApprovalDate: string
  lastUpdated: string
  color: string
  bgColor: string
  linkTo: string
  description: string
  descriptionMs: string
}

export default function OnboardingProgressBar({ className = '' }: OnboardingProgressBarProps) {
  const [completedSteps, setCompletedSteps] = useState(0)
  const [currentStep, setCurrentStep] = useState(1)
  const [hasProgress, setHasProgress] = useState(false)
  const { t, language } = useLanguage()

  const totalSteps = 4

  // Mock application data - in real app, this would come from API
  const applications: ApplicationProgress[] = [
    {
      id: 'ssm-passport',
      title: 'SSM Passport Application',
      titleMs: 'Permohonan Pasport SSM',
      icon: Building2,
      status: 'approved',
      progress: 100,
      estimatedApprovalDate: '2024-01-15',
      lastUpdated: '2024-01-15',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
      linkTo: '/onboarding?step=2',
      description: 'View your SSM passport application details and download certificate',
      descriptionMs: 'Lihat butiran permohonan pasport SSM anda dan muat turun sijil'
    },
    {
      id: 'grant-application',
      title: 'SME Digitalisation Matching Grant',
      titleMs: 'Geran Padanan Digitalisasi PKS',
      icon: FileText,
      status: 'processing',
      progress: 65,
      estimatedApprovalDate: '2024-02-10',
      lastUpdated: '2024-01-28',
      color: 'from-blue-500 to-indigo-500',
      bgColor: 'bg-blue-50',
      linkTo: '/grant-application-status',
      description: '50% matching grant for digital solutions (e-commerce, POS, payroll, etc.)',
      descriptionMs: 'Geran padanan 50% untuk penyelesaian digital (e-dagang, POS, gaji, dll.)'
    },
    {
      id: 'loan-application',
      title: 'TEKUN Nasional Micro Financing',
      titleMs: 'Pembiayaan Mikro TEKUN Nasional',
      icon: CreditCard,
      status: 'pending',
      progress: 30,
      estimatedApprovalDate: '2024-02-20',
      lastUpdated: '2024-01-25',
      color: 'from-purple-500 to-violet-500',
      bgColor: 'bg-purple-50',
      linkTo: '/loan-application-status',
      description: 'Easy micro-loans for small traders and hawkers, up to RM10,000',
      descriptionMs: 'Pinjaman mikro mudah untuk peniaga kecil dan penjaja, sehingga RM10,000'
    },
    {
      id: 'qr-merchant',
      title: 'QR Merchant Application',
      titleMs: 'Permohonan QR Pedagang',
      icon: QrCode,
      status: 'processing',
      progress: 80,
      estimatedApprovalDate: '2024-02-05',
      lastUpdated: '2024-01-30',
      color: 'from-orange-500 to-amber-500',
      bgColor: 'bg-orange-50',
      linkTo: '/onboarding?step=4',
      description: 'Monitor your QR merchant setup and activation process',
      descriptionMs: 'Pantau setup QR pedagang anda dan proses pengaktifan'
    }
  ]

  const loadProgress = () => {
    const savedProgress = OnboardingStorage.load()
    if (savedProgress) {
      setCompletedSteps(savedProgress.completedSteps.length)
      setCurrentStep(savedProgress.currentStep)
      setHasProgress(true)
    } else {
      setCompletedSteps(0)
      setCurrentStep(1)
      setHasProgress(false)
    }
  }

  useEffect(() => {
    loadProgress()

    // Listen for storage changes (when user completes steps in another tab)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'bizzku_onboarding_progress') {
        loadProgress()
      }
    }

    window.addEventListener('storage', handleStorageChange)

    // Also refresh when window gains focus (user returns from onboarding)
    const handleFocus = () => {
      loadProgress()
    }

    window.addEventListener('focus', handleFocus)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('focus', handleFocus)
    }
  }, [])

  const progressPercentage = Math.round((completedSteps / totalSteps) * 100)

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved':
        return language === 'ms' ? 'Diluluskan' : 'Approved'
      case 'processing':
        return language === 'ms' ? 'Sedang Diproses' : 'Processing'
      case 'pending':
        return language === 'ms' ? 'Dalam Proses' : 'Pending'
      case 'rejected':
        return language === 'ms' ? 'Perlu Semakan' : 'Needs Review'
      default:
        return status
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-700'
      case 'processing':
        return 'bg-blue-100 text-blue-700'
      case 'pending':
        return 'bg-yellow-100 text-yellow-700'
      case 'rejected':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(language === 'ms' ? 'ms-MY' : 'en-GB', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Original Onboarding Progress */}
      <div className="relative bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300">
        {/* Decorative elements */}
        <div className="absolute top-2 right-2 text-blue-300">
          <Sparkles className="w-4 h-4" />
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="bg-green-100 rounded-full p-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                {t('progress.title')}
                <span className={`ml-2 text-sm px-2 py-1 rounded-full font-medium ${
                  !hasProgress
                    ? 'bg-blue-100 text-blue-700'
                    : completedSteps === totalSteps
                    ? 'bg-green-100 text-green-700'
                    : completedSteps >= 2
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-blue-100 text-blue-700'
                }`}>
                  {!hasProgress
                    ? t('progress.get_started')
                    : completedSteps === totalSteps
                    ? t('progress.completed')
                    : completedSteps >= 2
                    ? t('progress.almost_done')
                    : t('progress.in_progress')
                  }
                </span>
              </h3>
              <p className="text-sm text-gray-600">
                {hasProgress
                  ? `${completedSteps} of ${totalSteps} ${t('progress.steps_completed')}`
                  : t('progress.start_journey')
                }
              </p>
            </div>
          </div>

          <div className="text-right">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {progressPercentage}%
            </div>
            <a
              href={completedSteps === totalSteps ? "/dashboard" : "/onboarding"}
              className="mt-2 inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-full hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg text-sm font-medium"
            >
              {!hasProgress ? (
                <>
                  <Play className="w-4 h-4 inline mr-1" />
                  {t('progress.start_setup')}
                </>
              ) : completedSteps === totalSteps ? (
                t('progress.view_dashboard')
              ) : (
                t('progress.continue_setup')
              )}
            </a>
          </div>
        </div>

        {/* Enhanced progress bar */}
        <div className="relative">
          <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
            <div
              className="bg-gradient-to-r from-blue-500 to-indigo-500 h-3 rounded-full transition-all duration-500 ease-out shadow-sm relative overflow-hidden"
              style={{ width: `${progressPercentage}%` }}
            >
              {/* Animated shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse"></div>
            </div>
          </div>

          {/* Progress steps indicators */}
          <div className="flex justify-between mt-2">
            {Array.from({ length: totalSteps }, (_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index < completedSteps
                    ? 'bg-green-500 shadow-md'
                    : index === completedSteps
                    ? 'bg-blue-500 shadow-md animate-pulse'
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Motivational message */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-700">
            {!hasProgress ? (
              <>
                <span className="font-medium text-blue-600">{t('progress.ready_start')}</span> {t('progress.setup_steps')} 🚀
              </>
            ) : completedSteps === totalSteps ? (
              <>
                <span className="font-medium text-green-600">{t('progress.congratulations')}</span> {t('progress.setup_complete')} 🎉
              </>
            ) : completedSteps >= 2 ? (
              <>
                <span className="font-medium text-blue-600">{t('progress.almost_there')}</span> {totalSteps - completedSteps} {t('progress.more_steps')} 🚀
              </>
            ) : (
              <>
                <span className="font-medium text-blue-600">{t('progress.great_start')}</span> {t('progress.continue_journey')} 💪
              </>
            )}
          </p>
        </div>
      </div>

      {/* Application Progress Section */}
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {language === 'ms' ? 'Status Permohonan' : 'Application Status'}
          </h2>
          <p className="text-gray-600">
            {language === 'ms' ? 'Pantau kemajuan semua permohonan anda' : 'Track the progress of all your applications'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {applications.map((app) => {
            const Icon = app.icon
            return (
              <a
                key={app.id}
                href={app.linkTo}
                className={`group relative ${app.bgColor} rounded-3xl p-8 border border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer backdrop-blur-sm`}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-14 h-14 bg-gradient-to-r ${app.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors leading-tight">
                        {language === 'ms' ? app.titleMs : app.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                        {language === 'ms' ? app.descriptionMs : app.description}
                      </p>
                    </div>
                  </div>
                  <div className="text-right flex flex-col items-end">
                    <div className={`text-3xl font-bold bg-gradient-to-r ${app.color} bg-clip-text text-transparent leading-none`}>
                      {app.progress}%
                    </div>
                    <span className={`inline-block text-xs px-3 py-1.5 rounded-full font-medium mt-2 ${getStatusColor(app.status)}`}>
                      {getStatusText(app.status)}
                    </span>
                  </div>
                </div>

                {/* Enhanced Progress Bar */}
                <div className="relative mb-5">
                  <div className="flex justify-between text-sm text-gray-600 mb-3 font-medium">
                    <span>{language === 'ms' ? 'Kemajuan' : 'Progress'}</span>
                    <span>{app.progress}% {language === 'ms' ? 'selesai' : 'complete'}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 shadow-inner">
                    <div
                      className={`bg-gradient-to-r ${app.color} h-2 rounded-full transition-all duration-700 ease-out shadow-sm relative overflow-hidden`}
                      style={{ width: `${app.progress}%` }}
                    >
                      {/* Animated shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse"></div>
                    </div>
                  </div>
                  {/* Progress milestones */}
                  <div className="flex justify-between mt-3">
                    {[25, 50, 75, 100].map((milestone) => (
                      <div
                        key={milestone}
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                          app.progress >= milestone
                            ? `bg-gradient-to-r ${app.color}`
                            : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Information Grid */}
                <div className="grid grid-cols-2 gap-6 text-sm">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span className="font-medium">{language === 'ms' ? 'Anggaran Kelulusan' : 'Est. Approval'}</span>
                    </div>
                    <p className="font-bold text-gray-900 text-base">
                      {formatDate(app.estimatedApprovalDate)}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span className="font-medium">{language === 'ms' ? 'Terakhir Dikemas Kini' : 'Last Updated'}</span>
                    </div>
                    <p className="font-bold text-gray-900 text-base">
                      {formatDate(app.lastUpdated)}
                    </p>
                  </div>
                </div>

                {/* Click indicator */}
                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex items-center space-x-1 text-xs text-gray-400 font-medium">
                    <span>{language === 'ms' ? 'Klik untuk butiran' : 'Click for details'}</span>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </div>
  )
}
