import { OPENAI_API_KEY } from '@env';

import { IOpenAIMessage } from '@/types/chat';
export async function openAiService(messages: IOpenAIMessage[]) {
  try {
    if (messages.some((message) => message.role == '' && message.content == '')) {
      throw new Error('User not input anything');
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages,
        stream: true,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
}
