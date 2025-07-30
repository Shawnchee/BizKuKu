import { HeroSection, FeaturesSection, RecommendedSection } from '@/components/sections'
import { OnboardingProgressBar } from '@/components/onboarding'

export default function ApplicationStatus() {
  return (
    <div className="min-h-screen">
      <HeroSection />

      {/* Onboarding Progress Section */}
      <section className="py-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <OnboardingProgressBar />
        </div>
      </section>

      {/* Recommended Section */}
      <RecommendedSection />

      <FeaturesSection />
    </div>
  )
}
