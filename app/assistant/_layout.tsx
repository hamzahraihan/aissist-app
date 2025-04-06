/* eslint-disable import/no-unresolved */
import { darkTheme, lightTheme } from '@/constants/theme';
import { useCustomTheme } from '@/context/ThemeContext';
import { Stack } from 'expo-router';

export const AssistantLayout = () => {
  const { themeMode } = useCustomTheme();
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="/assistant/[assistantId]"
        options={{
          presentation: 'containedModal',
          animation: 'fade_from_bottom',
          headerShown: true,
          headerShadowVisible: false,
          headerTitle: 'AI Assistant',
          headerStyle: {
            backgroundColor: themeMode === 'light' ? lightTheme.backgroundColor : darkTheme.backgroundColor,
          },
        }}
      />
    </Stack>
  );
};
