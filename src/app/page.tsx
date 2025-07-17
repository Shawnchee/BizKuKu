import { HeroSection, FeaturesSection, SimpleTestimonialsSection, CTASection } from '@/components/sections'

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <SimpleTestimonialsSection />
      <CTASection />
    </div>
  )
}
