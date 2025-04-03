/* eslint-disable import/no-unresolved */
import { AIResponse } from '@/components/AIResponse';
import { CustomText } from '@/components/Text';
import { CustomTextInput } from '@/components/TextInput';
import { ThemedView } from '@/components/ThemedView';
import { useGenerateAssistant } from '@/hooks/useGenerateAssistant';
import { Button, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default function GeneratedContentModal() {
  const { object, isLoading, error, submit } = useGenerateAssistant();
  console.log('generated object: ', object);
  console.log(error);
  return (
    <ThemedView style={styles.container}>
      <ScrollView>
        <View style={{ gap: 14 }}>
          <CustomTextInput style={{ borderWidth: 2, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 8 }} placeholder="Generate a Tiktok content Idea ✨" />
          <Button title="Generate" disabled={isLoading} onPress={() => submit('i want to create a popular content that will get more views, content will be like a meme and adding a valueable knowledge')} />
        </View>

        {/* divider line */}
        <View style={{ flex: 1, borderWidth: 2, backgroundColor: 'gray' }} />

        <View style={{ display: 'flex', gap: 14 }}>
          <View style={{ gap: 8 }}>
            <CustomText style={{ paddingHorizontal: 24 }}>Recommended Content Title</CustomText>
            <ThemedView type="assistant" style={{ paddingHorizontal: 24, borderRadius: 12 }}>
              {object !== undefined ? <AIResponse>{object.title}</AIResponse> : <CustomText style={{ paddingVertical: 6 }}>Content Title</CustomText>}
            </ThemedView>
          </View>

          <View style={{ gap: 8 }}>
            <CustomText style={{ paddingHorizontal: 24 }}>Recommended Content Title</CustomText>
            <ThemedView type="assistant" style={{ paddingHorizontal: 24, borderRadius: 12 }}>
              <AIResponse>{object !== undefined ? object.content : 'content description'}</AIResponse>
            </ThemedView>
          </View>

          <View style={{ paddingBottom: 80, gap: 8 }}>
            <CustomText style={{ paddingHorizontal: 24 }}>Recommended Content Title</CustomText>
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
