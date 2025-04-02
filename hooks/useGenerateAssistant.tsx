/* eslint-disable import/no-unresolved */
import { GenerateAssistantContext } from '@/context/GenerateAssistantContext';
import { useContext } from 'react';

export const useGenerateAssistant = () => {
  const assistantContext = useContext(GenerateAssistantContext);

  if (!assistantContext) {
    throw new Error('useGenerateAssistant has to be used within <GenerateAssistantContext.Provider>');
  }

  return assistantContext;
};
