import { HandHeart, ArrowLeft, CheckCircle, Clock, FileText } from 'lucide-react'
import Link from 'next/link'

export default function SubsidyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link 
          href="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <HandHeart className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Government Subsidy
            <span className="block text-xl text-gray-600 font-normal mt-2">
              Subsidi Kerajaan
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get financial support from the government to start or grow your business
          </p>
        </div>

        {/* Benefits */}
        <div className="bg-white rounded-xl p-8 shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">What You Get</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Up to RM10,000</h3>
              <p className="text-sm text-gray-600">Free money for your business</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Quick Process</h3>
              <p className="text-sm text-gray-600">Get approved in 2-3 weeks</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Simple Documents</h3>
              <p className="text-sm text-gray-600">Minimal paperwork required</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <button className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-full hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl font-medium">
            Apply for Subsidy
          </button>
          <p className="text-sm text-gray-600 mt-4">
            Application takes only 5 minutes • Permohonan hanya mengambil 5 minit
          </p>
        </div>
      </div>
    </div>
  )
}
