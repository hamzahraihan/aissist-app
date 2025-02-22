import { StyleSheet, Text, View } from 'react-native';

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text>Settings</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#505050',
    color: '#fff',
  },
});
