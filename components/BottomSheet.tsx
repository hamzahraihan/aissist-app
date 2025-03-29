/* eslint-disable import/no-unresolved */
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { CustomText } from './Text';
import { ForwardedRef, forwardRef, ReactNode } from 'react';
import { useBottomSheet } from '@/hooks/useBottomSheet';
import { Platform, StyleSheet } from 'react-native';
import { colors } from '@/constants/theme';
import { useCustomTheme } from '@/context/ThemeContext';

const CustomBottomSheet = forwardRef(function CustomBottomSheet({ children }: { children: ReactNode }, ref: ForwardedRef<BottomSheetModal<any>>) {
  const { themeMode } = useCustomTheme();
  const { handleSheetChanges } = useBottomSheet();
  return (
    <BottomSheetModal
      index={1}
      backgroundStyle={{ backgroundColor: themeMode === 'light' ? colors.lightWhite : colors.lightBlack }}
      style={[styles.sheetContainer, styles.sheetContainerShadow]}
      backdropComponent={BottomSheetBackdrop}
      handleIndicatorStyle={{ backgroundColor: 'gray' }}
      snapPoints={[200, '40%']}
      enablePanDownToClose={true}
      enableDynamicSizing={false}
      ref={ref}
      onChange={handleSheetChanges}
    >
      <BottomSheetScrollView style={styles.contentContainer}>
        <CustomText style={{ textAlign: 'center' }}>Try different models</CustomText>
        {children}
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
});
export default CustomBottomSheet;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 10,
    zIndex: 99,
  },
  sheetContainer: {
    borderTopStartRadius: 24,
    borderTopEndRadius: 24,
  },
  sheetContainerShadow: Platform.select({
    ios: {
      shadowOffset: {
        width: 0,
        height: 12,
      },
      shadowOpacity: 0.8,
      shadowRadius: 16.0,
      shadowColor: '#000',
    },
    android: {
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 12,
      },
      shadowOpacity: 0.58,
      shadowRadius: 16.0,

      elevation: 24,
    },
    web: {
      boxShadow: '0px -4px 16px rgba(0,0,0, 0.25)',
    },
  }) as any,
});
