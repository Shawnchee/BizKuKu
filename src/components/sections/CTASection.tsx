import Link from 'next/link'
import { Button } from '@/components/ui'

export default function CTASection() {
  return (
    <section className="bg-blue-600 py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl mb-4">
            Start Growing Your Business Today
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Free to try. Easy to use. Perfect for small shops and online sellers.
          </p>

          {/* Simple Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 max-w-2xl mx-auto">
            <div className="text-blue-100">
              <div className="font-semibold">✓ No monthly fees</div>
              <div className="text-sm">Start for free</div>
            </div>
            <div className="text-blue-100">
              <div className="font-semibold">✓ Easy to learn</div>
              <div className="text-sm">No training needed</div>
            </div>
            <div className="text-blue-100">
              <div className="font-semibold">✓ Works on phone</div>
              <div className="text-sm">Use anywhere</div>
            </div>
          </div>

          <Link href="/dashboard">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-50 text-lg px-8 py-4"
            >
              Try BizzKu Now - Free
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
