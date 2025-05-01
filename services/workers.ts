// import Cloudflare from 'cloudflare';
import { createWorkersAI } from 'workers-ai-provider';
import { streamText } from 'ai';
import { Ai } from '@cloudflare/ai';
// const client = new Cloudflare();

type Env = {
  AI: Ai;
};

export default {
  async fetch(req: Request, env: Env) {
    const url = new URL(req.url);
    const { model, prompt }: { model: any; prompt: string } = await req.json();

    if (req.method !== 'POST') {
      return new Response('Only POST allowed', { status: 405 });
    }

    const workersai = createWorkersAI({ binding: env.AI });

    if (!prompt) {
      return new Response('No prompt provided', { status: 400 });
    }

    if (url.pathname === '/chat') {
      /*       const { model = '@cf/deepseek-ai/deepseek-r1-distill-qwen-32b', prompt = 'Write a 50-word essay about hello world.' } = body;
       */
      const result = streamText({
        model: workersai(model || '@cf/deepseek-ai/deepseek-r1-distill-qwen-32b'),
        prompt,
      });

      return result.toTextStreamResponse({
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          Connection: 'keep-alive',
        },
      });
    }

    if (url.pathname === '/generate-image') {
      const ai = new Ai(env.AI);

      const response = await ai.run(model, {
        prompt: prompt || 'cyberpunk cat',
      });

      return Response.json(response, {
        headers: {
          'Content-Type': 'image/png',
        },
      });
    }
  },
};
