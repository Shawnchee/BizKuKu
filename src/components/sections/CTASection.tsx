import Link from 'next/link'
import { Button } from '@/components/ui'
import { Rocket, Shield, Smartphone, Clock, Sparkles } from 'lucide-react'

export default function CTASection() {
  return (
    <section className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 py-16 sm:py-24 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      <div className="absolute top-10 left-10 text-blue-300 animate-pulse">
        <Sparkles className="w-12 h-12" />
      </div>
      <div className="absolute bottom-10 right-10 text-purple-300 animate-bounce">
        <Rocket className="w-8 h-8" />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center bg-white bg-opacity-20 text-white px-4 py-2 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
            <Rocket className="w-4 h-4 mr-2" />
            Join 10,000+ Successful Businesses
          </div>

          {/* Main heading */}
          <h2 className="text-3xl font-bold text-white sm:text-5xl mb-6 leading-tight">
            Start Growing Your Business Today
            <span className="block text-2xl sm:text-3xl text-blue-100 font-normal mt-2">
              Mula Berkembang Hari Ini
            </span>
          </h2>

          <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
            Free to try. Easy to use. Perfect for small shops and online sellers.
            <br />
            <span className="font-medium text-white">Transform your business in just 5 minutes!</span>
          </p>

          {/* Enhanced Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm p-6 rounded-2xl border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300">
              <Shield className="w-8 h-8 text-green-300 mx-auto mb-3" />
              <div className="font-bold text-white mb-1">No Monthly Fees</div>
              <div className="text-sm text-blue-100">Start completely free</div>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm p-6 rounded-2xl border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300">
              <Clock className="w-8 h-8 text-yellow-300 mx-auto mb-3" />
              <div className="font-bold text-white mb-1">5-Min Setup</div>
              <div className="text-sm text-blue-100">No training needed</div>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm p-6 rounded-2xl border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300">
              <Smartphone className="w-8 h-8 text-blue-300 mx-auto mb-3" />
              <div className="font-bold text-white mb-1">Works on Phone</div>
              <div className="text-sm text-blue-100">Use anywhere, anytime</div>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm p-6 rounded-2xl border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300">
              <Sparkles className="w-8 h-8 text-purple-300 mx-auto mb-3" />
              <div className="font-bold text-white mb-1">24/7 Support</div>
              <div className="text-sm text-blue-100">We're here to help</div>
            </div>
          </div>

          {/* Enhanced CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Link href="/onboarding">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-50 text-lg px-10 py-4 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 font-bold"
              >
                Try BizzKu Now - Free →
              </Button>
            </Link>
            <Link href="/demo">
              <Button
                variant="outline"
                size="lg"
                className="border-white border-2 text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-4 backdrop-blur-sm transition-all duration-300"
              >
                Watch Demo
              </Button>
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-8 text-blue-100">
            <div className="flex items-center">
              <span className="text-green-300 mr-2">✓</span>
              No credit card required
            </div>
            <div className="flex items-center">
              <span className="text-green-300 mr-2">✓</span>
              Cancel anytime
            </div>
            <div className="flex items-center">
              <span className="text-green-300 mr-2">✓</span>
              30-day money back guarantee
            </div>
          </div>

          {/* Urgency element */}
          <div className="mt-8 inline-flex items-center bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-full text-sm font-medium animate-pulse">
            🔥 Limited Time: Get premium features free for 3 months!
          </div>
        </div>
      </div>
    </section>
  )
}
