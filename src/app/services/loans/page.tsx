import { DollarSign, ArrowLeft, CheckCircle, Clock, FileText, Star } from 'lucide-react'
import Link from 'next/link'

export default function LoansPage() {
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
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <DollarSign className="h-8 w-8 text-white" />
            </div>
            {/* Popular Badge */}
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-orange-400 to-red-400 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center">
              <Star className="w-3 h-3 mr-1" />
              Most Popular
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Business Loans
            <span className="block text-xl text-gray-600 font-normal mt-2">
              Pinjaman Perniagaan
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Quick and affordable business loans to help your business grow
          </p>
        </div>

        {/* Benefits */}
        <div className="bg-white rounded-xl p-8 shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Loan Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">From RM1,000</h3>
              <p className="text-sm text-gray-600">Flexible loan amounts</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Low Interest</h3>
              <p className="text-sm text-gray-600">Starting from 6% per year</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Fast Approval</h3>
              <p className="text-sm text-gray-600">Get money in 24 hours</p>
            </div>
          </div>
        </div>

        {/* Loan Calculator */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-200 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Calculator</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Loan Amount (RM)
              </label>
              <input 
                type="number" 
                placeholder="10,000"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Loan Period (months)
              </label>
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>12 months</option>
                <option>24 months</option>
                <option>36 months</option>
              </select>
            </div>
          </div>
          <div className="mt-6 p-4 bg-white rounded-lg">
            <p className="text-sm text-gray-600">Monthly Payment:</p>
            <p className="text-2xl font-bold text-blue-600">RM 920</p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-full hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl font-medium">
            Apply for Loan
          </button>
          <p className="text-sm text-gray-600 mt-4">
            Get approved in 24 hours • Diluluskan dalam 24 jam
          </p>
        </div>
      </div>
    </div>
  )
}
