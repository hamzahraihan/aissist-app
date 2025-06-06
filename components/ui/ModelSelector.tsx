/* eslint-disable import/no-unresolved */
import React, { useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import CustomBottomSheet from '../BottomSheet';
import { ThemedView } from '../ThemedView';
import { CustomText } from '../Text';
import { AiModelType } from '@/constants/models';
import { useCustomTheme } from '@/context/ThemeContext';

export default function ModelSelector({ models, selectedModel, onModelSelect, bottomSheetModalRef }: { models: AiModelType[]; selectedModel: string; onModelSelect: (model: string) => void; bottomSheetModalRef: any }) {
  const { themeMode } = useCustomTheme();

  const handleModelAvailable = (isAvailable: boolean) => {
    if (themeMode === 'light' && isAvailable) return 'black';
    if (themeMode === 'dark' && isAvailable) return 'white';
    if (!isAvailable) return 'gray';
  };

  const handleSelectModel = useCallback(
    (model: string) => {
      onModelSelect(model);
      bottomSheetModalRef.current?.close();
    },
    [onModelSelect, bottomSheetModalRef]
  );

  const handleVersionColor = (version: string) => {
    if (version === 'beta') return { backgroundColor: '#ffd9d9', borderColor: '#ff5555', color: '#ff5555' };
    return { backgroundColor: '#cac4ff', borderColor: 'blue', color: 'blue' };
  };

  const renderModelItem = useCallback(
    (item: AiModelType) => (
      <TouchableOpacity disabled={!item.available} key={item.name} onPress={() => handleSelectModel(item.model)}>
        <ThemedView
          onSelected={item.model === selectedModel}
          style={[styles.sheetSelectableContent, { display: 'flex', flexDirection: 'row', gap: 8, justifyContent: 'center', alignItems: 'center', backgroundColor: item.model === selectedModel ? '#272727' : '' }]}
        >
          <CustomText
            style={{
              color: item.model === selectedModel ? 'white' : handleModelAvailable(item.available),
              textAlign: 'center',
            }}
          >
            {item.name}
          </CustomText>
          <Text
            style={{
              backgroundColor: handleVersionColor(item.version as string).backgroundColor,
              color: handleVersionColor(item.version as string).color,
              paddingVertical: 4,
              paddingHorizontal: 8,
              borderRadius: 12,
              borderColor: handleVersionColor(item.version as string).borderColor,
              borderWidth: 2,
            }}
          >
            {item.version}
          </Text>
        </ThemedView>
      </TouchableOpacity>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedModel, handleSelectModel]
  );

  return <CustomBottomSheet ref={bottomSheetModalRef}>{models.map(renderModelItem)}</CustomBottomSheet>;
}
const styles = StyleSheet.create({
  sheetSelectableContent: {
    width: '100%',
    padding: 10,
    borderRadius: 12,
  },
});
