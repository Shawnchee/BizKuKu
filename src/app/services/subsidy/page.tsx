import { HandHeart, ArrowLeft, CheckCircle, Clock, FileText, Building2, Users, Leaf, Zap, ShoppingCart, Truck } from 'lucide-react'
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

        {/* Available Subsidies */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Available Government Subsidies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* SME Digitalization Grant */}
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">SME Digitalization Grant</h3>
              <p className="text-sm text-gray-600 mb-3">Up to RM5,000 for digital transformation</p>
              <div className="space-y-2 text-sm">
                <div><span className="font-medium">Provider:</span> MDEC</div>
                <div><span className="font-medium">Eligibility:</span> SMEs with &lt;51% local ownership</div>
                <div><span className="font-medium">Coverage:</span> 50% of project cost</div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Technology</span>
              </div>
            </div>

            {/* Bumiputera SME Enhancement Programme */}
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Bumiputera SME Enhancement</h3>
              <p className="text-sm text-gray-600 mb-3">Up to RM10,000 for business development</p>
              <div className="space-y-2 text-sm">
                <div><span className="font-medium">Provider:</span> TERAJU</div>
                <div><span className="font-medium">Eligibility:</span> Bumiputera SMEs</div>
                <div><span className="font-medium">Coverage:</span> Equipment & training</div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Business Development</span>
              </div>
            </div>

            {/* Green Technology Financing */}
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                <Leaf className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Green Technology Financing</h3>
              <p className="text-sm text-gray-600 mb-3">Up to RM1 million for green projects</p>
              <div className="space-y-2 text-sm">
                <div><span className="font-medium">Provider:</span> GTFS</div>
                <div><span className="font-medium">Eligibility:</span> Green tech companies</div>
                <div><span className="font-medium">Coverage:</span> 60% of project cost</div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <span className="inline-block bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded-full">Green Technology</span>
              </div>
            </div>

            {/* Women Entrepreneur Development */}
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-pink-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Women Entrepreneur Development</h3>
              <p className="text-sm text-gray-600 mb-3">Up to RM50,000 for women-led businesses</p>
              <div className="space-y-2 text-sm">
                <div><span className="font-medium">Provider:</span> MWED</div>
                <div><span className="font-medium">Eligibility:</span> Women entrepreneurs</div>
                <div><span className="font-medium">Coverage:</span> Business expansion</div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <span className="inline-block bg-pink-100 text-pink-800 text-xs px-2 py-1 rounded-full">Women Empowerment</span>
              </div>
            </div>

            {/* E-commerce Development */}
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <ShoppingCart className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">E-commerce Development</h3>
              <p className="text-sm text-gray-600 mb-3">Up to RM3,000 for online business setup</p>
              <div className="space-y-2 text-sm">
                <div><span className="font-medium">Provider:</span> MATRADE</div>
                <div><span className="font-medium">Eligibility:</span> New e-commerce businesses</div>
                <div><span className="font-medium">Coverage:</span> Platform setup & marketing</div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">E-commerce</span>
              </div>
            </div>

            {/* Logistics & Transportation */}
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Truck className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Logistics & Transportation</h3>
              <p className="text-sm text-gray-600 mb-3">Up to RM20,000 for logistics improvement</p>
              <div className="space-y-2 text-sm">
                <div><span className="font-medium">Provider:</span> MOT</div>
                <div><span className="font-medium">Eligibility:</span> Transport & logistics SMEs</div>
                <div><span className="font-medium">Coverage:</span> Vehicle & equipment</div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <span className="inline-block bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">Logistics</span>
              </div>
            </div>

          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href="/recommendation">
            <button className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-full hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl font-medium">
              Apply for Subsidy
            </button>
          </Link>
          <p className="text-sm text-gray-600 mt-4">
            Application takes only 5 minutes • Permohonan hanya mengambil 5 minit
          </p>
        </div>
      </div>
    </div>
  )
}
