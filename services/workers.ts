import { createWorkersAI } from 'workers-ai-provider';
import { streamText } from 'ai';

type Env = {
  AI: Ai;
};

export default {
  async fetch(req: Request, env: Env) {
    if (req.method !== 'POST') {
      return new Response('Only POST allowed', { status: 405 });
    }

    let body: { model: any; prompt: string };

    try {
      body = await req.json();
    } catch {
      return new Response('Invalid JSON', { status: 400 });
    }

    const { model = '@cf/deepseek-ai/deepseek-r1-distill-qwen-32b', prompt = 'Write a 50-word essay about hello world.' } = body;

    if (!prompt) {
      return new Response('No prompt provided', { status: 400 });
    }

    const workersai = createWorkersAI({ binding: env.AI });
    const result = streamText({
      model: workersai(model),
      prompt,
    });
    return result.toTextStreamResponse({
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  },
};
