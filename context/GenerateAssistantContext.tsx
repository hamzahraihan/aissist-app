/* eslint-disable import/no-unresolved */
import { experimental_useObject as useObject } from '@ai-sdk/react';
import { generateAPIUrl } from '@/utils/generateApiUrl';
import { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react';
import { socialMediaSchema } from '@/app/api/assistant+api';

export const GenerateAssistantContext = createContext<{
  object: any;
  error: any;
  submit: any;
  isLoading: any;
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
  category: string;
  setAssistCategory: Dispatch<SetStateAction<string>>;
}>({
  object: null,
  error: null,
  submit: null,
  isLoading: null,
  input: '',
  setInput: () => {},
  category: '',
  setAssistCategory: () => {},
});

export const GenerateAssistantProvider = ({ children }: { children: ReactNode }) => {
  const { object, error, submit, isLoading } = useObject({ api: generateAPIUrl('/api/assistant') as string, schema: socialMediaSchema });

  const [input, setInput] = useState<string>('');

  const [category, setAssistCategory] = useState<string>('');

  return <GenerateAssistantContext.Provider value={{ object, error, submit, isLoading, input, setInput, category, setAssistCategory }}>{children}</GenerateAssistantContext.Provider>;
};
