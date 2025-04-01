import { openai } from '@ai-sdk/openai';
import { streamObject } from 'ai';
import { z } from 'zod';

export const socialMediaSchema = z.object({
  title: z.string(),
  content: z.string(),
  thoughts: z.string(),
});

export async function POST(req: Request) {
  const { category, prompt, description }: any = await req.json();

  try {
    const result = streamObject({
      model: openai('gpt-4o-mini', { structuredOutputs: true }),
      schemaDescription: description,
      schemaName: category,
      schema: socialMediaSchema,
      prompt: `Here is the post idea: ${prompt}`,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error(error);
    return new Response('Error', { status: 500 });
  }
}
