'use client'

import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { 
  FileText, Receipt, Calculator, HelpCircle, 
  ShoppingCart, Package, Gift, Truck,
  Globe, Calendar, Clock,
  FileCheck, Shield,
  X, ChevronRight, Plus
} from 'lucide-react'

interface Service {
  id: string
  title: string
  titleMs: string
  description: string
  descriptionMs: string
  icon: any
  category: string
  color: string
  bgColor: string
  onboardingSteps: {
    title: string
    titleMs: string
    component: React.ReactNode
  }[]
}

export default function MiniServices() {
  const { t } = useLanguage()
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [currentStep, setCurrentStep] = useState(0)

  const services: Service[] = [
    // Financial & Compliance (4 services)
    {
      id: 'e-invoicing',
      title: 'E-Invoicing System',
      titleMs: 'Sistem E-Invois',
      description: 'Generate MyInvois compliant digital invoices',
      descriptionMs: 'Jana invois digital yang mematuhi MyInvois',
      icon: FileText,
      category: 'financial',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      onboardingSteps: [
        {
          title: 'Business Details',
          titleMs: 'Butiran Perniagaan',
          component: (
            <div className="space-y-4">
              <input placeholder="Business Name" className="w-full p-3 border rounded-lg" />
              <input placeholder="SSM Registration No." className="w-full p-3 border rounded-lg" />
              <input placeholder="Tax Identification No." className="w-full p-3 border rounded-lg" />
              <textarea placeholder="Business Address" className="w-full p-3 border rounded-lg h-20" />
            </div>
          )
        },
        {
          title: 'Invoice Template',
          titleMs: 'Template Invois',
          component: (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border-2 border-blue-500 rounded-lg bg-blue-50">
                  <div className="text-sm font-medium">Professional</div>
                </div>
                <div className="p-4 border rounded-lg hover:border-blue-300">
                  <div className="text-sm font-medium">Simple</div>
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-xs text-gray-600">Preview: Invoice template will appear here</div>
              </div>
            </div>
          )
        }
      ]
    },
    {
      id: 'digital-receipt',
      title: 'Digital Receipt Generator',
      titleMs: 'Penjana Resit Digital',
      description: 'Create professional receipts with GST/SST',
      descriptionMs: 'Cipta resit profesional dengan GST/SST',
      icon: Receipt,
      category: 'financial',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      onboardingSteps: [
        {
          title: 'Receipt Template',
          titleMs: 'Template Resit',
          component: (
            <div className="space-y-4">
              <select className="w-full p-3 border rounded-lg">
                <option>Standard Receipt</option>
                <option>Detailed Receipt</option>
                <option>Minimal Receipt</option>
              </select>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="gst" className="rounded" />
                <label htmlFor="gst">Include GST (6%)</label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="sst" className="rounded" />
                <label htmlFor="sst">Include SST</label>
              </div>
            </div>
          )
        }
      ]
    },
    {
      id: 'tax-calculator',
      title: 'Tax Calculator',
      titleMs: 'Kalkulator Cukai',
      description: 'Calculate personal and business tax',
      descriptionMs: 'Kira cukai peribadi dan perniagaan',
      icon: Calculator,
      category: 'financial',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      onboardingSteps: [
        {
          title: 'Income Details',
          titleMs: 'Butiran Pendapatan',
          component: (
            <div className="space-y-4">
              <input placeholder="Annual Income (RM)" className="w-full p-3 border rounded-lg" />
              <select className="w-full p-3 border rounded-lg">
                <option>Individual</option>
                <option>Married</option>
                <option>Business</option>
              </select>
              <div className="p-4 bg-purple-50 rounded-lg">
                <div className="text-sm font-medium">Estimated Tax: RM 0</div>
              </div>
            </div>
          )
        }
      ]
    },
    {
      id: 'gst-helper',
      title: 'GST/SST Helper',
      titleMs: 'Pembantu GST/SST',
      description: 'GST/SST calculation and filing assistance',
      descriptionMs: 'Bantuan pengiraan dan pemfailan GST/SST',
      icon: HelpCircle,
      category: 'financial',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      onboardingSteps: [
        {
          title: 'Tax Settings',
          titleMs: 'Tetapan Cukai',
          component: (
            <div className="space-y-4">
              <select className="w-full p-3 border rounded-lg">
                <option>GST Registered</option>
                <option>SST Registered</option>
                <option>Not Registered</option>
              </select>
              <div className="p-4 bg-orange-50 rounded-lg">
                <div className="text-sm font-medium">Next Filing: 30 Apr 2024</div>
                <div className="text-xs text-gray-600">Set reminder 7 days before</div>
              </div>
            </div>
          )
        }
      ]
    },

    // Point of Sale & Operations (4 services)
    {
      id: 'mobile-pos',
      title: 'Mobile POS App',
      titleMs: 'Aplikasi POS Mudah Alih',
      description: 'Turn your phone into a cash register',
      descriptionMs: 'Tukar telefon anda jadi mesin kira-kira',
      icon: ShoppingCart,
      category: 'operations',
      color: 'from-indigo-500 to-indigo-600',
      bgColor: 'bg-indigo-50',
      onboardingSteps: [
        {
          title: 'Product Catalog',
          titleMs: 'Katalog Produk',
          component: (
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <input placeholder="Product Name" className="flex-1 p-3 border rounded-lg" />
                <input placeholder="Price" className="w-24 p-3 border rounded-lg" />
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
          title: 'Payment Methods',
          titleMs: 'Kaedah Pembayaran',
          component: (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border-2 border-indigo-500 rounded-lg bg-indigo-50 text-center">
                  <div className="text-sm font-medium">Cash</div>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <div className="text-sm font-medium">QR Pay</div>
                </div>
              </div>
            </div>
          )
        }
      ]
    },
    {
      id: 'inventory',
      title: 'Inventory Management',
      titleMs: 'Pengurusan Inventori',
      description: 'Track stock levels and get alerts',
      descriptionMs: 'Jejak stok dan dapat amaran',
      icon: Package,
      category: 'operations',
      color: 'from-teal-500 to-teal-600',
      bgColor: 'bg-teal-50',
      onboardingSteps: [
        {
          title: 'Stock Entry',
          titleMs: 'Entri Stok',
          component: (
            <div className="space-y-4">
              <input placeholder="Item Name" className="w-full p-3 border rounded-lg" />
              <div className="grid grid-cols-2 gap-4">
                <input placeholder="Current Stock" className="p-3 border rounded-lg" />
                <input placeholder="Minimum Alert" className="p-3 border rounded-lg" />
              </div>
            </div>
          )
        }
      ]
    },
    {
      id: 'loyalty-program',
      title: 'Loyalty Program Setup',
      titleMs: 'Setup Program Kesetiaan',
      description: 'Create digital stamp cards and rewards',
      descriptionMs: 'Cipta kad setem digital dan ganjaran',
      icon: Gift,
      category: 'operations',
      color: 'from-pink-500 to-pink-600',
      bgColor: 'bg-pink-50',
      onboardingSteps: [
        {
          title: 'Reward Structure',
          titleMs: 'Struktur Ganjaran',
          component: (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input placeholder="Stamps needed" className="p-3 border rounded-lg" />
                <input placeholder="Reward" className="p-3 border rounded-lg" />
              </div>
              <div className="p-4 bg-pink-50 rounded-lg">
                <div className="text-sm">Preview: Collect 10 stamps = Free coffee</div>
              </div>
            </div>
          )
        }
      ]
    },
    {
      id: 'delivery-service',
      title: 'Delivery Service Integration',
      titleMs: 'Integrasi Perkhidmatan Penghantaran',
      description: 'Connect with delivery partners',
      descriptionMs: 'Sambung dengan rakan kongsi penghantaran',
      icon: Truck,
      category: 'operations',
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'bg-yellow-50',
      onboardingSteps: [
        {
          title: 'Delivery Partners',
          titleMs: 'Rakan Kongsi Penghantaran',
          component: (
            <div className="space-y-4">
              <div className="space-y-2">
                {['Grab', 'Foodpanda', 'Lalamove'].map(partner => (
                  <div key={partner} className="flex items-center space-x-2 p-3 border rounded-lg">
                    <input type="checkbox" />
                    <span>{partner}</span>
                    <span className="ml-auto text-sm text-gray-600">5-15% commission</span>
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
      title: 'Mini Website Builder',
      titleMs: 'Pembina Laman Web Mini',
      description: 'Create a simple business website',
      descriptionMs: 'Cipta laman web perniagaan mudah',
      icon: Globe,
      category: 'digital',
      color: 'from-cyan-500 to-cyan-600',
      bgColor: 'bg-cyan-50',
      onboardingSteps: [
        {
          title: 'Template Selection',
          titleMs: 'Pemilihan Template',
          component: (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border-2 border-cyan-500 rounded-lg bg-cyan-50">
                  <div className="text-sm font-medium">Restaurant</div>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="text-sm font-medium">Retail</div>
                </div>
              </div>
              <input placeholder="Business Name" className="w-full p-3 border rounded-lg" />
              <textarea placeholder="About Us" className="w-full p-3 border rounded-lg h-20" />
            </div>
          )
        }
      ]
    },
    {
      id: 'booking-system',
      title: 'Online Booking System',
      titleMs: 'Sistem Tempahan Dalam Talian',
      description: 'Accept online bookings and reservations',
      descriptionMs: 'Terima tempahan dan reservasi dalam talian',
      icon: Calendar,
      category: 'digital',
      color: 'from-violet-500 to-violet-600',
      bgColor: 'bg-violet-50',
      onboardingSteps: [
        {
          title: 'Service Setup',
          titleMs: 'Setup Perkhidmatan',
          component: (
            <div className="space-y-4">
              <input placeholder="Service Name" className="w-full p-3 border rounded-lg" />
              <div className="grid grid-cols-2 gap-4">
                <input placeholder="Duration (mins)" className="p-3 border rounded-lg" />
                <input placeholder="Price (RM)" className="p-3 border rounded-lg" />
              </div>
              <select className="w-full p-3 border rounded-lg">
                <option>Available 9 AM - 6 PM</option>
                <option>Available 24/7</option>
                <option>Custom hours</option>
              </select>
            </div>
          )
        }
      ]
    },
    {
      id: 'appointment-scheduler',
      title: 'Appointment Scheduler',
      titleMs: 'Penjadual Temujanji',
      description: 'Manage appointments and staff schedules',
      descriptionMs: 'Urus temujanji dan jadual kakitangan',
      icon: Clock,
      category: 'digital',
      color: 'from-rose-500 to-rose-600',
      bgColor: 'bg-rose-50',
      onboardingSteps: [
        {
          title: 'Staff Availability',
          titleMs: 'Ketersediaan Kakitangan',
          component: (
            <div className="space-y-4">
              <input placeholder="Staff Name" className="w-full p-3 border rounded-lg" />
              <div className="grid grid-cols-2 gap-4">
                <input type="time" defaultValue="09:00" className="p-3 border rounded-lg" />
                <input type="time" defaultValue="17:00" className="p-3 border rounded-lg" />
              </div>
              <div className="flex flex-wrap gap-2">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
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
      title: 'LHDN e-Filing Assistant',
      titleMs: 'Pembantu e-Filing LHDN',
      description: 'Guided tax filing with LHDN',
      descriptionMs: 'Panduan pemfailan cukai dengan LHDN',
      icon: FileCheck,
      category: 'professional',
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-50',
      onboardingSteps: [
        {
          title: 'Document Checklist',
          titleMs: 'Senarai Semak Dokumen',
          component: (
            <div className="space-y-4">
              <div className="space-y-2">
                {[
                  'Form BE (Individual)',
                  'EA Form (Employment)',
                  'Bank Statements',
                  'Business Receipts'
                ].map(doc => (
                  <div key={doc} className="flex items-center space-x-2">
                    <input type="checkbox" />
                    <span className="text-sm">{doc}</span>
                  </div>
                ))}
              </div>
              <button className="w-full p-3 bg-emerald-500 text-white rounded-lg">
                Start Filing Process
              </button>
            </div>
          )
        }
      ]
    },
    {
      id: 'insurance-quotes',
      title: 'Business Insurance Quotes',
      titleMs: 'Sebut Harga Insurans Perniagaan',
      description: 'Compare business insurance coverage',
      descriptionMs: 'Bandingkan perlindungan insurans perniagaan',
      icon: Shield,
      category: 'professional',
      color: 'from-slate-500 to-slate-600',
      bgColor: 'bg-slate-50',
      onboardingSteps: [
        {
          title: 'Business Type',
          titleMs: 'Jenis Perniagaan',
          component: (
            <div className="space-y-4">
              <select className="w-full p-3 border rounded-lg">
                <option>Restaurant/F&B</option>
                <option>Retail Store</option>
                <option>Service Provider</option>
                <option>Manufacturing</option>
              </select>
              <input placeholder="Number of Employees" className="w-full p-3 border rounded-lg" />
              <input placeholder="Annual Revenue (RM)" className="w-full p-3 border rounded-lg" />
              <div className="p-4 bg-slate-50 rounded-lg">
                <div className="text-sm font-medium">Estimated Premium: RM 200-500/month</div>
              </div>
            </div>
          )
        }
      ]
    }
  ]

  const categories = {
    financial: { name: 'Financial & Compliance', nameMs: 'Kewangan & Pematuhan', color: 'text-blue-600' },
    operations: { name: 'Point of Sale & Operations', nameMs: 'Titik Jualan & Operasi', color: 'text-indigo-600' },
    digital: { name: 'Digital Presence & Customer Management', nameMs: 'Kehadiran Digital & Pengurusan Pelanggan', color: 'text-purple-600' },
    professional: { name: 'Professional Services', nameMs: 'Perkhidmatan Profesional', color: 'text-emerald-600' }
  }

  const selectedServiceData = services.find(s => s.id === selectedService)

  const handleServiceClick = (serviceId: string) => {
    setSelectedService(serviceId)
    setCurrentStep(0)
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
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            {t('language') === 'ms' ? 'Perkhidmatan Mini' : 'Mini Services'}
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t('language') === 'ms' 
              ? 'Akses alat dan perkhidmatan penting untuk menjalankan perniagaan anda dengan lebih cekap'
              : 'Access essential tools and services to run your business more efficiently'
            }
          </p>
        </div>

        {/* Services Grid */}
        {Object.entries(categories).map(([categoryKey, category]) => (
          <div key={categoryKey} className="mb-12">
            <h2 className={`text-2xl font-bold ${category.color} mb-6`}>
              {t('language') === 'ms' ? category.nameMs : category.name}
              <span className="text-sm text-gray-500 ml-2">
                ({services.filter(s => s.category === categoryKey).length} services)
              </span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services
                .filter(service => service.category === categoryKey)
                .map((service) => {
                  const IconComponent = service.icon
                  return (
                    <div
                      key={service.id}
                      onClick={() => handleServiceClick(service.id)}
                      className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 hover:shadow-xl ${service.bgColor} border-gray-200 hover:border-opacity-50`}
                    >
                      <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${service.color} flex items-center justify-center shadow-lg`}>
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">
                        {t('language') === 'ms' ? service.titleMs : service.title}
                      </h3>
                      
                      <p className="text-sm text-gray-600 text-center leading-relaxed">
                        {t('language') === 'ms' ? service.descriptionMs : service.description}
                      </p>
                    </div>
                  )
                })}
            </div>
          </div>
        ))}
      </div>

      {/* Service Modal */}
      {selectedService && selectedServiceData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className={`${selectedServiceData.bgColor} p-6 border-b`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${selectedServiceData.color} flex items-center justify-center`}>
                    <selectedServiceData.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {t('language') === 'ms' ? selectedServiceData.titleMs : selectedServiceData.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {t('language') === 'ms' ? 'Langkah' : 'Step'} {currentStep + 1} {t('language') === 'ms' ? 'daripada' : 'of'} {selectedServiceData.onboardingSteps.length}
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

            {/* Modal Content */}
            <div className="p-6">
              <h4 className="text-lg font-semibold mb-4">
                {t('language') === 'ms' 
                  ? selectedServiceData.onboardingSteps[currentStep].titleMs 
                  : selectedServiceData.onboardingSteps[currentStep].title
                }
              </h4>
              
              {selectedServiceData.onboardingSteps[currentStep].component}
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t bg-gray-50 flex justify-between">
              <button
                onClick={handlePrevStep}
                disabled={currentStep === 0}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {t('language') === 'ms' ? 'Sebelum' : 'Previous'}
              </button>
              
              {currentStep < selectedServiceData.onboardingSteps.length - 1 ? (
                <button
                  onClick={handleNextStep}
                  className={`px-6 py-2 bg-gradient-to-r ${selectedServiceData.color} text-white rounded-lg hover:shadow-lg transition-all flex items-center space-x-2`}
                >
                  <span>{t('language') === 'ms' ? 'Seterusnya' : 'Next'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  className={`px-6 py-2 bg-gradient-to-r ${selectedServiceData.color} text-white rounded-lg hover:shadow-lg transition-all`}
                >
                  {t('language') === 'ms' ? 'Selesai' : 'Complete'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 