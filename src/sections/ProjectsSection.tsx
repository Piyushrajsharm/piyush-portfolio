import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FadeIn } from '../components/FadeIn'
import { LiveProjectButton } from '../components/LiveProjectButton'
import { ContactButton } from '../components/ContactButton'

interface ProjectData {
  number: string
  name: string
  category: string
  tech: string[]
  description: string
  metrics: string
  image: string
  githubUrl: string
}

const PROJECTS: ProjectData[] = [
  {
    number: '01',
    name: 'Power BI Sales Insights Dashboard',
    category: 'Business Intelligence',
    tech: ['Power BI', 'DAX', 'Data Modeling', 'KPI Reporting'],
    description:
      'Designed an interactive multi-page dashboard across regional and product hierarchies; engineered complex DAX measures for revenue, YoY growth, and regional rankings. Automated recurring visual reporting to drive strategic visibility.',
    metrics: '~40% reduction in recurring manual reporting effort',
    image: '/images/powerbi_dashboard.jpg',
    githubUrl: 'https://github.com/Piyushrajsharm',
  },
  {
    number: '02',
    name: 'Automated Data Processing & Reporting Pipeline',
    category: 'Data Engineering & ETL',
    tech: ['Python', 'Pandas', 'ETL', 'Data Cleaning'],
    description:
      'Built production-ready repeatable workflows for multi-file ingestion, schema validation, merging, cleaning, deduplication, and transformation. Delivers structured data to downstream business analytics.',
    metrics: '35% reduction in repetitive processing time with improved data consistency',
    image: '/images/etl_dashboard.jpg',
    githubUrl: 'https://github.com/Piyushrajsharm',
  },
  {
    number: '03',
    name: 'Customer Churn Prediction Model',
    category: 'Machine Learning',
    tech: ['Python', 'Scikit-learn', 'EDA', 'Random Forest'],
    description:
      'Developed an end-to-end classification pipeline benchmarking Logistic Regression and Random Forest. Performed in-depth EDA and feature selection, optimized recall for high-risk customers, and translated feature importance into retention strategies.',
    metrics: 'Prioritized high-risk customer recall with actionable retention drivers',
    image: '/images/churn_dashboard.jpg',
    githubUrl: 'https://github.com/Piyushrajsharm',
  },
  {
    number: '04',
    name: 'ATS Resume Scorer & Matcher',
    category: 'Natural Language Processing',
    tech: ['Python', 'NLP', 'TF-IDF', 'Cosine Similarity'],
    description:
      'Engineered an NLP keyword-match scoring engine comparing candidate resumes with job descriptions to detect technical skill gaps and simulate recruiter ATS screening alignment.',
    metrics: '15–20% boost in keyword-to-JD alignment scores across test iterations',
    image: '/images/ats_dashboard.jpg',
    githubUrl: 'https://github.com/Piyushrajsharm',
  },
  {
    number: '05',
    name: 'LSTM Stock Price Forecasting',
    category: 'Deep Learning & Time Series',
    tech: ['Python', 'TensorFlow/Keras', 'LSTM', 'Time Series'],
    description:
      'Implemented deep learning LSTM forecasting architecture with MinMax scaling and sliding-window feature engineering; tuned layer topologies, window sizes, and hyperparameters to forecast directional trends.',
    metrics: 'Validated predictive forecast curves against actual market price trends',
    image: '/images/lstm_dashboard.jpg',
    githubUrl: 'https://github.com/Piyushrajsharm',
  },
]

const CERTIFICATIONS = [
  'Mastering Python for Data Science',
  'SQL Mastery & Relational Database Architecture',
  'Advanced Excel & DAX Analytics Modeling',
  'Complete Machine Learning & Data Science Bootcamp',
  'Deloitte Data Analytics Job Simulation',
  'Tata Group GenAI-Powered Data Analytics',
  'Tata Group Data Visualization Job Simulation',
]

