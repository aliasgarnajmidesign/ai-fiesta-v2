import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleGenerativeAIStream, StreamingTextResponse } from "ai";

export const runtime = "nodejs";

const MODELS = ["gemini-1.5-flash-latest", "gemini-1.5-pro-latest", "gemini-1.0-pro"];

export async function POST(req: Request) {
  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: "Missing GOOGLE_GENERATIVE_AI_API_KEY" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const body = await req.json().catch(() => ({}));
  const messages = Array.isArray(body?.messages) ? body.messages : [];

  const contents =
    messages.length > 0
      ? messages.map((m: any) => ({
          role: m.role === "user" ? "user" : "model",
          parts: [{ text: String(m.content ?? "") }],
        }))
      : [{ role: "user", parts: [{ text: "Hello" }] }];

  const systemInstruction =
    "You are AI Fiesta, an expert construction cost estimator for UAE projects. Provide estimates in AED with material and labor breakdowns. Be concise and helpful.";

  const genAI = new GoogleGenerativeAI(apiKey);

  let lastErr: any = null;
  for (const name of MODELS) {
    try {
      const model = genAI.getGenerativeModel({ model: name, systemInstruction });
      const response = await model.generateContentStream({ contents });
      const stream = GoogleGenerativeAIStream(response);
      return new StreamingTextResponse(stream, { headers: { "x-model-used": name } });
    } catch (e: any) {
      const msg = e?.message || "";
      const status = e?.status;
      // If model not found/unsupported, try next
      if (status === 404 || /not found|unsupported/i.test(msg)) {
        lastErr = e;
        continue;
      }
      lastErr = e;
      break;
    }
  }

  console.error("Chat API Error:", lastErr);
  return new Response(JSON.stringify({ error: lastErr?.message || "Model unavailable" }), {
    status: 500,
    headers: { "Content-Type": "application/json" },
  });
}

export async function GET() {
  return new Response(JSON.stringify({ ok: true, route: "/api/chat" }), {
    headers: { "Content-Type": "application/json" },
  });
}
