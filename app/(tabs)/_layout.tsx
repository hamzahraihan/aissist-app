import { darkTheme, lightTheme } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { Pressable, useColorScheme } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  return (
    <Tabs
      screenOptions={{
        tabBarButton: (props) => <Pressable {...props} android_ripple={{ color: 'transparent' }} />,
        tabBarActiveTintColor: colorScheme == 'light' ? lightTheme.tabBarActiveTintColor : darkTheme.tabBarActiveTintColor,
        tabBarStyle: { height: 70 },
        tabBarIconStyle: { height: 40 },
        headerShadowVisible: false,
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: colorScheme == 'light' ? lightTheme.backgroundColor : darkTheme.backgroundColor,
        },
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'AI Assistant', tabBarIcon: ({ color }) => <Ionicons size={32} name="home" color={color} /> }} />

      <Tabs.Screen name="chat" options={{ title: 'Chat', tabBarIcon: ({ color }) => <Ionicons size={32} name="chatbubble" color={color} /> }} />

      <Tabs.Screen name="images" options={{ title: 'Images', tabBarIcon: ({ color }) => <Ionicons size={32} name="image" color={color} /> }} />

      <Tabs.Screen name="settings" options={{ title: 'Settings', tabBarIcon: ({ color }) => <Ionicons size={32} name="settings" color={color} /> }} />
    </Tabs>
  );
}
