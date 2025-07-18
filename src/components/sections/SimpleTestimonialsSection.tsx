import { Quote, MapPin, Heart, Star } from 'lucide-react'

// Enhanced testimonials for micro-enterprises
const microTestimonials = [
  {
    id: '1',
    name: 'Siti',
    title: 'Warung Owner',
    business: 'Nasi Lemak Stall',
    quote: 'Now I know which days I sell more. Very helpful for my small warung. Sekarang saya tahu hari mana jualan lebih bagus!',
    location: 'Kuala Lumpur',
    avatar: '👩‍🍳',
    rating: 5,
    improvement: '+40% profit'
  },
  {
    id: '2',
    name: 'Ahmad',
    title: 'Online Seller',
    business: 'TikTok Shop',
    quote: 'Easy to track my online sales. I can see profit clearly now. Mudah sangat nak track sales online!',
    location: 'Johor',
    avatar: '👨‍💼',
    rating: 5,
    improvement: '+60% sales'
  },
  {
    id: '3',
    name: 'Mei Ling',
    title: 'Kedai Owner',
    business: 'Grocery Shop',
    quote: 'Simple to use. My teenage daughter taught me in 10 minutes. So easy even my mak can use!',
    location: 'Penang',
    avatar: '👩‍💻',
    rating: 5,
    improvement: 'Save 3hrs daily'
  },
]

export default function SimpleTestimonialsSection() {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Heart className="w-4 h-4 mr-2" />
            Loved by 10,000+ Small Businesses
          </div>
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            What Small Business Owners Say
            <span className="block text-2xl sm:text-3xl text-gray-600 font-normal mt-2">
              Apa Kata Peniaga Kecil
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Real stories from people like you who transformed their business
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {microTestimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 relative overflow-hidden"
            >
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full -translate-y-10 translate-x-10 opacity-50"></div>

              {/* Quote icon */}
              <div className="absolute top-4 left-4 text-blue-200">
                <Quote className="w-8 h-8" />
              </div>

              <div className="relative">
                {/* Rating */}
                <div className="flex items-center mb-4 mt-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                  <span className="ml-2 text-sm font-medium text-gray-600">
                    {testimonial.rating}.0
                  </span>
                </div>

                {/* Quote */}
                <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                  "{testimonial.quote}"
                </p>

                {/* Improvement badge */}
                <div className="inline-flex items-center bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium mb-6">
                  📈 {testimonial.improvement}
                </div>

                {/* Profile */}
                <div className="flex items-center">
                  <div className="text-3xl mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-lg">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600 font-medium">
                      {testimonial.title}
                    </div>
                    <div className="text-sm text-blue-600">
                      {testimonial.business}
                    </div>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <MapPin className="w-3 h-3 mr-1" />
                      {testimonial.location}
                    </div>
                  </div>
                </div>
              </div>

              {/* Hover effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300"></div>
            </div>
          ))}
        </div>

        {/* Bottom stats */}
        <div className="mt-16 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="text-3xl font-bold text-blue-600 mb-2">10,000+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="text-3xl font-bold text-green-600 mb-2">4.9/5</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="text-3xl font-bold text-purple-600 mb-2">99%</div>
              <div className="text-gray-600">Would Recommend</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
