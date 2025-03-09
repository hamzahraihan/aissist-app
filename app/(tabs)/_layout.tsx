import { ThemedText } from '@/components/ThemedText';
import { darkTheme, fonts, lightTheme } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { Pressable, useColorScheme } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  return (
    <Tabs
      screenOptions={{
        tabBarButton: (props) => <Pressable {...props} android_ripple={{ color: 'transparent' }} />,
        tabBarActiveTintColor: colorScheme === 'light' ? lightTheme.tabBarActiveTintColor : darkTheme.tabBarActiveTintColor,
        tabBarStyle: { height: 70 },
        tabBarIconStyle: { height: 40 },
        headerShadowVisible: false,
        headerTitleAlign: 'center',
        headerLeftContainerStyle: { padding: 10 },
        headerRightContainerStyle: { padding: 10 },
        headerTitleStyle: {
          fontSize: 20,
          fontFamily: fonts.regularFont,
        },
        headerStyle: {
          backgroundColor: colorScheme === 'light' ? lightTheme.backgroundColor : darkTheme.backgroundColor,
        },
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'AI Assistant', tabBarIcon: ({ color }) => <Ionicons size={32} name="home" color={color} /> }} />

      <Tabs.Screen
        name="chat"
        options={{
          headerShown: false,
          title: 'Chat',
          tabBarIcon: ({ color }) => <Ionicons size={32} name="chatbubble" color={color} />,
          // headerRight: (props) => (
          //   <Pressable {...props} android_ripple={{ color: props.pressColor, radius: 20 }}>
          //     <MaterialIcons selectionColor="black" size={32} name="edit-note" color={props.tintColor} />
          //   </Pressable>
          // ),
        }}
      />

      <Tabs.Screen
        name="images"
        options={{
          title: 'Image',
          headerTitle: (props) => (
            <Pressable {...(props as any)} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
              <ThemedText style={{ fontSize: 20 }}>Images</ThemedText>
              <Ionicons size={24} name="chevron-down" color={props.tintColor} />
            </Pressable>
          ),
          tabBarIcon: ({ color }) => <Ionicons size={32} name="image" color={color} />,
        }}
      />

      <Tabs.Screen name="settings" options={{ title: 'Settings', tabBarIcon: ({ color }) => <Ionicons size={32} name="settings" color={color} /> }} />
    </Tabs>
  );
}
