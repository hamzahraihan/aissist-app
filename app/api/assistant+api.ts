import { openai } from '@ai-sdk/openai';
import { streamObject } from 'ai';
import { z } from 'zod';

export const socialMediaSchema = z.object({
  title: z.string().describe('Provide a concise and engaging title for the social media post.'),
  content: z.string().describe('Write the main content of the post, ensuring it is relevant and captivating.'),
  thoughts: z.string().describe('Provide a detailed strategy explaining why this content would perform well, ensuring consistency and accuracy across generations.'),
});

export async function POST(req: Request) {
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
  } catch (error) {
    console.error(error);
    return new Response('Error', { status: 500 });
  }
}
