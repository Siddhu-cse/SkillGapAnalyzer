import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { skill, context } = body;

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "No API Key" }, { status: 500 });
    }

    const prompt = `You are the Elite Project Architect. Create a high-impact, unique, 2-week project blueprint for a student/employee who is missing the skill: '${skill}'.
    
    USER CONTEXT:
    - Target Role: ${context.targetRole || "General Professional"}
    - Target Company: ${context.targetCompany || "Top Tier"}
    
    The blueprint MUST include:
    1. Project Title (Creative & Impressive)
    2. One-sentence unique value proposition.
    3. Week 1 Goals (Foundation & Core Logic)
    4. Week 2 Goals (Orchestration & Deployment)
    5. Core Tools / Methodologies (Be specific to their domain. Map to 'techStack' in JSON)
    6. "The Killer Feature" (Something that makes recruiters stop scrolling).
    7. GitHub Readme hook.

    Return ONLY raw JSON in this structure:
    {
      "title": "string",
      "tagline": "string",
      "week1": ["string"],
      "week2": ["string"],
      "techStack": ["string"], // Note: Use for Core Tools/Methodologies if non-tech
      "killerFeature": "string",
      "readmeHook": "string"
    }`;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: "You are the Elite Project Architect. Return valid raw JSON only." },
          { role: "user", content: prompt }
        ],
        temperature: 0.5,
      }),
    });

    const data = await response.json();
    const rawContent = data.choices[0].message.content;
    const jsonMatch = rawContent.match(/\{[\s\S]*\}/);
    return NextResponse.json(JSON.parse(jsonMatch ? jsonMatch[0] : rawContent));
  } catch (error) {
    console.error("Blueprint Error:", error);
    return NextResponse.json({ error: "Blueprint orchestration failed." }, { status: 500 });
  }
}
