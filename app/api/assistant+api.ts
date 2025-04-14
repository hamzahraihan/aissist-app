import { handleAiSchema } from '@/constants/assistants';
import { openai } from '@ai-sdk/openai';
import { streamObject } from 'ai';

export async function POST(req: Request) {
  const { initialPrompt, prompt, schemaName, description }: any = await req.json();
  console.log(`${initialPrompt}, ${prompt}, ${schemaName}, ${description}`);

  try {
    const result = streamObject({
      model: openai('gpt-4o-mini', { structuredOutputs: true }),
      schemaDescription: description,
      schemaName,
      schema: handleAiSchema(schemaName),
      prompt: initialPrompt + prompt,
    });
    return result.toTextStreamResponse();
  } catch (error) {
    console.error(error);
    return new Response('Error', { status: 500 });
  }
}
