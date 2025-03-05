import { HeroSection } from '@/components/home/hero-section'
import { OverviewSection } from '@/components/home/overview-section'
import { ApiSection } from '@/components/home/api-section'
import { NavigationSection } from '@/components/home/navigation-section'

export default function Home() {
  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 py-8'>
      <div className='space-y-12'>
        <HeroSection />
        <OverviewSection />
        <ApiSection />
        <NavigationSection />
      </div>
    </div>
  )
}
