import { openai } from '@ai-sdk/openai';
import { generateObject } from 'ai';
import { z } from 'zod';

export async function POST(req: Request) {
  const { assistType, prompt }: any = await req.json();

  try {
    const result = await generateObject({
      model: openai('gpt-4o-mini', { structuredOutputs: true }),
      schemaName: assistType,
      schema: z.object({
        title: z.string(),
        content: z.string(),
        thoughts: z.string(),
      }),
      prompt,
    });
    return result.toJsonResponse();
  } catch (error) {
    console.error(error);
    return new Response('Error', { status: 500 });
  }
}
