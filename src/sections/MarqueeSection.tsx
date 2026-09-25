import { useRef, useState, useEffect } from 'react'

const ROW1_SKILLS = [
  { title: 'SQL & Advanced Querying', subtitle: 'CTEs, Window Functions, Joins', icon: '🗄️', color: 'from-blue-600/30 to-cyan-500/30' },
  { title: 'Power BI & DAX', subtitle: 'Interactive KPI Dashboards', icon: '📊', color: 'from-yellow-500/30 to-amber-600/30' },
  { title: 'Python for Data Science', subtitle: 'Pandas, NumPy, Scikit-learn', icon: '🐍', color: 'from-emerald-500/30 to-teal-600/30' },
  { title: 'Deloitte Job Simulation', subtitle: 'Forensic Investigation & Risk', icon: '🏢', color: 'from-blue-500/30 to-indigo-600/30' },
  { title: 'Automated ETL Pipelines', subtitle: 'Ingestion, Cleaning & Merging', icon: '⚡', color: 'from-purple-500/30 to-pink-600/30' },
  { title: 'Exploratory Data Analysis', subtitle: 'Trend & Anomaly Detection', icon: '🔍', color: 'from-cyan-500/30 to-blue-600/30' },
  { title: 'Advanced Excel Analytics', subtitle: 'XLOOKUP, Pivot Tables, DAX', icon: '📈', color: 'from-green-600/30 to-emerald-500/30' },
  { title: 'Tata GenAI Analytics', subtitle: 'Customer Risk & Delinquency', icon: '🤖', color: 'from-violet-500/30 to-purple-600/30' },
  { title: 'Machine Learning Models', subtitle: 'Classification & Regression', icon: '🧠', color: 'from-fuchsia-500/30 to-rose-600/30' },
  { title: 'Executive BI Reporting', subtitle: '-40% Manual Effort Reduction', icon: '📉', color: 'from-sky-500/30 to-blue-600/30' },
  { title: 'Streamlit & Jupyter', subtitle: 'Interactive Data Apps', icon: '🚀', color: 'from-red-500/30 to-orange-500/30' },
]

const ROW2_SKILLS = [
  { title: 'Customer Churn Prediction', subtitle: 'Logistic Regression & Random Forest', icon: '🎯', color: 'from-rose-500/30 to-red-600/30' },
  { title: 'ATS Resume Scorer', subtitle: 'NLP, TF-IDF & Cosine Similarity', icon: '📄', color: 'from-indigo-500/30 to-blue-600/30' },
  { title: 'LSTM Price Forecasting', subtitle: 'TensorFlow & Deep Learning', icon: '📈', color: 'from-emerald-500/30 to-cyan-600/30' },
  { title: 'Tata Data Visualization', subtitle: 'Executive Decision Storytelling', icon: '🌐', color: 'from-purple-500/30 to-indigo-600/30' },
  { title: 'RFM Customer Segmentation', subtitle: 'Behavioral Value Cohorts', icon: '👥', color: 'from-amber-500/30 to-yellow-600/30' },
  { title: 'Data Cleaning & Validation', subtitle: 'Handling Nulls & Outliers', icon: '🧹', color: 'from-teal-500/30 to-cyan-600/30' },
  { title: 'Matplotlib & Seaborn', subtitle: 'Statistical Visualizations', icon: '📊', color: 'from-blue-500/30 to-sky-600/30' },
  { title: 'Relational Schema Design', subtitle: 'Star & Snowflake Schema', icon: '📐', color: 'from-cyan-500/30 to-teal-600/30' },
  { title: 'KPI Hierarchy Architecture', subtitle: 'YoY Growth & Variance Measures', icon: '⚖️', color: 'from-fuchsia-500/30 to-purple-600/30' },
  { title: 'Data Storytelling', subtitle: 'Executive Ready Insights', icon: '💡', color: 'from-violet-500/30 to-indigo-600/30' },
]

const ROW1_TRIPLED = [...ROW1_SKILLS, ...ROW1_SKILLS, ...ROW1_SKILLS]
const ROW2_TRIPLED = [...ROW2_SKILLS, ...ROW2_SKILLS, ...ROW2_SKILLS]

export function MarqueeSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const sectionTop = rect.top + window.scrollY
      const currentOffset = (window.scrollY - sectionTop + window.innerHeight) * 0.3
      setOffset(currentOffset)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section
      ref={sectionRef}
      className="bg-[#0C0C0C] pt-20 sm:pt-28 md:pt-36 pb-12 overflow-hidden flex flex-col gap-4 select-none"
    >
      {/* Row 1: moves RIGHT on scroll */}
      <div
        className="flex gap-4 whitespace-nowrap"
        style={{
          transform: `translate3d(${offset - 200}px, 0, 0)`,
          willChange: 'transform',
        }}
      >
        {ROW1_TRIPLED.map((item, i) => (
          <div
            key={i}
            className={`w-[340px] sm:w-[380px] h-[100px] flex-shrink-0 rounded-2xl bg-gradient-to-r ${item.color} border border-white/10 p-4 flex items-center gap-4 backdrop-blur-md transition-all duration-300 hover:border-cyan-400/50 hover:scale-105`}
          >
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-2xl flex-shrink-0 shadow-inner">
              {item.icon}
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-white font-semibold text-base sm:text-lg tracking-wide truncate">
                {item.title}
              </span>
              <span className="text-[#D7E2EA]/70 text-xs sm:text-sm font-light truncate">
                {item.subtitle}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Row 2: moves LEFT on scroll */}
      <div
        className="flex gap-4 whitespace-nowrap"
        style={{
          transform: `translate3d(${-(offset - 200)}px, 0, 0)`,
          willChange: 'transform',
        }}
      >
        {ROW2_TRIPLED.map((item, i) => (
          <div
            key={i}
            className={`w-[340px] sm:w-[380px] h-[100px] flex-shrink-0 rounded-2xl bg-gradient-to-r ${item.color} border border-white/10 p-4 flex items-center gap-4 backdrop-blur-md transition-all duration-300 hover:border-cyan-400/50 hover:scale-105`}
          >
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-2xl flex-shrink-0 shadow-inner">
              {item.icon}
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-white font-semibold text-base sm:text-lg tracking-wide truncate">
                {item.title}
              </span>
              <span className="text-[#D7E2EA]/70 text-xs sm:text-sm font-light truncate">
                {item.subtitle}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
