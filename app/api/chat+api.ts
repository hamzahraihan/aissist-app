import { fetch } from 'expo/fetch';
import { generateAPIUrl } from '@/utils/generateApiUrl';

type Env = {
  AI: Ai;
};

export default async function POST(req: Request, env: Env) {
  const body: { model: any; prompt: string } = await req.json();
  const { model, prompt } = body;

  if (!prompt) {
    return new Response('No prompt provided', { status: 400 });
  }

  try {
    const response = await fetch(generateAPIUrl(process.env.EXPO_PUBLIC_API_BASE_URL) || '', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ model, prompt }),
    });

    if (response.body) {
      const reader = response.body.getReader();
      const textDecoder = new TextDecoder();
      let accumulatedText = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = textDecoder.decode(value, { stream: true });
        accumulatedText += chunk;

        console.log('Received chunk', chunk);
      }
      console.log('Final completed text', accumulatedText);
      return new Response(accumulatedText, {
        headers: {
          'Content-Type': 'text/x-unknown',
          'content-encoding': 'identity',
          'transfer-encoding': 'chunked',
        },
      });
    }
  } catch (error) {
    console.error(error);
    return new Response('Error', { status: 500 });
  }
}
