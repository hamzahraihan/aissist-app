import { openAiMessageService } from '@/services/openai';
import { ChatCompletionMessageParam } from 'openai/resources';
import React, { createContext, type Dispatch, ReactNode, useState } from 'react';
import uuid from 'react-native-uuid';

export type ChatMessageProps = {
  uuid: any;
  message: ChatCompletionMessageParam[];
  createdAt: string;
};

export const OpenaiContext = createContext<{
  generateTextFromOpenAI: () => Promise<void>;
  loading: boolean;
  setInput: Dispatch<React.SetStateAction<string>>;
  input: string;
  openAiMessages: ChatMessageProps;
  setOpenAiMessages: Dispatch<React.SetStateAction<ChatMessageProps>>;
  chatHistory: ChatMessageProps[];
  setChatHistory: Dispatch<React.SetStateAction<ChatMessageProps[]>>;
  saveChatHistory: () => void;
}>({
  generateTextFromOpenAI: async () => {},
  loading: false,
  input: '',
  setInput: () => {},
  openAiMessages: { uuid: '', message: [], createdAt: new Date().toLocaleString() },
  setOpenAiMessages: () => {},
  chatHistory: [],
  setChatHistory: () => {},
  saveChatHistory: () => {},
});

export const OpenaiProvider = ({ children }: { children: ReactNode }) => {
  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

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
  const [openAiMessages, setOpenAiMessages] = useState<ChatMessageProps>({
    uuid: '',
    createdAt: formatDate(date),
    message: [],
  });
  const [chatHistory, setChatHistory] = useState<ChatMessageProps[]>([]);
  console.log('🚀 ~ OpenaiProvider ~ chatHistory:', chatHistory);

  console.log('🚀 ~ OpenaiProvider ~ openAiMessages:', openAiMessages);

  const generateTextFromOpenAI = async (): Promise<void> => {
    setLoading(true);
    try {
      if (!input.trim()) {
        console.log('Input is empty, resetting messages...');
        setOpenAiMessages({ message: [], uuid: '', createdAt: formatDate(date) });
        return;
      }

      console.log('User input:', input);

      // Append the new user message while keeping previous messages
      setOpenAiMessages((prevMessages) => ({ uuid: uuid.v4(), createdAt: formatDate(date), message: [...prevMessages.message, { role: 'user', content: input.trim() }] }));

      setInput(''); // Clear input field

      // Get response from OpenAI
      const responseText = await openAiMessageService([...openAiMessages.message, { role: 'user', content: input.trim() }]);

      if (!responseText) {
        console.warn('No response received from OpenAI.');
        return;
      }

      // Append OpenAI's response to the chat history
      setOpenAiMessages((prevMessages) => ({ uuid: prevMessages.uuid, createdAt: formatDate(date), message: [...prevMessages.message, { role: 'assistant', content: responseText }] }));

      console.log('OpenAI Response:', responseText);
      setLoading(false);
    } catch (error) {
      console.error('Error generating text from OpenAI:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveChatHistory = () => {
    if (!openAiMessages.uuid) {
      return;
    }

    // update an existing messages from an existing chat history
    setChatHistory((prev) => {
      const existingChat = prev.find((item) => item.uuid === openAiMessages.uuid);
      if (existingChat) {
        return prev.map((item) => (item.uuid === openAiMessages.uuid ? { ...item, createdAt: formatDate(date), message: [...openAiMessages.message] } : item));
      }
      return [...prev, { uuid: openAiMessages.uuid, createdAt: openAiMessages.createdAt, message: openAiMessages.message }];
    });

    setOpenAiMessages({ uuid: '', createdAt: formatDate(date), message: [] });
  };

  return <OpenaiContext.Provider value={{ generateTextFromOpenAI, loading, setInput, input, openAiMessages, setOpenAiMessages, saveChatHistory, chatHistory, setChatHistory }}>{children}</OpenaiContext.Provider>;
};
