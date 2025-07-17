'use client'

import { useState } from 'react'
import { Upload, Camera, FileText, User, Building, DollarSign, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui'

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
      title: 'Muat Naik Dokumen',
      subtitle: 'Upload Documents',
      icon: FileText,
      color: 'purple'
    },
    {
      id: 'ekyc' as const,
      title: 'E-KYC (Pengenalan Diri)',
      subtitle: 'Personal Identification',
      icon: User,
      color: 'blue'
    },
    {
      id: 'business' as const,
      title: 'Maklumat Perniagaan',
      subtitle: 'Business Information',
      icon: Building,
      color: 'green'
    },
    {
      id: 'financial' as const,
      title: 'Maklumat Kewangan',
      subtitle: 'Financial Information',
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
              Pilih Fail • Choose File
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
          Isi Maklumat Diperlukan
        </h2>
        <p className="text-gray-600 mt-2">
          Fill in Required Information • Sila isi semua maklumat dengan betul
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
              Muat Naik Dokumen • Upload Documents
            </h3>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start">
                <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 mr-2" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium">Petua • Tips:</p>
                  <ul className="mt-1 list-disc list-inside space-y-1">
                    <li>Pastikan gambar jelas dan tidak kabur • Ensure images are clear and not blurry</li>
                    <li>Format yang diterima: JPG, PNG, PDF • Accepted formats: JPG, PNG, PDF</li>
                    <li>Saiz maksimum: 5MB setiap fail • Maximum size: 5MB per file</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FileUploadComponent
                label="Kad Pengenalan (Depan) • IC Front"
                field="icFront"
                description="Muka depan kad pengenalan • Front side of IC"
              />

              <FileUploadComponent
                label="Kad Pengenalan (Belakang) • IC Back"
                field="icBack"
                description="Muka belakang kad pengenalan • Back side of IC"
              />

              <div className="md:col-span-2">
                <FileUploadComponent
                  label="Lesen Perniagaan (Pilihan) • Business License (Optional)"
                  field="businessLicense"
                  description="Sijil pendaftaran perniagaan jika ada • Business registration certificate if available"
                />
              </div>
            </div>
          </div>
        )}

        {activeSection === 'ekyc' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <User className="w-5 h-5 mr-2 text-blue-600" />
              E-KYC (Pengenalan Diri) • Personal Identification
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nama Penuh • Full Name *
                </label>
                <input
                  type="text"
                  value={data.ekyc.fullName}
                  onChange={(e) => handleInputChange('ekyc', 'fullName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Contoh: Ahmad bin Ali"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  No. Kad Pengenalan • IC Number *
                </label>
                <input
                  type="text"
                  value={data.ekyc.icNumber}
                  onChange={(e) => handleInputChange('ekyc', 'icNumber', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Contoh: 901234-56-7890"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  No. Telefon • Phone Number *
                </label>
                <input
                  type="tel"
                  value={data.ekyc.phoneNumber}
                  onChange={(e) => handleInputChange('ekyc', 'phoneNumber', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Contoh: 012-345-6789"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Emel • Email *
                </label>
                <input
                  type="email"
                  value={data.ekyc.email}
                  onChange={(e) => handleInputChange('ekyc', 'email', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Contoh: ahmad@email.com"
                />
              </div>
            </div>
          </div>
        )}

        {activeSection === 'business' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Building className="w-5 h-5 mr-2 text-green-600" />
              Maklumat Perniagaan • Business Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nama Perniagaan • Business Name *
                </label>
                <input
                  type="text"
                  value={data.businessInfo.businessName}
                  onChange={(e) => handleInputChange('businessInfo', 'businessName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Contoh: Warung Mak Kiah"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Jenis Perniagaan • Business Type *
                </label>
                <select
                  value={data.businessInfo.businessType}
                  onChange={(e) => handleInputChange('businessInfo', 'businessType', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Pilih jenis • Choose type</option>
                  <option value="warung">Warung</option>
                  <option value="kedai">Kedai</option>
                  <option value="restoran">Restoran</option>
                  <option value="online">Jualan Online</option>
                  <option value="lain">Lain-lain</option>
                </select>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Alamat Perniagaan • Business Address *
                </label>
                <textarea
                  value={data.businessInfo.address}
                  onChange={(e) => handleInputChange('businessInfo', 'address', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Contoh: No. 123, Jalan Utama, Taman Bahagia, 12345 Kuala Lumpur"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  No. Pendaftaran (jika ada) • Registration Number (if any)
                </label>
                <input
                  type="text"
                  value={data.businessInfo.registrationNumber}
                  onChange={(e) => handleInputChange('businessInfo', 'registrationNumber', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Contoh: SSM123456789"
                />
              </div>
            </div>
          </div>
        )}

        {activeSection === 'financial' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <DollarSign className="w-5 h-5 mr-2 text-yellow-600" />
              Maklumat Kewangan • Financial Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pendapatan Bulanan • Monthly Revenue *
                </label>
                <select
                  value={data.financialInfo.monthlyRevenue}
                  onChange={(e) => handleInputChange('financialInfo', 'monthlyRevenue', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Pilih julat • Choose range</option>
                  <option value="below-1000">Bawah RM1,000 • Below RM1,000</option>
                  <option value="1000-5000">RM1,000 - RM5,000</option>
                  <option value="5000-10000">RM5,000 - RM10,000</option>
                  <option value="above-10000">Atas RM10,000 • Above RM10,000</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nama Bank • Bank Name *
                </label>
                <select
                  value={data.financialInfo.bankName}
                  onChange={(e) => handleInputChange('financialInfo', 'bankName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Pilih bank • Choose bank</option>
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
                  No. Akaun Bank • Bank Account Number *
                </label>
                <input
                  type="text"
                  value={data.financialInfo.bankAccount}
                  onChange={(e) => handleInputChange('financialInfo', 'bankAccount', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Contoh: 1234567890123"
                />
              </div>
            </div>
          </div>
        )}


      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-6">
        <div className="text-sm text-gray-500">
          Kemajuan akan disimpan secara automatik • Progress is saved automatically
        </div>
        
        <Button
          onClick={onNext}
          disabled={!isFormValid()}
          size="lg"
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
        >
          Seterusnya • Next →
        </Button>
      </div>
    </div>
  )
}
