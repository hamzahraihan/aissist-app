import { Cloudflare } from 'cloudflare';
import { AIRunParams } from 'cloudflare/resources/ai/ai';

const client = new Cloudflare({
  apiToken: process.env.EXPO_PUBLIC_CLOUDFLARE_API_KEY,
});

export const cloudflareImageGenerator = async (prompt: string, modelName: string) => {
  try {
    console.log(`generating image with ${modelName}`);
    const response: any = await client.ai.run(modelName, {
      account_id: '9b37eea8034fbf61191d273e000f450e',
      prompt: prompt,
    });

    return response;
  } catch (error: any) {
    console.error(error.message);
    throw new Error(error.message);
  }
};

export const cloudflareTextGenerator = async (prompt: AIRunParams.Messages.Message[], modelName: string) => {
  try {
    console.log(`generating text with ${modelName}`);

    const stream = await client.ai.run(modelName, {
      account_id: '9b37eea8034fbf61191d273e000f450e',
      stream: true,
      messages: prompt,
    });

    return stream;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
