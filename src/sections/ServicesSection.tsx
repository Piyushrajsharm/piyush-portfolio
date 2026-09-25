import { FadeIn } from '../components/FadeIn'

interface SkillCategory {
  number: string
  name: string
  description: string
  skills: string[]
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    number: '01',
    name: 'Data Analysis & EDA',
    description:
      'Exploratory Data Analysis, Data Cleaning, Data Transformation, Data Validation, Data Quality Assurance, Trend Analysis, Statistical Modeling, KPI Analysis, Business Insights, and Executive Reporting.',
    skills: ['EDA', 'Data Cleaning', 'Data Quality', 'Statistical Analysis', 'KPI Frameworks', 'Trend Analysis'],
  },
  {
    number: '02',
    name: 'SQL & Relational Databases',
    description:
      'Advanced SQL architecture, Relational Database Design, Complex Joins, Subqueries, Common Table Expressions (CTEs), Window Functions, Multi-level Aggregations, High-speed Querying, and Data Extraction.',
    skills: ['CTEs', 'Window Functions', 'Complex Joins', 'Subqueries', 'Relational Schemas', 'Query Tuning'],
  },
  {
    number: '03',
    name: 'Python & Data Engineering',
    description:
      'End-to-end Python data stack with Pandas and NumPy for tabular processing, Scikit-learn for modeling, Matplotlib and Seaborn for statistical charting, TensorFlow/Keras for neural networks, automation scripting, and ETL pipelines.',
    skills: ['Pandas', 'NumPy', 'Scikit-learn', 'Automated ETL', 'Feature Engineering', 'TensorFlow/Keras'],
  },
  {
    number: '04',
    name: 'BI & Interactive Dashboards',
    description:
      'Power BI enterprise development, DAX calculations, Power Query data mashup, Star/Snowflake Data Modeling, Calculated Measures, Executive KPIs, Multi-page Drilldowns, and Business Intelligence storytelling.',
    skills: ['Power BI', 'DAX Measures', 'Power Query', 'Data Modeling', 'Interactive Dashboards', 'Drilldowns'],
  },
  {
    number: '05',
    name: 'Machine Learning & AI',
    description:
      'Predictive modeling pipelines with Logistic Regression, Random Forest classifiers, Natural Language Processing (NLP) with TF-IDF and Cosine Similarity for ATS match scoring, Time-Series Forecasting with LSTM, and RFM Customer Segmentation.',
    skills: ['Classification', 'Random Forest', 'NLP & TF-IDF', 'Cosine Similarity', 'LSTM Time-Series', 'RFM Segments'],
  },
  {
    number: '06',
    name: 'Advanced Excel & Modern Tools',
    description:
      'Advanced Excel modeling, Dynamic Pivot Tables, VLOOKUP, XLOOKUP, INDEX-MATCH, complex SUMIFS/COUNTIFS logic, Git version control, GitHub workflows, Jupyter Notebook environment, and Streamlit data applications.',
    skills: ['Advanced Excel', 'XLOOKUP & INDEX-MATCH', 'Pivot Tables', 'Git & GitHub', 'Jupyter', 'Streamlit'],
  },
]

export function ServicesSection() {
  return (
    <section
      id="skills"
      className="bg-[#FFFFFF] text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 relative z-0"
    >
      <div className="max-w-5xl mx-auto w-full">
        {/* Category Pill */}
        <FadeIn delay={0} y={20} className="w-full text-center">
          <div className="inline-block px-4 py-1.5 rounded-full border border-black/15 bg-black/5 text-[#0C0C0C] uppercase tracking-widest text-xs font-semibold mb-3">
            Core Competencies
          </div>
        </FadeIn>

        {/* Heading */}
        <FadeIn delay={0.1} y={30} className="w-full text-center">
          <h2
            className="font-black uppercase text-center text-[#0C0C0C] leading-none mb-16 sm:mb-20 md:mb-28"
            style={{ fontSize: 'clamp(2.8rem, 10vw, 130px)' }}
          >
            Technical Skills
          </h2>
        </FadeIn>

        {/* Skills List */}
        <div className="border-t border-[#0C0C0C]/15 w-full">
          {SKILL_CATEGORIES.map((category, index) => (
            <FadeIn
              key={category.number}
              delay={index * 0.08}
              y={25}
              className="border-b border-[#0C0C0C]/15"
            >
              <div className="flex flex-col sm:flex-row sm:items-start py-8 sm:py-10 md:py-12 gap-4 sm:gap-8 md:gap-12">
                {/* Number */}
                <div
                  className="font-black leading-none text-[#0C0C0C] shrink-0 select-none w-[100px] sm:w-[140px] md:w-[180px]"
                  style={{ fontSize: 'clamp(2.5rem, 8vw, 100px)' }}
                >
                  {category.number}
                </div>

                {/* Name, Description, & Badges */}
                <div className="flex flex-col justify-center gap-3 sm:gap-4 flex-1">
                  <h3
                    className="font-bold uppercase text-[#0C0C0C] leading-tight tracking-wide"
                    style={{ fontSize: 'clamp(1.1rem, 2.2vw, 1.8rem)' }}
                  >
                    {category.name}
                  </h3>
                  <p
                    className="font-normal leading-relaxed max-w-2xl text-[#0C0C0C] opacity-75 text-sm sm:text-base"
                  >
                    {category.description}
                  </p>

                  {/* Skill Badges */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 text-xs font-medium rounded-full bg-neutral-100 text-neutral-800 border border-neutral-300/80 shadow-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
