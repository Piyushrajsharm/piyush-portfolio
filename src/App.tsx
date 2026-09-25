import { HeroSection } from './sections/HeroSection'
import { MarqueeSection } from './sections/MarqueeSection'
import { AboutSection } from './sections/AboutSection'
import { ServicesSection } from './sections/ServicesSection'
import { SimulationsSection } from './sections/SimulationsSection'
import { ProjectsSection } from './sections/ProjectsSection'

export default function App() {
  return (
    <div style={{ overflowX: 'clip' }} className="bg-[#0C0C0C] min-h-screen text-[#D7E2EA]">
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <ServicesSection />
      <SimulationsSection />
      <ProjectsSection />
    </div>
  )
}
