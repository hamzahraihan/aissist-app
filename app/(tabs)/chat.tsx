import { ThemedView } from '@/components/ThemedView';
import { openAiService } from '@/services/openai';
import { ChatCompletionMessageParam } from 'openai/resources';
import { useState } from 'react';
import { Button, StyleSheet, TextInput } from 'react-native';

export default function ChatScreen() {
  const [input, setInput] = useState<string>('');

  // set messages for ai
  const [openAiMessages, setOpenAiMessages] = useState<ChatCompletionMessageParam[]>([]);

  const generateTextFromOpenAI = async () => {
    try {
      // Component function that uses the service

      if (!input) {
        console.log('Input is empty, resetting messages...');
        setOpenAiMessages([]);
        return;
      }

      // Add user message to the conversation
      setOpenAiMessages([{ role: 'user', content: input }]);
      setInput(''); // Clear input field

      // Get response from OpenAI
      const responseText = await openAiService(openAiMessages);

      console.log(responseText);
    } catch (error: any) {
      console.error(error);
    }
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
