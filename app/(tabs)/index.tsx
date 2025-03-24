import { Card } from '@/components/Card';
import { ThemedText } from '@/components/ThemedText';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={{ paddingBottom: 34 }}>
        <ThemedText style={{ paddingHorizontal: 34, paddingBottom: 33 }} type="title">
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
        <ThemedText style={{ paddingHorizontal: 34, paddingBottom: 33 }} type="title">
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
    height: 163,
    width: 129,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
