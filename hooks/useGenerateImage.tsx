import { GenerateImageContext } from '@/context/GenerateImageContext';
import { useContext } from 'react';

export const useGenerateImage = () => {
  const generateImageContext = useContext(GenerateImageContext);
  if (!generateImageContext) {
    throw new Error('useGenerateImage has to be used within <GenerateImageContext.Provider>');
  }
  return generateImageContext;
};
