import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

export async function estimationAgent(
  projectDetails: string,
  researchData: string
): Promise<string> {
  const message = await client.messages.create({
    model: "claude-3-5-sonnet-20241022",
    max_tokens: 1500,
    messages: [
      {
        role: "user",
        content: `You are a professional construction cost estimator for UAE projects.

Project Details:
$${projectDetails}

Market Research Data:
$${researchData}

Generate a detailed cost estimate including:
1. Material costs breakdown (by category)
2. Labor costs breakdown (by skill level)
3. Equipment rental costs
4. Permits and documentation fees
5. Contingency (10-15%)
6. Total project cost

Format as JSON with clear pricing structure.`,
      },
    ],
  });

  if (message.content[0].type === "text") {
    return message.content[0].text;
  }

  return "Estimation data unavailable";
}
