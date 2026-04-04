import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleGenerativeAIStream, StreamingTextResponse } from "ai";

export const runtime = "edge";

const systemPrompt = `You are AI Fiesta, an expert construction cost estimator specializing in UAE projects.
- Provide accurate estimates in AED (UAE Dirhams)
- Include material and labor breakdowns
- Ask clarifying questions when needed
- Be professional, concise, and helpful`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const genAI = new GoogleGenerativeAI(
      process.env.GOOGLE_GENERATIVE_AI_API_KEY || ""
    );

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro",
    });

    // Prepend the system prompt as context for Gemini
    const contents = [
      { role: "user", parts: [{ text: systemPrompt }] },
      ...messages.map((m: any) => ({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.content }],
      })),
    ];

    const response = await model.generateContentStream({ contents });
    const stream = GoogleGenerativeAIStream(response);
    return new StreamingTextResponse(stream);
  } catch (err) {
    console.error("Chat API Error:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
