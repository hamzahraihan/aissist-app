import { openAiService } from '@/services/openai';
import { ChatCompletionMessageParam } from 'openai/resources';
import { createContext, type Dispatch, ReactNode, useState } from 'react';

export const OpenaiContext = createContext<{
  generateTextFromOpenAI: () => Promise<void>;
  loading: boolean;
  setInput: Dispatch<React.SetStateAction<string>>;
  input: string;
  openAiMessages: ChatCompletionMessageParam[];
}>({
  generateTextFromOpenAI: async () => {},
  loading: false,
  input: '',
  setInput: () => {},
  openAiMessages: [{ role: 'developer', content: 'You are a helpful assistant!' }],
});

export const OpenaiProvider = ({ children }: { children: ReactNode }) => {
  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  // set messages for ai
  const [openAiMessages, setOpenAiMessages] = useState<ChatCompletionMessageParam[]>([]);

  const generateTextFromOpenAI = async (): Promise<void> => {
    setLoading(true);
    try {
      if (!input.trim()) {
        console.log('Input is empty, resetting messages...');
        setOpenAiMessages([]);
        return;
      }

      console.log('User input:', input);

      // Append the new user message while keeping previous messages
      setOpenAiMessages((prevMessages) => [...prevMessages, { role: 'user', content: input.trim() }]);

      setInput(''); // Clear input field

      // Get response from OpenAI
      const responseText = await openAiService([...openAiMessages, { role: 'user', content: input.trim() }]);

      if (!responseText) {
        console.warn('No response received from OpenAI.');
        return;
      }

      // Append OpenAI's response to the chat history
      setOpenAiMessages((prevMessages) => [...prevMessages, { role: 'assistant', content: responseText }]);
      console.log('OpenAI Response:', responseText);
      setLoading(false);
    } catch (error) {
      console.error('Error generating text from OpenAI:', error);
    } finally {
      setLoading(false);
    }
  };

  return <OpenaiContext.Provider value={{ generateTextFromOpenAI, loading, setInput, input, openAiMessages }}>{children}</OpenaiContext.Provider>;
};
