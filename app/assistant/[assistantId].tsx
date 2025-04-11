/* eslint-disable import/no-unresolved */
import { ThemedView } from '@/components/ThemedView';
import { AssistantResponse } from '@/components/ui/AsssitantResponse';
import { AI_ASSISTANTS, AiResponse } from '@/constants/assistants';
import { useGenerateAssistant } from '@/hooks/useGenerateAssistant';
import { useLocalSearchParams } from 'expo-router';
import { Dispatch, SetStateAction, useState } from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const AssistantFormView = ({ input, setInput, assistant, object, isLoading, submit }: { input: string; setInput: Dispatch<SetStateAction<string>>; assistant: AiResponse | undefined; object: any; isLoading: boolean; submit: any }) => {
  const { assistantId, assistantType } = useLocalSearchParams();
  console.log(`assistanttype: ${assistantType}`, assistantId);

  return <AssistantResponse assistantType={assistantType} input={input} setInput={setInput} object={object} submit={submit} isLoading={isLoading} assistant={assistant} />;
};

export default function GeneratedContentModal() {
  const [input, setInput] = useState<string>('');
  const { assistantId, assistantType } = useLocalSearchParams();

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
      <ScrollView style={{ flex: 1 }}>
        <AssistantFormView input={input} assistant={assistant} isLoading={isLoading} object={object} setInput={setInput} submit={submit} />
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
