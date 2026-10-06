import { SiteHeader } from './components/SiteHeader'
import { BrandInterlude } from './components/sections/BrandInterlude'
import { Hero } from './components/sections/Hero'
import { HowItWorks } from './components/sections/HowItWorks'
import { Principle } from './components/sections/Principle'
import { RequestAccess } from './components/sections/RequestAccess'
import { SiteFooter } from './components/sections/SiteFooter'
import { UseCases } from './components/sections/UseCases'
import { WhyNow } from './components/sections/WhyNow'
import { useScrollEffects } from './hooks/useScrollEffects'

export default function App() {
  useScrollEffects()

  return (
    <div className="site-shell">
      <SiteHeader />
      <main id="top">
        <Hero />
        <Principle />
        <HowItWorks />
        <WhyNow />
        <UseCases />
        <BrandInterlude />
        <RequestAccess />
      </main>
      <SiteFooter />
    </div>
  )
}
