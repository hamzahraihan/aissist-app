import React, { createContext, Dispatch, ReactNode, SetStateAction, useCallback, useRef, useState } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

export const BottomSheetContext = createContext<{
  handlePresentModalPress: () => void;
  handleSheetChanges: (index: number) => void;
  bottomSheetModalRef: any;
  typeModel: string;
  setTypeModel: Dispatch<SetStateAction<string>>;
}>({
  handlePresentModalPress: () => {},
  bottomSheetModalRef: () => {},
  handleSheetChanges: () => {},
  typeModel: '',
  setTypeModel: () => {},
});

export const BottomSheetProvider = ({ children }: { children: ReactNode }) => {
  const [typeModel, setTypeModel] = useState<string>('');
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
  return <BottomSheetContext.Provider value={{ handlePresentModalPress, handleSheetChanges, bottomSheetModalRef, typeModel, setTypeModel }}>{children}</BottomSheetContext.Provider>;
};
