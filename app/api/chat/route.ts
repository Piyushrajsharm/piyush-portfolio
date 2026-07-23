import { NextResponse } from "next/server";
import portfolio from "@/data/portfolio.json";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

const SYSTEM_PROMPT = `You ARE Piyush Raj Sharma, speaking directly to recruiters and visitors on your portfolio in the FIRST PERSON ("I", "my", "me").

CRITICAL BREVITY & PERSONA RULES:
1. STRICT LENGTH LIMIT: Keep EVERY response VERY SHORT, PUNCHY, and CONCISE. Maximum 2 to 4 short bullet points or 2 brief sentences (under 75 words)! Never write long paragraphs or essays.
2. ALWAYS speak as Piyush Raj Sharma in the first person ("I am...", "My skills...", "My projects...", "Contact me at..."). Never use third person ("Piyush is...").
3. Get straight to the point immediately with zero filler words.

My Core Facts:
- Name & Role: Piyush Raj Sharma | ${portfolio.person.headline}
- Location: ${portfolio.person.location}
- Email: ${portfolio.person.email}
- LinkedIn: ${portfolio.person.socials.linkedin}
- GitHub: ${portfolio.person.socials.github}
- Core Skills: SQL (88%), Python (84%), Power BI (82%), Excel (86%), Pandas, Machine Learning, AI.
- Key Projects: Sales Analytics Dashboard, AI Resume Analyzer, Movie Recommender, Customer Segmentation, Stock Market Prediction, SQL Data Cleaning Lab.
- Availability: Actively seeking Data Analyst, BI Developer & AI roles/internships.`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey || apiKey === "your_groq_api_key_here") {
      return NextResponse.json({
        role: "assistant",
        content: `👋 **Hi! I'm Piyush Raj Sharma.**\n\n- 🎯 **Focus**: ${portfolio.person.headline}\n- 🛠️ **Core Stack**: SQL, Python, Power BI, Excel, Pandas, Machine Learning\n- 📧 **Email**: [${portfolio.person.email}](mailto:${portfolio.person.email})\n- 💼 **LinkedIn**: [Profile](${portfolio.person.socials.linkedin})`
      });
    }

    const payload = {
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...(messages || []).slice(-6)
      ],
      temperature: 0.6,
      max_tokens: 180
    };

    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const fallbackResponse = await fetch(GROQ_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          ...payload,
          model: "llama3-8b-8192"
        })
      });

      if (fallbackResponse.ok) {
        const fallbackData = await fallbackResponse.json();
        const content = fallbackData.choices?.[0]?.message?.content ?? "No response generated.";
        return NextResponse.json({ role: "assistant", content });
      }

      throw new Error(`Groq API returned status ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content ?? "No response generated.";

    return NextResponse.json({ role: "assistant", content });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      {
        role: "assistant",
        content: `Hi! I am **Piyush Raj Sharma**, a ${portfolio.person.headline}. Check out my [GitHub](${portfolio.person.socials.github}) or email me at **${portfolio.person.email}**.`
      },
      { status: 200 }
    );
  }
}
