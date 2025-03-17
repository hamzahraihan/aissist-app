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

    return new Response(response.body, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  } catch (error) {
    console.error(error);
    return new Response('Error', { status: 500 });
  }
}
