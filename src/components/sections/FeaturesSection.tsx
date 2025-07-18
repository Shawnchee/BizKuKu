'use client'

import { Calculator, Users, TrendingUp, Sparkles, ArrowRight } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function FeaturesSection() {
  const { t } = useLanguage()

  // Enhanced features for micro-enterprises
  const simpleFeatures = [
    {
      id: '1',
      titleKey: 'features.track_money.title',
      subtitleKey: 'features.track_money.subtitle',
      descriptionKey: 'features.track_money.desc',
      benefitKey: 'features.track_money.benefit',
      icon: Calculator,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-50 to-emerald-50',
      borderColor: 'border-green-200'
    },
    {
      id: '2',
      titleKey: 'features.know_customers.title',
      subtitleKey: 'features.know_customers.subtitle',
      descriptionKey: 'features.know_customers.desc',
      benefitKey: 'features.know_customers.benefit',
      icon: Users,
      color: 'from-blue-500 to-indigo-500',
      bgColor: 'from-blue-50 to-indigo-50',
      borderColor: 'border-blue-200'
    },
    {
      id: '3',
      titleKey: 'features.grow_sales.title',
      subtitleKey: 'features.grow_sales.subtitle',
      descriptionKey: 'features.grow_sales.desc',
      benefitKey: 'features.grow_sales.benefit',
      icon: TrendingUp,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-50 to-pink-50',
      borderColor: 'border-purple-200'
    }
  ]
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4 mr-2" />
            {t('features.section.badge')}
          </div>
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            {t('features.section.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('features.section.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {simpleFeatures.map((feature) => (
            <div
              key={feature.id}
              className={`group relative text-center p-8 rounded-2xl bg-gradient-to-br ${feature.bgColor} border ${feature.borderColor} hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2`}
            >
              {/* Floating icon */}
              <div className={`mx-auto w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="h-8 w-8 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {t(feature.titleKey)}
              </h3>
              <p className="text-sm text-gray-500 mb-4 font-medium">
                {t(feature.subtitleKey)}
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                {t(feature.descriptionKey)}
              </p>

              {/* Benefit badge */}
              <div className="inline-flex items-center bg-white bg-opacity-80 text-gray-700 px-3 py-2 rounded-full text-sm font-medium border border-gray-200">
                <ArrowRight className="w-3 h-3 mr-1" />
                {t(feature.benefitKey)}
              </div>

              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white to-transparent opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300"></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            {t('features.ready_transform')}
            <span className="font-medium text-gray-800"> {t('features.start_journey')}</span>
          </p>
          <div className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors cursor-pointer">
            {t('features.see_all')}
            <ArrowRight className="w-4 h-4 ml-1" />
          </div>
        </div>
      </div>
    </section>
  )
}
