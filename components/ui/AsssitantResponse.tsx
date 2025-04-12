/* eslint-disable import/no-unresolved */
import { AIResponse } from '@/components/AIResponse';
import { CustomText } from '@/components/Text';
import { CustomTextInput } from '@/components/TextInput';
import { ThemedView } from '@/components/ThemedView';
import { AI_ASSISTANTS, AssistantResponsesTypes } from '@/constants/assistants';
import { Dispatch, SetStateAction } from 'react';
import { View } from 'react-native';
import { CustomButton } from '../Button';
import { useLocalSearchParams } from 'expo-router';
import { useGenerateAssistant } from '@/hooks/useGenerateAssistant';

function AssistantForm({ assistant }: { assistant: AssistantResponsesTypes | undefined }) {
  const { assistantType } = useLocalSearchParams();
  const { object } = useGenerateAssistant();
  const responseSchema = () => {
    if (assistantType === 'social') {
      return {
        inputPlaceholder: assistant?.placeholder,
        titlePlaceholer: 'Recommended content title',
        contentPlaceholder: 'Recommended content description',
        thoughtsPlaceholder: 'Thoughts on this content',
        title: object?.title,
        content: object?.content,
        thoughts: object?.thoughts,
      };
    }
    if (assistantType === 'health') {
      return {
        inputPlaceholder: assistant?.placeholder,
        agePlaceholder: 'Age',
        genderPlaceholder: 'Gender',
        symptomsPlaceholder: 'Symptoms',
        allergiesPlaceholder: 'Allegies',
        currentMedicationsPlaceholder: 'Current Medications',
        medicalHistoryPlaceholder: 'Medical History',
        age: object?.userAge,
        gender: object?.userGender,
        symptoms: object?.symptoms,
        allergies: object?.allergies,
        currentMedications: object?.currentMedications,
        medicalHistory: object?.medicalHistory,
      };
    }
  };

  const response = responseSchema();

  if (assistantType === 'social') {
    return (
      <>
        <View style={{ gap: 8 }}>
          <CustomText style={{ paddingHorizontal: 24 }}>Content Title</CustomText>
          <ThemedView type="assistant" style={{ paddingHorizontal: 24, borderRadius: 12 }}>
            <AIResponse>{response?.title === undefined ? response?.titlePlaceholer : response.content}</AIResponse>
          </ThemedView>
        </View>

        <View style={{ gap: 8 }}>
          <CustomText style={{ paddingHorizontal: 24 }}>Content Description</CustomText>
          <ThemedView type="assistant" style={{ paddingHorizontal: 24, borderRadius: 12 }}>
            <AIResponse>{object !== undefined ? object.content : response?.contentPlaceholder}</AIResponse>
          </ThemedView>
        </View>

        <View style={{ paddingBottom: 80, gap: 8 }}>
          <CustomText style={{ paddingHorizontal: 24 }}>Thoughts on this content</CustomText>
          <ThemedView type="assistant" style={{ paddingHorizontal: 24, borderRadius: 12 }}>
            <AIResponse>{object !== undefined ? object.thoughts : 'Thoughts About Content'}</AIResponse>
          </ThemedView>
        </View>
      </>
    );
  }
}

export function AssistantResponse({ input, setInput }: { input: string; setInput: Dispatch<SetStateAction<string>> }) {
  const { assistantId, assistantType } = useLocalSearchParams();
  const { isLoading, submit } = useGenerateAssistant();
  const assistant = AI_ASSISTANTS.map((item) => {
    if (assistantType === 'social') return item.socialMedia.filter((item) => item.type === assistantId)[0];
    if (assistantType === 'health') return item.health.filter((item) => item.type === assistantId)[0];
  })[0];

  const responseSchema = () => {
    if (assistantType === 'social') {
      return {
        inputPlaceholder: assistant?.placeholder,
      };
    }
    if (assistantType === 'health') {
      return {
        inputPlaceholder: assistant?.placeholder,
      };
    }
  };

  const response = responseSchema();

  return (
    <>
      <View style={{ gap: 14 }}>
        <CustomTextInput style={{ borderWidth: 2, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 8 }} placeholder={response!.inputPlaceholder} onChangeText={setInput} value={input} />
        <CustomButton
          disabled={isLoading}
          style={{ padding: 8, borderRadius: 12, overflow: 'hidden' }}
          onPress={() => submit({ initialPrompt: assistant?.initialPrompt, prompt: input, schemaName: assistant?.type, description: assistant?.description })}
        >
          <CustomText style={{ textAlign: 'center' }}>Generate</CustomText>
        </CustomButton>
      </View>

      {/* divider line */}
      <View style={{ marginVertical: 14, marginHorizontal: 10, flex: 1, height: 1, borderRadius: 99, backgroundColor: '#5e5e5e' }} />

      <View style={{ display: 'flex', gap: 14 }}>
        <AssistantForm assistant={assistant} />
      </View>
    </>
  );
}
