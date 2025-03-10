import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { MaterialIcons } from '@expo/vector-icons';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Pressable, StyleSheet, useColorScheme } from 'react-native';
import { darkTheme, fonts, lightTheme } from '@/constants/theme';
import { useGenerateOpenaiChat } from '@/hooks/useGenerateOpenaiChat';
import { ThemedText } from '@/components/ThemedText';
import { ChatMessageProps } from '@/context/OpenaiContext';

function CustomDrawerContent(props: any) {
  const { chatHistory, setOpenAiMessages } = useGenerateOpenaiChat();

  const groupedChatHistory = chatHistory.reduce<Record<string, ChatMessageProps[]>>((acc, item) => {
    if (!acc[item.createdAt]) {
      acc[item.createdAt] = [];
    }
    acc[item.createdAt].push(item);
    return acc;
  }, {});

  return (
    <DrawerContentScrollView {...props}>
      {chatHistory.length === 0 ? (
        <ThemedText>You haven't create any chats yet!</ThemedText>
      ) : (
        Object.entries(groupedChatHistory).map(([date, message]) => (
          <>
            <ThemedText>{date}</ThemedText>
            {message.map((item) => (
              <DrawerItem
                key={item.uuid}
                style={styles.container}
                label={item.message[0]?.content as string}
                onPress={() => {
                  setOpenAiMessages(item);
                }}
              />
            ))}
          </>
        ))
      )}
    </DrawerContentScrollView>
  );
}

export default function ChatLayout() {
  const { saveChatHistory } = useGenerateOpenaiChat();
  const colorScheme = useColorScheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          drawerType: 'back',
          headerRight: (props) => (
            <Pressable onPress={saveChatHistory}>
              <MaterialIcons color={props.tintColor} name="edit-note" size={28} />
            </Pressable>
          ),
          headerRightContainerStyle: { padding: 10 },
          headerTitle: 'Chat',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 20,
            fontFamily: fonts.regularFont,
          },
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: colorScheme === 'light' ? lightTheme.backgroundColor : darkTheme.backgroundColor,
          },
        }}
      />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {},
});
