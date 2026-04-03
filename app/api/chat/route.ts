import { streamText } from 'ai';
import { google } from '@ai-sdk/google';

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    
    if (!apiKey) {
      console.error('Missing GOOGLE_GENERATIVE_AI_API_KEY');
      return new Response('Server misconfiguration: missing API key', { status: 500 });
    }

    const body = await req.json().catch(() => null);
    
    if (!body || !Array.isArray(body.messages)) {
      return new Response('Invalid request: { messages: [...] } required', { status: 400 });
    }

    const result = await streamText({
      model: google('models/gemini-1.5-flash', { apiKey }) as any,
      system: 'You are AI Fiesta Estimator, a professional UAE construction expert with deep knowledge of Dubai and UAE construction standards, material costs, labor rates, and project planning.',
      messages: body.messages,
    });

    return result.toAIStreamResponse();
  } catch (error: any) {
    console.error('Chat API Error:', error?.message || error);
    return new Response('Internal server error', { status: 500 });
  }
}
