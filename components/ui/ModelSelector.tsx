/* eslint-disable import/no-unresolved */
import React, { useCallback } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import CustomBottomSheet from '../BottomSheet';
import { ThemedView } from '../ThemedView';
import { CustomText } from '../Text';
import { AiModelType } from '@/constants/models';

export default function ModelSelector({ models, selectedModel, onModelSelect, bottomSheetModalRef }: { models: AiModelType[]; selectedModel: string; onModelSelect: (model: string) => void; bottomSheetModalRef: any }) {
  const handleSelectModel = useCallback(
    (model: string) => {
      onModelSelect(model);
      bottomSheetModalRef.current?.close();
    },
    [onModelSelect, bottomSheetModalRef]
  );

  const renderModelItem = useCallback(
    (item: AiModelType) => (
      <TouchableOpacity disabled={!item.available} key={item.name} onPress={() => handleSelectModel(item.model)}>
        <ThemedView onSelected={item.model === selectedModel} style={[styles.sheetSelectableContent, { backgroundColor: item.model === selectedModel ? '#272727' : '' }]}>
          <CustomText
            onSelected={item.model === selectedModel}
            style={{
              textAlign: 'center',
            }}
          >
            {item.name}
          </CustomText>
        </ThemedView>
      </TouchableOpacity>
    ),
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
