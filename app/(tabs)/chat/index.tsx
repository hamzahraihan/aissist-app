/* eslint-disable import/no-unresolved */

import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { StyleSheet, useColorScheme, View, Image, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Skeleton } from 'moti/skeleton';
import { useGenerateOpenaiChat } from '@/hooks/useGenerateOpenaiChat';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Card } from '@/components/Card';
import { CustomTextInput } from '@/components/TextInput';
import { CustomButton } from '@/components/Button';
import { AIResponse } from '@/components/AIResponse';

const promptList: { prompt: string }[] = [
  { prompt: 'If you could instantly master any skill, but only use it for one day each year, what skill would you choose and why?' },
  { prompt: 'Imagine you wake up tomorrow with the ability to speak and understand one secret language (could be an ancient, lost, or even an alien language). Which one would you choose?' },
  { prompt: 'You get to have dinner with one historical figure, one fictional character, and one person from your life. Who are they, and what’s the topic of conversation?' },
  { prompt: 'If schools could teach one subject that isn’t currently part of the standard curriculum, what do you think it should be and why?' },
];

export default function ChatScreen() {
  const colorScheme: any = useColorScheme();

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
            {promptList.map((item, index) => (
              <TouchableOpacity key={index} onPress={() => setInput(item.prompt)}>
                <Card style={styles.card}>
                  <ThemedText style={{ textAlign: 'center' }}>{item.prompt}</ThemedText>
                </Card>
              </TouchableOpacity>
            ))}
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

        {loading && (
          <ThemedView type="assistant" style={{ padding: 24, display: 'flex', gap: 8 }}>
            {Array.from({ length: 4 }, () => (
              <Skeleton colorMode={colorScheme} radius={14} height={20} width={'100%'} />
            ))}
          </ThemedView>
        )}
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
