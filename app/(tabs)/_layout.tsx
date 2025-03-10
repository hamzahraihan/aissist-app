import { ThemedText } from '@/components/ThemedText';
import { darkTheme, fonts, lightTheme } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { Pressable, StyleSheet, Text, TouchableHighlight, TouchableOpacity, useColorScheme } from 'react-native';
import { useBottomSheet } from '@/hooks/useBottomSheet';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet';
import { Platform } from 'react-native';
import { AiModel } from '@/constants/ai-model';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { handlePresentModalPress, bottomSheetModalRef, handleSheetChanges } = useBottomSheet();
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
              <Pressable
                {...(props as any)}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 4,
                }}
                onPress={handlePresentModalPress}
              >
                <ThemedText style={{ fontSize: 20 }}>Images</ThemedText>
                <Ionicons size={24} name="chevron-down" color={props.tintColor} />
              </Pressable>
            ),
            tabBarIcon: ({ color }) => <Ionicons size={32} name="image" color={color} />,
          }}
        />

        <Tabs.Screen name="settings" options={{ title: 'Settings', tabBarIcon: ({ color }) => <Ionicons size={32} name="settings" color={color} /> }} />
      </Tabs>

      <BottomSheetModal
        index={1}
        style={[styles.sheetContainer, styles.sheetContainerShadow]}
        backdropComponent={BottomSheetBackdrop}
        snapPoints={[200, '30%']}
        enablePanDownToClose={true}
        enableDynamicSizing={false}
        ref={bottomSheetModalRef}
        onChange={handleSheetChanges}
      >
        <BottomSheetView style={styles.contentContainer}>
          {AiModel.map((item) => (
            <TouchableOpacity>
              <ThemedText>{item.model}</ThemedText>
            </TouchableOpacity>
          ))}
        </BottomSheetView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  sheetContainer: {
    backgroundColor: 'white',
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
