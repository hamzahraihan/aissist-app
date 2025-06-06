import { GenerateTextProvider } from '@/context/GenerateTextContext';
import {
  Poppins_100Thin,
  Poppins_200ExtraLight,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_400Regular_Italic,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
  Poppins_900Black,
  useFonts,
} from '@expo-google-fonts/poppins';
import { ThemeProvider } from '@react-navigation/native';
import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';
import { GenerateImageProvider } from '@/context/GenerateImageContext';
import { BottomSheetProvider } from '@/context/BottomSheetContext';
import { CustomThemeProvider, useCustomTheme } from '@/context/ThemeContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { darkTheme, lightTheme } from '@/constants/theme';
import { GenerateAssistantProvider } from '@/context/GenerateAssistantContext';
import './polyfills';

SplashScreen.preventAutoHideAsync();

function AppContent() {
  const { theme, themeMode } = useCustomTheme();
  return (
    <ThemeProvider value={theme}>
      <SafeAreaProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen
            name="assistant"
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
        <StatusBar style={themeMode === 'dark' ? 'light' : 'dark'} />
      </SafeAreaProvider>
    </ThemeProvider>
  );
}

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Poppins_100Thin,
    Poppins_200ExtraLight,
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
    Poppins_900Black,
    Poppins_400Regular_Italic,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded || error) {
    return null;
  }

  return (
    <GestureHandlerRootView>
      <CustomThemeProvider>
        <GenerateTextProvider>
          <GenerateAssistantProvider>
            <BottomSheetProvider>
              <GenerateImageProvider>
                <AppContent />
              </GenerateImageProvider>
            </BottomSheetProvider>
          </GenerateAssistantProvider>
        </GenerateTextProvider>
      </CustomThemeProvider>
    </GestureHandlerRootView>
  );
}
