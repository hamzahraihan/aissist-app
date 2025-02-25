import { Card } from '@/components/Card';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText style={{ margin: 10 }} type="title">
        Home
      </ThemedText>
      <ScrollView horizontal contentContainerStyle={{ gap: 20, paddingHorizontal: 20 }} showsHorizontalScrollIndicator={false}>
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
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
