import { streamText } from "ai";
import { google } from "@ai-sdk/google";

export const runtime = "edge";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: google("models/gemini-1.5-flash"),
    system: "You are AI Fiesta Estimator, a professional UAE construction expert.",
    messages,
  });

  return result.toAIStreamResponse();
}
