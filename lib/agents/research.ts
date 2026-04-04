import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

export async function researchAgent(query: string): Promise<string> {
  const message = await client.messages.create({
    model: "claude-3-5-sonnet-20241022",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: `You are a UAE construction market research expert. 
        
User Query: ${query}

Provide:
1. Current material costs in UAE (AED per unit)
2. Labor rates by skill level
3. Market trends and price movements
4. Supplier availability

Be specific with prices and sources. Focus on Dubai, Abu Dhabi, Sharjah.`,
      },
    ],
  });

  if (message.content[0].type === "text") {
    return message.content[0].text;
  }

  return "Research data unavailable";
}
