import { darkTheme, fonts, lightTheme } from '@/constants/theme';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { Pressable } from 'react-native';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useGenerateImage } from '@/hooks/useGenerateImage';
import { useCustomTheme } from '@/context/ThemeContext';
import { useBottomSheet } from '@/hooks/useBottomSheet';
import { TEXT_MODELS, IMAGE_MODELS } from '@/constants/models';
import { useGenerateText } from '@/hooks/useGenerateText';
import { useCallback, useMemo } from 'react';
import ModelSelector from '@/components/ui/ModelSelector';

export default function TabLayout() {
  const { themeMode } = useCustomTheme();
  const { bottomSheetModalRef, handlePresentModalPress, setTypeModel, typeModel } = useBottomSheet();

  const { setImageAiModels, imageAiModels } = useGenerateImage();
  const { setTextModel, textModel } = useGenerateText();

  const models = useMemo(() => (typeModel === 'IMAGE_MODELS' ? IMAGE_MODELS : TEXT_MODELS), [typeModel]);

  const handleSelectModel = useCallback(
    (model: string) => {
      if (typeModel === 'IMAGE_MODELS') {
        setImageAiModels(model);
      } else {
        const selectedItem = TEXT_MODELS.find((item) => item.model === model);
        setTextModel({
          label: selectedItem!.label,
          name: selectedItem!.name,
          model: selectedItem!.model,
        });
      }
    },
    [typeModel, setImageAiModels, setTextModel]
  );

  return (
    <BottomSheetModalProvider>
      <Tabs
        screenOptions={{
          tabBarButton: (props) => <Pressable {...props} android_ripple={{ color: '#77777761', borderless: true, foreground: true }} />,
          tabBarActiveTintColor: themeMode === 'light' ? lightTheme.tabBarActiveTintColor : darkTheme.tabBarActiveTintColor,
          tabBarStyle: { height: 70, overflow: 'hidden' },
          tabBarIconStyle: { height: 40 },
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          headerLeftContainerStyle: { padding: 10 },
          headerRightContainerStyle: { padding: 10 },
          headerTitleStyle: {
            fontSize: 16,
            fontFamily: fonts.regularFont,
          },
          headerStyle: {
            backgroundColor: themeMode === 'light' ? lightTheme.backgroundColor : darkTheme.backgroundColor,
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
          }}
        />

        <Tabs.Screen
          name="images"
          options={{
            title: 'images',
            headerTitle: 'Images',
            tabBarIcon: ({ color }) => <Ionicons size={32} name="image" color={color} />,
            headerRight: ({ tintColor }) => (
              <MaterialIcons
                size={28}
                name="more-vert"
                color={tintColor}
                onPress={() => {
                  setTypeModel('IMAGE_MODELS');
                  handlePresentModalPress();
                }}
              />
            ),
          }}
        />

        <Tabs.Screen name="settings" options={{ title: 'Settings', tabBarIcon: ({ color }) => <Ionicons size={32} name="settings" color={color} /> }} />
      </Tabs>

      <ModelSelector bottomSheetModalRef={bottomSheetModalRef} models={models} onModelSelect={handleSelectModel} selectedModel={typeModel === 'IMAGE_MODELS' ? imageAiModels : textModel.model} />
    </BottomSheetModalProvider>
  );
}
