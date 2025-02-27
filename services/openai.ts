import { OPENAI_API_KEY } from 'react-native-dotenv';
import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources';

const openai = new OpenAI({ apiKey: OPENAI_API_KEY, maxRetries: 3, timeout: 60 * 1000 });

export async function openAiService(messages: ChatCompletionMessageParam[]) {
  // try {
  //   const response = await fetch('https://api.openai.com/v1/chat/completions', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${OPENAI_API_KEY}`,
  //     },
  //     body: JSON.stringify({
  //       model: 'gpt-4o-mini',
  //       messages,
  //       stream: true,
  //     }),
  //   });

  //   // Check if response is OK
  //   if (!response.ok || !response.body) {
  //     throw new Error(`OpenAI API Error: ${response.statusText}`);
  //   }

  //   // Read the streaming response
  //   const reader = response.body.getReader();
  //   const decoder = new TextDecoder();
  //   let fullResponse = '';

  //   // Process each chunk
  //   while (true) {
  //     const { done, value } = await reader.read();
  //     if (done) break;

  //     // Decodehu cnk
  //     const text = decoder.decode(value, { stream: true });

  //     // OpenAI sends data in SSE format (Server-Sent Events), split by `data:`
  //     const lines = text.split('\n').filter((line) => line.startsWith('data:'));

  //     for (const line of lines) {
  //       const jsonString = line.replace('data:', '').trim();

  //       if (jsonString === '[DONE]') break; // End of stream

  //       try {
  //         const json = JSON.parse(jsonString);
  //         const content = json.choices?.[0]?.delta?.content;

  //         if (content) {
  //           fullResponse += content;
  //           console.log('Received chunk:', content);
  //         }
  //       } catch (err) {
  //         console.error('Error parsing JSON:', err);
  //       }
  //     }
  //   }
  //   console.log('Full response:', fullResponse);
  // } catch (error: any) {
  //   throw new Error(error);
  // }
  try {
    console.log('Request sent to OpenAI...');
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages,
      store: true,
    });

    return completion.choices[0]?.message?.content || '';
  } catch (error) {
    console.error('OpenAI API Error:', error);
  }
}
