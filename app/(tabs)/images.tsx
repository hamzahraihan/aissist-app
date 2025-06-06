import { CustomButton } from "@/components/Button";
import { CustomText } from "@/components/Text";
import { ThemedView } from "@/components/ThemedView";
import {
  Image,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import { Image as ExpoImage } from "expo-image";
import * as FileSystem from "expo-file-system";
import { CustomTextInput } from "@/components/TextInput";
import { useGenerateImage } from "@/hooks/useGenerateImage";
import { Ionicons } from "@expo/vector-icons";
import { useCallback, useState } from "react";
import { colors } from "@/constants/theme";
import { ScrollView } from "react-native-gesture-handler";
import { Skeleton } from "moti/skeleton";
import { renderIcon } from "@/utils/render-icon";
import uuid from "react-native-uuid";
import * as MediaLibrary from "expo-media-library";
import { useCustomTheme } from "@/context/ThemeContext";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export default function ImagesScreen() {
  const {
    generateImageWithCloudflare,
    imageAiModels,
    generatedImage,
    loading,
    setInput,
    input,
  } = useGenerateImage();
  const [, setInputHeight] = useState<number>(0);
  const { themeMode } = useCustomTheme();

  const handleDownloadImage = useCallback(async (imageData: string) => {
    const fileUri = FileSystem.documentDirectory + uuid.v4() + ".png";

    // Check if the imageData is a base64 string
    if (imageData.startsWith("data:image/")) {
      // Extract the base64 part from the data URL
      const base64Code = imageData.split("data:image/png;base64,")[1];

      // Write the base64 string to the file system
      try {
        await FileSystem.writeAsStringAsync(fileUri, base64Code, {
          encoding: FileSystem.EncodingType.Base64,
        });
        const mediaResult = await MediaLibrary.saveToLibraryAsync(fileUri);

        ToastAndroid.show("Saved image successfully", ToastAndroid.LONG);
        console.log("🚀 ~ handleDownloadImage ~ mediaResult:", mediaResult);
        console.log("Base64 image downloaded to:", fileUri);
      } catch (error) {
        console.error("Error writing base64 image:", error);
      }
    } else {
      // Handle URL download
      const downloadResumable = FileSystem.createDownloadResumable(
        imageData,
        fileUri,
      );

      try {
        const result = await downloadResumable.downloadAsync();
        console.log("Image downloaded to:", result);
        ToastAndroid.show("Saved image successfully", ToastAndroid.SHORT);
      } catch (error) {
        console.error("Error downloading image from URL:", error);
      }
    }
  }, []);

  return (
    <ThemedView style={styles.container}>
      {!loading && generatedImage?.length === 0 ? (
        <View style={styles.flexCenter}>
          {renderIcon({
            type: imageAiModels,
            props: {
              width: 200,
              height: 100,
              fill: themeMode === "dark" ? "#414141" : "#adadad",
            },
          })}
          <CustomText type="subtitle">
            Turn your imagination to imagery
          </CustomText>
        </View>
      ) : (
        <ScrollView>
          {generatedImage?.map((item: any) => (
            <TouchableOpacity
              key={item?.requestId}
              disabled={loading}
              onLongPress={() => handleDownloadImage(item?.images)}
            >
              <View style={{ display: "flex", alignItems: "flex-end" }}>
                <ThemedView type="assistant" style={styles.prompt}>
                  <CustomText type="subtitle">{item?.input}</CustomText>
                </ThemedView>
                <ThemedView
                  style={[
                    styles.imageCard,
                    {
                      borderColor:
                        themeMode === "dark"
                          ? colors.lightBlack
                          : colors.whitesmoke,
                    },
                  ]}
                >
                  {item?.images[0]?.url ? (
                    <ExpoImage
                      style={{
                        flex: 1,
                        resizeMode: "cover",
                        width: "100%",
                        height: "auto",
                      }}
                      source={item?.images[0]?.url}
                      placeholder={{ blurhash }}
                      contentFit="cover"
                    />
                  ) : (
                    <Image
                      style={{
                        flex: 1,
                        resizeMode: "cover",
                        width: "100%",
                        height: "auto",
                      }}
                      source={{ uri: item?.images }}
                    />
                  )}
                  <CustomText
                    type="subtitle"
                    style={{ padding: 10, color: "gray" }}
                  >
                    Generated by {item?.source}
                  </CustomText>
                </ThemedView>
              </View>
            </TouchableOpacity>
          ))}
          {loading && (
            <View style={{ paddingTop: 20 }}>
              <Skeleton
                colorMode={themeMode}
                radius={14}
                height={200}
                width={"100%"}
              />
            </View>
          )}
        </ScrollView>
      )}

      <ThemedView style={styles.inputContainer}>
        <CustomTextInput
          style={{ width: "90%" }}
          multiline={true}
          onChangeText={setInput}
          onContentSizeChange={(event) =>
            setInputHeight(event.nativeEvent.contentSize.height)
          }
          value={input}
          placeholder="How can I help you today?"
        />

        <CustomButton
          disabled={!input || loading}
          style={styles.button}
          onPress={() => generateImageWithCloudflare(input, imageAiModels)}
        >
          <Ionicons
            name="send"
            color={themeMode === "light" ? "dark" : "white"}
            size={18}
          />
        </CustomButton>
      </ThemedView>
      {/* <View style={styles.inputContainer}>
        <CustomTextInput multiline={true} style={styles.textInput} onChangeText={setInput} onContentSizeChange={(event) => setInputHeight(event.nativeEvent.contentSize.height)} value={input} placeholder="Make something unique!" />

        <CustomButton disabled={!input || loading} style={[styles.button, { height: Math.max(35, inputHeight) }]} onPress={() => generateImageWithCloudflare(input, imageAiModels)}>
          <Ionicons name="send" color={themeMode === 'light' ? 'dark' : 'white'} size={18} />
        </CustomButton>
      </View> */}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "space-between",
    gap: 10,
    padding: 18,
  },
  flexCenter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  imageCard: {
    height: 400,
    width: "100%",
    borderRadius: 12,
    borderWidth: 2,
    marginTop: 10,
    overflow: "hidden",
  },
  button: {
    backgroundColor: "transparent",
    marginTop: "auto",
  },
  inputContainer: {
    display: "flex",
    position: "relative",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 12,
    padding: 10,
  },
  prompt: {
    width: "95%",
    borderRadius: 12,
    padding: 12,
    marginTop: 10,
  },
});
