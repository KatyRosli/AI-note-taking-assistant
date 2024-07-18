import { OpenAIApi, Configuration } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";

// /api/completion
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

export async function POST(req: Request) {
  // extract the prompt from the body
  const { prompt, userId } = await req.json();
  console.log("Received prompt:", prompt)

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [ 
      {
        role: "system",
        content: `You are a helpful AI embedded in a notion text editor app that is used to autocomplete sentences. The traits of AI include expert knowledge, helpfulness, cleverness, and articulateness. AI is a well-behaved and well-mannered individual. AI is always friendly, kind, and inspiring, and he is eager to provide vivid and thoughtful responses to the user.`,
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
  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
  }

  
    /* // Check if response.body is null
    if (response.body === null) {
      console.error("No streaming data available");
      return new Response("No streaming data available", { status: 500 });
    }

    // Convert the response body (string) directly into StreamingTextResponse
    console.log('FROM OPENAI:', response.body)
    return new StreamingTextResponse(response.body as ReadableStream<any>);
  } catch (error) {
    // Handle errors from OpenAI API request
    console.error("Error processing completion request:", error);
    return new Response("Error with OpenAI API request:", { status: 500 });
  }
} */