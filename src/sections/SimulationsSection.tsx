import { FadeIn } from '../components/FadeIn'

interface Simulation {
  company: string
  role: string
  provider: string
  date: string
  description: string
  highlights: string[]
  badgeColor: string
}

const SIMULATIONS: Simulation[] = [
  {
    company: 'Deloitte',
    role: 'Data Analytics Job Simulation',
    provider: 'Forage',
    date: 'Sep 2025',
    description:
      'Analyzed financial datasets to identify anomalies and compliance irregularities in a simulated forensic investigation; converted complex patterns into structured, management-ready risk insights.',
    highlights: ['Forensic Investigation', 'Financial Irregularities Detection', 'Executive Risk Dashboards'],
    badgeColor: 'border-blue-500/40 text-blue-400 bg-blue-500/10',
  },
  {
    company: 'Tata Group',
    role: 'GenAI-Powered Data Analytics Job Simulation',
    provider: 'Forage',
    date: 'Sep 2025',
    description:
      'Applied EDA and GenAI concepts to customer risk profiling and delinquency analysis; developed a data-driven collections strategy using portfolio-level exposure insights.',
    highlights: ['Customer Risk Profiling', 'Delinquency Modeling', 'Portfolio Exposure Strategy'],
    badgeColor: 'border-purple-500/40 text-purple-400 bg-purple-500/10',
  },
  {
    company: 'Tata Group',
    role: 'Data Visualization Job Simulation',
    provider: 'Forage',
    date: 'Sep 2025',
    description:
      'Translated ambiguous business requirements into measurable KPIs and analytical objectives; developed executive visualizations communicating sales trends, risks and outliers to decision-makers.',
    highlights: ['Ambiguous Requirements to KPIs', 'Executive Visual Storytelling', 'Sales Outliers & Variance'],
    badgeColor: 'border-cyan-500/40 text-cyan-400 bg-cyan-500/10',
  },
]

export function SimulationsSection() {
  return (
    <section
      id="simulations"
      className="bg-[#0C0C0C] px-5 sm:px-8 md:px-10 py-20 sm:py-28 relative z-10"
    >
      <div className="max-w-5xl mx-auto w-full">
        {/* Category Pill */}
        <FadeIn delay={0} y={20} className="w-full text-center">
          <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-[#D7E2EA] uppercase tracking-widest text-xs font-semibold mb-3">
            Industry Simulations &amp; Virtual Experience
          </div>
        </FadeIn>

        {/* Heading */}
        <FadeIn delay={0.1} y={30} className="w-full text-center mb-14 sm:mb-20">
          <h2
            className="hero-heading font-black uppercase text-center leading-none"
            style={{ fontSize: 'clamp(2.5rem, 8vw, 100px)' }}
          >
            Simulations
          </h2>
        </FadeIn>

        {/* Grid of Simulations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SIMULATIONS.map((sim, index) => (
            <FadeIn
              key={sim.role + index}
              delay={index * 0.15}
              y={25}
              className="rounded-3xl border border-white/10 bg-neutral-900/60 p-6 sm:p-8 backdrop-blur-md flex flex-col justify-between hover:border-cyan-400/40 transition-all duration-300 hover:-translate-y-2 group shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className={`px-3 py-1 text-xs font-bold uppercase rounded-full border ${sim.badgeColor}`}>
                    {sim.company}
                  </span>
                  <span className="text-[#D7E2EA]/50 text-xs font-medium">
                    {sim.provider} • {sim.date}
                  </span>
                </div>

                <h3 className="text-white font-bold text-lg sm:text-xl tracking-wide mb-3 group-hover:text-cyan-300 transition-colors">
                  {sim.role}
                </h3>

                <p className="text-[#D7E2EA]/70 text-sm leading-relaxed mb-6 font-light">
                  {sim.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex flex-wrap gap-1.5">
                {sim.highlights.map((h) => (
                  <span
                    key={h}
                    className="text-[11px] font-medium px-2.5 py-0.5 rounded-md bg-white/5 text-neutral-300 border border-white/5"
                  >
                    {h}
                  </span>
                ))}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
