import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { context } = body;

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "No API Key" }, { status: 500 });
    }

    const prompt = `You are the Elite Networking Architect. Draft a hyper-personalized, high-conversion cold outreach message (for LinkedIn or Email) for a candidate targeting a role at '${context.targetCompany || "a top-tier company"}'.

    USER PROFILE:
    - Tech Gaps: ${context.missingSkills?.join(", ") || "None"}
    - Strengths: ${context.presentSkills?.join(", ") || "None"}
    - Readiness Score: ${context.score}%

    Rules:
    1. Be concise (under 150 words).
    2. Focus on a specific value proposition related to their strengths.
    3. Include a "hook" that mentions a common engineering challenge at '${context.targetCompany || "the company"}'.
    4. Provide two versions: "The Bold Engineer" and "The Strategic Learner".

    Return ONLY raw JSON:
    {
      "bold": "string",
      "strategic": "string"
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
          { role: "system", content: "You are the Elite Networking Architect. Return valid raw JSON only." },
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    const rawContent = data.choices[0].message.content;
    const jsonMatch = rawContent.match(/\{[\s\S]*\}/);
    return NextResponse.json(JSON.parse(jsonMatch ? jsonMatch[0] : rawContent));
  } catch (error) {
    console.error("Outreach Error:", error);
    return NextResponse.json({ error: "Outreach orchestration failed." }, { status: 500 });
  }
}
