import { openai } from '@ai-sdk/openai';
import { streamObject } from 'ai';
import { z } from 'zod';

export const socialMediaSchema = z.object({
  title: z.string(),
  content: z.string(),
  thoughts: z.string().describe('Strategy thoughts on why this content would perform well'),
});

export async function POST(req: Request) {
  // const { category, prompt, description }: any = await req.json();
  const context = await req.json();
  console.log(context);
  try {
    const result = streamObject({
      model: openai('gpt-4o-mini', { structuredOutputs: true }),
      schemaDescription: 'you are the best content create of tiktok. you will help people to create the best content to get so much views.',
      schemaName: 'tiktok',
      schema: socialMediaSchema,
      prompt: `Here is the post idea: ${context}`,
    });

    return result.toTextStreamResponse();
    // return result.toTextStreamResponse({ headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
  } catch (error) {
    console.error(error);
    return new Response('Error', { status: 500 });
  }
}
