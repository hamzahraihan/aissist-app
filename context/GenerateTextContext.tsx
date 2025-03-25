import { AIRunParams } from 'cloudflare/resources/ai/ai';
import { ChatCompletionMessageParam } from 'openai/resources';
import React, { createContext, type Dispatch, ReactNode, useEffect, useState } from 'react';
import uuid from 'react-native-uuid';
import { fetch } from 'expo/fetch';
import { generateAPIUrl } from '@/utils/generateApiUrl';

export type ChatMessageProps = {
  uuid: any;
  message: (ChatCompletionMessageParam | AIRunParams.Messages.Message)[];
  createdAt: string;
};

export type ChatModelProps = {
  label: string;
  name: string;
  model: string;
};

export const GenerateTextContext = createContext<{
  generateTextByAi: () => Promise<void>;
  loading: boolean;
  setInput: Dispatch<React.SetStateAction<string>>;
  input: string;
  generatedMessages: ChatMessageProps;
  setGeneratedMessages: Dispatch<React.SetStateAction<ChatMessageProps>>;
  chatHistory: ChatMessageProps[];
  setChatHistory: Dispatch<React.SetStateAction<ChatMessageProps[]>>;
  saveChatHistory: () => void;
  setTextModel: React.Dispatch<React.SetStateAction<ChatModelProps>>;
  textModel: ChatModelProps;
}>({
  generateTextByAi: async () => {},
  loading: false,
  input: '',
  setInput: () => {},
  generatedMessages: { uuid: '', message: [], createdAt: new Date().toLocaleString() },
  setGeneratedMessages: () => {},
  chatHistory: [],
  setChatHistory: () => {},
  saveChatHistory: () => {},
  setTextModel: () => {},
  textModel: { label: '', name: '', model: '' },
});

export const GenerateTextProvider = ({ children }: { children: ReactNode }) => {
  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [textModel, setTextModel] = useState<ChatModelProps>({ label: 'openai', name: 'gpt-4o-mini', model: 'gpt-4o-mini' });

  const date = Date.now();

  const formatDate = (date: number): string => {
    const options: any = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  // set messages for ai
  const [generatedMessages, setGeneratedMessages] = useState<ChatMessageProps>({
    uuid: uuid.v4(),
    createdAt: formatDate(date),
    message: [{ role: 'assistant', content: 'You are a helpful assistant' }],
  });

  const [chatHistory, setChatHistory] = useState<ChatMessageProps[]>([]);
  // console.log('🚀 ~ GenerateTextProvider ~ chatHistory:', chatHistory);
  console.log('🚀 ~ GenerateTextProvider ~ generatedMessages:', generatedMessages);

  useEffect(() => {
    generateTextByAi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // // generate a text by AI following a model chosen by user
  // const generateTextByAi = async () => {
  //   switch (textModel) {
  //     case 'gpt-4o-mini':
  //       return generateTextFromOpenAI();
  //     default:
  //       return generateTextFromClouflare();
  //   }
  // };

  const generateTextByAi = async () => {
    setLoading(true);
    try {
      if (!input.trim()) {
        console.log('Input is empty');
        return;
      }

      // Append the user message
      setGeneratedMessages((prevMessages) => ({
        uuid: uuid.v4(),
        createdAt: formatDate(date),
        message: [...(prevMessages.message as ChatCompletionMessageParam[]), { role: 'user', content: input.trim() }],
      }));

      // Clear input field immediately
      setInput('');

      // Create initial empty assistant message
      setGeneratedMessages((prevMessages) => ({
        uuid: prevMessages.uuid,
        createdAt: formatDate(date),
        message: [...(prevMessages.message as ChatCompletionMessageParam[]), { role: 'assistant', content: '' }],
      }));

      const apiUrl = generateAPIUrl('/api/chat') || '';
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          label: textModel.label,
          model: textModel.model,
          messages: [...generatedMessages.message, { role: 'user', content: input.trim() }],
          prompt: input,
        }),
      });

      if (!res.ok || !res.body) {
        throw new Error(`API error: ${res.status}`);
      }

      const reader = res.body.getReader();

      let fullText = '';

      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        const chunkText = new TextDecoder().decode(value, { stream: true });
        fullText += chunkText;

        // Update UI with each chunk as it arrives
        setGeneratedMessages((prevMessages) => {
          const messages = [...prevMessages.message];
          // Update the last message (assistant's message)
          messages[messages.length - 1] = {
            role: 'assistant',
            content: fullText,
          };

          return {
            uuid: prevMessages.uuid,
            createdAt: prevMessages.createdAt,
            message: messages,
          };
        });
      }
    } catch (error) {
      console.error('Error processing AI response:', error);

      // Add an error message if needed
      setGeneratedMessages((prevMessages) => ({
        uuid: prevMessages.uuid,
        createdAt: formatDate(date),
        message: [...(prevMessages.message as ChatCompletionMessageParam[]), { role: 'assistant', content: 'Sorry, there was an error processing your request.' }],
      }));
    } finally {
      setLoading(false);
    }
  };

  // const generateTextFromOpenAI = async (): Promise<void> => {
  //   setLoading(true);
  //   try {
  //     if (!input.trim()) {
  //       console.log('Input is empty');
  //       return;
  //     }

  //     console.log('User input:', input);

  //     // Append the new user message while keeping previous messages
  //     setGeneratedMessages((prevMessages) => ({ uuid: uuid.v4(), createdAt: formatDate(date), message: [...(prevMessages.message as ChatCompletionMessageParam[]), { role: 'user', content: input.trim() }] }));

  //     setInput(''); // Clear input field

  //     // Get response from OpenAI
  //     const responseText = await openAiMessageService([...(generatedMessages.message as ChatCompletionMessageParam[]), { role: 'user', content: input.trim() }]);

  //     if (!responseText) {
  //       console.warn('No response received from OpenAI.');
  //       return;
  //     }

  //     // Append OpenAI's response to the chat history
  //     setGeneratedMessages((prevMessages) => ({ uuid: prevMessages.uuid, createdAt: formatDate(date), message: [...(prevMessages.message as ChatCompletionMessageParam[]), { role: 'assistant', content: responseText }] }));

  //     console.log('OpenAI Response:', responseText);
  //     setLoading(false);
  //   } catch (error) {
  //     console.error('Error generating text from OpenAI:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const saveChatHistory = () => {
    if (!generatedMessages.uuid && generatedMessages.message.length === 1) {
      return;
    }

    // update an existing messages from an existing chat history
    setChatHistory((prev) => {
      const existingChat = prev.find((item) => item.uuid === generatedMessages.uuid);
      if (existingChat) {
        return prev.map((item) => (item.uuid === generatedMessages.uuid ? { ...item, createdAt: formatDate(date), message: [...generatedMessages.message] } : item));
      }
      return [...prev, { uuid: generatedMessages.uuid, createdAt: generatedMessages.createdAt, message: [...generatedMessages.message] }];
    });

    setGeneratedMessages({ uuid: uuid.v4(), createdAt: formatDate(date), message: [{ role: 'assistant', content: 'You are a helpful assistant' }] });
  };

  return (
    <GenerateTextContext.Provider value={{ generateTextByAi, loading, setTextModel, textModel, setInput, input, generatedMessages, setGeneratedMessages, saveChatHistory, chatHistory, setChatHistory }}>
      {children}
    </GenerateTextContext.Provider>
  );
};
