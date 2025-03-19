import { ThemedText } from '@/components/ThemedText';
import { darkTheme, fonts, lightTheme } from '@/constants/theme';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { Pressable, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { Platform } from 'react-native';
import { IMAGE_MODELS } from '@/constants/ai-image-model';
import { useGenerateImage } from '@/hooks/useGenerateImage';
import { ThemedView } from '@/components/ThemedView';
import CustomBottomSheet from '@/components/BottomSheet';
import { useCallback, useRef } from 'react';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  // ref
  const bottomSheetModalImageRef = useRef<BottomSheetModal>(null);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    // open bottom sheet modal
    bottomSheetModalImageRef.current?.present();
    // close bottom sheet modal
    bottomSheetModalImageRef.current?.close();
  }, []);

  const { setImageAiModels, imageAiModels } = useGenerateImage();
  return (
    <BottomSheetModalProvider>
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
            fontSize: 16,
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
            title: 'images',
            headerTitle: 'Images',
            tabBarIcon: ({ color }) => <Ionicons size={32} name="image" color={color} />,
            headerRight: ({ tintColor }) => <MaterialIcons size={28} name="more-vert" color={tintColor} onPress={handlePresentModalPress} />,
          }}
        />

        <Tabs.Screen name="settings" options={{ title: 'Settings', tabBarIcon: ({ color }) => <Ionicons size={32} name="settings" color={color} /> }} />
      </Tabs>

      <CustomBottomSheet ref={bottomSheetModalImageRef}>
        {IMAGE_MODELS.map((item) => (
          <TouchableOpacity disabled={!item.available} key={item.name} onPress={() => setImageAiModels(item.model)}>
            <ThemedView onSelected={item.model === imageAiModels} style={[styles.sheetSelectableContent, { backgroundColor: item.model === imageAiModels ? '#272727' : '' }]}>
              <ThemedText
                onSelected={item.model === imageAiModels}
                style={{
                  textAlign: 'center',
                  color: !item.available ? 'gray' : 'white',
                }}
              >
                {item.name}
              </ThemedText>
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
