import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleGenerativeAIStream, StreamingTextResponse } from "ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY || "");

export const runtime = "edge";

export async function POST(req: Request) {
  const { messages } = await req.json();
  
  // Extract the last message from the user
  const lastMessage = messages[messages.length - 1];

  const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-pro",
    systemInstruction: "You are AI Fiesta, an expert construction cost estimator for UAE projects. Provide accurate estimates in AED, material breakdowns, and labor costs. Be professional and helpful."
  });

  const response = await model.generateContentStream({
    contents: messages.map((m: any) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.content }],
    })),
  });

  const stream = GoogleGenerativeAIStream(response);
  return new StreamingTextResponse(stream);
