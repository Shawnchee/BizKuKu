'use client'

import { useState, useEffect } from 'react'
import { CheckCircle, Sparkles, Play } from 'lucide-react'
import { OnboardingStorage } from '@/lib/onboarding-storage'
import { useLanguage } from '@/contexts/LanguageContext'

interface OnboardingProgressBarProps {
  className?: string
}

export default function OnboardingProgressBar({ className = '' }: OnboardingProgressBarProps) {
  const [completedSteps, setCompletedSteps] = useState(0)
  const [currentStep, setCurrentStep] = useState(1)
  const [hasProgress, setHasProgress] = useState(false)
  const { t } = useLanguage()

  const totalSteps = 4

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

  return (
    <div className={`relative bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300 ${className}`}>
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
  )
}
