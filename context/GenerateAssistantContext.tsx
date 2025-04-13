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
  stop: any;
  schemaType: string;
  setSchemaType: Dispatch<SetStateAction<string>>;
}>({
  object: null,
  error: null,
  submit: null,
  isLoading: null,
  input: '',
  setInput: () => {},
  stop: () => {},
  schemaType: '',
  setSchemaType: () => {},
});

export const GenerateAssistantProvider = ({ children }: { children: ReactNode }) => {
  const [schemaType, setSchemaType] = useState<string>('');
  console.log('from context:', schemaType);
  const { object, error, submit, isLoading, stop } = useObject({
    onError: (error) => console.error(error),
    fetch: expoFetch as unknown as typeof globalThis.fetch,
    api: generateAPIUrl('/api/assistant') as string,
    schema: handleAiSchema(schemaType),
    onFinish: ({ object, error }) => {
      console.log(object);
      console.log(error);
    },
  });

  const [input, setInput] = useState<string>('');

  return <GenerateAssistantContext.Provider value={{ object, error, submit, isLoading, input, setInput, stop, schemaType, setSchemaType }}>{children}</GenerateAssistantContext.Provider>;
};
