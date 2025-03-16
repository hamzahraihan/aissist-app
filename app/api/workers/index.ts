import { createWorkersAI } from 'workers-ai-provider';
import { streamText } from 'ai';

type Env = {
  AI: Ai;
};

export default {
  async fetch(req: Request, env: Env) {
    const body: { model: any; prompt: string } = await req.json();
    const { model, prompt } = body;

    if (!prompt) {
      return new Response('No prompt provided', { status: 400 });
    }

    const workersai = createWorkersAI({ binding: env.AI });
    const result = streamText({
      model: workersai(model || '@cf/deepseek-ai/deepseek-r1-distill-qwen-32b'),
      prompt,
    });
    return result.toDataStreamResponse({
      // add these headers to ensure that the
      // response is chunked and streamed
      headers: {
        'Content-Type': 'text/x-unknown',
        'content-encoding': 'identity',
        'transfer-encoding': 'chunked',
      },
    });
  },
};
