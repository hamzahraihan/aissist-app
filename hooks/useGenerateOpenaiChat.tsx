import { OpenaiContext } from '@/context/OpenaiContext';
import { useContext } from 'react';

export const useGenerateOpenaiChat = () => {
  const openAiContext = useContext(OpenaiContext);

  if (!openAiContext) {
    throw new Error('useCurrentUser has to be used within <CurrentUserContext.Provider>');
  }

  return openAiContext;
};
