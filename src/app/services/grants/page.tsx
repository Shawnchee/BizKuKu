import { TrendingUp, ArrowLeft, CheckCircle, Clock, FileText, Award } from 'lucide-react'
import Link from 'next/link'

export default function GrantsPage() {
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
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <TrendingUp className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Business Grants
            <span className="block text-xl text-gray-600 font-normal mt-2">
              Geran Perniagaan
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Free funding to help your business grow and expand
          </p>
        </div>

        {/* Grant Types */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Startup Grant</h3>
            <p className="text-gray-600 mb-4">For new businesses starting up</p>
            <div className="text-2xl font-bold text-purple-600 mb-2">Up to RM25,000</div>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Business registration support</li>
              <li>• Equipment funding</li>
              <li>• Marketing budget</li>
            </ul>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-pink-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Growth Grant</h3>
            <p className="text-gray-600 mb-4">For expanding existing business</p>
            <div className="text-2xl font-bold text-pink-600 mb-2">Up to RM50,000</div>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Technology upgrade</li>
              <li>• Staff training</li>
              <li>• Market expansion</li>
            </ul>
          </div>
        </div>

        {/* Requirements */}
        <div className="bg-white rounded-xl p-8 shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Requirements</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Malaysian Citizen</h3>
              <p className="text-sm text-gray-600">Must be Malaysian</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Business Plan</h3>
              <p className="text-sm text-gray-600">Simple business plan</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">6 Months Process</h3>
              <p className="text-sm text-gray-600">Application review time</p>
            </div>
          </div>
        </div>

        {/* Process Steps */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-8 border border-purple-200 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Application Process</h3>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">1</div>
              <div>
                <h4 className="font-semibold text-gray-900">Submit Application</h4>
                <p className="text-sm text-gray-600">Fill out the online form</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">2</div>
              <div>
                <h4 className="font-semibold text-gray-900">Document Review</h4>
                <p className="text-sm text-gray-600">We review your documents</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">3</div>
              <div>
                <h4 className="font-semibold text-gray-900">Interview</h4>
                <p className="text-sm text-gray-600">Short interview about your business</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">4</div>
              <div>
                <h4 className="font-semibold text-gray-900">Get Funding</h4>
                <p className="text-sm text-gray-600">Receive your grant money</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl font-medium">
            Apply for Grant
          </button>
          <p className="text-sm text-gray-600 mt-4">
            Free money for your business • Wang percuma untuk perniagaan anda
          </p>
        </div>
      </div>
    </div>
  )
}
