'use client'

import { useState, useEffect } from 'react'
import { Clock, CheckCircle, AlertCircle, ArrowLeft, RefreshCw, FileText, Building, Phone } from 'lucide-react'
import { Button } from '@/components/ui'
import { useLanguage } from '@/contexts/LanguageContext'

interface Step3Data {
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

interface OnboardingStep3Props {
  data: Step3Data
  onUpdate: (data: Partial<Step3Data>) => void
  onNext: () => void
  onPrevious: () => void
}

export function OnboardingStep3({ data, onUpdate, onPrevious, onNext }: OnboardingStep3Props) {
  const { t } = useLanguage()
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [lastChecked, setLastChecked] = useState<Date>(new Date())

  // Generate SSM details when approved
  const generateSSMDetails = () => {
    const currentDate = new Date()
    const expiryDate = new Date(currentDate)
    expiryDate.setFullYear(currentDate.getFullYear() + 1) // 1 year validity

    return {
      registrationNumber: `SSM-${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`,
      businessName: 'Warung Mak Siti', // This should come from Step 1 data
      registrationDate: currentDate.toLocaleDateString('ms-MY'),
      expiryDate: expiryDate.toLocaleDateString('ms-MY'),
      businessType: 'Small Business',
      address: 'No. 123, Jalan Utama, Taman Bahagia, 12345 Kuala Lumpur' // This should come from Step 1 data
    }
  }

  // Simulate status checking
  const checkStatus = async () => {
    setIsRefreshing(true)

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Simulate different status scenarios
    const statuses: Array<'pending' | 'approved' | 'rejected'> = ['pending', 'approved', 'pending', 'approved']
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)]

    const nextSteps = getNextSteps(randomStatus)

    // Generate SSM details only when approved
    const updateData: Partial<Step3Data> = {
      applicationStatus: randomStatus,
      nextSteps
    }

    if (randomStatus === 'approved') {
      updateData.ssmDetails = generateSSMDetails()
    }

    onUpdate(updateData)

