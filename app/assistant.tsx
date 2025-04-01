/* eslint-disable import/no-unresolved */
import { CustomText } from '@/components/Text';
import { ThemedView } from '@/components/ThemedView';
import { StyleSheet, View } from 'react-native';

export default function GeneratedContentModal() {
  return (
    <ThemedView style={styles.container}>
      <View style={{ display: 'flex', gap: 12 }}>
        <CustomText style={{ paddingHorizontal: 24 }}>Recommended Content Title</CustomText>
        <ThemedView type="assistant" style={{ paddingHorizontal: 24, paddingVertical: 12, borderRadius: 12 }}>
          <CustomText type="subtitle">Content Title</CustomText>
        </ThemedView>
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
