// Simple testimonials for micro-enterprises
const microTestimonials = [
  {
    id: '1',
    name: 'Siti (Warung Owner)',
    business: 'Nasi Lemak Stall',
    quote: 'Now I know which days I sell more. Very helpful for my small warung.',
    location: 'Kuala Lumpur'
  },
  {
    id: '2', 
    name: 'Ahmad (Online Seller)',
    business: 'TikTok Shop',
    quote: 'Easy to track my online sales. I can see profit clearly now.',
    location: 'Johor'
  },
  {
    id: '3',
    name: 'Mei Ling (Kedai Owner)',
    business: 'Grocery Shop',
    quote: 'Simple to use. My teenage daughter taught me in 10 minutes.',
    location: 'Penang'
  },
]

export default function SimpleTestimonialsSection() {
  return (
    <section className="py-16 sm:py-20 bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl mb-4">
            What Small Business Owners Say
          </h2>
          <p className="text-lg text-gray-600">
            Real stories from people like you
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {microTestimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-sm">
              <div className="mb-4">
                <div className="flex text-yellow-400 mb-2">
                  ⭐⭐⭐⭐⭐
                </div>
                <p className="text-gray-700 italic mb-4">
                  &quot;{testimonial.quote}&quot;
                </p>
              </div>
              <div>
                <div className="font-semibold text-gray-900">
                  {testimonial.name}
                </div>
                <div className="text-sm text-gray-600">
                  {testimonial.business}
                </div>
                <div className="text-xs text-gray-500">
                  {testimonial.location}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
