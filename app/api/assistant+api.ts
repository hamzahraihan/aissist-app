import { handleAiSchema } from '@/constants/assistants';
import { openai } from '@ai-sdk/openai';
import { streamObject } from 'ai';

export async function POST(req: Request) {
  const { inputPrompt, schemaName, schemaDescription }: any = await req.json();
  console.log(inputPrompt);

  try {
    const result = streamObject({
      model: openai('gpt-4o-mini', { structuredOutputs: true }),
      schemaDescription,
      schemaName,
      schema: handleAiSchema(schemaName),
      prompt: `Here is the post idea: ${inputPrompt}`,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error(error);
    return new Response('Error', { status: 500 });
  }
}
