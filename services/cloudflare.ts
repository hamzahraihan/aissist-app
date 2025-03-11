import { Cloudflare } from 'cloudflare';

const client = new Cloudflare({
  apiKey: process.env.EXPO_PUBLIC_CLOUDFLARE_API_KEY,
});

export const cloudflareImageGenerator = async (prompt: string) => {
  try {
    const response = await client.ai.run('@cf/runwayml/stable-diffusion-v1-5-img2img', {
      account_id: '9b37eea8034fbf61191d273e000f450e',
      text: 'create a dnd character',
    });
    return response;
  } catch (error) {
    throw new Error(error as any);
  }
};
