import portfolio from "@/data/portfolio.json";

export const siteConfig = {
  name: `${portfolio.person.fullName} | ${portfolio.person.headline}`,
  shortName: portfolio.person.fullName,
  description: portfolio.person.tagline,
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://piyush-portfolio.netlify.app",
  creator: portfolio.person.fullName,
  keywords: [
    "Piyush",
    "Data Analyst Portfolio",
    "AI Enthusiast",
    "Power BI",
    "SQL",
    "Python",
    "Analytics Portfolio",
    "React Portfolio"
  ],
  portfolio
};

export type PortfolioData = typeof portfolio;
export type Project = (typeof portfolio.projects)[number];
export type Skill = (typeof portfolio.skills)[number];
