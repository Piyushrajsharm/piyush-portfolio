import { FadeIn } from '../components/FadeIn'
import { ContactButton } from '../components/ContactButton'
import { AnimatedText } from '../components/AnimatedText'

export function AboutSection() {
  const paragraphText =
    'Data Science & Analytics undergraduate with hands-on experience in SQL, Python, Power BI, Advanced Excel, data cleaning, ETL, exploratory data analysis, data modeling, KPI reporting, dashboard development, statistical analysis, machine learning and business intelligence. Built analytics projects spanning sales reporting, churn analysis, NLP resume matching and time-series forecasting. Completed Deloitte and Tata Group simulations focused on anomaly detection, customer risk profiling, and executive insights.'

  const highlights = [
    {
      value: '5+',
      label: 'End-to-End Projects',
      detail: 'Power BI, Python, ML, NLP & ETL',
      color: 'border-cyan-500/30 bg-cyan-500/5 text-cyan-400',
    },
    {
      value: '3',
      label: 'Industry Simulations',
      detail: 'Deloitte Forensics & Tata Group',
      color: 'border-purple-500/30 bg-purple-500/5 text-purple-400',
    },
    {
      value: '7+',
      label: 'Verified Certifications',
      detail: 'SQL, Python, DAX & Data Science',
      color: 'border-emerald-500/30 bg-emerald-500/5 text-emerald-400',
    },
    {
      value: 'BCA',
      label: 'IGNOU Delhi',
      detail: 'Data & Computing Focus (2024–27)',
      color: 'border-blue-500/30 bg-blue-500/5 text-blue-400',
    },
  ]

  return (
    <section
      id="about"
      className="relative min-h-screen flex flex-col justify-center items-center px-5 sm:px-8 md:px-10 py-20 bg-[#0C0C0C] overflow-hidden"
    >
      {/* Subtle Glow Accents */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Central Content */}
      <div className="relative z-20 flex flex-col items-center text-center max-w-5xl mx-auto w-full">
        {/* Category Pill */}
        <FadeIn delay={0} y={20}>
          <div className="inline-block px-4 py-1.5 rounded-full border border-[#D7E2EA]/20 bg-white/5 text-[#D7E2EA] uppercase tracking-widest text-xs font-medium mb-4">
            Professional Summary
          </div>
        </FadeIn>

        {/* Heading */}
        <FadeIn delay={0.1} y={40} className="w-full">
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight text-center"
            style={{ fontSize: 'clamp(2.8rem, 10vw, 130px)' }}
          >
            About Me
          </h2>
        </FadeIn>

        {/* Spacing */}
        <div className="h-8 sm:h-12" />

        {/* Animated paragraph */}
        <div className="w-full flex justify-center">
          <AnimatedText
            text={paragraphText}
            className="text-[#D7E2EA] font-medium text-center leading-relaxed max-w-[680px] text-sm sm:text-base md:text-lg"
          />
        </div>

        {/* Spacing */}
        <div className="h-12 sm:h-16" />

        {/* 4 Metric Highlights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
          {highlights.map((item, idx) => (
            <FadeIn
              key={item.label}
              delay={0.2 + idx * 0.1}
              y={25}
              className={`rounded-2xl border p-5 sm:p-6 text-left backdrop-blur-sm transition-all duration-300 hover:scale-105 ${item.color}`}
            >
              <div className="text-3xl sm:text-4xl md:text-5xl font-black mb-2 tracking-tight">
                {item.value}
              </div>
              <div className="text-white font-semibold text-sm sm:text-base tracking-wide">
                {item.label}
              </div>
              <div className="text-neutral-400 text-xs mt-1 leading-snug">
                {item.detail}
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Spacing */}
        <div className="h-12 sm:h-16" />

        {/* Contact button */}
        <FadeIn delay={0.4} y={20}>
          <ContactButton href="#contact" />
        </FadeIn>
      </div>
    </section>
  )
}
