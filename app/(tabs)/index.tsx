import { Card } from '@/components/Card';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useCustomTheme } from '@/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default function HomeScreen() {
  const { themeMode } = useCustomTheme();
  const iconColor = themeMode === 'dark' ? 'white' : 'black';
  return (
    <ThemedView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <View style={{ paddingBottom: 34 }}>
          <ThemedText style={{ paddingHorizontal: 34, paddingBottom: 27 }} type="title">
            Social Media
          </ThemedText>

          <ScrollView horizontal contentContainerStyle={{ gap: 20, paddingHorizontal: 34 }} showsHorizontalScrollIndicator={false}>
            <TouchableOpacity>
              <Card style={styles.card}>
                <Ionicons name="logo-tiktok" size={24} color={iconColor} />
                <ThemedText style={{ color: 'gray', fontSize: 10, textAlign: 'center' }} type="default">
                  Generate a content for TikTok
                </ThemedText>
                <View style={{ padding: 10, backgroundColor: '#464646', borderRadius: 99 }}>
                  <Ionicons name="chevron-forward-outline" size={18} color={iconColor} />
                </View>
              </Card>
            </TouchableOpacity>
            <Card style={styles.card}>
              <Ionicons name="logo-instagram" size={32} color={iconColor} />
              <ThemedText>Hello</ThemedText>
            </Card>
            <Card style={styles.card}>
              <Ionicons name="logo-facebook" size={32} color={iconColor} />
              <ThemedText>Hello</ThemedText>
            </Card>
          </ScrollView>
        </View>

        <View style={{ paddingBottom: 34 }}>
          <ThemedText style={{ paddingHorizontal: 34, paddingBottom: 27 }} type="title">
            Social Media
          </ThemedText>

          <ScrollView horizontal contentContainerStyle={{ gap: 20, paddingHorizontal: 34 }} showsHorizontalScrollIndicator={false}>
            <Card style={styles.card}>
              <ThemedText type="default">Hello</ThemedText>
            </Card>
            <Card style={styles.card}>
              <ThemedText>Hello</ThemedText>
            </Card>
            <Card style={styles.card}>
              <ThemedText>Hello</ThemedText>
            </Card>
          </ScrollView>
        </View>
        <View style={{ paddingBottom: 34 }}>
          <ThemedText style={{ paddingHorizontal: 34, paddingBottom: 27 }} type="title">
            Social Media
          </ThemedText>
          <ScrollView horizontal contentContainerStyle={{ gap: 20, paddingHorizontal: 34 }} showsHorizontalScrollIndicator={false}>
            <Card style={styles.card}>
              <ThemedText type="default">Hello</ThemedText>
            </Card>
            <Card style={styles.card}>
              <ThemedText>Hello</ThemedText>
            </Card>
            <Card style={styles.card}>
              <ThemedText>Hello</ThemedText>
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
