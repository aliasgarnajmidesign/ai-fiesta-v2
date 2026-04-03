import { streamText } from 'ai';
import { google } from '@ai-sdk/google';

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    // Validate environment variable early for clearer errors
    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      console.error('Missing GOOGLE_GENERATIVE_AI_API_KEY');
      return new Response('Server misconfiguration: missing GOOGLE_GENERATIVE_AI_API_KEY', { status: 500 });
    }

    const { messages } = await req.json();

    if (!Array.isArray(messages)) {
      return new Response('Invalid request body: "messages" must be an array', { status: 400 });
    }

    const result = await streamText({
      model: google('models/gemini-1.5-flash'),
      system: 'You are AI Fiesta Estimator, a professional UAE construction expert.',
      messages,
    });

    return result.toAIStreamResponse();
  } catch (err: any) {
    console.error('Chat route error:', err);
    return new Response('Internal Server Error', { status: 500 });
  }
}
