import { LandingLayout } from '../landing-layout'
import ContactSection from './contact-section'
import { FeaturesSection } from './features-section'
import { HeroSection } from './hero-section'
import { TestimonialsSection } from './testimonials-section'

export default function Landing() {
  return (
    <LandingLayout>
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <ContactSection />
    </LandingLayout>
  )
}
