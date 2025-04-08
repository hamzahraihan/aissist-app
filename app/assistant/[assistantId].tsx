/* eslint-disable import/no-unresolved */
import { ThemedView } from '@/components/ThemedView';
import { SocialMediaAssistantResponse } from '@/components/ui/AsssitantResponse';
import { AI_ASSISTANTS } from '@/constants/assistants';
import { useGenerateAssistant } from '@/hooks/useGenerateAssistant';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default function GeneratedContentModal() {
  const [input, setInput] = useState<string>('');
  const { assistantId, assistantType } = useLocalSearchParams();
  console.log(`assistanttype: ${assistantType}`, assistantId);

  const { object, isLoading, error, submit } = useGenerateAssistant();
  console.log('generated object: ', object);
  console.log(error);

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
      <ScrollView style={{ flex: 1 }}>{assistantType === 'social' ? <SocialMediaAssistantResponse input={input} setInput={setInput} object={object} submit={submit} isLoading={isLoading} assistant={assistant} /> : null}</ScrollView>
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
