import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { MaterialIcons } from '@expo/vector-icons';
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { Pressable, useColorScheme } from 'react-native';
import { darkTheme, lightTheme } from '@/constants/theme';
import { useGenerateOpenaiChat } from '@/hooks/useGenerateOpenaiChat';
import { ThemedText } from '@/components/ThemedText';

function CustomDrawerContent(props: any) {
  const { chatHistory, setOpenAiMessages } = useGenerateOpenaiChat();

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />

      {chatHistory.length === 0 ? (
        <ThemedText>You haven't create </ThemedText>
      ) : (
        chatHistory.map((item: any) => <DrawerItem key={item.uuid} style={{ padding: 10 }} label={item.message[0]?.content} onPress={() => setOpenAiMessages(item)} />)
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
          headerStyle: {
            backgroundColor: colorScheme === 'light' ? lightTheme.backgroundColor : darkTheme.backgroundColor,
          },
        }}
      >
        <Drawer.Screen
          name="index" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'Home',
            title: 'Chat',
            headerShadowVisible: false,
            headerTitleAlign: 'center',
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
