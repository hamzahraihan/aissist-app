import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text>Edited.</Text>

      <Link style={styles.linkButton} href="/details/1">
        Details
      </Link>
      <Link style={styles.linkButton} href="/details/2">
        Details
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 2,
  },
  linkButton: {
    color: 'white',
    backgroundColor: '#352da3',
    fontSize: 20,
    borderRadius: 8,
    cursor: 'pointer',
    padding: 12,
  },
});
