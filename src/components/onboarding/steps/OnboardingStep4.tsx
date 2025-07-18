'use client'

import { useState } from 'react'
import { Building, CheckCircle, Shield, Clock, FileCheck, QrCode, AlertCircle, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui'

interface Step4Data {
  selectedBank: string
  ssmConsentGiven: boolean
  qrRequestSubmitted: boolean
  qrStatus: 'pending' | 'processing' | 'ready' | 'failed'
  qrRequestDate?: string
  estimatedReadyDate?: string
  merchantQrCode?: string
}

interface OnboardingStep4Props {
  data: Step4Data
  onUpdate: (data: Partial<Step4Data>) => void
  onPrevious: () => void
  onComplete: () => void
}

const banks = [
  {
    id: 'maybank',
    name: 'Maybank',
    logo: '🏦',
    description: 'Malaysia\'s largest bank',
    processingDays: '3-5 hari bekerja • 3-5 working days'
  },
  {
    id: 'cimb',
    name: 'CIMB Bank',
    logo: '🏦',
    description: 'Leading ASEAN universal bank',
    processingDays: '2-4 hari bekerja • 2-4 working days'
  },
  {
    id: 'public-bank',
    name: 'Public Bank',
    logo: '🏦',
    description: 'Trusted by millions',
    processingDays: '3-5 hari bekerja • 3-5 working days'
  },
  {
    id: 'rhb',
    name: 'RHB Bank',
    logo: '🏦',
    description: 'Your partner in progress',
    processingDays: '2-3 hari bekerja • 2-3 working days'
  },
  {
    id: 'hong-leong',
    name: 'Hong Leong Bank',
    logo: '🏦',
    description: 'The Caring Bank',
    processingDays: '3-4 hari bekerja • 3-4 working days'
  },
  {
    id: 'ambank',
    name: 'AmBank',
    logo: '🏦',
    description: 'Helping you prosper',
    processingDays: '4-6 hari bekerja • 4-6 working days'
  }
]

export function OnboardingStep4({ data, onUpdate, onPrevious, onComplete }: OnboardingStep4Props) {
  // Determine initial section based on current data state
  const getInitialSection = () => {
    if (data.qrRequestSubmitted) return 'status'
    if (data.ssmConsentGiven) return 'status'
    if (data.selectedBank) return 'consent'
    return 'bank'
  }

  const [activeSection, setActiveSection] = useState<'bank' | 'consent' | 'status'>(getInitialSection())
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleBankSelection = (bankId: string) => {
    onUpdate({ selectedBank: bankId })
    if (!data.ssmConsentGiven) {
      setActiveSection('consent')
    }
  }

  const handleConsentSubmit = () => {
    onUpdate({ ssmConsentGiven: true })
    setActiveSection('status')
    // Automatically submit QR request after consent
    handleQrRequest()
  }

  const handleQrRequest = async () => {
    setIsSubmitting(true)

    // Simulate QR request submission
    await new Promise(resolve => setTimeout(resolve, 2000))

    const requestDate = new Date().toISOString()
    const estimatedDate = new Date()
    estimatedDate.setDate(estimatedDate.getDate() + 4) // 4 days from now

    onUpdate({
      qrRequestSubmitted: true,
      qrStatus: 'processing',
      qrRequestDate: requestDate,
      estimatedReadyDate: estimatedDate.toISOString()
    })

    setIsSubmitting(false)
  }

  const isFormValid = () => {
    return data.selectedBank && data.ssmConsentGiven && data.qrRequestSubmitted && data.qrStatus === 'processing'
  }

  const getSelectedBank = () => {
    return banks.find(bank => bank.id === data.selectedBank)
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('ms-MY', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">
          QR Merchant
        </h2>
        <p className="text-gray-600 mt-2">
          Merchant QR Setup • Dapatkan QR untuk terima bayaran dari pelanggan
        </p>
      </div>

      {/* Progress Indicator */}
      <div className="flex items-center justify-center space-x-2 mb-8">
        <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
          activeSection === 'bank' ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'
        }`}>
          <Building className={`w-4 h-4 ${data.selectedBank ? 'text-green-600' : 'text-blue-600'}`} />
          <span className={`text-xs font-medium ${data.selectedBank ? 'text-green-600' : 'text-blue-600'}`}>
            1. Pilih Bank
          </span>
          {data.selectedBank && <CheckCircle className="w-4 h-4 text-green-600" />}
        </div>

        <div className={`w-6 h-0.5 ${data.selectedBank ? 'bg-green-500' : 'bg-gray-300'}`} />

        <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
          activeSection === 'consent' ? 'bg-purple-50 border border-purple-200' : 'bg-gray-50'
        }`}>
          <FileCheck className={`w-4 h-4 ${data.ssmConsentGiven ? 'text-green-600' : 'text-purple-600'}`} />
          <span className={`text-xs font-medium ${data.ssmConsentGiven ? 'text-green-600' : 'text-purple-600'}`}>
            2. Kebenaran SSM
          </span>
          {data.ssmConsentGiven && <CheckCircle className="w-4 h-4 text-green-600" />}
        </div>

        <div className={`w-6 h-0.5 ${data.ssmConsentGiven ? 'bg-green-500' : 'bg-gray-300'}`} />

        <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
          activeSection === 'status' ? 'bg-orange-50 border border-orange-200' : 'bg-gray-50'
        }`}>
          <QrCode className={`w-4 h-4 ${data.qrRequestSubmitted ? 'text-green-600' : 'text-orange-600'}`} />
          <span className={`text-xs font-medium ${data.qrRequestSubmitted ? 'text-green-600' : 'text-orange-600'}`}>
            3. QR Status
          </span>
          {data.qrRequestSubmitted && <CheckCircle className="w-4 h-4 text-green-600" />}
        </div>
      </div>

      {/* Form Content */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        {activeSection === 'bank' && (
          <div className="space-y-6">
            <div className="text-center">
              <Building className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900">
                Pilih Bank Utama • Choose Primary Bank
              </h3>
              <p className="text-gray-600 mt-2">
                Bank ini akan digunakan untuk terima bayaran dari pelanggan
              </p>
              <p className="text-sm text-gray-500">
                This bank will be used to receive payments from customers
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {banks.map((bank) => {
                const isSelected = data.selectedBank === bank.id
                
                return (
                  <button
                    key={bank.id}
                    onClick={() => handleBankSelection(bank.id)}
                    className={`p-6 rounded-lg border-2 transition-all text-left ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50 shadow-md'
                        : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-3xl">{bank.logo}</span>
                      {isSelected && (
                        <CheckCircle className="w-6 h-6 text-blue-600" />
                      )}
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-1">{bank.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">{bank.description}</p>
                    <p className="text-xs text-gray-500">Masa pemprosesan: {bank.processingDays}</p>
                  </button>
                )
              })}
            </div>

            {data.selectedBank && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                  <span className="text-green-800 font-medium">
                    Bank dipilih: {getSelectedBank()?.name}
                  </span>
                </div>
                <p className="text-sm text-green-700 mt-1">
                  Seterusnya, berikan kebenaran untuk berkongsi ID SSM • Next, give consent to share SSM ID
                </p>
              </div>
            )}
          </div>
        )}

        {activeSection === 'consent' && (
          <div className="space-y-6">
            <div className="text-center">
              <FileCheck className="w-16 h-16 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900">
                Kebenaran Berkongsi ID SSM • SSM ID Sharing Consent
              </h3>
              <p className="text-gray-600 mt-2">
                Berikan kebenaran untuk berkongsi ID SSM dengan bank untuk mendapatkan QR merchant
              </p>
              <p className="text-sm text-gray-500">
                Give consent to share SSM ID with bank to get merchant QR
              </p>
            </div>

            {!data.ssmConsentGiven ? (
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div className="text-sm text-blue-800">
                      <p className="font-medium mb-2">Maklumat yang akan dikongsi • Information to be shared:</p>
                      <ul className="space-y-1 list-disc list-inside">
                        <li>Nombor pendaftaran SSM • SSM registration number</li>
                        <li>Nama perniagaan • Business name</li>
                        <li>Alamat perniagaan • Business address</li>
                        <li>Jenis perniagaan • Business type</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div className="text-sm text-yellow-800">
                      <p className="font-medium mb-1">Penting • Important:</p>
                      <p>Bank akan menggunakan maklumat ini untuk memproses permohonan QR merchant anda. Maklumat ini akan digunakan secara selamat dan mengikut dasar privasi bank.</p>
                      <p className="text-xs mt-1">Bank will use this information to process your merchant QR application. This information will be used securely according to the bank's privacy policy.</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg">
                  <input
                    type="checkbox"
                    id="ssmConsent"
                    className="mt-1 w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    onChange={(e) => {
                      if (e.target.checked) {
                        handleConsentSubmit()
                      }
                    }}
                  />
                  <label htmlFor="ssmConsent" className="text-sm text-gray-700 cursor-pointer">
                    <span className="font-medium">Saya bersetuju untuk berkongsi maklumat SSM saya dengan {getSelectedBank()?.name} untuk tujuan mendapatkan QR merchant.</span>
                    <br />
                    <span className="text-xs text-gray-500">I agree to share my SSM information with {getSelectedBank()?.name} for the purpose of obtaining merchant QR.</span>
                  </label>
                </div>
              </div>
            ) : (
              <div className="text-center space-y-4">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-green-800 mb-2">
                    Kebenaran Diberikan! • Consent Given!
                  </h4>
                  <p className="text-green-700">
                    Permohonan QR merchant anda sedang diproses
                  </p>
                  <p className="text-sm text-green-600">
                    Your merchant QR application is being processed
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {activeSection === 'status' && (
          <div className="space-y-6">
            <div className="text-center">
              <QrCode className="w-16 h-16 text-orange-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900">
                Status QR Merchant • Merchant QR Status
              </h3>
              <p className="text-gray-600 mt-2">
                Semak status permohonan QR merchant anda
              </p>
              <p className="text-sm text-gray-500">
                Check your merchant QR application status
              </p>
            </div>

            <div className="space-y-4">
              {data.qrStatus === 'processing' && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                  </div>
                  <div className="text-center">
                    <h4 className="text-lg font-semibold text-blue-800 mb-2">
                      Sedang Diproses • Processing
                    </h4>
                    <p className="text-blue-700 mb-2">
                      Permohonan QR merchant anda sedang diproses oleh {getSelectedBank()?.name}
                    </p>
                    <p className="text-sm text-blue-600">
                      Your merchant QR application is being processed by {getSelectedBank()?.name}
                    </p>
                  </div>
                </div>
              )}

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Tarikh Permohonan • Application Date</p>
                    <p className="text-gray-900">{formatDate(data.qrRequestDate)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Anggaran Siap • Estimated Ready</p>
                    <p className="text-gray-900">{formatDate(data.estimatedReadyDate)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Bank</p>
                    <p className="text-gray-900">{getSelectedBank()?.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Masa Pemprosesan • Processing Time</p>
                    <p className="text-gray-900">{getSelectedBank()?.processingDays}</p>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div className="text-sm text-yellow-800">
                    <p className="font-medium mb-1">Langkah Seterusnya • Next Steps:</p>
                    <ul className="space-y-1 list-disc list-inside">
                      <li>Tunggu email pengesahan dari bank • Wait for confirmation email from bank</li>
                      <li>QR merchant akan dihantar dalam {getSelectedBank()?.processingDays}</li>
                      <li>Anda boleh mula terima bayaran setelah QR siap • You can start accepting payments once QR is ready</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
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
          Kembali • Back
        </Button>
        
        <Button
          onClick={onComplete}
          disabled={!isFormValid()}
          size="lg"
          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
        >
          Selesai • Complete Setup 🎉
        </Button>
      </div>
    </div>
  )
}
