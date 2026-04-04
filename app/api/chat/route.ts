import { StreamingTextResponse } from "ai";
import { Anthropic } from "@anthropic-ai/sdk";
import { agentRouter } from "@/lib/agents/router";

const client = new Anthropic();

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || messages.length === 0) {
      return new Response("No messages provided", { status: 400 });
    }

    const userMessage = messages[messages.length - 1].content;

    // Check if this is an estimation request
    const isEstimationRequest =
      userMessage.toLowerCase().includes("estimate") ||
      userMessage.toLowerCase().includes("cost") ||
      userMessage.toLowerCase().includes("price") ||
      userMessage.toLowerCase().includes("project");

    let responseText = "";

    if (isEstimationRequest) {
      // Use multi-agent system for estimation queries
      try {
        const agentResult = await agentRouter(userMessage);
        responseText = agentResult.summary;
      } catch (error) {
        console.error("Agent system error:", error);
        responseText = "Unable to process estimation request. Please try again.";
      }
    } else {
      // Use regular Claude for general queries
      const response = await client.messages.create({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 1024,
        messages: [
          {
            role: "user",
            content: `You are AI Fiesta, a professional construction estimation assistant for UAE markets. 
            
User: $${userMessage}

Provide helpful, professional responses about construction, estimation, or related topics.`,
          },
        ],
      });

      if (response.content[0].type === "text") {
        responseText = response.content[0].text;
      }
    }

    // Stream the response
    const stream = new ReadableStream({
      async start(controller) {
        controller.enqueue(responseText);
        controller.close();
      },
    });

    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error("Chat API Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
