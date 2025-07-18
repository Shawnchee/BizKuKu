'use client'

import React from 'react'
import { Check, ArrowLeft, Info } from 'lucide-react'
import { Button } from '@/components/ui'
import { useLanguage } from '@/contexts/LanguageContext'

interface Step2Data {
  ssmApplication: boolean
}

interface OnboardingStep2Props {
  data: Step2Data
  onUpdate: (data: Partial<Step2Data>) => void
  onNext: () => void
  onPrevious: () => void
}



export function OnboardingStep2({ data, onUpdate, onPrevious, onNext }: OnboardingStep2Props) {
  const { t } = useLanguage()

  const handleSSMToggle = () => {
    onUpdate({
      ssmApplication: !data.ssmApplication
    })
  }

  const isFormValid = () => {
    return data.ssmApplication
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">
          {t('onboarding.step2.header.title')}
        </h2>
        <p className="text-gray-600 mt-2">
          {t('onboarding.step2.header.subtitle')}
        </p>
      </div>

      {/* Form Content */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="space-y-6">

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div className="flex items-start space-x-3">
                <Info className="w-6 h-6 text-blue-600 mt-1" />
                <div>
                  <h4 className="font-medium text-blue-900 mb-2">
                    {t('onboarding.step2.why_ssm')}
                  </h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>{t('onboarding.step2.benefit1')}</li>
                    <li>{t('onboarding.step2.benefit2')}</li>
                    <li>{t('onboarding.step2.benefit3')}</li>
                    <li>{t('onboarding.step2.benefit4')}</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <label className="flex items-center space-x-3 cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={data.ssmApplication}
                    onChange={handleSSMToggle}
                    className="sr-only"
                  />
                  <div className={`w-12 h-6 rounded-full transition-colors ${
                    data.ssmApplication ? 'bg-blue-600' : 'bg-gray-300'
                  }`}>
                    <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                      data.ssmApplication ? 'translate-x-6' : 'translate-x-0.5'
                    } mt-0.5`} />
                  </div>
                </div>
                <span className="text-lg font-medium text-gray-900">
                  {data.ssmApplication ? (
                    <span className="text-blue-600">
                      {t('onboarding.step2.yes_apply')}
                    </span>
                  ) : (
                    <span className="text-gray-600">
                      {t('onboarding.step2.not_now')}
                    </span>
                  )}
                </span>
              </label>
            </div>

            {data.ssmApplication && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-green-600 mr-2" />
                  <span className="text-green-800 font-medium">
                    {t('onboarding.step2.great_help')}
                  </span>
                </div>
              </div>
            )}
          </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-6">
        <Button
          onClick={onPrevious}
          variant="outline"
          size="lg"
          className="flex items-center"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t('onboarding.back')}
        </Button>

        <Button
          onClick={onNext}
          disabled={!isFormValid()}
          size="lg"
          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
        >
          {t('onboarding.next')}
        </Button>
      </div>
    </div>
  )
}
