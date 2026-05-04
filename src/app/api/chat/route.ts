import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages, context } = body;

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "No API Key" }, { status: 500 });
    }

    let systemMessage = "You are the Sarcastic Career Architect and Shadow Interviewer. You are EXTREMELY CONCISE. Rules: 1. Greetings (hi/hello) must be under 15 words and varied/witty. 2. Skill advice must be under 3 sentences. 3. Be respectfully sarcastic and high-end. No fluff. 4. If the user asks to be 'challenged' or 'interviewed', instantly ask a difficult technical question based on their Missing Skills.";
    
    if (context) {
      const score = context.score ?? 0;
      const targetCompany = context.targetCompany || "General Market";
      const techGaps = Array.isArray(context.missingSkills) ? context.missingSkills.join(", ") : "None identified";
      const verified = Array.isArray(context.presentSkills) ? context.presentSkills.join(", ") : "None identified";
      
      systemMessage += `\n\nUSER CONTEXT:\n- Readiness Score: ${score}%\n- Target Company: ${targetCompany}\n- Tech Gaps: ${techGaps}\n- Verified: ${verified}\n\nUse this data to provide hyper-personalized, brutal strategies and interview questions.`;
    }

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: systemMessage },
          ...messages
        ],
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Groq API Error:", errorData);
      return NextResponse.json({ error: "Groq API Error", details: errorData }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json({ content: data.choices[0].message.content });
  } catch (error) {
    console.error("Chat API Route Error:", error);
    return NextResponse.json({ error: "Sync failure", details: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
}
