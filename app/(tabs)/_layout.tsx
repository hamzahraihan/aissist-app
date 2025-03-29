import { CustomText } from '@/components/Text';
import { darkTheme, fonts, lightTheme } from '@/constants/theme';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { Platform, Pressable, StyleSheet, TouchableOpacity } from 'react-native';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useGenerateImage } from '@/hooks/useGenerateImage';
import { ThemedView } from '@/components/ThemedView';
import CustomBottomSheet from '@/components/BottomSheet';
import { useCustomTheme } from '@/context/ThemeContext';
import { useBottomSheet } from '@/hooks/useBottomSheet';
import { TEXT_MODELS, IMAGE_MODELS } from '@/constants/models';
import { useGenerateText } from '@/hooks/useGenerateText';

export default function TabLayout() {
  const { themeMode } = useCustomTheme();
  const { bottomSheetModalRef, handlePresentModalPress, setTypeModel, typeModel } = useBottomSheet();

  const { setImageAiModels, imageAiModels } = useGenerateImage();
  const { setTextModel, textModel } = useGenerateText();
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
            title: 'images',
            headerTitle: 'Images',
            tabBarIcon: ({ color }) => <Ionicons size={32} name="image" color={color} />,
            headerRight: ({ tintColor }) => (
              <MaterialIcons
                size={28}
                name="more-vert"
                color={tintColor}
                onPress={() => {
                  setTypeModel('IMAGE_MODEL');
                  handlePresentModalPress();
                }}
              />
            ),
          }}
        />

        <Tabs.Screen name="settings" options={{ title: 'Settings', tabBarIcon: ({ color }) => <Ionicons size={32} name="settings" color={color} /> }} />
      </Tabs>

      <CustomBottomSheet ref={bottomSheetModalRef}>
        {typeModel === 'IMAGE_MODELS'
          ? IMAGE_MODELS.map((item) => (
              <TouchableOpacity disabled={!item.available} key={item.name} onPress={() => setImageAiModels(item.model)}>
                <ThemedView onSelected={item.model === imageAiModels} style={[styles.sheetSelectableContent, { backgroundColor: item.model === imageAiModels ? '#272727' : '' }]}>
                  <CustomText
                    onSelected={item.model === imageAiModels}
                    style={{
                      textAlign: 'center',
                      color: !item.available ? 'gray' : 'white',
                    }}
                  >
                    {item.name}
                  </CustomText>
                </ThemedView>
              </TouchableOpacity>
            ))
          : TEXT_MODELS.map((item) => (
              <TouchableOpacity disabled={!item.available} key={item.name} onPress={() => setTextModel({ label: item.label, name: item.name, model: item.model })}>
                <ThemedView onSelected={item.model === textModel.model} style={[styles.sheetSelectableContent, { backgroundColor: item.model === textModel.model ? '#272727' : '' }]}>
                  <CustomText
                    onSelected={item.model === textModel.model}
                    style={{
                      textAlign: 'center',
                    }}
                  >
                    {item.name}
                  </CustomText>
                </ThemedView>
              </TouchableOpacity>
            ))}
      </CustomBottomSheet>
    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 10,
  },
  sheetSelectableContent: {
    width: '100%',
    padding: 10,
    borderRadius: 12,
  },
  sheetContainer: {
    borderTopStartRadius: 24,
    borderTopEndRadius: 24,
  },
  sheetContainerShadow: Platform.select({
    ios: {
      shadowOffset: {
        width: 0,
        height: 12,
      },
      shadowOpacity: 0.8,
      shadowRadius: 16.0,
      shadowColor: '#000',
    },
    android: {
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 12,
      },
      shadowOpacity: 0.58,
      shadowRadius: 16.0,

      elevation: 24,
    },
    web: {
      boxShadow: '0px -4px 16px rgba(0,0,0, 0.25)',
    },
  }) as any,
});
