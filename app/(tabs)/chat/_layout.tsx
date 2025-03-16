import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { MaterialIcons } from '@expo/vector-icons';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Appearance, Pressable, StyleSheet, TouchableOpacity } from 'react-native';
import { darkTheme, fonts, lightTheme } from '@/constants/theme';
import { useGenerateText } from '@/hooks/useGenerateText';
import { ThemedText } from '@/components/ThemedText';
import { ChatMessageProps } from '@/context/GenerateTextContext';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import CustomBottomSheet from '@/components/BottomSheet';
import { TEXT_MODELS } from '@/constants/ai-text-models';
import { ThemedView } from '@/components/ThemedView';
import { useCallback, useRef } from 'react';

function CustomDrawerContent(props: any) {
  const { chatHistory, setGeneratedMessages } = useGenerateText();

  const groupedChatHistory = chatHistory.reduce<Record<string, ChatMessageProps[]>>((acc, item) => {
    if (!acc[item.createdAt]) {
      acc[item.createdAt] = [];
    }
    acc[item.createdAt].push(item);
    return acc;
  }, {});

  return (
    <DrawerContentScrollView {...props}>
      {chatHistory.length === 0 ? (
        <ThemedText>You haven't create any chats yet!</ThemedText>
      ) : (
        Object.entries(groupedChatHistory).map(([date, message]) => (
          <>
            <ThemedText>{date}</ThemedText>
            {message.map((item) => (
              <DrawerItem
                key={item.uuid}
                label={item.message[1]?.content as string}
                onPress={() => {
                  setGeneratedMessages(item);
                }}
              />
            ))}
          </>
        ))
      )}
    </DrawerContentScrollView>
  );
}

export default function ChatLayout() {
  const { saveChatHistory } = useGenerateText();
  const colorScheme = Appearance.getColorScheme();
  const { textModel, setTextModel } = useGenerateText();

  const bottomSheetModalTextRef = useRef<BottomSheetModal>(null);
  // callbacks
  const handlePresentModalPress = useCallback(() => {
    // open bottom sheet modal
    bottomSheetModalTextRef.current?.present();
    // close bottom sheet modal
    bottomSheetModalTextRef.current?.close();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
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
            headerTitle: () => (
              <Pressable onPress={handlePresentModalPress}>
                <ThemedText>Chat</ThemedText>
              </Pressable>
            ),
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: 18,
              fontFamily: fonts.regularFont,
            },
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: colorScheme === 'light' ? lightTheme.backgroundColor : darkTheme.backgroundColor,
            },
          }}
        />
        <CustomBottomSheet ref={bottomSheetModalTextRef}>
          {TEXT_MODELS.map((item) => (
            <TouchableOpacity disabled={!item.available} key={item.name} onPress={() => setTextModel(item.model)}>
              <ThemedView onSelected={item.model === textModel} style={[styles.sheetSelectableContent, { backgroundColor: item.model === textModel ? '#272727' : '' }]}>
                <ThemedText
                  onSelected={item.model === textModel}
                  style={{
                    textAlign: 'center',
                  }}
                >
                  {item.name}
                </ThemedText>
              </ThemedView>
            </TouchableOpacity>
          ))}
        </CustomBottomSheet>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  sheetSelectableContent: {
    width: '100%',
    padding: 10,
    borderRadius: 12,
  },
});
