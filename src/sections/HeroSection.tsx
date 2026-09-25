import { FadeIn } from '../components/FadeIn'
import { ContactButton } from '../components/ContactButton'
import { Magnet } from '../components/Magnet'

export function HeroSection() {
  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Simulations', href: '#simulations' },
    { name: 'Projects', href: '#projects' },
    { name: 'Resume', href: '/resume.pdf', isExternal: true },
    { name: 'Contact', href: '#contact' },
  ]

  return (
    <section className="relative h-screen flex flex-col justify-between overflow-x-clip bg-[#0C0C0C] select-none pb-4 sm:pb-6">
      {/* Navbar */}
      <FadeIn delay={0} y={-20} className="w-full relative z-20">
        <nav className="flex justify-between items-center px-6 md:px-10 pt-6 md:pt-8 w-full max-w-7xl mx-auto">
          <a
            href="#"
            className="text-white font-bold tracking-wider uppercase text-base md:text-xl flex items-center gap-2"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            PIYUSH RAJ SHARMA
          </a>
          <div className="flex items-center gap-3 sm:gap-6 md:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target={link.isExternal ? '_blank' : undefined}
                rel={link.isExternal ? 'noopener noreferrer' : undefined}
                className="text-[#D7E2EA] font-medium uppercase tracking-wider text-xs sm:text-sm md:text-base lg:text-[1.1rem] transition-opacity duration-200 hover:opacity-70"
              >
                {link.name}
              </a>
            ))}
          </div>
        </nav>
      </FadeIn>

      {/* Hero Heading */}
      <div className="overflow-hidden w-full text-center flex-1 flex flex-col justify-start items-center relative z-0 pt-4 md:pt-6">
        <FadeIn delay={0.15} y={40} className="w-full">
          <div className="inline-block px-4 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 uppercase tracking-widest text-xs font-semibold mb-3">
            Data Analyst • BI Specialist • Python • SQL • Power BI
          </div>
          <h1 className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-center mt-2 sm:mt-0 md:-mt-2 text-[12vw] sm:text-[14vw] md:text-[15vw] lg:text-[16vw]">
            HI, I&apos;M PIYUSH
          </h1>
        </FadeIn>
      </div>

      {/* Clean 3D Character Placeholder with Magnet */}
      <div className="absolute left-1/2 -translate-x-1/2 z-10 w-[270px] sm:w-[340px] md:w-[420px] lg:w-[480px] bottom-0 pointer-events-auto">
        <FadeIn delay={0.3} y={30}>
          <Magnet
            padding={150}
            strength={3}
            activeTransition="transform 0.3s ease-out"
            inactiveTransition="transform 0.6s ease-in-out"
          >
            <img
              src="/images/character_hero.png"
              alt="Piyush Raj Sharma - 3D Creator &amp; Data Analyst"
              className="w-full h-auto object-contain pointer-events-none drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
              draggable={false}
            />
          </Magnet>
        </FadeIn>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-20 flex flex-col sm:flex-row justify-between items-center sm:items-end px-6 md:px-10 pb-4 sm:pb-8 md:pb-10 w-full max-w-7xl mx-auto mt-6 sm:mt-0 gap-4 sm:gap-0">
        <FadeIn delay={0.35} y={20}>
          <p
            className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug max-w-[240px] sm:max-w-[280px] md:max-w-[340px] text-center sm:text-left"
            style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.25rem)' }}
          >
            Transforming raw business data into automated pipelines, predictive models, &amp; executive insights
          </p>
        </FadeIn>

        <FadeIn delay={0.5} y={20} className="flex items-center gap-3">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full border-2 border-[#D7E2EA]/50 text-[#D7E2EA] font-medium uppercase tracking-widest transition-all duration-200 hover:bg-white/10 cursor-pointer px-6 py-3 sm:px-8 sm:py-3.5 text-xs sm:text-sm"
          >
            Resume 📄
          </a>
          <ContactButton href="#contact" />
        </FadeIn>
      </div>
    </section>
  )
}
