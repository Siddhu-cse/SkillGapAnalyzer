import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { resumeText, targetRole } = body;

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "No API Key" }, { status: 500 });
    }

    const prompt = `You are the Elite Resume Repair Architect. Your job is to perform surgical-grade improvements on the following resume text to better align it with the target role: '${targetRole}'.

    RESUME TEXT:
    ${resumeText.slice(0, 8000)}

    Rules:
    1. Identify the 3 weakest bullet points or sections.
    2. Provide a "Before" and "After" (Brutally Optimized) for each.
    3. Use quantifiable metrics and high-impact action verbs.
    4. Provide a "Header Optimization" suggestion (Tagline/Summary).

    Return ONLY raw JSON in this structure:
    {
      "headerSuggestion": "string",
      "repairs": [
        {
          "before": "string",
          "after": "string",
          "rationale": "string"
        }
      ]
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
          { role: "system", content: "You are the Elite Resume Repair Architect. Return valid raw JSON only." },
          { role: "user", content: prompt }
        ],
        temperature: 0.3,
      }),
    });

    const data = await response.json();
    const rawContent = data.choices[0].message.content;
    const jsonMatch = rawContent.match(/\{[\s\S]*\}/);
    return NextResponse.json(JSON.parse(jsonMatch ? jsonMatch[0] : rawContent));
  } catch (error) {
    console.error("Repair Error:", error);
    return NextResponse.json({ error: "Resume repair failed." }, { status: 500 });
  }
}
