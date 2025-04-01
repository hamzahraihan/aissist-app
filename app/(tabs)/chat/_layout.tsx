import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { MaterialIcons } from '@expo/vector-icons';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Pressable, StyleSheet, View } from 'react-native';
import { darkTheme, fonts, lightTheme } from '@/constants/theme';
import { useGenerateText } from '@/hooks/useGenerateText';
import { CustomText } from '@/components/Text';
import { ChatMessageProps } from '@/context/GenerateTextContext';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { CustomButton } from '@/components/Button';
import { useCustomTheme } from '@/context/ThemeContext';
import { useBottomSheet } from '@/hooks/useBottomSheet';

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
        <CustomText>You haven't create any chats yet!</CustomText>
      ) : (
        Object.entries(groupedChatHistory).map(([date, message]) => (
          <View key={date}>
            <CustomText>{date}</CustomText>
            {message?.map((item) => (
              <DrawerItem
                key={item?.uuid}
                label={item?.message[1]?.content as string}
                onPress={() => {
                  setGeneratedMessages(item);
                }}
              />
            ))}
          </View>
        ))
      )}
    </DrawerContentScrollView>
  );
}

export default function ChatLayout() {
  const { saveChatHistory, generatedMessages } = useGenerateText();
  const { themeMode } = useCustomTheme();
  const { textModel } = useGenerateText();
  const { handlePresentModalPress, setTypeModel } = useBottomSheet();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <Drawer
          drawerContent={(props) => <CustomDrawerContent {...props} />}
          screenOptions={{
            drawerType: 'back',
            headerRight: (props) => (
              <Pressable disabled={generatedMessages.message.length === 1} onPress={saveChatHistory}>
                <MaterialIcons color={props.tintColor} name="edit-note" size={28} />
              </Pressable>
            ),
            headerRightContainerStyle: { paddingRight: 10 },
            headerTitle: (props) => (
              <CustomButton
                onPress={() => {
                  setTypeModel('TEXT_MODELS');
                  handlePresentModalPress();
                }}
                style={styles.headerTitle}
              >
                <CustomText style={{ overflow: 'hidden', textAlign: 'center' }} ellipsizeMode="tail" numberOfLines={1}>
                  {textModel.name}
                </CustomText>
                <MaterialIcons color={themeMode === 'dark' ? 'white' : 'black'} name="assistant" size={18} />
              </CustomButton>
            ),
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: 18,
              fontFamily: fonts.regularFont,
            },
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: themeMode === 'light' ? lightTheme.backgroundColor : darkTheme.backgroundColor,
            },
          }}
        />
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
  headerTitle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
    borderRadius: 8,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 3,
    paddingBottom: 3,
  },
});
