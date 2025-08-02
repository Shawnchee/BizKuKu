'use client'

import React from 'react'
import { Check, ArrowLeft, Info, Download, FileText } from 'lucide-react'
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
  const { t, language } = useLanguage()

  const handleSSMToggle = () => {
    onUpdate({
      ssmApplication: !data.ssmApplication
    })
  }

  const isFormValid = () => {
    return data.ssmApplication
  }

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
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <Check className="w-5 h-5 text-green-600 mr-2" />
                    <span className="text-green-800 font-medium">
                      {t('onboarding.step2.great_help')}
                    </span>
                  </div>
                </div>

                {/* SSM Certificate Download Section */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <div className="text-center space-y-4">
                    <div className="flex items-center justify-center space-x-2">
                      <FileText className="w-6 h-6 text-blue-600" />
                      <h4 className="text-lg font-semibold text-blue-900">
                        {language === 'ms' ? 'Sijil SSM Anda' : 'Your SSM Certificate'}
                      </h4>
                    </div>
                    
                    <p className="text-sm text-blue-800">
                      {language === 'ms' 
                        ? 'Sijil pendaftaran perniagaan anda telah diluluskan dan sedia untuk dimuat turun.'
                        : 'Your business registration certificate has been approved and is ready for download.'
                      }
                    </p>

                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <div className="space-y-2 text-sm text-gray-700">
                        <div><strong>{language === 'ms' ? 'Nama Perniagaan:' : 'Business Name:'}</strong> PERNIAGAAN TERUS MAJU</div>
                        <div><strong>{language === 'ms' ? 'No. Pendaftaran:' : 'Registration No.:'}</strong> 201934234321 (RT0069300-M)</div>
                        <div><strong>{language === 'ms' ? 'Tarikh Pendaftaran:' : 'Registration Date:'}</strong> 02 MARCH 2023</div>
                        <div><strong>{language === 'ms' ? 'Tarikh Luput:' : 'Expiry Date:'}</strong> 02 MARCH 2025</div>
                      </div>
                    </div>

                    <Button
                      onClick={downloadSSMCertificate}
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2"
                    >
                      <Download className="w-4 h-4" />
                      <span>{language === 'ms' ? 'Muat Turun Sijil SSM' : 'Download SSM Certificate'}</span>
                    </Button>
                  </div>
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