    setLastChecked(new Date())
    setIsRefreshing(false)
  }

  const getNextSteps = (status: 'pending' | 'approved' | 'rejected'): string[] => {
    switch (status) {
      case 'pending':
        return [
          t('onboarding.step3.pending_step1'),
          t('onboarding.step3.pending_step2'),
          t('onboarding.step3.pending_step3')
        ]
      case 'approved':
        return [
          t('onboarding.step3.approved_step1'),
          t('onboarding.step3.approved_step2'),
          t('onboarding.step3.approved_step3')
        ]
      case 'rejected':
        return [
          t('onboarding.step3.rejected_step1'),
          t('onboarding.step3.rejected_step2'),
          t('onboarding.step3.rejected_step3')
        ]
      default:
        return []
    }
  }

  // Initialize next steps and SSM details on component mount
  useEffect(() => {
    const updateData: Partial<Step3Data> = {}

    if (data.nextSteps.length === 0) {
      updateData.nextSteps = getNextSteps(data.applicationStatus)
    }

    // Generate SSM details if approved but not yet generated
    if (data.applicationStatus === 'approved' && !data.ssmDetails) {
      updateData.ssmDetails = generateSSMDetails()
    }

    if (Object.keys(updateData).length > 0) {
      onUpdate(updateData)
    }
  }, [])

  const getStatusConfig = () => {
    switch (data.applicationStatus) {
      case 'pending':
        return {
          icon: Clock,
          color: 'yellow',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
          textColor: 'text-yellow-800',
          iconColor: 'text-yellow-600',
          title: t('onboarding.step3.status.pending'),
          description: t('onboarding.step3.status.pending_desc')
        }
      case 'approved':
        return {
          icon: CheckCircle,
          color: 'green',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          textColor: 'text-green-800',
          iconColor: 'text-green-600',
          title: t('onboarding.step3.status.approved'),
          description: t('onboarding.step3.status.approved_desc')
        }
      case 'rejected':
        return {
          icon: AlertCircle,
          color: 'red',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          textColor: 'text-red-800',
          iconColor: 'text-red-600',
          title: t('onboarding.step3.status.rejected'),
          description: t('onboarding.step3.status.rejected_desc')
        }
    }
  }

  const statusConfig = getStatusConfig()
  const StatusIcon = statusConfig.icon

  const canProceed = data.applicationStatus === 'approved'

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">
          {t('onboarding.step3.header.title')}
        </h2>
        <p className="text-gray-600 mt-2">
          {t('onboarding.step3.header.subtitle')}
        </p>
      </div>

      {/* Status Card */}
      <div className={`${statusConfig.bgColor} ${statusConfig.borderColor} border rounded-lg p-6`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`p-3 rounded-full ${statusConfig.bgColor}`}>
              <StatusIcon className={`w-8 h-8 ${statusConfig.iconColor}`} />
            </div>
            <div>
              <h3 className={`text-xl font-semibold ${statusConfig.textColor}`}>
                {statusConfig.title}
              </h3>
              <p className={`text-sm ${statusConfig.textColor} opacity-80`}>
                {statusConfig.description}
              </p>
            </div>
          </div>
          
          <Button
            onClick={checkStatus}
            disabled={isRefreshing}
            variant="outline"
            size="sm"
            className="flex items-center space-x-2"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{isRefreshing ? t('onboarding.step3.checking') : t('onboarding.step3.refresh_status')}</span>
          </Button>
        </div>

        <div className="text-xs text-gray-500 mb-4">
          {t('onboarding.step3.last_checked')} {lastChecked.toLocaleString('en-US')}
        </div>

        {/* Progress Timeline */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Progress:</h4>
          
          <div className="space-y-3">
            {/* Step 1: Document Submission */}
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900">
                  {t('onboarding.step3.documents_submitted')}
                </div>
                <div className="text-xs text-gray-500">
                  {t('onboarding.step3.documents_submitted_desc')}
                </div>
              </div>
            </div>

            {/* Step 2: Document Review */}
            <div className="flex items-center space-x-3">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                data.applicationStatus !== 'pending' ? 'bg-green-500' : 'bg-yellow-500'
              }`}>
                {data.applicationStatus !== 'pending' ? (
                  <CheckCircle className="w-4 h-4 text-white" />
                ) : (
                  <Clock className="w-4 h-4 text-white" />
                )}
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900">
                  {t('onboarding.step3.document_review')}
                </div>
                <div className="text-xs text-gray-500">
                  {data.applicationStatus === 'pending'
                    ? t('onboarding.step3.status.pending_desc')
                    : t('onboarding.step3.document_review_desc')
                  }
                </div>
              </div>
            </div>

            {/* Step 3: Approval */}
            <div className="flex items-center space-x-3">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                data.applicationStatus === 'approved' 
                  ? 'bg-green-500' 
                  : data.applicationStatus === 'rejected'
                  ? 'bg-red-500'
                  : 'bg-gray-300'
              }`}>
                {data.applicationStatus === 'approved' ? (
                  <CheckCircle className="w-4 h-4 text-white" />
                ) : data.applicationStatus === 'rejected' ? (
                  <AlertCircle className="w-4 h-4 text-white" />
                ) : (
                  <Clock className="w-4 h-4 text-gray-500" />
                )}
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900">
                  {t('onboarding.step3.decision')}
                </div>
                <div className="text-xs text-gray-500">
                  {data.applicationStatus === 'approved'
                    ? t('onboarding.step3.decision_desc')
                    : data.applicationStatus === 'rejected'
                    ? t('onboarding.step3.status.rejected_desc')
                    : t('onboarding.step3.status.pending_desc')
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SSM Details - Only show when approved */}
      {data.applicationStatus === 'approved' && data.ssmDetails && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <div className="p-3 bg-green-100 rounded-full mr-4">
              <Building className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-green-900">
                {t('onboarding.step3.ssm_details')}
              </h3>
              <p className="text-sm text-green-700">
                Your business has been successfully registered
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4 border border-green-100">
              <div className="text-sm text-gray-600 mb-1">{t('onboarding.step3.registration_number')}</div>
              <div className="font-semibold text-gray-900 text-lg">{data.ssmDetails.registrationNumber}</div>
            </div>

            <div className="bg-white rounded-lg p-4 border border-green-100">
              <div className="text-sm text-gray-600 mb-1">{t('onboarding.step3.business_name')}</div>
              <div className="font-semibold text-gray-900">{data.ssmDetails.businessName}</div>
            </div>

            <div className="bg-white rounded-lg p-4 border border-green-100">
              <div className="text-sm text-gray-600 mb-1">{t('onboarding.step3.registration_date')}</div>
              <div className="font-semibold text-gray-900">{data.ssmDetails.registrationDate}</div>
            </div>

            <div className="bg-white rounded-lg p-4 border border-green-100">
              <div className="text-sm text-gray-600 mb-1">{t('onboarding.step3.expiry_date')}</div>
              <div className="font-semibold text-gray-900">{data.ssmDetails.expiryDate}</div>
            </div>

            <div className="bg-white rounded-lg p-4 border border-green-100 md:col-span-2">
              <div className="text-sm text-gray-600 mb-1">{t('onboarding.step3.business_type')}</div>
              <div className="font-semibold text-gray-900">{data.ssmDetails.businessType}</div>
            </div>

            <div className="bg-white rounded-lg p-4 border border-green-100 md:col-span-2">
              <div className="text-sm text-gray-600 mb-1">{t('onboarding.step3.address')}</div>
              <div className="font-semibold text-gray-900">{data.ssmDetails.address}</div>
            </div>
          </div>

          <div className="mt-4 p-4 bg-green-100 rounded-lg">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-green-900 mb-1">
                  {t('onboarding.step3.official_documents')}
                </p>
                <p className="text-sm text-green-800">
                  {t('onboarding.step3.official_documents_desc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Next Steps */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <FileText className="w-5 h-5 mr-2 text-blue-600" />
          {t('onboarding.step3.next_steps')}
        </h3>
        
        <div className="space-y-3">
          {data.nextSteps.map((step, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                <span className="text-xs font-medium text-blue-600">{index + 1}</span>
              </div>
              <p className="text-sm text-gray-700 flex-1">{step}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Support */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Phone className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-900 mb-1">
              {t('onboarding.step3.need_help')}
            </h4>
            <p className="text-sm text-blue-800 mb-2">
              {t('onboarding.step3.contact_support')}
            </p>
            <div className="mt-2 space-y-1 text-sm text-blue-700">
              <p>📞 {t('onboarding.step3.whatsapp')}</p>
              <p>📧 {t('onboarding.step3.email')}</p>
              <p>🕒 {t('onboarding.step3.operating_hours')}</p>
            </div>
          </div>
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
          disabled={!canProceed}
          size="lg"
          className={`${
            canProceed
              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700'
              : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          {canProceed ? t('onboarding.next') : 'Wait for Approval'}
        </Button>
      </div>
    </div>
  )
}
