import { HeroSection } from '@/components/sections'
import { OnboardingProgressBar } from '@/components/onboarding'
import Iridescence from '@/components/backgrounds/Iridescence'

export default function ApplicationStatus() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <section className="relative py-16 overflow-hidden">
        <Iridescence
          color={[1, 1, 1]}
          mouseReact={true}
          amplitude={0.15}
          speed={0.8}
          className="absolute inset-0"
        />
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <OnboardingProgressBar />
        </div>
      </section>
    </div>
  )
}
