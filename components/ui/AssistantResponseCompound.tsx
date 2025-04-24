/* eslint-disable import/no-unresolved */
import { AI_ASSISTANTS } from '@/constants/assistants';
import { useGenerateAssistant } from '@/hooks/useGenerateAssistant';
import { createContext } from '@/utils/createContext';
import { useLocalSearchParams } from 'expo-router';
import { Dispatch, ReactNode, SetStateAction, useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { CustomTextInput } from '../TextInput';
import { CustomButton } from '../Button';
import { CustomText } from '../Text';
import { ThemedView } from '../ThemedView';
import { AIResponse } from '../AIResponse';

type AssistantProps = {
  type: string;
  logo: string;
  initialPrompt: string;
  description: string;
  assistantType: string;
  placeholder: string;
  subtitle: string;
};

type ContentResponseProps = {
  title: string;
  content: string;
  thoughts: string;
};

type HealthResponseProps = {
  diagnosis: string;
  recommendedMedications: [{ name: string; dosage: string; frequency: string }];
  precautions: string;
  followUp: string;
};

type AssistantResponseProviderType = {
  assistantType: string;
  assistantId: string;
  setSchemeType: Dispatch<SetStateAction<string>>;
  isLoading: boolean;
  submit: any;
  stop: any;
  assistant: AssistantProps;
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
  object: any;
};

const [AssistantResponseContextProvider, useAssistantResponseContext] = createContext<AssistantResponseProviderType>('AssistantResponseCompount');

const Root = ({ input, setInput, children }: { input: string; setInput: Dispatch<SetStateAction<string>>; children: ReactNode }) => {
  const { assistantId, assistantType } = useLocalSearchParams();
  const { setSchemaType, isLoading, submit, stop } = useGenerateAssistant();
  const { object } = useGenerateAssistant();

  console.log('assistant id: ', assistantId);
  console.log('assistant type: ', assistantType);
  const assistant = AI_ASSISTANTS.map((item) => {
    if (assistantType === 'social') return item.socialMedia.filter((item) => item.type === assistantId)[0];
    if (assistantType === 'health') return item.health.filter((item) => item.type === assistantId)[0];
    if (assistantType === 'sports') return item.sports.filter((item) => item.type === assistantId)[0];
  })[0];

  useEffect(() => {
    setSchemaType(assistantType.toString());
    console.log('inside modal');
    return () => {
      console.log('outside modal');
      stop(); // Stop any ongoing processes setInput(''); // Reset the input state
    };
  }, [stop, setInput, assistantType, setSchemaType]);

  return <AssistantResponseContextProvider {...{ object, input, setInput, assistantId, assistantType, isLoading, submit, stop, assistant }}>{children}</AssistantResponseContextProvider>;
};

const ContentAssistantResponse = () => {
  const { object }: { object: ContentResponseProps } = useAssistantResponseContext('Response');
  return (
    <>
      <View style={{ gap: 8 }}>
        <CustomText style={{ paddingHorizontal: 24 }}>Content Title</CustomText>
        <ThemedView type="assistant" style={{ paddingHorizontal: 24, borderRadius: 12 }}>
          <AIResponse>{object?.title !== undefined ? object.title : 'Recommended Title Content'}</AIResponse>
        </ThemedView>
      </View>

      <View style={{ gap: 8 }}>
        <CustomText style={{ paddingHorizontal: 24 }}>Content Description</CustomText>
        <ThemedView type="assistant" style={{ paddingHorizontal: 24, borderRadius: 12 }}>
          <AIResponse>{object?.content !== undefined ? object.content : 'Description'}</AIResponse>
        </ThemedView>
      </View>

      <View style={{ paddingBottom: 80, gap: 8 }}>
        <CustomText style={{ paddingHorizontal: 24 }}>Thoughts on this content</CustomText>
        <ThemedView type="assistant" style={{ paddingHorizontal: 24, borderRadius: 12 }}>
          <AIResponse>{object?.thoughts !== undefined ? object.thoughts : 'Thoughts About Content'}</AIResponse>
        </ThemedView>
      </View>
    </>
  );
};

const HealthAssistantResponse = () => {
  const { object }: { object: HealthResponseProps } = useAssistantResponseContext('HealthAssistantResponse');
  return (
    <>
      <View style={{ gap: 8 }}>
        <CustomText style={{ paddingHorizontal: 24 }}>Diagnosis</CustomText>
        <ThemedView type="assistant" style={{ paddingHorizontal: 24, borderRadius: 12 }}>
          <AIResponse>{object?.diagnosis !== undefined ? object.diagnosis : 'Summary of condition'}</AIResponse>
        </ThemedView>
      </View>

      <View style={{ gap: 8 }}>
        <CustomText style={{ paddingHorizontal: 24 }}>Recommended Medications</CustomText>
        <ThemedView type="assistant" style={{ paddingHorizontal: 24, borderRadius: 12 }}>
          {object?.recommendedMedications.length > 0 ? (
            object.recommendedMedications.map((item, index) => (
              <View key={index}>
                {index > 0 && <View style={{ height: 1, borderRadius: 99, flex: 1, backgroundColor: '#5e5e5e' }} />}
                <AIResponse>{`Name: ${item.name}`}</AIResponse>
                <AIResponse>{`Dosage: ${item.dosage}`}</AIResponse>
                <AIResponse>{`Frequency: ${item.frequency}`}</AIResponse>
              </View>
            ))
          ) : (
            <CustomText>Medication frequency, etc.</CustomText>
          )}
        </ThemedView>
      </View>

      <View style={{ gap: 8 }}>
        <CustomText style={{ paddingHorizontal: 24 }}>Precautions</CustomText>
        <ThemedView type="assistant" style={{ paddingHorizontal: 24, borderRadius: 12 }}>
          <AIResponse>{object?.precautions !== undefined ? object.precautions : 'Precautions related to the diagnosis'}</AIResponse>
        </ThemedView>
      </View>

      <View style={{ gap: 8 }}>
        <CustomText style={{ paddingHorizontal: 24 }}>Follow Up</CustomText>
        <ThemedView type="assistant" style={{ paddingHorizontal: 24, borderRadius: 12 }}>
          <AIResponse>{object?.followUp !== undefined ? object.followUp : 'Suggestion for further consultation'}</AIResponse>
        </ThemedView>
      </View>
    </>
  );
};

function Response() {
  const { assistantType } = useAssistantResponseContext('Response');

  if (assistantType === 'social') {
    return <ContentAssistantResponse />;
  }

  if (assistantType === 'health') {
    return <HealthAssistantResponse />;
  }

  if (assistantType === 'sports') {
    return <CustomText>Not yet available</CustomText>;
  }
}

const Inputs = () => {
  const { assistant, input, setInput, isLoading, stop, submit } = useAssistantResponseContext('Inputs');
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
          <CustomButton lightColor="#161616" darkColor="white" style={{ flexDirection: 'row', gap: 10, alignItems: 'center', justifyContent: 'center', padding: 8, borderRadius: 12, overflow: 'hidden' }} onPress={() => stop()}>
            <CustomText lightColor="white" darkColor="black">
              Stop
            </CustomText>
            <ActivityIndicator />
          </CustomButton>
        )}
      </View>
    </>
  );
};

const Divider = () => {
  return <View style={{ marginVertical: 14, marginHorizontal: 10, flex: 1, height: 1, borderRadius: 99, backgroundColor: '#5e5e5e' }} />;
};

export const AssistantResponseCompound = { Root, Inputs, Response, Divider };
