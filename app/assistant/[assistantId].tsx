/* eslint-disable import/no-unresolved */
import { AIResponse } from '@/components/AIResponse';
import { CustomText } from '@/components/Text';
import { CustomTextInput } from '@/components/TextInput';
import { ThemedView } from '@/components/ThemedView';
import { AI_ASSISTANTS } from '@/constants/assistants';
import { useGenerateAssistant } from '@/hooks/useGenerateAssistant';
import { useLocalSearchParams } from 'expo-router';
import { Button, TouchableOpacity, View, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default function GeneratedContentModal() {
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
      return item.health.filter((item) => item.type === assistantType)[0];
    }
  })[0];
  console.log(assistant);
  return (
    <ThemedView style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        <View style={{ gap: 14 }}>
          <CustomTextInput style={{ borderWidth: 2, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 8 }} placeholder="Generate a Tiktok content Idea ✨" />
          <TouchableOpacity style={{ padding: 8, backgroundColor: '#fcfcfc', borderRadius: 12, overflow: 'hidden' }}>
            <CustomText style={{ color: 'black', textAlign: 'center' }}>Generate</CustomText>
          </TouchableOpacity>
          <Button title="Generate" color={'gray'} disabled={isLoading} onPress={() => submit({ initialPrompt: '' })} />
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
