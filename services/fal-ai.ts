import { fal } from '@fal-ai/client';

export async function generateImageFalAI(prompt: string) {
  try {
    fal.config({
      credentials: process.env.EXPO_PUBLIC_FAL_API_KEY,
    });
    const result = await fal.subscribe('fal-ai/flux/dev', {
      input: {
        prompt: '(masterpiece:1.4), (best quality), (detailed), ' + prompt,
      },
    });
    console.log(result);
    return result;
  } catch (error) {
    throw new Error(error as any);
  }
}
