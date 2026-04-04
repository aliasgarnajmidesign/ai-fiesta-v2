import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleGenerativeAIStream, StreamingTextResponse } from "ai";

export const runtime = "nodejs"; // more compatible for SDK + streaming

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    if (!apiKey) {
      return new Response(
        JSON.stringify({
          error: "Missing GOOGLE_GENERATIVE_AI_API_KEY in environment.",
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const { messages } = await req.json();

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      // flash is widely allowed and fast; switch to "gemini-1.5-pro" later if desired
      model: "gemini-1.5-flash",
      systemInstruction:
        "You are AI Fiesta, an expert construction cost estimator for UAE projects. Provide estimates in AED with material and labor breakdowns. Be concise and helpful.",
    });

    // Map Vercel AI SDK messages to Gemini format
    const contents =
      Array.isArray(messages) && messages.length
        ? messages.map((m: any) => ({
            role: m.role === "user" ? "user" : "model",
            parts: [{ text: String(m.content || "") }],
          }))
        : [{ role: "user", parts: [{ text: "Hello" }] }];

    const response = await model.generateContentStream({ contents });
    const stream = GoogleGenerativeAIStream(response);
    return new StreamingTextResponse(stream);
  } catch (err: any) {
    console.error("Chat API Error:", err);
    const message =
      err?.message || err?.toString?.() || "Unknown server error in /api/chat";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function GET() {
  return new Response(JSON.stringify({ ok: true, route: "/api/chat" }), {
    headers: { "Content-Type": "application/json" },
  });
}
