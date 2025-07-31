'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowLeft, X, CheckCircle, Clock, FileText, CreditCard, Building, Settings, Download, Upload } from 'lucide-react'
import { Button } from '@/components/ui'
import { OnboardingStep1, OnboardingStep2, OnboardingStep3, OnboardingStep4 } from '@/components/onboarding'
import { OnboardingStorage, OnboardingProgress } from '@/lib/onboarding-storage'
import { useLanguage } from '@/contexts/LanguageContext'

export interface OnboardingData {
  step1: {
    ekyc: {
      fullName: string
      icNumber: string
      phoneNumber: string
      email: string
    }
    businessInfo: {
      businessName: string
      businessType: string
      address: string
      registrationNumber: string
    }
    financialInfo: {
      monthlyRevenue: string
      bankAccount: string
      bankName: string
    }
    documents: {
      icFront: File | null
      icBack: File | null
      businessLicense: File | null
    }
  }
  step2: {
    ssmApplication: boolean
  }
  step3: {
    applicationStatus: 'pending' | 'approved' | 'rejected'
    nextSteps: string[]
    ssmDetails?: {
      registrationNumber: string
      businessName: string
      registrationDate: string
      expiryDate: string
      businessType: string
      address: string
    }
  }
  step4: {
    selectedBank: string
    ssmConsentGiven: boolean
    qrRequestSubmitted: boolean
    qrStatus: 'pending' | 'processing' | 'ready' | 'failed'
    qrRequestDate?: string
    estimatedReadyDate?: string
    merchantQrCode?: string
  }
}



// Steps will be defined inside the component to access translation function

