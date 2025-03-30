/* eslint-disable import/no-unresolved */
import { CustomText } from '@/components/Text';
import { ThemedView } from '@/components/ThemedView';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function GeneratedContentModal() {
  return (
    <SafeAreaProvider>
      <ThemedView style={styles.container}>
        <SafeAreaView style={styles.container}>
          <CustomText>Generate content modal</CustomText>
        </SafeAreaView>
      </ThemedView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});
