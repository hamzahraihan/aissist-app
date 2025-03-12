import { Cloudflare } from 'cloudflare';

const client = new Cloudflare({
  apiKey: process.env.EXPO_PUBLIC_CLOUDFLARE_API_KEY,
  apiToken: process.env.EXPO_PUBLIC_CLOUDFLARE_API_KEY,
});

export const cloudflareImageGenerator = async (prompt: string) => {
  try {
    const response = await client.ai.run('@cf/black-forest-labs/flux-1-schnell', {
      account_id: '9b37eea8034fbf61191d273e000f450e',
      prompt: prompt,
    });
    return response;
  } catch (error) {
    console.error(error as any);
  }
};