export default function OnboardingPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { t } = useLanguage()
  const [currentStep, setCurrentStep] = useState(1)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [isDataLoaded, setIsDataLoaded] = useState(false)

  const steps = [
    {
      id: 1,
      title: t('onboarding.step1.title'),
      subtitle: t('onboarding.step1.subtitle'),
      description: t('onboarding.step1.description'),
      icon: FileText,
      color: 'blue'
    },
    {
      id: 2,
      title: t('onboarding.step2.title'),
      subtitle: t('onboarding.step2.subtitle'),
      description: t('onboarding.step2.description'),
      icon: CreditCard,
      color: 'green'
    },
    {
      id: 3,
      title: t('onboarding.step3.title'),
      subtitle: t('onboarding.step3.subtitle'),
      description: t('onboarding.step3.description'),
      icon: Clock,
      color: 'yellow'
    },
    {
      id: 4,
      title: t('onboarding.step4.title'),
      subtitle: t('onboarding.step4.subtitle'),
      description: t('onboarding.step4.description'),
      icon: Building,
      color: 'purple'
    }
  ]

  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    step1: {
      ekyc: { fullName: '', icNumber: '', phoneNumber: '', email: '' },
      businessInfo: { businessName: '', businessType: '', address: '', registrationNumber: '' },
      financialInfo: { monthlyRevenue: '', bankAccount: '', bankName: '' },
      documents: { icFront: null, icBack: null, businessLicense: null }
    },
    step2: {
      ssmApplication: false
    },
    step3: {
      applicationStatus: 'pending',
      nextSteps: []
    },
    step4: {
      selectedBank: '',
      ssmConsentGiven: false,
      qrRequestSubmitted: false,
      qrStatus: 'pending'
    }
  })

  // Load saved progress on component mount
  useEffect(() => {
    const savedProgress = OnboardingStorage.load()

    // Check if there's a step parameter in the URL
    const stepParam = searchParams.get('step')
    const targetStep = stepParam ? parseInt(stepParam) : null

    if (savedProgress) {
      console.log('Loading saved progress:', savedProgress)
      setOnboardingData(savedProgress.data)

      // If there's a valid step parameter, use it; otherwise use saved step
      if (targetStep && targetStep >= 1 && targetStep <= 4) {
        setCurrentStep(targetStep)
        // Update saved progress to reflect the new current step
        const updatedProgress = {
          ...savedProgress,
          currentStep: targetStep
        }
        OnboardingStorage.save(updatedProgress)
      } else {
        setCurrentStep(savedProgress.currentStep)
      }

      setCompletedSteps(savedProgress.completedSteps)
    } else {
      // If no saved progress but there's a step parameter, use it
      if (targetStep && targetStep >= 1 && targetStep <= 4) {
        setCurrentStep(targetStep)
      }
    }
    setIsDataLoaded(true)
  }, [searchParams])

  // Save progress whenever data changes (but only after initial load)
  useEffect(() => {
    if (!isDataLoaded) return // Don't save until data is loaded

    const progressData: OnboardingProgress = {
      data: onboardingData,
      currentStep,
      completedSteps,
      lastUpdated: new Date().toISOString()
    }
    console.log('Saving progress:', progressData)
    OnboardingStorage.save(progressData)
  }, [onboardingData, currentStep, completedSteps, isDataLoaded])

  // Keyboard shortcuts for navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Only handle if not typing in an input field
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLSelectElement) {
        return
      }

      if (e.key >= '1' && e.key <= '4') {
        const stepNumber = parseInt(e.key)
        jumpToStep(stepNumber)
      } else if (e.key === 'ArrowLeft' && currentStep > 1) {
        handlePrevious()
      } else if (e.key === 'ArrowRight' && currentStep < 4) {
        handleNext()
      } else if (e.key === 'r' && e.ctrlKey) {
        e.preventDefault()
        resetProgress()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [currentStep])

  const handleNext = () => {
    if (currentStep < 4) {
      // Mark current step as completed
      const newCompletedSteps = completedSteps.includes(currentStep)
        ? completedSteps
        : [...completedSteps, currentStep]

      const newCurrentStep = currentStep + 1

      setCompletedSteps(newCompletedSteps)
      setCurrentStep(newCurrentStep)

      // Save progress immediately
      const progressData: OnboardingProgress = {
        data: onboardingData,
        currentStep: newCurrentStep,
        completedSteps: newCompletedSteps,
        lastUpdated: new Date().toISOString()
      }
      console.log('Saving on next:', progressData)
      OnboardingStorage.save(progressData)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const jumpToStep = (stepNumber: number) => {
    if (stepNumber >= 1 && stepNumber <= 4) {
      setCurrentStep(stepNumber)

      // Save progress when jumping
      const progressData: OnboardingProgress = {
        data: onboardingData,
        currentStep: stepNumber,
        completedSteps,
        lastUpdated: new Date().toISOString()
      }
      console.log('Saving on jump to step:', stepNumber, progressData)
      OnboardingStorage.save(progressData)
    }
  }

  const resetProgress = () => {
    const confirmReset = window.confirm(
      'Are you sure you want to reset all progress? This will clear all saved data.\n\nAdakah anda pasti mahu reset semua kemajuan?'
    )
    if (confirmReset) {
      OnboardingStorage.clear()
      setCurrentStep(1)
      setCompletedSteps([])
      setOnboardingData({
        step1: {
          ekyc: { fullName: '', icNumber: '', phoneNumber: '', email: '' },
          businessInfo: { businessName: '', businessType: '', address: '', registrationNumber: '' },
          financialInfo: { monthlyRevenue: '', bankAccount: '', bankName: '' },
          documents: { icFront: null, icBack: null, businessLicense: null }
        },
        step2: {
          ssmApplication: false
        },
        step3: {
          applicationStatus: 'pending',
          nextSteps: []
        },
        step4: {
          selectedBank: '',
          ssmConsentGiven: false,
          qrRequestSubmitted: false,
          qrStatus: 'pending'
        }
      })
      console.log('Progress reset successfully')
      alert('Progress reset successfully!')
    }
  }

  const handleExit = () => {
    const confirmExit = window.confirm(
      'Adakah anda pasti mahu keluar? Kemajuan anda akan disimpan.\n\nAre you sure you want to exit? Your progress will be saved.'
    )
    if (confirmExit) {
      router.push('/')
    }
  }

  const handleExportProgress = () => {
    OnboardingStorage.downloadProgress()
  }

  const handleImportProgress = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.json'
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const content = e.target?.result as string
          if (OnboardingStorage.import(content)) {
            const savedProgress = OnboardingStorage.load()
            if (savedProgress) {
              setOnboardingData(savedProgress.data)
              setCurrentStep(savedProgress.currentStep)
              setCompletedSteps(savedProgress.completedSteps)
              alert('Progress imported successfully')
            }
          } else {
            alert('Invalid file')
          }
        }
        reader.readAsText(file)
      }
    }
    input.click()
  }

  const saveProgressManually = () => {
    const progressData: OnboardingProgress = {
      data: onboardingData,
      currentStep,
      completedSteps,
      lastUpdated: new Date().toISOString()
    }
    console.log('Manual save:', progressData)
    OnboardingStorage.save(progressData)
  }

  const updateStepData = (stepNumber: number, data: any) => {
    console.log('updateStepData called:', stepNumber, data)
    setOnboardingData(prev => {
      const stepKey = `step${stepNumber}` as keyof OnboardingData
      const newData = {
        ...prev,
        [stepKey]: { ...prev[stepKey], ...data }
      }
      console.log('New onboarding data:', newData)

      // Save immediately after updating
      setTimeout(() => {
        const progressData: OnboardingProgress = {
          data: newData,
          currentStep,
          completedSteps,
          lastUpdated: new Date().toISOString()
        }
        OnboardingStorage.save(progressData)
      }, 100)

      return newData
    })
  }

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <OnboardingStep1
            data={onboardingData.step1}
            onUpdate={(data) => updateStepData(1, data)}
            onNext={handleNext}
          />
        )
      case 2:
        return (
          <OnboardingStep2
            data={onboardingData.step2}
            onUpdate={(data) => updateStepData(2, data)}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        )
      case 3:
        return (
          <OnboardingStep3
            data={onboardingData.step3}
            onUpdate={(data) => updateStepData(3, data)}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        )
      case 4:
        return (
          <OnboardingStep4
            data={onboardingData.step4}
            onUpdate={(data) => updateStepData(4, data)}
            onPrevious={handlePrevious}
            onComplete={() => router.push('/dashboard')}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  {t('onboarding.business_setup')}
                </h1>
                <p className="text-sm text-gray-600">
                  {t('onboarding.step_of').replace('{current}', currentStep.toString()).replace('{total}', '4')}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={resetProgress}
                className="px-3 py-1 text-xs bg-red-100 hover:bg-red-200 text-red-700 rounded"
                title="Reset All Progress"
              >
                {t('onboarding.reset')}
              </button>
              <button
                onClick={saveProgressManually}
                className="px-3 py-1 text-xs bg-green-100 hover:bg-green-200 text-green-700 rounded"
                title="Manual Save"
              >
                {t('onboarding.save')}
              </button>
              <button
                onClick={() => {
                  const saved = OnboardingStorage.load()
                  console.log('Current saved data:', saved)
                  alert(`Saved data: ${saved ? 'Found' : 'None'}\nCheck console for details`)
                }}
                className="px-3 py-1 text-xs bg-blue-100 hover:bg-blue-200 text-blue-700 rounded"
                title="Check Saved Data"
              >
                {t('onboarding.check')}
              </button>
              <button
                onClick={handleExportProgress}
                className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-700"
                title="Export Progress"
              >
                <Download className="w-4 h-4" />
              </button>
              <button
                onClick={handleImportProgress}
                className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-700"
                title="Import Progress"
              >
                <Upload className="w-4 h-4" />
              </button>
              <button
                onClick={handleExit}
                className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="mb-2 text-center">
            <p className="text-xs text-gray-500">
              💡 {t('onboarding.click_any_step')}
            </p>
          </div>
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const isCompleted = completedSteps.includes(step.id)
              const isCurrent = currentStep === step.id
              const IconComponent = step.icon
              const canNavigate = true // Allow navigation to any step for better UX

              return (
                <div key={step.id} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <button
                      onClick={() => jumpToStep(step.id)}
                      disabled={!canNavigate}
                      className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                        isCompleted
                          ? 'bg-green-500 border-green-500 text-white hover:bg-green-600'
                          : isCurrent
                          ? `bg-${step.color}-500 border-${step.color}-500 text-white hover:bg-${step.color}-600`
                          : 'bg-gray-100 border-gray-300 text-gray-400 hover:bg-gray-200 hover:border-gray-400'
                      } ${canNavigate ? 'cursor-pointer' : 'cursor-not-allowed'} disabled:opacity-50`}
                      title={`Jump to ${step.title}`}
                    >
                      {isCompleted ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        <IconComponent className="w-6 h-6" />
                      )}
                    </button>
                    <button
                      onClick={() => jumpToStep(step.id)}
                      className="mt-2 text-center hover:bg-gray-50 rounded px-2 py-1 transition-colors"
                      title={`Jump to ${step.title}`}
                    >
                      <div className={`text-sm font-medium ${isCurrent ? 'text-blue-600' : 'text-gray-600'} hover:text-blue-600`}>
                        {step.title}
                      </div>
                      <div className="text-xs text-gray-500">{step.subtitle}</div>
                    </button>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`flex-1 h-1 mx-4 rounded-full transition-all duration-300 ${
                        completedSteps.includes(step.id) ? 'bg-green-500' : 'bg-gray-200'
                      }`}
                      style={{ minWidth: '60px' }}
                    />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderCurrentStep()}
      </div>
    </div>
  )
}
