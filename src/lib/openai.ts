import { Configuration, OpenAIApi } from "openai-edge";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

const MAX_RETRIES = 3;
const INITIAL_DELAY = 1000; // 1000ms (1 second)

export async function generateImagePrompt(name: string) {
  let retries = 0;

  while (retries < MAX_RETRIES) {
    try {
      const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are a creative and helpful AI assistant capable of generating interesting thumbnail descriptions for my notes. Your output will be fed into the DALLE API to generate a thumbnail. The description should be minimalistic and flat styled.",
          },
          {
            role: "user",
            content: `Please generate a thumbnail description for my notebook titled "${name}"`,
          },
        ],
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch response: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      if (!data.choices || data.choices.length === 0) {
        throw new Error("No choices found in API response");
      }

      const image_description = data.choices[0].message.content;

      if (!image_description) {
        throw new Error("Image description not found in API response");
      }

      return image_description as string;
    } catch (error) {
      console.error("Error generating image prompt:", error);

      if (error instanceof Error && error.message.includes("429")) {
        // If it's a 429 error, retry with exponential backoff
        retries++;
        const delay = Math.pow(2, retries) * INITIAL_DELAY;
        console.log(`Retrying in ${delay}ms...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      } else {
        throw error; // Throw any other errors immediately
      }
    }
  }

  throw new Error(`Exceeded maximum retries (${MAX_RETRIES}) for generating image prompt`);
}

export async function generateImage(image_description: string) {
  try {
    const response = await openai.createImage({
      prompt: image_description,
      n: 1,
      size: "256x256",
    });
    const data = await response.json();
    const image_url = data.data[0].url;
    return image_url as string;
  } catch (error) {
    console.error(error);
  }
}