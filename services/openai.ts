import { OPENAI_API_KEY } from 'react-native-dotenv';
import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources';

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

export async function openAiService(messages: ChatCompletionMessageParam[]): Promise<string | undefined> {
  // try {
  //   if (messages.some((message) => message.role == '' && message.content == '')) {
  //     throw new Error('User not input anything');
  //   }

  //   const response = await fetch('https://api.openai.com/v1/chat/completions', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${OPENAI_API_KEY}`,
  //     },
  //     body: JSON.stringify({
  //       model: 'gpt-4o-mini',
  //       messages,
  //       store: true,
  //     }),
  //   });
  //   const data = await response.json();
  //   return data;
  // } catch (error: any) {
  //   throw new Error(error);
  // }
  try {
    console.log('Request sent to OpenAI...');
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'developer', content: 'You are a helpful assistant' }, ...messages],
      stream: false,
      store: true,
    });

    return completion.choices[0]?.message?.content || '';
  } catch (error) {
    console.error('OpenAI API Error:', error);
  }
}
