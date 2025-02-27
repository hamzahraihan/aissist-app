import { CustomButton } from '@/components/Button';
import { Card } from '@/components/Card';
import { CustomTextInput } from '@/components/TextInput';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { openAiService } from '@/services/openai';
import { Ionicons } from '@expo/vector-icons';
import { ChatCompletionMessageParam } from 'openai/resources';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default function ChatScreen() {
  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  // set messages for ai
  const [openAiMessages, setOpenAiMessages] = useState<ChatCompletionMessageParam[]>([]);

  const generateTextFromOpenAI = async () => {
    setLoading(true);
    try {
      if (!input.trim()) {
        console.log('Input is empty, resetting messages...');
        setOpenAiMessages([]);
        return;
      }

      console.log('User input:', input);

      // Append the new user message while keeping previous messages
      setOpenAiMessages((prevMessages) => [...prevMessages, { role: 'user', content: input.trim() }]);

      setInput(''); // Clear input field

      // Get response from OpenAI
      const responseText = await openAiService([...openAiMessages, { role: 'user', content: input.trim() }]);

      if (!responseText) {
        console.warn('No response received from OpenAI.');
        return;
      }

      // Append OpenAI's response to the chat history
      setOpenAiMessages((prevMessages) => [...prevMessages, { role: 'assistant', content: responseText }]);

      console.log('OpenAI Response:', responseText);
    } catch (error) {
      console.error('Error generating text from OpenAI:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView>
        <View style={{ padding: 18 }}>
          {openAiMessages.length == 0 ? (
            <>
              <ThemedText style={styles.textHeading} type="defaultSemiBold">
                Hi!
              </ThemedText>
              <Card style={styles.card}>
                <Text>HALLO</Text>
              </Card>
              <Card style={styles.card}>
                <Text>HALLO</Text>
              </Card>
              <Card style={styles.card}>
                <Text>HALLO</Text>
              </Card>
              <Card style={styles.card}>
                <Text>HALLO</Text>
              </Card>
            </>
          ) : (
            <>
              {openAiMessages.map((item, index) => (
                <View key={index}>
                  <ThemedText>{item.content?.toString()}</ThemedText>
                </View>
              ))}
            </>
          )}
          <View style={styles.inputContainer}>
            <CustomTextInput style={styles.textInput} onChangeText={setInput} value={input} placeholder="How can I help you today?" />

            <CustomButton style={styles.button} onPress={() => generateTextFromOpenAI()}>
              <Ionicons name="send" color="white" />
            </CustomButton>
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  textHeading: {
    textAlign: 'center',
    fontSize: 50,
  },
  container: { flex: 1, display: 'flex', justifyContent: 'space-evenly', gap: 10 },
  inputContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10 },
  textInput: {
    flex: 1,
    borderWidth: 2,
    borderRadius: 12,
    height: 40,
    padding: 12,
  },
  card: {
    marginBottom: 10,
    height: 100,
  },
  button: {
    padding: 10,
    position: 'absolute',
    backgroundColor: 'transparent',
    right: 0,
  },
});
