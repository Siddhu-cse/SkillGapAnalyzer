import { NextRequest, NextResponse } from "next/server";
import * as mammoth from "mammoth";
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

    let resumeText = "";
    try {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const fileName = file.name.toLowerCase();

      console.log(`[API] Processing file: ${fileName}`);
      console.log(`[API] Buffer size: ${buffer.length} bytes`);

      if (fileName.endsWith(".docx")) {
        const result = await mammoth.extractRawText({ buffer });
        resumeText = result.value;
      } else if (fileName.endsWith(".pdf")) {
        console.log("[API] Attempting PDF extraction...");
        const pdf = require("pdf-parse");
        
        // Handle both the Mehmet Kozan fork (class-based) and the standard pdf-parse (function-based)
        if (pdf.PDFParse && typeof pdf.PDFParse === 'function') {
          console.log("[API] Using Mehmet Kozan fork (PDFParse class)");
          const parser = new pdf.PDFParse({ data: buffer });
          const result = await parser.getText();
          resumeText = result.text;
        } else {
          console.log("[API] Using standard pdf-parse (function)");
          const parse = typeof pdf === 'function' ? pdf : pdf.default;
          if (typeof parse !== 'function') {
            throw new Error("PDF parser module could not be initialized correctly.");
          }
          const data = await parse(buffer);
          resumeText = data.text;
        }
        console.log(`[API] Extracted ${resumeText?.length || 0} characters from PDF.`);
      } else {
        return NextResponse.json({ error: "Unsupported file format. Use PDF or DOCX." }, { status: 400 });
      }

      if (!resumeText || resumeText.trim().length < 10) {
        console.error("[API] Extraction failed: Text is too short or empty.");
        return NextResponse.json({ 
          error: "We found no readable text in your CV. If it's a scanned image, please use a text-based PDF." 
        }, { status: 400 });
      }
      
    } catch (err: any) {
      console.error("[API] PDF/DOCX Parsing Error:", err);
      return NextResponse.json({ 
        error: `CV Parsing Error: ${err.message || "Unknown error"}. Please try a different PDF.` 
      }, { status: 400 });
    }

    const prompt = `You are 'The Brutal Career Architect'. You perform surgical-grade, unapologetic analysis with strict logical relevance. You do not sugarcoat.

CRITICAL: You MUST validate if the input is a legitimate career path or professional skill set.

CONTEXT:
- Target Role/JD: ${jobDescription}
- Target Company: ${targetCompany || "General Market Standard"}
- Manual Skill Audit: ${manualSkills.join(", ")}
- Profile Identity: ${resumeText.slice(0, 8000)}

CRITICAL: You MUST use the 'Profile Identity' (the user's CV) as your primary source of truth for their current state. Analyze every detail mentioned in the CV to provide a highly personalized response.

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
    } catch {
      return NextResponse.json({ error: "Intelligence synthesis failed." }, { status: 500 });
    }
  } catch {
    return NextResponse.json({ error: "Server diagnostic error." }, { status: 500 });
  }
}
