/* eslint-disable import/no-unresolved */
import { CustomText } from '@/components/Text';
import { ThemedView } from '@/components/ThemedView';
import { useGenerateAssistant } from '@/hooks/useGenerateAssistant';
import { Button, StyleSheet, View } from 'react-native';

export default function GeneratedContentModal() {
  const { object, isLoading, error, submit } = useGenerateAssistant();
  console.log('generated object: ', object);
  console.log(error);
  return (
    <ThemedView style={styles.container}>
      <View style={{ display: 'flex', gap: 12 }}>
        <CustomText style={{ paddingHorizontal: 24 }}>Recommended Content Title</CustomText>
        <ThemedView type="assistant" style={{ paddingHorizontal: 24, paddingVertical: 12, borderRadius: 12 }}>
          <CustomText type="subtitle">Content Title</CustomText>
        </ThemedView>
        <Button title="Generate" disabled={isLoading} onPress={() => submit('i want to create a popular content that will get more views, content will be like a meme and adding a valueable knowledge')} />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 12,
    gap: 12,
  },
});
