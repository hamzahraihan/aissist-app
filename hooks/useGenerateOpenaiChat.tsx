import { OpenaiContext } from '@/context/OpenaiContext';
import { useContext } from 'react';

export const useGenerateOpenaiChat = () => {
  const openAiContext = useContext(OpenaiContext);

  if (!openAiContext) {
    throw new Error('useGenerateOpenaiChat has to be used within <OpenaiContext.Provider>');
  }

  return openAiContext;
};
