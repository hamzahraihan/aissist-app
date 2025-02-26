import { ThemedView } from '@/components/ThemedView';
import { openAiService } from '@/services/openai';
import { IOpenAIMessage } from '@/types/chat';
import { useState } from 'react';
import { Button, StyleSheet, TextInput } from 'react-native';

export default function ChatScreen() {
  const [input, setInput] = useState<string>('');

  // set messages for ai
  const [openAiMessages, setOpenAiMessages] = useState<IOpenAIMessage[]>([]);

  const generateTextFromOpenAI = async () => {
    if (input) {
      setOpenAiMessages([{ role: 'user', content: input }]);
    }
    const data = await openAiService(openAiMessages);
    console.log(data);
  };

  return (
    <ThemedView style={styles.container}>
      <TextInput
        style={{ borderWidth: 1, borderColor: 'white', height: 40, padding: 12, color: 'white' }}
        onChangeText={setInput}
        value={input}
        placeholder="Input your prompt"
        placeholderTextColor="white"
        selectionColor="white"
        cursorColor="white"
      />
      <Button title="Press me" color="#f194ff" onPress={() => generateTextFromOpenAI()} />
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
