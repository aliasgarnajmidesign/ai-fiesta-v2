import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

export async function designAgent(
  projectDetails: string,
  estimate: string
): Promise<string> {
  const message = await client.messages.create({
    model: "claude-3-5-sonnet-20241022",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: `You are a professional construction design optimization expert for UAE projects.

Project Details:
$${projectDetails}

Current Estimate:
$${estimate}

Provide:
1. Design optimization suggestions (cost vs quality trade-offs)
2. Material alternatives that could reduce costs
3. Modern construction methods for efficiency
4. Sustainability improvements and their costs
5. Schedule optimization tips

Focus on practical, implementable suggestions for UAE market conditions.`,
      },
    ],
  });

  if (message.content[0].type === "text") {
    return message.content[0].text;
  }

  return "Design suggestions unavailable";
}
