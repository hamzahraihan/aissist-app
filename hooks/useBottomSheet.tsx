/* eslint-disable import/no-unresolved */
import { BottomSheetContext } from '@/context/BottomSheetContext';
import { useContext } from 'react';

export const useBottomSheet = () => {
  const bottomSheetContext = useContext(BottomSheetContext);
  if (!bottomSheetContext) {
    throw new Error('useBottomSheet has to be used within <GenerateImageContext.Provider>');
  }
  return bottomSheetContext;
};
