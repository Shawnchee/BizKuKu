import Link from 'next/link'
import { Button } from '@/components/ui'

export default function HeroSection() {
  return (
    <section className="bg-blue-50 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            {/* Simple Heading */}
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-6">
              Grow Your Small Business
            </h1>

            {/* Simple Description */}
            <p className="text-xl text-gray-600 mb-8">
              Track your sales, customers, and money easily.
              Perfect for warung, kedai, and small shops.
            </p>

            {/* Single Clear Button */}
            <div className="mb-8 lg:mb-0">
              <Link href="/dashboard">
                <Button size="lg" className="text-lg px-8 py-4">
                  Register Now - It's Free
                </Button>
              </Link>
            </div>
          </div>

          {/* Simple Visual Example */}
          <div className="flex justify-center lg:justify-end">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
                See Your Business Numbers
              </h3>

              {/* Simple Cards */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <div className="text-sm text-green-600 mb-1">Today Sales</div>
                  <div className="text-2xl font-bold text-gray-900">RM 450</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <div className="text-sm text-blue-600 mb-1">This Month</div>
                  <div className="text-2xl font-bold text-gray-900">RM 8,200</div>
                </div>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-600 mb-3">
                  Easy to understand. No complicated charts.
                </p>
                <Link href="/dashboard">
                  <Button variant="outline" size="sm">
                    Try It Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
