'use client'

import { useState } from 'react'
import { Upload, Camera, FileText, User, Building, DollarSign, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui'
import { useLanguage } from '@/contexts/LanguageContext'

interface Step1Data {
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

interface OnboardingStep1Props {
  data: Step1Data
  onUpdate: (data: Partial<Step1Data>) => void
  onNext: () => void
}

export function OnboardingStep1({ data, onUpdate, onNext }: OnboardingStep1Props) {
  const [activeSection, setActiveSection] = useState<'documents' | 'ekyc' | 'business' | 'financial'>('documents')
  const { t } = useLanguage()



  const handleInputChange = (section: keyof Step1Data, field: string, value: string) => {
    const updatedSection = {
      ...data[section],
      [field]: value
    }
    console.log('Updating:', section, field, value, updatedSection)
    onUpdate({
      [section]: updatedSection
    })
  }

  const handleFileUpload = (field: keyof Step1Data['documents'], file: File | null) => {
    const updatedDocuments = {
      ...data.documents,
      [field]: file
    }
    onUpdate({
      documents: updatedDocuments
    })
  }

  const isFormValid = () => {
    const { ekyc, businessInfo, financialInfo } = data
    // Require only essential fields for makcik to proceed
    return (
      ekyc.fullName && ekyc.phoneNumber &&
      businessInfo.businessName && businessInfo.businessType &&
      financialInfo.monthlyRevenue
    )
  }

  const sections = [
    {
      id: 'documents' as const,
      title: t('onboarding.step1.documents.title'),
      subtitle: t('onboarding.step1.documents.subtitle'),
      icon: FileText,
      color: 'purple'
    },
    {
      id: 'ekyc' as const,
      title: t('onboarding.step1.ekyc.title'),
      subtitle: t('onboarding.step1.ekyc.subtitle'),
      icon: User,
      color: 'blue'
    },
    {
      id: 'business' as const,
      title: t('onboarding.step1.business.title'),
      subtitle: t('onboarding.step1.business.subtitle'),
      icon: Building,
      color: 'green'
    },
    {
      id: 'financial' as const,
      title: t('onboarding.step1.financial.title'),
      subtitle: t('onboarding.step1.financial.subtitle'),
      icon: DollarSign,
      color: 'yellow'
    }
  ]

  const FileUploadComponent = ({ 
    label, 
    field, 
    accept = "image/*,.pdf",
    description 
  }: { 
    label: string
    field: keyof Step1Data['documents']
    accept?: string
    description: string
  }) => (
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-400 transition-colors">
      <div className="text-center">
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <div className="mt-4">
          <label className="cursor-pointer">
            <span className="mt-2 block text-sm font-medium text-gray-900">{label}</span>
            <span className="mt-1 block text-xs text-gray-500">{description}</span>
            <input
              type="file"
              className="sr-only"
              accept={accept}
              onChange={(e) => handleFileUpload(field, e.target.files?.[0] || null)}
            />
            <Button variant="outline" className="mt-3">
              <Camera className="w-4 h-4 mr-2" />
              {t('onboarding.step1.documents.choose_file')}
            </Button>
          </label>
        </div>
        {data.documents[field] && (
          <div className="mt-2 text-sm text-green-600">
            ✓ {data.documents[field]?.name}
          </div>
        )}
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">
          {t('onboarding.step1.header.title')}
        </h2>
        <p className="text-gray-600 mt-2">
          {t('onboarding.step1.header.subtitle')}
        </p>
      </div>

      {/* Section Navigation */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {sections.map((section) => {
          const IconComponent = section.icon
          const isActive = activeSection === section.id
          
          return (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all ${
                isActive
                  ? `bg-${section.color}-50 border-${section.color}-200 text-${section.color}-700`
                  : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              <IconComponent className="w-4 h-4" />
              <div className="text-left">
                <div className="text-sm font-medium">{section.title}</div>
                <div className="text-xs">{section.subtitle}</div>
              </div>
            </button>
          )
        })}
      </div>

      {/* Form Content */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        {activeSection === 'documents' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <FileText className="w-5 h-5 mr-2 text-purple-600" />
              {t('onboarding.step1.documents.header')}
            </h3>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start">
                <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 mr-2" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium">{t('onboarding.step1.documents.tips')}</p>
                  <ul className="mt-1 list-disc list-inside space-y-1">
                    <li>{t('onboarding.step1.documents.tip1')}</li>
                    <li>{t('onboarding.step1.documents.tip2')}</li>
                    <li>{t('onboarding.step1.documents.tip3')}</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FileUploadComponent
                label={t('onboarding.step1.documents.ic_front')}
                field="icFront"
                description={t('onboarding.step1.documents.ic_front_desc')}
              />

              <FileUploadComponent
                label={t('onboarding.step1.documents.ic_back')}
                field="icBack"
                description={t('onboarding.step1.documents.ic_back_desc')}
              />

              <div className="md:col-span-2">
                <FileUploadComponent
                  label={t('onboarding.step1.documents.business_license')}
                  field="businessLicense"
                  description={t('onboarding.step1.documents.business_license_desc')}
                />
              </div>
            </div>
          </div>
        )}

        {activeSection === 'ekyc' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <User className="w-5 h-5 mr-2 text-blue-600" />
              {t('onboarding.step1.ekyc.header')}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('onboarding.step1.ekyc.full_name')}
                </label>
                <input
                  type="text"
                  value={data.ekyc.fullName}
                  onChange={(e) => handleInputChange('ekyc', 'fullName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={t('onboarding.step1.ekyc.full_name_placeholder')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('onboarding.step1.ekyc.ic_number')}
                </label>
                <input
                  type="text"
                  value={data.ekyc.icNumber}
                  onChange={(e) => handleInputChange('ekyc', 'icNumber', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={t('onboarding.step1.ekyc.ic_number_placeholder')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('onboarding.step1.ekyc.phone_number')}
                </label>
                <input
                  type="tel"
                  value={data.ekyc.phoneNumber}
                  onChange={(e) => handleInputChange('ekyc', 'phoneNumber', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={t('onboarding.step1.ekyc.phone_number_placeholder')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('onboarding.step1.ekyc.email')}
                </label>
                <input
                  type="email"
                  value={data.ekyc.email}
                  onChange={(e) => handleInputChange('ekyc', 'email', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={t('onboarding.step1.ekyc.email_placeholder')}
                />
              </div>
            </div>
          </div>
        )}

        {activeSection === 'business' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Building className="w-5 h-5 mr-2 text-green-600" />
              {t('onboarding.step1.business.header')}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('onboarding.step1.business.name')}
                </label>
                <input
                  type="text"
                  value={data.businessInfo.businessName}
                  onChange={(e) => handleInputChange('businessInfo', 'businessName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={t('onboarding.step1.business.name_placeholder')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('onboarding.step1.business.type')}
                </label>
                <select
                  value={data.businessInfo.businessType}
                  onChange={(e) => handleInputChange('businessInfo', 'businessType', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">{t('onboarding.step1.business.type_choose')}</option>
                  <option value="warung">{t('onboarding.step1.business.type_warung')}</option>
                  <option value="kedai">{t('onboarding.step1.business.type_kedai')}</option>
                  <option value="restoran">{t('onboarding.step1.business.type_restoran')}</option>
                  <option value="online">{t('onboarding.step1.business.type_online')}</option>
                  <option value="lain">{t('onboarding.step1.business.type_others')}</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('onboarding.step1.business.address')}
                </label>
                <textarea
                  value={data.businessInfo.address}
                  onChange={(e) => handleInputChange('businessInfo', 'address', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={t('onboarding.step1.business.address_placeholder')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('onboarding.step1.business.registration_number')}
                </label>
                <input
                  type="text"
                  value={data.businessInfo.registrationNumber}
                  onChange={(e) => handleInputChange('businessInfo', 'registrationNumber', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={t('onboarding.step1.business.registration_number_placeholder')}
                />
              </div>
            </div>
          </div>
        )}

        {activeSection === 'financial' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <DollarSign className="w-5 h-5 mr-2 text-yellow-600" />
              {t('onboarding.step1.financial.header')}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('onboarding.step1.financial.monthly_revenue')}
                </label>
                <select
                  value={data.financialInfo.monthlyRevenue}
                  onChange={(e) => handleInputChange('financialInfo', 'monthlyRevenue', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">{t('onboarding.step1.financial.revenue_choose')}</option>
                  <option value="below-1000">{t('onboarding.step1.financial.revenue_below_1000')}</option>
                  <option value="1000-5000">{t('onboarding.step1.financial.revenue_1000_5000')}</option>
                  <option value="5000-10000">{t('onboarding.step1.financial.revenue_5000_10000')}</option>
                  <option value="above-10000">{t('onboarding.step1.financial.revenue_above_10000')}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('onboarding.step1.financial.bank_name')}
                </label>
                <select
                  value={data.financialInfo.bankName}
                  onChange={(e) => handleInputChange('financialInfo', 'bankName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">{t('onboarding.step1.financial.bank_choose')}</option>
                  <option value="maybank">Maybank</option>
                  <option value="cimb">CIMB Bank</option>
                  <option value="public-bank">Public Bank</option>
                  <option value="rhb">RHB Bank</option>
                  <option value="hong-leong">Hong Leong Bank</option>
                  <option value="ambank">AmBank</option>
                  <option value="bsn">Bank Simpanan Nasional</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('onboarding.step1.financial.bank_account')}
                </label>
                <input
                  type="text"
                  value={data.financialInfo.bankAccount}
                  onChange={(e) => handleInputChange('financialInfo', 'bankAccount', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={t('onboarding.step1.financial.bank_account_placeholder')}
                />
              </div>
            </div>
          </div>
        )}


      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-6">
        <div className="text-sm text-gray-500">
          {t('onboarding.progress_saved')}
        </div>

        <Button
          onClick={onNext}
          disabled={!isFormValid()}
          size="lg"
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
        >
          {t('onboarding.next')}
        </Button>
      </div>
    </div>
  )
}
