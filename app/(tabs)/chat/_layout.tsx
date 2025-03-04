import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { MaterialIcons } from '@expo/vector-icons';
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { Pressable, useColorScheme } from 'react-native';
import { darkTheme, lightTheme } from '@/constants/theme';
import { useGenerateOpenaiChat } from '@/hooks/useGenerateOpenaiChat';

function CustomDrawerContent(props: any) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem style={{ padding: 10, backgroundColor: 'black' }} label="Help" onPress={() => {}} />
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
        <DrawerItem label="Help" onPress={() => {}} />

        <Drawer.Screen
          name="user/[id]" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'User',
            title: 'overview',
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
