import { AIResponse } from '@/components/AIResponse';
import { CustomButton } from '@/components/Button';
import { Card } from '@/components/Card';
import { CustomTextInput } from '@/components/TextInput';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useGenerateOpenaiChat } from '@/hooks/useGenerateOpenaiChat';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { StyleSheet, useColorScheme, View, Image, TouchableHighlight } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default function ChatScreen() {
  const colorScheme = useColorScheme();

  const [inputHeight, setInputHeight] = useState<number>(0);

  const { generateTextFromOpenAI, setInput, input, loading, openAiMessages } = useGenerateOpenaiChat();
  console.log('🚀 ~ ChatScreen ~ loading:', loading);

  return (
    <ThemedView style={styles.container}>
      <ScrollView>
        {openAiMessages?.length === 0 ? (
          <View style={{ padding: 18 }}>
            <ThemedText style={styles.textHeading} type="defaultSemiBold">
              Hi!
            </ThemedText>

            <TouchableHighlight>
              <Card style={styles.card}>
                <ThemedText style={{ textAlign: 'center' }}>Remembers what user said earlier in the conversation</ThemedText>
              </Card>
            </TouchableHighlight>

            <Card style={styles.card}>
              <ThemedText style={{ textAlign: 'center' }}>Allows user to provide. follow-up corrections With Ai</ThemedText>
            </Card>

            <Card style={styles.card}>
              <ThemedText style={{ textAlign: 'center' }}>Limited knowledge of world and events after 2021</ThemedText>
            </Card>

            <Card style={styles.card}>
              <ThemedText style={{ textAlign: 'center' }}>May occasionally generate incorrect information</ThemedText>
            </Card>
          </View>
        ) : (
          <>
            {openAiMessages.map((item: any, index) => (
              <ThemedView type={item.role} style={{ padding: 18 }} key={index}>
                {item.role === 'user' && <Image style={styles.image} source={require('@/assets/images/user-default.png')} />}
                {item.role === 'assistant' && <Image style={styles.image} source={require('@/assets/images/brainbox.png')} />}
                <AIResponse>{item.content}</AIResponse>
              </ThemedView>
            ))}
          </>
        )}

        {loading && <Ionicons name="logo-android" color={colorScheme === 'light' ? 'dark' : 'white'} size={20} />}
      </ScrollView>
      <View style={styles.inputContainer}>
        <CustomTextInput multiline={true} style={styles.textInput} onChangeText={setInput} onContentSizeChange={(event) => setInputHeight(event.nativeEvent.contentSize.height)} value={input} placeholder="How can I help you today?" />

        <CustomButton style={[styles.button, { height: Math.max(35, inputHeight) }]} onPress={() => generateTextFromOpenAI()}>
          <Ionicons name="send" color={colorScheme === 'light' ? 'dark' : 'white'} size={18} />
        </CustomButton>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  textHeading: {
    textAlign: 'center',
    fontSize: 50,
    paddingTop: 20,
    paddingBottom: 20,
  },
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between',
    gap: 10,
  },
  inputContainer: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    marginBottom: 20,
    marginLeft: 18,
    marginRight: 18,
  },
  card: {
    marginBottom: 10,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  textInput: {
    flex: 1,
    borderWidth: 2,
    borderRadius: 12,
    padding: 12,
  },
  button: {
    position: 'absolute',
    backgroundColor: 'transparent',
    right: 12,
    top: 15,
  },

  image: {
    flex: 1,
    height: 42,
    width: 42,
  },
});
