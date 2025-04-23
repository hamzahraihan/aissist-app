/* eslint-disable import/no-unresolved */
import { CustomText } from '@/components/Text';
import { CustomTextInput } from '@/components/TextInput';
import { AI_ASSISTANTS } from '@/constants/assistants';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { View } from 'react-native';
import { CustomButton } from '../Button';
import { useLocalSearchParams } from 'expo-router';
import { useGenerateAssistant } from '@/hooks/useGenerateAssistant';
import { AssistantResponseCompound } from './AssistantResponseCompound';

function AssistantForm() {
  const { assistantType } = useLocalSearchParams();

  if (assistantType === 'social') {
    return <AssistantResponseCompound.ContentAssistantResponse />;
  }

  if (assistantType === 'health') {
    return <AssistantResponseCompound.HealthAssistantResponse />;
  }
}

export function AssistantResponse({ input, setInput }: { input: string; setInput: Dispatch<SetStateAction<string>> }) {
  const { assistantId, assistantType } = useLocalSearchParams();
  const { isLoading, submit, stop } = useGenerateAssistant();

  const assistant = AI_ASSISTANTS.map((item) => {
    if (assistantType === 'social') return item.socialMedia.filter((item) => item.type === assistantId)[0];
    if (assistantType === 'health') return item.health.filter((item) => item.type === assistantId)[0];
  })[0];

  console.log(assistant);

  useEffect(() => {
    console.log('inside modal');
    return () => {
      console.log('ouside modal');
      stop();
    };
  }, [stop]);
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
          <CustomButton style={{ padding: 8, borderRadius: 12, overflow: 'hidden' }}>
            <CustomText>Stop</CustomText>
          </CustomButton>
        )}
      </View>

      {/* divider line */}
      <View style={{ marginVertical: 14, marginHorizontal: 10, flex: 1, height: 1, borderRadius: 99, backgroundColor: '#5e5e5e' }} />

      <View style={{ display: 'flex', gap: 14 }}>
        <AssistantForm />
      </View>
    </>
  );
}
