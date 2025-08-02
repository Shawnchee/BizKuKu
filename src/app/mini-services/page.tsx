'use client'

import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import HoverCard from '@/components/ui/HoverCard'
// import Iridescence from '@/components/backgrounds/Iridescence'
import GradientBackground from "@/components/backgrounds/GradientBackground"


import {
  FileText, Receipt, Calculator, HelpCircle,
  ShoppingCart, Package, Gift, Truck,
  Globe, Calendar, Clock,
  FileCheck, Shield,
  X, ChevronRight, Plus,
  Heart, TrendingUp
} from 'lucide-react'

interface PreviewItem {
  type: 'image' | 'text' | 'file' | 'feature'
  label: string
  content: string | React.ReactNode
  icon?: React.ComponentType<any>
}

interface Service {
  id: string
  title: string
  description: string
  icon: any
  category: string
  color: string
  bgColor: string
  outputs: string[]
  previews: PreviewItem[]
  priority?: 'high' | 'medium' | 'low'
  isPopular?: boolean
  onboardingSteps: {
    title: string
    component: React.ReactNode
  }[]
}

export default function MiniServices() {
  const { t } = useLanguage()
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)

  const services: Service[] = [
    {
      id: 'e-invoicing',
      title: 'mini_services.einvoicing.title',
      description: 'mini_services.einvoicing.description',
      icon: FileText,
      category: 'financial',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      priority: 'high',
      isPopular: true,
      outputs: ['mini_services.output.pdf_invoice', 'mini_services.output.email_delivery'],
      previews: [
        {
          type: 'text',
          label: 'mini_services.preview.sample_invoice_header',
          content: 'mini_services.sample.invoice_header',
          icon: FileText
        },
        {
          type: 'feature',
          label: 'mini_services.preview.myinvois_compliance',
          content: 'mini_services.features.myinvois_compliance'
        },
        {
          type: 'file',
          label: 'mini_services.preview.export_formats',
          content: 'mini_services.file.invoice_001'
        }
      ],
      onboardingSteps: [
        {
          title: 'mini_services.einvoicing.step1.title',
          component: (
            <div className="space-y-4">
              <input placeholder={t('mini_services.form.business_name')} className="w-full p-3 border rounded-lg" />
              <input placeholder={t('mini_services.form.ssm_registration')} className="w-full p-3 border rounded-lg" />
              <input placeholder={t('mini_services.form.tax_id')} className="w-full p-3 border rounded-lg" />
              <textarea placeholder={t('mini_services.form.business_address')} className="w-full p-3 border rounded-lg h-20" />
            </div>
          )
        },
        {
          title: 'mini_services.einvoicing.step2.title',
          component: (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border-2 border-blue-500 rounded-lg bg-blue-50">
                  <div className="text-sm font-medium">{t('mini_services.invoice.professional')}</div>
                </div>
                <div className="p-4 border rounded-lg hover:border-blue-300">
                  <div className="text-sm font-medium">{t('mini_services.invoice.simple')}</div>
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-xs text-gray-600">{t('mini_services.preview_text.invoice_template')}</div>
              </div>
            </div>
          )
        }
      ]
    },
    {
      id: 'digital-receipt',
      title: 'mini_services.digital_receipt.title',
      description: 'mini_services.digital_receipt.description',
      icon: Receipt,
      category: 'financial',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      priority: 'high',
      isPopular: true,
      outputs: ['mini_services.output.pdf_receipt', 'mini_services.output.print_format', 'mini_services.output.email_copy'],
      previews: [
        {
          type: 'text',
          label: 'mini_services.preview.sample_receipt',
          content: 'mini_services.sample.receipt',
          icon: Receipt
        },
        {
          type: 'feature',
          label: 'mini_services.preview.features',
          content: 'mini_services.features.receipt_features'
        }
      ],
      onboardingSteps: [
        {
          title: 'mini_services.digital_receipt.step1.title',
          component: (
            <div className="space-y-4">
              <select className="w-full p-3 border rounded-lg">
                <option>{t('mini_services.receipt.standard')}</option>
                <option>{t('mini_services.receipt.detailed')}</option>
                <option>{t('mini_services.receipt.minimal')}</option>
              </select>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="gst" className="rounded" />
                <label htmlFor="gst">{t('mini_services.tax.include_gst')}</label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="sst" className="rounded" />
                <label htmlFor="sst">{t('mini_services.tax.include_sst')}</label>
              </div>
            </div>
          )
        }
      ]
    },
    {
      id: 'tax-calculator',
      title: 'mini_services.tax_calculator.title',
      description: 'mini_services.tax_calculator.description',
      icon: Calculator,
      category: 'financial',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      outputs: ['mini_services.output.tax_summary_pdf', 'mini_services.output.calculation_breakdown', 'mini_services.output.filing_checklist'],
      previews: [
        {
          type: 'text',
          label: 'mini_services.preview.tax_calculation_sample',
          content: 'mini_services.sample.tax_calculation',
          icon: Calculator
        },
        {
          type: 'feature',
          label: 'mini_services.preview.calculation_features',
          content: 'mini_services.features.tax_calculation'
        }
      ],
      onboardingSteps: [
        {
          title: 'mini_services.tax_calculator.step1.title',
          component: (
            <div className="space-y-4">
              <input placeholder={t('mini_services.form.annual_income')} className="w-full p-3 border rounded-lg" />
              <select className="w-full p-3 border rounded-lg">
                <option>{t('mini_services.business_type.individual')}</option>
                <option>{t('mini_services.business_type.married')}</option>
                <option>{t('mini_services.business_type.business')}</option>
              </select>
              <div className="p-4 bg-purple-50 rounded-lg">
                <div className="text-sm font-medium">{t('mini_services.status.estimated_tax')}</div>
              </div>
            </div>
          )
        }
      ]
    },
    {
      id: 'gst-helper',
      title: 'mini_services.gst_helper.title',
      description: 'mini_services.gst_helper.description',
      icon: HelpCircle,
      category: 'financial',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      outputs: ['mini_services.output.filing_forms', 'mini_services.output.calculation_sheet', 'mini_services.output.email_reminders'],
      previews: [
        {
          type: 'text',
          label: 'mini_services.preview.gst_return_sample',
          content: 'mini_services.sample.gst_return',
          icon: HelpCircle
        },
        {
          type: 'feature',
          label: 'mini_services.preview.helper_features',
          content: 'mini_services.features.gst_helper'
        }
      ],
      onboardingSteps: [
        {
          title: 'mini_services.gst_helper.step1.title',
          component: (
            <div className="space-y-4">
              <select className="w-full p-3 border rounded-lg">
                <option>{t('mini_services.tax.gst_registered')}</option>
                <option>{t('mini_services.tax.sst_registered')}</option>
                <option>{t('mini_services.tax.not_registered')}</option>
              </select>
              <div className="p-4 bg-orange-50 rounded-lg">
                <div className="text-sm font-medium">{t('mini_services.status.next_filing')}</div>
                <div className="text-xs text-gray-600">{t('mini_services.status.set_reminder')}</div>
              </div>
            </div>
          )
        }
      ]
    },

    {
      id: 'mobile-pos',
      title: 'mini_services.mobile_pos.title',
      description: 'mini_services.mobile_pos.description',
      icon: ShoppingCart,
      category: 'operations',
      color: 'from-indigo-500 to-indigo-600',
      bgColor: 'bg-indigo-50',
      outputs: ['mini_services.output.sales_reports', 'mini_services.output.receipt_prints', 'mini_services.output.daily_summary'],
      previews: [
        {
          type: 'text',
          label: 'mini_services.preview.pos_interface',
          content: 'mini_services.sample.pos_interface',
          icon: ShoppingCart
        }
      ],
      onboardingSteps: [
        {
          title: 'mini_services.mobile_pos.step1.title',
          component: (
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <input placeholder={t('mini_services.form.product_name')} className="flex-1 p-3 border rounded-lg" />
                <input placeholder={t('mini_services.form.price')} className="w-24 p-3 border rounded-lg" />
                <button className="p-3 bg-indigo-500 text-white rounded-lg">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span>Nasi Lemak</span>
                  <span>RM 5.00</span>
                </div>
              </div>
            </div>
          )
        },
        {
          title: 'mini_services.mobile_pos.step2.title',
          component: (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border-2 border-indigo-500 rounded-lg bg-indigo-50 text-center">
                  <div className="text-sm font-medium">{t('mini_services.payment.cash')}</div>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <div className="text-sm font-medium">{t('mini_services.payment.qr_pay')}</div>
                </div>
              </div>
            </div>
          )
        }
      ]
    },
    {
      id: 'inventory',
      title: 'mini_services.inventory.title',
      description: 'mini_services.inventory.description',
      icon: Package,
      category: 'operations',
      color: 'from-teal-500 to-teal-600',
      bgColor: 'bg-teal-50',
      outputs: ['mini_services.output.stock_reports', 'mini_services.output.alert_notifications'],
      previews: [{ type: 'text', label: 'Sample', content: 'mini_services.preview_text.inventory', icon: Package }],
      onboardingSteps: [
        {
          title: 'mini_services.inventory.step1.title',
          component: (
            <div className="space-y-4">
              <input placeholder={t('mini_services.form.item_name')} className="w-full p-3 border rounded-lg" />
              <div className="grid grid-cols-2 gap-4">
                <input placeholder={t('mini_services.form.current_stock')} className="p-3 border rounded-lg" />
                <input placeholder={t('mini_services.form.minimum_alert')} className="p-3 border rounded-lg" />
              </div>
            </div>
          )
        }
      ]
    },
    {
      id: 'loyalty-program',
      title: 'mini_services.loyalty_program.title',
      description: 'mini_services.loyalty_program.description',
      icon: Gift,
      category: 'operations',
      color: 'from-pink-500 to-pink-600',
      bgColor: 'bg-pink-50',
      outputs: ['mini_services.output.digital_cards', 'mini_services.output.customer_database'],
      previews: [{ type: 'text', label: 'Sample', content: 'mini_services.preview_text.loyalty_program', icon: Gift }],
      onboardingSteps: [
        {
          title: 'mini_services.loyalty_program.step1.title',
          component: (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input placeholder={t('mini_services.placeholder.stamps_needed')} className="p-3 border rounded-lg" />
                <input placeholder={t('mini_services.placeholder.reward')} className="p-3 border rounded-lg" />
              </div>
              <div className="p-4 bg-pink-50 rounded-lg">
                <div className="text-sm">{t('mini_services.status.preview_reward')}</div>
              </div>
            </div>
          )
        }
      ]
    },
    {
      id: 'delivery-service',
      title: 'mini_services.delivery_service.title',
      description: 'mini_services.delivery_service.description',
      icon: Truck,
      category: 'operations',
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'bg-yellow-50',
      outputs: ['mini_services.output.integration_setup', 'mini_services.output.tracking_links'],
      previews: [{ type: 'text', label: 'Sample', content: 'mini_services.preview_text.delivery_integration', icon: Truck }],
      onboardingSteps: [
        {
          title: 'mini_services.delivery_service.step1.title',
          component: (
            <div className="space-y-4">
              <div className="space-y-2">
                {[t('mini_services.delivery.grab'), t('mini_services.delivery.foodpanda'), t('mini_services.delivery.lalamove')].map(partner => (
                  <div key={partner} className="flex items-center space-x-2 p-3 border rounded-lg">
                    <input type="checkbox" />
                    <span>{partner}</span>
                    <span className="ml-auto text-sm text-gray-600">{t('mini_services.delivery.commission')}</span>
                  </div>
                ))}
              </div>
            </div>
          )
        }
      ]
    },

    // Digital Presence & Customer Management (3 services)
    {
      id: 'website-builder',
      title: 'mini_services.website_builder.title',
      description: 'mini_services.website_builder.description',
      icon: Globe,
      category: 'digital',
      color: 'from-cyan-500 to-cyan-600',
      bgColor: 'bg-cyan-50',
      outputs: ['mini_services.output.website_url', 'mini_services.output.mobile_responsive'],
      previews: [{ type: 'text', label: 'Sample', content: 'mini_services.preview_text.website', icon: Globe }],
      onboardingSteps: [
        {
          title: 'mini_services.website_builder.step1.title',
          component: (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border-2 border-cyan-500 rounded-lg bg-cyan-50">
                  <div className="text-sm font-medium">{t('mini_services.website.restaurant')}</div>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="text-sm font-medium">{t('mini_services.website.retail')}</div>
                </div>
              </div>
              <input placeholder={t('mini_services.form.business_name')} className="w-full p-3 border rounded-lg" />
              <textarea placeholder={t('mini_services.placeholder.about_us')} className="w-full p-3 border rounded-lg h-20" />
            </div>
          )
        }
      ]
    },
    {
      id: 'booking-system',
      title: 'mini_services.booking_system.title',
      description: 'mini_services.booking_system.description',
      icon: Calendar,
      category: 'digital',
      color: 'from-violet-500 to-violet-600',
      bgColor: 'bg-violet-50',
      outputs: ['mini_services.output.booking_confirmations', 'mini_services.output.calendar_sync'],
      previews: [{ type: 'text', label: 'Sample', content: 'mini_services.preview_text.booking_system', icon: Calendar }],
      onboardingSteps: [
        {
          title: 'mini_services.booking_system.step1.title',
          component: (
            <div className="space-y-4">
              <input placeholder={t('mini_services.form.service_name')} className="w-full p-3 border rounded-lg" />
              <div className="grid grid-cols-2 gap-4">
                <input placeholder={t('mini_services.form.duration_mins')} className="p-3 border rounded-lg" />
                <input placeholder={t('mini_services.form.price')} className="p-3 border rounded-lg" />
              </div>
              <select className="w-full p-3 border rounded-lg">
                <option>{t('mini_services.availability.9am_6pm')}</option>
                <option>{t('mini_services.availability.24_7')}</option>
                <option>{t('mini_services.availability.custom')}</option>
              </select>
            </div>
          )
        }
      ]
    },
    {
      id: 'appointment-scheduler',
      title: 'mini_services.appointment_scheduler.title',
      description: 'mini_services.appointment_scheduler.description',
      icon: Clock,
      category: 'digital',
      color: 'from-rose-500 to-rose-600',
      bgColor: 'bg-rose-50',
      outputs: ['mini_services.output.schedule_reports', 'mini_services.output.staff_calendars'],
      previews: [{ type: 'text', label: 'Sample', content: 'mini_services.preview_text.appointment_scheduler', icon: Clock }],
      onboardingSteps: [
        {
          title: 'mini_services.appointment_scheduler.step1.title',
          component: (
            <div className="space-y-4">
              <input placeholder={t('mini_services.form.staff_name')} className="w-full p-3 border rounded-lg" />
              <div className="grid grid-cols-2 gap-4">
                <input type="time" defaultValue="09:00" className="p-3 border rounded-lg" />
                <input type="time" defaultValue="17:00" className="p-3 border rounded-lg" />
              </div>
              <div className="flex flex-wrap gap-2">
                {[t('mini_services.days.mon'), t('mini_services.days.tue'), t('mini_services.days.wed'), t('mini_services.days.thu'), t('mini_services.days.fri'), t('mini_services.days.sat'), t('mini_services.days.sun')].map(day => (
                  <button key={day} className="px-3 py-1 border rounded bg-rose-50 text-sm">
                    {day}
                  </button>
                ))}
              </div>
            </div>
          )
        }
      ]
    },

    // Professional Services (2 services)
    {
      id: 'lhdn-filing',
      title: 'mini_services.lhdn_filing.title',
      description: 'mini_services.lhdn_filing.description',
      icon: FileCheck,
      category: 'professional',
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-50',
      outputs: ['mini_services.output.filed_returns', 'mini_services.output.confirmation_receipt'],
      previews: [{ type: 'text', label: 'Sample', content: 'mini_services.preview_text.lhdn_filing', icon: FileCheck }],
      onboardingSteps: [
        {
          title: 'mini_services.lhdn_filing.step1.title',
          component: (
            <div className="space-y-4">
              <div className="space-y-2">
                {[
                  t('mini_services.documents.form_be'),
                  t('mini_services.documents.ea_form'),
                  t('mini_services.documents.bank_statements'),
                  t('mini_services.documents.business_receipts')
                ].map(doc => (
                  <div key={doc} className="flex items-center space-x-2">
                    <input type="checkbox" />
                    <span className="text-sm">{doc}</span>
                  </div>
                ))}
              </div>
              <button className="w-full p-3 bg-emerald-500 text-white rounded-lg">
                {t('mini_services.action.start_filing')}
              </button>
            </div>
          )
        }
      ]
    },
    {
      id: 'insurance-quotes',
      title: 'mini_services.insurance_quotes.title',
      description: 'mini_services.insurance_quotes.description',
      icon: Shield,
      category: 'professional',
      color: 'from-slate-500 to-slate-600',
      bgColor: 'bg-slate-50',
      outputs: ['mini_services.output.quote_comparisons', 'mini_services.output.policy_documents'],
      previews: [{ type: 'text', label: 'Sample', content: 'mini_services.preview_text.insurance_quotes', icon: Shield }],
      onboardingSteps: [
        {
          title: 'mini_services.insurance_quotes.step1.title',
          component: (
            <div className="space-y-4">
              <select className="w-full p-3 border rounded-lg">
                <option>{t('mini_services.business_type.restaurant')}</option>
                <option>{t('mini_services.business_type.retail')}</option>
                <option>{t('mini_services.business_type.service')}</option>
                <option>{t('mini_services.business_type.manufacturing')}</option>
              </select>
              <input placeholder={t('mini_services.form.number_employees')} className="w-full p-3 border rounded-lg" />
              <input placeholder={t('mini_services.form.annual_revenue')} className="w-full p-3 border rounded-lg" />
              <div className="p-4 bg-slate-50 rounded-lg">
                <div className="text-sm font-medium">{t('mini_services.status.estimated_premium')}</div>
              </div>
            </div>
          )
        }
      ]
    }
  ]

  const categories = {
    financial: { name: 'mini_services.category.financial', color: 'text-blue-600' },
    operations: { name: 'mini_services.category.operations', color: 'text-indigo-600' },
    digital: { name: 'mini_services.category.digital', color: 'text-purple-600' },
    professional: { name: 'mini_services.category.professional', color: 'text-emerald-600' }
  }

  const selectedServiceData = services.find(s => s.id === selectedService)

  const handleServiceClick = (serviceId: string) => {
    setSelectedService(serviceId)
    setCurrentStep(0)
  }

  const toggleFavorite = (serviceId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setFavorites(prev => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(serviceId)) {
        newFavorites.delete(serviceId)
      } else {
        newFavorites.add(serviceId)
      }
      return newFavorites
    })
  }

  const getPriorityBadge = (priority?: string, isPopular?: boolean) => {
    if (priority === 'high' || isPopular) {
      return { label: 'Recommended', color: 'bg-blue-100 text-blue-700', icon: TrendingUp }
    }
    return null
  }

  const handleNextStep = () => {
    if (selectedServiceData && currentStep < selectedServiceData.onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* <Iridescence
        color={[1, 1, 1]}
        mouseReact={true}
        amplitude={0.15}
        speed={0.8}
        className="absolute inset-0 z-0"
      /> */}
      <GradientBackground/>
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8 mt-2">
        {/* Header */}
        <div className="text-center mb-12 bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/20">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            {t('language') === 'ms' ? 'Perkhidmatan Mini' : 'Mini Services'}
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-6">
            {t('mini_services.subtitle')}
          </p>

          <div className="flex justify-center items-center gap-4 mb-4">
            <button
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                showFavoritesOnly
                  ? 'bg-red-100 text-red-700 border border-red-200'
                  : 'bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200'
              }`}
            >
              {showFavoritesOnly ? t('mini_services.show_all') : t('mini_services.show_favorites')}
              {favorites.size > 0 && (
                <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                  {favorites.size}
                </span>
              )}
            </button>


          </div>
        </div>

 
        {Object.entries(categories).map(([categoryKey, category]) => (
          <div key={categoryKey} className="mb-12">
            <h2 className={`text-2xl font-bold ${category.color} mb-6`}>
              {t(category.name)}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services
                .filter(service => service.category === categoryKey)
                .filter(service => !showFavoritesOnly || favorites.has(service.id))
                .map((service) => {
                  const IconComponent = service.icon
                  return (
                    <HoverCard
                      key={service.id}
                      title={t(service.title)}
                      description={t(service.description)}
                      outputs={service.outputs}
                      previews={service.previews}
                    >
                      <div
                        onClick={() => handleServiceClick(service.id)}
                        className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 hover:shadow-xl ${service.bgColor} bg-white/90 backdrop-blur-sm border-white/30 hover:bg-white/95 hover:border-white/50 ${service.priority === 'high' ? 'ring-2 ring-blue-300/50' : ''}`}
                      >
                        {/* Recommended Badge */}
                        {(service.priority === 'high' || service.isPopular) && (
                          <div className="absolute top-3 left-3">
                            {(() => {
                              const badge = getPriorityBadge(service.priority, service.isPopular)
                              if (!badge) return null
                              const BadgeIcon = badge.icon
                              return (
                                <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${badge.color}`}>
                                  <BadgeIcon className="w-3 h-3" />
                                  {badge.label}
                                </div>
                              )
                            })()}
                          </div>
                        )}

                        {/* Favorite Button */}
                        <button
                          onClick={(e) => toggleFavorite(service.id, e)}
                          className="absolute bottom-3 right-3 p-2 rounded-full hover:bg-white hover:bg-opacity-50 transition-colors"
                        >
                          <Heart
                            className={`w-4 h-4 ${favorites.has(service.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
                          />
                        </button>

                        <div className={`w-16 h-16 mx-auto ${(service.priority === 'high' || service.isPopular) ? 'mt-8' : 'mt-4'} mb-4 rounded-2xl bg-gradient-to-r ${service.color} flex items-center justify-center shadow-lg`}>
                          <IconComponent className="w-8 h-8 text-white" />
                        </div>

                        <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">
                          {t(service.title)}
                        </h3>

                        <p className="text-sm text-gray-600 text-center leading-relaxed">
                          {t(service.description)}
                        </p>
                      </div>
                    </HoverCard>
                  )
                })}
            </div>
          </div>
        ))}
      </div>

      {selectedService && selectedServiceData && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-white/20">
            {/* Modal Header */}
            <div className={`${selectedServiceData.bgColor} bg-white/80 backdrop-blur-sm p-6 border-b border-white/20`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${selectedServiceData.color} flex items-center justify-center`}>
                    <selectedServiceData.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {t(selectedServiceData.title)}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {t('mini_services.step_of').replace('{current}', (currentStep + 1).toString()).replace('{total}', selectedServiceData.onboardingSteps.length.toString())}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedService(null)}
                  className="p-2 hover:bg-white hover:bg-opacity-50 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-gray-600" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <h4 className="text-lg font-semibold mb-4">
                {t(selectedServiceData.onboardingSteps[currentStep].title)}
              </h4>

              {selectedServiceData.onboardingSteps[currentStep].component}
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-white/20 bg-white/60 backdrop-blur-sm flex justify-between">
              <button
                onClick={handlePrevStep}
                disabled={currentStep === 0}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {t('mini_services.previous')}
              </button>

              {currentStep < selectedServiceData.onboardingSteps.length - 1 ? (
                <button
                  onClick={handleNextStep}
                  className={`px-6 py-2 bg-gradient-to-r ${selectedServiceData.color} text-white rounded-lg hover:shadow-lg transition-all flex items-center space-x-2`}
                >
                  <span>{t('mini_services.next')}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  className={`px-6 py-2 bg-gradient-to-r ${selectedServiceData.color} text-white rounded-lg hover:shadow-lg transition-all`}
                >
                  {t('mini_services.complete')}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 