import { OpenAIApi, Configuration } from "openai-edge";
import { StreamingTextResponse } from "ai";

// /api/completion
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

export async function POST(req: Request) {
  // extract the prompt from the body
  const { prompt } = await req.json();
  console.log("Received prompt:", prompt)

  try {
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `You are a helpful AI embedded in a notion text editor app that is used to autocomplete sentences.
        The traits of AI include expert knowledge, helpfulness, cleverness, and articulateness.
        AI is a well-behaved and well-mannered individual.
        AI is always friendly, kind, and inspiring, and he is eager to provide vivid and thoughtful responses to the user.`,
      },
      {
        role: "user",
        content: `
        I am writing a piece of text in a notion text editor app.
        Help me complete my train of thought here: ##${prompt}##
        keep the tone of the text consistent with the rest of the text.
        keep the response short and sweet.
        `,
      },
    ],
    stream: true,
  });

  console.log("API response status:", response.status);
  console.log("API response headers:", response.headers);
  // Check if the response has a body
  if (!response.body) {
    console.error("No stream available");
    return new Response("No stream available", { status: 500 });
  }

  // Create a streaming response
  return new StreamingTextResponse(response.body);
} catch (error) {
  console.error("Error creating streaming response:", error);
  return new Response("Error with OpenAI API request:", { status: 500 });
}
}

