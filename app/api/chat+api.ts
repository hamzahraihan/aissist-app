import { openai } from '@ai-sdk/openai';
import { streamText, CoreMessage } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
// import OpenAI from 'openai';
// import { ChatCompletionMessageParam } from 'openai/resources';
// const openai = new OpenAI({ apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY, dangerouslyAllowBrowser: true });

const google = createGoogleGenerativeAI({ apiKey: process.env.EXPO_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY });

export async function POST(req: Request) {
  const body: { label: string; model: any; messages: CoreMessage[]; prompt: string } = await req.json();
  const { label, model, messages, prompt } = body;

  console.log(label);
  console.log(model);

  if (!prompt) {
    return new Response('No prompt provided', { status: 400 });
  }

  const handleModel: any = label === 'openai' ? openai(model) : google(model);

  try {
    if (label === 'cloudflare') {
      const response = await fetch(process.env.EXPO_PUBLIC_CLOUDFLARE_WORKERS_URL || '', {
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
    const result = streamText({
      model: handleModel,
      messages,
    });

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

              // Enqueue the raw content (no JSON.stringify!)
              controller.enqueue(JSON.parse(content));
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
    console.log(readableStream);

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
