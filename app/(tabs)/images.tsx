import { CustomButton } from '@/components/Button';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { generateImageFalAI } from '@/services/fal-ai';
import { StyleSheet } from 'react-native';
import * as FileSystem from 'expo-file-system';

export default function ImagesScreen() {
  return (
    <ThemedView style={styles.container}>
      <CustomButton onPress={() => generateImageFalAI()}>
        <ThemedText>Press me</ThemedText>
      </CustomButton>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
