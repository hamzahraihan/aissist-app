import { createWorkersAI } from 'workers-ai-provider';
import { streamText } from 'ai';
import { AI } from 'cloudflare/resources/radar/ai/ai';

type Env = {
  AI: AI;
};

export async function POST(req: Request, env: Env) {
  const body = await req.json();
  console.log(body);

  const { model, prompt } = body;
  const workersai = createWorkersAI({ binding: env.AI });

  const result = streamText({
    model: workersai(model),
    prompt,
  });
  console.log(result);

  return result.toTextStreamResponse({
    // add these headers to ensure that the
    // response is chunked and streamed
    headers: {
      'Content-Type': 'text/x-unknown',
      'content-encoding': 'identity',
      'transfer-encoding': 'chunked',
    },
  });
}
