/* eslint-disable import/no-unresolved */

import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Platform } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Skeleton } from 'moti/skeleton';
import { useGenerateText } from '@/hooks/useGenerateText';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Card } from '@/components/Card';
import { CustomTextInput } from '@/components/TextInput';
import { CustomButton } from '@/components/Button';
import { AIResponse } from '@/components/AIResponse';
import { useCustomTheme } from '@/context/ThemeContext';

const promptList: { prompt: string }[] = [
  { prompt: 'Write a short story about a robot discovering emotions ' },
  { prompt: 'Help me outline a sci-fi novel set in a post-apocalyptic world' },
  { prompt: 'Create a character profile for a complex villain with sympathetic motives ' },
  { prompt: 'Give me 5 creative writing prompts for flash fiction ' },
];

export default function ChatScreen() {
  const { themeMode } = useCustomTheme();
  const [, setInputHeight] = useState<number>(0);
  const { generateTextByAi, setInput, input, loading, generatedMessages } = useGenerateText();

  return (
    <ThemedView style={styles.container}>
      <ScrollView>
        {generatedMessages?.message?.length <= 1 ? (
          <View style={{ padding: 34 }}>
            <ThemedText style={styles.textHeading} type="defaultSemiBold">
              Hello!
            </ThemedText>
            {promptList.map((item) => (
              <TouchableOpacity key={item.prompt} onPress={() => setInput(item.prompt)}>
                <Card style={styles.card}>
                  <ThemedText style={{ textAlign: 'center' }} type="subtitle">
                    {item.prompt}
                  </ThemedText>
                </Card>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <>
            {generatedMessages?.message?.slice(1).map((item, index) => (
              <ThemedView type={item.role as any} style={{ padding: 34 }} key={`message-${index}`}>
                {item.role === 'user' && <Image style={styles.image} source={require('@/assets/images/user-default.png')} />}
                <AIResponse>{item.content}</AIResponse>
              </ThemedView>
            ))}
          </>
        )}

        {loading && (
          <ThemedView type="assistant" style={{ paddingHorizontal: 34, paddingBottom: 20, display: 'flex', gap: 8 }}>
            <Skeleton colorMode={themeMode} radius={14} height={20} width={'100%'} />
            <Skeleton colorMode={themeMode} radius={14} height={20} width={'100%'} />
            <Skeleton colorMode={themeMode} radius={14} height={20} width={'100%'} />
            <Skeleton colorMode={themeMode} radius={14} height={20} width={'100%'} />
          </ThemedView>
        )}
      </ScrollView>

      {Platform.OS !== 'web' ? (
        <ThemedView style={styles.inputContainer}>
          <CustomTextInput style={{ width: '95%' }} multiline={true} onChangeText={setInput} onContentSizeChange={(event) => setInputHeight(event.nativeEvent.contentSize.height)} value={input} placeholder="How can I help you today?" />

          <CustomButton disabled={!input || loading} style={styles.button} onPress={() => generateTextByAi()}>
            <Ionicons name="send" color={themeMode === 'light' ? 'dark' : 'white'} size={18} />
          </CustomButton>
        </ThemedView>
      ) : (
        ''
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between',
    gap: 10,
  },
  textHeading: {
    textAlign: 'center',
    fontSize: 50,
    paddingTop: 20,
    paddingBottom: 20,
  },
  inputContainer: {
    display: 'flex',
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginLeft: 18,
    marginRight: 18,
    borderWidth: 2,
    borderRadius: 12,
    padding: 10,
  },
  card: {
    marginBottom: 10,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  button: {
    // position: 'absolute',
    backgroundColor: 'transparent',
    marginTop: 'auto',
    // right: 12,
    // top: 15,
  },
  image: {
    flex: 1,
    height: 42,
    width: 42,
  },
});
