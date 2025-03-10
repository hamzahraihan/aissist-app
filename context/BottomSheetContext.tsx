import React, { createContext, ReactNode, useCallback, useRef } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

export const BottomSheetContext = createContext<{ handlePresentModalPress: () => void; handleSheetChanges: (index: number) => void; bottomSheetModalRef: any }>({
  handlePresentModalPress: () => {},
  bottomSheetModalRef: () => {},
  handleSheetChanges: () => {},
});

export const BottomSheetProvider = ({ children }: { children: ReactNode }) => {
  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    // open bottom sheet modal
    bottomSheetModalRef.current?.present();
    // close bottom sheet modal
    bottomSheetModalRef.current?.close();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  // renders
  return <BottomSheetContext.Provider value={{ handlePresentModalPress, handleSheetChanges, bottomSheetModalRef }}>{children}</BottomSheetContext.Provider>;
};
