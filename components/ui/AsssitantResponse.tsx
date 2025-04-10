/* eslint-disable import/no-unresolved */
import { AIResponse } from '@/components/AIResponse';
import { CustomText } from '@/components/Text';
import { CustomTextInput } from '@/components/TextInput';
import { ThemedView } from '@/components/ThemedView';
import { AiResponse } from '@/constants/assistants';
import { Dispatch, SetStateAction } from 'react';
import { View } from 'react-native';
import { CustomButton } from '../Button';

export function SocialMediaAssistantResponse({
  input,
  setInput,
  assistant,
  object,
  isLoading,
  submit,
}: {
  assistant: AiResponse | undefined;
  object: any;
  isLoading: boolean;
  submit: any;
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
}) {
  return (
    <>
      <View style={{ gap: 14 }}>
        <CustomTextInput style={{ borderWidth: 2, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 8 }} placeholder="Generate a Tiktok content Idea ✨" onChangeText={setInput} value={input} />
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
        <View style={{ gap: 8 }}>
          <CustomText style={{ paddingHorizontal: 24 }}>Recommended Content Title</CustomText>
          <ThemedView type="assistant" style={{ paddingHorizontal: 24, borderRadius: 12 }}>
            {object !== undefined ? <AIResponse>{object.title}</AIResponse> : <CustomText style={{ paddingVertical: 6 }}>Content Title</CustomText>}
          </ThemedView>
        </View>

        <View style={{ gap: 8 }}>
          <CustomText style={{ paddingHorizontal: 24 }}>Recommended Content Description</CustomText>
          <ThemedView type="assistant" style={{ paddingHorizontal: 24, borderRadius: 12 }}>
            <AIResponse>{object !== undefined ? object.content : 'content description'}</AIResponse>
          </ThemedView>
        </View>

        <View style={{ paddingBottom: 80, gap: 8 }}>
          <CustomText style={{ paddingHorizontal: 24 }}>Thoughts on this content</CustomText>
          <ThemedView type="assistant" style={{ paddingHorizontal: 24, borderRadius: 12 }}>
            <AIResponse>{object !== undefined ? object.thoughts : 'content description'}</AIResponse>
          </ThemedView>
        </View>
      </View>
    </>
  );
}

export function HealthAssistantResponse() {
  return;
}
