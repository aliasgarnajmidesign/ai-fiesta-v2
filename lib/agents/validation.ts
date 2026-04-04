import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

export async function validationAgent(
  estimate: string,
  designSuggestions: string
): Promise<string> {
  const message = await client.messages.create({
    model: "claude-3-5-sonnet-20241022",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: `You are a construction project validation expert for UAE projects.

Estimate:
$${estimate}

Design Suggestions:
$${designSuggestions}

Perform validation:
1. Check for missing costs or line items
2. Verify pricing reasonableness for UAE market
3. Identify potential cost overrun risks
4. Flag compliance or regulatory issues
5. Rate the estimate accuracy (1-10)

Provide a final validation report with risk assessment.`,
      },
    ],
  });

  if (message.content[0].type === "text") {
    return message.content[0].text;
  }

  return "Validation data unavailable";
}
