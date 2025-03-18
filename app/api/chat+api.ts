// import { fetch } from 'expo/fetch';
import { generateAPIUrl } from '@/utils/generateApiUrl';
import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources';

const openai = new OpenAI({ apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY, dangerouslyAllowBrowser: true });

export async function POST(req: Request) {
  const body: { model: any; prompt: ChatCompletionMessageParam[] } = await req.json();
  const { model, prompt } = body;

  if (!prompt) {
    return new Response('No prompt provided', { status: 400 });
  }

  try {
    if (model !== 'gpt-4o-mini') {
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
    } else {
      // Setup streaming response
      const encoder = new TextEncoder();
      const stream = new TransformStream();
      const writer = stream.writable.getWriter();

      // Chat stream
      const completion = openai.beta.chat.completions.stream({
        model: 'gpt-4o-2024-11-20',
        messages: prompt,
      });

      completion.on('content.delta', async ({ parsed }) => await writer.write(encoder.encode(JSON.stringify(parsed))));
      completion.on('content.done', async () => await writer.close());

      // Return the readable stream
      return new Response(stream.readable, {
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
