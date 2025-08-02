'use client'

import { CreditCard, QrCode, Building2, Calendar, Clock, X, Download, FileText, CheckCircle } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { useState } from 'react'

interface OnboardingProgressBarProps {
  className?: string
}

interface ApplicationProgress {
  id: string
  title: string
  titleMs: string
  icon: any
  status: 'pending' | 'processing' | 'approved' | 'rejected' | 'completed'
  applicationDate: string
  lastUpdated: string
  color: string
  bgColor: string
  linkTo: string
  description: string
  descriptionMs: string
}

export default function OnboardingProgressBar({ className = '' }: OnboardingProgressBarProps) {
  const { language } = useLanguage()
  const [showSSMModal, setShowSSMModal] = useState(false)

  const downloadSSMCertificate = () => {
    // Create mock SSM certificate data
    const certificateData = {
      businessName: "PERNIAGAAN TERUS MAJU",
      registrationNumber: "201934234321 (RT0069300-M)",
      registrationDate: "02 MARCH 2023",
      expiryDate: "02 MARCH 2025",
      businessType: "Sole Proprietorship",
      address: "12, JALAN LAKSAMANA 2, TMN.UNGKU TUN AMINAH, SKUDAI, TAMAN SELASIH, 81300 JOHOR BAHRU JOHOR",
      branchAddress: "15 & 17,JALAN CYBER 16,SENAI COMMERCIAL PARK,SENAI, 81400 SENAI JOHOR"
    }

    // Generate certificate HTML content
    const certificateHTML = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>SSM Certificate of Registration</title>
    <style>
        body { 
            font-family: Arial, sans-serif; 
            max-width: 800px; 
            margin: 0 auto; 
            padding: 40px; 
            background: white;
        }
        .header { 
            text-align: center; 
            margin-bottom: 30px; 
            border: 3px solid #000;
            padding: 20px;
        }
        .logo { 
            font-size: 24px; 
            font-weight: bold; 
            color: #4338ca;
            margin-bottom: 10px;
        }
        .subtitle {
            font-size: 12px;
            margin-bottom: 20px;
        }
        .form-title {
            font-weight: bold;
            margin: 20px 0;
        }
        .certificate-title {
            font-size: 18px;
            font-weight: bold;
            text-align: center;
            margin: 30px 0;
        }
        .business-name {
            font-size: 20px;
            font-weight: bold;
            text-align: center;
            margin: 20px 0;
        }
        .reg-number {
            font-size: 16px;
            font-weight: bold;
            text-align: center;
            margin: 15px 0;
        }
        .content {
            line-height: 1.6;
            margin: 20px 0;
            text-align: justify;
        }
        .signature-section {
            margin-top: 50px;
            display: flex;
            justify-content: space-between;
            align-items: end;
        }
        .signature {
            text-align: center;
        }
        .date {
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="logo">SSM</div>
        <div class="subtitle">
            SURUHANJAYA SYARIKAT MALAYSIA<br>
            COMPANIES COMMISSION OF MALAYSIA<br>
            (Agensi di bawah Kementangan Dalam Negeri)
        </div>
        <div class="form-title">FORM D (RULE 13)</div>
    </div>

    <div class="certificate-title">
        CERTIFICATE OF REGISTRATION<br>
        THE REGISTRATION OF BUSINESSES ACT 1956<br>
        (ACT 197)
    </div>

    <div class="content">
        This is to certify that the Business carried on under the name
    </div>

    <div class="business-name">${certificateData.businessName}</div>
    <div class="reg-number">REGISTRATION NO. : ${certificateData.registrationNumber}</div>

    <div class="content">
        has this day been registered until <strong>${certificateData.expiryDate}</strong> in accordance with the 
        provisions of the Registration of Business Act 1956, with its principle place 
        of business at <strong>${certificateData.address}</strong> and branch at:-
    </div>

    <div class="content">
        <strong>${certificateData.branchAddress}</strong>
    </div>

    <div class="date">
        Dated at <strong>JOHOR BAHRU</strong> this <strong>${certificateData.registrationDate}</strong>.
    </div>

    <div class="signature-section">
        <div class="signature">
            <div style="margin-bottom: 50px;"></div>
            <div style="border-top: 1px solid #000; width: 200px; margin: 0 auto;"></div>
            <div style="margin-top: 10px;">
                <strong>DATUK NOR AZIMAH ABDUL AZIZ</strong><br>
                Registrar of Businesses<br>
                Peninsular of Malaysia
            </div>
        </div>
    </div>

    <div style="margin-top: 40px; text-align: center; font-size: 12px; color: #666;">
        This certificate is generated from MYDATA SSM Services as at ${new Date().toLocaleDateString()}<br>
        Certificate Reference: MY2108171111259
    </div>
</body>
</html>
    `

    // Create and download the file
    const blob = new Blob([certificateHTML], { type: 'text/html' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `SSM_Certificate_${certificateData.businessName.replace(/\s+/g, '_')}.html`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  }

  // Mock application data - in real app, this would come from API
  const applications: ApplicationProgress[] = [
    {
      id: 'ssm-passport',
      title: 'SSM Passport Application',
      titleMs: 'Permohonan Pasport SSM',
      icon: Building2,
      status: 'completed',
      applicationDate: '2024-01-10',
      lastUpdated: '2024-01-15',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
      linkTo: '', // Remove direct link
      description: 'View your SSM passport application details and download certificate',
      descriptionMs: 'Lihat butiran permohonan pasport SSM anda dan muat turun sijil'
    },
    {
      id: 'qr-merchant',
      title: 'RHB QR Merchant Application',
      titleMs: 'Permohonan QR Pedagang RHB',
      icon: QrCode,
      status: 'pending',
      applicationDate: '2024-01-20',
      lastUpdated: '2024-01-30',
      color: 'from-orange-500 to-amber-500',
      bgColor: 'bg-orange-50',
      linkTo: '/onboarding?step=4',
      description: 'Monitor your RHB QR merchant setup and activation process',
      descriptionMs: 'Pantau setup QR pedagang RHB anda dan proses pengaktifan'
    },
    {
      id: 'maybank-qr-merchant',
      title: 'Maybank QR Merchant Application',
      titleMs: 'Permohonan QR Pedagang Maybank',
      icon: CreditCard,
      status: 'completed',
      applicationDate: '2024-01-25',
      lastUpdated: '2024-01-28',
      color: 'from-blue-500 to-indigo-500',
      bgColor: 'bg-blue-50',
      linkTo: '/maybank-qr-status',
      description: 'Apply for Maybank QR merchant account with competitive rates',
      descriptionMs: 'Mohon akaun pedagang QR Maybank dengan kadar yang kompetitif'
    }
  ]

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
      case 'completed':
        return language === 'ms' ? 'Selesai' : 'Completed'
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
      case 'completed':
        return 'bg-green-100 text-green-700'
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
    }).replace(/,/g, '') // Remove commas for cleaner display
  }

  return (
    <div className={`space-y-6 ${className}`}>


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

        <div className="space-y-4">
          {applications.map((app) => {
            const Icon = app.icon
            const handleClick = () => {
              if (app.id === 'ssm-passport') {
                setShowSSMModal(true)
              } else if (app.linkTo) {
                window.location.href = app.linkTo
              }
            }
            
            return (
              <div
                key={app.id}
                onClick={handleClick}
                className={`block w-full ${app.bgColor} rounded-xl p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer`}
              >
                {/* Header Section */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className={`w-12 h-12 bg-gradient-to-br ${app.color} rounded-xl flex items-center justify-center shadow-md flex-shrink-0`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-gray-900 mb-1">
                        {language === 'ms' ? app.titleMs : app.title}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {language === 'ms' ? app.descriptionMs : app.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex-shrink-0 ml-4">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                      {getStatusText(app.status)}
                    </span>
                  </div>
                </div>

                {/* Date Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2 text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm font-medium">{language === 'ms' ? 'Tarikh Permohonan' : 'Application Date'}</span>
                    </div>
                    <p className="text-base font-semibold text-gray-900 ml-6">
                      {formatDate(app.applicationDate)}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2 text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm font-medium">{language === 'ms' ? 'Terakhir Dikemas Kini' : 'Last Updated'}</span>
                    </div>
                    <p className="text-base font-semibold text-gray-900 ml-6">
                      {formatDate(app.lastUpdated)}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* SSM Modal */}
      {showSSMModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-6 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">
                      {language === 'ms' ? 'Permohonan SSM' : 'SSM Application'}
                    </h3>
                    <p className="text-green-100 text-sm">
                      {language === 'ms' ? 'Status: Selesai' : 'Status: Complete'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowSSMModal(false)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Success Message */}
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">
                  {language === 'ms' ? 'Permohonan SSM Selesai!' : 'SSM Application Complete!'}
                </h4>
                <p className="text-gray-600 text-sm">
                  {language === 'ms' 
                    ? 'Tahniah! Pendaftaran perniagaan anda telah berjaya diluluskan.'
                    : 'Congratulations! Your business registration has been successfully approved.'
                  }
                </p>
              </div>

              {/* SSM Details */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h5 className="font-semibold text-gray-900 mb-3">
                  {language === 'ms' ? 'Butiran SSM' : 'SSM Details'}
                </h5>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{language === 'ms' ? 'Nama Perniagaan:' : 'Business Name:'}</span>
                    <span className="font-medium text-gray-900">PERNIAGAAN TERUS MAJU</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{language === 'ms' ? 'No. SSM:' : 'SSM ID:'}</span>
                    <span className="font-medium text-gray-900">201934234321 (RT0069300-M)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{language === 'ms' ? 'Tarikh Luput:' : 'Expiry Date:'}</span>
                    <span className="font-medium text-gray-900">02 March 2025</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{language === 'ms' ? 'Status:' : 'Status:'}</span>
                    <span className="font-medium text-green-600">{language === 'ms' ? 'Aktif' : 'Active'}</span>
                  </div>
                </div>
              </div>

              {/* Download Button */}
              <button
                onClick={downloadSSMCertificate}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <Download className="w-5 h-5" />
                <span>{language === 'ms' ? 'Muat Turun Sijil SSM' : 'Download SSM Certificate'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
