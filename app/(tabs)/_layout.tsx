import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { Pressable } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarButton: (props) => <Pressable {...props} android_ripple={{ color: 'transparent' }} />,
        tabBarActiveTintColor: 'black',
        tabBarStyle: { height: 70 },
        tabBarIconStyle: { height: 40 },
        headerShown: false,
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Home', tabBarIcon: ({ color }) => <Ionicons size={32} name="home" color={color} /> }} />

      <Tabs.Screen name="chat" options={{ title: 'Chat', tabBarIcon: ({ color }) => <Ionicons size={32} name="chatbubble" color={color} /> }} />

      <Tabs.Screen name="images" options={{ title: 'Images', tabBarIcon: ({ color }) => <Ionicons size={32} name="image" color={color} /> }} />

      <Tabs.Screen name="settings" options={{ title: 'Settings', tabBarIcon: ({ color }) => <Ionicons size={32} name="settings" color={color} /> }} />
    </Tabs>
  );
}
