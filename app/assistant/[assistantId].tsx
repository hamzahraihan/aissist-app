/* eslint-disable import/no-unresolved */
import { ThemedView } from '@/components/ThemedView';
import { AssistantResponse } from '@/components/ui/AsssitantResponse';
import { AI_ASSISTANTS } from '@/constants/assistants';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default function GeneratedContentModal() {
  const [input, setInput] = useState<string>('');
  const { assistantId, assistantType } = useLocalSearchParams();

  const assistant = AI_ASSISTANTS.map((item) => {
    if (assistantType === 'social') {
      return item.socialMedia.filter((item) => item.type === assistantId)[0];
    }
    if (assistantType === 'health') {
      return item.health.filter((item) => item.type === assistantId)[0];
    }
  })[0];
  console.log(assistant);

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
