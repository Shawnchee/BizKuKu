'use client'

import { DollarSign, HandHeart, TrendingUp, Star, ArrowRight, Sparkles } from 'lucide-react'

// Recommended financial services for micro-enterprises
const recommendedServices = [
  {
    id: '1',
    title: 'Subsidy',
    subtitle: 'Subsidi Kerajaan',
    description: 'Get government help for your business',
    icon: HandHeart,
    color: 'from-green-500 to-emerald-500',
    bgColor: 'from-green-50 to-emerald-50',
    borderColor: 'border-green-200',
    amount: 'Up to RM10,000',
    popular: false,
    href: '/services/subsidy'
  },
  {
    id: '2',
    title: 'Loans',
    subtitle: 'Pinjaman Perniagaan',
    description: 'Quick business loans with low interest',
    icon: DollarSign,
    color: 'from-blue-500 to-indigo-500',
    bgColor: 'from-blue-50 to-indigo-50',
    borderColor: 'border-blue-200',
    amount: 'From RM1,000',
    popular: false,
    href: '/services/loans'
  },
  {
    id: '3',
    title: 'Grants',
    subtitle: 'Geran Perniagaan',
    description: 'Free money to grow your business',
    icon: TrendingUp,
    color: 'from-purple-500 to-pink-500',
    bgColor: 'from-purple-50 to-pink-50',
    borderColor: 'border-purple-200',
    amount: 'Up to RM50,000',
    popular: false,
    href: '/services/grants'
  },
]

export default function RecommendedSection() {
  return (
    <section className="py-12 bg-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Recommended
                <span className="block text-lg text-gray-600 font-normal">
                  Disyorkan
                </span>
              </h2>
              <p className="text-gray-600">
                Financial help for your business • Bantuan kewangan untuk perniagaan anda
              </p>
            </div>
            <button className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center">
              View All
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {recommendedServices.map((service) => (
            <a
              key={service.id}
              href={service.href}
              className={`group relative block p-6 rounded-2xl bg-gradient-to-br ${service.bgColor} border ${service.borderColor} hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer`}
            >
              {/* Popular Badge */}
              {service.popular && (
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-400 to-red-400 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center">
                  <Star className="w-3 h-3 mr-1" />
                  Popular
                </div>
              )}

              {/* Icon */}
              <div className={`w-12 h-12 bg-gradient-to-r ${service.color} rounded-xl flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                <service.icon className="h-6 w-6 text-white" />
              </div>

              {/* Content */}
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-gray-900">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-500 font-medium">
                  {service.subtitle}
                </p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {service.description}
                </p>
                
                {/* Amount */}
                <div className="pt-2">
                  <span className={`inline-block text-sm font-bold bg-gradient-to-r ${service.color} bg-clip-text text-transparent`}>
                    {service.amount}
                  </span>
                </div>
              </div>

              {/* Hover Arrow */}
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ArrowRight className="w-4 h-4 text-gray-400" />
              </div>

              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white to-transparent opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300"></div>
            </a>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
            <Sparkles className="w-4 h-4 mr-2" />
            Apply in just 5 minutes • Mohon dalam 5 minit sahaja
          </div>
        </div>
      </div>
    </section>
  )
}
