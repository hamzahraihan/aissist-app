/* eslint-disable import/no-unresolved */
import { GenerateTextContext } from '@/context/GenerateTextContext';
import { useContext } from 'react';

export const useGenerateText = () => {
  const openAiContext = useContext(GenerateTextContext);

  if (!openAiContext) {
    throw new Error('useGenerateText has to be used within <GenerateTextContext.Provider>');
  }

  return openAiContext;
};
