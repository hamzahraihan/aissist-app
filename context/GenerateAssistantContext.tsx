/* eslint-disable import/no-unresolved */
import { experimental_useObject as useObject } from '@ai-sdk/react';
import { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react';
import { fetch as expoFetch } from 'expo/fetch';
import { generateAPIUrl } from '@/utils/generateApiUrl';
import { handleAiSchema } from '@/constants/assistants';

export const GenerateAssistantContext = createContext<{
  object: any;
  error: any;
  submit: any;
  isLoading: any;
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
  schemaType: string;
  setSchemaType: Dispatch<SetStateAction<string>>;
}>({
  object: null,
  error: null,
  submit: null,
  isLoading: null,
  input: '',
  setInput: () => {},
  schemaType: '',
  setSchemaType: () => {},
});

export const GenerateAssistantProvider = ({ children }: { children: ReactNode }) => {
  const [schemaType, setSchemaType] = useState<string>('');

  const { object, error, submit, isLoading } = useObject({
    onError: (error) => console.error(error),
    fetch: expoFetch as unknown as typeof globalThis.fetch,
    api: generateAPIUrl('/api/assistant') as string,
    schema: handleAiSchema(schemaType),
  });

  const [input, setInput] = useState<string>('');

  return <GenerateAssistantContext.Provider value={{ object, error, submit, isLoading, input, setInput, schemaType, setSchemaType }}>{children}</GenerateAssistantContext.Provider>;
};
