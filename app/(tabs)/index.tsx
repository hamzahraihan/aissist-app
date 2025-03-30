import { CustomText } from '@/components/Text';
import { Card } from '@/components/Card';
import { ThemedView } from '@/components/ThemedView';
import { useCustomTheme } from '@/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const { themeMode } = useCustomTheme();
  const iconColor = themeMode === 'dark' ? 'white' : 'black';
  const backgroundIconColor = themeMode === 'dark' ? '#464646' : '#e2e2e2';

  const router = useRouter();

  return (
    <ThemedView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <View style={{ paddingBottom: 34 }}>
          <CustomText style={{ paddingHorizontal: 34, paddingBottom: 27 }} type="title">
            Social Media
          </CustomText>

          <ScrollView horizontal contentContainerStyle={{ gap: 20, paddingHorizontal: 34 }} showsHorizontalScrollIndicator={false}>
            <TouchableOpacity onPress={() => router.navigate('/assistant')}>
              <Card style={styles.card}>
                <Ionicons name="logo-tiktok" size={24} color={iconColor} />
                <CustomText style={{ color: 'gray', fontSize: 10, textAlign: 'center' }} type="default">
                  Generate a content for TikTok
                </CustomText>
                <View style={{ padding: 10, backgroundColor: backgroundIconColor, borderRadius: 99 }}>
                  <Ionicons name="chevron-forward-outline" size={18} color={iconColor} />
                </View>
              </Card>
            </TouchableOpacity>

            <TouchableOpacity>
              <Card style={styles.card}>
                <Ionicons name="logo-instagram" size={24} color={iconColor} />
                <CustomText style={{ color: 'gray', fontSize: 10, textAlign: 'center' }} type="default">
                  Generate a content for instagram
                </CustomText>
                <View style={{ padding: 10, backgroundColor: '#464646', borderRadius: 99 }}>
                  <Ionicons name="chevron-forward-outline" size={18} color={iconColor} />
                </View>
              </Card>
            </TouchableOpacity>

            <Card style={styles.card}>
              <Ionicons name="logo-facebook" size={32} color={iconColor} />
              <CustomText>Hello</CustomText>
            </Card>
          </ScrollView>
        </View>

        <View style={{ paddingBottom: 34 }}>
          <CustomText style={{ paddingHorizontal: 34, paddingBottom: 27 }} type="title">
            Social Media
          </CustomText>

          <ScrollView horizontal contentContainerStyle={{ gap: 20, paddingHorizontal: 34 }} showsHorizontalScrollIndicator={false}>
            <Card style={styles.card}>
              <CustomText type="default">Hello</CustomText>
            </Card>
            <Card style={styles.card}>
              <CustomText>Hello</CustomText>
            </Card>
            <Card style={styles.card}>
              <CustomText>Hello</CustomText>
            </Card>
          </ScrollView>
        </View>

        <View style={{ paddingBottom: 34 }}>
          <CustomText style={{ paddingHorizontal: 34, paddingBottom: 27 }} type="title">
            Social Media
          </CustomText>
          <ScrollView horizontal contentContainerStyle={{ gap: 20, paddingHorizontal: 34 }} showsHorizontalScrollIndicator={false}>
            <Card style={styles.card}>
              <CustomText type="default">Hello</CustomText>
            </Card>
            <Card style={styles.card}>
              <CustomText>Hello</CustomText>
            </Card>
            <Card style={styles.card}>
              <CustomText>Hello</CustomText>
            </Card>
          </ScrollView>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    gap: 34,
  },
  card: {
    display: 'flex',
    gap: 10,
    padding: 12,
    height: 163,
    width: 130,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
