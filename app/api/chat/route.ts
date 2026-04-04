import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleGenerativeAIStream, StreamingTextResponse } from "ai";

export const runtime = "edge";

export async function POST(req: Request) {
  const { messages } = await req.json();
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY || "");
  const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-pro",
    systemInstruction: "You are AI Fiesta, a UAE construction cost expert. Give estimates in AED." 
  });

  const response = await model.generateContentStream({
    contents: messages.map((m: any) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.content }],
    })),
  });

  const stream = GoogleGenerativeAIStream(response);
  return new StreamingTextResponse(stream);
}
