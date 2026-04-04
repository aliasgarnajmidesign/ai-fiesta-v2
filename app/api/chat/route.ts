import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleGenerativeAIStream, StreamingTextResponse } from "ai";

export const runtime = "nodejs";

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
      model: "gemini-1.5-flash",
      systemInstruction:
        "You are AI Fiesta, an expert construction cost estimator for UAE projects. Provide estimates in AED with material and labor breakdowns. Be concise and helpful.",
    });

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
