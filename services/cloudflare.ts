import { Cloudflare } from 'cloudflare';

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
