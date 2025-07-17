import { Calculator, Users, TrendingUp } from 'lucide-react'

// Simple features for micro-enterprises
const simpleFeatures = [
  {
    id: '1',
    title: 'Track Your Money',
    description: 'See how much you earn and spend every day. Know if you are making profit.',
    icon: Calculator,
  },
  {
    id: '2',
    title: 'Know Your Customers',
    description: 'Remember who buys from you often. Send them special offers.',
    icon: Users,
  },
  {
    id: '3',
    title: 'Grow Your Sales',
    description: 'Find out what sells best. Focus on products that make more money.',
    icon: TrendingUp,
  },
]

export default function FeaturesSection() {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl mb-4">
            What You Can Do
          </h2>
          <p className="text-lg text-gray-600">
            Simple tools to help your small business grow
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {simpleFeatures.map((feature) => (
            <div key={feature.id} className="text-center p-6 rounded-lg bg-gray-50">
              <div className="mx-auto w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
