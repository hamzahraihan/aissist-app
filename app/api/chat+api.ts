import { createOpenAI } from '@ai-sdk/openai';
// eslint-disable-next-line import/named
import { streamText, CoreMessage } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';

// ai api key config
const google = createGoogleGenerativeAI({ apiKey: process.env.EXPO_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY });
const openai = createOpenAI({ apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY });

export async function POST(req: Request) {
  const body: { label: string; model: any; messages: CoreMessage[]; prompt: string } = await req.json();
  const { label, model, messages, prompt } = body;

  if (!prompt) {
    return new Response('No prompt provided', { status: 400 });
  }

  const handleModel: any = label === 'openai' ? openai(model) : google(model);

  try {
    if (label === 'cloudflare') {
      const response = await fetch(process.env.EXPO_PUBLIC_CLOUDFLARE_BASE_URL + '/chat' || '', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ model, prompt }),
      });

      return new Response(response.body, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          Connection: 'keep-alive',
        },
      });
    }

    // it would not be this complicated when i use useChat or useObject from ai sdk plugin.
    // but good thing is, i understand how to create a manual encoder/decoder for returning ai generated text
    // if you see assistant+api.tsx, im using different approach and started to do it with useChat and useObject

    const result = streamText({
      model: handleModel,
      messages,
    });

    console.log(result);

    const transformStream = new TransformStream({
      transform(chunk, controller) {
        try {
          const decoder = new TextDecoder();
          const text = decoder.decode(chunk);
          console.log('Decoded text:', text);

          // Split the text into lines
          const lines = text.split('\n');

          for (const line of lines) {
            // Check if the line starts with a digit followed by a colon (e.g., "0:")
            if (/^\d:/.test(line)) {
              // Extract the text after the colon
              const content = line.substring(2); // Remove "0:"

              // Parse the content as JSON and encode it as a Uint8Array
              const parsedContent = JSON.parse(content);
              const encoder = new TextEncoder();
              controller.enqueue(encoder.encode(parsedContent));
            } else {
              // Log or handle other types of lines (e.g., metadata)
              console.log('Skipping line:', line);
            }
          }
        } catch (error) {
          console.error('Error processing chunk:', error, chunk);
          controller.error(error);
        }
      },
    });

    const readableStream = result.toDataStream().pipeThrough(transformStream);

    return new Response(readableStream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });

    // const response = await fetch('https://api.openai.com/v1/chat/completions', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: `Bearer ${process.env.EXPO_PUBLIC_OPENAI_API_KEY}`,
    //   },
    //   body: JSON.stringify({
    //     model,
    //     messages,
    //     stream: true,
    //   }),
    // });

    // // Return the readable stream
    // return new Response(response.body, {
    //   headers: {
    //     'Content-Type': 'text/event-stream',
    //     'Cache-Control': 'no-cache',
    //     Connection: 'keep-alive',
    //   },
    // });
  } catch (error) {
    console.error(error);
    return new Response('Error', { status: 500 });
  }
}