function ProjectCard({
  project,
  index,
  totalCards,
}: {
  project: ProjectData
  index: number
  totalCards: number
}) {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const targetScale = 1 - (totalCards - 1 - index) * 0.03
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale])

  return (
    <div
      ref={containerRef}
      className="min-h-[75vh] relative flex items-start justify-center w-full"
    >
      <motion.div
        style={{
          scale,
          top: `calc(${index * 26}px + 5.5rem)`,
        }}
        className="sticky w-full rounded-[36px] sm:rounded-[46px] md:rounded-[56px] border-2 border-[#D7E2EA]/30 bg-[#0C0C0C] p-5 sm:p-7 md:p-9 origin-top shadow-2xl z-10"
      >
        {/* Top Header Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4 sm:gap-6">
            <span
              className="font-black text-cyan-400 leading-none select-none"
              style={{ fontSize: 'clamp(2.4rem, 5vw, 4.5rem)' }}
            >
              {project.number}
            </span>
            <div className="flex flex-col">
              <span className="text-cyan-300/80 uppercase tracking-widest text-xs font-semibold">
                {project.category}
              </span>
              <h3 className="text-white uppercase font-bold text-lg sm:text-2xl md:text-3xl">
                {project.name}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <LiveProjectButton href={project.githubUrl} />
          </div>
        </div>

        {/* Project Card Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Details (45%) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            <div>
              <p className="text-[#D7E2EA]/85 text-sm sm:text-base leading-relaxed mb-4 font-light">
                {project.description}
              </p>

              {/* Metric Impact Highlight */}
              <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/10 p-3.5 mb-4">
                <span className="text-xs uppercase tracking-wider text-cyan-400 font-bold block mb-1">
                  Key Impact
                </span>
                <span className="text-white text-xs sm:text-sm font-medium">
                  {project.metrics}
                </span>
              </div>
            </div>

            {/* Tech Badges */}
            <div className="flex flex-wrap gap-2 pt-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 text-xs font-semibold rounded-full bg-white/5 text-neutral-300 border border-white/10"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Right Image Showcase (55%) */}
          <div className="lg:col-span-7 overflow-hidden rounded-[24px] sm:rounded-[32px] md:rounded-[40px] border border-white/10 bg-neutral-900 min-h-[260px] sm:min-h-[320px] relative group">
            <img
              src={project.image}
              alt={project.name}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export function ProjectsSection() {
  return (
    <section
      id="projects"
      className="bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 relative z-10 px-5 sm:px-8 md:px-10 pt-20 sm:pt-28 md:pt-36 pb-32"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Category Pill */}
        <FadeIn delay={0} y={20} className="w-full text-center">
          <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-[#D7E2EA] uppercase tracking-widest text-xs font-semibold mb-3">
            Portfolio Showcase
          </div>
        </FadeIn>

        {/* Heading */}
        <FadeIn delay={0.1} y={40} className="w-full text-center mb-16 sm:mb-20 md:mb-28">
          <h2
            className="hero-heading font-black uppercase text-center leading-none"
            style={{ fontSize: 'clamp(2.8rem, 10vw, 130px)' }}
          >
            Selected Projects
          </h2>
        </FadeIn>

        {/* Sticky-Stacking Cards */}
        <div className="flex flex-col gap-12">
          {PROJECTS.map((project, index) => (
            <ProjectCard
              key={project.number}
              project={project}
              index={index}
              totalCards={PROJECTS.length}
            />
          ))}
        </div>

        {/* Education & Certifications */}
        <div className="mt-32 pt-20 border-t border-[#D7E2EA]/15">
          <FadeIn delay={0.1} y={30} className="text-center mb-14">
            <div className="inline-block px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 uppercase tracking-widest text-xs font-semibold mb-3">
              Academic Background &amp; Credentials
            </div>
            <h3
              className="hero-heading font-black uppercase text-center leading-none"
              style={{ fontSize: 'clamp(2rem, 6vw, 70px)' }}
            >
              Education &amp; Certifications
            </h3>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Education Card */}
            <FadeIn delay={0.2} y={20} className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8 backdrop-blur-md">
              <span className="text-xs uppercase tracking-widest text-cyan-400 font-bold block mb-2">
                Degree Program
              </span>
              <h4 className="text-white text-xl sm:text-2xl font-bold mb-2">
                Bachelor of Computer Applications
              </h4>
              <p className="text-cyan-300 text-sm font-medium mb-3">
                Data &amp; Computing Focus
              </p>
              <p className="text-[#D7E2EA]/70 text-sm leading-relaxed mb-4">
                Indira Gandhi National Open University (IGNOU), Delhi
              </p>
              <div className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 text-xs font-semibold">
                2024 – Present | Expected 2027
              </div>
            </FadeIn>

            {/* Certifications List */}
            <FadeIn delay={0.3} y={20} className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8 backdrop-blur-md flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase tracking-widest text-purple-400 font-bold block mb-3">
                  Verified Certifications
                </span>
                <ul className="space-y-2.5">
                  {CERTIFICATIONS.map((cert) => (
                    <li key={cert} className="flex items-center gap-2.5 text-xs sm:text-sm text-[#D7E2EA]">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
                      <span>{cert}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Footer / Contact Anchor */}
        <div id="contact" className="mt-32 pt-20 border-t border-[#D7E2EA]/15 flex flex-col items-center text-center">
          <FadeIn delay={0.1} y={30}>
            <div className="inline-block px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 uppercase tracking-widest text-xs font-semibold mb-4">
              Get in Touch
            </div>
            <h3
              className="hero-heading font-black uppercase text-center leading-none mb-6"
              style={{ fontSize: 'clamp(2.5rem, 8vw, 90px)' }}
            >
              Let&apos;s Connect
            </h3>
            <p className="text-[#D7E2EA]/70 max-w-lg mx-auto text-sm sm:text-base leading-relaxed mb-10">
              Open for Data Analyst, Business Intelligence, &amp; Analytics Engineering roles. Let&apos;s discuss how I can bring actionable data insights to your team.
            </p>

            <div className="flex flex-wrap justify-center items-center gap-4 mb-8">
              <a
                href="mailto:piyushrajsharma969@gmail.com"
                className="px-6 py-3 rounded-full border border-white/15 bg-white/5 text-white hover:bg-white/10 transition-colors text-sm font-medium flex items-center gap-2"
              >
                <span>📧</span> piyushrajsharma969@gmail.com
              </a>
              <a
                href="tel:+917631103647"
                className="px-6 py-3 rounded-full border border-white/15 bg-white/5 text-white hover:bg-white/10 transition-colors text-sm font-medium flex items-center gap-2"
              >
                <span>📞</span> +91 7631103647
              </a>
              <a
                href="https://github.com/Piyushrajsharm"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full border border-white/15 bg-white/5 text-white hover:bg-white/10 transition-colors text-sm font-medium flex items-center gap-2"
              >
                <span>💻</span> GitHub: Piyushrajsharm
              </a>
            </div>

            <ContactButton href="mailto:piyushrajsharma969@gmail.com" />
          </FadeIn>

          <div className="mt-20 text-[#D7E2EA]/40 text-xs sm:text-sm uppercase tracking-wider">
            © {new Date().getFullYear()} Piyush Raj Sharma • Data Analyst &amp; BI Specialist • Delhi, India
          </div>
        </div>
      </div>
    </section>
  )
}
