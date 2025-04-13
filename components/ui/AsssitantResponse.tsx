/* eslint-disable import/no-unresolved */
import { AIResponse } from '@/components/AIResponse';
import { CustomText } from '@/components/Text';
import { CustomTextInput } from '@/components/TextInput';
import { ThemedView } from '@/components/ThemedView';
import { AI_ASSISTANTS } from '@/constants/assistants';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { View } from 'react-native';
import { CustomButton } from '../Button';
import { useLocalSearchParams } from 'expo-router';
import { useGenerateAssistant } from '@/hooks/useGenerateAssistant';

function AssistantForm() {
  const { assistantType } = useLocalSearchParams();
  console.log(assistantType);

  const { object } = useGenerateAssistant();
  const responseSchema = () => {
    if (assistantType === 'social') {
      return {
        title: object?.title,
        content: object?.content,
        thoughts: object?.thoughts,
      };
    }
    if (assistantType === 'health') {
      return {
        diagnosis: object?.diagnosis,
        recommendedMedications: object?.recommendedMedications,
        precautions: object?.precautions,
        followUp: object?.followUp,
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
            <AIResponse>{response?.title !== undefined ? response.title : 'Recommended Title Content'}</AIResponse>
          </ThemedView>
        </View>

        <View style={{ gap: 8 }}>
          <CustomText style={{ paddingHorizontal: 24 }}>Content Description</CustomText>
          <ThemedView type="assistant" style={{ paddingHorizontal: 24, borderRadius: 12 }}>
            <AIResponse>{response?.content !== undefined ? response.content : 'Description'}</AIResponse>
          </ThemedView>
        </View>

        <View style={{ gap: 8 }}>
          <CustomText style={{ paddingHorizontal: 24 }}>Thoughts on this content</CustomText>
          <ThemedView type="assistant" style={{ paddingHorizontal: 24, borderRadius: 12 }}>
            <AIResponse>{response?.thoughts !== undefined ? response.thoughts : 'Thoughts About Content'}</AIResponse>
          </ThemedView>
        </View>
      </>
    );
  }
  if (assistantType === 'health') {
    return (
      <>
        <View style={{ gap: 8 }}>
          <CustomText style={{ paddingHorizontal: 24 }}>Diagnosis</CustomText>
          <ThemedView type="assistant" style={{ paddingHorizontal: 24, borderRadius: 12 }}>
            <AIResponse>{response?.diagnosis !== undefined ? response.diagnosis : 'Summary of condition'}</AIResponse>
          </ThemedView>
        </View>

        <View style={{ gap: 8 }}>
          <CustomText style={{ paddingHorizontal: 24 }}>Recommended Medications</CustomText>
          <ThemedView type="assistant" style={{ paddingHorizontal: 24, borderRadius: 12 }}>
            {response?.recommendedMedications === undefined && <AIResponse>List of Medications</AIResponse>}
            {response?.recommendedMedications?.map((med: any, index: number) => (
              <View key={index}>
                <AIResponse>{`Name: ${med?.name}`}</AIResponse>
                <AIResponse>{`Dosage: ${med?.dosage}`}</AIResponse>
                <AIResponse>{`Frequency: ${med?.frequency}`}</AIResponse>
              </View>
            ))}
          </ThemedView>
        </View>

        <View style={{ gap: 8 }}>
          <CustomText style={{ paddingHorizontal: 24 }}>Precations</CustomText>
          <ThemedView type="assistant" style={{ paddingHorizontal: 24, borderRadius: 12 }}>
            <AIResponse>{response?.precautions !== undefined ? response.precautions : 'Precautions related to the diagnosis'}</AIResponse>
          </ThemedView>
        </View>

        <View style={{ gap: 8 }}>
          <CustomText style={{ paddingHorizontal: 24 }}>Follow Up</CustomText>
          <ThemedView type="assistant" style={{ paddingHorizontal: 24, borderRadius: 12 }}>
            <AIResponse>{response?.followUp !== undefined ? response.followUp : 'Suggestion for further consultation'}</AIResponse>
          </ThemedView>
        </View>
      </>
    );
  }
}

export function AssistantResponse({ input, setInput }: { input: string; setInput: Dispatch<SetStateAction<string>> }) {
  const { assistantId, assistantType } = useLocalSearchParams();
  const { setSchemaType, isLoading, submit, stop } = useGenerateAssistant();

  const assistant = AI_ASSISTANTS.map((item) => {
    if (assistantType === 'social') return item.socialMedia.filter((item) => item.type === assistantId)[0];
    if (assistantType === 'health') return item.health.filter((item) => item.type === assistantId)[0];
  })[0];

  console.log(assistant);

  useEffect(() => {
    setSchemaType(assistantType.toString());
    console.log('inside modal');
    return () => {
      console.log('outside modal');
      stop(); // Stop any ongoing processes
      setInput(''); // Reset the input state
    };
  }, [stop, setInput, assistantType, setSchemaType]);

  return (
    <>
      <View style={{ gap: 14 }}>
        <CustomTextInput multiline={true} style={{ borderWidth: 2, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 8 }} placeholder={assistant?.placeholder} onChangeText={setInput} value={input} />
        <CustomButton
          disabled={isLoading}
          style={{ padding: 8, borderRadius: 12, overflow: 'hidden' }}
          onPress={() => submit({ initialPrompt: assistant?.initialPrompt, prompt: input, schemaName: assistant?.type, description: assistant?.description })}
        >
          <CustomText style={{ textAlign: 'center' }}>Generate</CustomText>
        </CustomButton>
        {isLoading && (
          <CustomButton style={{ padding: 8, borderRadius: 12, overflow: 'hidden' }} onPress={() => stop()}>
            <CustomText>Stop</CustomText>
          </CustomButton>
        )}
      </View>

      {/* divider line */}
      <View style={{ marginVertical: 14, marginHorizontal: 10, flex: 1, height: 1, borderRadius: 99, backgroundColor: '#5e5e5e' }} />

      <View style={{ paddingBottom: 80, display: 'flex', gap: 14 }}>
        <AssistantForm />
      </View>
    </>
  );
}
