// import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources';
// const openai = new OpenAI({ apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY, dangerouslyAllowBrowser: true });

export async function POST(req: Request) {
  const body: { model: any; messages: ChatCompletionMessageParam[]; prompt: string } = await req.json();
  const { model, messages, prompt } = body;
  console.log('🚀 ~ POST ~ prompt:', prompt);

  if (!prompt) {
    return new Response('No prompt provided', { status: 400 });
  }

  try {
    if (model !== 'gpt-4o-mini') {
      const response = await fetch(process.env.EXPO_PUBLIC_CLOUDFLARE_WORKERS_URL || '', {
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
    } else {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.EXPO_PUBLIC_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model,
          messages,
          stream: true,
        }),
      });

      // Return the readable stream
      return new Response(response.body, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          Connection: 'keep-alive',
        },
      });
    }
  } catch (error) {
    console.error(error);
    return new Response('Error', { status: 500 });
  }
}
