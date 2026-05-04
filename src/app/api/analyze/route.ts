import { NextRequest, NextResponse } from "next/server";
const pdf = require("pdf-parse");

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("resume") as File;
    const jobDescription = formData.get("jobDescription") as string;
    const targetCompany = formData.get("targetCompany") as string;
    const manualSkillsStr = formData.get("manualSkills") as string;
    const manualSkills = manualSkillsStr ? JSON.parse(manualSkillsStr) : [];

    if (!file || !jobDescription) {
      return NextResponse.json({ error: "Missing required data." }, { status: 400 });
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) return NextResponse.json({ error: "No API Key." }, { status: 500 });

    const buffer = Buffer.from(await file.arrayBuffer());
    let resumeText = "";
    try {
      const pdfData = await pdf(buffer);
      resumeText = pdfData.text;
    } catch (e) {
      console.error("PDF Parsing Error:", e);
      return NextResponse.json({ error: "PDF read failed. Ensure it is a valid text-based PDF." }, { status: 400 });
    }

    const prompt = `You are 'The Brutal Career Architect'. You perform surgical-grade, unapologetic analysis with strict logical relevance. You do not sugarcoat.

CRITICAL: You MUST validate if the input is a legitimate career path or professional skill set.

CONTEXT:
- Target Role/JD: ${jobDescription}
- Target Company: ${targetCompany || "General Market Standard"}
- Manual Skill Audit: ${manualSkills.join(", ")}
- Profile Identity: ${resumeText.slice(0, 4000)}

CRITICAL LOGIC RULES:
0. DOMAIN AGNOSTIC: You must support ANY professional domain (e.g., Software, HR, Business, Agriculture, Hotel Management). Generate relevant skills, resources, and terminology specific to that domain.
1. SEMANTIC VALIDATION: If the 'Target Role' or 'Manual Skills' are gibberish (e.g., "skldfjgh"), completely unrelated objects (e.g., "pani puri", "pressure cooker"), or non-career terms, you MUST:
   - Set 'score' to 0.
   - Return an 'invalidInput' field set to true.
   - Set 'summary' to a brutally sarcastic rejection of their attempt to benchmark a non-career item.
2. BENCHMARKING: For legitimate roles (e.g. "Senior Full Stack", "HR Manager", "Agricultural Specialist"), use 2024-2025 elite industry standards.
3. DELTA VISUALIZATION: Identify exact gaps between the Profile and the Industry Standard.
4. REAL-WORLD SCORING: 0-100 integer. Be EXTREMELY STINGY. 90%+ is for world-class matches only. Nonsensical inputs = 0.
5. REJECTION PROBABILITY: Calculate a brutal 0-100 percentage of how likely they are to be rejected by ${targetCompany || "a top-tier company"} based on their gaps.
6. SUMMARY PATTERN: "You are [Level]. You will likely be rejected because you lack [Gaps]. You are competent at [Strengths]. Build [Project] to prove yourself. According to your CV you can also pursue [Career Path]."

JSON Structure:
{
  "score": number,
  "rejectionProbability": number,
  "invalidInput": boolean,
  "summary": "string",
  "missingSkills": ["string"],
  "presentSkills": ["string"],
  "softSkills": { "missing": ["string"], "present": ["string"] },
  "skillDetails": {
    "SkillName": {
      "explanation": "string",
      "importance": "string",
      "resources": [{ "name": "string", "url": "string" }]
    }
  },
  "trendingSkills": ["string"],
  "marketPulse": {
    "SkillName": "Hype" | "Utility" | "Foundational"
  },
  "suggestedRoles": ["string"],
  "promotionRoadmap": {
    "nextLevel": "string",
    "yearsEstimate": "string",
    "criticalGap": "string",
    "leadershipSkills": ["string"]
  },
  "salaryIntelligence": {
    "currentMarketRange": "string",
    "potentialIncrease": "string",
    "negotiationLeverage": "string"
  },
  "marketSentiment": {
    "vibe": "Bullish" | "Bearish" | "Neutral",
    "shortReason": "string"
  },
  "courses": [{ "title": "string", "platform": "string", "type": "string", "link": "string" }],
  "projects": [{ "title": "string", "description": "string", "techStack": ["string"], "repoType": "string" }], // Note: 'techStack' means 'Core Tools / Methodologies' for non-tech roles
  "interviewQuestions": [{ "question": "string", "context": "string" }]
}

Return ONLY raw JSON. Do not include any text outside the JSON.`;

    const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        temperature: 0.1, // Near-zero temperature for absolute logic
        messages: [
          { role: "system", content: "You are The Brutal Career Architect. You perform unapologetic, data-driven career diagnostics. Return valid raw JSON." },
          { role: "user", content: prompt },
        ],
      }),
    });

    const groqData = await groqResponse.json();
    const rawContent = groqData.choices[0].message.content;

    try {
      const jsonMatch = rawContent.match(/\{[\s\S]*\}/);
      const result = JSON.parse(jsonMatch ? jsonMatch[0] : rawContent);
      return NextResponse.json({ ...result, resumeText });
    } catch (e) {
      return NextResponse.json({ error: "Intelligence synthesis failed." }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ error: "Server diagnostic error." }, { status: 500 });
  }
}
