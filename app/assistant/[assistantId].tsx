/* eslint-disable import/no-unresolved */
import { ThemedView } from '@/components/ThemedView';
import { AssistantResponse } from '@/components/ui/AsssitantResponse';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default function GeneratedContentModal() {
  const [input, setInput] = useState<string>('');

  return (
    <ThemedView style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        <AssistantResponse input={input} setInput={setInput} />
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    gap: 12,
  },
});
